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

// const easy1 = '/cards/easy/blue.png'
// const easy2 = '/cards/easy/brown.png'
// const easy3 = '/cards/easy/green.png'
// const easy4 = '/cards/easy/orange.png'
// const easy5 = '/cards/easy/pink.png'
// const easy6 = '/cards/easy/purple.png'
// const easy7 = '/cards/easy/red.png'
// const easy8 = '/cards/easy/yellow.png'

// export const hImg = [

// export const eImg = [
//   '/cards/easy/blue.png',
//   '/cards/easy/brown.png',
//   '/cards/easy/green.png',
//   '/cards/easy/orange.png',
//   '/cards/easy/pink.png',
//   '/cards/easy/purple.png',
//   '/cards/easy/red.png',
//   '/cards/easy/yellow.png',
// ]

export const eImg = [
  'https://cdn.discordapp.com/attachments/886150814836617227/919611071956914226/unknown.png',
  'https://cdn.discordapp.com/attachments/886150814836617227/919611071956914226/unknown.png',
  'https://cdn.discordapp.com/attachments/886150814836617227/919611071956914226/unknown.png',
  'https://cdn.discordapp.com/attachments/886150814836617227/919611071956914226/unknown.png',
  'https://cdn.discordapp.com/attachments/886150814836617227/919611071956914226/unknown.png',
  'https://cdn.discordapp.com/attachments/886150814836617227/919611071956914226/unknown.png',
  'https://cdn.discordapp.com/attachments/886150814836617227/919611071956914226/unknown.png',
  'https://cdn.discordapp.com/attachments/886150814836617227/919611071956914226/unknown.png',
]

const createImageStore = () => {
  const hardImages: ImageData[] = [
    { src: hard4, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard1, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard8, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard1, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard2, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard3, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard3, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard5, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard6, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard5, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard4, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard7, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard8, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard7, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard2, alt: '☺☺☺', revealed: false, hidden: false },
    { src: hard6, alt: '☺☺☺', revealed: false, hidden: false },
  ]

  const easyImages: ImageData[] = (() => {
    const images = []
    for (const img of eImg) {
      images.push({ src: img, alt: '☺☺☺', revealed: false, hidden: false })
      images.push({ src: img, alt: '☺☺☺', revealed: false, hidden: false })
    }
    return images.sort(() => Math.random() - 0.5)
  })()

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
