import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  content: {
    fontSize: '13px',
    fontWeight: 'bold',
  },
};

const ContentComponent = ({ classes, className, ...restProps }) => (
  <TableHeaderRow.Content className={classNames(classes.content, className)} {...restProps} />
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
