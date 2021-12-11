import { writable } from 'svelte/store'

const bgm = new Audio('./sounds/bgm.mp3')
bgm.volume = 0.04
bgm.loop = true
bgm.currentTime = 41

// this tells that the audio has started
const started = writable(false)

const createAudioStore = () => {
  const { subscribe, update } = writable(bgm)
  const play = () => {
    update((audio) => {
      audio.play()
      started.set(true)
      return audio
    })
  }
  const mute = () => {
    update((audio) => {
      audio.muted = true
      return audio
    })
  }
  const resume = () => {
    update((audio) => {
      audio.muted = false
      return audio
    })
  }
  return {
    subscribe,
    play,
    mute,
    resume,
  }
}

const audio = createAudioStore()
export default { audio, started }
