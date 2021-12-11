<script lang="ts">
  import { goto } from '$app/navigation'
  import images from '../images'
</script>

<button
  on:click={() => {
    images.resetWithShuffle()
    goto('play', { replaceState: true })
  }}
>
  Replay
</button>
