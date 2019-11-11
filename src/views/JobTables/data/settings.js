export const columns = [
  {
    headerName: 'Объект',
    field: 'subject',
    enableRowGroup: true,
    //rowGroup: true,
    //hide: true,
  },
  {
    headerName: 'Наименование',
    field: 'job',
    width: 450,
    suppressSizeToFit: true,
    //rowDrag: true,
    enableRowGroup: true,
    //rowGroup: true,
    //hide: true,
  },
  {
    headerName: 'ID работы',
    field: 'id',
  },
  {
    headerName: 'Статус',
    field: 'state',
    enableRowGroup: true,
    cellStyle: params => {
      let style = {};
      if (params.data) {
        switch (params.data.state) {
          case 'СРОКАМ ХАНА':
            style.backgroundColor = 'red';
            break;
          case 'Ожидание':
            style.backgroundColor = 'yellow';
            break;
          case 'В работе':
            style.backgroundColor = 'green';
            break;
          case 'Выполнена':
            style.backgroundColor = 'grey';
            break;
          default:
            break;
        }
      }
      return style;
    },
  },
  {
    headerName: 'Дата начала',
    field: 'startDate',
  },
  {
    headerName: 'Дата окончания',
    field: 'endDate',
  },
  {
    headerName: 'Исполнитель',
    field: 'executor',
  },
];

export const rowClassRules = {
  error: function(params) {
    let state = null;
    if (params.data) state = params.data.state;
    return state === 'СРОКАМ ХАНА';
  },
  wait: "data.state === 'Ожидание'",
  'in-work': "data.state === 'В работе'",
  complete: "data.state === 'Выполнена'",
};

export const defaultCol = {
  sortable: true,
  resizable: true,
  filter: true,
};

export const autoGroupColumnDef = {
  headerName: 'Наименование',
  field: 'issue',
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
    checkbox: true,
  },
};

const generateId = () => {
  return Math.floor(Math.random() * 100000);
};

export const rows = [
  {
    id: generateId(),
    subject: 'Курская АЭС',
    job: 'Job One',
    state: 'Выполнена',
    startDate: '2019-06-10',
    endDate: '2019-06-12',
    executor: 'Костин Сергей Станиславович',
    tasks: [
      {
        id: generateId(),
        name: 'Task One',
        state: 'В работе',
        startDate: '2019-06-10',
        endDate: '2019-06-12',
      },
      {
        id: generateId(),
        name: 'Task Two',
        state: 'Ожидание',
        startDate: '2019-06-10',
        endDate: '2019-06-12',
      },
      {
        id: generateId(),
        name: 'Task Three',
        state: 'Ожидание',
        startDate: '2019-06-10',
        endDate: '2019-06-12',
      },
    ],
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job One',
    state: 'Ожидание',
    startDate: '2019-06-10',
    endDate: '2019-06-12',
    executor: 'Костин Сергей Станиславович',
    tasks: [
      {
        id: generateId(),
        name: 'Task One',
        state: 'Выполнена',
        startDate: '2019-06-10',
        endDate: '2019-06-12',
      },
      {
        id: generateId(),
        name: 'Task Two',
        state: 'Выполнена',
        startDate: '2019-06-10',
        endDate: '2019-06-12',
      },
      {
        id: generateId(),
        name: 'Task Three',
        state: 'В работе',
        startDate: '2019-06-10',
        endDate: '2019-06-12',
      },
      {
        id: generateId(),
        name: 'Task Four',
        state: 'Ожидание',
        startDate: '2019-06-10',
        endDate: '2019-06-12',
      },
    ],
  },
  {
    id: generateId(),
    subject: 'Курская АЭС',
    job: 'Job Two',
    state: 'Ожидание',
    startDate: '2019-06-12',
    endDate: '2019-07-12',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Two',
    state: 'В работе',
    startDate: '2019-06-13',
    endDate: '2019-06-16',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'В работе',
    startDate: '2019-06-20',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'СРОКАМ ХАНА',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'В работе',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'Ожидание',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'СРОКАМ ХАНА',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'Выполнена',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'Выполнена',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'В работе',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'Ожидание',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'СРОКАМ ХАНА',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'В работе',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'Выполнена',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'Ожидание',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'Ожидание',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'В работе',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'Выполнена',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'Выполнена',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'СРОКАМ ХАНА',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'В работе',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'Ожидание',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'Выполнена',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'В работе',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    job: 'Job Three',
    state: 'СРОКАМ ХАНА',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
];
