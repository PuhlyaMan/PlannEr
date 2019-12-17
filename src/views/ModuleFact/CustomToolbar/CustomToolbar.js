import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import moment from 'moment';
import Holidays from 'date-holidays';
import { getDaysInMonth, eachDayOfInterval } from 'date-fns';
import { Search } from 'react-bootstrap-table2-toolkit';
import { columns as defaultColumns } from '../settings/settings.js';
import CustomToggleList from '../CustomToggleList/CustomToggleList.js';
import DateRangeToolbar from './DateRangeToolbar/DateRangeToolbar.js';

const CustomToolbar = ({ columnToggleProps, searchProps, setColumns }) => {
  const [startDate, setStartDate] = useState(moment().startOf('isoweek'));
  const [endDate, setEndDate] = useState(moment().endOf('isoweek'));
  const { SearchBar } = Search;

  useEffect(() => {
    /*const handleTask = newTask => {
      Object.keys(newTask).forEach(key => {
        const obj = changeTask[key]
          ? { [key]: { ...changeTask[key], ...newTask[key] } }
          : { ...changeTask, ...newTask };
        setChangeTask(obj);
      });
    };*/

    /*const customBodyRender = (value, tableMeta) => (
      <CustomCellBody tableMeta={tableMeta} startDate={startDate} endDate={endDate} />
    );*/
    const hd = new Holidays('RU');
    const fromDate = startDate._d;
    const toDate = endDate._d;
    const maxResultRangeLength = getDaysInMonth(fromDate);
    const curentResultRangeLength = Math.trunc((toDate - fromDate) / 86400000);
    if (maxResultRangeLength <= curentResultRangeLength) {
      alert('Интервал даты не может превышать месяца');
      return;
    }

    // eslint-disable-next-line no-unused-vars
    const isHoliday = date => {
      const day = date.getDay();
      const color = day === 6 || day === 0 || hd.isHoliday(date) ? '#f7685e' : 'white';
      return color;
    };

    const resultRange = eachDayOfInterval({ start: fromDate, end: toDate });

    const calendar = resultRange.map(item => {
      return {
        dataField: `day_${item.getDate()}`,
        text: `${item.getDate()}`,
        sort: false,
        searchable: false,
        align: 'center',
        visibleToggle: true,
        hidden: false,
        style: {
          backgroundColor: isHoliday(item),
        },
        classes: 'task-day-column',
        headerClasses: 'task-day-column-header align-center',
      };
    });
    setColumns([...defaultColumns, ...calendar]);
  }, [startDate, endDate, setColumns]);

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

  return (
    <div className="toolbar">
      <div style={{ flex: '1 1 auto' }}>
        <h3 className="table-title">Модуль фактов</h3>
      </div>
      <div>
        <CustomToggleList {...columnToggleProps} className="list-custom-class" />
        <SearchBar {...searchProps} />
        <div style={{ textAlign: 'right' }}>
          <DateRangeToolbar
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            create={create}
          />
        </div>
      </div>
    </div>
  );
};

CustomToolbar.propTypes = {
  columnToggleProps: PropTypes.object,
  searchProps: PropTypes.object,
  setColumns: PropTypes.func,
};

export default CustomToolbar;
