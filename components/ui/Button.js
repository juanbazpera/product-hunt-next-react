import styled from '@emotion/styled';

const Button = styled.a`
  display: block;
  font-weight: 700;
  text-transform: uppercas;
  border: 1px solid #d1d1d1;
  padding: 0.8rem 2rem;
  text-align: center;
  margin: 2rem auto;
  background-color: ${(props) => (props.bgColor ? '#da552f' : 'white')};
  color: ${(props) => (props.bgColor ? 'white' : '#000')};

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
