import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from '@devexpress/dx-react-grid-material-ui';
import CustomToolbar from './CustomToolbar/CustomToolbar.js';
import GroupBase from './ColumnGroup/GroupBase.js';
import FilterBase from './ColumnFilter/FilterBase.js';

const ToolbarRoot = ({
  setFilterKey,
  setGroupingKeys,
  setColumns,
  setTableColumnExtensions,
  setCalendar,
  children,
}) => {
  return (
    <Toolbar.Root style={{ display: 'flex', alignItems: 'center' }}>
      <CustomToolbar
        setColumns={setColumns}
        setTableColumnExtensions={setTableColumnExtensions}
        setCalendar={setCalendar}
      />
      <FilterBase setFilterKey={setFilterKey} />
      <GroupBase setGroupingKeys={setGroupingKeys} />
      {children}
    </Toolbar.Root>
  );
};

ToolbarRoot.propTypes = {
  setFilterKey: PropTypes.func,
  children: PropTypes.element,
  setColumns: PropTypes.func,
  setTableColumnExtensions: PropTypes.func,
  setGroupingKeys: PropTypes.func,
  setCalendar: PropTypes.func,
};

export default memo(ToolbarRoot);
