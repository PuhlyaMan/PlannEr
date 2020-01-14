export const columns = [
  {
    name: 'work',
    title: 'Работа',
    getCellValue: row => (row.name ? row.name : undefined),
  },
  {
    name: 'work_id',
    title: 'ИД',
    getCellValue: row => (row.id ? row.id : undefined),
  },
  { name: 'state', title: 'Статус работы' },
  { name: 'point', title: 'Пункт графика' },
  {
    name: 'contract_name',
    title: 'Договор',
    getCellValue: row => (row.contract ? row.contract.name : undefined),
  },
  {
    name: 'project_name',
    title: 'Проект',
    getCellValue: row => (row.project ? row.project.name : undefined),
  },
  { name: 'task_name', title: 'Задача' },
  { name: 'task_id', title: 'ИД' },
  { name: 'task_state', title: 'Статус' },
  {
    name: 'task_plan_start_date',
    title: 'Дата начала (план)',
    getCellValue: row => (row.task_plan_start_date ? row.task_plan_start_date.slice(0, 10) : undefined),
  },
  {
    name: 'task_plan_finish_date',
    title: 'Дата окончания (план)',
    getCellValue: row => (row.task_plan_finish_date ? row.task_plan_finish_date.slice(0, 10) : undefined),
  },
  { name: 'task_plan_labor', title: 'Трудозатраты (план)' },
  {
    name: 'task_actual_start_date',
    title: 'Дата начала (факт)',
    getCellValue: row => (row.task_actual_start_date ? row.task_actual_start_date.slice(0, 10) : undefined),
  },
  {
    name: 'task_actual_finish_date',
    title: 'Дата окончания (факт)',
    getCellValue: row => (row.task_actual_finish_date ? row.task_actual_finish_date.slice(0, 10) : undefined),
  },
  { name: 'task_actual_labor', title: 'Трудозатраты (факт)' },
  { name: 'calc', title: 'Рассчитать' },
  { name: 'default', title: 'default' },
];

export const tableColumnExtensions = [
  { columnName: 'work', width: 800, togglingEnabled: false },
  { columnName: 'work_id', width: 150, align: 'center', togglingEnabled: false },
  { columnName: 'state', width: 150, align: 'center', togglingEnabled: false, editingEnabled: false },
  {
    columnName: 'point',
    width: 100,
    align: 'center',
    togglingEnabled: false,
    wordWrapEnabled: true,
    editingEnabled: false,
  },
  { columnName: 'contract_name', width: 230, align: 'center', togglingEnabled: false },
  {
    columnName: 'project_name',
    width: 230,
    align: 'center',
    togglingEnabled: false,
    wordWrapEnabled: true,
    editingEnabled: false,
  },
  { columnName: 'task_name', width: 800, editingEnabled: false },
  { columnName: 'task_id', width: 110, align: 'center', editingEnabled: false },
  { columnName: 'task_state', width: 110, align: 'center', editingEnabled: false },
  { columnName: 'task_plan_start_date', width: 150, align: 'center', wordWrapEnabled: true, editingEnabled: false },
  { columnName: 'task_plan_finish_date', width: 150, align: 'center', wordWrapEnabled: true, editingEnabled: false },
  { columnName: 'task_plan_labor', width: 150, align: 'center', wordWrapEnabled: true, editingEnabled: false },
  { columnName: 'task_actual_start_date', width: 150, align: 'center', wordWrapEnabled: true, editingEnabled: false },
  { columnName: 'task_actual_finish_date', width: 150, align: 'center', wordWrapEnabled: true, editingEnabled: false },
  { columnName: 'task_actual_labor', width: 150, align: 'center', wordWrapEnabled: true, editingEnabled: false },
  {
    columnName: 'calc',
    width: 100,
    align: 'center',
    sortingEnabled: false,
    filteringEnabled: false,
    togglingEnabled: false,
    groupingEnabled: false,
    editingEnabled: false,
  },
  {
    columnName: 'default',
    width: 800,
    wordWrapEnabled: true,
    togglingEnabled: false,
    groupingEnabled: false,
    editingEnabled: false,
  },
];

export const pageSizes = [15, 20, 30, 0];
export const grouping = [{ columnName: 'default' }];
export const defaultHiddenColumnNames = [
  'work',
  'work_id',
  'state',
  'point',
  'contract_name',
  'project_name',
  'task_plan_start_date',
  'task_plan_labor',
  'task_actual_start_date',
  'task_actual_finish_date',
  'task_actual_labor',
];

export const stateColumns = ['task_state'];
