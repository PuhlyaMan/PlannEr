import React from 'react';
import { GroupingPanel } from '@devexpress/dx-react-grid-material-ui';

const GroupingPanelContainer = ({ ...restProps }) => {
  return <GroupingPanel.Container {...restProps} style={{ width: '48%', order: '-1' }} />;
};

export default GroupingPanelContainer;
