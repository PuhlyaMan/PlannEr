import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import GridItem from 'components/Grid/GridItem.js';
import {
  SearchState,
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableBandHeader,
  TableHeaderRow,
  TableFilterRow,
  TableFixedColumns,
  TableEditColumn,
  //TableInlineCellEditing,
  TableEditRow,
  ColumnChooser,
  TableColumnVisibility,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { eachDayOfInterval, getDaysInMonth, eachWeekendOfMonth } from 'date-fns';
import GridContainer from 'components/Grid/GridContainer.js';
import * as settings from './settings/settings.js';
import * as localisation from 'assets/data/ru.js';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const getRowId = row => row.id;

const monthName = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export default function Tasks(props) {
  const { dataRow, setUpdatedTask } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataRow);
  }, [dataRow]);

  const [columns, setColumns] = useState(settings.columns);
  const [tableColumnExtensions, setTableColumnExtensions] = useState(settings.tableColumnExtensions);
  const [columnBands, setColumnBands] = useState(settings.columnBands);
  const [daysWeekendOfMonth, setWeekend] = useState([]);
  //const [nonSortColumn, setNonSortColumn] = useState({});
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  //TODO
  useEffect(() => {
    const dayFrom = eachWeekendOfMonth(fromDate)
      .filter(item => fromDate.getDate() <= item.getDate())
      .map(item => item.getDate());
    const dayTo = eachWeekendOfMonth(toDate)
      .filter(item => toDate.getDate() >= item.getDate())
      .map(item => item.getDate());
    setWeekend([...new Set([...dayFrom, ...dayTo])]);
  }, [fromDate, toDate]);

  const [editingRowIds, getEditingRowIds] = useState([]);
  const [rowChanges, setRowChanges] = useState({});

  const commitChanges = ({ changed }) => {
    const changedRows = data.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    setData(changedRows);
    setUpdatedTask(changedRows);
  };

  const createCanvasCalendar = () => {
    const maxResultRangeLength = getDaysInMonth(fromDate);
    const curentResultRangeLength = Math.trunc((toDate - fromDate) / 86400000);
    if (curentResultRangeLength < 0) {
      alert('Дата окончания не может быть раньше даты начала');
      return;
    }
    if (maxResultRangeLength <= curentResultRangeLength) {
      alert('Интервал даты не может превышать месяца');
      return;
    }

    const resultRange = eachDayOfInterval({ start: fromDate, end: toDate });
    //const nonSortColumnsObject = {};
    const calendar = resultRange.map(item => {
      //nonSortColumnsObject[`day_${item.getDate()}`] = `${item.getDate()}`;
      return { name: `day_${item.getDate()}`, title: `${item.getDate()}` };
    });
    const columnExtensions = calendar.map(item => ({
      columnName: item.name,
      width: 50,
      align: 'center',
      sortingEnabled: false,
      filteringEnabled: false,
    }));

    let newColumnBand = [];
    let itemColumnBand = {};
    let children = [];
    for (let i = 0; i <= resultRange.length - 1; i++) {
      const curentMonth = resultRange[i].getMonth();
      const nextMonth = resultRange[i + 1] ? resultRange[i + 1].getMonth() : curentMonth;
      if (curentMonth === nextMonth) {
        children = [...children, { columnName: `day_${resultRange[i].getDate()}` }];
        itemColumnBand = { title: monthName[curentMonth], children: children };
      } else {
        children = [...children, { columnName: `day_${resultRange[i].getDate()}` }];
        itemColumnBand = { title: monthName[curentMonth], children: children };
        newColumnBand = [...newColumnBand, itemColumnBand];
        children = [];
        itemColumnBand = {};
      }
    }
    newColumnBand = [...newColumnBand, itemColumnBand];
    //setNonSortColumn(nonSortColumnsObject);
    setTableColumnExtensions([...tableColumnExtensions, ...columnExtensions]);
    setColumns([...columns, ...calendar]);
    setColumnBands([...columnBands, ...newColumnBand]);
  };

  const styles = {
    cell: {
      padding: '5px 7px',
    },
  };

  const TableCellBase = ({ column, classes, className, ...restProps }) => {
    const dayArray = settings.nonSortColumn;
    if (dayArray[column.name]) {
      const color = daysWeekendOfMonth.includes(Number(column.title)) ? '#f26b61' : '#ffffff';
      return (
        <Table.Cell {...restProps} className={classNames(classes.cell, className)} style={{ backgroundColor: color }} />
      );
    }
    return <Table.Cell {...restProps} className={classNames(classes.cell, className)} />;
  };

  TableCellBase.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    column: PropTypes.object,
  };

  const TableCell = withStyles(styles, { name: 'Cell' })(TableCellBase);

  return (
    <>
      <GridContainer style={{ paddingBottom: '16px' }}>
        <GridItem xs={12} sm={12} md={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <DatePicker
              format="yyyy-MM-dd"
              label="From"
              value={fromDate}
              showTodayButton
              disableFuture
              onChange={setFromDate}
            />
          </MuiPickersUtilsProvider>
        </GridItem>
        <GridItem xs={12} sm={12} md={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <DatePicker
              format="yyyy-MM-dd"
              label="To"
              value={toDate}
              showTodayButton
              disableFuture
              onChange={setToDate}
            />
          </MuiPickersUtilsProvider>
        </GridItem>
        <GridItem xs={12} sm={12} md={2}>
          <Button size="large" variant="contained" color="primary" onClick={createCanvasCalendar}>
            Применить
          </Button>
        </GridItem>
      </GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Paper>
          <Grid getRowId={getRowId} rows={data} columns={columns}>
            <settings.DateTypeProvider />
            <settings.StateEditorProvider />
            <settings.NumberTypeProvider />

            <SearchState />
            <FilteringState columnExtensions={tableColumnExtensions} defaultFilters={settings.defaultFilters} />
            <SortingState columnExtensions={tableColumnExtensions} />
            <PagingState defaultCurrentPage={0} defaultPageSize={5} />

            <IntegratedFiltering columnExtensions={settings.filteringColumnExtensions} />
            <IntegratedSorting />
            <IntegratedPaging />

            <EditingState
              onCommitChanges={commitChanges}
              columnExtensions={settings.editingColumnExtensions}
              editingRowIds={editingRowIds}
              onEditingRowIdsChange={getEditingRowIds}
              rowChanges={rowChanges}
              onRowChangesChange={setRowChanges}
            />
            <Table
              cellComponent={TableCell}
              rowComponent={settings.TableRow}
              messages={localisation.table}
              columnExtensions={tableColumnExtensions}
            />
            <TableColumnVisibility
              messages={localisation.tableColumnVisibility}
              defaultHiddenColumnNames={settings.defaultHiddenColumnNames}
            />
            <TableHeaderRow
              contentComponent={settings.ContentComponent}
              showSortingControls
              sortLabelComponent={settings.SortLabel}
              messages={localisation.tableHeaderRow}
            />
            <TableEditRow cellComponent={settings.EditCell} />
            <TableEditColumn showEditCommand commandComponent={settings.Command} width={100} />
            <TableFilterRow
              cellComponent={settings.FilterCell}
              showFilterSelector
              messages={localisation.tableFilterRow}
              iconComponent={settings.FilterIcon}
            />
            <TableBandHeader cellComponent={settings.TableCellBand} columnBands={columnBands} />
            <TableFixedColumns
              cellComponent={settings.TableCellFixed}
              leftColumns={[TableEditColumn.COLUMN_TYPE, ...settings.fixedLeftColumns]}
            />
            <Toolbar />
            {/*<TableInlineCellEditing selectTextOnEditStart="true" />*/}
            <ColumnChooser messages={localisation.columnChooser} />

            <SearchPanel messages={localisation.searchPanel} />
            <PagingPanel messages={localisation.pagingPanel} pageSizes={settings.pageSizes} />
          </Grid>
        </Paper>
      </GridItem>
    </>
  );
}

Tasks.propTypes = {
  dataRow: PropTypes.array,
  setUpdatedTask: PropTypes.func,
};
