import React, { useEffect, useState, useCallback } from 'react';
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  GroupingState,
  IntegratedGrouping,
  EditingState,
  FilteringState,
  // eslint-disable-next-line no-unused-vars
  VirtualTableState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  // eslint-disable-next-line no-unused-vars
  Table,
  // eslint-disable-next-line no-unused-vars
  VirtualTable,
  TableHeaderRow,
  PagingPanel,
  Toolbar,
  TableGroupRow,
  SearchPanel,
  GroupingPanel,
  DragDropProvider,
  ColumnChooser,
  TableColumnVisibility,
  TableInlineCellEditing,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import TableRow from './components/Table/TableRow/TableRow.js';
import TableCell from './components/Table/TableCell/TableCell.js';
import TableEditCell from './components/TableEdit/TableEditCell/TableEditCell.js';
import TableCellHeader from './components/TableHeader/TableCellHeader/TableCellHeader.js';
import ContentComponent from './components/TableHeader/ContentComponent/ContentComponent.js';
import GroupCellContent from './components/GroupCellContent/GroupCellContent.js';
import ToolbarRoot from './components/ToolbarRoot/ToolbarRoot.js';
import SortLabel from './components/TableHeader/SortLabel/SortLabel.js';
import ColumnChooserItem from './components/ColumnChooser/ColumnChooserItem/ColumnChooserItem.js';
import PagingPanelContainer from './components/PagingPanel/PagingPanelContainer/PagingPanelContainer.js';
//import StateTypeProvider from './providers/StateTypeProvider/StateTypeProvider.js';
import { format } from 'date-fns';
import * as settings from './settings/settings.js';
import * as localisation from 'assets/data/ru.js';

const getRowId = row => row.task_id;
const contentComponent = restProps => <ContentComponent {...restProps} />;
const cellHeaderComponent = restProps => <TableCellHeader {...restProps} />;
const rowComponent = restProps => <TableRow {...restProps} />;
const sortLabelComponent = restProps => <SortLabel {...restProps} />;
const columnChooserItem = restProps => <ColumnChooserItem {...restProps} />;
const pagingPanelContainer = restProps => <PagingPanelContainer {...restProps} />;
const editCellComponent = restProps => <TableEditCell {...restProps} />;
const Root = restProps => <Grid.Root {...restProps} style={{ height: '100%' }} />;

