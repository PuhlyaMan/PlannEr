import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import * as settings from './settings/settings.js';
import CustomToolbar from './CustomToolbar/CustomToolbar.js';
import JobCard from './JobCard/JobCard.js';
import { MuiThemeProvider } from '@material-ui/core/styles';

export default function MuiDatatables() {
  const [columns, setColumns] = useState(settings.columns);
  const [data, setData] = useState([]);
  const [changeTask, setChangeTask] = useState({ tasks: {} });

  useEffect(() => {
    import('assets/data/data.js')
      .then(dataRow => {
        const jobsWithTasks = dataRow.default
          .map(job =>
            job.tasks
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
              .map(task => ({ ...job, ...task }))
          )
          .reduce((previousValue, item) => [...previousValue, ...item]);
        setData(jobsWithTasks);
      })
      .catch(err => new Error(err));
  }, []);

  const handleTask = newTask => {
    if (Object.keys(newTask).length === 0) {
      setChangeTask(newTask);
    } else {
      let obj = changeTask;

      Object.keys(newTask.tasks).forEach(key => {
        if (obj.tasks[key] !== undefined) {
          Object.keys(newTask.tasks[key]).forEach(k => {
            obj.tasks[key][k] = newTask.tasks[key][k];
          });
        } else {
          obj.tasks[key] = newTask.tasks[key];
        }
      });
      setChangeTask(obj);
    }
  };

  const setDatePickers = date => {
    let obj = changeTask;
    obj.startDate = date.startDate.format('YYYY-MM-DD');
    obj.endDate = date.endDate.format('YYYY-MM-DD');
    setChangeTask(obj);
  };

  const customToolbar = () => (
    <CustomToolbar
      columns={columns}
      setColumns={setColumns}
      changeTask={changeTask}
      handleTask={handleTask}
      setDatePickers={setDatePickers}
    />
  );

  const renderExpandableRow = rowData => <JobCard data={rowData} />;

  const options = {
    filterType: 'textField',
    selectableRows: 'none',
    rowsPerPageOptions: [15, 20, 100],
    rowsPerPage: 15,
    responsive: 'scrollMaxHeight',
    fixedHeaderOptions: {
      xAxis: true,
      yAxis: true,
    },
    textLabels: settings.local,
    customToolbar: customToolbar,
    setRowProps: rowData => {
      return {
        style: { backgroundColor: settings.font(rowData[2]) },
      };
    },
    expandableRows: true,
    renderExpandableRow: renderExpandableRow,
  };

  return (
    <MuiThemeProvider theme={settings.myTheme()}>
      <MUIDataTable title={'Модуль фактов'} data={data} columns={columns} options={options} />
    </MuiThemeProvider>
  );
}
