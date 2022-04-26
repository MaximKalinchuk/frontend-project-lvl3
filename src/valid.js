import { object, string } from 'yup';
import render from './View.js';

const state = {
  links: [],
  haveLink: false,
  errors: false,
};

// Валидатор
const valid = async (url) => {
  const userSchema = object({ url: string().url().nullable() });

  try {
    const parsedUrl = await userSchema.validate(url);

    if (state.links.includes(parsedUrl.url)) {
      state.haveLink = true;
      render(state);
    }

    if (!state.links.includes(parsedUrl.url)) {
      state.links.push(parsedUrl.url);
      state.haveLink = false;
      render(state);
    }
  } catch (error) {
    state.errors = true;
    render(state);
    state.errors = false;
  }

  console.log('STATE:', state);
};

export default valid;
