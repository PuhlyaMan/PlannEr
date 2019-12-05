/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import MaterialTable from 'material-table';

export default function TableList() {
  const [columns, setColumn] = useState([
    { title: 'ID работы', field: 'id', type: 'numeric' },
    {
      title: 'Объект',
      field: 'object',
      lookup: { 1: 'Курская АС', 2: 'Армянская АС' },
    },
    { title: 'Наименование', field: 'name' },
    { title: 'Дата начала', field: 'startDate', type: 'date' },
    { title: 'Дата окончания', field: 'endDate', type: 'date' },
    { title: 'Исполнитель', field: 'executor' },
  ]);
  const [data, setData] = useState([
    {
      id: 1,
      object: 1,
      name: 'Job One',
      startDate: '10.06.2019',
      endDate: '12.06.2019',
      executor: 'Костин Сергей Станиславович',
    },
    {
      id: 2,
      object: 1,
      name: 'Job Two',
      startDate: '12.06.2019',
      endDate: '12.07.2019',
      executor: 'Костин Сергей Станиславович',
    },
    {
      id: 3,
      object: 2,
      name: 'Job One',
      startDate: '10.06.2019',
      endDate: '12.06.2019',
      executor: 'Костин Сергей Станиславович',
    },
    {
      id: 4,
      object: 2,
      name: 'Job Two',
      startDate: '13.06.2019',
      endDate: '16.06.2019',
      executor: 'Костин Сергей Станиславович',
    },
    {
      id: 5,
      object: 2,
      name: 'Job Three',
      startDate: '20.09.2019',
      endDate: '21.12.2019',
      executor: 'Костин Сергей Станиславович',
    },
    {
      id: 6,
      object: 2,
      name: 'Job Three',
      startDate: '20.09.2019',
      endDate: '21.12.2019',
      executor: 'Костин Сергей Станиславович',
    },
    {
      id: 7,
      object: 2,
      name: 'Job Three',
      startDate: '20.09.2019',
      endDate: '21.12.2019',
      executor: 'Костин Сергей Станиславович',
    },
  ]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <MaterialTable
          title="Работы"
          columns={columns}
          data={data}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: '#3f51b5',
              color: '#FFF',
            },
          }}
        />
      </GridItem>
      {/*<GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>Here is a subtitle for this table</p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={['Name', 'Country', 'City', 'Salary']}
              tableData={[
                ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
                ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
                ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
                ['Mason Porter', 'Chile', 'Gloucester', '$78,615'],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>*/}
    </GridContainer>
  );
}
