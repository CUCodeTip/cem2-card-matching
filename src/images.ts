import { writable } from 'svelte/store'
import type { ImageData } from './types'

const img1 =
  'https://i.pinimg.com/564x/1d/83/a6/1d83a6d88d8be5b041a9a98fd5048311.jpg'
const img2 =
  'https://i.pinimg.com/564x/7f/c4/1c/7fc41c233f72f0499d920bec0e86a016.jpg'
const img3 =
  'https://i.pinimg.com/564x/7b/42/be/7b42be0b71b383f8ab99dcbebe4ba7cc.jpg'
const img4 =
  'https://i.pinimg.com/564x/c1/1e/b7/c11eb75ff298b31688afc86d5c6854ae.jpg'
const img5 =
  'https://i.pinimg.com/736x/57/28/9f/57289f22d384f7f2c736b68226530319.jpg'
const img6 =
  'https://i.pinimg.com/736x/72/b5/c2/72b5c2c8e72b972ce51d2b59fb9ee260.jpg'
const img7 =
  'https://i.pinimg.com/564x/0f/3b/0a/0f3b0a82858714369d497a56691d4da7.jpg'
const img8 =
  'https://i.pinimg.com/736x/58/bd/0e/58bd0e7421c03e34e7f419f416a76763.jpg'

const createImageStore = () => {
  const defaultImages: ImageData[] = [
    { src: img4, alt: 'og-image', revealed: false, hidden: false },
    { src: img1, alt: 'og-image', revealed: false, hidden: false },
    { src: img8, alt: 'og-image', revealed: false, hidden: false },
    { src: img1, alt: 'og-image', revealed: false, hidden: false },
    { src: img2, alt: 'og-image', revealed: false, hidden: false },
    { src: img3, alt: 'og-image', revealed: false, hidden: false },
    { src: img3, alt: 'og-image', revealed: false, hidden: false },
    { src: img5, alt: 'og-image', revealed: false, hidden: false },
    { src: img6, alt: 'og-image', revealed: false, hidden: false },
    { src: img5, alt: 'og-image', revealed: false, hidden: false },
    { src: img4, alt: 'og-image', revealed: false, hidden: false },
    { src: img7, alt: 'og-image', revealed: false, hidden: false },
    { src: img8, alt: 'og-image', revealed: false, hidden: false },
    { src: img7, alt: 'og-image', revealed: false, hidden: false },
    { src: img2, alt: 'og-image', revealed: false, hidden: false },
    { src: img6, alt: 'og-image', revealed: false, hidden: false },
  ]

  const shuffle = () => {
    defaultImages.sort(() => 0.5 - Math.random())
  }

  const { subscribe, set } = writable(defaultImages)

  return {
    subscribe,
    /**
     * Sets the store to an empty array
     */
    clear: () => set([]),
    set,
    /**
     * Shuffles the images without resetting the revealed and hidden states to false
     */
    shuffle,
    /**
     * Shuffles the images and reset the revealed and hidden states to false
     */
    resetWithShuffle: () => {
      shuffle()
      set(defaultImages)
      defaultImages.forEach((image) => {
        image.revealed = false
        image.hidden = false
      })
    },
  }
}

const images = createImageStore()
export default images
