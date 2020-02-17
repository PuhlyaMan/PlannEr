import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import useCountRender from 'utils/useCountRender';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: 'bold',
  },
};

const ContentComponent = ({ classes, className, ...restProps }) => {
  useCountRender('ContentComponent');
  return <TableHeaderRow.Content className={classNames(classes.content, className)} {...restProps} />;
};

ContentComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ContentComponent);
