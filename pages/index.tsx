import Head from 'next/head'
import { AutoComplete } from 'antd'
import { useState } from 'react'
import Fuse from 'fuse.js'

import { COMPONENTS } from '../types'

const componentOptions = COMPONENTS.map((component) => ({
  label: component
    .split('_')
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' '),
  type: component,
}))

const fuse = new Fuse(componentOptions, { keys: ['label'] })

export default function Home(): React.ReactElement {
  const [selected, setSelected] = useState<{ value: string; key: string } | undefined>(undefined)
  const [matches, setMatches] = useState<{ value: string; key: string }[]>([])

  return (
    <div>
      <Head>
        <title>Bike Recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AutoComplete
        options={matches}
        style={{ width: 300 }}
        onSelect={(data, { key }) => setSelected({ value: data, key: String(key) })}
        onSearch={(text) =>
          setMatches(
            fuse.search(text).map(({ item }) => ({
              value: item.label,
              key: item.type,
            })),
          )
        }
        placeholder="Component"
      />
    </div>
  )
}
