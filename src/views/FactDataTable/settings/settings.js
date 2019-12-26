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
  { name: 'state', title: 'Статус' },
  { name: 'point', title: 'Пункт графика' },
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
];

export const tableColumnExtensions = [
  { columnName: 'work', width: 800, wordWrapEnabled: true },
  { columnName: 'work_id', width: 150, align: 'center' },
  { columnName: 'state', width: 150, align: 'center' },
  { columnName: 'point', width: 100, align: 'center', wordWrapEnabled: true },
  { columnName: 'contract_name', width: 230, align: 'center' },
  { columnName: 'project_name', width: 230, align: 'center', wordWrapEnabled: true },
];

export const pageSizes = [15, 20, 30, 0];
