import React from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import AccessTimeTwoToneIcon from '@material-ui/icons/AccessTimeTwoTone';
import DoneOutlineTwoToneIcon from '@material-ui/icons/DoneOutlineTwoTone';
import BuildTwoToneIcon from '@material-ui/icons/BuildTwoTone';

const StateTypeComponent = ({ value }) => {
  return {
    Выполнено: <DoneOutlineTwoToneIcon />,
    Ожидание: <AccessTimeTwoToneIcon />,
    'В работе': <BuildTwoToneIcon />,
  }[value];
};

const StateTypeProvider = props => (
  <DataTypeProvider {...props} formatterComponent={StateTypeComponent} editorComponent={StateTypeComponent} />
);

export default StateTypeProvider;
