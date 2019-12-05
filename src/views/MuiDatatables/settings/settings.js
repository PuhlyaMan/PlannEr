import { createMuiTheme } from '@material-ui/core/styles';
import './style.css';

export const columns = [
  {
    name: 'task_name',
    label: 'Наименование задачи',
    options: {
      filter: true,
      customFilterListOptions: { render: v => `Наименование задачи: ${v}` },
      viewColumns: false,
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            backgroundColor: 'aliceblue',
            zIndex: 101,
            minWidth: '450px',
            width: '600px',
            left: '34px',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
          },
        };
      },
      setCellProps: () => {
        return {
          style: {
            backgroundColor: 'aliceblue',
            textAlign: 'left',
            position: 'sticky',
            left: '34px',
          },
        };
      },
    },
  },
  {
    name: 'task_id',
    label: 'ИД задачи',
    options: {
      filter: true,
      customFilterListOptions: { render: v => `ИД задачи: ${v}` },
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '80px',
          },
        };
      },
    },
  },
  {
    name: 'task_state',
    label: 'Статус задачи',
    options: {
      filter: true,
      filterList: ['В работе'],
      filterType: 'dropdown',
      customFilterListOptions: { render: v => `Статус задачи: ${v}` },
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '100px',
          },
        };
      },
    },
  },
  {
    name: 'task_plan_start_date',
    label: 'Дата начала задачи (план)',
    options: {
      filter: true,
      customFilterListOptions: { render: v => `Дата начала задачи (план): ${v}` },
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '150px',
          },
        };
      },
    },
  },
  {
    name: 'task_plan_finish_date',
    label: 'Дата окончания задачи (план)',
    options: {
      filter: true,
      customFilterListOptions: { render: v => `Дата окончания задачи (план): ${v}` },
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '150px',
          },
        };
      },
    },
  },
  {
    name: 'task_plan_labor',
    label: 'Трудозатраты (план)',
    options: {
      filter: true,
      customFilterListOptions: { render: v => `Трудозатраты (план): ${v}` },
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '80px',
          },
        };
      },
    },
  },
  {
    name: 'task_actual_start_date',
    label: 'Дата начала задачи (факт)',
    options: {
      filter: true,
      customFilterListOptions: { render: v => `Дата начала задачи (факт): ${v}` },
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '150px',
          },
        };
      },
    },
  },
  {
    name: 'task_actual_finish_date',
    label: 'Дата окончания задачи (факт)',
    options: {
      filter: true,
      customFilterListOptions: { render: v => `Дата окончания задачи (факт): ${v}` },
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '150px',
          },
        };
      },
    },
  },
  {
    name: 'task_actual_labor',
    label: 'Трудозатраты (факт)',
    options: {
      filter: true,
      customFilterListOptions: { render: v => `Трудозатраты (факт): ${v}` },
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '80px',
          },
        };
      },
    },
  },
  {
    name: 'point',
    label: 'Пункт графика',
    options: {
      filter: true,
      customFilterListOptions: { render: v => `Пункт графика: ${v}` },
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '80px',
          },
        };
      },
    },
  },
  {
    name: 'contract.name',
    label: 'Наименование контракта',
    options: {
      filter: true,
      filterType: 'multiselect',
      customFilterListOptions: { render: v => `Наименование контракта: ${v}` },
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '150px',
          },
        };
      },
    },
  },
  {
    name: 'project.name',
    label: 'Наименование проекта',
    options: {
      filter: true,
      filterType: 'multiselect',
      customFilterListOptions: { render: v => `Наименование проекта: ${v}` },
      sort: true,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '150px',
          },
        };
      },
    },
  },
  {
    name: 'task_coment',
    label: 'Коментарий',
    options: {
      filter: false,
      sort: false,
      display: false,
      searchable: false,
      setCellHeaderProps: () => {
        return {
          style: {
            minWidth: '250px',
            width: '400px',
          },
        };
      },
    },
  },
  {
    name: 'task_developer',
    label: 'Ответственный',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'task_depart_id',
    label: 'ИД отдела',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'task_depart_title',
    label: 'Наименование отдела',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'task_depart_breadcrumb',
    label: 'Отдел полностью',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'taskt_timestamp',
    label: 'Метка времени',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'name',
    label: 'Наименование работы',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'id',
    label: 'ИД работы',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'state',
    label: 'Статус',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'type',
    label: 'Тип работы',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'category',
    label: 'Категория',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'product',
    label: 'Продукт',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'term_date',
    label: 'Дата начала',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'author',
    label: 'Автор',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'responsible',
    label: 'Ответственный',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'document_code',
    label: 'Код документа',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'suit',
    label: 'Иск',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'contract.id',
    label: 'ИД контракта',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'schedule',
    label: 'График',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'project.id',
    label: 'ИД проекта',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'construction',
    label: 'Конструкция',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'plan.start_date',
    label: 'Дата начала',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'plan.finish_date',
    label: 'Дата окончания',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'plan.labor',
    label: 'Трудозатраты',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'actual.start_date',
    label: 'Дата начала',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'actual.finish_date',
    label: 'Дата окончания',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'actual.labor',
    label: 'Трудозатраты',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'department.id',
    label: 'ИД отдела',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'department.title',
    label: 'Наименование отдела',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: 'department.breadcrumb',
    label: 'Отдел полностью',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
  {
    name: '@timestamp',
    label: 'Метка времени',
    options: {
      filter: false,
      sort: true,
      display: 'excluded',
      searchable: false,
    },
  },
];

