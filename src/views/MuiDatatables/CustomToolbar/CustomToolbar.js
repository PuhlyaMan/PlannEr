import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-dates';
import ButtonToolbar from './ButtonToolbar.js';
import '../settings/style.css';

export default function CustomToolbar({ startDate, endDate, setStartDate, setEndDate, create, save }) {
  const [focusedInput, setFocus] = useState(null);
  const [disable, setDisable] = useState({ day: false, week: true, month: false });

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
      <ButtonToolbar
        color="secondary"
        onClick={() => {
          save();
        }}
      >
        Сохранить
      </ButtonToolbar>
    </div>
  );
}

CustomToolbar.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
  create: PropTypes.func,
  save: PropTypes.func,
};
