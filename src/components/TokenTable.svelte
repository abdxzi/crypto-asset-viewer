<script>
    import {
        hexToEther,
        getTokenBalances,
        getTokenMetadata,
    } from "@utils/CryptoFcns";
    import { dataStore, spinnerStore } from "@utils/store";

    let headings = ["Symbol", "Name", "Amount"];
    let balances = null;
    let metadata = null;

    function fetchTokens(addr) {
        if (addr) {
            console.log("Fetching erc20");

            getTokenBalances(addr)
                .then((data) => {
                    balances = data;
                    getTokenMetadata(data).then(async (arr) => {
                        metadata = await Promise.all(arr);
                        $spinnerStore = {
                            spinner: false,
                        };
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    $: fetchTokens($dataStore.address);
</script>

<div class="tokenTable">
    {#if balances && metadata}
        <h2>ERC 20 Tokens</h2>
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
                    {#each balances.tokenBalances as balance, index}
                        {#if balance.tokenBalance != "0x0000000000000000000000000000000000000000000000000000000000000000"}
                            <tr>
                                <td class="symbol"
                                    ><img
                                        src={metadata[index].logo
                                            ? metadata[index].logo
                                            : "https://via.placeholder.com/200"}
                                        alt=""
                                    />{metadata[index].symbol}</td
                                >
                                <td>{metadata[index].name}</td>
                                <td>{hexToEther(balance.tokenBalance)}</td>
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
        /* justify-content: center; */
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
    
    .symbol {
        display: inline-flex;
        align-items: center;
    }
    .tableContainer tr img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
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
    .tokenTable table {
        border-radius: 10px;
        padding: 10px;
        background-color: rgba(23, 23, 23, 0.56);
    }
    table,
    th {
        border: 1px solid #fff;
    }
</style>
