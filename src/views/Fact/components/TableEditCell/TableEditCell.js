import React from 'react';
import PropTypes from 'prop-types';
import { TableEditRow } from '@devexpress/dx-react-grid-material-ui';
import TableCell from '../TableCell/TableCell.js';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const style = {
  editCell: {
    padding: '2px 5px',
    backgroundColor: 'rgba(213, 245, 222, 0.8)',
  },
};

const TableEditCell = ({ classes, colorCalendar, editingEnabled, onValueChange, className, ...restProps }) => {
  if (editingEnabled)
    return (
      <TableEditRow.Cell
        {...restProps}
        editingEnabled={editingEnabled}
        onValueChange={onValueChange}
        className={classNames(className, classes.editCell)}
      />
    );
  return <TableCell className={className} colorCalendar={colorCalendar} {...restProps} />;
};

TableEditCell.propTypes = {
  className: PropTypes.string,
  editingEnabled: PropTypes.bool,
  onValueChange: PropTypes.func,
  colorCalendar: PropTypes.object,
  classes: PropTypes.object,
};

export default withStyles(style)(TableEditCell);
