
const contractAddr = {
    '31337': '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    '3': '0x57a2Ab3407768d6adA59293da0477951aac1b99C'
};

const greetingAbi = [{"inputs":[{"internalType":"string","name":"_intialGreeting","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"newGreeting","type":"string"}],"name":"UpdatedGreeting","type":"event"},{"inputs":[],"name":"greeting","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_newGreeting","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function updateGreeting(newGreeting) {
    let greetingElement = document.getElementById('greeting');
    greetingElement.innerText = newGreeting;
}

function setError(message) {
    let greetingElement = document.getElementById('greeting');
    greetingElement.classList.add('error');
    greetingElement.innerText = message;
}

async function fetchGreeting() {
    let greeting = await greetingContract.greeting();
    updateGreeting(greeting);
}

async function changeGreeting(form) {
    let newGreeting = document.getElementById('newGreeting').value;

    const greetingContract = new ethers.Contract(contractAddr[chainId], greetingAbi, signer);
    const transaction = await (await greetingContract.setGreeting(newGreeting)).wait();
    fetchGreeting();
}

window.onload = async function() {
    if( !window.ethereum ) {
        setError("No provider found, please install metamask.");
    } else {
        document.getElementById('greetingSetter').classList.remove('hidden');
        
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner()

        chainId = (await provider.detectNetwork()).chainId;
        greetingContract = new ethers.Contract(contractAddr[chainId], greetingAbi, provider);

        document.getElementById('newGreeting').onkeydown = function(e){
            if(e.keyCode == 13){
                changeGreeting();
            }
        };

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await fetchGreeting();
        greetingContract.on('UpdatedGreeting', updateGreeting);
    }
}


