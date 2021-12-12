import { writable } from 'svelte/store'
import type { ImageData, Mode } from './types'

const hard1 =
  'https://i.pinimg.com/564x/1d/83/a6/1d83a6d88d8be5b041a9a98fd5048311.jpg'
const hard2 =
  'https://i.pinimg.com/564x/7f/c4/1c/7fc41c233f72f0499d920bec0e86a016.jpg'
const hard3 =
  'https://i.pinimg.com/564x/7b/42/be/7b42be0b71b383f8ab99dcbebe4ba7cc.jpg'
const hard4 =
  'https://i.pinimg.com/564x/c1/1e/b7/c11eb75ff298b31688afc86d5c6854ae.jpg'
const hard5 =
  'https://i.pinimg.com/736x/57/28/9f/57289f22d384f7f2c736b68226530319.jpg'
const hard6 =
  'https://i.pinimg.com/736x/72/b5/c2/72b5c2c8e72b972ce51d2b59fb9ee260.jpg'
const hard7 =
  'https://i.pinimg.com/564x/0f/3b/0a/0f3b0a82858714369d497a56691d4da7.jpg'
const hard8 =
  'https://i.pinimg.com/736x/58/bd/0e/58bd0e7421c03e34e7f419f416a76763.jpg'

const easy1 = 'https://media1.giphy.com/media/j4fbBhYgu8mNEHkQ4w/giphy.gif'
const easy2 = 'https://giffiles.alphacoders.com/398/3987.gif'
const easy3 = 'https://c.tenor.com/heQIzJAQvcIAAAAd/vibe-cat.gif'
const easy4 =
  'https://thumbs.gfycat.com/EmptyPleasedHorseshoecrab-size_restricted.gif'
const easy5 =
  'https://media1.giphy.com/media/XBieBakVVSo4fOD9TU/giphy-downsized-large.gif'
const easy6 = 'https://c.tenor.com/G2PESJkdpFAAAAAd/this-is-fine.gif'
const easy7 = 'https://c.tenor.com/o3SXzAksOokAAAAC/anime-meme.gif'
const easy8 = 'https://c.tenor.com/o0lrdNm2BawAAAAC/aqua-cry-cute-aqua.gif'

const createImageStore = () => {
  const hardImages: ImageData[] = [
    { src: hard2, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard5, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard4, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard2, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard1, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard8, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard1, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard6, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard5, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard7, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard7, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard4, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard3, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard3, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard6, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard8, alt: '☺☺☺', revealed: false, hidden: false },
  ]

  const easyImages: ImageData[] = [
    { src: easy4, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy1, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy8, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy1, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy2, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy3, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy3, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy5, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy6, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy5, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy4, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy7, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy8, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy7, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy2, alt: '☺☺☺', revealed: false, hidden: false },
    { src: easy6, alt: '☺☺☺', revealed: false, hidden: false },
  ]

  const { subscribe, set } = writable<ImageData[] | null>(null)

  const resetOnMode = (mode: Mode) => {
    const images = mode === 'hard' ? hardImages : easyImages
    images.forEach((image) => {
      image.revealed = false
      image.hidden = false
    })
  }

  /**
   * Shuffle the images
   * @param images
   */
  const shuffle = (images: ImageData[]) => {
    images.sort(() => Math.random() - 0.5)
  }

  /**
   * Load the image set to store based on the mode without resetting and shuffling
   * @param mode 'easy' or 'hard'
   */
  const setMode = (mode: Mode) => {
    if (mode === 'easy') {
      set(easyImages)
    } else {
      set(hardImages)
    }
  }

  /**
   * Load the image set to store based on the mode without resetting and shuffling
   */
  const setRandomMode = () => {
    const mode = Math.random() > 0.5 ? 'hard' : 'easy'
    setMode(mode)
    return mode
  }

  /**
   * Shuffle both hard and easy images
   */
  const shuffleAll = () => {
    shuffle(hardImages)
    shuffle(easyImages)
  }

  return {
    subscribe,
    set,
    setRandomMode,
    shuffleAll,
    resetOnMode,
    setMode,
  }
}

const images = createImageStore()
export default images
