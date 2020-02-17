import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import ListGroup from './ListGroup.js';
import { withStyles } from '@material-ui/core/styles';
import useCountRender from 'utils/useCountRender.js';

const style = {
  iconButton: {
    position: 'absolute',
    right: '260px',
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

const GroupBase = ({ setGroupingKeys, classes }) => {
  useCountRender('GroupBase');
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
    <div>
      <Tooltip title="Сгруппировать" enterDelay={300} placement="bottom">
        <button className={classes.iconButton} onClick={handleClick}>
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
    </div>
  );
};

GroupBase.propTypes = {
  classes: PropTypes.object,
  setGroupingKeys: PropTypes.func,
};

export default withStyles(style)(GroupBase);
