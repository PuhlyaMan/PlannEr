import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CustomCellBody({ tableMeta, changeTask, handleTask }) {
  const [value, setValue] = useState('');

  const onBlur = () => {
    if (value.trim() === '') return;
    const taskLabor = {
      tasks: {
        [tableMeta.rowData[1]]: {
          [tableMeta.columnData.name]: value,
        },
      },
    };
    handleTask({ ...changeTask, ...taskLabor });
  };

  const onChange = e => setValue(e.currentTarget.value);

  return (
    <input
      onChange={onChange}
      onBlur={onBlur}
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
