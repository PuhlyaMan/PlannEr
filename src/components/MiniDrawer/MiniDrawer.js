import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import MenuNotification from 'components/MenuNotification/MenuNotification.js';
import CardBody from 'components/Card/CardBody.js';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from 'react-avatar';

import miniDrawerStyle from 'assets/jss/material-dashboard-react/components/miniDrawerStyle';
import userProfileStyle from 'assets/jss/material-dashboard-react/components/userProfileStyle';

const useStyleUser = makeStyles(userProfileStyle);
const useStyles = makeStyles(miniDrawerStyle);

const notifications = [
  'Задача 1 истекает срок',
  'Задача 2 истекает срок',
  'Новая задача',
  'Задача 6 истекает срок',
  'Новая задача',
];

const email = ['Письмо 1', 'Письмо 2', 'Письмо 3'];

export default function MiniDrawer(props) {
  const { openPanel, routes, logoText, logo } = props;
  const user = useStyleUser();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    openPanel(true);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    openPanel(false);
    setOpen(false);
  };

  const makeBrand = () => {
    let name;
    props.routes.map(prop => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = prop.name;
      }
      return null;
    });
    return name;
  };

  const brand = (
    <div className={user.logo}>
      <div className={user.logoImage}>
        <img src={logo} alt="logo" className={user.image} />
      </div>
      <span className={user.logoText}>{logoText}</span>
    </div>
  );

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const links = (
    <List className={classes.list}>
      {routes
        .filter(data => data.path !== '/user')
        .map((data, key) => {
          const listItemClasses = classNames({ [' ' + classes.purple]: activeRoute(data.layout + data.path) });
          const whiteFontClasses = classNames({ [' ' + classes.whiteFont]: activeRoute(data.layout + data.path) });

          return (
            <NavLink to={data.layout + data.path} className={classes.item} activeClassName="active" key={key}>
              <ListItem
                button
                className={classNames({
                  [classes.itemLink]: true,
                  [classes.lisItemClose]: !open,
                  [listItemClasses]: true,
                })}
              >
                {typeof data.icon === 'string' ? (
                  <Icon className={classNames(classes.itemIcon, whiteFontClasses)}>{data.icon}</Icon>
                ) : (
                  <data.icon className={classNames(classes.itemIcon, whiteFontClasses)} />
                )}

                {open ? (
                  <ListItemText primary={data.name} className={classNames(classes.itemText, whiteFontClasses)} />
                ) : (
                  ''
                )}
              </ListItem>
            </NavLink>
          );
        })}
    </List>
  );

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classNames(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} noWrap>
            {makeBrand()}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Поиск..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuNotification notifications={notifications} icon={<NotificationsIcon />} />
            <MenuNotification notifications={email} icon={<MailIcon />} />
            <MenuNotification icon={<AccountCircle />} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          {brand}
          <IconButton className={classes.leftIcon} onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <Card className={user.cardUser}>
          <CardHeader icon>
            <NavLink to={routes[0].layout + routes[0].path} className={routes[0].item} activeClassName="active">
              <Avatar
                className={classNames({
                  [user.cardUserAvatarOpen]: open,
                  [user.cardUserAvatarClose]: !open,
                })}
                name="Сергей Костин"
                size="60px"
                routes
                round={true}
              />
            </NavLink>
          </CardHeader>
          {open ? (
            <CardBody>
              <p>Костин Сергей Станиславович</p>
              <p>dr.zad1994@gmail.com</p>
            </CardBody>
          ) : (
            ''
          )}
        </Card>
        <Divider />
        {links}
        <Divider />
      </Drawer>
    </div>
  );
}

MiniDrawer.propTypes = {
  openPanel: PropTypes.func,
  routes: PropTypes.array,
  logoText: PropTypes.string,
  logo: PropTypes.string,
};
