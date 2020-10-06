import { object, string, array } from 'yup'
import { Config, COMPONENT_TYPES } from '../../../../types'

const schema = object().shape({
  name: string(),
  components: array().of(
    object().shape({
      type: string().required().oneOf(COMPONENT_TYPES),
      description: string().required(),
    }),
  ),
})

export const validateConfig = async (config: Config): Promise<{ valid: boolean; errors?: string[] }> => {
  try {
    return { valid: Boolean(await schema.validate(config, { strict: true })) }
  } catch (error) {
    return { valid: false, errors: error.message }
  }
}
