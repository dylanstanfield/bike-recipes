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
