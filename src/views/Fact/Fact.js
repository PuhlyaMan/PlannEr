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
} from '@devexpress/dx-react-grid';
import {
  Grid,
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
import * as settings from './settings/settings.js';
import * as localisation from 'assets/data/ru.js';

const getRowId = row => row.task_id;

const contentComponent = restProps => <ContentComponent {...restProps} />;
const cellHeaderComponent = restProps => <TableCellHeader {...restProps} />;
const rowComponent = restProps => <TableRow {...restProps} />;
const sortLabelComponent = restProps => <SortLabel {...restProps} />;
const columnChooserItem = restProps => <ColumnChooserItem {...restProps} />;
const pagingPanelContainer = restProps => <PagingPanelContainer {...restProps} />;

const Fact = () => {
  const [columns, setColumns] = useState(settings.columns);
  const [data, setData] = useState([]);
  const [tableColumnExtensions, setTableColumnExtensions] = useState(settings.tableColumnExtensions);
  const [colorCalendar, setColorCalendar] = useState({});
  const [grouping, setGrouping] = useState(settings.grouping);
  const [groupingKeys, setGroupingKeys] = useState(['project_name']);
  const [editingRowIds, getEditingRowIds] = useState([]);
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
            delete newJob[0].tasks;
            return newJob;
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

  useEffect(() => {
    filtersKey.indexOf('all') !== -1 ? setFilter([]) : setFilter([{ columnName: 'task_state', value: 'Выполнено' }]);
  }, [filtersKey]);

  const onCommitChanges = ({ changed }) => {
    let changedRows;
    if (changed) {
      changedRows = data.map(row => (changed[row.task_id] ? { ...row, ...changed[row.task_id] } : row));
    }
    setData(changedRows);
  };

  //cellComponent необходим для наглядности, его можно удалить, а вместо использовать editCellComponent
  const cellComponent = useCallback(restProps => <TableCell {...restProps} colorCalendar={colorCalendar} />, [
    colorCalendar,
  ]);
  const editCellComponent = useCallback(restProps => <TableEditCell {...restProps} colorCalendar={colorCalendar} />, [
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
    <Paper>
      <Grid getRowId={getRowId} rows={data} columns={columns}>
        {/*<StateTypeProvider for={settings.stateColumns} />*/}
        <DragDropProvider />
        <EditingState
          onCommitChanges={onCommitChanges}
          columnExtensions={tableColumnExtensions}
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={getEditingRowIds}
        />
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
          height={document.body.clientHeight - 210}
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
