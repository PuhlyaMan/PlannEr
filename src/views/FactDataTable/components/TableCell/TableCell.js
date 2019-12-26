import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  cell: {
    padding: '5px 7px',
  },
};

const TableCell = ({ classes, className, ...restProps }) => {
  return <Table.Cell {...restProps} className={classNames(classes.cell, className, classes.cellCalendar)} />;
};

TableCell.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
};

export default withStyles(styles)(TableCell);
