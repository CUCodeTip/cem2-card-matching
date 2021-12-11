<script lang="ts">
  import { goto } from '$app/navigation'
</script>

<button
  on:click={() => {
    goto('play', { replaceState: true })
  }}
>
  Replay
</button>
