import { NextApiRequest } from 'next';
import { parse } from 'url';

import { Config } from './types';

let thing = {
    theme: 'dark',
    fileType: 'png',
    text: 'Hello world!'
}

export function parseConfig(req: NextApiRequest): Config {
    console.log('parsing req: ' + req.url);
    const { query } = parse(req.url || '/', true);

    let config: Config | undefined

    try {
        if (Array.isArray(query.c)) {
            throw new Error("config is invalid");
        }

        config = JSON.parse(query.c);
    } catch (e) {
        console.log(e);
        // todo throw error
    }
    
    console.log(config);

    return config;
}