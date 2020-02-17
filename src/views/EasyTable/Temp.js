import React, { useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';

const GridExample = () => {
  const [state] = useState({
    modules: AllCommunityModules,
    columnDefs: [
      {
        field: 'athlete',
        width: 150,
      },
      { field: 'age' },
      {
        field: 'country',
        width: 150,
      },
      { field: 'year' },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ],
    defaultColDef: {
      editable: true,
      width: 100,
    },
  });

  const [rowData, setRowData] = useState([]);

  const onGridReady = () => {
    //this.gridApi = params.api;
    //this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      setRowData(data);
    };

    httpRequest.open(
      'GET',
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-balham"
      >
        <AgGridReact
          modules={state.modules}
          columnDefs={state.columnDefs}
          enterMovesDownAfterEdit={true}
          enterMovesDown={true}
          defaultColDef={state.defaultColDef}
          onGridReady={onGridReady}
          rowData={rowData}
        />
      </div>
    </div>
  );
};

export default GridExample;
