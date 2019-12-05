import { rotateInDownRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';

export const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: '12px',
  },
  value: {
    fontSize: '12px',
  },
  bigTitle: {
    fontSize: '18px',
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
  component: {
    minWidth: '100px',
    display: 'inline-block',
    padding: '0 15px 5px 0',
  },
  componentList: {
    padding: '0 0 0 40px',
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
