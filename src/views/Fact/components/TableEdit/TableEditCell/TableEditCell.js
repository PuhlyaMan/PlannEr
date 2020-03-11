import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TableEditRow } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const style = {
  editCell: {
    padding: '2px 5px',
    backgroundColor: 'rgba(213, 245, 222, 0.8)',
  },
};

const TableEditCell = ({ classes, editingEnabled, onValueChange, className, ...restProps }) => {
  return (
    <TableEditRow.Cell
      {...restProps}
      editingEnabled={editingEnabled}
      onValueChange={onValueChange}
      className={classNames(className, classes.editCell)}
    />
  );
};

// eslint-disable-next-line no-unused-vars
const compare = (prevProps, newProps) => {
  return prevProps.value === newProps.value;
};

TableEditCell.propTypes = {
  className: PropTypes.string,
  editingEnabled: PropTypes.bool,
  onValueChange: PropTypes.func,
  classes: PropTypes.object,
};

export default memo(withStyles(style)(TableEditCell), compare);
