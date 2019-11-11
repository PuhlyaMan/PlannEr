import React, { useState } from 'react';
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
  EditingState,
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
  TableFixedColumns,
  TableInlineCellEditing,
  GroupingPanel,
  ColumnChooser,
  TableColumnVisibility,
  DragDropProvider,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import DateRange from '@material-ui/icons/DateRange';
import * as settings from './settings/settings.js';
import * as localisation from '../../settings/ru.js';

const getRowId = row => row.id;

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  if (type === 'state') return null;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

FilterIcon.propTypes = {
  type: PropTypes.string,
};

const FocusableCell = ({ onClick, ...restProps }) => <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />;

FocusableCell.propTypes = {
  onClick: PropTypes.func,
};

export default function TaskTable(props) {
  const { dataRow, showCardTask } = props;
  const [data, setData] = useState(dataRow);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      changedRows = [
        ...data,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      /*changedRows = data.map(row => {
        if (changed[row.id]) {
          const key = Object.keys(changed[row.id])[0];
          const value = changed[row.id][key];
          const field = key.slice(7);
          const changedRow = { ...row, ...{ actual: { ...row.actual, ...{ [field]: value } } } };
          alert(`Улетело на сервер ${JSON.stringify(changedRow)}`);
          return changedRow;
        } else return row;
      });*/
      changedRows = data.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      alert(`Улетело на сервер ${JSON.stringify(changedRows)}`);
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = data.filter(row => !deletedSet.has(row.id));
    }
    setData(changedRows);
  };

  const TableRow = ({ row, ...restProps }) => {
    return (
      <Table.Row
        {...restProps}
        onDoubleClick={() => {
          showCardTask('visible', row);
        }}
        style={{
          cursor: 'pointer',
          backgroundColor: settings.font(row.state),
          //...styles[row.sector.toLowerCase()],
        }}
      />
    );
  };

  TableRow.propTypes = {
    row: PropTypes.object,
  };

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Paper>
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

          <EditingState onCommitChanges={commitChanges} columnExtensions={settings.editingColumnExtensions} />
          <Table
            cellComponent={FocusableCell}
            rowComponent={TableRow}
            messages={localisation.table}
            columnExtensions={settings.tableColumnExtensions}
          />
          <TableColumnResizing defaultColumnWidths={settings.tableColumnExtensions} />
          <TableColumnReordering defaultOrder={settings.columnNames()} />
          <TableColumnVisibility defaultHiddenColumnNames={settings.defaultHiddenColumnNames} />
          <TableHeaderRow
            //cellComponent={}
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
          <TableInlineCellEditing selectTextOnEditStart="true" />
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
  dataRow: PropTypes.array,
  showCardTask: PropTypes.func,
};
