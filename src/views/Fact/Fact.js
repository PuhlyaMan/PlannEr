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
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import TableRow from './components/TableRow/TableRow.js';
import TableCell from './components/TableCell/TableCell.js';
import TableCellHeader from './components/TableCellHeader/TableCellHeader.js';
import ContentComponent from './components/ContentComponent/ContentComponent.js';
import GroupCellContent from './components/GroupCellContent/GroupCellContent.js';
import ToolbarRoot from './components/ToolbarRoot/ToolbarRoot.js';
import SortLabel from './components/SortLabel/SortLabel.js';
import * as settings from './settings/settings.js';
import * as localisation from 'assets/data/ru.js';

const getRowId = row => row.task_id;

const Fact = () => {
  const [columns, setColumns] = useState(settings.columns);
  const [data, setData] = useState([]);
  const [tableColumnExtensions, setTableColumnExtensions] = useState(settings.tableColumnExtensions);
  const [colorCalenadr, setColorCalenadr] = useState({});
  const [grouping, setGrouping] = useState(settings.grouping);

  useEffect(() => {
    import('assets/data/data.js')
      .then(dataRow => {
        const jobsWithTasks = dataRow.default
          .map(job =>
            job.tasks
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
              .map(task => ({ ...job, ...task }))
          )
          .reduce((previousValue, item) => [...previousValue, ...item]);
        //setData(jobsWithTasks.filter(item => item.task_state === 'В работе'));
        const jobsWithTasksGroup = jobsWithTasks.map(item => ({
          ...item,
          default: `${item.id};${item.name};${item.contract.name}`,
        }));
        setData(jobsWithTasksGroup);
      })
      .catch(err => new Error(err));
  }, []);

  const cellComponent = restProps => <TableCell {...restProps} colorCalenadr={colorCalenadr} />;
  const cellHeaderComponent = restProps => <TableCellHeader {...restProps} colorCalenadr={colorCalenadr} />;
  const rowComponent = restProps => <TableRow {...restProps} />;
  const sortLabelComponent = restProps => <SortLabel {...restProps} colorCalenadr={colorCalenadr} />;
  const contentComponent = restProps => <ContentComponent {...restProps} />;
  const groupCellContent = restProps => <GroupCellContent {...restProps} />;
  const rootToolbarComponent = useCallback(
    restProps => (
      <ToolbarRoot
        {...restProps}
        setColumns={setColumns}
        setTableColumnExtensions={setTableColumnExtensions}
        setColorCalenadr={setColorCalenadr}
      />
    ),
    []
  );

  return (
    <Paper>
      <Grid getRowId={getRowId} rows={data} columns={columns}>
        <DragDropProvider />
        <SearchState />
        <SortingState columnExtensions={tableColumnExtensions} />
        <PagingState defaultCurrentPage={0} defaultPageSize={0} />
        <GroupingState
          columnExtensions={settings.groupColumnExtensions}
          grouping={grouping}
          onGroupingChange={setGrouping}
        />
        <IntegratedFiltering />
        <IntegratedSorting />
        <IntegratedPaging />
        <IntegratedGrouping />
        <VirtualTable
          cellComponent={cellComponent}
          rowComponent={rowComponent}
          messages={localisation.table}
          columnExtensions={tableColumnExtensions}
          height={document.body.clientHeight - 270}
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
          columnExtensions={settings.visibilityColumnExtensions}
        />
        <Toolbar rootComponent={rootToolbarComponent} />
        <ColumnChooser />
        <GroupingPanel showGroupingControls messages={localisation.groupingPanel} />
        <SearchPanel messages={localisation.searchPanel} />
        <PagingPanel messages={localisation.pagingPanel} pageSizes={settings.pageSizes} />
      </Grid>
    </Paper>
  );
};

export default Fact;
