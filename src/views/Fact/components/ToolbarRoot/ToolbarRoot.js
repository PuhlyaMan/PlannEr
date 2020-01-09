import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from '@devexpress/dx-react-grid-material-ui';
import CustomToolbar from '../CustomToolbar/CustomToolbar.js';

const ToolbarRoot = ({ setColumns, setTableColumnExtensions, setColorCalenadr, children }) => {
  return (
    <Toolbar.Root>
      <CustomToolbar
        setColumns={setColumns}
        setTableColumnExtensions={setTableColumnExtensions}
        setColorCalenadr={setColorCalenadr}
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
  setColorCalenadr: PropTypes.func,
};

export default ToolbarRoot;
