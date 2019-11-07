import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../styles/issueCardStyle.js';

const useStyles = makeStyles(styles);

export default function TaskCard(props) {
  const { showTaskCard, selectedRow, showCardTask } = props;

  const classes = useStyles();

  const useUserState = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const handleChange = value => setValue(value);
    return {
      value: value,
      change: handleChange,
    };
  };

  const date = new Date();
  const startDate = useUserState(date);
  const endDate = useUserState(date);
  const labor = useUserState();

  if (!selectedRow) return <div></div>;

  const handleSubmit = e => {
    alert(
      `ИД задачи:${selectedRow.id} Дата начала:${startDate.value} Дата окончания:${endDate.value} Трудозатраты:${labor.value} `
    );
    e.preventDefault();
  };

  return (
    <div id="taskCard" style={{ visibility: showTaskCard }} className={`${classes.card} ${classes.taskCard}`}>
      <div className={classes.bigTitle}>
        <span>{selectedRow.name}</span>
      </div>
      <div style={{ display: 'inline-flex', margin: '0 15px 0 15px' }}>
        <div style={{ margin: '0 15px 0 0' }}>
          <span className={classes.title}>Статус: </span>
          <span>{selectedRow.state}</span>
        </div>
        <div>
          <span className={classes.title}>Ответственный: </span>
          <span>{selectedRow.developer}</span>
        </div>
      </div>
      <div>
        <span style={{ display: 'block', margin: '0 15px 0 15px' }} className={classes.title}>
          Отдел:
        </span>
        <div style={{ display: 'inline-flex', padding: '0 0 0 50px', margin: '0 15px 0 15px' }}>
          <div style={{ margin: '0 15px 0 0' }}>
            <span className={classes.title}>Идентификатор: </span>
            <span>{selectedRow.department.id}</span>
          </div>
          <div style={{ margin: '0 15px 0 0' }}>
            <span className={classes.title}>Наименование: </span>
            <span>{selectedRow.department.title}</span>
          </div>
          <div>
            <span className={classes.title}>Цепочка: </span>
            <span>{selectedRow.department.breadcrumb}</span>
          </div>
        </div>
      </div>
      <div>
        <span style={{ display: 'block', margin: '0 15px 0 15px' }} className={classes.title}>
          План:
        </span>
        <div style={{ display: 'inline-flex', padding: '0 0 0 50px', margin: '0 15px 0 15px' }}>
          <div style={{ margin: '0 15px 0 0' }}>
            <span className={classes.title}>Дата начала: </span>
            <span>{selectedRow.plan.start_date}</span>
          </div>
          <div style={{ margin: '0 15px 0 0' }}>
            <span className={classes.title}>Дата окончания: </span>
            <span>{selectedRow.plan.finish_date}</span>
          </div>
          <div>
            <span className={classes.title}>Трудозатраты: </span>
            <span>{selectedRow.plan.labor}</span>
          </div>
        </div>
      </div>
      <div>
        <span style={{ display: 'block', margin: '0 15px 0 15px' }} className={classes.title}>
          Факт:
        </span>
        <div style={{ display: 'inline-flex', padding: '0 0 0 50px', margin: '0 15px 0 15px' }}>
          <div style={{ margin: '0 15px 0 0' }}>
            <span className={classes.title}>Дата начала: </span>
            <span>{selectedRow.actual.start_date}</span>
          </div>
          <div style={{ margin: '0 15px 0 0' }}>
            <span className={classes.title}>Дата окончания: </span>
            <span>{selectedRow.actual.finish_date}</span>
          </div>
          <div>
            <span className={classes.title}>Трудозатраты: </span>
            <span>{selectedRow.actual.labor}</span>
          </div>
        </div>
      </div>
      <form style={{ margin: '30px 0 0 0' }} method="post" name="fact" onSubmit={e => handleSubmit(e)}>
        <div>
          <TextField
            id="id"
            label="Идентификатор задачи"
            className={classes.textField}
            value={selectedRow.id}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <div style={{ display: 'inline-flex' }}>
              <div style={{ margin: '0 15px' }}>
                <KeyboardDatePicker
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="startDate"
                  label="Дата начала"
                  value={startDate.value}
                  onChange={data => startDate.change(data)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </div>
              <div style={{ margin: '0 15px' }}>
                <KeyboardDatePicker
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="endDate"
                  label="Дата окончания"
                  value={endDate.value}
                  onChange={data => endDate.change(data)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </div>
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <TextField
            id="labor"
            label="Трудозатраты"
            className={classes.textField}
            value={labor.value}
            onChange={e => labor.change(e.target.value)}
            margin="normal"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.buttonSend}
          endIcon={<Icon>send</Icon>}
        >
          Отправить
        </Button>
      </form>
      <button onClick={() => showCardTask('hidden', null)} className={`${classes.button} ${classes.buttonClose}`}>
        <CloseIcon fontSize="large" />
      </button>
    </div>
  );
}

TaskCard.propTypes = {
  showTaskCard: PropTypes.string,
  selectedRow: PropTypes.object,
  showCardTask: PropTypes.func,
};
