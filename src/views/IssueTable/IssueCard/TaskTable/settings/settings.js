import React from 'react';
import * as PropTypes from 'prop-types';
import { IntegratedFiltering } from '@devexpress/dx-react-grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
    getCellValue: row => (row.actual ? row.department.id : undefined),
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
