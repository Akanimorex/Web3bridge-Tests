import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
    const MNT = "0x3c3a81e81dc49A522A592e7622A7E711c06bf354";
    const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"


    const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

    await helpers.impersonateAccount(TOKEN_HOLDER);
    const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);

    const amountOut = ethers.parseUnits("20", 18);
    const amountInMax = ethers.parseUnits("1000", 6);

    const USDC_Contract = await ethers.getContractAt("IERC20", USDC, impersonatedSigner);
    const UNI_Contract = await ethers.getContractAt("IERC20",UNI,impersonatedSigner);
    const USDT_Contract = await ethers.getContractAt("IERC20",USDT,impersonatedSigner);
    const USDC_USDT_LP = "0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f";


    
    const ROUTER = await ethers.getContractAt("IUniswapV2Router", ROUTER_ADDRESS, impersonatedSigner);

    //approve token

    await USDC_Contract.approve(ROUTER, amountOut);

    const usdcBal = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const usdtBal = await USDT_Contract.balanceOf(impersonatedSigner.address);

    
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    

   
    const usdcBalAfter = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const uniBalAfter = await UNI_Contract.balanceOf(impersonatedSigner.address);
    console.log("=========================================================");

    




    //for adding liquidity

    const amountADesired = ethers.parseUnits("1",18);
    const amountBDesired = ethers.parseUnits("2",6)
    // const amountAMin = ethers.parseUnits("0", 18);
    // const amountBMin = ethers.parseUnits("0", 18)



    await USDC_Contract.approve(ROUTER, amountADesired);
    await USDT_Contract.approve(ROUTER, amountBDesired);

    const USDC_USDT_LPCONTRACT = await ethers.getContractAt("IERC20", USDC_USDT_LP, impersonatedSigner);


    // await UNI_Contract.approve(ROUTER, amountBDesired);

   

    console.log("usdc balance before liquidity add", Number(usdcBal));
    // console.log("dai balance before swap", Number(daiBal));
    console.log("dai balance before liquidity add", Number(usdtBal));

    const lpBalanceBeforeLiquidityAdd = await USDC_USDT_LPCONTRACT.balanceOf(impersonatedSigner.address);

    console.log("LP balance before addition !!!", ethers.formatUnits(lpBalanceBeforeLiquidityAdd))

    const tx = await ROUTER.addLiquidity(
        USDC,
        USDT,
        amountADesired,
        amountBDesired,
        0,
        0,
        TOKEN_HOLDER,
        deadline
    );

    tx.wait();

    // console.log(tx,"TRANSACTION LIQUIDITY")

    console.log("liquidity added!");

    const lpBalanceAfterLiquidityAdd = await USDC_USDT_LPCONTRACT.balanceOf(impersonatedSigner.address);
    console.log("LP balance after addition !!!", ethers.formatUnits(lpBalanceAfterLiquidityAdd));

    


 



    console.log("usdc balance after liquidity", Number(usdcBal));
    console.log("uni balance after liquidity", Number(usdtBal));



    //Removing liquidity

    const tokenA = ethers.parseUnits('1',18);
    const tokenB = ethers.parseUnits('2',6);

    const liquidity = ethers.parseUnits('0.000000000001516536',18)

    await USDC_USDT_LPCONTRACT.approve(ROUTER,liquidity);

    const removeLiqTx = await ROUTER.removeLiquidity(
        USDC,
        USDT,
        liquidity,
        0,
        0,
        TOKEN_HOLDER,
        deadline    
    )

    removeLiqTx.wait();

    console.log("liquidity removed!");

    console.log("lp balance after liq removal", ethers.formatUnits(await USDC_USDT_LPCONTRACT.balanceOf(impersonatedSigner.address)));

    // const usdcBalAfterRemoval = await USDC_Contract.balanceOf(impersonatedSigner.address);
    // const usdtBalAfterRemoval = await USDT_Contract.balanceOf(impersonatedSigner.address);
    






    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
