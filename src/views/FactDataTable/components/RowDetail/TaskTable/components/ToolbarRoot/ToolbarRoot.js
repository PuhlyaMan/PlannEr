import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from '@devexpress/dx-react-grid-material-ui';
import CustomToolbar from '../CustomToolbar/CustomToolbar.js';

const ToolbarRoot = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  create,
  disable,
  setDisable,
  children,
  ...restProps
}) => {
  return (
    <Toolbar.Root {...restProps}>
      <CustomToolbar
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        create={create}
        disable={disable}
        setDisable={setDisable}
      />
      {children}
    </Toolbar.Root>
  );
};

ToolbarRoot.propTypes = {
  children: PropTypes.element,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
  create: PropTypes.func,
  disable: PropTypes.object,
  setDisable: PropTypes.func,
};

export default ToolbarRoot;
