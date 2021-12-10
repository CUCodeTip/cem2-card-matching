<script>
  import { goto } from '$app/navigation'
  import { fade } from 'svelte/transition'

  let images = [
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
  ]

  let revealedCards = []
  let hiddenCards = 0

  $: if (revealedCards.length === 2) {
    const [first, second] = revealedCards
    if (first.src === second.src) {
      first.hidden = second.hidden = true
      hiddenCards += 2
      if (hiddenCards === images.length) {
        images = [] // prevent weird page transition behavior
        goto('result')
      }
    }
    revealedCards = []
    first.revealed = second.revealed = false
  }
</script>

<div class="inline-grid gap-x-1 gap-y-1 grid-cols-4 grid-rows-4 rounded-md">
  {#each images as image, i}
    <div
      class="cursor-pointer relative rounded-md w-14 h-14 flex flex-col 
      justify-center transition-opacity duration-200 ease-in-out"
      class:opacity-0={image.hidden}
      class:cursor-default={image.hidden}
      in:fade={{ delay: (100 * i) / 2, duration: (400 * i) / 4 }}
      on:click={() => {
        if (image.hidden) {
          return
        }
        if (!image.revealed) {
          revealedCards = [...revealedCards, image]
          image.revealed = !image.revealed
        }
      }}
    >
      <div class="front-face card-face bg-gray-100 border-gray-100">
        {#if image.revealed}
          <img
            transition:fade={{ duration: 100 }}
            src={image.src}
            alt={image.alt}
            class="back-face object-cover object-center"
          />
        {/if}
      </div>
    </div>
  {/each}
</div>

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
