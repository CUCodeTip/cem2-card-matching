import { writable } from 'svelte/store'
import { auth } from './initFirebase'
import type { ImageData } from './types'
import { hasSubmittedLocally, hasSubmittedToFirestore } from './utils'

const createImageStore = () => {
  const defaultImages: ImageData[] = [
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
    { src: './favicon.png', alt: 'og-image', revealed: false, hidden: false },
  ]

  const shuffle = () => {
    defaultImages.sort(() => 0.5 - Math.random())
  }

  if (
    hasSubmittedLocally(auth.currentUser.uid) ||
    hasSubmittedToFirestore(auth.currentUser.uid)
  )
    shuffle()

  const { subscribe, set } = writable(defaultImages)

  return {
    subscribe,
    /**
     * Sets the store to an empty array
     */
    clear: () => set([]),
    set,
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
