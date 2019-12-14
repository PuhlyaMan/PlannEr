import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import 'react-dates/initialize';
import moment from 'moment';
import Holidays from 'date-holidays';
import { getDaysInMonth, eachDayOfInterval } from 'date-fns';
import * as settings from './settings/settings.js';
import CustomToolbar from './CustomToolbar/CustomToolbar.js';
import CustomCellBody from './CustomToolbar/CustomCellBody/CustomCellBody.js';
import JobCard from './JobCard/JobCard.js';
import { MuiThemeProvider } from '@material-ui/core/styles';

export default function MuiDatatables() {
  const [columns, setColumns] = useState(settings.columns);
  const [data, setData] = useState([]);
  //const [changeTask, setChangeTask] = useState({});
  const [startDate, setStartDate] = useState(moment().startOf('isoweek'));
  const [endDate, setEndDate] = useState(moment().endOf('isoweek'));

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
        //setData(jobsWithTasks.filter(item => item.task_state === 'В работе'));
        setData(jobsWithTasks);
      })
      .catch(err => new Error(err));
  }, []);

  useEffect(() => {
    /*const handleTask = newTask => {
      Object.keys(newTask).forEach(key => {
        const obj = changeTask[key]
          ? { [key]: { ...changeTask[key], ...newTask[key] } }
          : { ...changeTask, ...newTask };
        setChangeTask(obj);
      });
    };*/

    const customBodyRender = (value, tableMeta) => (
      <CustomCellBody tableMeta={tableMeta} startDate={startDate} endDate={endDate} />
    );

    const hd = new Holidays('RU');
    const fromDate = startDate._d;
    const toDate = endDate._d;
    const maxResultRangeLength = getDaysInMonth(fromDate);
    const curentResultRangeLength = Math.trunc((toDate - fromDate) / 86400000);
    if (maxResultRangeLength <= curentResultRangeLength) {
      alert('Интервал даты не может превышать месяца');
      return;
    }

    const isHoliday = date => {
      const day = date.getDay();
      const color = day === 6 || day === 0 || hd.isHoliday(date) ? '#f7685e' : 'white';
      return color;
    };

    const resultRange = eachDayOfInterval({ start: fromDate, end: toDate });

    const calendar = resultRange.map(item => {
      return {
        name: `day_${item.getDate()}`,
        label: `${item.getDate()}`,
        options: {
          filter: false,
          sort: false,
          searchable: false,
          viewColumns: false,
          setCellHeaderProps: () => {
            return {
              style: {
                minWidth: '30px',
                width: '30px',
                borderLeft: '1px solid rgba(224, 224, 224, 1)',
                backgroundColor: isHoliday(item),
              },
            };
          },
          setCellProps: () => {
            return {
              style: {
                minWidth: '30px',
                borderLeft: '1px solid rgba(224, 224, 224, 1)',
                backgroundColor: isHoliday(item),
              },
            };
          },
          customBodyRender: customBodyRender,
        },
      };
    });
    setColumns([...settings.columns, ...calendar]);
  }, [startDate, endDate]);

  /*const save = () => {
    const sendObj = {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      tasks: {
        ...changeTask,
      },
    };
    alert(`Сохранили! Ушло на серевер: ${JSON.stringify(sendObj)}`);
    setChangeTask({});
  };*/

  const create = range => {
    switch (range) {
      case 'isoweek':
        setStartDate(moment().startOf(range));
        setEndDate(moment().endOf(range));
        break;
      case 'month':
        setStartDate(moment().startOf(range));
        setEndDate(moment().endOf(range));
        break;
      default:
        setStartDate(moment());
        setEndDate(moment());
        break;
    }
  };

  const customToolbar = () => (
    <CustomToolbar
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      create={create}
      //save={save}
    />
  );

  const renderExpandableRow = rowData => <JobCard data={rowData} />;

  const options = {
    filterType: 'textField',
    selectableRows: 'none',
    rowsPerPageOptions: [10, 20, 30],
    rowsPerPage: 10,
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
