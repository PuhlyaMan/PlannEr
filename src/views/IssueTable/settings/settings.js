import React from 'react';
import * as PropTypes from 'prop-types';
import { IntegratedFiltering } from '@devexpress/dx-react-grid';
import { TableFixedColumns, TableBandHeader } from '@devexpress/dx-react-grid-material-ui';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export const columns = [
  { name: 'name', title: 'Наименование работы' },
  { name: 'id', title: 'ИД работы' },
  { name: 'state', title: 'Статус' },
  { name: 'point', title: 'Пункт плана' },
  { name: 'type', title: 'Тип работы' },
  { name: 'category', title: 'Категория' },
  { name: 'product', title: 'Продукт' },
  { name: 'term_date', title: 'Дата начала' },
  { name: 'author', title: 'Автор' },
  { name: 'responsible', title: 'Ответственный' },
  { name: 'document_code', title: 'Код документа' },
  { name: 'suit', title: 'Иск' },
  {
    name: 'contract_id',
    title: 'ИД контракта',
    getCellValue: row => (row.contract ? row.contract.id : undefined),
  },
  {
    name: 'contract_name',
    title: 'Наименование контракта',
    getCellValue: row => (row.contract ? row.contract.name : undefined),
  },
  { name: 'schedule', title: 'График' },
  {
    name: 'project_id',
    title: 'ИД проекта',
    getCellValue: row => (row.project ? row.project.id : undefined),
  },
  {
    name: 'project_name',
    title: 'Наименование проекта',
    getCellValue: row => (row.project ? row.project.name : undefined),
  },
  { name: 'construction', title: 'Конструкция' },
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
  {
    name: 'department_id',
    title: 'ИД отдела',
    getCellValue: row => (row.actual ? row.department.id : undefined),
  },
  {
    name: 'department_title',
    title: 'Наименование отдела',
    getCellValue: row => (row.department ? row.department.title : undefined),
  },
  {
    name: 'breadcrumb',
    title: 'Цепочка',
    getCellValue: row => (row.department ? row.department.breadcrumb : undefined),
  },
  { name: '@timestamp', title: 'Метка времени' },
];

export const tableColumnExtensions = [
  { columnName: 'name', width: 600, wordWrapEnabled: true },
  { columnName: 'id', width: 150, align: 'center' },
  { columnName: 'state', width: 150 },
  { columnName: 'point', width: 150 },
  { columnName: 'type', width: 200, wordWrapEnabled: true },
  { columnName: 'category', width: 150, align: 'center' },
  { columnName: 'product', width: 150, align: 'center' },
  { columnName: 'term_date', width: 150, align: 'center' },
  { columnName: 'author', width: 200, wordWrapEnabled: true },
  { columnName: 'responsible', width: 200, wordWrapEnabled: true },
  { columnName: 'document_code', width: 150, wordWrapEnabled: true },
  { columnName: 'suit', width: 200, wordWrapEnabled: true },
  { columnName: 'contract_id', width: 150, align: 'center' },
  { columnName: 'contract_name', width: 200 },
  { columnName: 'schedule', width: 200 },
  { columnName: 'project_id', width: 150, align: 'center' },
  { columnName: 'project_name', width: 200 },
  { columnName: 'construction', width: 150, align: 'center' },
  { columnName: 'plan_start_date', width: 150, align: 'center' },
  { columnName: 'plan_finish_date', width: 150, align: 'center' },
  { columnName: 'plan_labor', width: 150, align: 'center' },
  { columnName: 'actual_start_date', width: 150, align: 'center' },
  { columnName: 'actual_finish_date', width: 150, align: 'center' },
  { columnName: 'actual_labor', width: 150, align: 'center' },
  { columnName: 'department_id', width: 150, align: 'center' },
  { columnName: 'department_title', width: 150 },
  { columnName: 'breadcrumb', width: 250 },
  { columnName: '@timestamp', width: 200, align: 'center' },
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

const StateFilterBase = ({ value, onValueChange, classes }) => {
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
      className={classes.selectState}
      labelId="stateLabel"
      id="stateSelect"
      value={value === undefined ? '' : value}
      onChange={handleChange}
    >
      <MenuItem value="">Все</MenuItem>
      <MenuItem value="Новая">Новая</MenuItem>
      <MenuItem value="Запланировано">Запланировано</MenuItem>
      <MenuItem value="Выполнено">Выполнено</MenuItem>
      <MenuItem value="В работе">В работе</MenuItem>
      <MenuItem value="Ожидание">Ожидание</MenuItem>
    </Select>
  );
};

StateFilterBase.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
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

export const TableCellFixed = ({ ...restProps }) => {
  const row = restProps.tableRow.row;
  return (
    <TableFixedColumns.Cell
      {...restProps}
      style={{
        backgroundColor: row ? font(row.state) : '#fff',
        padding: '5px 10px',
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

export const defaultHiddenColumnNames = [
  'type',
  'category',
  'product',
  'term_date',
  'author',
  'responsible',
  'document_code',
  'suit',
  'contract_id',
  'schedule',
  'project_id',
  'construction',
  'department_id',
  'department_title',
  'breadcrumb',
  '@timestamp',
];

export const columnBands = [
  {
    title: 'Контракт',
    children: [{ columnName: 'contract_id' }, { columnName: 'contract_name' }],
  },
  {
    title: 'Проект',
    children: [{ columnName: 'project_id' }, { columnName: 'project_name' }],
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
  {
    title: 'Отдел',
    children: [{ columnName: 'department_id' }, { columnName: 'department_title' }, { columnName: 'breadcrumb' }],
  },
];

export const pageSizes = [5, 10, 15, 0];

export const numberColumns = ['id', 'contract_id', 'project_id', 'plan_labor', 'actual_labor', 'department_id'];
export const dateColumns = [
  'term_date',
  'plan_start_date',
  'plan_finish_date',
  'actual_start_date',
  'actual_finish_date',
  '@timestamp',
];
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
