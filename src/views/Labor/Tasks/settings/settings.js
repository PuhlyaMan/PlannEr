import React from 'react';
import * as PropTypes from 'prop-types';
import { IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Table,
  TableFixedColumns,
  TableBandHeader,
  TableHeaderRow,
  TableFilterRow,
  TableEditRow,
} from '@devexpress/dx-react-grid-material-ui';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import moment from 'moment';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DateRange from '@material-ui/icons/DateRange';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export const columns = [
  { name: 'name', title: 'Наименование' },
  { name: 'id', title: 'ИД задачи' },
  { name: 'state', title: 'Статус' },
  { name: 'developer', title: 'Ответственный' },
  {
    name: 'department_id',
    title: 'ИД отдела',
    getCellValue: row => (row.department ? row.department.id : undefined),
  },
  {
    name: 'title',
    title: 'Наименование отдела',
    getCellValue: row => (row.department ? row.department.title : undefined),
  },
  {
    name: 'breadcrumb',
    title: 'Цепочка',
    getCellValue: row => (row.department ? row.department.breadcrumb : undefined),
  },
  {
    name: 'plan_start_date',
    title: 'Дата начала',
    getCellValue: row => (row.plan ? row.plan.start_date : undefined),
  },
  {
    name: 'plan_finish_date',
    title: 'Дата окончания',
    getCellValue: row => (row.plan ? row.plan.finish_date : undefined),
  },
  {
    name: 'plan_labor',
    title: 'Трудозатраты',
    getCellValue: row => (row.plan ? row.plan.labor : undefined),
  },
  {
    name: 'actual_start_date',
    title: 'Дата начала',
    getCellValue: row => (row.actual ? row.actual.start_date : undefined),
  },
  {
    name: 'actual_finish_date',
    title: 'Дата окончания',
    getCellValue: row => (row.actual ? row.actual.finish_date : undefined),
  },
  {
    name: 'actual_labor',
    title: 'Трудозатраты',
    getCellValue: row => (row.actual ? row.actual.labor : undefined),
  },
  { name: 'comment', title: 'Коментарий' },
  { name: '@timestamp', title: 'Метка времени' },
];

export const tableColumnExtensions = [
  { columnName: 'name', width: 500, wordWrapEnabled: true },
  { columnName: 'id', width: 150, align: 'center' },
  { columnName: 'state', width: 120 },
  { columnName: 'developer', width: 200, wordWrapEnabled: true },
  { columnName: 'department_id', width: 150, align: 'center' },
  { columnName: 'title', width: 150 },
  { columnName: 'breadcrumb', width: 250 },
  { columnName: 'plan_start_date', width: 150, align: 'center' },
  { columnName: 'plan_finish_date', width: 150, align: 'center' },
  { columnName: 'plan_labor', width: 150, align: 'center' },
  { columnName: 'actual_start_date', width: 150, align: 'center' },
  { columnName: 'actual_finish_date', width: 150, align: 'center' },
  { columnName: 'actual_labor', width: 150, align: 'center' },
  { columnName: 'comment', width: 200 },
  { columnName: '@timestamp', width: 200, align: 'center' },
];

export const editingColumnExtensions = [
  { columnName: 'name', editingEnabled: false },
  { columnName: 'id', editingEnabled: false },
  { columnName: 'state', editingEnabled: false },
  { columnName: 'developer', editingEnabled: false },
  {
    columnName: 'department_id',
    editingEnabled: false,
    createRowChange: (row, value) => ({ department: { ...row.department, id: value } }),
  },
  {
    columnName: 'title',
    editingEnabled: false,
    createRowChange: (row, value) => ({ department: { ...row.department, title: value } }),
  },
  {
    columnName: 'breadcrumb',
    editingEnabled: false,
    createRowChange: (row, value) => ({ department: { ...row.department, breadcrumb: value } }),
  },
  {
    columnName: 'plan_start_date',
    editingEnabled: false,
    createRowChange: (row, value) => ({ plan: { ...row.plan, start_date: value } }),
  },
  {
    columnName: 'plan_finish_date',
    editingEnabled: false,
    createRowChange: (row, value) => ({ plan: { ...row.plan, finish_date: value } }),
  },
  {
    columnName: 'plan_labor',
    editingEnabled: false,
    createRowChange: (row, value) => ({ plan: { ...row.plan, labor: value } }),
  },
  {
    columnName: 'actual_start_date',
    editingEnabled: false,
    createRowChange: (row, value) => ({ actual: { ...row.actual, start_date: value } }),
  },
  {
    columnName: 'actual_finish_date',
    editingEnabled: false,
    createRowChange: (row, value) => ({ actual: { ...row.actual, finish_date: value } }),
  },
  {
    columnName: 'actual_labor',
    editingEnabled: false,
    createRowChange: (row, value) => ({ actual: { ...row.actual, labor: value } }),
  },
  { columnName: '@timestamp', editingEnabled: false },
];

