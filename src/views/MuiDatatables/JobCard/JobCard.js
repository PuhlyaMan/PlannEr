import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
//im-port GridItem from 'components/Grid/GridItem.js';
//import GridContainer from 'components/Grid/GridContainer.js';
import { styles } from 'assets/jss/material-dashboard-react/views/jobCardStyle.js';

const useStyles = makeStyles(styles);

export default function JobCard({ data }) {
  const classes = useStyles();

  if (!data) return <div></div>;

  return (
    <tr>
      <td
        colSpan="8"
        style={{
          borderTop: '1px solid rgba(224, 224, 224, 1)',
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
          backgroundColor: 'rgba(241, 205, 247, 0.5)',
          position: 'sticky',
          left: '0px',
        }}
      >
        <div style={{ padding: '0 10px' }}>
          <div className={classes.bigTitle}>
            <span>Работа: {data[18]}</span>
          </div>
          <div>
            <div className={classes.component}>
              <span className={classes.title}>Идентификатор: </span>
              <span className={classes.value}>{data[19]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Статус: </span>
              <span className={classes.value}>{data[20]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Пункт: </span>
              <span className={classes.value}>{data[9]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Тип: </span>
              <span className={classes.value}>{data[21]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Категория: </span>
              <span className={classes.value}>{data[22]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Продукт: </span>
              <span className={classes.value}>{data[23]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Дата начала: </span>
              <span className={classes.value}>{data[24]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Автор: </span>
              <span className={classes.value}>{data[25]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Ответственный: </span>
              <span className={classes.value}>{data[26]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Код документа: </span>
              <span className={classes.value}>{data[27]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Иск: </span>
              <span className={classes.value}>{data[28]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>График: </span>
              <span className={classes.value}>{data[30]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Конструкция: </span>
              <span className={classes.value}>{data[32]}</span>
            </div>
          </div>
          <div>
            <div className={classes.component}>
              <div className={classes.title}>Контракт:</div>
              <div className={classes.componentList}>
                <div>
                  <span className={classes.title}>Идентификатор: </span>
                  <span className={classes.value}>{data[29]}</span>
                </div>
                <div>
                  <span className={classes.title}>Наименование: </span>
                  <span className={classes.value}>{data[10]}</span>
                </div>
              </div>
            </div>
            <div className={classes.component}>
              <div className={classes.title}>Проект:</div>
              <div className={classes.componentList}>
                <div>
                  <span className={classes.title}>Идентификатор: </span>
                  <span className={classes.value}>{data[31]}</span>
                </div>
                <div>
                  <span className={classes.title}>Наименование: </span>
                  <span className={classes.value}>{data[11]}</span>
                </div>
              </div>
            </div>
            <div className={classes.component}>
              <div className={classes.title}>План:</div>
              <div className={classes.componentList}>
                <div>
                  <span className={classes.title}>Дата начала: </span>
                  <span className={classes.value}>{data[33]}</span>
                </div>
                <div>
                  <span className={classes.title}>Дата окончания: </span>
                  <span className={classes.value}>{data[34]}</span>
                </div>
                <div>
                  <span className={classes.title}>Трудозатраты: </span>
                  <span className={classes.value}>{data[35]}</span>
                </div>
              </div>
            </div>
            <div className={classes.component}>
              <div className={classes.title}>Факт:</div>
              <div className={classes.componentList}>
                <div>
                  <span className={classes.title}>Дата начала: </span>
                  <span className={classes.value}>{data[36]}</span>
                </div>
                <div>
                  <span className={classes.title}>Дата окончания: </span>
                  <span className={classes.value}>{data[37]}</span>
                </div>
                <div>
                  <span className={classes.title}>Трудозатраты: </span>
                  <span className={classes.value}>{data[38]}</span>
                </div>
              </div>
            </div>
            <div className={classes.component}>
              <div className={classes.title}>Отдел:</div>
              <div className={classes.componentList}>
                <div>
                  <span className={classes.title}>Идентификатор: </span>
                  <span className={classes.value}>{data[39]}</span>
                </div>
                <div>
                  <span className={classes.title}>Наименование: </span>
                  <span className={classes.value}>{data[40]}</span>
                </div>
                <div>
                  <span className={classes.title}>Цепочка: </span>
                  <span className={classes.value}>{data[41]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: '0 10px' }}>
          <div>
            <div className={classes.bigTitle}>
              <span>Задача: {data[0]}</span>
            </div>
          </div>
          <div>
            <div className={classes.component}>
              <span className={classes.title}>ИД задачи: </span>
              <span className={classes.value}>{data[1]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Статус: </span>
              <span className={classes.value}>{data[2]}</span>
            </div>
            <div className={classes.component}>
              <span className={classes.title}>Ответственный: </span>
              <span className={classes.value}>{data[13]}</span>
            </div>
          </div>
          <div>
            <div className={classes.component}>
              <div className={classes.title}>Отдел:</div>
              <div className={classes.componentList}>
                <div>
                  <span className={classes.title}>Идентификатор: </span>
                  <span className={classes.value}>{data[14]}</span>
                </div>
                <div>
                  <span className={classes.title}>Наименование: </span>
                  <span className={classes.value}>{data[15]}</span>
                </div>
                <div>
                  <span className={classes.title}>Цепочка: </span>
                  <span className={classes.value}>{data[16]}</span>
                </div>
              </div>
            </div>
            <div className={classes.component}>
              <div className={classes.title}>План:</div>
              <div className={classes.componentList}>
                <div>
                  <span className={classes.title}>Дата начала: </span>
                  <span className={classes.value}>{data[3]}</span>
                </div>
                <div>
                  <span className={classes.title}>Дата окончания: </span>
                  <span className={classes.value}>{data[4]}</span>
                </div>
                <div xs={12} sm={12} md={12} lg={4} xl={4}>
                  <span className={classes.title}>Трудозатраты: </span>
                  <span className={classes.value}>{data[5]}</span>
                </div>
              </div>
            </div>
            <div className={classes.component}>
              <div className={classes.title}>Факт:</div>
              <div className={classes.componentList}>
                <div>
                  <span className={classes.title}>Дата начала: </span>
                  <span className={classes.value}>{data[6]}</span>
                </div>
                <div>
                  <span className={classes.title}>Дата окончания: </span>
                  <span className={classes.value}>{data[7]}</span>
                </div>
                <div>
                  <span className={classes.title}>Трудозатраты: </span>
                  <span className={classes.value}>{data[8]}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.component}>
            <span className={classes.title}>Коментарий: </span>
            <span className={classes.value}>{data[12]}</span>
          </div>
        </div>
      </td>
    </tr>
  );
}

JobCard.propTypes = {
  data: PropTypes.array,
};
