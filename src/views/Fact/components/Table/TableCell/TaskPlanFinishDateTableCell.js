import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const style = {
  alarmCell: {
    backgroundColor: 'rgba(250, 100, 100, 1)',
  },
};

const TaskPlanFinishDateTableCell = ({ classes, className, onClick, ...restProps }) => {
  const { row, value } = restProps;
  const background = row.task_state === 'Выполнено' ? '' : new Date(value) > new Date() ? '' : classes.alarmCell;
  return (
    <Table.Cell
      {...restProps}
      tabIndex={0}
      onFocus={onClick}
      className={classNames(classes.cell, className, background)}
    />
  );
};

TaskPlanFinishDateTableCell.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  colorCalendar: PropTypes.object,
  onClick: PropTypes.func,
};

export default withStyles(style)(TaskPlanFinishDateTableCell);
