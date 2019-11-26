export const columns = [
  {
    title: 'Работа',
    columns: [
      { field: 'name', title: 'Наименование работы', width: 150, bottomCalc: 'count' },
      { field: 'id', title: 'ИД работы', width: 150 },
      { field: 'state', title: 'Статус', width: 150 },
      { field: 'point', title: 'Пункт плана', width: 150 },
      { field: 'type', title: 'Тип работы', width: 150 },
      { field: 'category', title: 'Категория', width: 150 },
      { field: 'product', title: 'Продукт', width: 150 },
      { field: 'term_date', title: 'Дата начала', width: 150 },
      { field: 'author', title: 'Автор', width: 150 },
      { field: 'responsible', title: 'Ответственный', width: 150 },
      { field: 'document_code', title: 'Код документа', width: 150 },
      { field: 'suit', title: 'Иск', width: 150 },
      { field: 'contract.id', title: 'ИД контракта', width: 150 },
      { field: 'contract.name', title: 'Наименование контракта', width: 150 },
      { field: 'schedule', title: 'График', width: 150 },
      { field: 'project.id', title: 'ИД проекта', width: 150 },
      { field: 'project.name', title: 'Наименование проекта', width: 150 },
      { field: 'construction', title: 'Конструкция', width: 150 },
    ],
  },
  {
    title: 'План (по работе)',
    columns: [
      { field: 'plan.start_date', title: 'Дата начала', width: 150 },
      { field: 'plan.finish_date', title: 'Дата окончания', width: 150 },
      { field: 'plan.labor', title: 'Трудозатраты', width: 150 },
    ],
  },
  {
    title: 'Факт (по работе)',
    columns: [
      { field: 'actual.start_date', title: 'Дата начала', width: 150 },
      { field: 'actual.finish_date', title: 'Дата окончания', width: 150 },
      { field: 'actual.labor', title: 'Трудозатраты', width: 150 },
    ],
  },
  {
    title: 'Работа',
    columns: [
      { field: 'department.id', title: 'ИД отдела', width: 150 },
      { field: 'department.title', title: 'Наименование отдела', width: 150 },
      { field: 'department.breadcrumb', title: 'Отдел полностью', width: 150 },
      { field: '@timestamp', title: 'Метка времени', width: 150 },
    ],
  },
  {
    title: 'Задача',
    columns: [
      { field: 'task_id', title: 'ИД задачи', width: 150 },
      { field: 'task_state', title: 'Статус', width: 150 },
      { field: 'task_name', title: 'Наименование задачи', width: 150 },
      { field: 'task_developer', title: 'Ответственный', width: 150 },
      { field: 'task_depart_id', title: 'ИД отдела', width: 150 },
      { field: 'task_depart_title', title: 'Наименование отдела', width: 150 },
      { field: 'task_depart_breadcrumb', title: 'Отдел полностью', width: 150 },
    ],
  },
  {
    title: 'План (по задаче)',
    columns: [
      { field: 'task_plan_start_date', title: 'Дата начала задачи', width: 150 },
      { field: 'task_plan_finish_date', title: 'Дата окончания задачи', width: 150 },
      { field: 'task_plan_labor', title: 'Трудозатраты', width: 150 },
    ],
  },
  {
    title: 'Факт (по задаче)',
    columns: [
      { field: 'task_actual_start_date', title: 'Дата начала задачи', width: 150 },
      { field: 'task_actual_finish_date', title: 'Дата окончания задачи', width: 150 },
      { field: 'task_actual_labor', title: 'Трудозатраты', width: 150 },
    ],
  },
  {
    title: 'Задача',
    columns: [
      { field: 'task_coment', title: 'Коментарий', width: 150 },
      { field: 'taskt_timestamp', title: 'Метка времени', width: 150 },
    ],
  },
];
