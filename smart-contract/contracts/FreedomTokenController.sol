// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "./interfaces/IFreedomTokenController.sol";

interface IBaseUtilityToken {
    function mint(address to, uint256 amount, string calldata reason) external;
    function burnFrom(address from, uint256 amount, string calldata reason) external;
    function lockFrom(address user, uint256 amount, string calldata reason) external;
    function unlockFrom(address user, uint256 amount, string calldata reason) external;

    function balanceOf(address user) external view returns (uint256);
    function lockedBalanceOf(address user) external view returns (uint256);
    function availableBalanceOf(address user) external view returns (uint256);
}

interface IGuardian {
    function validateUpgrade(address proxy, address newImplementation) external view returns (bool);
}

contract FreedomTokenController is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable,
    IFreedomTokenController
{
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    IBaseUtilityToken public fgt;
    IBaseUtilityToken public fgtr;

    address public levelManager;
    address public orbitManager;
    address public guardian;

    mapping(address => bool) public approvedUtilityModules;
    bool public moduleConfigLocked;

    mapping(address => uint256) public totalFGTMinted;
    mapping(address => uint256) public totalFGTrMinted;
    mapping(address => uint256) public totalFGTBurned;
    mapping(address => uint256) public totalFGTrBurned;
    mapping(address => uint256) public totalFGTLocked;

    mapping(address => mapping(uint8 => uint256)) public userFGTMintedByLevel;
    mapping(address => mapping(uint8 => uint256)) public userFGTrMintedByLevel;

    mapping(address => mapping(bytes32 => uint256)) public userFGTMintedByReason;
    mapping(address => mapping(bytes32 => uint256)) public userFGTrMintedByReason;
    mapping(address => mapping(bytes32 => uint256)) public userFGTBurnedByReason;
    mapping(address => mapping(bytes32 => uint256)) public userFGTrBurnedByReason;
    mapping(address => mapping(bytes32 => uint256)) public userFGTLockedByReason;

    struct UserTokenRecord {
        uint8 recordType;
        uint8 level;
        uint40 timestamp;
        uint256 amount;
        bytes32 reason;
    }

    mapping(address => UserTokenRecord[]) private userTokenRecords;
    mapping(address => mapping(bytes32 => uint256)) public userFGTUnlockedByReason;

    uint8 private constant RECORD_TYPE_FGT_MINT = 1;
    uint8 private constant RECORD_TYPE_FGTR_MINT = 2;
    uint8 private constant RECORD_TYPE_FGT_BURN = 3;
    uint8 private constant RECORD_TYPE_FGTR_BURN = 4;
    uint8 private constant RECORD_TYPE_FGT_LOCK = 5;
    uint8 private constant RECORD_TYPE_FGT_UNLOCK = 6;

    event LevelManagerUpdated(address indexed oldManager, address indexed newManager);
    event OrbitManagerUpdated(address indexed oldManager, address indexed newManager);
    event UtilityModuleUpdated(address indexed module, bool allowed);
    event ModuleConfigLocked();
    event GuardianUpdated(address indexed oldGuardian, address indexed newGuardian);

    event FGTMintRecorded(address indexed user, uint8 indexed level, uint256 amount, string reason);
    event FGTrMintRecorded(address indexed user, uint8 indexed level, uint256 amount, string reason);
    event FGTBurnRecorded(address indexed user, uint256 amount, string reason);
    event FGTrBurnRecorded(address indexed user, uint256 amount, string reason);
    event FGTLockRecorded(address indexed user, uint256 amount, string reason);
    event FGTUnlockRecorded(address indexed user, uint256 amount, string reason);
    event TokenRewardEligibility(
        address indexed user,
        uint8 indexed level,
        bytes32 indexed rewardType,
        uint256 amount,
        bool eligible,
        bytes32 reasonCode
    );

    modifier onlyLevelManager() {
        require(msg.sender == levelManager, "Only LevelManager");
        _;
    }

    modifier onlyOrbitManager() {
        require(msg.sender == orbitManager, "Only OrbitManager");
        _;
    }

    modifier onlyApprovedUtilityModule() {
        require(approvedUtilityModules[msg.sender], "Only utility module");
        _;
    }

    function initialize(
        address _fgt,
        address _fgtr,
        address initialOwner,
        address _guardian
    ) public initializer {
        require(_fgt != address(0), "Invalid FGT");
        require(_fgtr != address(0), "Invalid FGTr");
        require(initialOwner != address(0), "Invalid owner");
        require(_guardian != address(0), "Invalid guardian");
        require(_guardian.code.length > 0, "Invalid guardian");

        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __Pausable_init();
        __ReentrancyGuard_init();

        fgt = IBaseUtilityToken(_fgt);
        fgtr = IBaseUtilityToken(_fgtr);
        guardian = _guardian;
    }

    function _authorizeUpgrade(address newImplementation) internal view override onlyOwner {
        require(guardian != address(0), "Guardian not set");
        require(
            IGuardian(guardian).validateUpgrade(address(this), newImplementation),
            "Upgrade blocked"
        );
    }

    function setGuardian(address _guardian) external onlyOwner {
        require(_guardian != address(0), "Invalid guardian");
        require(_guardian.code.length > 0, "Invalid guardian");
        address oldGuardian = guardian;
        guardian = _guardian;
        emit GuardianUpdated(oldGuardian, _guardian);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function setLevelManager(address _levelManager) external onlyOwner {
        require(_levelManager != address(0), "Invalid address");
        address old = levelManager;
        levelManager = _levelManager;
        emit LevelManagerUpdated(old, _levelManager);
    }

    function setOrbitManager(address _orbitManager) external onlyOwner {
        require(_orbitManager != address(0), "Invalid address");
        address old = orbitManager;
        orbitManager = _orbitManager;
        emit OrbitManagerUpdated(old, _orbitManager);
    }

    function setApprovedUtilityModule(address module, bool allowed) external onlyOwner {
        require(!moduleConfigLocked, "Module config locked");
        require(module != address(0), "Invalid module");

        approvedUtilityModules[module] = allowed;
        emit UtilityModuleUpdated(module, allowed);
    }

    function lockModuleConfig() external onlyOwner {
        require(!moduleConfigLocked, "Already locked");
        moduleConfigLocked = true;
        emit ModuleConfigLocked();
    }

    function onManualActivation(
        address user,
        uint8 level,
        uint256 levelPrice
    ) external override onlyLevelManager whenNotPaused nonReentrant {
        emit TokenRewardEligibility(user, level, "FGT_MANUAL", levelPrice, true, "ELIGIBLE");
        _mintFGT(user, level, levelPrice, "manualActivation");
    }

    function onAutoUpgradeActivation(
        address user,
        uint8 level,
        uint256 levelPrice
    ) external override onlyLevelManager whenNotPaused nonReentrant {
        emit TokenRewardEligibility(user, level, "FGT_AUTO", levelPrice, true, "ELIGIBLE");
        _mintFGT(user, level, levelPrice, "autoUpgrade");
    }

    function onFounderFreeActivation(
        address user,
        uint8 level,
        uint256 levelPrice
    ) external override onlyLevelManager whenNotPaused nonReentrant {
        emit TokenRewardEligibility(user, level, "FGT_FOUNDER", levelPrice, true, "ELIGIBLE");
        _mintFGT(user, level, levelPrice, "founderActivation");
    }

    function onRecycleCompleted(
        address orbitOwner,
        uint8 level,
        uint256 recycleReward
    ) external override onlyOrbitManager whenNotPaused nonReentrant {
        emit TokenRewardEligibility(orbitOwner, level, "FGTR_RECYCLE", recycleReward, true, "ELIGIBLE");
        _mintFGTr(orbitOwner, level, recycleReward, "recycleReward");
    }

    function burnFGTForUtility(
        address user,
        uint256 amount,
        string calldata reason
    ) external onlyApprovedUtilityModule whenNotPaused nonReentrant {
        require(user != address(0), "Invalid user");
        require(amount > 0, "Amount must be > 0");

        fgt.burnFrom(user, amount, reason);

        totalFGTBurned[user] += amount;
        userFGTBurnedByReason[user][keccak256(bytes(reason))] += amount;
        _recordTokenHistory(user, RECORD_TYPE_FGT_BURN, 0, amount, reason);

        emit FGTBurnRecorded(user, amount, reason);
    }

    function burnFGTrForUtility(
        address user,
        uint256 amount,
        string calldata reason
    ) external onlyApprovedUtilityModule whenNotPaused nonReentrant {
        require(user != address(0), "Invalid user");
        require(amount > 0, "Amount must be > 0");

        fgtr.burnFrom(user, amount, reason);

        totalFGTrBurned[user] += amount;
        userFGTrBurnedByReason[user][keccak256(bytes(reason))] += amount;
        _recordTokenHistory(user, RECORD_TYPE_FGTR_BURN, 0, amount, reason);

        emit FGTrBurnRecorded(user, amount, reason);
    }

    function lockFGTForNFT(
        address user,
        uint256 amount,
        string calldata reason
    ) external onlyApprovedUtilityModule whenNotPaused nonReentrant {
        require(user != address(0), "Invalid user");
        require(amount > 0, "Amount must be > 0");

        fgt.lockFrom(user, amount, reason);

        totalFGTLocked[user] += amount;
        userFGTLockedByReason[user][keccak256(bytes(reason))] += amount;
        _recordTokenHistory(user, RECORD_TYPE_FGT_LOCK, 0, amount, reason);

        emit FGTLockRecorded(user, amount, reason);
    }

    function unlockFGTFromNFT(
        address user,
        uint256 amount,
        string calldata reason
    ) external onlyApprovedUtilityModule whenNotPaused nonReentrant {
        require(user != address(0), "Invalid user");
        require(amount > 0, "Amount must be > 0");

        fgt.unlockFrom(user, amount, reason);

        uint256 lockedTotal = totalFGTLocked[user];
        totalFGTLocked[user] = lockedTotal >= amount ? lockedTotal - amount : 0;
        userFGTUnlockedByReason[user][keccak256(bytes(reason))] += amount;
        _recordTokenHistory(user, RECORD_TYPE_FGT_UNLOCK, 0, amount, reason);

        emit FGTUnlockRecorded(user, amount, reason);
    }

    function getFGTBalances(address user)
        external
        view
        returns (
            uint256 totalBalance,
            uint256 lockedBalance,
            uint256 availableBalance
        )
    {
        totalBalance = fgt.balanceOf(user);
        lockedBalance = fgt.lockedBalanceOf(user);
        availableBalance = fgt.availableBalanceOf(user);
    }

    function getFGTrBalances(address user)
        external
        view
        returns (
            uint256 totalBalance,
            uint256 lockedBalance,
            uint256 availableBalance
        )
    {
        totalBalance = fgtr.balanceOf(user);
        lockedBalance = fgtr.lockedBalanceOf(user);
        availableBalance = fgtr.availableBalanceOf(user);
    }

    function getUserTokenRecordCount(address user) external view returns (uint256) {
        return userTokenRecords[user].length;
    }

    function getUserTokenRecords(
        address user,
        uint256 offset,
        uint256 limit
    ) external view returns (UserTokenRecord[] memory records) {
        uint256 total = userTokenRecords[user].length;

        if (offset >= total) {
            return new UserTokenRecord[](0);
        }

        uint256 end = offset + limit;
        if (end > total) {
            end = total;
        }

        uint256 size = end - offset;
        records = new UserTokenRecord[](size);

        for (uint256 i = 0; i < size; i++) {
            records[i] = userTokenRecords[user][offset + i];
        }
    }

    function getFGTMintCount(address user) external view returns (uint256) {
        return _countByType(user, RECORD_TYPE_FGT_MINT);
    }

    function getFGTrMintCount(address user) external view returns (uint256) {
        return _countByType(user, RECORD_TYPE_FGTR_MINT);
    }

    function getFGTBurnCount(address user) external view returns (uint256) {
        return _countByType(user, RECORD_TYPE_FGT_BURN);
    }

    function getFGTrBurnCount(address user) external view returns (uint256) {
        return _countByType(user, RECORD_TYPE_FGTR_BURN);
    }

    function getFGTLockCount(address user) external view returns (uint256) {
        return _countByType(user, RECORD_TYPE_FGT_LOCK);
    }

    function getFGTMintRecord(address user, uint256 index) external view returns (
        uint8 level,
        uint256 amount,
        uint40 timestamp,
        bytes32 reason
    ) {
        return _getTypedRecordWithLevel(user, index, RECORD_TYPE_FGT_MINT, "FGT mint");
    }

    function getFGTrMintRecord(address user, uint256 index) external view returns (
        uint8 level,
        uint256 amount,
        uint40 timestamp,
        bytes32 reason
    ) {
        return _getTypedRecordWithLevel(user, index, RECORD_TYPE_FGTR_MINT, "FGTr mint");
    }

    function getFGTBurnRecord(address user, uint256 index) external view returns (
        uint256 amount,
        uint40 timestamp,
        bytes32 reason
    ) {
        (, uint256 _amount, uint40 _timestamp, bytes32 _reason) =
            _getTypedRecordWithLevel(user, index, RECORD_TYPE_FGT_BURN, "FGT burn");
        return (_amount, _timestamp, _reason);
    }

    function getFGTrBurnRecord(address user, uint256 index) external view returns (
        uint256 amount,
        uint40 timestamp,
        bytes32 reason
    ) {
        (, uint256 _amount, uint40 _timestamp, bytes32 _reason) =
            _getTypedRecordWithLevel(user, index, RECORD_TYPE_FGTR_BURN, "FGTr burn");
        return (_amount, _timestamp, _reason);
    }

    function getFGTLockRecord(address user, uint256 index) external view returns (
        uint256 amount,
        uint40 timestamp,
        bytes32 reason
    ) {
        (, uint256 _amount, uint40 _timestamp, bytes32 _reason) =
            _getTypedRecordWithLevel(user, index, RECORD_TYPE_FGT_LOCK, "FGT lock");
        return (_amount, _timestamp, _reason);
    }

    function _mintFGT(
        address user,
        uint8 level,
        uint256 amount,
        string memory reason
    ) internal {
        require(user != address(0), "Invalid user");
        require(level >= 1 && level <= 10, "Invalid level");
        require(amount > 0, "Amount must be > 0");

        fgt.mint(user, amount, reason);

        totalFGTMinted[user] += amount;
        userFGTMintedByLevel[user][level] += amount;
        userFGTMintedByReason[user][keccak256(bytes(reason))] += amount;
        _recordTokenHistory(user, RECORD_TYPE_FGT_MINT, level, amount, reason);

        emit FGTMintRecorded(user, level, amount, reason);
    }

    function _mintFGTr(
        address user,
        uint8 level,
        uint256 amount,
        string memory reason
    ) internal {
        require(user != address(0), "Invalid user");
        require(level >= 1 && level <= 10, "Invalid level");
        require(amount > 0, "Amount must be > 0");

        fgtr.mint(user, amount, reason);

        totalFGTrMinted[user] += amount;
        userFGTrMintedByLevel[user][level] += amount;
        userFGTrMintedByReason[user][keccak256(bytes(reason))] += amount;
        _recordTokenHistory(user, RECORD_TYPE_FGTR_MINT, level, amount, reason);

        emit FGTrMintRecorded(user, level, amount, reason);
    }

    function _recordTokenHistory(
        address user,
        uint8 recordType,
        uint8 level,
        uint256 amount,
        string memory reason
    ) internal {
        userTokenRecords[user].push(
            UserTokenRecord({
                recordType: recordType,
                level: level,
                timestamp: uint40(block.timestamp),
                amount: amount,
                reason: _stringToBytes32(reason)
            })
        );
    }

    function _countByType(address user, uint8 recordType) internal view returns (uint256 count) {
        UserTokenRecord[] storage records = userTokenRecords[user];
        uint256 len = records.length;
        for (uint256 i = 0; i < len; i++) {
            if (records[i].recordType == recordType) {
                count++;
            }
        }
    }

    function _getTypedRecordWithLevel(
        address user,
        uint256 index,
        uint8 recordType,
        string memory recordName
    ) internal view returns (
        uint8 level,
        uint256 amount,
        uint40 timestamp,
        bytes32 reason
    ) {
        uint256 recordIndex = 0;
        UserTokenRecord[] storage records = userTokenRecords[user];
        uint256 len = records.length;

        for (uint256 i = 0; i < len; i++) {
            if (records[i].recordType == recordType) {
                if (recordIndex == index) {
                    UserTokenRecord storage record = records[i];
                    return (record.level, record.amount, record.timestamp, record.reason);
                }
                recordIndex++;
            }
        }

        revert(string(abi.encodePacked(recordName, " record not found")));
    }

    function _stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory temp = bytes(source);
        if (temp.length == 0) {
            return 0x0;
        }
        require(temp.length <= 32, "Reason too long");
        assembly {
            result := mload(add(source, 32))
        }
    }

    uint256[49] private __gap;
}
