import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import TableCell from '@material-ui/core/TableCell';
import useCountRender from 'utils/useCountRender';

const InputCell = ({ handleChange, handleFocus, handleBlur, value }) => {
  useCountRender('Input');

  return (
    <TableCell style={{ padding: '6px' }}>
      <Input
        autoFocus
        fullWidth
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={value}
      />
    </TableCell>
  );
};

InputCell.propTypes = {
  value: PropTypes.any,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleFocus: PropTypes.func,
};

export default memo(InputCell);
