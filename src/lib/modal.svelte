<script>
  import Icon from '@iconify/svelte'
</script>

<div class="modal">
  <div class="close"><img src="/Close.png" alt="Colse" /></div>
  <slot />
</div>

<style>
  .modal {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 1rem;
    border-width: 3px;
    border-style: solid;
    border-color: var(--gray-400);
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    transform: translate(50%, -50%);
  }
</style>
