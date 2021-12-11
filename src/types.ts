export type Mode = 'easy' | 'hard'

export interface MeasuredResult {
  clicks?: number
  duration?: number // in milliseconds
}

/**
 * Firestore document schema for those in **tests** collection
 */
export type TestDocument = {
  mode: Mode
} & MeasuredResult
