import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
//import filterFactory from 'react-bootstrap-table2-filter';
//import cellEditFactory from 'react-bootstrap-table2-editor';
//import 'bootstrap/dist/css/bootstrap.min.css'; //"bootstrap": "3.3.7",
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import './settings/style.css';
import * as settings from './settings/settings.js';

export default function ModuleFact() {
  const [data, setData] = useState([]);
  const [columns] = useState(settings.columns);

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
      //.then(dataRow => setData(dataRow.default.filter(item => item.state === 'В работе')))
      .catch(err => new Error(err));
  }, []);

  return (
    <BootstrapTable
      keyField="task_id"
      data={data}
      columns={columns}
      noDataIndication="Нет данных"
      selectRow={{ mode: 'checkbox' }}
      tabIndexCell
      //selectRow={{ mode: 'checkbox' }}
      //filter={filterFactory()}
      //cellEdit={cellEditFactory({ mode: 'click' })}
    />
  );
}
