import create from 'zustand'
import { v4 as uuid } from 'uuid'

import { Part } from '../types/schema'

type Direction = 'up' | 'down'

type PartStore = {
  parts: Part[]
  update: (index: number, text: string) => void
  insert: (index: number) => void
  remove: (index: number) => void
  move: (index: number, direction: Direction) => void
}

export const usePartStore = create<PartStore>((set) => ({
  parts: [
    { id: uuid(), text: '' },
    { id: uuid(), text: '' },
    { id: uuid(), text: '' },
  ],
  update: (index: number, text: string) =>
    set((state) => {
      const updated = state.parts.map((part, i) => ({
        ...part,
        text: index === i ? text : part.text,
      }))
      return { parts: updated }
    }),
  insert: (index: number) =>
    set((state) => {
      const copy = [...state.parts]
      copy.splice(index + 1, 0, { id: uuid(), text: '' })
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
