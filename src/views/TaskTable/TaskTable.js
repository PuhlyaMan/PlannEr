import React, { useState, useEffect } from 'react';
import 'react-tabulator/lib/styles.css'; // default theme
//import 'react-tabulator/css/semantic-ui/tabulator_semantic-ui.min.css'; // use Theme(s)
import { ReactTabulator } from 'react-tabulator';
import * as settings from './settings/settings.js';
import './settings/style.css';

export default function TaskTable() {
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

  return <ReactTabulator data={data} columns={columns} height="850px" />;
}
