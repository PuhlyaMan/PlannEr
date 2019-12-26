export const columns = [
  {
    name: 'task_name',
    title: 'Задача',
    getCellValue: row => (row.name ? row.name : undefined),
  },
  {
    name: 'task_id',
    title: 'ИД',
    getCellValue: row => (row.id ? row.id : undefined),
  },
  {
    name: 'task_state',
    title: 'Статус',
    getCellValue: row => (row.state ? row.state : undefined),
  },
  {
    name: 'plan_start_date',
    title: 'Дата начала (план)',
    getCellValue: row => (row.plan.start_date ? row.plan.start_date.slice(0, 10) : undefined),
  },
  {
    name: 'plan_finish_date',
    title: 'Дата окончания (план)',
    getCellValue: row => (row.plan.finish_date ? row.plan.finish_date.slice(0, 10) : undefined),
  },
  {
    name: 'plan_labor',
    title: 'Трудозатраты (план)',
    getCellValue: row => (row.plan ? row.plan.labor : undefined),
  },
  {
    name: 'actual_start_date',
    title: 'Дата начала (факт)',
    getCellValue: row => (row.actual.start_date ? row.actual.start_date.slice(0, 10) : undefined),
  },
  {
    name: 'actual_finish_date',
    title: 'Дата окончания (факт)',
    getCellValue: row => (row.actual.finish_date ? row.actual.finish_date.slice(0, 10) : undefined),
  },
  {
    name: 'actual_labor',
    title: 'Трудозатраты (факт)',
    getCellValue: row => (row.actual ? row.actual.labor : undefined),
  },
];

export const tableColumnExtensions = [
  { columnName: 'task_name', width: 800, wordWrapEnabled: true },
  { columnName: 'task_id', width: 150, align: 'center' },
  { columnName: 'task_state', width: 150, align: 'center' },
  { columnName: 'plan_start_date', width: 150, align: 'center', wordWrapEnabled: true },
  { columnName: 'plan_finish_date', width: 150, align: 'center', wordWrapEnabled: true },
  { columnName: 'plan_labor', width: 150, align: 'center', wordWrapEnabled: true },
  { columnName: 'actual_start_date', width: 150, align: 'center', wordWrapEnabled: true },
  { columnName: 'actual_finish_date', width: 150, align: 'center', wordWrapEnabled: true },
  { columnName: 'actual_labor', width: 150, align: 'center', wordWrapEnabled: true },
];

export const pageSizes = [5, 10];
export const fixedLeftColumns = ['task_name'];
