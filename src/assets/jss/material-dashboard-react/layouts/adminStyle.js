import { drawerWidth, transition, container } from 'assets/jss/material-dashboard-react.js';

const drawerCloseWidth = '65';

const appStyle = theme => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  mainPanelOpen: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    //overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  mainPanelClose: {
    width: `calc(100% - ${drawerCloseWidth}px)`,
    //overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    //marginTop: '70px',
    padding: '15px 0px',
    minHeight: 'calc(100vh - 123px)',
  },
  container,
  map: {
    marginTop: '70px',
  },
});

export default appStyle;
