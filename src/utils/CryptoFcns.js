import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { ethers } from 'ethers';

const config = {
    apiKey: import.meta.env.VITE_APIKEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

async function getTokenBalances(address) {
    const data = await alchemy.core.getTokenBalances(address);
    return data;
}

async function getTokenMetadata(data) {
    let tokenDataPromises = [];
    for (let i = 0; i < data.tokenBalances.length; i++) {
        const tokenData = alchemy.core.getTokenMetadata(
            data.tokenBalances[i].contractAddress
        );
        tokenDataPromises.push(tokenData);
    }

    return tokenDataPromises;
}

function hexToEther(hex) {
    const tokenBalanceEther = ethers.formatUnits(hex, 'ether');
    return tokenBalanceEther;
}

async function getNFTsOf(address) {
    const data = await alchemy.nft.getNftsForOwner(address);
    return data;
}

// async function getNFTsMetadata(data){
//     let nftPromises = []
//     for (let i = 0; i < data.ownedNfts.length; i++) {
//         const tokenData = alchemy.nft.getNftMetadata(
//           data.ownedNfts[i].contract.address,
//           data.ownedNfts[i].tokenId
//         );
//         nftPromises.push(tokenData);
//       }

//     return nftPromises;
// }

function isValidETHAddress(str) {
    let regex = new RegExp(/^(0x)?[0-9a-fA-F]{40}$/);
    if (str == null) {
        return false;
    }

    if (regex.test(str) == true) {
        return true;
    } else {
        // console.log("");
        return false;
    }
}
function isENSName(input) {
    const ensNameRegex = /^[a-z0-9.-]+\.eth$/;
    
    if (ensNameRegex.test(input)) {
        return true;
    } else {
        return false;
    }
}

async function resolveENS(ens) {
    return await alchemy.core.resolveName(ens);
}




async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const walletAddress = (await signer).address;
        return walletAddress;
    } else {
        throw 'No Ethereum provider detected. Please install an Ethereum wallet.';
    }
}

const shortenAddress = (address) => `${address?.slice(0, 4)}..${address?.slice(address.length - 3)}`;

export { getTokenBalances, getTokenMetadata, hexToEther, getNFTsOf, isValidETHAddress,connectWallet, resolveENS, isENSName, shortenAddress};



