import React, { useState, useEffect } from 'react';
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  GroupingState,
  IntegratedGrouping,
  RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  PagingPanel,
  Toolbar,
  TableGroupRow,
  GroupingPanel,
  DragDropProvider,
  SearchPanel,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import TableRow from './components/TableRow/TableRow.js';
import TableCell from './components/TableCell/TableCell.js';
import TableCellHeader from './components/TableCellHeader/TableCellHeader.js';
import RowDetail from './components/RowDetail/RowDetail.js';
import * as settings from './settings/settings.js';
import * as localisation from 'assets/data/ru.js';

const getRowId = row => row.id;

const FactDataTable = () => {
  const [columns] = useState(settings.columns);
  const [rows, setRows] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedRow, setSelectedRow] = useState();

  useEffect(() => {
    const timer = setTimeout(
      () =>
        import('assets/data/data.js')
          .then(dataRow => {
            //setLoading(false);
            setRows(dataRow.default);
          })
          //.then(dataRow => setData(dataRow.default.filter(item => item.state === 'В работе')))
          .catch(err => new Error(err)),
      1000
    );
    return () => clearTimeout(timer);
  }, []);

  const cellComponent = restProps => <TableCell {...restProps} />;
  const cellHeaderComponent = restProps => <TableCellHeader {...restProps} />;
  const rowComponent = restProps => <TableRow {...restProps} />;
  const contentComponent = restProps => <RowDetail setSelectedRow={setSelectedRow} {...restProps} />;

  return (
    <Paper>
      <Grid getRowId={getRowId} rows={rows} columns={columns}>
        <DragDropProvider />
        <SearchState />
        <SortingState />
        <PagingState defaultCurrentPage={0} defaultPageSize={15} />
        <GroupingState />
        <RowDetailState />
        <IntegratedFiltering />
        <IntegratedSorting />
        <IntegratedPaging />
        <IntegratedGrouping />
        <VirtualTable
          cellComponent={cellComponent}
          rowComponent={rowComponent}
          messages={localisation.table}
          columnExtensions={settings.tableColumnExtensions}
          height={document.body.clientHeight - 270}
        />
        <TableHeaderRow
          showSortingControls
          cellComponent={cellHeaderComponent}
          messages={localisation.tableHeaderRow}
        />
        <TableRowDetail contentComponent={contentComponent} />
        <TableGroupRow />
        <Toolbar />
        <GroupingPanel showGroupingControls messages={localisation.groupingPanel} />
        <SearchPanel messages={localisation.searchPanel} />
        <PagingPanel messages={localisation.pagingPanel} pageSizes={settings.pageSizes} />
      </Grid>
    </Paper>
  );
};

export default FactDataTable;
