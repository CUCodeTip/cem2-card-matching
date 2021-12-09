export type Mode = 'easy' | 'hard'

/**
 * Firestore document schema for those in **tests** collection
 */
export interface TestDocument {
  clicks: number
  duration: number // in milliseconds
  mode: Mode
}
