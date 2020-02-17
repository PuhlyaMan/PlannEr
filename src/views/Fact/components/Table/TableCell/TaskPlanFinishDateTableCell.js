import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import useCountRender from 'utils/useCountRender';

const style = {
  dateCell: {
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  alarmCell: {
    backgroundColor: 'rgba(250, 100, 100, 1)',
  },
};

const TaskPlanFinishDateTableCell = ({ classes, className, onClick, ...restProps }) => {
  useCountRender('TaskPlanFinishDateTableCell');
  const { row, value } = restProps;
  const alarm = row.task_state === 'Выполнено' ? '' : new Date(value) > new Date() ? '' : classes.alarmCell;
  return (
    <Table.Cell
      {...restProps}
      tabIndex={0}
      onFocus={onClick}
      className={classNames(classes.cell, classes.dateCell, className, alarm)}
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
