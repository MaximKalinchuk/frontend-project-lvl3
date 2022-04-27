import { object, string } from 'yup';

// Валидатор
const validate = async (url) => { // state не нужен
  const userSchema = object({ url: string().url().nullable() });

  try {
    await userSchema.validate(url);
    return true;
  } catch (error) {
    return false;
  }
};

export default validate;
