const MileageEntry = artifacts.require("MileageEntry");

contract("MileageEntry", (accounts) => {
    let mileageEntry;
    let expectedMileage;

    before(async () => {
        mileageEntry = await MileageEntry.deployed();
    });

    describe("entering mileage and retriving car addresses", async () => {
        before("enter a mileage using account[0] ", async () => {
            await mileageEntry.enter(1000, 3, { from: accounts[0] });
            expectedMileage = mileages[3] + 1000;
        });
    });
});