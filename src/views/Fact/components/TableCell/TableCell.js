import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cell: {
    padding: '5px 7px',
    //paddingRight: '32px',
  },
  cellCalendar: {
    borderLeft: props => (props.border ? '1px solid rgba(224, 224, 224, 1)' : 'none'),
    backgroundColor: props => {
      return props.backgroundColor;
    },
  },
});

const font = state => {
  switch (state) {
    case 'В работе':
      return 'rgba(200, 235, 195, 0.8)';
    case 'Ожидание':
      return 'rgba(250, 250, 185, 0.8)';
    case 'Выполнено':
      return 'rgba(237, 237, 237, 1)';
    case 'Запланировано':
      return 'rgba(146, 189, 232, 0.5)';
    case 'Новая':
      return 'rgba(255, 255, 255)';
    default:
      return '';
  }
};

const TableCell = ({ onClick, colorCalendar, className, ...restProps }) => {
  const onChangeClick = () => alert('Что-то заполняем!');

  const { column, row } = restProps;
  const props = {
    backgroundColor: colorCalendar[column.name]
      ? colorCalendar[column.name]
      : column.name === 'task_state'
      ? font(row.task_state)
      : '',
    border: colorCalendar[column.name],
  };
  const classes = useStyles(props);
  if (column.name === 'calc')
    return (
      <td>
        <Button variant="contained" fullWidth={true} color="primary" size="small" onClick={onChangeClick}>
          Рассчитать
        </Button>
      </td>
    );
  return (
    <Table.Cell
      {...restProps}
      tabIndex={0}
      onFocus={onClick}
      className={classNames(classes.cell, className, classes.cellCalendar)}
    />
  );
};

TableCell.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  colorCalendar: PropTypes.object,
  onClick: PropTypes.func,
};

export default TableCell;
