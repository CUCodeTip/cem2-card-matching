<script>
  import { createEventDispatcher } from 'svelte'
  import { scale } from 'svelte/transition'

  let src = '/Close.png'
  let mouseIn = false
  const dispatch = createEventDispatcher()

  function emitClose() {
    dispatch('close')
  }
  function setNormalPicture() {
    src = '/Close.png'
  }
  function setHoverPicture() {
    src = '/Close_hover.png'
  }
  function setActivePicture() {
    src = '/Close_active.png'
  }
</script>

<div class="absolute" in:scale={{ start: 0.9 }} out:scale>
  <div class="modal">
    <div
      class="close"
      on:mousedown={() => {
        setActivePicture()
      }}
      on:mouseup={() => {
        if (mouseIn) {
          setHoverPicture()
        } else {
          setNormalPicture()
        }
      }}
      on:mouseenter={() => {
        setHoverPicture()
        mouseIn = true
      }}
      on:mouseleave={() => {
        setNormalPicture()
        mouseIn = false
      }}
      on:click={emitClose}
    >
      <img class="box-border w-44 sm:w-68" {src} alt="Colse" />
    </div>
    <slot>deafult</slot>
  </div>
</div>

<style>
  .absolute {
    position: absolute;
  }
  .modal {
    @apply box-border p-5 m-5 max-w-86 sm:(p-11 max-w-screen);
    display: flex;
    position: relative;
    flex-direction: column;
    border-width: 3px;
    border-style: solid;
    border-color: var(--gray-100);
    border-radius: 30px 0px 30px 30px;
    background-color: var(--gray-900);
    z-index: 99;
  }

  .close {
    @apply w-9 sm:w-12;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    transform: translate(50%, -50%);
  }
</style>
