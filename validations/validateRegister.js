export default (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = 'El nombre es obligatorio';
  }

  if (!values.email) {
    errors.email = 'El email es Obligatorio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Email no válido';
  }

  if (!values.password) {
    errors.password = 'El password es obligatorio';
  } else if (values.password.length < 6) {
    errors.password = 'El password debe tener al menos 6 caracteres';
  }

  return errors;
};
