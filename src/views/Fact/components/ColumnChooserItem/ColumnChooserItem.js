import React from 'react';
import { ColumnChooser } from '@devexpress/dx-react-grid-material-ui';

const ColumnChooserItem = restProps => {
  const { disabled } = restProps;
  return disabled ? <></> : <ColumnChooser.Item {...restProps} />;
};

export default ColumnChooserItem;
