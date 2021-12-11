<script lang="ts">
  import { goto } from '$app/navigation'
  import { flip } from 'svelte/animate'
  import { fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  import measuredResult from '../resultStore'
  import Annoucnement from '$lib/Annoucnement.svelte'
  import ReplayButton from '$lib/ReplayButton.svelte'

  onMount(() => {
    // if there is no result, go back to the home page
    if (!$measuredResult.duration) {
      goto('/', { replaceState: true })
    }
  })
  let pageContent = [Annoucnement]

  onMount(() => {
    setTimeout(() => {
      pageContent = [Annoucnement, ReplayButton]
    }, 2000)
  })
</script>

{#if $measuredResult.duration}
  {#each pageContent as component (component)}
    <div
      in:fly={{ y: 20 }}
      animate:flip
      class:mt-4={component === ReplayButton}
    >
      <svelte:component this={component} />
    </div>
  {/each}
{/if}

<style>
</style>
