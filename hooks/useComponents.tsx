import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { Component } from '../types/schema'

export const useComponents = () => {
  const [components, setComponents] = useState<Component[]>([{ id: uuid(), text: '' }])

  const insert = (index: number) => {
    const copy = [...components]
    copy.splice(index + 1, 0, { id: uuid(), text: '' })
    setComponents(copy)
  }

  const update = (index: number, text: string) => {
    setComponents(
      components.map((component, i) => {
        if (i === index) {
          return {
            ...component,
            text,
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

  return { components, insert, update, remove, move }
}
