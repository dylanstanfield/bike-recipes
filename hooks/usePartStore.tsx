import create from 'zustand'
import { v4 as uuid } from 'uuid'

import { PartVM } from '../types/schema'

type Direction = 'up' | 'down'

type PartStore = {
  parts: PartVM[]
  updateSuggestion: (index: number, suggestion: string) => void
  updateInput: (index: number, suggestion: string) => void
  clear: (index: number) => void
  insert: (index: number) => void
  remove: (index: number) => void
  move: (index: number, direction: Direction) => void
}

export const usePartStore = create<PartStore>((set) => ({
  parts: [
    { id: uuid(), suggestion: '', input: '' },
    { id: uuid(), suggestion: '', input: '' },
    { id: uuid(), suggestion: '', input: '' },
  ],
  updateSuggestion: (index: number, suggestion: string) =>
    set((state) => {
      const updated = state.parts.map((part, i) => ({
        ...part,
        suggestion: index === i ? suggestion : part.suggestion,
      }))
      return { parts: updated }
    }),
  updateInput: (index: number, input: string) =>
    set((state) => {
      const updated = state.parts.map((part, i) => ({
        ...part,
        input: index === i ? input : part.input,
      }))
      return { parts: updated }
    }),
  clear: (index: number) =>
    set((state) => {
      const updated = state.parts.map((part, i) => ({
        ...part,
        input: index === i ? '' : part.input,
        suggestion: index === i ? '' : part.suggestion,
      }))
      return { parts: updated }
    }),
  insert: (index: number) =>
    set((state) => {
      const copy = [...state.parts]
      copy.splice(index + 1, 0, { id: uuid(), suggestion: '', input: '' })
      return { parts: copy }
    }),
  remove: (index: number) =>
    set((state) => {
      const copy = [...state.parts]
      copy.splice(index, 1)
      return { parts: copy }
    }),
  move: (index: number, direction: Direction) =>
    set((state) => {
      const copy = [...state.parts]
      if (direction === 'up') {
        copy.splice(index - 1, 0, copy.splice(index, 1)[0])
      }
      if (direction === 'down') {
        copy.splice(index + 1, 0, copy.splice(index, 1)[0])
      }
      return { parts: copy }
    }),
}))
