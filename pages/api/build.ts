import { NextApiRequest, NextApiResponse } from 'next'
import { parseRequest } from './_lib/parser';
import { getHtml } from './_lib/template';
import { getScreenshot } from './_lib/chromium';

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.HTML_DEBUG === 'true';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const parsedReq = parseRequest(req);
        const html = getHtml(parsedReq);
        if (isHtmlDebug) {
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            return;
        }
        const { fileType } = parsedReq;
        const file = await getScreenshot(html, fileType, isDev);
        res.statusCode = 200;
        res.setHeader('Content-Type', `image/${fileType}`);
        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        res.end(file);
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
        console.error(e);
    }
}