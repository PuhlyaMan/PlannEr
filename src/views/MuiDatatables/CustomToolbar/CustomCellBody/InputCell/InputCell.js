import React, { useRef, memo } from 'react';
import PropTypes from 'prop-types';

const InputCell = memo(({ onChange, onBlur }) => {
  const renders = useRef(0);
  console.log(renders.current++);
  return (
    <input
      onChange={onChange}
      onBlur={onBlur}
      style={{
        textAlign: 'center',
        minWidth: '30px',
        maxWidth: '30px',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        borderBottom: '1px solid rgb(34, 36, 27, 1)',
        backgroundColor: 'inherit',
        minHeight: '24px',
      }}
    />
  );
});

InputCell.displayName = 'InputCell';

InputCell.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default InputCell;
