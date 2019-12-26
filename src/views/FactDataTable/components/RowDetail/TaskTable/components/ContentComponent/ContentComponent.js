import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  content: {
    display: 'contents',
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: 'bold',
  },
};

const ContentComponent = ({ children, classes, className, ...restProps }) => (
  <div className={classNames(classes.content, className)} {...restProps}>
    {children}
  </div>
);

ContentComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ContentComponent.defaultProps = {
  className: null,
  children: undefined,
};

export default withStyles(styles)(ContentComponent);
