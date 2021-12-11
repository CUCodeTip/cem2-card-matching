<script>
  import { goto } from '$app/navigation'
  import { fade } from 'svelte/transition'
  import Modal from '$lib/modal.svelte'
  import TutorialContent from '$lib/tutorial_content.svelte'
  import Icon from '@iconify/svelte'
  import measuredResult from '../resultStore'
  import images from '../images'

  let revealedCards = []
  let removedCards = 0
  let showModal = false // toggle this value to show/hide the modal

  // measure these
  let clicks = 0
  let startTime = null

  // delay when the image is about to be hidden
  const transitionDelay = 500

  $: if (revealedCards.length === 2) {
    const [first, second] = revealedCards
    if (first.src === second.src) {
      first.hidden = second.hidden = true
      removedCards += 2
      revealedCards = []
      if (removedCards === $images.length) {
        // save result to the result store
        measuredResult.set({
          clicks,
          duration: Date.now() - startTime,
        })
        // replaceState to prevent going back to the game, doesn't work?
        setTimeout(async () => {
          await goto('result', { replaceState: true })
          images.clear()
        }, transitionDelay + 10)
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

  <div class="inline-grid gap-1 grid-cols-4 grid-rows-4 rounded-md sm:(gap-2)">
    {#each $images as image, i}
      <div
        class="cursor-pointer relative flex flex-col w-16 h-16
    justify-center transition-opacity duration-200 ease-in-out sm:(w-26 h-26)"
        class:opacity-0={image.hidden}
        style={`transition-delay: ${transitionDelay}ms`}
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
        <div
          class="front-face card-face overflow-hidden bg-gray-100 border border-gray-100 hover:bg-gray-400"
        >
          <!-- {#if image.revealed} -->
          <img
            transition:fade={{ duration: 100 }}
            src={image.src}
            alt={image.alt}
            class="back-face h-full w-full object-cover object-center"
          />
          <!-- {/if} -->
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
    border-radius: 20%;
    border-style: solid;
    overflow: removed;
    transition: transform 500ms ease-in-out;
    backface-visibility: removed;
  }

  .card-back {
    background-color: black;
    transform: rotateY(0);
  }
</style>
