import React from 'react';
import PropTypes from 'prop-types';
import { TableGroupRow } from '@devexpress/dx-react-grid-material-ui';

const GroupCellContent = ({ row, ...restProps }) => {
  if (row.groupedBy !== 'default') return <TableGroupRow.Content row={row} {...restProps} />;
  const arrValue = row.value.split(';');
  return (
    <span>
      <strong>ID работы: </strong> {arrValue[0]}; <strong>Наимернование работы: </strong> {arrValue[1]};{' '}
      <strong>Договор: </strong> {arrValue[2]}
    </span>
  );
};

GroupCellContent.propTypes = {
  row: PropTypes.object,
};

export default GroupCellContent;
