import React from 'react';
import PropTypes from 'prop-types';
import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  calendarCellColumn: {
    width: '100%',
  },
};

const SortLabel = ({ colorCalendar, column, classes, ...restProps }) => {
  return colorCalendar[column.name] ? (
    <div className={classes.calendarCellColumn}>{column.title}</div>
  ) : (
    <TableHeaderRow.SortLabel {...restProps} />
  );
};

SortLabel.propTypes = {
  column: PropTypes.object,
  classes: PropTypes.object,
  colorCalendar: PropTypes.object,
};

export default withStyles(styles)(SortLabel);
