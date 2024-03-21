<script>
    import { dataStore, spinnerStore } from "../utils/store";
    import {
        isValidETHAddress,
        isENSName,
        resolveENS,
    } from "@utils/CryptoFcns";
    import toast from "svelte-french-toast";

    let search = "";

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            if (isValidETHAddress(search)) {
                resetData();
                updateData(search);
                $spinnerStore = {
                    spinner: true,
                };
            } else if (isENSName(search)) {
                toast.success("Resolving ENS Name...", { duration: 800 });
                resolveENS(search)
                    .then((data) => {
                        if(data){
                            resetData();
                            updateData(data);
                            $spinnerStore = {
                                spinner: true,
                            };
                        } else {
                            toast.error("ENS resolve Failed")
                        }
                    })
                    .catch(e =>{console.log(e)});
            } else {
                toast.error("Not valid ETH address !", { duration: 800 });
            }
        }
    }

    function resetData() {
        $dataStore = {
            address: null,
        };
    }

    function updateData(data) {
        $dataStore = {
            address: data,
        };
    }
</script>

<div class="search">
    <input
        bind:value={search}
        placeholder="Enter wallet address or .eth ENS Names..."
        on:keydown={handleKeyDown}
    />
</div>

<style>
    .search {
        width: 100%;
        display: flex;
        justify-content: center;
        /* background-color: aquamarine; */
    }
    .search input {
        padding: 0.5rem 0.725rem;
        border-radius: 5px;
        width: 70%;
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            "Open Sans",
            "Helvetica Neue",
            sans-serif;
        /* background-color: bisque; */
    }
</style>
