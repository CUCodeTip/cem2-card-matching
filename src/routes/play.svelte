<script>
  import Modal from '$lib/modal.svelte'
  import TutorialContent from '$lib/tutorial_content.svelte'

  let showModal = true // toggle this value to show/hide the modal
</script>

<h1>Game Page</h1>
{#if showModal}
  <Modal
    on:close={() => {
      showModal = false
    }}><TutorialContent /></Modal
  >
{/if}
