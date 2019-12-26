import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  GroupingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  Toolbar,
  SearchPanel,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import 'react-dates/initialize';
import moment from 'moment';
import { getDaysInMonth, eachDayOfInterval } from 'date-fns';
import Holidays from 'date-holidays';
import TableRow from './components/TableRow/TableRow.js';
import TableCell from './components/TableCell/TableCell.js';
import TableCellHeader from './components/TableCellHeader/TableCellHeader.js';
import ContentComponent from './components/ContentComponent/ContentComponent.js';
import SortLabel from './components/SortLabel/SortLabel.js';
import FixedColumns from './components/FixedColumns/FixedColumns.js';
import ToolbarRoot from './components/ToolbarRoot/ToolbarRoot.js';
import * as settings from './settings/settings.js';
import * as localisation from 'assets/data/ru.js';

const getRowId = row => row.id;

const TaskTable = ({ row }) => {
  const [columns, setColumns] = useState(settings.columns);
  const [rows, setRows] = useState([]);
  const [hd] = useState(new Holidays('RU'));
  const [tableColumnExtensions, setTableColumnExtensions] = useState(settings.tableColumnExtensions);
  const [startDate, setStartDate] = useState(moment().startOf('isoweek'));
  const [endDate, setEndDate] = useState(moment().endOf('isoweek'));
  const [colorCalenadr, setColorCalenadr] = useState({});
  const [disable, setDisable] = useState({ day: false, week: true, month: false });

  useEffect(() => {
    setRows(row.tasks);
  }, [row.tasks]);

  useEffect(() => {
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
    setTableColumnExtensions([...settings.tableColumnExtensions, ...columnExtensions]);
    setColumns([...settings.columns, ...calendar]);
  }, [startDate, endDate, hd]);

  const cellComponent = restProps => <TableCell {...restProps} colorCalenadr={colorCalenadr} />;
  const cellHeaderComponent = restProps => <TableCellHeader {...restProps} colorCalenadr={colorCalenadr} />;
  const rowComponent = restProps => <TableRow {...restProps} />;
  const contentComponent = restProps => <ContentComponent {...restProps} />;
  const sortLabelComponent = restProps => <SortLabel {...restProps} colorCalenadr={colorCalenadr} />;
  const cellFixedComponent = restProps => <FixedColumns {...restProps} />;
  const rootToolbarComponent = restProps => (
    <ToolbarRoot
      {...restProps}
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      create={create}
      disable={disable}
      setDisable={setDisable}
    />
  );

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
    <Paper>
      <Grid getRowId={getRowId} rows={rows} columns={columns}>
        <SearchState />
        <SortingState columnExtensions={tableColumnExtensions} />
        <PagingState defaultCurrentPage={0} defaultPageSize={5} />
        <GroupingState />
        <IntegratedFiltering />
        <IntegratedSorting />
        <IntegratedPaging />
        <Table
          cellComponent={cellComponent}
          rowComponent={rowComponent}
          messages={localisation.table}
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow
          showSortingControls
          sortLabelComponent={sortLabelComponent}
          contentComponent={contentComponent}
          cellComponent={cellHeaderComponent}
          messages={localisation.tableHeaderRow}
        />
        <TableFixedColumns leftColumns={settings.fixedLeftColumns} cellComponent={cellFixedComponent} />
        <Toolbar rootComponent={rootToolbarComponent} />
        <SearchPanel messages={localisation.searchPanel} />
        <PagingPanel messages={localisation.pagingPanel} />
      </Grid>
    </Paper>
  );
};

TaskTable.propTypes = {
  row: PropTypes.object,
};

export default TaskTable;
