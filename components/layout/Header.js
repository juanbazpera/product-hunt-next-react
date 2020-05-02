import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { FirebaseContext } from '../../firebase';

import Navigation from './Navigation';
import Search from '../ui/Search';

import Button from '../ui/Button';

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  border-bottom: 0.1rem solid var(--gris3);
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  margin-right: 2rem;
  margin-top: 1rem;
`;

const P = styled.p`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);

  return (
    <HeaderContainer>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Link href='/'>
          <Logo>P</Logo>
        </Link>

        <Search />
        <Navigation />
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        {user ? (
          <>
            <P
              css={css`
                margin-right: 2rem;
              `}
            >
              Hola {user.displayName}
            </P>
            <Button bgColor='true' onClick={() => firebase.logout()}>
              Cerrar sesión
            </Button>
          </>
        ) : (
          <>
            <Link href='/login'>
              <Button bgColor='true'>Login</Button>
            </Link>
            <Link href='/register'>
              <Button>Crear cuenta</Button>
            </Link>
          </>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
