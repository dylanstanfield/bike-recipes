import { NextApiRequest } from 'next';
import { parse } from 'url';

import { Config } from './types';

// let thing = {
//     theme: 'dark',
//     fileType: 'png',
//     text: 'Hello world!'
// }

export function parseConfig(req: NextApiRequest): Config {
  const { query } = parse(req.url || '/', true);

  if (Array.isArray(query.c) || !query.c) {
    throw new Error('config is invalid');
  }

  const config = JSON.parse(query.c);

  if (!config) {
    throw new Error('config is invalid');
  }

  // todo: json validate

  return config;
}
