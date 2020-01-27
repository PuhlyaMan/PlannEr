import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  stateCell: {
    backgroundColor: props => props.backgroundColor,
  },
  spanValue: {
    minWidth: '80px',
    display: 'inline-block',
  },
  checkbox: {
    padding: '0px',
    marginLeft: '0px',
  },
});

const font = state => {
  switch (state) {
    case 'В работе':
      return 'rgba(200, 235, 195, 0.8)';
    case 'Ожидание':
      return 'rgba(250, 250, 185, 0.8)';
    case 'Выполнено':
      return 'rgba(237, 237, 237, 1)';
    case 'Запланировано':
      return 'rgba(146, 189, 232, 0.5)';
    case 'Новая':
      return 'rgba(255, 255, 255)';
    default:
      return '';
  }
};

const StateTableCell = ({ className, onClick, ...restProps }) => {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = () => setOpen(true);
  const handleSave = () => {
    setChecked(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { row, value } = restProps;
  const props = { backgroundColor: font(row.task_state) };
  const classes = useStyles(props);
  return (
    <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} className={classNames(className, classes.stateCell)}>
      <span className={classes.spanValue}>{value}</span>
      <Checkbox
        className={classes.checkbox}
        edge="start"
        disabled={value === 'Ожидание' || value === 'Выполнено' || checked}
        checked={value === 'Выполнено' || checked}
        onChange={handleChange}
        tabIndex={-1}
        disableRipple
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Подтвердить выполнение задачи?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              "После подтверждения будет переведена на статус 'Выполнено' и дальнейшее её редактирование станет невозможным."
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Применить
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Отменить
          </Button>
        </DialogActions>
      </Dialog>
    </Table.Cell>
  );
};

StateTableCell.propTypes = {
  className: PropTypes.string,
  colorCalendar: PropTypes.object,
  onClick: PropTypes.func,
};

export default StateTableCell;
