import puppeteer, { Page } from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

import { FileType } from '../types/schema'

let cachedPage: Page | undefined
const { platform } = process

let devExecutablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

if (platform === 'win32') {
  devExecutablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
} else if (platform === 'linux') {
  devExecutablePath = '/usr/bin/google-chrome'
}

const getPage = async (isDev: boolean): Promise<Page> => {
  if (cachedPage) {
    return cachedPage
  }

  const options = {
    args: isDev ? [] : chrome.args,
    executablePath: isDev ? devExecutablePath : await chrome.executablePath,
    headless: isDev ? true : chrome.headless,
  }

  const browser = await puppeteer.launch(options)
  cachedPage = await browser.newPage()

  return cachedPage
}

export const screenshot = async (html: string, type: FileType, isDev: boolean): Promise<Buffer> => {
  const page = await getPage(isDev)
  await page.setViewport({ width: 1000, height: 1000 })
  await page.setContent(html)

  const file = await page.screenshot({ type })
  return file
}
