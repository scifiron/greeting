const provider = new ethers.providers.Web3Provider(window.ethereum);

const greetingAddr = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';
const greetingAbi = [{"inputs":[{"internalType":"string","name":"_intialGreeting","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"greeting","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_newGreeting","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const greetingContract = new ethers.Contract(greetingAddr, greetingAbi, provider);

window.onload = async function() {
    let greeting = await greetingContract.greeting();
    let greetingElement = document.getElementById('greeting');
    greetingElement.innerText = greeting;
}
