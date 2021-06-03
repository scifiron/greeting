const chai = require("chai"), expect = chai.expect;
chai.use(require('chai-like'));
chai.use(require('chai-things'));

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
    });

    it("Emit event when greeting is changed", async function() {
        const Greeting = await ethers.getContractFactory("Greeting");
        const greeting = await Greeting.deploy("Initial greeting");
        await greeting.deployed();

        const tx = await (await greeting.setGreeting("New greeting!")).wait();

        expect(tx.events).to.include.that.something.like({ 
            event: 'UpdatedGreeting' ,
            args: ['New greeting!'] 
        });
    });
});

