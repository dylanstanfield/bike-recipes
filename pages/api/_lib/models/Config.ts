export type FileType = 'png' | 'jpeg'
export type Theme = 'light' | 'dark'

export interface Config {
  fileType: FileType
  text: string
  theme: Theme
}

export const ConfigSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['fileType', 'text', 'theme'],
  properties: {
    fileType: { type: 'string', enum: ['png', 'jpeg'] },
    text: { type: 'string' },
    theme: { type: 'string', enum: ['light', 'dark'] },
  },
}