const styles = theme => ({
  lookupEditCell: {
    padding: theme.spacing(1),
  },
  selectState: {
    fontSize: '14px',
    width: '100%',
  },
  content: {
    display: 'contents',
    textAlign: 'center',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  cell: {
    padding: '5px 7px',
  },
  cellBand: {
    textAlign: 'center',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  calendarCellColumn: {
    width: '100%',
  },
});

const StateEditorBase = ({ disabled, value, onValueChange, classes }) => {
  const handleChange = event => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange();
      return;
    }
    onValueChange(targetValue);
  };
  return (
    <Select
      disabled={disabled}
      className={classes.selectState}
      labelId="stateLabel"
      id="stateSelect"
      value={value === undefined ? '' : value}
      onChange={handleChange}
    >
      <MenuItem value="">Все</MenuItem>
      <MenuItem value="Выполнено">Выполнено</MenuItem>
      <MenuItem value="В работе">В работе</MenuItem>
      <MenuItem value="Ожидание">Ожидание</MenuItem>
    </Select>
  );
};

StateEditorBase.propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

StateEditorBase.defaultProps = {
  value: undefined,
};

const StateEditor = withStyles(styles)(StateEditorBase);

const ContentComponentBase = ({ children, classes, className, ...restProps }) => (
  <div className={classNames(classes.content, className)} {...restProps}>
    {children}
  </div>
);

ContentComponentBase.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ContentComponentBase.defaultProps = {
  className: null,
  children: undefined,
};

export const ContentComponent = withStyles(styles)(ContentComponentBase);

export const font = state => {
  switch (state) {
    case 'В работе':
      return '#80cf95';
    case 'Ожидание':
      return '#ecf272';
    case 'Выполнено':
      return '#b7b8b2';
    case 'Запланировано':
      return '#7daed4';
    case 'Новая':
      return '#fff';
    default:
      return '';
  }
};

export const StateEditorProvider = ({ ...restProps }) => {
  return (
    <DataTypeProvider
      {...restProps}
      editorComponent={StateEditor}
      for={stateColumn}
      availableFilterOperations={stateFilterOperation}
    />
  );
};

export const DateTypeProvider = ({ ...restProps }) => {
  return <DataTypeProvider {...restProps} for={dateColumns} availableFilterOperations={dateFilterOperations} />;
};

export const NumberTypeProvider = ({ ...restProps }) => {
  return <DataTypeProvider {...restProps} for={numberColumns} availableFilterOperations={currencyFilterOperations} />;
};

NumberTypeProvider.propTypes = {
  columns: PropTypes.array,
};

export const TableCellFixed = ({ ...restProps }) => {
  const row = restProps.tableRow.row;
  return (
    <TableFixedColumns.Cell
      {...restProps}
      style={{
        backgroundColor: row ? font(row.state) : '#fff',
      }}
    />
  );
};

const TableCellBandBase = ({ classes, className, ...restProps }) => {
  return <TableBandHeader.Cell {...restProps} className={classNames(classes.cellBand, className)} />;
};

TableCellBandBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export const TableCellBand = withStyles(styles, { name: 'TableCellBand' })(TableCellBandBase);

export const TableRow = ({ row, ...restProps }) => {
  return (
    <Table.Row
      {...restProps}
      style={{
        cursor: 'pointer',
        backgroundColor: font(row.state),
        //...styles[row.sector.toLowerCase()],
      }}
    />
  );
};

TableRow.propTypes = {
  row: PropTypes.object,
};

export const fixedLeftColumns = ['name'];

export const defaultHiddenColumnNames = [
  'state',
  'developer',
  'department_id',
  'title',
  'breadcrumb',
  'comment',
  '@timestamp',
];

export const columnBands = [
  {
    title: 'Отдел',
    children: [{ columnName: 'department_id' }, { columnName: 'title' }, { columnName: 'breadcrumb' }],
  },
  {
    title: 'План',
    children: [{ columnName: 'plan_start_date' }, { columnName: 'plan_finish_date' }, { columnName: 'plan_labor' }],
  },
  {
    title: 'Факт',
    children: [
      { columnName: 'actual_start_date' },
      { columnName: 'actual_finish_date' },
      { columnName: 'actual_labor' },
    ],
  },
];

export const pageSizes = [5, 10, 15, 0];

export const numberColumns = ['id', 'department_id', 'plan_labor', 'actual_labor'];

