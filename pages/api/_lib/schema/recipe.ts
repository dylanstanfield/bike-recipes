import { object, string, array } from 'yup'
import { Recipe } from '../../../../types/schema'

const schema = object().shape({
  name: string(),
  description: string(),
  parts: array().of(string()),
})

export const validateRecipe = async (recipe: Recipe): Promise<{ valid: boolean; errors?: string[] }> => {
  try {
    return { valid: Boolean(await schema.validate(recipe, { strict: true })) }
  } catch (error) {
    return { valid: false, errors: error.message }
  }
}
