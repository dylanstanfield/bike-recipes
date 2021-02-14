import { NextApiRequest, NextApiResponse } from 'next'
import pino from 'pino-http'
import { parse } from 'url'

import { html } from '../lib/template'
import { screenshot } from '../lib/screenshot'
import { validateRecipe } from '../lib/schema/recipe'
import { Recipe } from '../types/schema'

const logger = pino()
const isDev = !process.env.AWS_REGION
const isHtmlDebug = process.env.HTML_DEBUG === 'true'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  logger(req, res)

  try {
    const { query } = parse(req.url || '/', true)

    if (Array.isArray(query.r) || !query.r) {
      throw new Error('config is invalid')
    }

    const recipe = JSON.parse(query.r) as Recipe
    const { valid, errors } = await validateRecipe(recipe)

    if (!valid) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'text/html')
      res.end(`<h1>Invalid Request</h1><pre>${JSON.stringify(errors, null, 4)}</pre>`)
      return
    }

    const markup = html(recipe)

    if (isHtmlDebug) {
      res.setHeader('Content-Type', 'text/html')
      res.end(markup)
      return
    }

    const fileType = 'png'
    const file = await screenshot(markup, fileType, isDev)

    res.statusCode = 200
    res.setHeader('Content-Type', `image/${fileType}`)
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
    res.end(file)
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
  }
}
