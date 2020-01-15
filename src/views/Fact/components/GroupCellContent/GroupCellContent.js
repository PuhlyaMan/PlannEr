import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TableGroupRow } from '@devexpress/dx-react-grid-material-ui';

// eslint-disable-next-line no-unused-vars
const columnWork = ['Наименование работы', 'Статус работы', 'Пункт графика', 'Договор', 'Проект'];

// eslint-disable-next-line no-unused-vars
const GroupCellContent = ({ groupingValue, row, ...restProps }) => {
  if (row.groupedBy !== 'default') return <TableGroupRow.Content row={row} {...restProps} />;
  const arrValue = row.value.split(';');
  return (
    <span>
      <strong>ID работы: </strong> {arrValue[0]};
    </span>
  );
};

GroupCellContent.propTypes = {
  groupingValue: PropTypes.object,
  row: PropTypes.object,
};

export default memo(GroupCellContent);
