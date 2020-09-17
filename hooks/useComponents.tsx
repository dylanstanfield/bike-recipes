import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { ComponentVM } from '../types'

const defaultComponent = () => ({ description: '', id: uuid(), locked: false })

export const useComponents = () => {
  const [components, setComponents] = useState<ComponentVM[]>([defaultComponent()])

  const insert = (index: number) => {
    const copy = [...components]
    copy.splice(index + 1, 0, defaultComponent())
    setComponents(copy)
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

  return { components, insert, remove, move, lock, unlock, lockAll, unlockAll }
}
