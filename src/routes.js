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
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
import UserProfile from 'views/UserProfile/UserProfile.js';
//import TableList from 'views/TableList/TableList.js';
//import JobTables from 'views/JobTables/JobTables.js';
//import Issues from 'views/Issues/Issues.js';
import TaskTable from 'views/TaskTable/TaskTable.js';
//import IssueTable from 'views/IssueTable/IssueTable.js';
//import Labor from 'views/Labor/Labor.js';
//import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Главная страница',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/tasks',
    name: 'Мои задачи',
    icon: AssignmentTurnedInIcon,
    component: TaskTable,
    layout: '/admin',
  },
  /*{
    path: '/labor',
    name: 'Мои задачи',
    icon: AccessTimeIcon,
    component: Labor,
    layout: '/admin',
  },
  {
    path: '/issues',
    name: 'Мои работы',
    icon: 'content_paste',
    component: IssueTable,
    layout: '/admin',
  },*/
  {
    path: '/user',
    name: 'Мой профиль',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
];

export default dashboardRoutes;
