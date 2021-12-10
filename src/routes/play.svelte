<script>
  import Modal from '$lib/modal.svelte'
  import TutorialContent from '$lib/tutorial_content.svelte'

  let display = false //Toggle this value to false on start
</script>

<h1>Game Page</h1>
<button
  on:click={() => {
    display = true
  }}>open modal</button
>
{#if display}
  <Modal
    on:close={() => {
      display = false
    }}><TutorialContent /></Modal
  >
{/if}
