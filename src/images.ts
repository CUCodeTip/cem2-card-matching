import { getDoc, doc } from 'firebase/firestore'
import { writable } from 'svelte/store'
import { db } from './initFirebase'
import type { ImageData, Mode, ModeDocument, TestDocument } from './types'

export const hImg = [
  '/cards/hard/1.jpg',
  '/cards/hard/2.jpg',
  '/cards/hard/3.jpg',
  '/cards/hard/4.jpg',
  '/cards/hard/5.jpg',
  '/cards/hard/6.jpg',
  '/cards/hard/7.jpg',
  '/cards/hard/8.jpg',
]

export const eImg = [
  '/cards/easy/blue.png',
  '/cards/easy/brown.png',
  '/cards/easy/green.png',
  '/cards/easy/orange.png',
  '/cards/easy/pink.png',
  '/cards/easy/purple.png',
  '/cards/easy/red.png',
  '/cards/easy/yellow.png',
]

const createImageStore = () => {
  const hardImages: ImageData[] = (() => {
    const images = []
    for (const img of hImg) {
      images.push({ src: img, alt: '☺☺☺', revealed: false, hidden: false })
      images.push({ src: img, alt: '☺☺☺', revealed: false, hidden: false })
    }
    return images.sort(() => Math.random() - 0.5)
  })()

  const easyImages: ImageData[] = (() => {
    const images = []
    for (const img of eImg) {
      images.push({ src: img, alt: '☺☺☺', revealed: false, hidden: false })
      images.push({ src: img, alt: '☺☺☺', revealed: false, hidden: false })
    }
    return images.sort(() => Math.random() - 0.5)
  })()

  const { subscribe, set } = writable<ImageData[]>([])

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
   * Return the mode of images for this particular user
   * If the user has test data in firestore, set the mode to that of the data
   */
  const setModeForUser = async (userId: string): Promise<Mode> => {
    const modeDocSnap = await getDoc(doc(db, 'mode', userId))
    if (!modeDocSnap.exists()) {
      return setRandomMode()
    }
    const modeDoc = modeDocSnap.data() as ModeDocument
    if (modeDoc.mode === 'hard') {
      set(hardImages)
      return 'hard'
    }
    set(easyImages)
    return 'easy'
  }

  /**
   * Shuffle both hard and easy images
   */
  const shuffleAll = () => {
    shuffle(hardImages)
    shuffle(easyImages)
  }

  /**
   * Shuffle the images based on the mode
   * @param mode 'easy' or 'hard'
   */
  const shuffleOnMode = (mode: Mode) => {
    mode === 'hard' ? shuffle(hardImages) : shuffle(easyImages)
  }

  /**
   * Reset the images based on the mode and shuffle
   * @param mode 'easy' or 'hard'
   */
  const resetWithShuffleOnMode = (mode: Mode) => {
    resetOnMode(mode)
    shuffleOnMode(mode)
  }

  return {
    subscribe,
    set,
    setRandomMode,
    shuffleAll,
    resetWithShuffleOnMode,
    setModeForUser,
  }
}

const images = createImageStore()
export default images
