// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Ludo {

    struct Player {
        address playerAddress;
        uint256 registrationTime;
        uint256 playerPoints;
    }

    mapping(uint256 => Player) public players;
    uint256 playerCount;

    function registerPlayer(address _player) external {
        Player memory newPlayer;

        newPlayer.playerAddress = msg.sender;

    }
   
}
