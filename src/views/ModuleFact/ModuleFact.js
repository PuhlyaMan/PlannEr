import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
import CustomToggleList from './CustomToggleList/CustomToggleList.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import * as settings from './settings/settings.js';
import './style/bootstrap.css';
import './style/style.css';

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

  //const CaptionElement = () => <h3 className="table-title">Модуль фактов</h3>;

  const rowStyle = row => settings.font(row.task_state);

  return (
    <ToolkitProvider bootstrap4 keyField="task_id" data={data} columns={columns} columnToggle>
      {props => (
        <Paper className="papper">
          <div className="toolbar">
            <h3 className="table-title">Модуль фактов</h3>
            <CustomToggleList {...props.columnToggleProps} className="list-custom-class" />
          </div>
          <BootstrapTable
            {...props.baseProps}
            rowStyle={rowStyle}
            //caption={<CaptionElement />}
            noDataIndication="Нет данных"
            //selectRow={{ mode: 'checkbox' }}
            filter={filterFactory()}
            pagination={paginationFactory()}
            condensed
            tabIndexCell
          />
        </Paper>
      )}
    </ToolkitProvider>
  );
}

ModuleFact.propTypes = {
  columnToggleProps: PropTypes.object,
  baseProps: PropTypes.object,
};
