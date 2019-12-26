import React from 'react';
import PropTypes from 'prop-types';
import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  cellHeader: {
    borderLeft: props => (props.bordrer ? '1px solid rgba(224, 224, 224, 1)' : 'none'),
    padding: '5px 7px',
    lineHeight: '1.1rem',
  },
});

const TableCellHeader = ({ colorCalenadr, className, ...restProps }) => {
  const { column } = restProps;
  const classes = useStyle({ bordrer: colorCalenadr[column.name] });
  return (
    <TableHeaderRow.Cell {...restProps} className={classNames(classes.cellHeader, className, classes.cellCalendar)} />
  );
};

TableCellHeader.propTypes = {
  colorCalenadr: PropTypes.object,
  className: PropTypes.string,
};

export default TableCellHeader;
