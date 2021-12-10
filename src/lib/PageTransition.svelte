<!-- PageTransition.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition'
  export let refresh = ''
</script>

{#key refresh}
  <div class="page-transition" transition:fade={{ duration: 1000 }}>
    <slot />
  </div>
{/key}

<style>
  .page-transition {
    position: absolute;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1rem;
    overflow: hidden;
  }
</style>
