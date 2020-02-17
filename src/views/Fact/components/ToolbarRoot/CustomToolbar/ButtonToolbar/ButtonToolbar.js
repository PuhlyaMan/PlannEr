import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import useCountRender from 'utils/useCountRender';

export default function ButtonToolbar({ color = 'primary', disabled = false, onClick, children }) {
  useCountRender('ButtonToolbar');
  return (
    <Button
      size="small"
      variant="contained"
      color={color}
      onClick={onClick}
      style={{ marginLeft: '10px' }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

ButtonToolbar.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string,
};
