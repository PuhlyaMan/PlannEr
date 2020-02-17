import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell.js';
import InputCell from './Input.js';

const CellComponent = () => {
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState();

  const handleChange = useCallback(e => setValue(e.target.value), []);
  const handleClick = useCallback(() => setCheck(true), []);
  const handleBlur = useCallback(() => setCheck(false), []);
  const handleFocus = useCallback(e => e.target.select(), []);

  return check ? (
    <InputCell handleBlur={handleBlur} handleChange={handleChange} handleFocus={handleFocus} value={value} />
  ) : (
    <Cell onClick={handleClick}>{value}</Cell>
  );
};

CellComponent.propTypes = {
  children: PropTypes.any,
};

export default CellComponent;
