import { object, string, array } from 'yup'
import { FILE_TYPES, THEMES, COMPONENTS, Config } from '../../../../types'

const schema = object().shape({
  // fileType: string().required().oneOf(FILE_TYPES),
  // theme: string().required().oneOf(THEMES),
  // components: array()
  //   .required()
  //   .of(
  //     object().shape({
  //       type: string().required().oneOf(COMPONENTS),
  //       text: string().required(),
  //     }),
  //   ),
  name: string(),
  components: array().of(string()),
})

export const validateConfig = async (config: Config): Promise<{ valid: boolean; errors?: string[] }> => {
  try {
    return { valid: Boolean(await schema.validate(config, { strict: true })) }
  } catch (error) {
    return { valid: false, errors: error.message }
  }
}
