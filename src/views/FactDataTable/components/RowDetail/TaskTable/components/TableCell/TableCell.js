import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cell: {
    padding: '5px 7px',
  },
  cellCalendar: {
    borderLeft: props => (props.border ? '1px solid rgba(224, 224, 224, 1)' : 'none'),
    backgroundColor: props => {
      return props.backgroundColor;
    },
  },
});

const TableCell = ({ colorCalenadr, className, ...restProps }) => {
  const { column } = restProps;
  const props = {
    backgroundColor: colorCalenadr[column.name] ? colorCalenadr[column.name] : '',
    border: colorCalenadr[column.name],
  };
  const classes = useStyles(props);
  return <Table.Cell {...restProps} className={classNames(classes.cell, className, classes.cellCalendar)} />;
};

TableCell.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  colorCalenadr: PropTypes.object,
};

export default TableCell;
