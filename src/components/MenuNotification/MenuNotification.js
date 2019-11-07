import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Poppers from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

export default function MenuNotification(props) {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = useState(null);
  const { notifications, icon } = props;
  const length = notifications ? notifications.length : null;

  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const poppers = length ? (
    <Poppers
      open={Boolean(openNotification)}
      anchorEl={openNotification}
      transition
      disablePortal
      className={classNames({ [classes.popperClose]: !openNotification }) + ' ' + classes.popperNav}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="notification-menu-list-grow"
          style={{
            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleCloseNotification}>
              <MenuList role="menu">
                {notifications.map((notification, index) => (
                  <MenuItem key={index} onClick={handleCloseNotification} className={classes.dropdownItem}>
                    {notification}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Poppers>
  ) : (
    ''
  );

  return (
    <div>
      <IconButton onClick={handleClickNotification} aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={length} color="secondary">
          {icon}
        </Badge>
      </IconButton>
      {poppers}
    </div>
  );
}

MenuNotification.propTypes = {
  notifications: PropTypes.array,
  icon: PropTypes.element,
};
