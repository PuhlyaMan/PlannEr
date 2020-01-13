import React from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import AccessTimeTwoToneIcon from '@material-ui/icons/AccessTimeTwoTone';
import DoneOutlineTwoToneIcon from '@material-ui/icons/DoneOutlineTwoTone';
import BuildTwoToneIcon from '@material-ui/icons/BuildTwoTone';

const StateTypeComponent = ({ value }) => {
  let formatterComponent;
  switch (value) {
    case 'Выполнено':
      formatterComponent = <DoneOutlineTwoToneIcon />;
      break;
    case 'Ожидание':
      formatterComponent = <AccessTimeTwoToneIcon />;
      break;
    case 'В работе':
      formatterComponent = <BuildTwoToneIcon />;
      break;
  }
  return formatterComponent;
};

const StateTypeProvider = props => (
  <DataTypeProvider {...props} formatterComponent={StateTypeComponent} editorComponent={StateTypeComponent} />
);

export default StateTypeProvider;
