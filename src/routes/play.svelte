<script>
  import { goto } from '$app/navigation'
  import { fade } from 'svelte/transition'
  import Modal from '$lib/modal.svelte'
  import TutorialContent from '$lib/tutorial_content.svelte'
  import Icon from '@iconify/svelte'
  import measuredResult from '../resultStore'
  import images from '../images'

  let revealedCards = []
  let hiddenCards = 0
  let showModal = false // toggle this value to show/hide the modal

  // measure these
  let clicks = 0
  let startTime = null

  $: if (revealedCards.length === 2) {
    const [first, second] = revealedCards
    if (first.src === second.src) {
      first.hidden = second.hidden = true
      hiddenCards += 2
      revealedCards = []
      first.revealed = second.revealed = false
      if (hiddenCards === $images.length) {
        // save result to the result store
        measuredResult.set({
          clicks,
          duration: Date.now() - startTime,
        })
        images.clear()
        // replaceState to prevent going back to the game, doesn't work?
        goto('result', { replaceState: true })
      }
    } else
      setTimeout(() => {
        revealedCards = []
        first.revealed = second.revealed = false
      }, 1000)
  }

  const toggleModal = () => (showModal = !showModal)
</script>

{#if showModal}
  <Modal on:close={toggleModal}><TutorialContent /></Modal>
{:else}
  <i
    transition:fade
    on:click={toggleModal}
    class="absolute top-5 right-5 cursor-pointer 
    opacity-75 hover:opacity-100 transition-opacity"
  >
    <Icon icon="mdi:information-outline" width="30" />
  </i>

  <div class="inline-grid gap-x-1 gap-y-1 grid-cols-4 grid-rows-4 rounded-md">
    {#each $images as image, i}
      <div
        class="cursor-pointer relative rounded-md w-14 h-14 flex flex-col 
    justify-center transition-opacity duration-200 ease-in-out"
        class:opacity-0={image.hidden}
        class:cursor-default={image.hidden || revealedCards.length === 2}
        in:fade={{ delay: (100 * i) / 2, duration: (400 * i) / 4 }}
        on:click={() => {
          if (image.hidden || revealedCards.length === 2) return
          if (!image.revealed) {
            // Pushing to to revealedCards doesn't seem to break the reactive statement
            revealedCards.push(image)
            image.revealed = !image.revealed
            clicks++
            if (!startTime) {
              startTime = Date.now()
            }
          }
        }}
      >
        <div class="front-face card-face bg-gray-100 border border-gray-100">
          {#if image.revealed}
            <img
              transition:fade={{ duration: 100 }}
              src={image.src}
              alt={image.alt}
              class="back-face w-full object-cover object-center"
            />
          {/if}
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .card-face {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    border-style: solid;
    overflow: hidden;
    transition: transform 500ms ease-in-out;
    backface-visibility: hidden;
  }

  .card-back {
    background-color: black;
    transform: rotateY(0);
  }
</style>
