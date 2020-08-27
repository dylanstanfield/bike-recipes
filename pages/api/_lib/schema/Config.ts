import { object, string } from 'yup'

const FILE_TYPES = ['png', 'jpeg'] as const
export type FileType = typeof FILE_TYPES[number]

const THEMES = ['light', 'dark'] as const
export type Theme = typeof THEMES[number]

export interface Config {
  fileType: FileType
  text: string
  theme: Theme
}

const schema = object().shape({
  fileType: string().required().oneOf(FILE_TYPES),
  text: string().required(),
  theme: string().required().oneOf(THEMES),
})

export const validateConfig = async (config: Config): Promise<{ valid: boolean; errors?: string[] }> => {
  try {
    return { valid: Boolean(await schema.validate(config, { strict: true })) }
  } catch (error) {
    return { valid: false, errors: error.message }
  }
}
