import { string } from 'yup';

// Валидатор
const validate = (url, links) => { // state не нужен
  const urlSchema = string(url).url().nullable().notOneOf(links);

  try {
    urlSchema.validateSync(url);
    return null;
  } catch (error) {
    if (error.type === 'notOneOf') {
      return 'notOneOf';
    }
    if (error.type === 'url') {
      return 'url';
    }
    return error;
  }
};

export default validate;
