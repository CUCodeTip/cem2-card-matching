<script>
  import { fade } from 'svelte/transition'

  const images = [
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
    { src: './favicon.png', alt: 'og-image', revealed: false },
  ]

  let revealedCards = 0
  $: if (revealedCards === 2) {
    // do something
  }
</script>

<div
  class="board inline-grid gap-x-1 gap-y-1 grid-cols-4 grid-rows-4 rounded-md"
>
  {#each images as image}
    <div
      class="box relative rounded-md  w-14 h-14 flex flex-col justify-center"
      transition:fade
      on:click={() => {
        image.revealed = !image.revealed
        // if (revealedCards < 2 && !image.revealed) {
        //   image.revealed = true
        //   revealedCards++
        // }
      }}
    >
      <div class="front-face card-face bg-gray-100 border-gray-100">
        {#if image.revealed}
          <img
            transition:fade={{ duration: 100 }}
            src={image.src}
            alt="s"
            class="back-face object-cover object-center"
          />
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .box {
    cursor: pointer;
  }

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

  .card.visible .card-back {
    transform: rotateY(-180deg);
  }

  .card.visible .card-front {
    transform: rotateY(0);
  }

  .card.matched .card-front .card-value {
    animation: dance 1s linear infinite 500ms;
  }

  .card-back {
    background-color: black;
    transform: rotateY(0);
  }
</style>
