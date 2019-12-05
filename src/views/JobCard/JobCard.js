/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import TaskCard from './TaskCard/TaskCard.js';
import styles from './styles/jobCardStyle.js';

import style from './styles/style.css';

const useStyles = makeStyles(styles);

export default function JobCard(props) {
  const [widthCard, setWidthCard] = useState('70%');
  const properties = { width: widthCard };
  const [columns, setColumn] = useState([
    { title: 'ID задачи', field: 'id', type: 'numeric', cellStyle: { fontSize: '10px' } },
    { title: 'Наименование', field: 'name', cellStyle: { fontSize: '10px' } },
    {
      title: 'Статус',
      field: 'state',
      lookup: {
        Ожидание: 'Ожидание',
        'В работе': 'В работе',
        Выполнена: 'Выполнена',
        'СРОКАМ ХАНА': 'СРОКАМ ХАНА',
      },
      cellStyle: { fontSize: '10px' },
    },
    { title: 'Дата начала', field: 'startDate', type: 'date', cellStyle: { fontSize: '10px' } },
    { title: 'Дата окончания', field: 'endDate', type: 'date', cellStyle: { fontSize: '10px' } },
  ]);

  const [selectedRow, setSelectedRow] = useState();
  const [showTaskCard, setShowTaskCard] = useState('hidden');

  const { data, visible, setHidden } = props;
  const classes = useStyles(properties);

  if (!data) return <div></div>;

  const showTask = () => {
    setShowTaskCard('hidden');
    setSelectedRow();
  };

  const pageSize = showTaskCard === 'hidden' ? 7 : 5;
  const title = <span style={{ fontSize: '16px' }}>Задачи</span>;

  return (
    <div id="card" className={classes.cardEl}>
      <TaskCard selectedRow={selectedRow} showTaskCard={showTaskCard} showTask={showTask} />
      <div
        style={{ visibility: visible }}
        className={`${classes.card} ${showTaskCard === 'hidden' ? classes.jobCardLongAfter : classes.jobCardSmall}`}
        id="jobCard"
      >
        <div className={classes.bigTitle}>
          <span>{data.job}</span>
        </div>
        <div>
          <span className={classes.title}>Идентификатор задачи: </span>
          <span>{data.id}</span>
        </div>
        <div>
          <span className={classes.title}>Объект: </span>
          <span>{data.subject}</span>
        </div>
        <div>
          <span className={classes.title}>Статус: </span>
          <span>{data.state}</span>
        </div>
        <div style={{ display: 'inline-flex' }}>
          <div style={{ margin: '0 15px 0 0' }}>
            <span className={classes.title}>Дата начала: </span>
            <span>{data.startDate}</span>
          </div>
          <div>
            <span className={classes.title}>Дата окончания: </span>
            <span>{data.endDate}</span>
          </div>
        </div>
        <div>
          <span className={classes.title}>Исполнитель: </span>
          <span>{data.executor}</span>
        </div>
        <div className={classes.table}>
          <MaterialTable
            title={title}
            //title="Задачи"
            columns={columns}
            data={data.tasks}
            onRowClick={(evt, selectedRow) => {
              setShowTaskCard('visible');
              setSelectedRow(selectedRow);
            }}
            options={{
              //showTitle: false,
              pageSizeOptions: [],
              pageSize: pageSize,
              headerStyle: {
                backgroundColor: '#3f51b5',
                color: '#FFF',
                fontSize: '12px',
              },
              searchFieldStyle: {
                fontSize: '12px',
              },
              rowStyle: rowData => ({
                backgroundColor:
                  rowData.state === 'СРОКАМ ХАНА'
                    ? 'red'
                    : rowData.state === 'Ожидание'
                    ? 'yellow'
                    : rowData.state === 'В работе'
                    ? 'green'
                    : rowData.state === 'Выполнена'
                    ? 'grey'
                    : 'white',
              }),
            }}
          />
        </div>
        <button
          onClick={() => setHidden()}
          className={`${classes.button} ${classes.buttonClose}`}
          disabled={showTaskCard === 'visible'}
        >
          <CloseIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.string,
  setHidden: PropTypes.func,
};
