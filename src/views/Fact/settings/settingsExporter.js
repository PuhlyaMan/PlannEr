/* eslint-disable no-unused-vars */
import saveAs from 'file-saver';
import { format } from 'date-fns';

const GREEN = 'C8EBC3';
const YELLOW = 'FAFAB9';
const GRAY = 'EDEDED';
const RED = 'FA6464';
const WHITE = 'FFFFFF';

const ALIGN_COLUMN = {
  task_id: 'left',
  contract_name: 'center',
  task_state: 'center',
  task_plan_start_date: 'center',
  task_plan_finish_date: 'center',
  task_plan_labor: 'center',
  task_actual_start_date: 'center',
  task_actual_finish_date: 'center',
  task_actual_labor: 'center',
};

export const onSave = workbook => {
  workbook.xlsx.writeBuffer().then(buffer => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Fact.xlsx');
  });
};

export const customizeCell = (cell, row, column) => {
  switch (row.task_state) {
    case 'Выполнено':
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GRAY } };
      break;
    case 'Ожидание':
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: YELLOW } };
      break;
    case 'В работе':
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
      break;
    default:
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: WHITE } };
      break;
  }

  if (column.name === 'task_plan_finish_date') {
    if (
      row.task_plan_finish_date &&
      format(new Date(row.task_plan_finish_date), 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd')
    ) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: RED } };
    }
  }

  const align = ALIGN_COLUMN[column.name];
  if (align) {
    cell.alignment = { horizontal: align };
  }
  /*if (row.task_state == 'Выполнено') {
    cell.font = { color: { argb: GREEN } };
  }*/
  /*if (row.OrderDate < new Date(2014, 2, 3)) {
    cell.font = { color: { argb: 'AAAAAA' } };
  }
  if (row.SaleAmount > 15000) {
    if (column.name === 'SaleAmount') {
      cell.font = { color: { argb: '000000' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFBB00' } };
    }
  }
  if (column.name === 'SaleAmount') {
    cell.numFmt = '$0';
  }*/
};
