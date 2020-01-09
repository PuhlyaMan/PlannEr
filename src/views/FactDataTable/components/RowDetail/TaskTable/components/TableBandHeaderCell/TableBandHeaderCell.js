import React from 'react';
import PropTypes from 'prop-types';
import { TableBandHeader } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const style = {
  cellHeaderBand: {
    padding: '5px 7px',
    textAlign: 'center',
  },
};

const TableBandHeaderCell = ({ classes, className, ...restProps }) => (
  <TableBandHeader.Cell {...restProps} className={classNames(classes.cellHeader, className, classes.cellHeaderBand)} />
);

TableBandHeaderCell.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default withStyles(style)(TableBandHeaderCell);
