import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import { css } from '@emotion/core';
import Product from '../components/layout/Product';
import useProducts from '../hooks/useProducts';

const Search = () => {
  const router = useRouter();
  const [productFilter, setProductFilter] = useState([]);

  const { products } = useProducts('created');
  const {
    query: { q },
  } = router;

  useEffect(() => {
    if (q) {
      const search = q.toLowerCase();
      const filter = products.filter((product) => {
        return product.name.toLowerCase().includes(search);
      });
      setProductFilter(filter);
    }
    return function clean() {
      setProductFilter([]);
    };
  }, [q, products]);

  return (
    <div>
      <Layout>
        <div className='listado-productos'>
          <div className='contenedor'>
            {productFilter.length === 0 && (
              <h1
                css={css`
                  text-align: center;
                  margin-top: 0rem;
                  margin-bottom: 2rem;
                `}
              >
                No se encontro ningun producto para {q}
              </h1>
            )}
            <div className='bg-white'>
              {productFilter.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Search;
