import React from 'react';
import PropTypes from 'prop-types';
import TaskTable from './TaskTable/TaskTable.js';

const RowDetail = ({ setSelectedRow, row }) => {
  setSelectedRow(row);
  return <TaskTable row={row} />;
};

RowDetail.propTypes = {
  setSelectedRow: PropTypes.func,
  row: PropTypes.object,
};

export default RowDetail;
