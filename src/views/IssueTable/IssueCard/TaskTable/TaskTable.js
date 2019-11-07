import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import GridItem from 'components/Grid/GridItem.js';
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
  TableGroupRow,
  TableSummaryRow,
  GroupingPanel,
  ColumnChooser,
  TableColumnVisibility,
  DragDropProvider,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import DateRange from '@material-ui/icons/DateRange';
import * as settings from './settings/settings.js';
import * as localisation from '../../settings/ru.js';
import { textAlign } from '@material-ui/system';

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  if (type === 'state') return null;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

export default function TaskTable(props) {
  const TableRow = ({ row, ...restProps }) => {
    const font = state => (state === 'В работе' ? '#80cf95' : state === 'Ожидание' ? '#ecf272' : '#b7b8b2');

    return (
      <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        onClick={() => {
          showCardTask('visible', row);
        }}
        style={{
          cursor: 'pointer',
          backgroundColor: font(row.state),
          //...styles[row.sector.toLowerCase()],
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

  const { data, showCardTask } = props;
  return (
    <GridItem xs={12} sm={12} md={12}>
      <Paper>
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

TaskTable.propTypes = {
  data: PropTypes.array,
  showCardTask: PropTypes.func,
};
