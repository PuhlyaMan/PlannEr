import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import CalcTableCell from './CalcTableCell.js';
import StateTableCell from './StateTableCell.js';
import TaskPlanFinishDateTableCell from './TaskPlanFinishDateTableCell.js';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import useCountRender from 'utils/useCountRender.js';

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
  useCountRender('TableCell');
  const { column, row } = restProps;
  const calendarColumn = colorCalendar[column.name];
  const props = {
    backgroundColor:
      row.task_state === 'Выполнено' && calendarColumn
        ? 'rgba(224, 224, 224, 0.5)'
        : (calendarColumn && calendarColumn.color) || '',
    border: calendarColumn,
  };
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
  } else if (colorCalendar[column.name] && colorCalendar[column.name].edit && row.task_state !== 'Выполнено') {
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
  colorCalendar: PropTypes.object,
  onClick: PropTypes.func,
};

// eslint-disable-next-line no-unused-vars
const compare = () => {
  return true;
};

export default memo(TableCell, compare);
