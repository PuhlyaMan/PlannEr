import React from 'react';
import PropTypes from 'prop-types';
import { TableHeaderRow, Table } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import useCountRender from 'utils/useCountRender';

const style = {
  cellHeader: {
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    padding: '5px 7px',
    lineHeight: '1.1rem',
    backgroundColor: 'rgba(156, 169, 247, 0.7)',
  },
};

const TableCellHeader = ({ classes, className, ...restProps }) => {
  useCountRender('TableCellHeader');
  const { column } = restProps;

  const cell = column => {
    return {
      calc: <Table.Cell className={classNames(classes.cellHeader, className)} />,
    }[column];
  };

  return (
    cell(column.name) || <TableHeaderRow.Cell {...restProps} className={classNames(classes.cellHeader, className)} />
  );
};

TableCellHeader.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default withStyles(style)(TableCellHeader);
