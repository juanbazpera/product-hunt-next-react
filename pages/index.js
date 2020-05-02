import React from 'react';
import Layout from '../components/layout/Layout';
import Product from '../components/layout/Product';
import useProducts from '../hooks/useProducts';

const Home = () => {
  const { products } = useProducts('created');

  return (
    <div>
      <Layout>
        <div className='listado-productos'>
          <div className='contenedor'>
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

export default Home;
