import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  stateCell: {
    backgroundColor: props => props.backgroundColor,
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

const StateTableCell = ({ className, onClick, ...restProps }) => {
  const { row } = restProps;
  const props = { backgroundColor: font(row.task_state) };
  const classes = useStyles(props);
  return (
    <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} className={classNames(className, classes.stateCell)} />
  );
};

StateTableCell.propTypes = {
  className: PropTypes.string,
  colorCalendar: PropTypes.object,
  onClick: PropTypes.func,
};

export default StateTableCell;
