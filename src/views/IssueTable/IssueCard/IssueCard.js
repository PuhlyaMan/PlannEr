import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import TaskTable from './TaskTable/TaskTable.js';
import TaskCard from './TaskCard/TaskCard.js';
import styles from 'assets/jss/material-dashboard-react/views/issueCardStyle.js';

const useStyles = makeStyles(styles);

export default function IssueCard(props) {
  const [widthCard] = useState('70%');
  const properties = { width: widthCard };
  const [showTaskCard, setShowTaskCard] = useState('hidden');
  const [selectedRow, setSelectedRow] = useState();

  const { data, visible, setHidden, setUpdatedTask } = props;
  const classes = useStyles(properties);

  if (!data) return <div></div>;

  const showCardTask = (visibility, row) => {
    setShowTaskCard(visibility);
    setSelectedRow(row);
  };

  return (
    <GridContainer>
      <TaskCard selectedRow={selectedRow} showTaskCard={showTaskCard} showCardTask={showCardTask} />
      <GridContainer
        style={{ visibility: visible }}
        className={`${classes.card} ${showTaskCard === 'hidden' ? classes.jobCardLongAfter : classes.jobCardSmall}`}
      >
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
        <GridContainer xs={12} sm={12} md={12} style={{ margin: '20px 0 0 0' }}>
          <GridItem xs={12} sm={12} md={12} className={classes.bigTitle}>
            Задачи:
          </GridItem>
          <TaskTable dataRow={data.tasks} showCardTask={showCardTask} setUpdatedTask={setUpdatedTask} />
        </GridContainer>
        <button
          onClick={() => setHidden()}
          className={`${classes.button} ${classes.buttonClose}`}
          disabled={showTaskCard === 'visible'}
        >
          <CloseIcon fontSize="large" />
        </button>
      </GridContainer>
    </GridContainer>
  );

  /*return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <div id="card" className={classes.cardEl}>
          <TaskCard selectedRow={selectedRow} showTaskCard={showTaskCard} showCardTask={showCardTask} />
          <div
            style={{ visibility: visible }}
            className={`${classes.card} ${showTaskCard === 'hidden' ? classes.jobCardLongAfter : classes.jobCardSmall}`}
            id="jobCard"
          >
            <div className={classes.bigTitle}>
              <span>{data.name}</span>
            </div>
            <div style={{ display: 'inline-flex', margin: '0 15px 0 15px' }}>
              <div style={{ margin: '0 15px 0 0' }}>
                <span className={classes.title}>Идентификатор работы: </span>
                <span className={classes.value}>{data.id}</span>
              </div>
              <div style={{ margin: '0 15px 0 0' }}>
                <span className={classes.title}>Статус: </span>
                <span className={classes.value}>{data.state}</span>
              </div>
              <div>
                <span className={classes.title}>Пункт: </span>
                <span className={classes.value}>{data.point}</span>
              </div>
            </div>
            <div style={{ margin: '0 15px 0 15px' }}>
              <span className={classes.title}>Тип: </span>
              <span className={classes.value}>{data.type}</span>
            </div>
            <div style={{ display: 'inline-flex', margin: '0 15px 0 15px' }}>
              <div style={{ margin: '0 15px 0 0' }}>
                <span className={classes.title}>Категория: </span>
                <span className={classes.value}>{data.category}</span>
              </div>
              <div style={{ margin: '0 15px 0 0' }}>
                <span className={classes.title}>Продукт: </span>
                <span className={classes.value}>{data.product}</span>
              </div>
              <div>
                <span className={classes.title}>Дата начала: </span>
                <span className={classes.value}>{data.term_date}</span>
              </div>
            </div>
            <div style={{ margin: '0 15px 0 15px' }}>
              <span className={classes.title}>Автор: </span>
              <span className={classes.value}>{data.author}</span>
            </div>
            <div style={{ margin: '0 15px 0 15px' }}>
              <span className={classes.title}>Ответственный: </span>
              <span className={classes.value}>{data.responsible}</span>
            </div>
            <div style={{ display: 'inline-flex', margin: '0 15px 0 15px' }}>
              <div style={{ margin: '0 15px 0 0' }}>
                <span className={classes.title}>Код документа: </span>
                <span className={classes.value}>{data.document_code}</span>
              </div>
              <div>
                <span className={classes.title}>Иск: </span>
                <span className={classes.value}>{data.suit}</span>
              </div>
            </div>
            <div>
              <span style={{ display: 'block', margin: '0 15px 0 15px' }} className={classes.title}>
                Контракт:
              </span>
              <div style={{ display: 'inline-flex', padding: '0 0 0 50px', margin: '0 15px 0 15px' }}>
                <div style={{ margin: '0 15px 0 0' }}>
                  <span className={classes.title}>Идентификатор: </span>
                  <span className={classes.value}>{data.contract.id}</span>
                </div>
                <div>
                  <span className={classes.title}>Наименование: </span>
                  <span className={classes.value}>{data.contract.name}</span>
                </div>
              </div>
            </div>
            <div style={{ margin: '0 15px 0 15px' }}>
              <span className={classes.title}>График: </span>
              <span className={classes.value}>{data.schedule}</span>
            </div>
            <div>
              <span style={{ display: 'block', margin: '0 15px 0 15px' }} className={classes.title}>
                Проект:
              </span>
              <div style={{ display: 'inline-flex', padding: '0 0 0 50px', margin: '0 15px 0 15px' }}>
                <div style={{ margin: '0 15px 0 0' }}>
                  <span className={classes.title}>Идентификатор: </span>
                  <span className={classes.value}>{data.project.id}</span>
                </div>
                <div>
                  <span className={classes.title}>Наименование: </span>
                  <span className={classes.value}>{data.project.name}</span>
                </div>
              </div>
            </div>
            <div style={{ margin: '0 15px 0 15px' }}>
              <span className={classes.title}>Конструкция: </span>
              <span className={classes.value}>{data.construction}</span>
            </div>
            <div>
              <span style={{ display: 'block', margin: '0 15px 0 15px' }} className={classes.title}>
                План:
              </span>
              <div style={{ display: 'inline-flex', padding: '0 0 0 50px', margin: '0 15px 0 15px' }}>
                <div style={{ margin: '0 15px 0 0' }}>
                  <span className={classes.title}>Дата начала: </span>
                  <span className={classes.value}>{data.plan.start_date}</span>
                </div>
                <div style={{ margin: '0 15px 0 0' }}>
                  <span className={classes.title}>Дата окончания: </span>
                  <span className={classes.value}>{data.plan.finish_date}</span>
                </div>
                <div>
                  <span className={classes.title}>Трудозатраты: </span>
                  <span className={classes.value}>{data.plan.labor}</span>
                </div>
              </div>
            </div>
            <div>
              <span style={{ display: 'block', margin: '0 15px 0 15px' }} className={classes.title}>
                Факт:
              </span>
              <div style={{ display: 'inline-flex', padding: '0 0 0 50px', margin: '0 15px 0 15px' }}>
                <div style={{ margin: '0 15px 0 0' }}>
                  <span className={classes.title}>Дата начала: </span>
                  <span className={classes.value}>{data.actual.start_date}</span>
                </div>
                <div style={{ margin: '0 15px 0 0' }}>
                  <span className={classes.title}>Дата окончания: </span>
                  <span className={classes.value}>{data.actual.finish_date}</span>
                </div>
                <div>
                  <span className={classes.title}>Трудозатраты: </span>
                  <span className={classes.value}>{data.actual.labor}</span>
                </div>
              </div>
            </div>
            <div>
              <span style={{ display: 'block', margin: '0 15px 0 15px' }} className={classes.title}>
                Отдел:
              </span>
              <div style={{ display: 'inline-flex', padding: '0 0 0 50px', margin: '0 15px 0 15px' }}>
                <div style={{ margin: '0 15px 0 0' }}>
                  <span className={classes.title}>Идентификатор: </span>
                  <span className={classes.value}>{data.department.id}</span>
                </div>
                <div style={{ margin: '0 15px 0 0' }}>
                  <span className={classes.title}>Наименование: </span>
                  <span className={classes.value}>{data.department.title}</span>
                </div>
                <div>
                  <span className={classes.title}>Цепочка: </span>
                  <span className={classes.value}>{data.department.breadcrumb}</span>
                </div>
              </div>
            </div>
            <div style={{ margin: '0 15px 0 15px' }}>
              <span className={classes.title}>Метка времени: </span>
              <span className={classes.value}>{data['@timestamp']}</span>
            </div>
            <div style={{ margin: '20px 0 0 0' }}>
              <span style={{ display: 'block' }} className={classes.bigTitle}>
                Задачи:
              </span>
              <TaskTable dataRow={data.tasks} showCardTask={showCardTask} setUpdatedTask={setUpdatedTask} />
            </div>
            <button
              onClick={() => setHidden()}
              className={`${classes.button} ${classes.buttonClose}`}
              disabled={showTaskCard === 'visible'}
            >
              <CloseIcon fontSize="large" />
            </button>
          </div>
        </div>
      </GridItem>
    </GridContainer>
  );*/
}

IssueCard.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.string,
  setHidden: PropTypes.func,
  setUpdatedTask: PropTypes.func,
};
