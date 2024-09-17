// // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// // Uncomment this line to use console.log
// // import "hardhat/console.sol";

contract Ludo {

    uint8 playerCount;
    

    struct Player {
        address playerAddress;
        uint256 registrationTime;
        uint256 playerPoints;
    }

    mapping(uint256 => Player) public players;

    function registerPlayer() external {
        require(playerCount >= 4, "players are complete");
        Player memory newPlayer;

        newPlayer.playerAddress = msg.sender;
        newPlayer.registrationTime = block.timestamp;
        newPlayer.playerPoints = 0;

        players[playerCount] = newPlayer;
        playerCount = playerCount + 1;
    }
    
    function startGame() external {
        require(playerCount == 4, "players are not complete");

       for(uint8 i = 0; i < playerCount; i++) {
        players[i].playerPoints = 0;
        // to roll a dice for a player
        uint8 diceRoll = rollDice();
            diceRoll;
        }
        
        
    }

    function rollDice() private view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.prevrandao, msg.sender))) % 6) + 1;
    }


   

}
