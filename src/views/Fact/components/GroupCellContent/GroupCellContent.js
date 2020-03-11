import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { groupColumn } from '../../settings/settings.js';
import { TableGroupRow } from '@devexpress/dx-react-grid-material-ui';

const GroupCellContent = ({ groupingKeys, row, ...restProps }) => {
  if (row.groupedBy !== 'default') return <TableGroupRow.Content row={row} {...restProps} />;
  const values = row.value.split(';');
  if (values.length === 1)
    return (
      <span>
        <strong>Все задачи:</strong>
      </span>
    );
  return (
    <span>
      {groupingKeys.map((key, index) => {
        return (
          <span key={key}>
            <strong>{groupColumn[key]}: </strong> {`${values[index]}; `}
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
