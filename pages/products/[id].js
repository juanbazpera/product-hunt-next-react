import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { FirebaseContext } from '../../firebase';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Error404 from '../../components/layout/404';
import Button from '../../components/ui/Button';

import { Label, InputSubmit } from '../../components/ui/Form';

const ProductContenier = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Products = () => {
  const router = useRouter();
  const { firebase, user } = useContext(FirebaseContext);
  const [error, seterror] = useState(false);
  const [product, setProduct] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [fetchDB, setFetchDB] = useState(true);

  const {
    query: { id },
  } = router;

  useEffect(() => {
    const getProducts = async () => {
      if (id && fetchDB) {
        const query = await firebase.db.collection('products').doc(id);
        const data = await query.get();
        if (data.exists) {
          setProduct(data.data());
        } else {
          seterror(true);
        }
        setFetchDB(false);
      }
    };
    getProducts();
  }, [id, fetchDB]);

  if (!product || Object.keys(product).length === 0)
    return (
      <Layout>
        {error ? (
          <Error404 message='No existe el producto' />
        ) : (
          <p>Cargando...</p>
        )}
      </Layout>
    );

  const voteProduct = async () => {
    if (!user) {
      router.push('/login');
    }

    setProduct({ ...product, votes: votes + 1 });
    await firebase.db
      .collection('products')
      .doc(id)
      .update({
        votes: votes + 1,
        hasVoted: [...hasVoted, user.uid],
      });
    setFetchDB(true);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      return router.push('/login');
    }
    await firebase.db
      .collection('products')
      .doc(id)
      .update({ comments: [...comments, newComment] });
    setFetchDB(true);
    setNewComment({});
  };

  const canDelete = () => {
    if (!user) {
      return router.push('/login');
    }
    if (userCreator.id === user.uid) {
      return true;
    }
  };

  const handleDelete = async () => {
    try {
      if (!user) {
        return router.push('/login');
      }
      if (userCreator.id !== user.uid) {
        return router.push('/');
      }
      await firebase.db.collection('products').doc(id).delete();
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const {
    comments,
    created,
    description,
    company,
    userCreator,
    hasVoted,
    name,
    url,
    urlImage,
    votes,
  } = product;

  return (
    <Layout>
      <div className='contenedor'>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          {name}
        </h1>
        <ProductContenier>
          <div
            css={css`
              margin-top: 1rem;
            `}
          >
            <p>
              Publicado hace:{' '}
              {formatDistanceToNow(new Date(created), { locale: es })}
            </p>
            <p>Publicado por: {userCreator && userCreator.name}</p>
            <img src={urlImage} />
            <p
              css={css`
                color: #888;
              `}
            >
              {description}
            </p>

            {user && (
              <>
                <h2>Agrega tu comentario</h2>
                <form onSubmit={handleAddComment}>
                  <Label>
                    <input
                      type='text'
                      value={newComment.comment}
                      onChange={(e) =>
                        setNewComment({
                          id: user.uid,
                          name: user.displayName,
                          comment: e.target.value,
                        })
                      }
                    />
                  </Label>
                  <InputSubmit type='submit' value='Agregar comentario' />
                </form>
              </>
            )}

            <h2
              css={css`
                margin: 2rem 0;
              `}
            >
              Comentarios
            </h2>
            {comments.length === 0 && <p>No hay comentarios</p>}
            <ul>
              {comments.map((comment, index) => (
                <li
                  key={`${comment.uid}-${index}`}
                  css={css`
                    border: 1px solid #e1e1e1;
                    padding: 2rem;
                  `}
                >
                  <p>{comment.comment}</p>
                  <p>
                    Escrito por:{'  '}
                    <span
                      css={css`
                        font-weight: bold;
                      `}
                    >
                      {comment.name}
                    </span>{' '}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <aside>
            <Button target='_blank' bgColor='true' href={url}>
              Visitar URL
            </Button>

            <div
              css={css`
                margin-top: 4rem;
              `}
            >
              <p
                css={css`
                  text-align: center;
                `}
              >
                {votes} Votos
              </p>
              {user && hasVoted.includes(user.uid) ? (
                <p
                  css={css`
                    text-align: center;
                  `}
                >
                  Ya has votado
                </p>
              ) : (
                user && <Button onClick={voteProduct}>Votar</Button>
              )}
            </div>
          </aside>
        </ProductContenier>
        {canDelete() && (
          <Button onClick={handleDelete}>Eliminar producto</Button>
        )}
      </div>
    </Layout>
  );
};

export default Products;
