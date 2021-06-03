// SPDX-License-Identifier: MIT-0
pragma solidity ^0.8.4;

contract Greeting {
    string public greeting;

    event UpdatedGreeting(string newGreeting);

    constructor(string memory _intialGreeting) {
        greeting = _intialGreeting;
    }

    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
        emit UpdatedGreeting(_newGreeting);
    }

}
