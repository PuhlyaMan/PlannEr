import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import JobCard from 'views/JobCard/JobCard.js';
import { columns, rows, autoGroupColumnDef, defaultCol, rowClassRules } from './data/settings.js';
import localisationRus from './data/localisationRu.js';
import 'ag-grid-enterprise';
import 'ag-grid-enterprise/chartsModule';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function JobTables() {
  const [rowsTable, setRowsTable] = useState(rows);
  const [columnsTable, setColumnsTable] = useState(columns);
  const [group] = useState(autoGroupColumnDef);
  const [defaultColDef] = useState(defaultCol);
  const [data, setData] = useState();
  const [visible, setVisible] = useState('hidden');

  const onButtonClick = e => {
    const selectedNodes = AgGridReact.gridApi.getSelectedNodes();
    if (selectedNodes[0]) {
      const data = selectedNodes[0].data;
      setData(data);
      setVisible('visible');
      /*const selectedDataStringPresentation = data.issue + ' ' + data.subject;
      alert(`Selected nodes: ${selectedDataStringPresentation}`);*/
    } else alert('Необходимо выбрать работу!');
  };

  const setHidden = () => {
    setData();
    setVisible('hidden');
  };

  const onAutoResize = () => {
    let allColumnIds = [];
    AgGridReact.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    AgGridReact.gridColumnApi.autoSizeColumns(allColumnIds);
  };

  return (
    <div>
      <JobCard data={data} visible={visible} setHidden={setHidden} />
      <div
        className="ag-theme-material"
        style={{
          height: '100%',
          width: '100%',
          zIndex: '1',
        }}
      >
        <button onClick={onButtonClick}>Покажи-ка мне задачки</button>
        <AgGridReact
          onGridReady={params => {
            AgGridReact.gridApi = params.api;
            AgGridReact.gridColumnApi = params.columnApi;
            //AgGridReact.gridApi.sizeColumnsToFit();
          }}
          //rowSelection="multiple"
          rowSelection="single"
          columnDefs={columnsTable}
          rowData={rowsTable}
          defaultColDef={defaultColDef}
          multiSortKey="ctrl"
          animateRows={true}
          rowDragManaged={true}
          enableRangeSelection={true}
          pagination={true}
          paginationPageSize={10}
          localeText={localisationRus}
          enableCharts={true}
          rowGroupPanelShow="always"
          domLayout="autoHeight"
          //rowClassRules={rowClassRules}
          groupSelectsChildren={true}
          autoGroupColumnDef={group}
        />
      </div>
    </div>
  );
}

/*
export default class JobTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsTable: rows,
      columnsTable: columns,
    };
  }

  render() {
    const onButtonClick = e => {
      const selectedNodes = this.gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      const selectedDataStringPresentation = selectedData.map(node => node.issue + ' ' + node.subject).join(', ');
      alert(`Selected nodes: ${selectedDataStringPresentation}`);
    };

    return (
      <div
        className="ag-theme-material"
        style={{
          height: '1000px',
          width: 'auto%',
        }}
      >
        <button onClick={onButtonClick}>Get selected rows</button>
        <AgGridReact
          onGridReady={params => (this.gridApi = params.api)}
          rowSelection="multiple"
          columnDefs={this.state.columnsTable}
          rowData={this.state.rowsTable}
        ></AgGridReact>
      </div>
    );
  }
}
*/
