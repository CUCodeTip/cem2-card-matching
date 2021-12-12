import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from './initFirebase'
import type { TestDocument } from './types'
import {
  hasSubmittedLocally,
  hasSubmittedToFirestore,
  saveUserIdLocally,
} from './utils'

/**
 * Checks if the current user has already submitted a test result before
 * @returns true if the user has already submitted a test result else false
 */
const hasSubmittedAlready = async (userId: string) => {
  // checks locally
  if (hasSubmittedLocally(userId)) return true
  // checks in firestore
  return hasSubmittedToFirestore(userId)
}

/**
 * Uploads the result of the game to firestore. This requires no further checks if the current user has already submitted a test result.
 * @note The id of this document is the id of the anonymous user who submitted this document
 * @param payload The result of the play
 */
export const saveTest = async (payload: TestDocument): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('User is not logged in')
  }

  const userId = auth.currentUser.uid
  if (await hasSubmittedToFirestore(userId)) return

  // saves the test result
  await setDoc(doc(db, 'pilot', userId), payload)
  console.log('hi')

  // remembers user locally
  // saveUserIdLocally(userId)
}
