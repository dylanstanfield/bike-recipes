import create from 'zustand'
import { v4 as uuid } from 'uuid'

import { Component } from '../types/schema'

type Direction = 'up' | 'down'

type ComponentStore = {
  components: Component[]
  update: (index: number, text: string) => void
  insert: (index: number) => void
  remove: (index: number) => void
  move: (index: number, direction: Direction) => void
}

export const useComponentStore = create<ComponentStore>((set) => ({
  components: [
    { id: uuid(), text: '' },
    { id: uuid(), text: '' },
    { id: uuid(), text: '' },
  ],
  update: (index: number, text: string) =>
    set((state) => {
      const updated = state.components.map((component, i) => ({
        ...component,
        text: index === i ? text : component.text,
      }))
      return { components: updated }
    }),
  insert: (index: number) =>
    set((state) => {
      const copy = [...state.components]
      copy.splice(index + 1, 0, { id: uuid(), text: '' })
      return { components: copy }
    }),
  remove: (index: number) =>
    set((state) => {
      const copy = [...state.components]
      copy.splice(index, 1)
      return { components: copy }
    }),
  move: (index: number, direction: Direction) =>
    set((state) => {
      const copy = [...state.components]
      if (direction === 'up') {
        copy.splice(index - 1, 0, copy.splice(index, 1)[0])
      }
      if (direction === 'down') {
        copy.splice(index + 1, 0, copy.splice(index, 1)[0])
      }
      return { components: copy }
    }),
}))
