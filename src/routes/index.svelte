<script lang="ts">
  import LandingContent from '$lib/LandingContent.svelte'
  import StartButton from '$lib/StartButton.svelte'
  import { onMount } from 'svelte'
  import { flip } from 'svelte/animate'
  import { fly, fade } from 'svelte/transition'

  let pageContent = [LandingContent]
  let fontLoaded = false

  onMount(async () => {
    // let all fonts loaded
    setTimeout(() => {
      fontLoaded = true
    }, 1000 /* after this duration, fonts should be loaded */)

    setTimeout(() => {
      pageContent = [LandingContent, StartButton]
    }, 2500)
  })
</script>

{#if fontLoaded}
  <div in:fade>
    {#each pageContent as component (component)}
      <div in:fly={{ y: 20 }} animate:flip>
        <svelte:component this={component} />
      </div>
    {/each}
  </div>
{/if}

<style>
</style>
