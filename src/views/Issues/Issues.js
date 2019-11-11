import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import DateRange from '@material-ui/icons/DateRange';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  TableSummaryRow,
  GroupingPanel,
  Toolbar,
  PagingPanel,
  TableFilterRow,
  SearchPanel,
  ColumnChooser,
  TableColumnVisibility,
  DragDropProvider,
  TableColumnResizing,
  TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SearchState,
  SortingState,
  IntegratedSorting,
  GroupingState,
  IntegratedGrouping,
  PagingState,
  SummaryState,
  IntegratedSummary,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import {
  columns,
  rows,
  colWidths,
  colAlign as align,
  CurrencyEditor,
  ContentComponent,
  Title,
} from './data/settings.js';
import * as localisation from './data/localisationRu.js';

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

const columnNames = () => {
  let names = [];
  columns.map(item => {
    names.push(item['name']);
  });
  return names;
};

export default function Issues() {
  const [columnOrder, setColumnOrder] = useState(columnNames);
  const [sorting] = useState([{ columnName: 'endDate', direction: 'asc' }]);
  const [columnWidths, setColumnWidths] = useState(colWidths);
  const [summaryItems] = useState([
    { columnName: 'issue', type: 'count' },
    //{ columnName: 'amount', type: 'max' },
    //{ columnName: 'amount', type: 'sum' },
  ]);
  const [grouping] = useState([{ columnName: 'subject' }]);
  const [groupingStateColumnExtensions] = useState([{ columnName: 'issue', groupingEnabled: false }]);
  const [pageSizes] = useState([5, 10, 20, 0]);
  const [dateColumns] = useState(['startDate', 'endDate']);
  const [dateFilterOperations] = useState(['month', 'contains', 'startsWith', 'endsWith']);
  const [currencyColumns] = useState(['id']);
  const [currencyFilterOperations] = useState([
    'equal',
    'notEqual',
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
  ]);

  const datePredicate = (value, filter, row) => {
    if (!filter.value.length) return true;
    if (filter && filter.operation === 'month') {
      const month = parseInt(value.split('-')[1], 10);
      return month === parseInt(filter.value, 10);
    }
    return IntegratedFiltering.defaultPredicate(value, filter, row);
  };

  const [filteringColumnExtensions] = useState([
    {
      columnName: 'startDate',
      predicate: datePredicate,
    },
    {
      columnName: 'endDate',
      predicate: datePredicate,
    },
  ]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Paper>
          <Grid rows={rows} columns={columns}>
            <DragDropProvider />

            <FilteringState />
            <SearchState />
            <SortingState defaultSorting={sorting} />
            <GroupingState defaultGrouping={grouping} columnExtensions={groupingStateColumnExtensions} />
            <SummaryState totalItems={summaryItems} groupItems={summaryItems} />
            <PagingState defaultPageSize={5} />

            <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
            <IntegratedSorting />
            <IntegratedGrouping />
            <IntegratedSummary />
            <IntegratedPaging />

            <DataTypeProvider for={dateColumns} availableFilterOperations={dateFilterOperations} />
            <DataTypeProvider
              for={currencyColumns}
              availableFilterOperations={currencyFilterOperations}
              //editorComponent={CurrencyEditor}
            />

            <Table messages={localisation.table} columnExtensions={align} />
            <TableColumnResizing
              columnWidths={columnWidths}
              onColumnWidthsChange={setColumnWidths}
              minColumnWidth={100}
            />
            <TableColumnReordering order={columnOrder} onOrderChange={setColumnOrder} />
            <TableHeaderRow
              showSortingControls
              messages={localisation.tableHeaderRow}
              contentComponent={ContentComponent}
              //titleComponent={Title}
            />
            <TableColumnVisibility messages={localisation.tableColumnVisibility} />
            <TableFilterRow showFilterSelector iconComponent={FilterIcon} messages={localisation.tableFilterRow} />
            <TableGroupRow />
            <TableSummaryRow messages={localisation.tableSummaryRow} />
            <Toolbar />
            <SearchPanel messages={localisation.searchPanel} />
            <ColumnChooser messages={localisation.columnChooser} />
            <GroupingPanel showSortingControls messages={localisation.groupingPanel} />
            <PagingPanel messages={localisation.pagingPanel} pageSizes={pageSizes} />
          </Grid>
        </Paper>
      </GridItem>
    </GridContainer>
  );
}
