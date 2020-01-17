import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import FilterListIcon from '@material-ui/icons/FilterList';
import ListFilter from './ListFilter.js';
import { withStyles } from '@material-ui/core/styles';

const style = {
  iconButton: {
    position: 'absolute',
    right: '310px',
    cursor: 'pointer',
    border: 'none',
    bottom: '3px',
    padding: '12px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
};

const GroupBase = ({ setFilterKey, classes }) => {
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
    <div>
      <Tooltip title="Фильтровать" enterDelay={300} placement="bottom">
        <button className={classes.iconButton} onClick={handleClick}>
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
    </div>
  );
};

GroupBase.propTypes = {
  classes: PropTypes.object,
  setFilterKey: PropTypes.func,
};

export default withStyles(style)(GroupBase);
