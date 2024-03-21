<script>
    import { onMount } from "svelte";

    let width = 0;
    let height = 0;

    onMount(() => {
        // Update dimensions on mount
        updateDimensions();

        // Update dimensions on resize
        window.addEventListener("resize", updateDimensions);

        return () => {
            // Cleanup event listener on component destroy
            window.removeEventListener("resize", updateDimensions);
        };
    });

    function updateDimensions() {
        width = window.innerWidth;
        height = window.innerHeight;
    }
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="screen-size">
    {width} x {height} px
</div>

<style>
    .screen-size {
        position: fixed;
        top: 0;
        right: 0;
    }
</style>