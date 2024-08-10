const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Faucet", function () {
  async function deployFaucet() {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    //get Owner
    const [owner, otherAccount] = await ethers.getSigners();

    const highWithdrawAmount = ethers.parseUnits("1", "ether");
    const lowWithdrawAmount = ethers.parseUnits("0.01", "ether");

    return {
      Faucet,
      faucet,
      owner,
      otherAccount,
      highWithdrawAmount,
      lowWithdrawAmount,
    };
  }

  it("should deploy and set owner correctly", async function () {
    const { faucet, owner } = await loadFixture(deployFaucet);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should not allow withdrawals above 0.1 ethers", async function () {
    const { faucet, highWithdrawAmount } = await loadFixture(deployFaucet);

    await expect(faucet.withdraw(highWithdrawAmount)).to.be.revertedWith(
      "You can only withdraw 0.1 eth at a time"
    );
  });

  //   it("should allow withdrawals below 0.1 ethers", async function () {
  //     const { faucet, lowWithdrawAmount } = await loadFixture(deployFaucet);

  //     await expect(faucet.withdraw(lowWithdrawAmount)).not.to.be.reverted;
  //   });

  it("should make sure only the owner can withdraw all", async function () {
    const { faucet } = await loadFixture(deployFaucet);

    await expect(faucet.withdrawAll()).not.to.be.reverted;
  });

  it("should make sure only the owner can withdraw all", async function () {
    const { faucet, owner, otherAccount } = await loadFixture(deployFaucet);

    await expect(faucet.connect(otherAccount).withdrawAll()).to.be.revertedWith(
      "Not authorized"
    );
  });

  it("should make sure destroy faucet works as expected", async function () {
    const { faucet, owner } = await loadFixture(deployFaucet);

    //destroy contract
    await expect(faucet.destroyFaucet()).not.to.be.revertedWith(
      "Could not destroy faucet"
    );

    //checking if contract has been removed
    // const code = await ethers.provider.getCode(faucet.getAddress());
    // expect(code).to.equal("0x");
    //verify that calling other functions fails
    // await expect(faucet.withdrawAll()).to.be.reverted;
  });
});
