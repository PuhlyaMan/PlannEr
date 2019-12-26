import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-dates';
import ButtonToolbar from './ButtonToolbar/ButtonToolbar.js';
import 'react-dates/initialize';
import moment from 'moment';
import { getDaysInMonth, eachDayOfInterval } from 'date-fns';
import Holidays from 'date-holidays';
import '../../settings/style.css';
import { columns as defColumns, tableColumnExtensions as defColumnExtensions } from '../../settings/settings.js';

export default function CustomToolbar({ setColumns, setTableColumnExtensions, setColorCalenadr }) {
  const [focusedInput, setFocus] = useState(null);
  const [disable, setDisable] = useState({ day: false, week: true, month: false });
  const [startDate, setStartDate] = useState(moment().startOf('isoweek'));
  const [endDate, setEndDate] = useState(moment().endOf('isoweek'));

  useEffect(() => {
    const hd = new Holidays('RU');
    const fromDate = startDate._d;
    const toDate = endDate._d;
    const maxResultRangeLength = getDaysInMonth(fromDate);
    const curentResultRangeLength = Math.trunc((toDate - fromDate) / 86400000);
    if (maxResultRangeLength <= curentResultRangeLength) {
      alert('Интервал даты не может превышать месяца');
      return;
    }

    const resultRange = eachDayOfInterval({ start: fromDate, end: toDate });

    let colorCalenadrObj = {};
    resultRange.forEach(item => {
      const day = item.getDay();
      const color = day === 6 || day === 0 || hd.isHoliday(item) ? '#f7685e' : '#ffffff';
      colorCalenadrObj = { ...colorCalenadrObj, [`day_${item.getDate()}`]: color };
    });
    setColorCalenadr(colorCalenadrObj);

    const calendar = resultRange.map(item => {
      return { name: `day_${item.getDate()}`, title: `${item.getDate()}` };
    });
    const columnExtensions = calendar.map(item => ({
      columnName: item.name,
      width: 40,
      align: 'center',
      sortingEnabled: false,
      filteringEnabled: false,
    }));
    setTableColumnExtensions([...defColumnExtensions, ...columnExtensions]);
    setColumns([...defColumns, ...calendar]);
  }, [startDate, endDate, setColumns, setTableColumnExtensions, setColorCalenadr]);

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
    <div>
      <DateRangePicker
        startDate={startDate}
        startDateId="start"
        endDate={endDate}
        endDateId="end"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
          setDisable({ day: false, week: false, month: false });
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
  setColorCalenadr: PropTypes.func,
};
