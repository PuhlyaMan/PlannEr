import React from 'react';
import PropTypes from 'prop-types';
import { PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const style = {
  container: {
    padding: '0px',
  },
};

const PagingPanelContainer = ({ classes, className, ...restProps }) => {
  return <PagingPanel.Container {...restProps} className={classNames(className, classes.container)} />;
};

PagingPanelContainer.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default withStyles(style)(PagingPanelContainer);
