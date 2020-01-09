import { TableRowDetail } from '@devexpress/dx-react-grid';

export const columns = [
  /*{
    name: 'work',
    title: 'Работа',
    getCellValue: row => (row.name ? row.name : undefined),
  },
  {
    name: 'work_id',
    title: 'ИД',
    getCellValue: row => (row.id ? row.id : undefined),
  },*/
  { name: 'state', title: 'Статус работы' },
  { name: 'point', title: 'Пункт графика' },
  /*{
    name: 'contract_name',
    title: 'Договор',
    getCellValue: row => (row.contract ? row.contract.name : undefined),
  },*/
  {
    name: 'project_name',
    title: 'Проект',
    getCellValue: row => (row.project ? row.project.name : undefined),
  },
  {
    name: 'task_name',
    title: 'Задача',
    getCellValue: row => (row.task_name ? row.task_name : undefined),
  },
  {
    name: 'task_id',
    title: 'ИД',
    getCellValue: row => (row.task_id ? row.task_id : undefined),
  },
  {
    name: 'task_state',
    title: 'Статус задачи',
    getCellValue: row => (row.task_state ? row.task_state : undefined),
  },
  {
    name: 'plan_start_date',
    title: 'Дата начала (план)',
    getCellValue: row => (row.task_plan_start_date ? row.task_plan_start_date.slice(0, 10) : undefined),
  },
  {
    name: 'plan_finish_date',
    title: 'Дата окончания (план)',
    getCellValue: row => (row.task_plan_finish_date ? row.task_plan_finish_date.slice(0, 10) : undefined),
  },
  {
    name: 'plan_labor',
    title: 'Трудозатраты (план)',
    getCellValue: row => (row.task_plan_labor ? row.task_plan_labor : undefined),
  },
  {
    name: 'actual_start_date',
    title: 'Дата начала (факт)',
    getCellValue: row => (row.task_actual_start_date ? row.task_actual_start_date.slice(0, 10) : undefined),
  },
  {
    name: 'actual_finish_date',
    title: 'Дата окончания (факт)',
    getCellValue: row => (row.task_actual_finish_date ? row.task_actual_finish_date.slice(0, 10) : undefined),
  },
  {
    name: 'actual_labor',
    title: 'Трудозатраты (факт)',
    getCellValue: row => (row.task_actual_labor ? row.task_actual_labor : undefined),
  },
  { name: 'default', title: 'default' },
];

export const tableColumnExtensions = [
  { columnName: 'work', width: 800 },
  { columnName: 'work_id', width: 150, align: 'center' },
  { columnName: 'state', width: 150, align: 'center' },
  { columnName: 'point', width: 100, align: 'center', wordWrapEnabled: true },
  { columnName: 'contract_name', width: 230, align: 'center' },
  { columnName: 'project_name', width: 230, align: 'center', wordWrapEnabled: true },
  { columnName: 'task_name', width: 800 },
  { columnName: 'task_id', width: 150, align: 'center' },
  { columnName: 'task_state', width: 150, align: 'center' },
  { columnName: 'plan_start_date', width: 150, align: 'center', wordWrapEnabled: true },
  { columnName: 'plan_finish_date', width: 150, align: 'center', wordWrapEnabled: true },
  { columnName: 'plan_labor', width: 150, align: 'center', wordWrapEnabled: true },
  { columnName: 'actual_start_date', width: 150, align: 'center', wordWrapEnabled: true },
  { columnName: 'actual_finish_date', width: 150, align: 'center', wordWrapEnabled: true },
  { columnName: 'actual_labor', width: 150, align: 'center', wordWrapEnabled: true },
  { columnName: 'default', width: 800, wordWrapEnabled: true },
];

export const groupColumnExtensions = [{ columnName: 'default', groupingEnabled: false }];

export const pageSizes = [15, 20, 30, 0];
export const grouping = [{ columnName: 'default' }];
export const defaultHiddenColumnNames = ['state', 'point', 'project_name'];
export const visibilityColumnExtensions = [{ columnName: 'default', togglingEnabled: false }];
export const fixedLeftColumns = [TableRowDetail.COLUMN_TYPE, 'task_name'];
