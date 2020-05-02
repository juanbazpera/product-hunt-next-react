import React from 'react';
import Layout from '../components/layout/Layout';
import Product from '../components/layout/Product';
import useProducts from '../hooks/useProducts';
import { css } from '@emotion/core';

const Popular = () => {
  const { products } = useProducts('votes');

  return (
    <div>
      <Layout>
        <div className='listado-productos'>
          <div className='contenedor'>
            <h1
              css={css`
                text-align: center;
                margin-top: 0rem;
                margin-bottom: 2rem;
              `}
            >
              Productos populares
            </h1>
            <div className='bg-white'>
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Popular;
