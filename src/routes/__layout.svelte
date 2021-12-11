<script lang="ts" context="module">
  export const load = async ({ page }) => ({
    props: {
      pagePath: page.path,
    },
  })
</script>

<script lang="ts">
  import { signInAnonymously } from 'firebase/auth'
  import { auth } from '../initFirebase'
  import { onMount } from 'svelte'
  import Particles from 'svelte-particles'
  import { fade } from 'svelte/transition'
  import { prefetchRoutes } from '$app/navigation'
  import PageTransition from '$lib/PageTransition.svelte'
  import {
    hasSubmittedLocally,
    hasSubmittedToFirestore,
    preloadImages,
  } from '../utils'
  import images from '../images'
  import particlesConfig from '../particlesConfig'

  // changes on page navigation, trigger page transition
  export let pagePath: string

  onMount(async () => {
    // request.auth cannot be null when interacting with firestore, see firestore.rules
    await signInAnonymously(auth)
    // prefetch routes and preload images to speed things up
    prefetchRoutes()
    preloadImages()
    // shuffle images if the user has already submitted
    if (
      hasSubmittedLocally(auth.currentUser.uid) ||
      (await hasSubmittedToFirestore(auth.currentUser.uid))
    )
      images.shuffle()
  })
</script>

<main>
  <PageTransition refresh={pagePath}>
    <slot />
  </PageTransition>
</main>

{#if particlesConfig}
  <div in:fade>
    <Particles id="tsparticles" options={particlesConfig} />
  </div>
{/if}

<svelte:head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap');
  </style>
</svelte:head>

<style windi:preflights:global windi:safelist:global>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --gray-400: #cbd5e0;
    --gray-900: #1a202c;
    --gray-100: #f7fafc;
    background-color: var(--gray-900);
    color: var(--gray-100);
  }

  main {
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
  }

  :global(h1) {
    @apply text-5xl text-gray-100 sm:(text-7xl);
    font-family: 'Comic Boys', cursive;
    font-weight: normal;
    margin: 0;
  }

  :global(p, span) {
    @apply text-xl sm:text-3xl;
    font-family: 'Gaegu', cursive;
  }

  :global(button) {
    @apply text-3xl rounded-[30px] sm:(text-5xl rounded-[40px]);
    font-family: 'Cream Shoes', cursive;
    padding: 0.4125rem 2.1875rem;
    color: var(--gray-100);
    background-color: var(--gray-900);
    border: 3px solid var(--gray-100);
    outline: none;
    font-variant-numeric: tabular-nums;
  }
  :global(button:hover) {
    background-color: var(--gray-100);
    color: var(--gray-900);
  }
  :global(button:focus) {
    outline: none;
  }
  :global(button:active) {
    background-color: var(--gray-400);
    border-color: var(--gray-400);
    color: var(--gray-900);
  }

  @font-face {
    font-family: 'Comic Boys';
    src: url('/fonts/ComicBoys.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Cream Shoes';
    src: url('/fonts/Creamshoes.ttf') format('truetype');
  }
</style>
