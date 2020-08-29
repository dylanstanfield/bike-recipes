// import marked from 'marked'
// import twemoji from 'twemoji'
import { sanitize } from './sanitize'

import InterRegular from '../_fonts/Inter-Regular.woff2'
import InterBold from '../_fonts/Inter-Bold.woff2'
import VeraMono from '../_fonts/Vera-Mono.woff2'
import { Config } from '../../../types'

// const twOptions = { folder: 'svg', ext: '.svg' }
// const emojify = (text: string) => twemoji.parse(text, twOptions)

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

// <div class="heading">
// ${emojify(md ? marked(text) : sanitize(text))}
// </div>

// const c: Config = {
const c = {
  fileType: 'png',
  theme: 'dark',
  components: [
    {
      type: 'frame',
      text: 'Crust Bombora',
    },
    {
      type: 'bars',
      text: 'Nitto x Crust Shaka bar',
    },
    {
      type: 'wheels',
      text: 'Mavic Allroad Elite UST Disc',
    },
    {
      type: 'tires',
      text: 'Ultradynamico Cava JFF',
    },
    {
      type: 'brakes',
      text: 'Paul Components Klampers',
    },
    {
      type: 'cranks',
      text: 'Shimano GRX',
    },
    {
      type: 'chainrings',
      text: 'Wolftooth 1X 44 Tooth',
    },
    {
      type: 'rear_derailleur',
      text: 'Shimano Ultegra 11 Speed',
    },
  ],
}

export const html = (config: Config): string => {
  const { theme, components } = config
  const fontSize = '36px'

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>${css(theme, fontSize)}</style>
    <body>
        <div>
            ${components.map(({ type, text }) => `<div class="heading">${type}: ${sanitize(text)}</div>`)}
        </div>
    </body>
</html>`
}
