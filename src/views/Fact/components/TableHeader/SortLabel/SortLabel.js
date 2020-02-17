import React from 'react';
import PropTypes from 'prop-types';
import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import useCountRender from 'utils/useCountRender';

const styles = {
  calendarCellColumn: {
    width: '100%',
  },
};

const SortLabel = ({ classes, ...restProps }) => {
  useCountRender('SortLabel');
  const { disabled, column } = restProps;
  return disabled ? (
    <div className={classes.calendarCellColumn}>{column.title}</div>
  ) : (
    <TableHeaderRow.SortLabel {...restProps} />
  );
};

SortLabel.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SortLabel);
