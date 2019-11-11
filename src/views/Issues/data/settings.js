import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Input from '@material-ui/core/Input';

const styles = {
  numericInput: {
    textAlign: 'right',
    width: '100%',
  },
  content: {
    display: 'contents',
    textAlign: 'center',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  title: {
    overflow: 'inherit',
  },
};

const CurrencyEditorBase = ({ value, onValueChange, classes }) => {
  const handleChange = event => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <Input
      type="number"
      classes={{
        input: classes.numericInput,
      }}
      fullWidth
      value={value === undefined ? '' : value}
      inputProps={{
        min: 0,
        placeholder: 'Фильтр...',
      }}
      onChange={handleChange}
    />
  );
};

CurrencyEditorBase.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

CurrencyEditorBase.defaultProps = {
  value: undefined,
};

export const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);

const TitelBase = ({ children, classes, className, ...restProps }) => (
  <span className={classNames(classes.title, className)} {...restProps}>
    {children}
  </span>
);

TitelBase.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TitelBase.defaultProps = {
  className: null,
  children: undefined,
};

export const Title = withStyles(styles, { name: 'Title' })(TitelBase);

const ContentComponentBase = ({ children, classes, className, ...restProps }) => (
  <div className={classNames(classes.content, className)} {...restProps}>
    {children}
  </div>
);

ContentComponentBase.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ContentComponentBase.defaultProps = {
  className: null,
  children: undefined,
};

export const ContentComponent = withStyles(styles, { name: 'Content' })(ContentComponentBase);

export const colAlign = [
  { columnName: 'id', align: 'center' },
  { columnName: 'startDate', align: 'center' },
  { columnName: 'endDate', align: 'center' },
];

export const colWidths = [
  { columnName: 'id', width: 130 },
  { columnName: 'subject', width: 210 },
  { columnName: 'issue', width: 450 },
  { columnName: 'startDate', width: 175 },
  { columnName: 'endDate', width: 175 },
  { columnName: 'executor', width: 220 },
];

export const columns = [
  { title: 'Наименование', name: 'issue' },
  { title: 'ID работы', name: 'id' },
  { title: 'Объект', name: 'subject' },
  { title: 'Дата начала', name: 'startDate' },
  { title: 'Дата окончания', name: 'endDate' },
  { title: 'Исполнитель', name: 'executor' },
];

const generateId = () => {
  return Math.floor(Math.random() * 100000);
};

export const rows = [
  {
    id: generateId(),
    subject: 'Курская АЭС',
    issue: 'Job One',
    startDate: '2019-06-10',
    endDate: '2019-06-12',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Курская АЭС',
    issue: 'Job Two',
    startDate: '2019-06-12',
    endDate: '2019-07-12',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job One',
    startDate: '2019-06-10',
    endDate: '2019-06-12',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Two',
    startDate: '2019-06-13',
    endDate: '2019-06-16',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-06-20',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
  {
    id: generateId(),
    subject: 'Армянская АЭС',
    issue: 'Job Three',
    startDate: '2019-09-12',
    endDate: '2019-12-21',
    executor: 'Костин Сергей Станиславович',
  },
];
