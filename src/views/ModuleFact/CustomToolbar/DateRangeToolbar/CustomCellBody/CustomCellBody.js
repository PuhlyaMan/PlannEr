/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import InputCell from './InputCell/InputCell';

const CustomCellBody = ({ tableMeta, startDate, endDate /*handleTask*/ }) => {
  const renders = useRef(0);
  console.log(renders.current++);
  const [value, setValue] = useState('');

  const onBlur = e => {
    if (e.currentTarget.value.trim() === '') return;
    const taskLabor = {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      [tableMeta.rowData[1]]: {
        [tableMeta.columnData.name]: e.currentTarget.value,
      },
    };
    console.log(`Ушло на сервер: ${JSON.stringify(taskLabor)}`);
    //handleTask(taskLabor);
  };

  //const onChange = useCallback(e => setValue(e.currentTarget.value), []);

  return <InputCell onBlur={onBlur} />;
};

//CustomCellBody.displayName = 'CustomCellBody';

CustomCellBody.propTypes = {
  tableMeta: PropTypes.object,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
};

export default CustomCellBody;
