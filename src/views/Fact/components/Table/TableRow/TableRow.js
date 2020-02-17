import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import useCountRender from 'utils/useCountRender';

const style = {
  row: {
    cursor: 'pointer',
  },
};

const TableRowBase = ({ classes, className, ...restProps }) => {
  useCountRender('TableRowBase');
  return <Table.Row {...restProps} className={classNames(className, classes.row)} />;
};

TableRowBase.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default memo(withStyles(style)(TableRowBase));
