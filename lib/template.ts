import twemoji from 'twemoji'

import { sanitize } from './sanitize'

import VulfMono from '../fonts/vulf-mono/Vulf-Mono-Regular'
import VulfMonoItalic from '../fonts/vulf-mono/Vulf-Mono-Italic'
import VulfMonoBold from '../fonts/vulf-mono/Vulf-Mono-Bold'
import VulfMonoBoldItalic from '../fonts/vulf-mono/Vulf-Mono-Bold-Italic'
import InterRegular from '../fonts/inter/Inter-Regular'
import InterBold from '../fonts/inter/Inter-Bold'
import VeraMono from '../fonts/vera-mono/Vera-Mono'
import { Recipe } from '../types/schema'

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
      src: url(data:font/woff;charset=utf-8;base64,${VulfMono}) format('woff');
    }
    @font-face {
      font-family: 'Vulf Mono';
      font-style:  italic;
      font-weight: normal;
      src: url(data:font/woff;charset=utf-8;base64,${VulfMonoItalic}) format('woff');
    }
    @font-face {
      font-family: 'Vulf Mono';
      font-style:  normal;
      font-weight: bold;
      src: url(data:font/woff;charset=utf-8;base64,${VulfMonoBold}) format('woff');
    }
    @font-face {
      font-family: 'Vulf Mono';
      font-style:  italic;
      font-weight: bold;
      src: url(data:font/woff;charset=utf-8;base64,${VulfMonoBoldItalic}) format('woff');
    }
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff;charset=utf-8;base64,${InterRegular}) format('woff2');
    }
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff;charset=utf-8;base64,${InterBold}) format('woff2');
    }
    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff;charset=utf-8;base64,${VeraMono})  format("woff2");
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

      font-family: 'Vulf Mono';
      font-size: ${sanitize(fontSize)};
      font-style: italic;
      color: ${foreground};
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
      word-break: break-all;
      overflow: hidden;
    }
    .header {
      margin-bottom: 10px;
    }
    .title {
        font-weight: bold;
    }
    .footer {
        opacity: 0.333;
    }`
}

export const html = (recipe: Recipe): string => {
  const fontSize = '43px'

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>${css('dark', fontSize)}</style>
    <body>
        <div class="container">
          <div class="header">
            ${recipe.name ? `<span class="title">${emojify(sanitize(recipe.name.trim()))}&nbsp;</span>` : '' }
            ${recipe.description ? `<span class="title">${emojify(sanitize(recipe.description.trim()))}</span>` : '' }
          </div>
          <span>${emojify(sanitize(recipe.parts.join(', ')))}</span>
          <span class="footer">https://bike.recipes/</span>
        </div>
    </body>
</html>`
}
