import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CellComponent from './components/CellComponent/CellComponent.js';
import ToolbarComponent from './components/ToolbarComponent/ToolbarComponent.js';
import useCountRender from 'utils/useCountRender';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

const useStyle = makeStyles({
  table: {
    minWidth: '650px',
  },
  tableCell: {
    minWidth: '40px',
    padding: '6px',
  },
  paper: {
    maxHeight: props => props.maxHeight,
  },
});

const MaterialTable = () => {
  useCountRender('MaterialTable');
  const classes = useStyle({ maxHeight: document.body.clientHeight - 250 });
  const [data, setData] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    import('assets/data/data.js')
      .then(dataRow => {
        const correctData = dataRow.default
          .map(job => {
            const newJob = job.tasks
              .map(task => ({
                task_id: task.id,
                task_state: task.state,
                task_name: task.name,
                task_developer: task.developer,
                task_depart_id: task.department.id,
                task_depart_title: task.department.title,
                task_depart_breadcrumb: task.department.breadcrumb,
                task_plan_start_date: task.plan.start_date,
                task_plan_finish_date: task.plan.finish_date,
                task_plan_labor: task.plan.labor,
                task_actual_start_date: task.actual.start_date,
                task_actual_finish_date: task.actual.finish_date,
                task_actual_labor: task.actual.labor,
                task_coment: task.comment,
                taskt_timestamp: task['@timestamp'],
              }))
              .map(task => ({ ...job, ...task }));
            return newJob.map(item => {
              delete item.tasks;
              return item;
            });
          })
          .reduce((previousValue, item) => [...previousValue, ...item])
          .map(item => {
            const newItem = {
              ...item,
              contract_id: item.contract.id,
              contract_name: item.contract.name,
              project_id: item.project.id,
              project_name: item.project.name,
            };
            delete newItem.contract;
            delete newItem.project;
            return newItem;
          });
        //setData(jobsWithTasks.filter(item => item.task_state === 'В работе'));
        setData(correctData);
      })
      .catch(err => new Error(err));
  }, []);

  useEffect(() => {
    const days = eachDayOfInterval({ start: new Date(2020, 1, 1), end: new Date(2020, 1, 29) });
    setDays(days);
  }, []);

  return (
    <Paper className={classes.paper}>
      <ToolbarComponent />
      <TableContainer className={classes.paper} component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} style={{ minWidth: 800 }}>
                Задача
              </TableCell>
              <TableCell className={classes.tableCell} style={{ minWidth: 150 }} align="center">
                ИД
              </TableCell>
              <TableCell className={classes.tableCell} style={{ minWidth: 150 }} align="center">
                Статус
              </TableCell>
              <TableCell className={classes.tableCell} style={{ minWidth: 150 }} align="center">
                Дата окончания (план)
              </TableCell>
              {days.map(day => (
                <TableCell key={day.getDate()} className={classes.tableCell} align="center">
                  {day.getDate()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.task_id}>
                <TableCell>{row.task_name}</TableCell>
                <TableCell>{row.task_id}</TableCell>
                <TableCell>{row.task_state}</TableCell>
                <TableCell>{row.task_plan_finish_date ? row.task_plan_finish_date.slice(0, 10) : ''}</TableCell>
                {days.map(day => (
                  <CellComponent key={day.getDate()}></CellComponent>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

MaterialTable.propTypes = {
  classes: PropTypes.object,
};

export default MaterialTable;
