<script lang="ts">
  import measuredResult from '../resultStore'
  import { getTimeinMinuteFormat } from '../utils'

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
  $: secondText = second < 10 ? `0${second}` : second
  $: score = calculateScore($measuredResult.duration, $measuredResult.clicks)
  $: congratText = getCongratText(score)

  // time unit is milli second
  const calculateScore = (time: number, clickCount: number) => {
    // if player spend time more than 30 second, deduce 50 points per second
    const timePenalty =
      time < 30000 ? 1 : Math.floor((time - 30000) / 1000) * 50
    const clickPenalty =
      clickCount < 1.5 * 16 ? 0 : (clickCount - 1.5 * 16) * 100
    return Math.max(0, 10000 - timePenalty - clickPenalty)
  }

  const getCongratText = (score: number) => {
    if (score >= 9500) {
      return "You're a god!"
    } else if (score >= 8000) {
      return 'Excellent!'
    } else if (score >= 6000) {
      return 'Good job!'
    } else if (score >= 3500) {
      return 'You can do better!'
    } else {
      return 'Not your moment yet!'
    }
  }
</script>

<h1 class="mb-4">{congratText}</h1>
<p>
  You took <span class="italic font-medium"
    >{$measuredResult.clicks} clicks</span
  >
  to finish.<br />
  Total
  <span class="italic font-medium">time taken {minute}:{secondText}</span><br />
</p>

<style>
</style>
