import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import Holidays from 'date-holidays';
import { getDaysInMonth, eachDayOfInterval } from 'date-fns';
import { columns as defaultColumns } from '../settings/settings.js';
import CustomCellBody from './CustomCellBody.js';
import ButtonToolbar from './ButtonToolbar.js';
import '../settings/style.css';

export default function CustomToolbar({ setColumns, changeTask, handleTask }) {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocus] = useState(null);
  const [disable, setDisable] = useState({ day: false, week: true, month: false });

  useEffect(() => {
    const start = moment().startOf('isoweek');
    const end = moment().endOf('isoweek');
    createCanvasCalendar(start, end);
    setStartDate(start);
    setEndDate(end);
  }, []);

  const customBodyRender = (value, tableMeta) => <CustomCellBody tableMeta={tableMeta} handleTask={handleTask} />;

  const createCanvasCalendar = (start, end) => {
    const hd = new Holidays('RU');
    const fromDate = start._d;
    const toDate = end._d;
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
    setColumns([...defaultColumns, ...calendar]);
  };

  const save = () => {
    const sendObj = {
      startDate: startDate,
      endDate: endDate,
      tasks: {
        ...changeTask,
      },
    };
    setColumns(defaultColumns);
    alert(`Сохранили! Ушло на серевер: ${JSON.stringify(sendObj)}`);
    setDisable({ day: false, week: false, month: false });
    handleTask({});
  };

  const create = range => {
    let start = moment();
    let end = moment();
    switch (range) {
      case 'isoweek':
        start = moment().startOf(range);
        end = moment().endOf(range);
        setDisable({ day: false, week: true, month: false });
        break;
      case 'month':
        start = moment().startOf(range);
        end = moment().endOf(range);
        setDisable({ day: false, week: false, month: true });
        break;
      default:
        setDisable({ day: true, week: false, month: false });
        break;
    }
    setStartDate(start);
    setEndDate(end);
    createCanvasCalendar(start, end);
  };

  const createRange = () => {
    createCanvasCalendar(startDate, endDate);
    setDisable({ day: false, week: false, month: false });
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
      <ButtonToolbar onClick={createRange}>Отрезок</ButtonToolbar>
      <ButtonToolbar onClick={create} disabled={disable.day}>
        День
      </ButtonToolbar>
      <ButtonToolbar onClick={() => create('isoweek')} disabled={disable.week}>
        Неделя
      </ButtonToolbar>
      <ButtonToolbar onClick={() => create('month')} disabled={disable.month}>
        Месяц
      </ButtonToolbar>
      <ButtonToolbar color="secondary" onClick={save}>
        Сохранить
      </ButtonToolbar>
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
