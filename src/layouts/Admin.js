import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
//import Footer from 'components/Footer/Footer.js';
import Toolbar from '@material-ui/core/Toolbar';
import MiniDrawer from 'components/MiniDrawer/MiniDrawer';
import Container from '@material-ui/core/Container';
import BackToTop from 'components/BackToTop/BackToTop.js';

import routes from 'routes.js';

import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';

import logo from 'assets/img/reactlogo.png';

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin(props, { ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();

  const [open, setOpen] = React.useState(false);

  const openPanel = value => {
    setOpen(value);
  };

  return (
    <div className={classes.wrapper}>
      <MiniDrawer openPanel={openPanel} routes={routes} logoText="PlannEr" logo={logo} {...rest} />
      <Toolbar id="back-to-top-anchor" />
      <Container maxWidth={false}>
        <div
          className={classNames({
            [classes.mainPanelOpen]: open,
            [classes.mainPanelClose]: !open,
          })}
          ref={mainPanel}
        >
          <div className={classes.content}>
            <div>{switchRoutes}</div>
          </div>
          {/*<Footer />*/}
        </div>
      </Container>
      <BackToTop {...props} />
    </div>
  );
}
