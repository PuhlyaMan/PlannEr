import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import {
  SearchState,
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider,
  GroupingState,
  IntegratedGrouping,
  SummaryState,
  IntegratedSummary,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  Table,
  Toolbar,
  SearchPanel,
  TableBandHeader,
  TableHeaderRow,
  TableColumnReordering,
  TableColumnResizing,
  TableFilterRow,
  TableFixedColumns,
  TableGroupRow,
  TableSummaryRow,
  GroupingPanel,
  ColumnChooser,
  TableColumnVisibility,
  DragDropProvider,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import DateRange from '@material-ui/icons/DateRange';
import IssueCard from './IssueCard/IssueCard.js';
import * as settings from './settings/settings.js';
import * as localisation from 'assets/data/ru.js';

const getRowId = row => row.id;

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  if (type === 'state') return null;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

FilterIcon.propTypes = {
  type: PropTypes.string,
};

export default function IssueTables() {
  const [data, setData] = useState([]);
  const [showIssueCard, setShow] = useState('hidden');
  const [selectedRow, setSelectedRow] = useState();

  useEffect(() => {
    import('assets/data/data.js')
      .then(dataRow => setData(dataRow.default))
      .catch(err => new Error(err));
  }, []);

  const TableRow = ({ row, ...restProps }) => {
    return (
      <Table.Row
        {...restProps}
        onDoubleClick={() => {
          setShow('visible');
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

  const setHidden = () => {
    setShow('hidden');
    setSelectedRow();
  };

  const setUpdatedTask = updatedTask => {
    const changedSelectedRow = { ...selectedRow, tasks: updatedTask };
    setSelectedRow(changedSelectedRow);
    const changedData = data.map(row => (selectedRow.id === row.id ? changedSelectedRow : row));
    setData(changedData);
  };

  //const [pageSizes] = useState([5, 10, 15, 0]);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Paper>
          <IssueCard data={selectedRow} visible={showIssueCard} setHidden={setHidden} setUpdatedTask={setUpdatedTask} />
          <Grid getRowId={getRowId} rows={data} columns={settings.columns}>
            <DragDropProvider />
            <DataTypeProvider for={settings.dateColumns} availableFilterOperations={settings.dateFilterOperations} />
            <DataTypeProvider
              editorComponent={settings.StateFilter}
              for={settings.stateColumn}
              availableFilterOperations={settings.stateFilterOperation}
            />
            <DataTypeProvider
              for={settings.numberColumns}
              availableFilterOperations={settings.currencyFilterOperations}
            />

            <SearchState />
            <FilteringState defaultFilters={[]} />
            <SortingState />
            <GroupingState />
            <PagingState defaultCurrentPage={0} defaultPageSize={5} />
            <SummaryState totalItems={settings.totalSummaryItems} groupItems={settings.totalSummaryItems} />

            <IntegratedFiltering columnExtensions={settings.filteringColumnExtensions} />
            <IntegratedSorting />
            <IntegratedGrouping />
            <IntegratedPaging />
            <IntegratedSummary />

            <VirtualTable
              height={770}
              cellComponent={settings.TableCell}
              rowComponent={TableRow}
              messages={localisation.table}
              columnExtensions={settings.tableColumnExtensions}
            />
            <TableColumnResizing defaultColumnWidths={settings.tableColumnExtensions} />
            <TableColumnReordering defaultOrder={settings.columnNames()} />
            <TableColumnVisibility defaultHiddenColumnNames={settings.defaultHiddenColumnNames} />
            <TableHeaderRow
              contentComponent={settings.ContentComponent}
              showSortingControls
              messages={localisation.tableHeaderRow}
            />
            <TableSummaryRow messages={localisation.tableSummaryRow} />
            <TableGroupRow />
            <TableFilterRow showFilterSelector messages={localisation.tableFilterRow} iconComponent={FilterIcon} />
            <TableBandHeader cellComponent={settings.TableCellBand} columnBands={settings.columnBands} />
            <TableFixedColumns cellComponent={settings.TableCellFixed} leftColumns={settings.fixedLeftColumns} />
            <Toolbar />
            <ColumnChooser messages={localisation.columnChooser} />

            <SearchPanel messages={localisation.searchPanel} />
            <GroupingPanel showGroupingControls messages={localisation.groupingPanel} />
            <PagingPanel messages={localisation.pagingPanel} pageSizes={settings.pageSizes} />
          </Grid>
        </Paper>
      </GridItem>
    </GridContainer>
  );
}
