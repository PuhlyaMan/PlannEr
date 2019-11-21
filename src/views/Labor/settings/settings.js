import React from 'react';
import * as PropTypes from 'prop-types';
import { IntegratedFiltering } from '@devexpress/dx-react-grid';
import { Table, TableBandHeader, TableFilterRow } from '@devexpress/dx-react-grid-material-ui';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateRange from '@material-ui/icons/DateRange';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export const columns = [
  {
    name: 'work',
    title: 'Работа',
    getCellValue: row => (row.name ? row.name : undefined),
  },
  {
    name: 'work_id',
    title: 'Идентификатор',
    getCellValue: row => (row.id ? row.id : undefined),
  },
  { name: 'state', title: 'Статус' },
  { name: 'point', title: 'Пункт' },
  {
    name: 'contract_name',
    title: 'Контракт',
    getCellValue: row => (row.contract ? row.contract.name : undefined),
  },
  {
    name: 'project_name',
    title: 'Проект',
    getCellValue: row => (row.project ? row.project.name : undefined),
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
  { name: 'author', title: 'Автор' },
];

export const tableColumnExtensions = [
  { columnName: 'work', width: 566, wordWrapEnabled: true },
  { columnName: 'work_id', width: 150, align: 'center' },
  { columnName: 'state', width: 150, align: 'center' },
  { columnName: 'point', width: 100 },
  { columnName: 'contract_name', width: 200 },
  { columnName: 'project_name', width: 200, wordWrapEnabled: true },
  { columnName: 'plan_start_date', width: 150, align: 'center' },
  { columnName: 'plan_finish_date', width: 150, align: 'center' },
  { columnName: 'plan_labor', width: 150, align: 'center' },
  { columnName: 'author', width: 300, wordWrapEnabled: true },
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
});

const StateFilterBase = ({ disabled, value, onValueChange, classes }) => {
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

StateFilterBase.propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

StateFilterBase.defaultProps = {
  value: undefined,
};

export const StateFilter = withStyles(styles)(StateFilterBase);

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

export const TableRow = ({ row, ...restProps }) => {
  return (
    <Table.Row
      {...restProps}
      style={{
        cursor: 'pointer',
        backgroundColor: font(row.state),
      }}
    />
  );
};

TableRow.propTypes = {
  row: PropTypes.object,
};

const TableCellBandBase = ({ classes, className, ...restProps }) => {
  return <TableBandHeader.Cell {...restProps} className={classNames(classes.cellBand, className)} />;
};

TableCellBandBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export const TableCellBand = withStyles(styles, { name: 'TableCellBand' })(TableCellBandBase);

const TableCellBase = ({ classes, className, ...restProps }) => {
  return <Table.Cell {...restProps} className={classNames(classes.cell, className)} />;
};

TableCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export const TableCell = withStyles(styles, { name: 'Cell' })(TableCellBase);

export const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  if (type === 'state') return null;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

FilterIcon.propTypes = {
  type: PropTypes.string,
};

export const StateEditorProvider = ({ ...restProps }) => {
  return (
    <DataTypeProvider
      {...restProps}
      editorComponent={StateFilter}
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

export const defaultHiddenColumnNames = ['state', 'author'];

export const columnBands = [
  {
    title: 'План',
    children: [{ columnName: 'plan_start_date' }, { columnName: 'plan_finish_date' }, { columnName: 'plan_labor' }],
  },
];

export const pageSizes = [5, 10, 15, 0];
export const numberColumns = ['work_id', 'plan_labor'];
export const dateColumns = ['plan_start_date', 'plan_finish_date'];
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

export const defaultFilters = [{ columnName: 'state', value: 'В работе' }];
