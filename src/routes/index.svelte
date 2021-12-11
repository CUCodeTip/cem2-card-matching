<script lang="ts">
  import LandingContent from '$lib/LandingContent.svelte'
  import StartButton from '$lib/StartButton.svelte'
  import { onMount } from 'svelte'
  import { flip } from 'svelte/animate'
  import { fly } from 'svelte/transition'

  let pageContent = [LandingContent]

  onMount(() => {
    setTimeout(() => {
      pageContent = [LandingContent, StartButton]
    }, 1000)
  })
</script>

{#each pageContent as component (component)}
  <div in:fly={{ y: 20 }} animate:flip>
    <svelte:component this={component} />
  </div>
{/each}

<style>
</style>
