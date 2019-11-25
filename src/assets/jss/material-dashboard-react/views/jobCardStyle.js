import { rotateInDownRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';

export const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  value: {
    fontSize: '18px',
  },
  bigTitle: {
    fontSize: '25px',
    fontWeight: 'bold',
    margin: '20px 15px',
  },
  button: {
    border: 'none',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    cursor: 'pointer',
  },
};

const RotateDiv = styled.div`
  color: black;
  border: 2px solid black;
  border-radius: 15px;
  padding: 0 0 70px 0;
  width: 70%;
  background-color: white;
  right: 0px;
  position: fixed;
  z-index: 600;
  animation: 600ms ${keyframes`${rotateInDownRight}`};
`;

export default RotateDiv;
