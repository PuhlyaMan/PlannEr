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
  setColorCalendar,
  children,
}) => {
  return (
    <Toolbar.Root>
      <FilterBase setFilterKey={setFilterKey} />
      <GroupBase setGroupingKeys={setGroupingKeys} />
      <CustomToolbar
        setColumns={setColumns}
        setTableColumnExtensions={setTableColumnExtensions}
        setColorCalendar={setColorCalendar}
      />
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
  setColorCalendar: PropTypes.func,
};

export default memo(ToolbarRoot);
