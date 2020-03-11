import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import FilterListIcon from '@material-ui/icons/FilterList';
import ListFilter from './ListFilter.js';

const FilterBase = ({ setFilterKey }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [checked, setChecked] = useState(['']);

  const handleToggle = value => () => {
    const newChecked = [...checked];
    const currentIndex = checked.indexOf(value);
    currentIndex === -1 ? newChecked.push(value) : newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
    setFilterKey(newChecked);
  };

  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Фильтровать" enterDelay={300} placement="bottom">
        <button className="MuiButtonBase-root MuiIconButton-root" onClick={handleClick}>
          <FilterListIcon color="action" />
        </button>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ListFilter checked={checked} handleToggle={handleToggle} />
      </Popover>
    </>
  );
};

FilterBase.propTypes = {
  setFilterKey: PropTypes.func,
};

export default FilterBase;
