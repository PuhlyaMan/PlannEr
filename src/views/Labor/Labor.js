import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {
  SearchState,
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  //DataTypeProvider,
  GroupingState,
  IntegratedGrouping,
  RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  Toolbar,
  SearchPanel,
  TableBandHeader,
  TableHeaderRow,
  TableRowDetail,
  TableColumnResizing,
  TableFilterRow,
  TableGroupRow,
  GroupingPanel,
  ColumnChooser,
  TableColumnVisibility,
  DragDropProvider,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import GridItem from 'components/Grid/GridItem';
import Tasks from './Tasks/Tasks.js';
import * as settings from './settings/settings.js';
import * as localisation from 'assets/data/ru.js';

const getRowId = row => row.id;

export default function Labor() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState();

  useEffect(() => {
    import('assets/data/data.js')
      .then(dataRow => setData(dataRow.default))
      .catch(err => new Error(err));
  }, []);

  const RowDetail = ({ row }) => {
    setSelectedRow(row);
    return <Tasks dataRow={row.tasks} setUpdatedTask={setUpdatedTask} />;
  };

  RowDetail.propTypes = {
    row: PropTypes.object,
  };

  const setUpdatedTask = updatedTask => {
    const changedSelectedRow = { ...selectedRow, tasks: updatedTask };
    setSelectedRow(changedSelectedRow);
    const changedData = data.map(row => (selectedRow.id === row.id ? changedSelectedRow : row));
    setData(changedData);
  };

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Paper>
        <Grid getRowId={getRowId} rows={data} columns={settings.columns}>
          <DragDropProvider />
          <settings.DateTypeProvider />
          <settings.StateEditorProvider />
          <settings.NumberTypeProvider />
          <RowDetailState />
          <SearchState />
          <FilteringState defaultFilters={settings.defaultFilters} />
          <SortingState />
          <GroupingState />
          <PagingState defaultCurrentPage={0} defaultPageSize={10} />

          <IntegratedFiltering columnExtensions={settings.filteringColumnExtensions} />
          <IntegratedSorting />
          <IntegratedGrouping />
          <IntegratedPaging />
          <VirtualTable
            cellComponent={settings.TableCell}
            rowComponent={settings.TableRow}
            messages={localisation.table}
            columnExtensions={settings.tableColumnExtensions}
            height={770}
          />
          <TableRowDetail contentComponent={RowDetail} />
          <TableColumnResizing defaultColumnWidths={settings.tableColumnExtensions} />
          <TableColumnVisibility defaultHiddenColumnNames={settings.defaultHiddenColumnNames} />
          <TableHeaderRow
            contentComponent={settings.ContentComponent}
            showSortingControls
            messages={localisation.tableHeaderRow}
          />
          <TableGroupRow />
          <TableFilterRow
            showFilterSelector
            messages={localisation.tableFilterRow}
            iconComponent={settings.FilterIcon}
          />
          <TableBandHeader cellComponent={settings.TableCellBand} columnBands={settings.columnBands} />
          <Toolbar />
          <ColumnChooser messages={localisation.columnChooser} />

          <SearchPanel messages={localisation.searchPanel} />
          <GroupingPanel showGroupingControls messages={localisation.groupingPanel} />
          <PagingPanel messages={localisation.pagingPanel} pageSizes={settings.pageSizes} />
        </Grid>
      </Paper>
    </GridItem>
  );
}
