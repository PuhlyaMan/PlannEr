/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AndroidIcon from '@material-ui/icons/Android';
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
import UserProfile from 'views/UserProfile/UserProfile.js';
import Labor from 'views/Labor/Labor.js';
import Fact from 'views/Fact/Fact.js';

const dashboardRoutes = [
  {
    path: '/user',
    name: 'Мой профиль',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/dashboard',
    name: 'Главная страница',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/fact',
    name: 'Факт',
    icon: AndroidIcon,
    component: Fact,
    layout: '/admin',
  },
  {
    path: '/labor',
    name: 'Labor',
    icon: AssessmentIcon,
    component: Labor,
    layout: '/admin',
  },
];

export default dashboardRoutes;
