import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-dates';
import ButtonToolbar from './ButtonToolbar/ButtonToolbar.js';
import 'react-dates/initialize';
import moment from 'moment';
import { getDaysInMonth, eachDayOfInterval } from 'date-fns';
import Holidays from 'date-holidays';
import { columns as defColumns, tableColumnExtensions as defColumnExtensions } from '../../../settings/settings.js';
import '../../../settings/style.css';

export default function CustomToolbar({ setColumns, setTableColumnExtensions, setColorCalendar }) {
  const [focusedInput, setFocus] = useState(null);
  const [disable, setDisable] = useState({ day: false, week: true, month: false });
  const [startDate, setStartDate] = useState(moment().startOf('isoweek'));
  const [endDate, setEndDate] = useState(moment().endOf('isoweek'));

  useEffect(() => {
    const maxResultRangeLength = getDaysInMonth(startDate._d);
    const curentResultRangeLength = Math.trunc((endDate._d - startDate._d) / 86400000);
    if (maxResultRangeLength <= curentResultRangeLength) {
      alert('Интервал даты не может превышать месяца');
      return;
    }
    const hd = new Holidays('RU');
    const resultRange = eachDayOfInterval({ start: startDate._d, end: endDate._d });

    let colorCalendarObj = {};
    resultRange.forEach(item => {
      const day = item.getDay();
      const color = day === 6 || day === 0 || hd.isHoliday(item) ? 'rgba(245, 153, 147, 0.8)' : '#ffffff';
      colorCalendarObj = { ...colorCalendarObj, [`day_${item.getDate()}`]: color };
    });
    setColorCalendar(colorCalendarObj);

    const calendar = resultRange.map(item => {
      return { name: `day_${item.getDate()}`, title: `${item.getDate()}` };
    });
    const columnExtensions = calendar.map(item => ({
      columnName: item.name,
      width: 40,
      align: 'center',
      sortingEnabled: false,
      filteringEnabled: false,
      togglingEnabled: false,
      groupingEnabled: false,
    }));
    setTableColumnExtensions([...defColumnExtensions, ...columnExtensions]);
    setColumns([...defColumns, ...calendar]);
  }, [startDate, endDate, setColumns, setTableColumnExtensions, setColorCalendar]);

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

  const handleDatesChange = ({ startDate, endDate }) => {
    const maxResultRangeLength = getDaysInMonth(startDate._d);
    const curentResultRangeLength = Math.trunc((endDate._d - startDate._d) / 86400000);
    if (maxResultRangeLength <= curentResultRangeLength) {
      alert('Интервал даты не может превышать месяца');
      return;
    } else {
      setStartDate(startDate);
      setEndDate(endDate);
      setDisable({ day: false, week: false, month: false });
    }
  };

  return (
    <div style={{ position: 'absolute', right: '400px', top: '15px' }}>
      <DateRangePicker
        startDate={startDate}
        startDateId="start"
        endDate={endDate}
        endDateId="end"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focus => setFocus(focus)}
        anchorDirection="right"
        firstDayOfWeek={1}
        showDefaultInputIcon
        displayFormat="YYYY-MM-DD"
        hideKeyboardShortcutsPanel
        isOutsideRange={() => false}
        small
      />
      {/*<ButtonToolbar onClick={createRange}>Отрезок</ButtonToolbar>*/}
      <ButtonToolbar
        onClick={() => {
          create();
          setDisable({ day: true, week: false, month: false });
        }}
        disabled={disable.day}
      >
        День
      </ButtonToolbar>
      <ButtonToolbar
        onClick={() => {
          create('isoweek');
          setDisable({ day: false, week: true, month: false });
        }}
        disabled={disable.week}
      >
        Неделя
      </ButtonToolbar>
      <ButtonToolbar
        onClick={() => {
          create('month');
          setDisable({ day: false, week: false, month: true });
        }}
        disabled={disable.month}
      >
        Месяц
      </ButtonToolbar>
      {/*<ButtonToolbar
        color="secondary"
        onClick={() => {
          save();
        }}
      >
        Сохранить
      </ButtonToolbar>*/}
    </div>
  );
}

CustomToolbar.propTypes = {
  setColumns: PropTypes.func,
  setTableColumnExtensions: PropTypes.func,
  setColorCalendar: PropTypes.func,
};