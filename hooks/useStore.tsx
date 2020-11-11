import create from 'zustand'
import { v4 as uuid } from 'uuid'

import { PartVM } from '../types/schema'

type Direction = 'up' | 'down'
type InputType = 'suggestion' | 'custom'

type Store = {
  name: string
  description: string
  parts: PartVM[]
  public: boolean
  errors: { isPartsEmpty: boolean }
  updateName: (value: string) => void
  updateDescription: (value: string) => void
  updatePart: (index: number, value: string, type: InputType) => void
  insertPart: (index: number) => void
  removePart: (index: number) => void
  movePart: (index: number, direction: Direction) => void
  togglePublic: () => void
}

export const useStore = create<Store>((set) => ({
  name: '',
  description: '',
  parts: [
    { id: uuid(), suggestion: { value: '', updated: 0 }, custom: { value: '', updated: 0 } },
    { id: uuid(), suggestion: { value: '', updated: 0 }, custom: { value: '', updated: 0 } },
    { id: uuid(), suggestion: { value: '', updated: 0 }, custom: { value: '', updated: 0 } },
  ],
  public: false,
  errors: { isPartsEmpty: true },
  updateName: (value: string) => set({ name: value }),
  updateDescription: (value: string) => set({ description: value }),
  updatePart: (index: number, value: string, type: InputType) =>
    set((state) => {
      const updated = state.parts.map((part, i) => ({
        ...part,
        [type]: index === i ? { value, updated: Date.now() } : part[type]
      }))
      // add a new part if we're writing in the last one
      if (index === state.parts.length - 1 && !!value) {
        updated.push({ id: uuid(), suggestion: { value: '', updated: 0 }, custom: { value: '', updated: 0 } })
      }
      // remove last part if the next to last part is empty
      if (index === state.parts.length - 2 && !value) {
        updated.splice(state.parts.length - 1, 1)
      }
      const isPartsEmpty = updated.every((part) => part.custom.value === '' && part.suggestion.value === '')
      const errors = { ...state.errors, isPartsEmpty }
      return { parts: updated, errors }
    }),
  insertPart: (index: number) =>
    set((state) => {
      const copy = [...state.parts]
      copy.splice(index + 1, 0, { id: uuid(), suggestion: { value: '', updated: 0 }, custom: { value: '', updated: 0 } })
      return { parts: copy }
    }),
  removePart: (index: number) =>
    set((state) => {
      const copy = [...state.parts]
      copy.splice(index, 1)
      return { parts: copy }
    }),
  movePart: (index: number, direction: Direction) =>
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
  togglePublic: () => set((state) => ({ public: !state.public })),
}))
