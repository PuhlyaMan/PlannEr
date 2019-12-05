//import { textFilter } from 'react-bootstrap-table2-filter';
import './style.css';

export const columns = [
  {
    dataField: 'task_name',
    text: 'Наименование задачи',
    sort: true,
    title: true,
    style: {
      width: '200px',
    },
  },
  {
    dataField: 'task_id',
    text: 'ИД задачи',
    sort: true,
    align: 'center',
  },
  {
    dataField: 'task_state',
    text: 'Статус',
    sort: true,
    align: 'center',
  },
  {
    dataField: 'task_developer',
    text: 'Ответственный',
    sort: true,
  },
  {
    dataField: 'task_depart_id',
    text: 'ИД отдела',
    align: 'center',
    sort: true,
  },
  {
    dataField: 'task_depart_title',
    text: 'Наименование отдела',
    sort: true,
  },
  {
    dataField: 'task_depart_breadcrumb',
    text: 'Отдел полностью',
    sort: true,
  },
  {
    dataField: 'task_plan_start_date',
    text: 'Дата начала задачи',
    sort: true,
  },
  {
    dataField: 'task_plan_finish_date',
    text: 'Дата окончания задачи',
    sort: true,
  },
  {
    dataField: 'task_plan_labor',
    text: 'Трудозатраты',
    sort: true,
    align: 'center',
  },
  {
    dataField: 'task_actual_start_date',
    text: 'Дата начала задачи',
    sort: true,
  },
  {
    dataField: 'task_actual_finish_date',
    text: 'Дата окончания задачи',
    sort: true,
  },
  {
    dataField: 'task_actual_labor',
    text: 'Трудозатраты',
    sort: true,
    align: 'center',
  },

  {
    dataField: 'task_coment',
    text: 'Коментарий',
    sort: true,
  },
  {
    dataField: 'taskt_timestamp',
    text: 'Метка времени',
    sort: true,
  },
  {
    dataField: 'name',
    text: 'Наименование работы',
    sort: true,
  },
  {
    dataField: 'id',
    text: 'ИД работы',
    sort: true,
    align: 'center',
  },
  {
    dataField: 'state',
    text: 'Статус',
    sort: true,
    align: 'center',
  },
  {
    dataField: 'point',
    text: 'Пункт плана',
    sort: true,
    align: 'center',
  },
  {
    dataField: 'type',
    text: 'Тип работы',
    sort: true,
  },
  {
    dataField: 'category',
    text: 'Категория',
    sort: true,
  },
  {
    dataField: 'product',
    text: 'Продукт',
    sort: true,
  },
  {
    dataField: 'term_date',
    text: 'Дата начала',
    sort: true,
  },
  {
    dataField: 'author',
    text: 'Автор',
    sort: true,
  },
  {
    dataField: 'responsible',
    text: 'Ответственный',
    sort: true,
  },
  {
    dataField: 'document_code',
    text: 'Код документа',
    sort: true,
  },
  {
    dataField: 'suit',
    text: 'Иск',
    sort: true,
  },
  {
    dataField: 'contract.id',
    text: 'ИД контракта',
    sort: true,
    align: 'center',
  },
  {
    dataField: 'contract.name',
    text: 'Наименование контракта',
    sort: true,
  },
  {
    dataField: 'schedule',
    text: 'График',
    sort: true,
  },
  {
    dataField: 'project.id',
    text: 'ИД проекта',
    sort: true,
    align: 'center',
  },
  {
    dataField: 'project.name',
    text: 'Наименование проекта',
    sort: true,
  },
  {
    dataField: 'construction',
    text: 'Конструкция',
    sort: true,
  },
  {
    dataField: 'plan.start_date',
    text: 'Дата начала',
    sort: true,
  },
  {
    dataField: 'plan.finish_date',
    text: 'Дата окончания',
    sort: true,
  },
  {
    dataField: 'plan.labor',
    text: 'Трудозатраты',
    sort: true,
    align: 'center',
  },
  {
    dataField: 'actual.start_date',
    text: 'Дата начала',
    sort: true,
  },
  {
    dataField: 'actual.finish_date',
    text: 'Дата окончания',
    sort: true,
  },
  {
    dataField: 'actual.labor',
    text: 'Трудозатраты',
    sort: true,
    align: 'center',
  },
  {
    dataField: 'department.id',
    text: 'ИД отдела',
    sort: true,
    align: 'center',
  },
  {
    dataField: 'department.title',
    text: 'Наименование отдела',
    sort: true,
  },
  {
    dataField: 'department.breadcrumb',
    text: 'Отдел полностью',
    sort: true,
  },
  {
    dataField: '@timestamp',
    text: 'Метка времени',
    sort: true,
  },
];
