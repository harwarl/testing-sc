// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Faucet {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withdraw(uint _amount) public payable {
        //user can only withdraw .1 ETh at a time
        require(
            _amount <= 0.1 ether,
            "You can only withdraw 0.1 eth at a time"
        );
        (bool sent, ) = payable(msg.sender).call{value: _amount}(" ");
        require(sent, "Failed to send Ether");
    }

    function withdrawAll() public onlyOwner {
        //Withdraw everything from the contract
        (bool sent, ) = owner.call{value: address(this).balance}(" ");
        require(sent);
    }

    function destroyFaucet() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}(" ");
        require(success, "Could not destroy faucet");
        // selfdestruct(owner);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
}
