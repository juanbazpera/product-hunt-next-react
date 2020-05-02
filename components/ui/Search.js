import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Router from 'next/router';

const Input = styled.input`
  border: 1px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
`;

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url('/static/img/buscar.png');
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 4px;
  background-color: white;
  border: none;
  text-ident: -99999;
`;

const Search = () => {
  const [search, setSearch] = useState('');

  const handleSearchProduct = (e) => {
    e.preventDefault();

    if (search.trim() === '') return;
    Router.push({
      pathname: '/search',
      query: { q: search },
    });
  };

  return (
    <form
      onSubmit={handleSearchProduct}
      css={css`
        position: relative;
      `}
    >
      <Input
        type='text'
        placeholder='Buscar productos'
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputSubmit type='submit'></InputSubmit>
    </form>
  );
};

export default Search;
