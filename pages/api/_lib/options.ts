import chrome from 'chrome-aws-lambda';
import { LaunchOptions } from 'puppeteer';
const exePath = process.platform === 'win32'
? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
: process.platform === 'linux'
? '/usr/bin/google-chrome'
: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export async function getOptions(isDev: boolean): Promise<LaunchOptions> {
    if (isDev) {
        return {
            args: [],
            executablePath: exePath,
            headless: true
        };
    }
    
    return {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    };
}