import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/Layout';

import firebase from '../firebase';

import useValidation from '../hooks/useValidation';
import validateRegister from '../validations/validateRegister';
import { Form, Label, InputSubmit, Error } from '../components/ui/Form';

const Register = () => {
  const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
  };

  const [globalError, setGlobalError] = useState('');

  const register = async () => {
    try {
      await firebase.register(values.name, values.email, values.password);
      Router.push('/');
    } catch (err) {
      console.log('Hubo un error al crear usuario', err.message);
      setGlobalError(err.message);
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateRegister, register);

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
            <label htmlFor='name'>Nombre</label>
            <input
              type='text'
              id='name'
              placeholder='Nombre'
              name='name'
              value={values.name}
              onChange={handleChange}
              onKeyUpCapture={handleBlur}
            />
          </Label>
          {errors.name && <Error>{errors.name}</Error>}
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
              onBlur={handleBlur}
            />
          </Label>
          {errors.password && <Error>{errors.password}</Error>}

          {globalError && <Error>{globalError}</Error>}
          <InputSubmit type='submit' value='Crear cuenta' />
        </Form>
      </>
    </Layout>
  );
};

export default Register;
