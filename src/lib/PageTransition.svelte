<!-- PageTransition.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition'
  export let refresh = ''
</script>

{#key refresh}
  <div
    class="page-transition"
    in:fly={{ x: -5, duration: 500, delay: 250 }}
    out:fly={{ x: 5, duration: 500 }}
  >
    <slot />
  </div>
{/key}

<style>
  .page-transition {
    position: absolute;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
