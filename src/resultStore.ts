import { writable } from 'svelte/store'
import type { MeasuredResult } from './types'

const measuredResult = writable<MeasuredResult>({})
export default measuredResult
