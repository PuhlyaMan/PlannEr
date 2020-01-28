import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const style = {
  row: {
    cursor: 'pointer',
  },
};

const TableRow = ({ classes, className, ...restProps }) => {
  return <Table.Row {...restProps} className={classNames(className, classes.row)} />;
};

TableRow.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default memo(withStyles(style)(TableRow));
