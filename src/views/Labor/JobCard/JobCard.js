import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import RotateDiv, { styles } from 'assets/jss/material-dashboard-react/views/jobCardStyle.js';

const useStyles = makeStyles(styles);

export default function JobCard({ data, setHidden }) {
  const classes = useStyles();

  if (!data) return <div></div>;

  return (
    <RotateDiv>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} className={classes.bigTitle}>
          <span>{data.name}</span>
        </GridItem>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={4} xl={3}>
            <span className={classes.title}>Идентификатор: </span>
            <span className={classes.value}>{data.id}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} lg={4} xl={3}>
            <span className={classes.title}>Статус: </span>
            <span className={classes.value}>{data.state}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} lg={4} xl={3}>
            <span className={classes.title}>Пункт: </span>
            <span className={classes.value}>{data.point}</span>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <span className={classes.title}>Тип: </span>
            <span className={classes.value}>{data.type}</span>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={4} xl={3}>
            <span className={classes.title}>Категория: </span>
            <span className={classes.value}>{data.category}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} lg={4} xl={3}>
            <span className={classes.title}>Продукт: </span>
            <span className={classes.value}>{data.product}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={8} lg={4} xl={3}>
            <span className={classes.title}>Дата начала: </span>
            <span className={classes.value}>{data.term_date}</span>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <span className={classes.title}>Автор: </span>
            <span className={classes.value}>{data.author}</span>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <span className={classes.title}>Ответственный: </span>
            <span className={classes.value}>{data.responsible}</span>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={6}>
            <span className={classes.title}>Код документа: </span>
            <span className={classes.value}>{data.document_code}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={6}>
            <span className={classes.title}>Иск: </span>
            <span className={classes.value}>{data.suit}</span>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.title}>
            Контракт:
          </GridItem>
          <GridContainer style={{ padding: '0 0 0 50px' }}>
            <GridItem xs={12} sm={12} md={12} lg={4} xl={3}>
              <span className={classes.title}>Идентификатор: </span>
              <span className={classes.value}>{data.contract.id}</span>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={8} xl={4}>
              <span className={classes.title}>Наименование: </span>
              <span className={classes.value}>{data.contract.name}</span>
            </GridItem>
          </GridContainer>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <span className={classes.title}>График: </span>
            <span className={classes.value}>{data.schedule}</span>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.title}>
            Проект:
          </GridItem>
          <GridContainer style={{ padding: '0 0 0 50px' }}>
            <GridItem xs={12} sm={12} md={12} lg={4} xl={3}>
              <span className={classes.title}>Идентификатор: </span>
              <span className={classes.value}>{data.project.id}</span>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={8} xl={4}>
              <span className={classes.title}>Наименование: </span>
              <span className={classes.value}>{data.project.name}</span>
            </GridItem>
          </GridContainer>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <span className={classes.title}>Конструкция: </span>
            <span className={classes.value}>{data.construction}</span>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.title}>
            План:
          </GridItem>
          <GridContainer style={{ padding: '0 0 0 50px' }}>
            <GridItem xs={12} sm={12} md={12} lg={4} xl={4}>
              <span className={classes.title}>Дата начала: </span>
              <span className={classes.value}>{data.plan.start_date}</span>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={8} xl={4}>
              <span className={classes.title}>Дата окончания: </span>
              <span className={classes.value}>{data.plan.finish_date}</span>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
              <span className={classes.title}>Трудозатраты: </span>
              <span className={classes.value}>{data.plan.labor}</span>
            </GridItem>
          </GridContainer>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.title}>
            Факт:
          </GridItem>
          <GridContainer style={{ padding: '0 0 0 50px' }}>
            <GridItem xs={12} sm={12} md={12} lg={4} xl={4}>
              <span className={classes.title}>Дата начала: </span>
              <span className={classes.value}>{data.actual.start_date}</span>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={8} xl={4}>
              <span className={classes.title}>Дата окончания: </span>
              <span className={classes.value}>{data.actual.finish_date}</span>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
              <span className={classes.title}>Трудозатраты: </span>
              <span className={classes.value}>{data.actual.labor}</span>
            </GridItem>
          </GridContainer>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.title}>
            Отдел:
          </GridItem>
          <GridContainer style={{ padding: '0 0 0 50px' }}>
            <GridItem xs={12} sm={12} md={12} lg={4} xl={4}>
              <span className={classes.title}>Идентификатор: </span>
              <span className={classes.value}>{data.department.id}</span>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={8} xl={4}>
              <span className={classes.title}>Наименование: </span>
              <span className={classes.value}>{data.department.title}</span>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={4}>
              <span className={classes.title}>Цепочка: </span>
              <span className={classes.value}>{data.department.breadcrumb}</span>
            </GridItem>
          </GridContainer>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <span className={classes.title}>Метка времени: </span>
            <span className={classes.value}>{data['@timestamp']}</span>
          </GridItem>
        </GridContainer>
      </GridContainer>
      <button onClick={() => setHidden()} className={classes.button}>
        <CloseIcon fontSize="large" />
      </button>
    </RotateDiv>
  );
}

JobCard.propTypes = {
  data: PropTypes.object,
  showJobCard: PropTypes.bool,
  setHidden: PropTypes.func,
};
