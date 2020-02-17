import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import useCountRender from 'utils/useCountRender';

const style = {
  buttonCell: {
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
  },
};

const CalcTableCell = ({ classes }) => {
  useCountRender('CalcTableCell');
  const onChangeClick = () => alert('Что-то заполняем!');
  return (
    <td className={classes.buttonCell}>
      <Button variant="contained" fullWidth={true} color="primary" size="small" onClick={onChangeClick}>
        Рассчитать
      </Button>
    </td>
  );
};

CalcTableCell.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(CalcTableCell);
