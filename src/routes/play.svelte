<script>

    import { fade } from 'svelte/transition'
    let images = ['./og-image.png','./favicon.png','./favicon.png','./favicon.png',
    './favicon.png','./favicon.png','./favicon.png','./favicon.png',
    './favicon.png','./favicon.png','./favicon.png','./favicon.png',
    './favicon.png','./favicon.png','./favicon.png','./favicon.png',];

    let isRevealed = false
    function revealCard(){
        isRevealed = true;
    }

</script>

<h1>GOOD LUCK</h1>
<div class="board inline-grid gap-x-1 gap-y-1 grid-cols-4 grid-rows-4 rounded-md">
{#each images as image}
<div class="box relative rounded-md  w-14 h-14 flex flex-col justify-center" transition:fade>
   
    <div class="front-face card-face">
        <img src={image} alt="s" class="back-face">
    </div>
    <div on:click={revealCard} class="back-face card-face bg-gray-100 hover:bg-gray-500">
    </div>
    
    <!-- <img src={image} alt="s" class="back-face"> -->
</div> 
{/each}
</div>

<!-- <section class="board">
{#each images as image}
    <div class="card" data-framework="aurelia">
      <img class="front-face" src="img/aurelia.svg" alt="Aurelia" />
      <img class="back-face" src="img/js-badge.svg" alt="JS Badge" />
    </div>
{/each}
</section> -->

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