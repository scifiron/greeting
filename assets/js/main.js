const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner()


const greetingAddr = '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e';
const greetingAbi = [{"inputs":[{"internalType":"string","name":"_intialGreeting","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"newGreeting","type":"string"}],"name":"UpdatedGreeting","type":"event"},{"inputs":[],"name":"greeting","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_newGreeting","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const greetingContract = new ethers.Contract(greetingAddr, greetingAbi, provider);

window.onload = async function() {
    document.getElementById('newGreeting').onkeydown = function(e){
        if(e.keyCode == 13){
            changeGreeting();
        }
    };

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    await fetchGreeting();
    greetingContract.on('UpdatedGreeting', updateGreeting);
}

function updateGreeting(newGreeting) {
    let greetingElement = document.getElementById('greeting');
    greetingElement.innerText = newGreeting;
}

async function fetchGreeting() {
    let greeting = await greetingContract.greeting();
    updateGreeting(greeting);
}

async function changeGreeting(form) {
    let newGreeting = document.getElementById('newGreeting').value;

    const greetingContract = new ethers.Contract(greetingAddr, greetingAbi, signer);
    const transaction = await (await greetingContract.setGreeting(newGreeting)).wait();
    fetchGreeting();
}
