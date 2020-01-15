import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TableGroupRow } from '@devexpress/dx-react-grid-material-ui';

const columnWork = {
  id: 'ID работы',
  name: 'Работа',
  state: 'Статус',
  point: 'Пункт графика',
  contract_name: 'Договор',
  project_name: 'Проект',
};

const GroupCellContent = ({ groupingKeys, row, ...restProps }) => {
  if (row.groupedBy !== 'default') return <TableGroupRow.Content row={row} {...restProps} />;
  const values = row.value.split(';');
  return (
    <span>
      {groupingKeys.map((key, index) => {
        return (
          <span key={key}>
            <strong>{columnWork[key]}: </strong> {`${values[index]}; `}
          </span>
        );
      })}
    </span>
  );
};

GroupCellContent.propTypes = {
  groupingKeys: PropTypes.array,
  row: PropTypes.object,
};

export default memo(GroupCellContent);
