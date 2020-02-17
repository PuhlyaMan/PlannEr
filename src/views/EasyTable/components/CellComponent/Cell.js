import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import useCountRender from 'utils/useCountRender';

const Cell = ({ children, onClick }) => {
  useCountRender('Cell');
  return (
    <TableCell tabIndex={0} onFocus={onClick} onClick={onClick} style={{ padding: '6px' }} align="center">
      {children}
    </TableCell>
  );
};

Cell.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
};

export default memo(Cell);
