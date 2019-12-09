import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CustomCellBody({ tableMeta, changeTask, setChangeTask }) {
  const [value, setValue] = useState();
  const onChange = (e, tableMeta) => {
    const taskLabor = {
      tasks: {
        [tableMeta.rowData[1]]: {
          [tableMeta.columnData.name]: e.currentTarget.value,
        },
      },
    };
    console.log(taskLabor);
    const newChangeTesk = { ...changeTask, ...taskLabor };
    setValue(e.currentTarget.value);
    setChangeTask(newChangeTesk);
  };

  return (
    <input
      onChange={e => onChange(e, tableMeta)}
      value={value}
      style={{
        textAlign: 'center',
        minWidth: '40px',
        maxWidth: '40px',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        borderBottom: '1px solid rgb(34, 36, 27, 1)',
        backgroundColor: 'inherit',
        minHeight: '24px',
      }}
    />
  );
}

CustomCellBody.propTypes = {
  value: PropTypes.string,
  tableMeta: PropTypes.object,
  changeTask: PropTypes.object,
  setChangeTask: PropTypes.func,
};
