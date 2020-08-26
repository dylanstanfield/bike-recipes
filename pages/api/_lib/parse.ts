import { NextApiRequest } from 'next'
import { parse } from 'url'
import AJV from 'ajv'

import { Config, ConfigSchema } from './models/Config'

// let thing = {
//     theme: 'dark',
//     fileType: 'png',
//     text: 'Hello world!'
// }

const validator = new AJV({ allErrors: true })

export function parseConfig(req: NextApiRequest): { config: Config; valid: boolean; errors?: AJV.ErrorObject[] } {
  const { query } = parse(req.url || '/', true)

  if (Array.isArray(query.c) || !query.c) {
    throw new Error('config is invalid')
  }

  const config = JSON.parse(query.c)

  if (!config) {
    throw new Error('config is invalid')
  }

  const check = validator.compile(ConfigSchema)
  const valid = Boolean(check(config))
  const errors = check.errors || undefined

  return { config, valid, errors }
}
