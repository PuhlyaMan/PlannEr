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
  Table,
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
//import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';
import GridItem from 'components/Grid/GridItem';
import Tasks from './Tasks/Tasks.js';
import JobCard from './JobCard/JobCard.js';
import * as settings from './settings/settings.js';
import * as localisation from 'assets/data/ru.js';

const getRowId = row => row.id;

export default function Labor() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobCard, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  useEffect(() => {
    const timer = setTimeout(
      () =>
        import('assets/data/data.js')
          .then(dataRow => {
            setLoading(false);
            setData(dataRow.default);
          })
          //.then(dataRow => setData(dataRow.default.filter(item => item.state === 'В работе')))
          .catch(err => new Error(err)),
      7000
    );
    return () => clearTimeout(timer);
  }, []);

  const RowDetail = ({ row }) => {
    setSelectedRow(row);
    return <Tasks dataRow={row.tasks} setUpdatedTask={setUpdatedTask} />;
  };

  const TableRow = ({ row, ...restProps }) => {
    return (
      <Table.Row
        {...restProps}
        onDoubleClick={() => {
          setShow(true);
          setSelectedRow(row);
        }}
        style={{
          cursor: 'pointer',
          backgroundColor: settings.font(row.state),
        }}
      />
    );
  };

  TableRow.propTypes = {
    row: PropTypes.object,
  };

  RowDetail.propTypes = {
    row: PropTypes.object,
  };

  const setHidden = () => {
    setShow(false);
    setSelectedRow();
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
        {showJobCard ? <JobCard data={selectedRow} setHidden={setHidden} setUpdatedTask={setUpdatedTask} /> : null}
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
            rowComponent={TableRow}
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
        <div style={{ position: 'absolute', top: '33%', left: '47%' }}>
          <PacmanLoader size={50} color={'#FFFB67'} loading={loading} />
        </div>
      </Paper>
    </GridItem>
  );
}
