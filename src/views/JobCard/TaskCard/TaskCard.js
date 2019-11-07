import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import FactTable from './FactTable/FactTable.js';
import styles from '../styles/jobCardStyle.js';

const useStyles = makeStyles(styles);

export default function TaskCard(props) {
  const { showTaskCard, selectedRow, showTask } = props;
  const classes = useStyles();
  if (!selectedRow) return <div></div>;
  return (
    <div id="taskCard" style={{ visibility: showTaskCard }} className={`${classes.card} ${classes.taskCard}`}>
      <div className={classes.bigTitle}>
        <span>{selectedRow.name}</span>
      </div>
      <div>
        <span className={classes.title}>Идентификатор задачи: </span>
        <span>{selectedRow.id}</span>
      </div>
      <div>
        <span className={classes.title}>Статус: </span>
        <span>{selectedRow.state}</span>
      </div>
      <div style={{ display: 'inline-flex' }}>
        <div style={{ margin: '0 15px 0 0' }}>
          <span className={classes.title}>Дата начала: </span>
          <span>{selectedRow.startDate}</span>
        </div>
        <div>
          <span className={classes.title}>Дата окончания: </span>
          <span>{selectedRow.endDate}</span>
        </div>
      </div>
      <FactTable />
      <button onClick={() => showTask()} className={`${classes.button} ${classes.buttonClose}`}>
        <CloseIcon fontSize="large" />
      </button>
      <button onClick={() => alert('СОХРАНЕНО')} className={`${classes.button} ${classes.buttonSave}`}>
        <DoneIcon fontSize="large" />
      </button>
    </div>
  );
}

TaskCard.propTypes = {
  showTaskCard: PropTypes.string,
  selectedRow: PropTypes.object,
  showTask: PropTypes.func,
};
