async function main() {
    const Greeting = await ethers.getContractFactory("Greeting");
    const greeting = await Greeting.deploy("Inital Greeting");

    console.log("Greeting deployed to: ", greeting.address);
}


main()
    .then(() => process.exit(1))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });
