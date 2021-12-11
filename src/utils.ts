import { getDoc, doc } from 'firebase/firestore'
import { db } from './initFirebase'

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
 * Checks if a user has already submitted a test saved in _localStorage_
 * @param userId The anonymous user id
 */
export const hasSubmittedLocally = (userId: string) => {
  return getLocallySavedUserIds().includes(userId)
}

/**
 * Checks if a user has already submitted a test saved in _firebase_
 * @param userId The anonymous user id
 */
export const hasSubmittedToFirestore = async (userId: string) => {
  const testDoc = await getDoc(doc(db, 'tests', userId))
  return testDoc.exists()
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
export function playCardMatchedSound() {
  const cardMatchedSound = new Audio('./sounds/card-matched.wav')
  const cardMatchedSound2 = new Audio('./sounds/card-matched.wav')
  cardMatchedSound.volume = 0.05
  cardMatchedSound2.volume = 0.05
  return () => {
    if (!cardMatchedSound.paused) cardMatchedSound2.play()
    else cardMatchedSound.play()
  }
}

//play a sound when user clicks 'Start' button
export function playBGM() {
  const bgm = new Audio('./sounds/bgm.mp3')
  bgm.volume = 0.2
  bgm.loop = true
  bgm.currentTime = 41
  bgm.play()
  console.log(bgm.currentTime)
}
