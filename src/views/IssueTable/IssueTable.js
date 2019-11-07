import React, { useState } from 'react';
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
import { withStyles } from '@material-ui/core/styles';
import DateRange from '@material-ui/icons/DateRange';
import IssueCard from './IssueCard/IssueCard.js';
import * as settings from './settings/settings.js';
import * as localisation from './settings/ru.js';
import data from './settings/data.js';

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  if (type === 'state') return null;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

export default function IssueTables() {
  const TableRow = ({ row, ...restProps }) => {
    const font = state => {
      switch (state) {
        case 'В работе':
          return '#80cf95';
        case 'Ожидание':
          return '#ecf272';
        case 'Выполнено':
          return '#b7b8b2';
        case 'Запланировано':
          return '#7daed4';
        default:
          return '';
      }
    };
    return (
      <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        onClick={() => {
          setShow('visible');
          setSelectedRow(row);
        }}
        style={{
          cursor: 'pointer',
          backgroundColor: font(row.state),
        }}
      />
    );
  };

  const TableCellBand = ({ ...restProps }) => {
    return (
      <TableBandHeader.Cell
        {...restProps}
        style={{
          textAlign: 'center',
          fontSize: '15px',
          fontWeight: 'bold',
        }}
      />
    );
  };

  const setHidden = () => {
    setShow('hidden');
    setSelectedRow();
  };
  const [showIssueCard, setShow] = useState('hidden');
  const [selectedRow, setSelectedRow] = useState();

  //const [pageSizes] = useState([5, 10, 15, 0]);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Paper>
          <IssueCard data={selectedRow} visible={showIssueCard} setHidden={setHidden} />
          <Grid rows={data} columns={settings.columns}>
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
              //editorComponent={CurrencyEditor}
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

            <Table
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
            <TableBandHeader cellComponent={TableCellBand} columnBands={settings.columnBands} />
            <TableFixedColumns leftColumns={settings.fixedLeftColumns} />
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
