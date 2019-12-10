import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CustomCellBody({ tableMeta, changeTask, handleTask }) {
  const [value, setValue] = useState('');
  const onChange = (e, tableMeta) => {
    const taskLabor = {
      tasks: {
        [tableMeta.rowData[1]]: {
          [tableMeta.columnData.name]: e.currentTarget.value,
        },
      },
    };
    const newChangeTesk = { ...changeTask, ...taskLabor };
    setValue(e.currentTarget.value);
    handleTask(newChangeTesk);
  };

  return (
    <input
      onChange={e => onChange(e, tableMeta)}
      value={value}
      style={{
        textAlign: 'center',
        minWidth: '30px',
        maxWidth: '30px',
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
  tableMeta: PropTypes.object,
  changeTask: PropTypes.object,
  handleTask: PropTypes.func,
};
