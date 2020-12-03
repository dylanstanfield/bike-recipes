export interface Part {
  id: string
  text: string
}

interface Input {
  value: string
  updated: number
}

export interface PartVM {
  id: string
  custom: Input
  suggestion: Input
}

export interface Recipe {
  name?: string
  description?: string
  parts: string[]
}

export const FILE_TYPES = ['png', 'jpeg'] as const

export type FileType = typeof FILE_TYPES[number]