export const local = {
  body: {
    noMatch: 'Извините, совпадения не найдены',
    toolTip: 'Сортировать',
    columnHeaderTooltip: column => `Сортировать по ${column.label}`,
  },
  pagination: {
    next: 'Следующая страница',
    previous: 'Предыдущая страница',
    rowsPerPage: 'Строк на странице:',
    displayRows: 'из',
  },
  toolbar: {
    search: 'Поиск',
    downloadCsv: 'Скачать CSV',
    print: 'Печать',
    viewColumns: 'Показать столбцы',
    filterTable: 'Фильтровать таблицу',
  },
  filter: {
    all: 'Все',
    title: 'Фильтры',
    reset: 'Сбросить',
  },
  viewColumns: {
    title: 'Показать столбцы',
    titleAria: 'Показать/Скрыть столбцы таблицы',
  },
  selectedRows: {
    text: 'выбранных строк',
    delete: 'Удалить',
    deleteAria: 'Удалить выбранные столбцы',
  },
};

export const font = state => {
  switch (state) {
    case 'В работе':
      return '#80cf95';
    case 'Ожидание':
      return '#ecf272';
    case 'Выполнено':
      return '#b7b8b2';
    case 'Запланировано':
      return '#7daed4';
    case 'Новая':
      return '#fff';
    default:
      return '';
  }
};

export const myTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTableSelectCell: {
        root: {
          padding: '5px',
          '& div .MuiIconButton-root': {
            padding: '0px',
          },
        },
      },
      MUIDataTableHeadCell: {
        data: {
          margin: 'auto',
        },
        root: {
          padding: '5px',
          fontSize: '12px',
          fontWeight: 'bold',
          textAlign: 'center',
        },
      },
      MUIDataTableFilterList: {
        root: {
          minHeight: '38px',
          margin: '0px 16px 5px 16px',
        },
      },
      MUIDataTableBodyRow: {
        root: {
          backgroundColor: '#FFF',
        },
      },
      MUIDataTableBodyCell: {
        root: {
          padding: '5px',
          fontSize: '12px',
          textAlign: 'center',
        },
      },
      MUIDataTable: {
        responsiveScrollMaxHeight: {
          minHeight: '300px',
          maxHeight: 'calc(100vh - 300px)',
        },
      },
      MuiTypography: {
        body2: {
          fontSize: '12px',
        },
      },
      MuiTablePagination: {
        select: {
          fontSize: '12px',
        },
      },
    },
  });
