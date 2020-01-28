import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import InputCell from './InputCell/InputCell';

const CustomCellBody = ({ tableMeta, startDate, endDate /*handleTask*/ }) => {
  const [value, setValue] = useState('');

  const onBlur = () => {
    if (value === '') return;
    const taskLabor = {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      [tableMeta.rowData[1]]: {
        [tableMeta.columnData.name]: value,
      },
    };
    console.log(`Ушло на сервер: ${JSON.stringify(taskLabor)}`);
  };

  const onChange = useCallback(e => setValue(e.currentTarget.value), []);

  return <InputCell onChange={onChange} onBlur={onBlur} />;
};

CustomCellBody.propTypes = {
  tableMeta: PropTypes.object,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
};

export default memo(CustomCellBody);
