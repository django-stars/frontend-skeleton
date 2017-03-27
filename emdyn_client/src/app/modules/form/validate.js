const strings = {
  required: 'Required field',
  email: {
    format: 'Invalid Email',
  },
}

export const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = strings.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = strings.email.format;
  }

  if (!values.password) {
    errors.password = strings.required;
  }

  return errors
}
