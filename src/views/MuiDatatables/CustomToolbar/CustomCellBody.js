import React, { useState, useCallback } from 'react';

export default function CustomCellBody(value, tableMeta) {
  const [changeTask, setChangeTask] = useState();

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
    setChangeTask(newChangeTesk);
  };

  return (
    <input
      onChange={useCallback(e => onChange(e, tableMeta), [])}
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
};
