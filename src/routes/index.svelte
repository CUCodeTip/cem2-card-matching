<script lang="ts">
  import { playBGM } from '../utils'
  import LandingContent from '$lib/LandingContent.svelte'
  import StartButton from '$lib/StartButton.svelte'
  import { onMount } from 'svelte'
  import { flip } from 'svelte/animate'
  import { fly } from 'svelte/transition'

  let pageContent = [LandingContent]
  let audio = null
  onMount(async () => {
    setTimeout(() => {
      pageContent = [LandingContent, StartButton]
    }, 1000)

    audio = (await import('../sounds')).default
  })
</script>

{#each pageContent as component (component)}
  <div on:click={audio.play()} in:fly={{ y: 20 }} animate:flip>
    <svelte:component this={component} />
  </div>
{/each}

<style>
</style>
