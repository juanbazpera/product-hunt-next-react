export default (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = 'El email es Obligatorio';
  }

  if (!values.password) {
    errors.password = 'El password es obligatorio';
  }

  return errors;
};
