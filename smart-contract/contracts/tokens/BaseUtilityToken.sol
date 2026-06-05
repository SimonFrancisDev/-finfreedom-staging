// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";

interface IGuardian {
    function validateUpgrade(address proxy, address newImplementation) external view returns (bool);
}

/// @title BaseUtilityToken
/// @notice Non-transferable utility token base for FGT and FGTr.
/// @dev
/// - 6 decimals
/// - no transfer / transferFrom / approve / allowance
/// - balances remain wallet-visible
/// - authorized controller/modules can mint, burn, and lock
abstract contract BaseUtilityToken is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    PausableUpgradeable
{
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    string private _name;
    string private _symbol;

    uint8 private constant _DECIMALS = 6;
    uint256 private _totalSupply;

    mapping(address => uint256) internal _balances;
    mapping(address => uint256) internal _lockedBalances;

    mapping(address => bool) public authorizedOperators;
    bool public operatorConfigLocked;

    address public guardian;

    event Transfer(address indexed from, address indexed to, uint256 value);

    event OperatorUpdated(address indexed operator, bool allowed);
    event OperatorConfigLocked();
    event GuardianUpdated(address indexed oldGuardian, address indexed newGuardian);

    event UtilityMinted(
        address indexed operator,
        address indexed to,
        uint256 amount,
        string reason
    );

    event UtilityBurned(
        address indexed operator,
        address indexed from,
        uint256 amount,
        string reason
    );

    event UtilityLocked(
        address indexed operator,
        address indexed user,
        uint256 amount,
        string reason
    );

    event UtilityUnlocked(
        address indexed operator,
        address indexed user,
        uint256 amount,
        string reason
    );

    modifier onlyAuthorizedOperator() {
        require(authorizedOperators[msg.sender], "Not authorized");
        _;
    }

    function __BaseUtilityToken_init(
        string memory name_,
        string memory symbol_,
        address initialOwner,
        address _guardian
    ) internal onlyInitializing {
        require(initialOwner != address(0), "Invalid owner");
        require(_guardian != address(0), "Invalid guardian");
        require(_guardian.code.length > 0, "Invalid guardian");

        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __Pausable_init();

        _name = name_;
        _symbol = symbol_;
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

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function decimals() external pure returns (uint8) {
        return _DECIMALS;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address user) public view returns (uint256) {
        return _balances[user];
    }

    function lockedBalanceOf(address user) public view returns (uint256) {
        return _lockedBalances[user];
    }

    function availableBalanceOf(address user) public view returns (uint256) {
        return _balances[user] - _lockedBalances[user];
    }

    /// @notice ERC20-style allowance is intentionally disabled.
    function allowance(address, address) external pure returns (uint256) {
        return 0;
    }

    /// @notice ERC20-style approve is intentionally disabled.
    function approve(address, uint256) external pure returns (bool) {
        revert("Non-transferable");
    }

    /// @notice ERC20-style transfer is intentionally disabled.
    function transfer(address, uint256) external pure returns (bool) {
        revert("Non-transferable");
    }

    /// @notice ERC20-style transferFrom is intentionally disabled.
    function transferFrom(address, address, uint256) external pure returns (bool) {
        revert("Non-transferable");
    }

    function setAuthorizedOperator(address operator, bool allowed) external onlyOwner {
        require(!operatorConfigLocked, "Operator config locked");
        require(operator != address(0), "Invalid operator");

        authorizedOperators[operator] = allowed;
        emit OperatorUpdated(operator, allowed);
    }

    function lockOperatorConfig() external onlyOwner {
        require(!operatorConfigLocked, "Already locked");
        operatorConfigLocked = true;
        emit OperatorConfigLocked();
    }

    function mint(
        address to,
        uint256 amount,
        string calldata reason
    ) external onlyAuthorizedOperator whenNotPaused {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be > 0");

        _totalSupply += amount;
        _balances[to] += amount;

        emit Transfer(address(0), to, amount);
        emit UtilityMinted(msg.sender, to, amount, reason);
    }

    function burnFrom(
        address from,
        uint256 amount,
        string calldata reason
    ) external onlyAuthorizedOperator whenNotPaused {
        require(from != address(0), "Invalid address");
        require(amount > 0, "Amount must be > 0");
        require(availableBalanceOf(from) >= amount, "Insufficient available balance");

        _balances[from] -= amount;
        _totalSupply -= amount;

        emit Transfer(from, address(0), amount);
        emit UtilityBurned(msg.sender, from, amount, reason);
    }

    function lockFrom(
        address user,
        uint256 amount,
        string calldata reason
    ) external onlyAuthorizedOperator whenNotPaused {
        require(user != address(0), "Invalid address");
        require(amount > 0, "Amount must be > 0");
        require(availableBalanceOf(user) >= amount, "Insufficient available balance");

        _lockedBalances[user] += amount;

        emit UtilityLocked(msg.sender, user, amount, reason);
    }

    function unlockFrom(
        address user,
        uint256 amount,
        string calldata reason
    ) external onlyAuthorizedOperator whenNotPaused {
        require(user != address(0), "Invalid address");
        require(amount > 0, "Amount must be > 0");
        require(_lockedBalances[user] >= amount, "Insufficient locked balance");

        _lockedBalances[user] -= amount;

        emit UtilityUnlocked(msg.sender, user, amount, reason);
    }

    uint256[50] private __gap;
}











// This is a stable version
// pragma solidity ^0.8.24;

// import "@openzeppelin/contracts/access/Ownable.sol";

// /// @title BaseUtilityToken
// /// @notice Non-transferable utility token base for FGT and FGTr.
// /// @dev
// /// - 6 decimals
// /// - no transfer / transferFrom / approve / allowance
// /// - balances remain wallet-visible
// /// - authorized controller/modules can mint, burn, and lock
// abstract contract BaseUtilityToken is Ownable {
//     string private _name;
//     string private _symbol;

//     uint8 private constant _DECIMALS = 6;
//     uint256 private _totalSupply;

//     mapping(address => uint256) internal _balances;
//     mapping(address => uint256) internal _lockedBalances;

//     mapping(address => bool) public authorizedOperators;
//     bool public operatorConfigLocked;

//     event Transfer(address indexed from, address indexed to, uint256 value);

//     event OperatorUpdated(address indexed operator, bool allowed);
//     event OperatorConfigLocked();

//     event UtilityMinted(
//         address indexed operator,
//         address indexed to,
//         uint256 amount,
//         string reason
//     );

//     event UtilityBurned(
//         address indexed operator,
//         address indexed from,
//         uint256 amount,
//         string reason
//     );

//     event UtilityLocked(
//         address indexed operator,
//         address indexed user,
//         uint256 amount,
//         string reason
//     );

//     modifier onlyAuthorizedOperator() {
//         require(authorizedOperators[msg.sender], "Not authorized");
//         _;
//     }

//     constructor(
//         string memory name_,
//         string memory symbol_,
//         address initialOwner
//     ) Ownable(initialOwner) {
//         require(initialOwner != address(0), "Invalid owner");
//         _name = name_;
//         _symbol = symbol_;
//     }

//     function name() external view returns (string memory) {
//         return _name;
//     }

//     function symbol() external view returns (string memory) {
//         return _symbol;
//     }

//     function decimals() external pure returns (uint8) {
//         return _DECIMALS;
//     }

//     function totalSupply() external view returns (uint256) {
//         return _totalSupply;
//     }

//     function balanceOf(address user) public view returns (uint256) {
//         return _balances[user];
//     }

//     function lockedBalanceOf(address user) public view returns (uint256) {
//         return _lockedBalances[user];
//     }

//     function availableBalanceOf(address user) public view returns (uint256) {
//         return _balances[user] - _lockedBalances[user];
//     }

//     /// @notice ERC20-style allowance is intentionally disabled.
//     function allowance(address, address) external pure returns (uint256) {
//         return 0;
//     }

//     /// @notice ERC20-style approve is intentionally disabled.
//     function approve(address, uint256) external pure returns (bool) {
//         revert("Non-transferable");
//     }

//     /// @notice ERC20-style transfer is intentionally disabled.
//     function transfer(address, uint256) external pure returns (bool) {
//         revert("Non-transferable");
//     }

//     /// @notice ERC20-style transferFrom is intentionally disabled.
//     function transferFrom(address, address, uint256) external pure returns (bool) {
//         revert("Non-transferable");
//     }

//     function setAuthorizedOperator(address operator, bool allowed) external onlyOwner {
//         require(!operatorConfigLocked, "Operator config locked");
//         require(operator != address(0), "Invalid operator");

//         authorizedOperators[operator] = allowed;
//         emit OperatorUpdated(operator, allowed);
//     }

//     function lockOperatorConfig() external onlyOwner {
//         require(!operatorConfigLocked, "Already locked");
//         operatorConfigLocked = true;
//         emit OperatorConfigLocked();
//     }

//     function mint(
//         address to,
//         uint256 amount,
//         string calldata reason
//     ) external onlyAuthorizedOperator {
//         require(to != address(0), "Invalid recipient");
//         require(amount > 0, "Amount must be > 0");

//         _totalSupply += amount;
//         _balances[to] += amount;

//         emit Transfer(address(0), to, amount);
//         emit UtilityMinted(msg.sender, to, amount, reason);
//     }

//     function burnFrom(
//         address from,
//         uint256 amount,
//         string calldata reason
//     ) external onlyAuthorizedOperator {
//         require(from != address(0), "Invalid address");
//         require(amount > 0, "Amount must be > 0");
//         require(availableBalanceOf(from) >= amount, "Insufficient available balance");

//         _balances[from] -= amount;
//         _totalSupply -= amount;

//         emit Transfer(from, address(0), amount);
//         emit UtilityBurned(msg.sender, from, amount, reason);
//     }

//     function lockFrom(
//         address user,
//         uint256 amount,
//         string calldata reason
//     ) external onlyAuthorizedOperator {
//         require(user != address(0), "Invalid address");
//         require(amount > 0, "Amount must be > 0");
//         require(availableBalanceOf(user) >= amount, "Insufficient available balance");

//         _lockedBalances[user] += amount;

//         emit UtilityLocked(msg.sender, user, amount, reason);
//     }
// }
