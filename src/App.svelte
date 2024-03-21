<script>
  import TopBar from "@components/TopBar.svelte";
  import Search from "@components/Search.svelte";
  import TokenTable from "@components/TokenTable.svelte";
  import NFTTable from "@components/NFTTable.svelte";
  import Spinner from "@components/Spinner.svelte";

  import { spinnerStore, dataStore } from "@utils/store";

  let showSpinner = false;

  import { Toaster } from 'svelte-french-toast';

</script>

<main>
  <TopBar />
  <Search />
  {#if $spinnerStore.spinner}
    <Spinner />
  {/if}
  {#if $dataStore.address}
    <p>
      Assets for Address: <strong>{$dataStore.address}</strong>
    </p>
  {/if}

  <TokenTable />
  <NFTTable />

  {#if !$dataStore.address}
    <p>
      Note: Connect Wallet or Search Address to see crypto Assets (ERC20 tokens,
      NFTs)
    </p>
  {/if}

  <Toaster />
</main>

<style>
  p {
    text-align: center;
    font-size: small;
    margin-top: 40px;
  }
</style>
