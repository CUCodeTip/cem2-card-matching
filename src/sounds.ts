import { writable } from 'svelte/store'

const bgm = new Audio('./sounds/bgm.mp3')
bgm.volume = 0.2
bgm.loop = true
bgm.currentTime = 41

const createAudioStore = () => {
  const { subscribe, update } = writable(bgm)

  const play = () => {
    update((audio) => {
      audio.play()

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
export default audio
