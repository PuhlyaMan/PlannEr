import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { getDaysInMonth, eachDayOfInterval } from 'date-fns';
import { columns as defaultColumns } from '../settings/settings.js';
import '../settings/style.css';

export default function CustomToolbar({ columns, setColumns }) {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [disable, setDisable] = useState(true);
  const [focusedInput, setFocus] = useState(null);
  const [changeTask, setChangeTask] = useState();

  const customCellBody = (value, tableMeta) => {
    const onChange = (e, tableMeta) => {
      const taskLabor = {
        tasks: {
          [tableMeta.rowData[1]]: {
            [tableMeta.columnData.name]: e.currentTarget.value,
          },
        },
      };
      console.log(taskLabor);
      const newChangeTesk = { ...changeTask, ...taskLabor };
      setChangeTask(newChangeTesk);
    };

    return (
      <input
        onChange={e => onChange(e, tableMeta)}
        value={value}
        style={{
          textAlign: 'center',
          minWidth: '40px',
          maxWidth: '40px',
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: 'none',
          borderBottom: '1px solid rgb(34, 36, 27, 1)',
          backgroundColor: 'inherit',
          minHeight: '24px',
        }}
      />
    );
  };

  const createCanvasCalendar = () => {
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
                minWidth: '50px',
                width: '50px',
                borderLeft: '1px solid rgba(224, 224, 224, 1)',
              },
            };
          },
          setCellProps: () => {
            return {
              style: {
                minWidth: '50px',
                borderLeft: '1px solid rgba(224, 224, 224, 1)',
                backgroundColor: 'white',
              },
            };
          },
          customBodyRender: customCellBody,
        },
      };
    });
    setDisable(false);
    setColumns([...columns, ...calendar]);
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
        onClick={disable ? createCanvasCalendar : clear}
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
  classes: PropTypes.object,
};
