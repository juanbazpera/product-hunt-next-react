import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/Layout';

import firebase from '../firebase';

import useValidation from '../hooks/useValidation';
import validateLogin from '../validations/validateLogin';
import { Form, Label, InputSubmit, Error } from '../components/ui/Form';

const Login = () => {
  const INITIAL_STATE = {
    email: '',
    password: '',
  };

  const [globalError, setGlobalError] = useState('');

  const login = async () => {
    try {
      await firebase.login(values.email, values.password);
      Router.push('/');
    } catch (err) {
      console.log('Hubo un error al autenticar usuario', err.message);
      setGlobalError('Email o Password incorrecto');
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateLogin, login);

  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Crear cuenta
        </h1>
        <Form onSubmit={handleSubmit}>
          <Label>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              placeholder='Email'
              name='email'
              value={values.email}
              onChange={handleChange}
              onKeyUpCapture={handleBlur}
            />
          </Label>
          {errors.email && <Error>{errors.email}</Error>}
          <Label>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              name='password'
              value={values.password}
              onChange={handleChange}
              onKeyUpCapture={handleBlur}
            />
          </Label>
          {errors.password && <Error>{errors.password}</Error>}

          {globalError && <Error>{globalError}</Error>}
          <InputSubmit type='submit' value='Iniciar sesión' />
        </Form>
      </>
    </Layout>
  );
};

export default Login;