const Fact = () => {
  const [columns, setColumns] = useState(settings.columns);
  const [data, setData] = useState([]);
  const [tableColumnExtensions, setTableColumnExtensions] = useState(settings.tableColumnExtensions);
  const [colorCalendar, setColorCalendar] = useState({});
  const [grouping, setGrouping] = useState(settings.grouping);
  const [groupingKeys, setGroupingKeys] = useState(['project_name']);
  // eslint-disable-next-line no-unused-vars
  const [editingRowIds, getEditingRowIds] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [editingCells, getEditingCells] = useState([]);
  const [filtersKey, setFilterKey] = useState([]);
  const [filters, setFilter] = useState([]);

  useEffect(() => {
    const createDefault = item => {
      let value = '';
      groupingKeys.forEach(key => (value = value + `${item[key]};`));
      return value;
    };

    import('assets/data/data.js')
      .then(dataRow => {
        const correctData = dataRow.default
          .map(job => {
            const newJob = job.tasks
              .map(task => ({
                task_id: task.id,
                task_state: task.state,
                task_name: task.name,
                task_developer: task.developer,
                task_depart_id: task.department.id,
                task_depart_title: task.department.title,
                task_depart_breadcrumb: task.department.breadcrumb,
                task_plan_start_date: task.plan.start_date,
                task_plan_finish_date: task.plan.finish_date,
                task_plan_labor: task.plan.labor,
                task_actual_start_date: task.actual.start_date,
                task_actual_finish_date: task.actual.finish_date,
                task_actual_labor: task.actual.labor,
                task_coment: task.comment,
                taskt_timestamp: task['@timestamp'],
              }))
              .map(task => ({ ...job, ...task }));
            return newJob.map(item => {
              delete item.tasks;
              return item;
            });
          })
          .reduce((previousValue, item) => [...previousValue, ...item])
          .map(item => {
            const newItem = {
              ...item,
              contract_id: item.contract.id,
              contract_name: item.contract.name,
              project_id: item.project.id,
              project_name: item.project.name,
            };
            delete newItem.contract;
            delete newItem.project;
            return newItem;
          })
          .map(item => ({ ...item, default: createDefault(item) }));
        //setData(jobsWithTasks.filter(item => item.task_state === 'В работе'));
        setData(correctData);
      })
      .catch(err => new Error(err));
  }, [groupingKeys]);

  //TODO: Пока так, надо подумать, как сделать красиво!
  useEffect(() => {
    const filter = [];
    if (filtersKey.indexOf('all') === -1)
      filter.push({ columnName: 'task_state', operation: 'notEqual', value: 'Выполнено' });
    if (filtersKey.indexOf('failure') !== -1) {
      const currentDate = format(new Date(), 'yyyy-MM-dd');
      filter.push(
        { columnName: 'task_state', operation: 'notEqual', value: 'Выполнено' },
        { columnName: 'task_plan_finish_date', operation: 'lessThan', value: currentDate }
      );
    }
    setFilter(filter);
  }, [filtersKey]);

  const onCommitChanges = ({ changed }) => {
    let changedRows;
    if (changed) {
      if (!Object.values(changed)[0]) return;
      changedRows = data.map(row => (changed[row.task_id] ? { ...row, ...changed[row.task_id] } : row));
      setData(changedRows);
    }
  };

  const cellComponent = useCallback(restProps => <TableCell {...restProps} colorCalendar={colorCalendar} />, [
    colorCalendar,
  ]);
  const groupCellContent = useCallback(restProps => <GroupCellContent {...restProps} groupingKeys={groupingKeys} />, [
    groupingKeys,
  ]);
  const rootToolbarComponent = useCallback(
    restProps => (
      <ToolbarRoot
        {...restProps}
        setColumns={setColumns}
        setTableColumnExtensions={setTableColumnExtensions}
        setColorCalendar={setColorCalendar}
        setGroupingKeys={setGroupingKeys}
        setFilterKey={setFilterKey}
      />
    ),
    []
  );

  return (
    <Paper style={{ height: document.body.clientHeight - 95 }}>
      <Grid getRowId={getRowId} rows={data} columns={columns} rootComponent={Root}>
        {/*<StateTypeProvider for={settings.stateColumns} />*/}
        <DragDropProvider />
        <EditingState onCommitChanges={onCommitChanges} columnExtensions={tableColumnExtensions} />
        <FilteringState filters={filters} />
        <SearchState />
        <SortingState columnExtensions={tableColumnExtensions} defaultSorting={settings.defaultSorting} />
        <PagingState defaultCurrentPage={0} defaultPageSize={0} />
        <GroupingState columnExtensions={tableColumnExtensions} grouping={grouping} onGroupingChange={setGrouping} />
        <IntegratedFiltering columnExtensions={tableColumnExtensions} />
        <IntegratedSorting />
        <IntegratedPaging />
        <IntegratedGrouping />
        <VirtualTable
          cellComponent={cellComponent}
          rowComponent={rowComponent}
          messages={localisation.table}
          columnExtensions={tableColumnExtensions}
          height="auto"
        />
        <TableHeaderRow
          showSortingControls
          sortLabelComponent={sortLabelComponent}
          contentComponent={contentComponent}
          cellComponent={cellHeaderComponent}
          messages={localisation.tableHeaderRow}
        />
        <TableGroupRow contentComponent={groupCellContent} />
        <TableColumnVisibility
          defaultHiddenColumnNames={settings.defaultHiddenColumnNames}
          columnExtensions={tableColumnExtensions}
          messages={localisation.tableColumnVisibility}
        />
        <Toolbar rootComponent={rootToolbarComponent} />
        <ColumnChooser messages={localisation.columnChooser} itemComponent={columnChooserItem} />
        <TableInlineCellEditing selectTextOnEditStart cellComponent={editCellComponent} />
        <GroupingPanel showGroupingControls messages={localisation.groupingPanel} />
        <SearchPanel messages={localisation.searchPanel} />
        <PagingPanel
          containerComponent={pagingPanelContainer}
          messages={localisation.pagingPanel}
          pageSizes={settings.pageSizes}
        />
      </Grid>
    </Paper>
  );
};

export default Fact;
