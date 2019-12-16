import React from 'react';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
//import './style.css';

export const font = state => {
  switch (state) {
    case 'В работе':
      return { backgroundColor: '#80cf95' };
    case 'Ожидание':
      return { backgroundColor: '#ecf272' };
    case 'Выполнено':
      return { backgroundColor: '#b7b8b2' };
    case 'Запланировано':
      return { backgroundColor: '#7daed4' };
    case 'Новая':
      return { backgroundColor: '#fff' };
    default:
      return {};
  }
};

const selectOptionsTaskState = [
  { value: 'В работе', label: 'В работе' },
  { value: 'Ожидание', label: 'Ожидание' },
  { value: 'Выполнено', label: 'Выполнено' },
];

const dateFormatter = cell => (cell ? <span>{cell.slice(0, 10)}</span> : <span>{cell}</span>);

export const columns = [
  {
    dataField: 'task_name',
    text: 'Наименование задачи',
    sort: true,
    title: true,
    filter: textFilter({
      placeholder: ' ',
    }),
    classes: 'fixed-task-name-column',
    headerClasses: 'fixed-task-name-column-header align-center',
  },
  {
    dataField: 'task_id',
    text: 'ИД задачи',
    sort: true,
    align: 'center',
    visibleToggle: true,
    classes: 'task-id-column',
    headerClasses: 'task-id-column-header align-center',
    filter: textFilter({
      placeholder: ' ',
    }),
  },
  {
    dataField: 'task_state',
    text: 'Статус',
    sort: true,
    align: 'center',
    visibleToggle: true,
    classes: 'task-state-column',
    headerClasses: 'task-state-column-header align-center',
    formatter: cell => selectOptionsTaskState.filter(opt => opt.value === cell)[0].label || '',
    filter: selectFilter({
      placeholder: 'Все',
      options: selectOptionsTaskState,
      defaultValue: 'В работе',
    }),
  },
  {
    dataField: 'task_plan_start_date',
    text: 'Дата начала задачи (План)',
    sort: true,
    align: 'center',
    visibleToggle: true,
    classes: 'task-date-column',
    headerClasses: 'task-date-column-header align-center',
    formatter: dateFormatter,
    filter: textFilter({
      placeholder: ' ',
    }),
  },
  {
    dataField: 'task_plan_finish_date',
    text: 'Дата окончания задачи (План)',
    sort: true,
    align: 'center',
    visibleToggle: true,
    classes: 'task-date-column',
    headerClasses: 'task-date-column-header align-center',
    formatter: dateFormatter,
    filter: textFilter({
      placeholder: ' ',
    }),
  },
  {
    dataField: 'task_plan_labor',
    text: 'Трудозатраты (План)',
    sort: true,
    align: 'center',
    visibleToggle: true,
    classes: 'task-labor-column',
    headerClasses: 'task-labor-column-header align-center',
    filter: textFilter({
      placeholder: ' ',
    }),
  },
  {
    dataField: 'task_actual_start_date',
    text: 'Дата начала задачи (Факт)',
    sort: true,
    align: 'center',
    visibleToggle: true,
    classes: 'task-date-column',
    headerClasses: 'task-date-column-header align-center',
    formatter: dateFormatter,
    filter: textFilter({
      placeholder: ' ',
    }),
  },
  {
    dataField: 'task_actual_finish_date',
    text: 'Дата окончания задачи (Факт)',
    sort: true,
    align: 'center',
    visibleToggle: true,
    classes: 'task-date-column',
    headerClasses: 'task-date-column-header align-center',
    formatter: dateFormatter,
    filter: textFilter({
      placeholder: ' ',
    }),
  },
  {
    dataField: 'task_actual_labor',
    text: 'Трудозатраты (Факт)',
    sort: true,
    align: 'center',
    visibleToggle: true,
    classes: 'task-labor-column',
    headerClasses: 'task-labor-column-header align-center',
    filter: textFilter({
      placeholder: ' ',
    }),
  },
  {
    dataField: 'point',
    text: 'Пункт граффика',
    sort: true,
    align: 'center',
    visibleToggle: true,
    classes: 'point-column',
    headerClasses: 'point-column-header align-center',
    filter: textFilter({
      placeholder: ' ',
    }),
  },
  {
    dataField: 'contract.name',
    text: 'Наименование контракта',
    sort: true,
    align: 'center',
    visibleToggle: true,
    classes: 'contract-name-column',
    headerClasses: 'contract-name-column-header align-center',
    filter: textFilter({
      placeholder: ' ',
    }),
  },
  {
    dataField: 'project.name',
    text: 'Наименование проекта',
    align: 'center',
    visibleToggle: true,
    classes: 'project-name-column',
    headerClasses: 'project-name-column-header align-center',
    filter: textFilter({
      placeholder: ' ',
    }),
  },
  {
    dataField: 'task_coment',
    text: 'Коментарий',
    sort: true,
    hidden: true,
    visibleToggle: true,
    classes: 'task-coment-column',
    headerClasses: 'task-coment-column-header align-center',
    filter: textFilter({
      placeholder: ' ',
    }),
  },
  {
    dataField: 'task_developer',
    text: 'Ответственный',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'task_depart_id',
    text: 'ИД отдела',
    align: 'center',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'task_depart_title',
    text: 'Наименование отдела',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'task_depart_breadcrumb',
    text: 'Отдел полностью',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'taskt_timestamp',
    text: 'Метка времени',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'name',
    text: 'Наименование работы',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'id',
    text: 'ИД работы',
    sort: true,
    align: 'center',
    hidden: true,
  },
  {
    dataField: 'state',
    text: 'Статус',
    sort: true,
    align: 'center',
    hidden: true,
  },
  {
    dataField: 'type',
    text: 'Тип работы',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'category',
    text: 'Категория',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'product',
    text: 'Продукт',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'term_date',
    text: 'Дата начала',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'author',
    text: 'Автор',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'responsible',
    text: 'Ответственный',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'document_code',
    text: 'Код документа',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'suit',
    text: 'Иск',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'contract.id',
    text: 'ИД контракта',
    sort: true,
    hidden: true,
    align: 'center',
  },
  {
    dataField: 'schedule',
    text: 'График',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'project.id',
    text: 'ИД проекта',
    sort: true,
    align: 'center',
    hidden: true,
  },
  {
    dataField: 'construction',
    text: 'Конструкция',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'plan.start_date',
    text: 'Дата начала',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'plan.finish_date',
    text: 'Дата окончания',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'plan.labor',
    text: 'Трудозатраты',
    sort: true,
    align: 'center',
    hidden: true,
  },
  {
    dataField: 'actual.start_date',
    text: 'Дата начала',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'actual.finish_date',
    text: 'Дата окончания',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'actual.labor',
    text: 'Трудозатраты',
    sort: true,
    align: 'center',
    hidden: true,
  },
  {
    dataField: 'department.id',
    text: 'ИД отдела',
    sort: true,
    align: 'center',
    hidden: true,
  },
  {
    dataField: 'department.title',
    text: 'Наименование отдела',
    sort: true,
    hidden: true,
  },
  {
    dataField: 'department.breadcrumb',
    text: 'Отдел полностью',
    sort: true,
    hidden: true,
  },
  {
    dataField: '@timestamp',
    text: 'Метка времени',
    sort: true,
    hidden: true,
  },
];
