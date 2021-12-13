export type Mode = 'easy' | 'hard'

export interface MeasuredResult {
  clicks?: number
  duration?: number // in milliseconds
}

/**
 * Firestore document schema for those in **tests** collection
 */
export type TestDocument = {
  result: MeasuredResult[]
}

/**
 * Firestore document schema for game mode for each user
 */
export type ModeDocument = {
  mode: Mode
}

export type ImageData = {
  src: string
  alt: string
  revealed: boolean
  hidden: boolean
}
