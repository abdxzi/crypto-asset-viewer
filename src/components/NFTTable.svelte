<script>
    import { dataStore } from "@utils/store";
    import { getNFTsOf } from "@utils/CryptoFcns";

    export let nfts = null;

    let headings = ["NFT", "Preview", "Type"];

    function fetchNFTs(addr) {
        if (addr) {
                getNFTsOf(addr)
                .then((data) => {
                    
                    nfts = data;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    $: fetchNFTs($dataStore.address);
</script>

<div class="tokenTable">
    {#if nfts}
        <h2>NFTs</h2>
        <div class="tableContainer">
            <table>
                <thead>
                    <tr>
                        {#each headings as columnHeading}
                            <th>{columnHeading}</th>
                        {/each}
                    </tr><tr />
                </thead>
                <tbody>
                    {#each nfts.ownedNfts as nft}
                        {#if nft.name}
                            <tr>
                                <td
                                    ><a href={nft?.image?.originalUrl}
                                        >{nft.name}</a
                                    ></td
                                >
                                {#if nft.image?.contentType?.includes("video")}
                                    <td
                                        ><embed
                                            src={nft?.image?.originalUrl}
                                            alt=""
                                        /></td
                                    >
                                {:else}
                                    <td
                                        ><img
                                            src={nft?.image?.originalUrl}
                                            alt=""
                                        /></td
                                    >
                                {/if}

                                <td>{nft.image.contentType}</td>
                            </tr>
                        {/if}
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>

<style>
    .tokenTable {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 20px 0;
    }
    .tokenTable h2 {
        margin: 30px 0px;
        text-decoration: underline;
    }
    .tableContainer {
        width: 80%;
        overflow: auto;
        display: grid;
        place-items: center;
    }
    .tableContainer tr img {
        width: 100px;
        height: 100px;
        background-color: transparent;
        margin-right: 10px;
    }
    .tableContainer td {
        padding: 1rem 2rem;
    }
    ::-webkit-scrollbar {
        width: 0.5em;
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    table {
        border-radius: 10px;
        padding: 10px;
        background-color: rgba(23, 23, 23, 0.56);
    }
    table,
    th {
        border: 1px solid #fff;
    }
    
</style>
