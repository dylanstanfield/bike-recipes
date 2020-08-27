import { NextApiRequest, NextApiResponse } from 'next'
import pino from 'pino-http'
import { parse } from 'url'

import { html } from './_lib/template'
import { screenshot } from './_lib/screenshot'
import { validateConfig } from './_lib/schema/Config'

const logger = pino()
const isDev = !process.env.AWS_REGION
const isHtmlDebug = process.env.HTML_DEBUG === 'true'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  logger(req, res)

  try {
    const { query } = parse(req.url || '/', true)

    if (Array.isArray(query.c) || !query.c) {
      throw new Error('config is invalid')
    }

    const config = JSON.parse(query.c)
    const { valid, errors } = await validateConfig(config)

    if (!valid) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'text/html')
      res.end(`<h1>Invalid Request</h1><pre>${JSON.stringify(errors, null, 4)}</pre>`)
      return
    }

    const markup = html(config)

    if (isHtmlDebug) {
      res.setHeader('Content-Type', 'text/html')
      res.end(markup)
      return
    }

    const { fileType } = config
    const file = await screenshot(markup, fileType, isDev)

    res.statusCode = 200
    res.setHeader('Content-Type', `image/${fileType}`)
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
  }
}
