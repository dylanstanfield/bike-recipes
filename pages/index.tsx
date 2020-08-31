import Head from 'next/head'
import { useState } from 'react'

import { Box, Flex, Button, Heading, Image } from 'rebass'
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms'
import { v4 as uuid } from 'uuid'
import { Config } from '../types'

export default function Home(): React.ReactElement {
  const [name, setName] = useState('')
  const [components, setComponents] = useState<{ description: string; id: string }[]>([{ description: '', id: uuid() }])
  const [src, setSrc] = useState('')

  const change = (input: string, index: number): void => {
    setComponents(
      components.map((component, i) => {
        if (index !== i) {
          return component
        }
        return { ...component, description: input }
      }),
    )
  }

  const insert = (index: number) => {
    const copy = [...components]
    copy.splice(index + 1, 0, { description: '', id: uuid() })
    setComponents(copy)
  }

  const remove = (index: number) => {
    const copy = [...components]
    copy.splice(index, 1)
    setComponents(copy)
  }

  const submit = () => {
    const config: Config = {
      name,
      components: components.map(({ description }) => description),
    }

    setSrc(`/api/build?c=${encodeURIComponent(JSON.stringify(config))}`)
  }

  return (
    <div>
      <Head>
        <title>Bike Recipes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading>BIKE RECIPES</Heading>
      <Box as="form" onSubmit={(e) => e.preventDefault()} py={3}>
        <Flex mx={-2} mb={3}>
          <Box width={1} px={2}>
            <Label htmlFor="name">Bike Name</Label>
            <Input id="name" name="name" placeholder="m'bike" onChange={({ target }) => setName(target.value)} />
          </Box>
        </Flex>
        {components.map((component, index) => (
          <Flex mx={-2} mb={3} key={component.id}>
            <Box width={1} px={2}>
              <Input
                id={`componentDescription${index}`}
                name={`componentDescription${index}`}
                defaultValue={component.description}
                placeholder="Frame? Handlebars? Tires?"
                onChange={({ target }) => change(target.value, index)}
              />
            </Box>
            <Button onClick={() => insert(index)}>+</Button>
            <Button marginX={2} onClick={() => remove(index)} disabled={components.length <= 1}>
              -
            </Button>
          </Flex>
        ))}
      </Box>
      <Button onClick={() => submit()}>Process</Button>
      <Image
        src={src}
        sx={{
          width: ['100%', '50%'],
          borderRadius: 8,
        }}
      />
    </div>
  )
}
