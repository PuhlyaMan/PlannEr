import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from '@devexpress/dx-react-grid-material-ui';
import CustomToolbar from '../CustomToolbar/CustomToolbar.js';
import GroupBase from '../ColumnGroup/GroupBase';

const ToolbarRoot = ({ setGroupingKeys, setColumns, setTableColumnExtensions, setColorCalendar, children }) => {
  return (
    <Toolbar.Root>
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

ToolbarRoot.displayName = 'ToolbarRoot';

ToolbarRoot.propTypes = {
  children: PropTypes.element,
  setColumns: PropTypes.func,
  setTableColumnExtensions: PropTypes.func,
  setGroupingKeys: PropTypes.func,
  setColorCalendar: PropTypes.func,
};

export default memo(ToolbarRoot);
