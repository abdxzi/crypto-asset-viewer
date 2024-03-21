<div style="display:flex; justify-content:center; gap: 10px">
<img src="https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white" />
<img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" />
<img src="https://files.readme.io/51627ed-image.png" height="30px" />
</div>

# Crypto Asset Viewer


This app helps to see the ERC20 tokens and NFTs like asset connected to your crypto wallet

In this project we chose to use Svelte for a front-end and added minimal front-end code


You can find lots of good docs on the AlchemySDK here:
  * [API Quickstart](https://docs.alchemy.com/reference/alchemy-sdk-quickstart)
  * [API Overview](https://docs.alchemy.com/reference/api-overview)


## Live Demo
<a href="" target="_blank"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" /></a>

## Features

✔️ List ERC20 Tokens linked to the address\
✔️ List NFTs linked to the address\
✔️ ENS Name resolving


## Getting Started

1. Clone this project, `cd` into project root directory
2. `pnpm install` to download all the project dependencies.
3. Get alchemy api by creating a app in alchemy dashboard [described here](https://docs.alchemy.com/reference/api-overview)
4. Create an empty `.env` file in root directory and add api key `VITE_APIKEY=`
5. Run `pnpm run dev` to start the app


**⚠️ Note**

> Alchemy API Mainnet Key is a sensitive piece of data. If we were\
> building an enterprise app to conquer the world we would never place\
> this sensitive data in the client code of our blockexplorer project that\
> could potentially be read by anyone.
>
> But hey, we're just learning this stuff right now, not conquering anything\
> yet! :-) It won't be the end of the world to put the Alchemy API key in our\
> front-end code for this project.

