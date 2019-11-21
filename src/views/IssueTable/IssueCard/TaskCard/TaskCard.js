import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import styles from 'assets/jss/material-dashboard-react/views/issueCardStyle.js';

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
      `ИД задачи: ${selectedRow.id} Дата начала: ${startDate.value} Дата окончания: ${endDate.value} Трудозатраты: ${labor.value} `
    );
    e.preventDefault();
  };

  return (
    <GridContainer style={{ visibility: showTaskCard }} className={`${classes.card} ${classes.taskCard}`}>
      <GridItem xs={12} sm={12} md={12} className={classes.bigTitle}>
        <span>{selectedRow.name}</span>
      </GridItem>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={4} xl={3}>
          <span className={classes.title}>Статус: </span>
          <span className={classes.value}>{selectedRow.state}</span>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={8} xl={9}>
          <span className={classes.title}>Ответственный: </span>
          <span className={classes.value}>{selectedRow.developer}</span>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} className={classes.title}>
          Отдел:
        </GridItem>
        <GridContainer style={{ padding: '0 0 0 50px' }}>
          <GridItem xs={12} sm={12} md={12} lg={4} xl={4}>
            <span className={classes.title}>Идентификатор: </span>
            <span className={classes.value}>{selectedRow.department.id}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={8} xl={4}>
            <span className={classes.title}>Наименование: </span>
            <span className={classes.value}>{selectedRow.department.title}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
            <span className={classes.title}>Цепочка: </span>
            <span className={classes.value}>{selectedRow.department.breadcrumb}</span>
          </GridItem>
        </GridContainer>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} className={classes.title}>
          План:
        </GridItem>
        <GridContainer style={{ padding: '0 0 0 50px' }}>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
            <span className={classes.title}>Дата начала: </span>
            <span className={classes.value}>{selectedRow.plan.start_date}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={8} xl={4}>
            <span className={classes.title}>Дата окончания: </span>
            <span className={classes.value}>{selectedRow.plan.finish_date}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={4} xl={4}>
            <span className={classes.title}>Трудозатраты: </span>
            <span className={classes.value}>{selectedRow.plan.labor}</span>
          </GridItem>
        </GridContainer>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} className={classes.title}>
          Факт:
        </GridItem>
        <GridContainer style={{ padding: '0 0 0 50px' }}>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
            <span className={classes.title}>Дата начала: </span>
            <span className={classes.value}>{selectedRow.actual.start_date}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={8} xl={4}>
            <span className={classes.title}>Дата окончания: </span>
            <span className={classes.value}>{selectedRow.actual.finish_date}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={4} xl={4}>
            <span className={classes.title}>Трудозатраты: </span>
            <span className={classes.value}>{selectedRow.actual.labor}</span>
          </GridItem>
        </GridContainer>
      </GridContainer>
      <GridContainer>
        <form style={{ margin: '30px 0 0 0' }} method="post" name="fact" onSubmit={e => handleSubmit(e)}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
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
            </GridItem>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={4}>
                  <KeyboardDateTimePicker
                    variant="inline"
                    format="yyyy-MM-dd hh:mm:ss"
                    margin="normal"
                    id="startDate"
                    label="Дата начала"
                    value={startDate.value}
                    onChange={data => startDate.change(data)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={4}>
                  <KeyboardDateTimePicker
                    variant="inline"
                    format="yyyy-MM-dd hh:mm:ss"
                    margin="normal"
                    id="endDate"
                    label="Дата окончания"
                    value={endDate.value}
                    onChange={data => endDate.change(data)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </GridItem>
              </GridContainer>
            </MuiPickersUtilsProvider>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="labor"
                label="Трудозатраты"
                className={classes.textField}
                value={labor.value}
                onChange={e => labor.change(e.target.value)}
                margin="normal"
              />
            </GridItem>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.buttonSend}
              endIcon={<Icon>send</Icon>}
            >
              Отправить
            </Button>
          </GridContainer>
        </form>
      </GridContainer>
      <button onClick={() => showCardTask('hidden', null)} className={`${classes.button} ${classes.buttonClose}`}>
        <CloseIcon fontSize="large" />
      </button>
    </GridContainer>
  );
  /*return (
    <div id="taskCard" style={{ visibility: showTaskCard }} className={`${classes.card} ${classes.taskCard}`}>
      <div className={classes.bigTitle}>
        <span>{selectedRow.name}</span>
      </div>
      <div style={{ display: 'inline-flex', margin: '0 15px 0 15px' }}>
        <div style={{ margin: '0 15px 0 0' }}>
          <span className={classes.title}>Статус: </span>
          <span className={classes.value}>{selectedRow.state}</span>
        </div>
        <div>
          <span className={classes.title}>Ответственный: </span>
          <span className={classes.value}>{selectedRow.developer}</span>
        </div>
      </div>
      <div>
        <span style={{ display: 'block', margin: '0 15px 0 15px' }} className={classes.title}>
          Отдел:
        </span>
        <div style={{ display: 'inline-flex', padding: '0 0 0 50px', margin: '0 15px 0 15px' }}>
          <div style={{ margin: '0 15px 0 0' }}>
            <span className={classes.title}>Идентификатор: </span>
            <span className={classes.value}>{selectedRow.department.id}</span>
          </div>
          <div style={{ margin: '0 15px 0 0' }}>
            <span className={classes.title}>Наименование: </span>
            <span className={classes.value}>{selectedRow.department.title}</span>
          </div>
          <div>
            <span className={classes.title}>Цепочка: </span>
            <span className={classes.value}>{selectedRow.department.breadcrumb}</span>
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
            <span className={classes.value}>{selectedRow.plan.start_date}</span>
          </div>
          <div style={{ margin: '0 15px 0 0' }}>
            <span className={classes.title}>Дата окончания: </span>
            <span className={classes.value}>{selectedRow.plan.finish_date}</span>
          </div>
          <div>
            <span className={classes.title}>Трудозатраты: </span>
            <span className={classes.value}>{selectedRow.plan.labor}</span>
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
            <span className={classes.value}>{selectedRow.actual.start_date}</span>
          </div>
          <div style={{ margin: '0 15px 0 0' }}>
            <span className={classes.title}>Дата окончания: </span>
            <span className={classes.value}>{selectedRow.actual.finish_date}</span>
          </div>
          <div>
            <span className={classes.title}>Трудозатраты: </span>
            <span className={classes.value}>{selectedRow.actual.labor}</span>
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
                <KeyboardDateTimePicker
                  variant="inline"
                  format="yyyy-MM-dd hh:mm:ss"
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
                <KeyboardDateTimePicker
                  variant="inline"
                  format="yyyy-MM-dd hh:mm:ss"
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
  );*/
}

TaskCard.propTypes = {
  showTaskCard: PropTypes.string,
  selectedRow: PropTypes.object,
  showCardTask: PropTypes.func,
};
