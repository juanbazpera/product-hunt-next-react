import React, { useState, useContext } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';

import { FirebaseContext } from '../firebase';

import useValidation from '../hooks/useValidation';
import validateNewProduct from '../validations/validateNewProduct';
import { Form, Label, InputSubmit, Error } from '../components/ui/Form';
import Error404 from '../components/layout/404';

const NewProduct = () => {
  const INITIAL_STATE = {
    name: '',
    company: '',
    // image: '',
    url: '',
    description: '',
  };

  const { user, firebase } = useContext(FirebaseContext);

  const [globalError, setGlobalError] = useState('');
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState('');
  const router = useRouter();

  const newProduct = async () => {
    if (!user) {
      router.push('/login');
    }

    const product = {
      name,
      company,
      url,
      urlImage,
      description,
      votes: 0,
      comments: [],
      created: Date.now(),
      userCreator: { id: user.uid, name: user.displayName },
      hasVoted: [],
    };

    await firebase.db.collection('products').add(product);
    router.push('/');
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateNewProduct, newProduct);

  const { name, company, url, description } = values;

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };
  const handleProgress = (progress) => setProgress({ progress });
  const handleUploadError = (error) => {
    setUploading(error);
    console.error(error);
  };
  const handleUploadSuccess = (name) => {
    setProgress(100);
    setUploading(false);
    setImageName(name);
    firebase.storage
      .ref('products')
      .child(name)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setUrlImage(url);
      });
  };

  return (
    <Layout>
      {!user ? (
        <Error404 message='Debe iniciar sessión' />
      ) : (
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Nuevo producto
          </h1>
          <Form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Información General</legend>

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
                <label htmlFor='company'>Empresa</label>
                <input
                  type='text'
                  id='company'
                  placeholder='Empresa'
                  name='company'
                  value={values.company}
                  onChange={handleChange}
                  onKeyUpCapture={handleBlur}
                />
              </Label>
              {errors.company && <Error>{errors.company}</Error>}

              <Label>
                <label htmlFor='image'>Imagen</label>
                <FileUploader
                  accept='image/*'
                  id='image'
                  name='image'
                  randomizeFilename
                  storageRef={firebase.storage.ref('products')}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Label>
              {errors.image && <Error>{errors.image}</Error>}

              <Label>
                <label htmlFor='url'>URL</label>
                <input
                  type='url'
                  id='url'
                  name='url'
                  value={values.url}
                  onChange={handleChange}
                  onKeyUpCapture={handleBlur}
                />
              </Label>
              {errors.url && <Error>{errors.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>Información sobre tu Producto</legend>
              <Label>
                <label htmlFor='description'>Descripción</label>
                <textarea
                  id='description'
                  placeholder='Descripción'
                  name='description'
                  value={values.description}
                  onChange={handleChange}
                  onKeyUpCapture={handleBlur}
                />
              </Label>
              {errors.description && <Error>{errors.description}</Error>}
            </fieldset>
            {globalError && <Error>{globalError}</Error>}
            <InputSubmit type='submit' value='Crear Producto' />
          </Form>
        </>
      )}
    </Layout>
  );
};

export default NewProduct;
