<!-- PageTransition.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition'
  export let refresh = ''
</script>

{#key refresh}
  <main
    in:fly={{ x: -10, duration: 500, delay: 500 }}
    out:fly={{ x: 10, duration: 500 }}
  >
    <slot />
  </main>
{/key}

<style>
  main {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-height: 100vh;
    margin: 0 auto;
    padding: 1rem;
  }
</style>
