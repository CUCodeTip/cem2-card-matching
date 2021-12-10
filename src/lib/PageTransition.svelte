<!-- PageTransition.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition'
  export let refresh = ''
</script>

{#key refresh}
  <div
    class="page-transition"
    in:fly={{ x: -5, duration: 500, delay: 750 }}
    out:fly={{ x: 5, duration: 500 }}
  >
    <slot />
  </div>
{/key}

<style>
  .page-transition {
    position: absolute;
  }
</style>
