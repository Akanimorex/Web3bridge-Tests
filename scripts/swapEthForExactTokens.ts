import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");    


async function main() {
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const TOKEN_HOLDER = "0x894D55bE079E7e19fe526Ac22B0786b7afE18E7e";

    const WETH_CONTRACT = await ethers.getContractAt("IERC20", WETH);
    const USDC_CONTRACT = await ethers.getContractAt("IERC20", USDC);
    const ROUTER = await ethers.getContractAt("IUniswapV2Router", ROUTER_ADDRESS);

    await helpers.impersonateAccount(TOKEN_HOLDER);
    const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);


    const amountOut = 2000;
    const amountIn = ethers.parseEther("1");



    // await WETH_CONTRACT.approve(ROUTER, amountOut);
    const usdcBalanceBefore = await USDC_CONTRACT.balanceOf(impersonatedSigner.address);
    console.log("USDC balance before: ", ethers.formatEther(usdcBalanceBefore));
    
    const tx = await ROUTER.swapETHForExactTokens(
        amountOut,
        [WETH, USDC],
        impersonatedSigner.address,
        Math.floor(Date.now() / 1000) + 60 * 20,
        { value: amountIn }
      );    //continue here 

    tx.wait();

    const usdcBalanceAfter = await USDC_CONTRACT.balanceOf(impersonatedSigner.address);
    console.log("USDC balance after: ", ethers.formatEther(usdcBalanceAfter));



    

     
    
}




main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
