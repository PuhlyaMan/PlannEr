import React from 'react';
import * as PropTypes from 'prop-types';
import { IntegratedFiltering } from '@devexpress/dx-react-grid';
import { TableFixedColumns, TableBandHeader } from '@devexpress/dx-react-grid-material-ui';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
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
  { columnName: 'name', width: 300, wordWrapEnabled: true },
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
    createRowChange: (row, value) => ({ actual: { ...row.actual, start_date: value } }),
  },
  {
    columnName: 'actual_finish_date',
    createRowChange: (row, value) => ({ actual: { ...row.actual, finish_date: value } }),
  },
  {
    columnName: 'actual_labor',
    createRowChange: (row, value) => ({ actual: { ...row.actual, labor: value } }),
  },
  { columnName: '@timestamp', editingEnabled: false },
];

const styles = {
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
};

const DateEditor = ({ disabled, value, onValueChange }) => {
  const handleChange = event => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange();
      return;
    }
    onValueChange(targetValue);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <DateTimePicker
        disabled={disabled}
        autoOk
        ampm={false}
        disableFuture
        value={value === undefined ? '' : value}
        onChange={handleChange}
        format="yyyy-MM-dd HH:mm:ss"
      />
    </MuiPickersUtilsProvider>
  );
};

DateEditor.propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

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

export const ContentComponent = withStyles(styles, { name: 'Content' })(ContentComponentBase);

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

export const DateEditorProvider = ({ ...restProps }) => {
  return (
    <DataTypeProvider
      {...restProps}
      editorComponent={DateEditor}
      for={dateEditorColumns}
      availableFilterOperations={dateFilterOperations}
    />
  );
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

export const TableCellBand = ({ ...restProps }) => {
  return (
    <TableBandHeader.Cell
      {...restProps}
      style={{
        textAlign: 'center',
        fontSize: '15px',
        fontWeight: 'bold',
      }}
    />
  );
};

export const fixedLeftColumns = ['name'];

export const defaultHiddenColumnNames = ['developer', 'department_id', 'title', 'breadcrumb', 'comment', '@timestamp'];

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
  <IconButton onClick={onExecute} title="Сохранить" style={{ padding: '0', marginRight: '10px' }}>
    <SaveIcon />
  </IconButton>
);

CommitButton.propTypes = {
  onExecute: PropTypes.func,
};

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} style={{ padding: '0' }} title="Отменить">
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
