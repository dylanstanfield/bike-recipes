import twemoji from 'twemoji'

import { sanitize } from './sanitize'

import InterRegular from '../_fonts/Inter-Regular.woff2'
import InterBold from '../_fonts/Inter-Bold.woff2'
import VeraMono from '../_fonts/Vera-Mono.woff2'
import { Config } from '../../../types'

const twOptions = { folder: 'svg', ext: '.svg' }
const emojify = (text: string) => twemoji.parse(text, twOptions)

const css = (theme: string, fontSize: string): string => {
  let background = 'white'
  let foreground = 'black'

  if (theme === 'dark') {
    background = 'black'
    foreground = 'white'
  }

  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(${InterRegular}) format('woff2');
    }
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(${InterBold}) format('woff2');
    }
    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(${VeraMono})  format("woff2");
      }
    body {
        background: ${background};
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
    .spacer {
        margin: 150px;
    }
    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    .heading {
        font-family: 'Vera', sans-serif;
        font-size: ${sanitize(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }`
}

export const html = (config: Config): string => {
  const { components } = config
  const fontSize = '100px'

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>${css('dark', fontSize)}</style>
    <body>
        <div>
            ${components.map((component) => `<div class="heading">${emojify(sanitize(component))}</div>`)}
        </div>
    </body>
</html>`
}
