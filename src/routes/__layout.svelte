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

  // changes on page navigation, trigger page transition
  export let pagePath: string

  let particlesConfig = null

  onMount(async () => {
    // This needs to be imported on client only or else Vite complains about window not being defined
    particlesConfig = (await import('../particlesConfig')).default
    // request.auth cannot be null when interacting with firestore, see firestore.rules
    await signInAnonymously(auth)
    // prefetch routes and preload images to speed things up
    prefetchRoutes()
    preloadImages()
    // shuffle images if the user has already submitted
    if (
      hasSubmittedLocally(auth.currentUser.uid) ||
      hasSubmittedToFirestore(auth.currentUser.uid)
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
    <Particles id="tsparticles" options={$particlesConfig} />
  </div>
{/if}

<style windi:preflights:global windi:safelist:global>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --gray-400: #cbd5e0;
    --gray-900: #1a202c;
    --gray-100: #f7fafc;
    --font-base: 1.3rem;
    background-color: var(--gray-900);
    color: var(--gray-100);
  }

  main {
    width: 100vh;
    min-height: 100vh;
    overflow: hidden;
  }

  :global(h1) {
    line-height: 1.2;
    @apply text-4xl text-gray-100;
    font-weight: bold;
    margin: 0;
  }

  :global(button) {
    font-family: inherit;
    font-size: x-large;
    font-style: italic;
    font-weight: bold;
    padding: 0.8125rem 2.1875rem;
    color: var(--gray-100);
    background-color: var(--gray-900);
    border-radius: 30px;
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

  :global(p) {
    line-height: 1.6;
    font-size: var(--font-base);
  }

  :global(span) {
    line-height: 1.6;
    font-size: var(--font-base);
  }
</style>
