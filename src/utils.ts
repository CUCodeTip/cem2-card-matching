import { getDoc, doc, setDoc } from 'firebase/firestore'
import { eImg, hImg } from './images'
import { auth, db } from './initFirebase'
import type { TestDocument } from './types'

/**
 * @returns user ids in _localStorage_ that has submitted a test
 */
export const getLocallySavedUserIds = (): string[] => {
  return JSON.parse(localStorage.getItem('usersThatSubmitted') || '[]')
}

/**
 * Saves a user id to _localStorage_ that just submitted a test
 * @param userId The anonymous user id
 */
export const saveUserIdLocally = (userId: string) => {
  // if the user id is already in the list, don't add it again
  const usersThatSubmitted = getLocallySavedUserIds()
  if (usersThatSubmitted.includes(userId)) return
  usersThatSubmitted.push(userId)
  localStorage.setItem('usersThatSubmitted', JSON.stringify(usersThatSubmitted))
}

/**
 * Convert time in millisecond unit to minute and second unit
 * @param millisecond
 * @returns {minute, second} the object that stores time in minute and second format
 */
export const getTimeinMinuteFormat = (
  milliseconds: number
): { minute: number; second: number } => {
  const minute = Math.floor(milliseconds / (60 * 1000))
  const second = Math.floor((milliseconds % (60 * 1000)) / 1000)
  return { minute, second }
}

/**
 * Preload images beforehand to prevent lag
 * @param images Image url or array of image url to preload
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = async (
  images: string[] | string = [
    '/Close_active.png',
    '/Close_hover.png',
    '/Close.png',
    'Tutorial.png',
    ...eImg,
    ...hImg,
  ]
): Promise<unknown[]> => {
  // resolve on load of all images
  if (typeof images === 'string') {
    images = [images]
  }
  const onLoads = images.map((image) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = resolve
      img.src = image
    })
  })
  return Promise.all(onLoads)
}

//play a sound when both cards are identical
export function getCardMatchedSound() {
  const cardMatchedSound = new Audio('./sounds/card-matched.wav')
  const cardMatchedSound2 = new Audio('./sounds/card-matched.wav')
  cardMatchedSound.volume = 0.05
  cardMatchedSound2.volume = 0.05
  return () => {
    if (!cardMatchedSound.paused) cardMatchedSound2.play()
    else cardMatchedSound.play()
  }
}

export function getVictorySound() {
  const victorySound = new Audio('./sounds/victory.mp3')
  victorySound.volume = 0.05
  return () => {
    victorySound.play()
  }
}

/**
 * Uploads the result of the game to firestore.
 * @note The id of this document is the id of the anonymous user who submitted this document
 * @param payload The result of the play
 */
export const saveTest = async (payload: TestDocument): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('User is not logged in')
  }

  await setDoc(doc(db, 'tests', auth.currentUser.uid), payload)
}
