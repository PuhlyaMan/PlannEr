/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ColumnChooser } from '@devexpress/dx-react-grid-material-ui';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  item: {
    cursor: 'pointer',
  },
  label: {
    flex: '1 1 auto',
    minWidth: '0px',
    marginTop: '4px',
    marginBottom: '4px',
    marginRight: '8px',
    display: 'inline-block',
  },
};

const columnWork = {
  work: 'Наименование работы',
  work_id: 'ID работы',
  state: 'Статус работы',
  point: 'Пункт графика',
  contract_name: 'Договор',
  project_name: 'Проект',
};

const ColumnChoiserGroup = ({ classes, disabled, item, onToggle, ...restProps }) => {
  const [check, setCheck] = useState(false);
  const onChangeCkick = () => {
    setCheck(!check);
  };

  return !columnWork[item.column.name] ? (
    <></>
  ) : (
    <li className={classes.item} onClick={onChangeCkick}>
      <Checkbox value="primary" checked={check} onChange={onChangeCkick}></Checkbox>
      <div className={classes.label}>{columnWork[item.column.name]}</div>
    </li>
    //<ColumnChooser.Item item={item} onToggle={onToggle} disabled={!disabled} {...restProps} />
  );
};

ColumnChoiserGroup.propTypes = {
  item: PropTypes.object,
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default withStyles(styles)(ColumnChoiserGroup);
