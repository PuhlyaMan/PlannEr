import React from 'react';
import { ColumnChooser } from '@devexpress/dx-react-grid-material-ui';
import useCountRender from 'utils/useCountRender';

const ColumnChooserItem = restProps => {
  useCountRender('ColumnChooserItem');
  const { disabled } = restProps;
  return disabled ? <></> : <ColumnChooser.Item {...restProps} />;
};

export default ColumnChooserItem;
