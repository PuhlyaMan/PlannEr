import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import ListGroup from './ListGroup.js';

const GroupBase = ({ setGroupingKeys }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [checked, setChecked] = useState(['project_name']);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    currentIndex === -1 ? newChecked.push(value) : newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
    setGroupingKeys(newChecked);
  };

  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Сгруппировать" enterDelay={300} placement="bottom">
        <button className="MuiButtonBase-root MuiIconButton-root" onClick={handleClick}>
          <AddToPhotosIcon color="action" />
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
        <ListGroup checked={checked} handleToggle={handleToggle} />
      </Popover>
    </>
  );
};

GroupBase.propTypes = {
  setGroupingKeys: PropTypes.func,
};

export default GroupBase;
