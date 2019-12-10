import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { columns as defaultColumns } from '../settings/settings.js';
import { getDaysInMonth, eachDayOfInterval } from 'date-fns';
import CustomCellBody from './CustomCellBody.js';
import '../settings/style.css';

export default function CustomToolbar({ setColumns, changeTask, handleTask, setDatePickers }) {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocus] = useState(null);

  useEffect(() => {
    setDatePickers({ startDate: startDate, endDate: endDate });
  }, [startDate, endDate, setDatePickers]);

  const customBodyRender = (value, tableMeta) => (
    <CustomCellBody tableMeta={tableMeta} changeTask={changeTask} handleTask={handleTask} />
  );

  const createCanvasCalendar = (start, end) => {
    const fromDate = start._d;
    const toDate = end._d;
    const maxResultRangeLength = getDaysInMonth(fromDate);
    const curentResultRangeLength = Math.trunc((toDate - fromDate) / 86400000);
    if (maxResultRangeLength <= curentResultRangeLength) {
      alert('Интервал даты не может превышать месяца');
      return;
    }

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
              },
            };
          },
          setCellProps: () => {
            return {
              style: {
                minWidth: '30px',
                borderLeft: '1px solid rgba(224, 224, 224, 1)',
                backgroundColor: 'white',
              },
            };
          },
          customBodyRender: customBodyRender,
        },
      };
    });
    setColumns([...defaultColumns, ...calendar]);
  };

  const save = () => {
    setColumns(defaultColumns);
    handleTask({ tasks: {} });
    alert(`Сохранили! Ушло на серевер: ${JSON.stringify(changeTask)}`);
  };

  const create = range => {
    let start = moment();
    let end = moment();
    switch (range) {
      case 'isoweek':
        start = moment().startOf(range);
        end = moment().endOf(range);
        break;
      case 'month':
        start = moment().startOf(range);
        end = moment().endOf(range);
        break;
    }
    setStartDate(start);
    setEndDate(end);
    handleTask({ tasks: {} });
    createCanvasCalendar(start, end);
  };

  return (
    <div>
      <DateRangePicker
        startDate={startDate}
        startDateId="start"
        endDate={endDate}
        endDateId="end"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
          //setDatePickers({ startDate: startDate, endDate: endDate });
        }}
        focusedInput={focusedInput}
        onFocusChange={focus => setFocus(focus)}
        anchorDirection="right"
        firstDayOfWeek={1}
        showDefaultInputIcon
        showClearDates
        displayFormat="YYYY-MM-DD"
        hideKeyboardShortcutsPanel
        isOutsideRange={() => false}
        small
      />
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => createCanvasCalendar(startDate, endDate)}
        style={{ marginLeft: '10px' }}
      >
        Отрезок
      </Button>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={create}
        style={{ marginLeft: '10px' }}
        //disabled={disable}
      >
        День
      </Button>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => create('isoweek')}
        style={{ marginLeft: '10px' }}
        //disabled={disable}
      >
        Неделя
      </Button>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => create('month')}
        style={{ marginLeft: '10px' }}
        //disabled={disable}
      >
        Месяц
      </Button>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={save}
        style={{ marginLeft: '10px' }}
        //disabled={disable}
      >
        Сохранить
      </Button>
    </div>
  );
}

CustomToolbar.propTypes = {
  columns: PropTypes.array,
  setColumns: PropTypes.func,
  changeTask: PropTypes.object,
  handleTask: PropTypes.func,
  setDatePickers: PropTypes.func,
};
