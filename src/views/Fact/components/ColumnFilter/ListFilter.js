/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { filterColumn } from '../../settings/settings.js';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  itemIcon: {
    minWidth: '0px',
  },
  checkbox: {
    padding: '0px',
    marginLeft: '0px',
  },
  itemText: {
    paddingLeft: '4px',
  },
});

const ListGroup = ({ checked, handleToggle, classes }) => {
  return (
    <Paper>
      <List dense className={classes.root}>
        {Object.keys(filterColumn).map(key => {
          return (
            <ListItem key={key} role={undefined} button onClick={handleToggle(key)}>
              <ListItemIcon className={classes.itemIcon}>
                <Checkbox
                  className={classes.checkbox}
                  edge="start"
                  checked={checked.indexOf(key) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText className={classes.itemText} primary={filterColumn[key]} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

ListGroup.propTypes = {
  classes: PropTypes.object,
  handleToggle: PropTypes.func,
  checked: PropTypes.array,
};

export default withStyles(style)(ListGroup);
