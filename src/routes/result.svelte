<script lang="ts">
  import { goto } from '$app/navigation'

  import { onMount } from 'svelte'

  import measuredResult from '../resultStore'
  import { getTimeinMinuteFormat } from '../utils'

  // Get score from play page
  const cardCount = 16
  let minute: number, second: number
  // This doesn't work somehow
  // $: { minute, second } = getTimeinMinuteFormat($measuredResult.duration)
  $: {
    const { minute: min, second: sec } = getTimeinMinuteFormat(
      $measuredResult.duration
    )
    minute = min
    second = sec
  }
  $: secondText = ('0' + second).slice(0, 2)

  // time unit is milli second
  const calculateScore = (time: number, clickCount: number) => {
    // if player spend time more than one minute, deduce 20 points per second
    const timePenalty =
      time < 60000 ? 1 : Math.floor((time - 60000) / 1000) * 50
    const clickPenalty =
      clickCount < 1.5 * cardCount ? 0 : (clickCount - 1.5 * cardCount) * 100
    return 10000 - timePenalty - clickPenalty
  }

  const getCongratText = (score: number) => {
    if (score >= 9500) {
      return 'You are the god!'
    } else if (score >= 8000) {
      return 'Excellent!'
    } else if (score >= 6000) {
      return 'Good job!'
    } else if (score >= 3500) {
      return 'Not bad Not bad, but try harder next time...'
    } else {
      return 'May be today is not your day...'
    }
  }

  $: score = calculateScore($measuredResult.duration, $measuredResult.clicks)
  $: congratText = getCongratText(score)

  onMount(() => {
    // if there is no result, go back to the home page
    if (!$measuredResult.duration) {
      goto('/', { replaceState: true })
    }
  })
</script>

{#if $measuredResult.duration}
  <h1 class="mb-4">{congratText}</h1>
  <p>
    You took {$measuredResult.clicks} clicks to finish.<br />
    Total time taken {`${minute}:${secondText}`}<br />
    Your score is {score}
  </p>
{/if}

<style>
</style>
