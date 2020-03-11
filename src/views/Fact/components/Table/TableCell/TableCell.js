import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import CalcTableCell from './CalcTableCell.js';
import StateTableCell from './StateTableCell.js';
import TaskPlanFinishDateTableCell from './TaskPlanFinishDateTableCell.js';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
//import useCountRender from 'utils/useCountRender.js';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

const useStyles = makeStyles({
  cell: {
    padding: '2px 7px',
  },
  cellCalendar: {
    borderTop: props => props.borderTop,
    borderRight: props => props.borderRight,
    /*borderBottom: props => props.borderBottom,
    borderLeft: props => props.borderLeft,
    borderRight: props => props.borderRight,*/
    backgroundColor: props => props.backgroundColor,
  },
});

const TableCell = ({ onClick, calendar, className, ...restProps }) => {
  //useCountRender('TableCell');
  const { column, row } = restProps;

  const calendarColumn = calendar.find(item => item.day === Number(column.title));
  let props = {
    backgroundColor:
      row.task_state === 'Выполнено' && calendarColumn
        ? 'rgba(224, 224, 224, 0.5)'
        : (calendarColumn && calendarColumn.color) || '',
  };

  /*if (column.name.startsWith('day_')) {
    const rangeDayTask = eachDayOfInterval({
      start: new Date(row.task_plan_start_date),
      end: new Date(row.task_plan_finish_date),
    }).map(date => ({ day: date.getDate(), month: date.getMonth() }));
    const daySettings = calendar.find(item => item.day === Number(column.title));
    const index = rangeDayTask.findIndex(
      element => element.month === daySettings.month && element.day === daySettings.day
    );
    if (index !== -1) {
      props.borderTop = '2px solid #9c988e';
      props.borderBottom = '2px solid #9c988e';
      if (index === 0) {
        props.borderLeft = '2px solid #9c988e';
      } else if (index === rangeDayTask.length - 1) {
        props.borderRight = '2px solid #9c988e';
      }
    }
    if (!props.borderRight) props.borderRight = '1px solid rgba(224, 224, 224, 1)';
  }*/

  if (column.name.startsWith('day_')) {
    const index = eachDayOfInterval({
      start: new Date(row.task_plan_start_date),
      end: new Date(row.task_plan_finish_date),
    })
      .map(date => ({ day: date.getDate(), month: date.getMonth() }))
      .findIndex(element => element.month === calendarColumn.month && element.day === calendarColumn.day);
    if (index !== -1) {
      props.borderTop = '10px solid blue';
    }
    props.borderRight = '1px solid rgba(224, 224, 224, 1)';
  }

  const classes = useStyles(props);

  const getCustomTableCell = name => {
    return {
      calc: <CalcTableCell />,
      task_plan_finish_date: (
        <TaskPlanFinishDateTableCell {...restProps} className={classNames(classes.cell, className)} />
      ),
      task_state: <StateTableCell {...restProps} className={classNames(classes.cell, className)} />,
    }[name];
  };

  const customTableCell = getCustomTableCell(column.name);
  if (customTableCell) {
    return customTableCell;
  } else if (calendarColumn && calendarColumn.edit && row.task_state !== 'Выполнено') {
    return (
      <Table.Cell
        tabIndex={0}
        onFocus={onClick}
        className={classNames(classes.cell, className, classes.cellCalendar)}
        {...restProps}
      />
    );
  } else {
    return (
      <Table.Cell tabIndex={0} className={classNames(classes.cell, className, classes.cellCalendar)} {...restProps} />
    );
  }
};

TableCell.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  calendar: PropTypes.array,
  onClick: PropTypes.func,
};

// eslint-disable-next-line no-unused-vars
const compare = () => {
  return true;
};

export default memo(TableCell, compare);
