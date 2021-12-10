<script>
  import { cubicOut } from 'svelte/easing'
  import { createEventDispatcher } from 'svelte'

  let src = '/Close.png'
  let mouseIn = false
  const dispatch = createEventDispatcher()

  function emitClose() {
    //Use: <Inner on:close={display state}/>
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

  function zoomIn(node, { duration }) {
    return {
      duration,
      css: (t) => {
        const eased = cubicOut(t)
        return `
					transform: scale(${eased}) ;
          
          `
      },
    }
  }
  function zoomOut(node, { duration }) {
    return {
      duration,
      css: (t) => {
        return `
					transform: scale(${t}) ;
          opacity: ${t}; 
          `
      },
    }
  }
</script>

<div
  class="absolute"
  in:zoomIn={{ duration: 500 }}
  out:zoomOut={{ duration: 200 }}
>
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
      <img {src} alt="Colse" />
    </div>
    <slot>deafult</slot>
  </div>
</div>

<style>
  .absolute {
    position: absolute;
  }
  .modal {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 3.125rem;
    border-width: 3px;
    border-style: solid;
    border-color: var(--gray-100);
    border-radius: 30px 0px 30px 30px;
    background-color: var(--gray-900);
    z-index: 99;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    transform: translate(50%, -50%);
    width: 3rem;
  }
</style>
