const { expect } = require("chai");

describe("Greeeter", function() {
    it("Should initalize with the provided greeting", async function() {
        const Greeting = await ethers.getContractFactory("Greeting");
        const greeting = await Greeting.deploy("Initial greeting");

        await greeting.deployed();

        expect(await greeting.greeting()).to.equal("Initial greeting");
    });

    it("Should change the greeting", async function() {
        const Greeting = await ethers.getContractFactory("Greeting");
        const greeting = await Greeting.deploy("Initial greeting");
        await greeting.deployed();

        await greeting.setGreeting("New greeting!");

        expect(await greeting.greeting()).to.equal("New greeting!");
    })
});
