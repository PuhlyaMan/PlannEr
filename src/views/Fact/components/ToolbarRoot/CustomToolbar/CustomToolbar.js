import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-dates';
import ButtonToolbar from './ButtonToolbar/ButtonToolbar.js';
import 'react-dates/initialize';
import moment from 'moment';
import { getDaysInMonth, eachDayOfInterval, format } from 'date-fns';
import Holidays from 'date-holidays';
import { columns as defColumns, tableColumnExtensions as defColumnExtensions } from '../../../settings/settings.js';
import '../../../settings/style.css';

const hd = new Holidays('RU');
const isWeekend = date => date.getDay() === 6 || date.getDay() === 0 || hd.isHoliday(date);
const isBefore = date => format(date, 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd');

const getDaySettings = date => {
  const daySettings = {
    name: `day_${date.getDate()}`,
    day: date.getDate(),
    month: date.getMonth(),
    color: 'ffffff',
    edit: true,
  };

  return isWeekend(date)
    ? { ...daySettings, color: 'rgba(245, 153, 147, 0.8)' }
    : isBefore(date)
    ? { ...daySettings, color: 'rgba(224, 224, 224, 0.5)' }
    : daySettings;
};

export default function CustomToolbar({ setColumns, setTableColumnExtensions, setCalendar }) {
  const [focusedInput, setFocus] = useState(null);
  const [disable, setDisable] = useState({ day: false, week: true, month: false });
  const [startDate, setStartDate] = useState(moment().startOf('isoweek'));
  const [endDate, setEndDate] = useState(moment().endOf('isoweek'));
  const [currentDate] = useState(new Date());

  useEffect(() => {
    const maxResultRangeLength = getDaysInMonth(startDate._d);
    const curentResultRangeLength = Math.trunc((endDate._d - startDate._d) / 86400000);
    if (maxResultRangeLength <= curentResultRangeLength) {
      alert('Интервал даты не может превышать месяца');
      return;
    }

    const daysRange = eachDayOfInterval({ start: startDate._d, end: endDate._d });
    const calendar = daysRange.map(data => getDaySettings(data));
    setCalendar(calendar);
    const columnExtensions = daysRange.map(day => ({
      columnName: `day_${day.getDate()}`,
      width: 40,
      align: 'center',
      sortingEnabled: false,
      filteringEnabled: false,
      togglingEnabled: false,
      groupingEnabled: false,
      editingEnabled: true,
    }));
    const calendarColumns = daysRange.map(day => ({
      name: `day_${day.getDate()}`,
      title: `${day.getDate()}`,
    }));

    setTableColumnExtensions([...defColumnExtensions, ...columnExtensions]);
    setColumns([...defColumns, ...calendarColumns]);
  }, [startDate, endDate, setColumns, setTableColumnExtensions, setCalendar, currentDate]);

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
    if (startDate && endDate) {
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
    }
  };

  return (
    <div style={{ margin: '0 19px 0 19px', flex: '0 0 auto' }}>
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
    </div>
  );
}

CustomToolbar.propTypes = {
  setColumns: PropTypes.func,
  setTableColumnExtensions: PropTypes.func,
  setCalendar: PropTypes.func,
};
