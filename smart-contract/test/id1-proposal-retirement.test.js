const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("ID1 proposal retirement preserves multisig authority", function () {
  let gov, owners, stranger;
  beforeEach(async function () {
    [ ...owners ] = await ethers.getSigners();
    stranger = owners[3];
    gov = await (await ethers.getContractFactory("SimpleMultiSig")).deploy(owners.slice(0, 3).map(s => s.address), 3, 120);
    await gov.waitForDeployment();
    await gov.submitTransaction(owners[4].address, 0, "0x");
    await gov.submitTransaction(owners[5].address, 0, "0x");
  });

  it("a proposer or owner cannot directly cancel a proposal", async function () {
    await expect(gov.cancelTransaction(0)).to.be.revertedWith("Only multisig");
    await expect(gov.connect(stranger).cancelTransaction(0)).to.be.revertedWith("Only multisig");
  });

  it("cancellation needs the existing quorum and preserves unrelated proposals", async function () {
    await gov.submitTransaction(gov.target, 0, gov.interface.encodeFunctionData("cancelTransaction", [0]));
    await gov.approveTransaction(2);
    await gov.connect(owners[1]).approveTransaction(2);
    await expect(gov.executeTransaction(2)).to.be.revertedWith("Not enough confirmations");
    await gov.connect(owners[2]).approveTransaction(2);
    await expect(gov.executeTransaction(2)).to.be.revertedWith("Timelock not expired");
    await network.provider.send("evm_increaseTime", [121]);
    await network.provider.send("evm_mine");
    await gov.executeTransaction(2);
    expect((await gov.transactions(0)).cancelled).to.equal(true);
    expect((await gov.transactions(0)).executed).to.equal(false);
    expect((await gov.transactions(1)).cancelled).to.equal(false);
    expect(await gov.requiredConfirmations()).to.equal(3);
    await expect(gov.approveTransaction(0)).to.be.revertedWith("Tx cancelled");
    await expect(gov.executeTransaction(0)).to.be.revertedWith("Tx cancelled");
  });

  it("does not expose a batch or delegation route around quorum", async function () {
    for (const name of ["multicall", "executeBatch", "delegatecall", "upgradeToAndCall"]) {
      expect(gov.interface.fragments.some(f => f.type === "function" && f.name === name)).to.equal(false);
    }
  });
});
