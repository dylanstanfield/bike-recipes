import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { ComponentVM, ComponentType } from '../types'

export const useComponents = () => {
  const [components, setComponents] = useState<ComponentVM[]>([
    { type: 'frame', description: '', id: uuid(), locked: false },
    { type: 'wheels', description: '', id: uuid(), locked: false },
    { type: 'handlebars', description: '', id: uuid(), locked: false },
    { type: 'shifters', description: '', id: uuid(), locked: false },
  ])

  const insert = (index: number) => {
    const copy = [...components]
    copy.splice(index + 1, 0, { description: '', id: uuid(), locked: false })
    setComponents(copy)
  }

  const update = (index: number, description: string, type?: ComponentType) => {
    setComponents(
      components.map((component, i) => {
        if (i === index) {
          return {
            ...component,
            description,
            type,
          }
        }

        return component
      }),
    )
  }

  const remove = (index: number) => {
    const copy = [...components]
    copy.splice(index, 1)
    setComponents(copy)
  }

  const move = (index: number, direction: 'up' | 'down') => {
    const copy = [...components]

    if (direction === 'up') {
      copy.splice(index - 1, 0, copy.splice(index, 1)[0])
    }

    if (direction === 'down') {
      copy.splice(index + 1, 0, copy.splice(index, 1)[0])
    }

    setComponents(copy)
  }

  const lock = (index: number) => {
    setComponents(
      components.map((component, i) => {
        if (index === i) {
          return {
            ...component,
            locked: true,
          }
        }

        return component
      }),
    )
  }

  const unlock = (index: number) => {
    setComponents(
      components.map((component, i) => {
        if (index === i) {
          return {
            ...component,
            locked: false,
          }
        }

        return component
      }),
    )
  }

  const lockAll = () => {
    setComponents(
      components.map((component) => ({
        ...component,
        locked: true,
      })),
    )
  }

  const unlockAll = () => {
    setComponents(
      components.map((component) => ({
        ...component,
        locked: false,
      })),
    )
  }

  return { components, insert, update, remove, move, lock, unlock, lockAll, unlockAll }
}
