import React from 'react';
import PropTypes from 'prop-types';
import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  cellHeader: {
    padding: '5px 7px',
    lineHeight: '1.1rem',
  },
};

const TableCellHeader = ({ classes, className, ...restProps }) => {
  return (
    <TableHeaderRow.Cell {...restProps} className={classNames(classes.cellHeader, className, classes.cellCalendar)} />
  );
};

TableCellHeader.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
};

export default withStyles(styles)(TableCellHeader);
