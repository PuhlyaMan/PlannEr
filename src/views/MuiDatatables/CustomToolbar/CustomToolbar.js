import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { columns as defaultColumns } from '../settings/settings.js';
import { getDaysInMonth, eachDayOfInterval } from 'date-fns';
import CustomCellBody from './CustomCellBody.js';
import '../settings/style.css';

export default function CustomToolbar({ columns, setColumns, changeTask, setChangeTask }) {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [disable, setDisable] = useState(true);
  const [focusedInput, setFocus] = useState(null);

  const customBodyRender = (value, tableMeta) => (
    <CustomCellBody tableMeta={tableMeta} changeTask={changeTask} setChangeTask={setChangeTask} />
  );

  const createCanvasCalendar = (startDate, endDate, columnss) => {
    console.log(columnss);
    const fromDate = startDate._d;
    const toDate = endDate._d;
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
    setColumns([...columnss, ...calendar]);
  };

  const save = () => {
    setDisable(true);
    setColumns(defaultColumns);
    alert('Сохранили!');
  };

  const clear = () => {
    setColumns(defaultColumns);
    setDisable(true);
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
        disabled={!disable}
        small
      />
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={
          disable
            ? () => {
                createCanvasCalendar(startDate, endDate, columns);
                setDisable(false);
              }
            : clear
        }
        style={{ marginLeft: '10px' }}
      >
        {disable ? 'Открыть календарь' : 'Закрыть календарь'}
      </Button>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={save}
        style={{ marginLeft: '10px' }}
        disabled={disable}
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
  setChangeTask: PropTypes.func,
};
