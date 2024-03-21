<script>
    import { connectWallet } from "@utils/CryptoFcns";
    import { dataStore, spinnerStore } from "@utils/store";

    import toast from "svelte-french-toast";

    const handleClick = async () => {
        let addr = null;
        try {
            addr = await connectWallet();
            toast.success("Wallet connected");

            $spinnerStore = {
                spinner: true,
            };
            $dataStore = {
                address: addr,
            };
        } catch (e) {
            toast.error(e);
        }
    };
</script>

<div class="topbar">
    <h2>Crypto Asset Viewer</h2>
    <button on:click={handleClick}>Connect wallet</button>
    <p>OR</p>
</div>

<style>
    .topbar {
        display: flex;
        justify-content: space-between;
        padding: 20px 5svw;
        text-align: center;
    }
    .topbar p {
        display: none;
    }
    @media (max-width: 480px) {
        .topbar {
            flex-direction: column;
            /* place-items: center; */
        }
        .topbar button {
            margin: auto 50px;
            margin-top: 30px;
        }
        .topbar p {
            display: block;
            margin-top: 20px;
        }
    }
</style>
