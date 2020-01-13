import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from '@devexpress/dx-react-grid-material-ui';
import CustomToolbar from '../CustomToolbar/CustomToolbar.js';

const ToolbarRoot = ({ setColumns, setTableColumnExtensions, setColorCalendar, children }) => {
  return (
    <Toolbar.Root>
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
  setColorCalendar: PropTypes.func,
};

export default ToolbarRoot;
