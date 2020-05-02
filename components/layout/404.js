import React from 'react';
import { css } from '@emotion/core';

const Error404 = ({ message }) => {
  return (
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
      `}
    >
      {message}
    </h1>
  );
};

export default Error404;
