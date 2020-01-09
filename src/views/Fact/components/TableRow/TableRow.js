import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyle = makeStyles({
  row: {
    cursor: 'pointer',
    backgroundColor: props => font(props.state),
  },
});

export const font = state => {
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

const TableRow = ({ row, className, ...restProps }) => {
  const props = { state: row.task_state };
  const classes = useStyle(props);
  return <Table.Row {...restProps} className={classNames(className, classes.row)} />;
};

TableRow.propTypes = {
  row: PropTypes.object,
  className: PropTypes.string,
};

export default TableRow;
