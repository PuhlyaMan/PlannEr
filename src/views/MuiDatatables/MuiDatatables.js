import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import * as settings from './settings/settings.js';
import CustomToolbar from './CustomToolbar/CustomToolbar.js';
import JobCard from './JobCard/JobCard.js';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const customStyles = {
  NameCell: {
    fontWeight: 900,
  },
};

function MuiDatatables(props) {
  const [columns, setColumns] = useState(settings.columns);
  const [data, setData] = useState([]);

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
    // eslint-disable-next-line react/display-name
    customToolbar: () => <CustomToolbar columns={columns} setColumns={setColumns} />,
    setRowProps: rowData => {
      return {
        //className добавлен, чтобы не забыть
        className: classnames({
          [props.classes.BusinessAnalystRow]: rowData[2] === 'hehe',
        }),
        style: { backgroundColor: settings.font(rowData[2]) },
      };
    },
    //resizableColumns: true,
    expandableRows: true,
    // eslint-disable-next-line react/display-name
    renderExpandableRow: rowData => <JobCard data={rowData} />,
    //selectableRowsOnClick: true,
    //disableToolbarSelect: true,
  };

  return (
    <MuiThemeProvider theme={settings.myTheme()}>
      <MUIDataTable title={'Модуль фактов'} data={data} columns={columns} options={options} />
    </MuiThemeProvider>
  );
}

MuiDatatables.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(customStyles)(MuiDatatables);
