import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import CalcTableCell from './CalcTableCell.js';
import StateTableCell from './StateTableCell.js';
import TaskPlanFinishDateTableCell from './TaskPlanFinishDateTableCell.js';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cell: {
    padding: '2px 7px',
  },
  cellCalendar: {
    borderRight: props => (props.border ? '1px solid rgba(224, 224, 224, 1)' : 'none'),
    backgroundColor: props => {
      return props.backgroundColor;
    },
  },
});

const TableCell = ({ onClick, colorCalendar, className, ...restProps }) => {
  const { column } = restProps;
  const props = {
    backgroundColor: colorCalendar[column.name] ? colorCalendar[column.name] : '',
    border: colorCalendar[column.name],
  };
  const classes = useStyles(props);
  switch (column.name) {
    case 'calc':
      return <CalcTableCell />;
    case 'task_plan_finish_date':
      return (
        <TaskPlanFinishDateTableCell {...restProps} onFocus={onClick} className={classNames(classes.cell, className)} />
      );
    case 'task_state':
      return <StateTableCell {...restProps} onFocus={onClick} className={classNames(classes.cell, className)} />;
    default:
      return (
        <Table.Cell
          {...restProps}
          tabIndex={0}
          onFocus={onClick}
          className={classNames(classes.cell, className, classes.cellCalendar)}
        />
      );
  }
};

TableCell.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  colorCalendar: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(TableCell);