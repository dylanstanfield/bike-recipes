import twemoji from 'twemoji'

import { sanitize } from './sanitize'

import VulfMono from '../_fonts/Vulf-Mono-Regular.woff'
import VulfMonoItalic from '../_fonts/Vulf-Mono-Italic.woff'
import VulfMonoBold from '../_fonts/Vulf-Mono-Bold.woff'
import VulfMonoBoldItalic from '../_fonts/Vulf-Mono-Bold-Italic.woff'
import InterRegular from '../_fonts/Inter-Regular.woff2'
import InterBold from '../_fonts/Inter-Bold.woff2'
import VeraMono from '../_fonts/Vera-Mono.woff2'
import { Recipe } from '../../../types/schema'

const twOptions = { folder: 'svg', ext: '.svg' }
const emojify = (text: string) => twemoji.parse(text, twOptions)

const navy = '#00022e'
const olive = '#6B6A4E'
const offwhite = '#edecdd';
const lightRed = '#ee6562'

const css = (theme: string, fontSize: string): string => {
  let background = olive
  let foreground = offwhite

  // if (theme === 'dark') {
  //   background = 'black'
  //   foreground = 'white'
  // }

  return `
    @font-face {
      font-family: 'Vulf Mono';
      font-style:  normal;
      font-weight: normal;
      src: url(${VulfMono}) format('woff');
    }
    @font-face {
      font-family: 'Vulf Mono';
      font-style:  italic;
      font-weight: normal;
      src: url(${VulfMonoItalic}) format('woff');
    }
    @font-face {
      font-family: 'Vulf Mono';
      font-style:  normal;
      font-weight: bold;
      src: url(${VulfMonoBold}) format('woff');
    }
    @font-face {
      font-family: 'Vulf Mono';
      font-style:  italic;
      font-weight: bold;
      src: url(${VulfMonoBoldItalic}) format('woff');
    }
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
    html, body {
        background: ${background};
        height: 100vh;
        margin: 0;
        padding: 0;
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
    .container {
      margin: 10px;
      padding: 20px;
      border: 10px solid ${foreground};
      height: 920px;
    }
    .header {
      margin-bottom: 10px;
    }
    .heading {
        font-family: 'Vulf Mono';
        font-size: ${sanitize(fontSize)};
        font-style: italic;
        color: ${foreground};
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
        font-weight: bold;
    }
    .parts {
      font-family: 'Vulf Mono';
      font-size: ${sanitize(fontSize)};
      font-style: italic;
      color: ${foreground};
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
    }`
}

export const html = (recipe: Recipe): string => {
  const fontSize = '44px'

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>${css('dark', fontSize)}</style>
    <body>
        <div class="container">
          <div class="header">
            ${recipe.name ? `<span class="heading">${emojify(sanitize(recipe.name.trim()))}&nbsp;</span>` : '' }
            ${recipe.description ? `<span class="heading">${emojify(sanitize(recipe.description.trim()))}</span>` : '' }
          </div>
          <span class="parts">${emojify(sanitize(recipe.parts.join(', ')))}</span>
        </div>
    </body>
</html>`
}
