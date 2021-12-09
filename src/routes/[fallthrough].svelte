<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  // redirect each invalid page to the home page
  onMount(() => goto('/'))
</script>