export const dateColumns = [
  'plan_start_date',
  'plan_finish_date',
  'actual_start_date',
  'actual_finish_date',
  '@timestamp',
];
export const dateEditorColumns = ['actual_start_date', 'actual_finish_date'];
export const stateColumn = ['state'];
const customFilter = [...dateColumns, ...stateColumn];

export const filteringColumnExtensions = customFilter.map(item => {
  return {
    columnName: item,
    predicate: (value, filter, row) => {
      if (!filter.value.length) return true;
      if (filter && filter.operation === 'month') {
        const month = parseInt(value.split('-')[1], 10);
        return month === parseInt(filter.value, 10);
      }
      if (filter && filter.operation === 'state') {
        if (!filter.value) return true;
        return value === filter.value;
      }
      return IntegratedFiltering.defaultPredicate(value, filter, row);
    },
  };
});

export const dateFilterOperations = ['month', 'contains', 'startsWith', 'endsWith'];

export const stateFilterOperation = ['state'];
export const currencyFilterOperations = [
  'equal',
  'notEqual',
  'greaterThan',
  'greaterThanOrEqual',
  'lessThan',
  'lessThanOrEqual',
];

export const columnNames = () => {
  let names = [];
  columns.map(item => {
    return names.push(item['name']);
  });
  return names;
};

export const totalSummaryItems = [{ columnName: 'id', type: 'count' }];

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Редактировать">
    <EditIcon />
  </IconButton>
);

EditButton.propTypes = {
  onExecute: PropTypes.func,
};

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Сохранить" style={{ padding: '12px 0', marginRight: '10px' }}>
    <SaveIcon />
  </IconButton>
);

CommitButton.propTypes = {
  onExecute: PropTypes.func,
};

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} style={{ padding: '12px 0' }} title="Отменить">
    <CancelIcon />
  </IconButton>
);

CancelButton.propTypes = {
  onExecute: PropTypes.func,
};

const commandComponents = {
  edit: EditButton,
  commit: CommitButton,
  cancel: CancelButton,
};

export const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

Command.propTypes = {
  onExecute: PropTypes.func,
  id: PropTypes.string,
};

const DateEditCellBase = ({ editingEnabled, value, onValueChange, classes }) => (
  <Table.Cell className={classNames(classes.lookupEditCell)}>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <DateTimePicker
        disabled={!editingEnabled}
        format="yyyy-MM-dd HH:mm:ss"
        ampm={false}
        value={value}
        showTodayButton
        onChange={event =>
          onValueChange(
            moment(event)
              .format()
              .substring(0, 19)
          )
        }
      />
    </MuiPickersUtilsProvider>
  </Table.Cell>
);

DateEditCellBase.propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  classes: PropTypes.object,
  className: PropTypes.string,
  editingEnabled: PropTypes.bool.isRequired,
};

export const DateEditCell = withStyles(styles)(DateEditCellBase);

export const availableValues = {
  actual_start_date: 'actual_start_date',
  actual_finish_date: 'actual_finish_date',
};

export const EditCell = props => {
  const { column } = props;
  if (availableValues[column.name]) {
    return <DateEditCell {...props} />;
  }
  return <TableEditRow.Cell {...props} />;
};

EditCell.propTypes = {
  column: PropTypes.object,
};

export const defaultFilters = [{ columnName: 'state', value: 'В работе' }];

export const nonSortColumn = {
  day_1: 1,
  day_2: 2,
  day_3: 3,
  day_4: 4,
  day_5: 5,
  day_6: 6,
  day_7: 7,
  day_8: 8,
  day_9: 9,
  day_10: 10,
  day_11: 11,
  day_12: 12,
  day_13: 13,
  day_14: 14,
  day_15: 15,
  day_16: 16,
  day_17: 17,
  day_18: 18,
  day_19: 19,
  day_20: 20,
  day_21: 21,
  day_22: 22,
  day_23: 23,
  day_24: 24,
  day_25: 25,
  day_26: 26,
  day_27: 27,
  day_28: 28,
  day_29: 29,
  day_30: 30,
  day_31: 31,
};

const SortLabelBase = ({ column, classes, ...restProps }) => {
  if (nonSortColumn[column.name]) return <div className={classes.calendarCellColumn}>{column.title}</div>;
  return <TableHeaderRow.SortLabel {...restProps} />;
};

SortLabelBase.propTypes = {
  column: PropTypes.object,
  classes: PropTypes.object,
};

export const SortLabel = withStyles(styles)(SortLabelBase);

export const FilterCell = ({ column, ...restProps }) => {
  if (nonSortColumn[column.name]) return <Table.Cell />;
  return <TableFilterRow.Cell {...restProps} />;
};

FilterCell.propTypes = {
  column: PropTypes.object,
};

export const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  if (type === 'state') return null;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

FilterIcon.propTypes = {
  type: PropTypes.string,
};
