import { string } from 'yup';
import axios from 'axios';

// Валидатор
const validate = (url, links) => {
  const urlSchema = string(url).url().nullable().notOneOf(links);

  try {
    const result = axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
      .then((response) => {
        const contentType = response.data.status.content_type;
        if (contentType) {
          const contentTypeArray = contentType.split(';');
          if (!contentTypeArray.includes('application/rss+xml')) {
            throw new Error('invalidRSS');
          }
        }
      }).then(() => {
        urlSchema.validateSync(url);
        return null;
      }).catch((error) => {
        // console.log('errorCat', error);
        if (error.message === 'invalidRSS') {
          return 'invalidRSS';
        }
        if (error.type === 'notOneOf') {
          return 'notOneOf';
        }
        if (error.type === 'url') {
          return 'url';
        }
        return error;
      });
    return result;
  } catch {
    return 'Ошибка сети';
  }
};

export default validate;
