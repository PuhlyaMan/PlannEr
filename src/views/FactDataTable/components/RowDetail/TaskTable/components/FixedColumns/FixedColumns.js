import React from 'react';
import { TableFixedColumns } from '@devexpress/dx-react-grid-material-ui';

export const font = state => {
  switch (state) {
    case 'В работе':
      return 'rgba(200, 235, 195)';
    case 'Ожидание':
      return 'rgba(250, 250, 185)';
    case 'Выполнено':
      return 'rgba(237, 237, 237)';
    default:
      return '';
  }
};

const FixedColumns = ({ ...restProps }) => {
  const row = restProps.tableRow.row;
  return (
    <TableFixedColumns.Cell
      {...restProps}
      style={{
        backgroundColor: row ? font(row.state) : '#ffffff',
      }}
    />
  );
};

export default FixedColumns;
