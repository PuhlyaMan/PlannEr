import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import avatar from 'assets/img/faces/marc.jpg';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();

  const handleClick = () => {
    positionCard.change(`${department.value}/ ${position.value}`);
    fioCard.change(`${lastName.value} ${firstName.value} ${midleName.value}`);
    aboutMeCard.change(aboutMe.value);
  };

  const useUserState = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const handleChange = value => setValue(value);
    return {
      value: value,
      change: handleChange,
    };
  };

  const company = useUserState();
  const position = useUserState();
  const department = useUserState();
  const firstName = useUserState();
  const lastName = useUserState();
  const midleName = useUserState();
  const email = useUserState();
  const city = useUserState();
  const postalCode = useUserState();
  const aboutMe = useUserState();
  const positionCard = useUserState('Инженерных дел мастер');
  const fioCard = useUserState('Иванов Иван Иванович');
  const aboutMeCard = useUserState('Немного обо мне');

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Редактировать профиль</h4>
              <p className={classes.cardCategoryWhite}>Заполните Ваш профиль</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Компания"
                    id="company"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: company.value,
                      onChange: e => company.change(e.target.value),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Должность"
                    id="position"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: position.value,
                      onChange: e => position.change(e.target.value),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Отдел"
                    id="department"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: department.value,
                      onChange: e => department.change(e.target.value),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Фамилия"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: lastName.value,
                      onChange: e => lastName.change(e.target.value),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Имя"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: firstName.value,
                      onChange: e => firstName.change(e.target.value),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Отчество"
                    id="midle-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: midleName.value,
                      onChange: e => midleName.change(e.target.value),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email адрес"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: email.value,
                      onChange: e => email.change(e.target.value),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Город"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: city.value,
                      onChange: e => city.change(e.target.value),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Почтовый индекс"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: postalCode.value,
                      onChange: e => postalCode.change(e.target.value),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Обо мне"
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      value: aboutMe.value,
                      onChange: e => aboutMe.change(e.target.value),
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={handleClick} color="primary">
                Обновить профиль
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{positionCard.value}</h6>
              <h4 className={classes.cardTitle}>{fioCard.value}</h4>
              <p className={classes.description}>{aboutMeCard.value}</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
