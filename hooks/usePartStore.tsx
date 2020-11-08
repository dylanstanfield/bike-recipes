import create from 'zustand'
import { v4 as uuid } from 'uuid'

import { PartVM } from '../types/schema'

type Direction = 'up' | 'down'
type InputType = 'suggestion' | 'custom'

type PartStore = {
  parts: PartVM[]
  update: (index: number, value: string, type: InputType) => void
  insert: (index: number) => void
  remove: (index: number) => void
  move: (index: number, direction: Direction) => void
}

export const usePartStore = create<PartStore>((set) => ({
  parts: [
    { id: uuid(), suggestion: { value: '', updated: 0 }, custom: { value: '', updated: 0 } },
    { id: uuid(), suggestion: { value: '', updated: 0 }, custom: { value: '', updated: 0 } },
    { id: uuid(), suggestion: { value: '', updated: 0 }, custom: { value: '', updated: 0 } },
  ],
  update: (index: number, value: string, type: InputType) =>
    set((state) => {
      const updated = state.parts.map((part, i) => ({
        ...part,
        [type]: index === i ? { value, updated: Date.now() } : part[type]
      }))
      return { parts: updated }
    }),
  insert: (index: number) =>
    set((state) => {
      const copy = [...state.parts]
      copy.splice(index + 1, 0, { id: uuid(), suggestion: { value: '', updated: 0 }, custom: { value: '', updated: 0 } })
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
