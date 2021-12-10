<script lang="ts">
  import { getTimeinMinuteFormat } from '../utils'

  // Get score from play page
  const cardCount = 16
  let time = 62000
  let clickCount = 20
  const { minute, second } = getTimeinMinuteFormat(time)
  const secondText = ('0' + second).slice(0, 2)

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
    let text = ''
    if (score >= 9500) {
      text = 'You are the god!'
    } else if (score >= 8000) {
      text = 'Excellent!'
    } else if (score >= 6000) {
      text = 'Good job!'
    } else if (score >= 3500) {
      text = 'Not bad Not bad, but try harder next time...'
    } else {
      text = 'May be today is not your day...'
    }
    return text
  }

  $: score = calculateScore(time, clickCount)
  $: congratText = getCongratText(score)
</script>

<h1 class="mb-4">{congratText}</h1>
<p>
  You took {clickCount} clicks to finish.<br />
  Total time taken {`${minute}:${secondText}`} minutes.<br />
  Your score is {score}
</p>

<style>
</style>
