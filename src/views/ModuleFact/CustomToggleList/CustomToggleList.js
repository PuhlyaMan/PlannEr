import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomToggleList = ({ columns, onColumnToggle, toggles }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  //const handleBlur = () => setShow(false);
  return (
    <div className={`dropdown dropdown-show-columns ${show ? 'show' : ''}`} role="group">
      <button
        id="showColumns"
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={handleClick}
      >
        Показать/скрыть стобцы
      </button>
      <div className={`dropdown-menu dropdown-menu-columns ${show ? 'show' : ''}`} aria-labelledby="showColumns">
        {columns
          .filter(item => item.visibleToggle)
          .map(column => ({
            ...column,
            toggle: toggles[column.dataField],
          }))
          .map(column => (
            <button
              type="button"
              key={column.dataField}
              className={`dropdown-item dropdown-item-hidden btn btn-primary ${column.toggle ? 'active' : ''}`}
              data-toggle="button"
              aria-pressed={column.toggle ? 'true' : 'false'}
              onClick={() => onColumnToggle(column.dataField)}
            >
              {column.text}
            </button>
          ))}
      </div>
    </div>
  );
};

CustomToggleList.propTypes = {
  columns: PropTypes.array,
  onColumnToggle: PropTypes.func,
  toggles: PropTypes.object,
};

export default CustomToggleList;
