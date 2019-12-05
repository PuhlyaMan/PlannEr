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
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AvTimerIcon from '@material-ui/icons/AvTimer';
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
import UserProfile from 'views/UserProfile/UserProfile.js';
import TableList from 'views/TableList/TableList.js';
import JobTables from 'views/JobTables/JobTables.js';
import Issues from 'views/Issues/Issues.js';
import TaskTable from 'views/TaskTable/TaskTable.js';
import IssueTable from 'views/IssueTable/IssueTable.js';
import ModuleFact from 'views/ModuleFact/ModuleFact.js';
import Labor from 'views/Labor/Labor.js';
import MuiDatatables from 'views/MuiDatatables/MuiDatatables.js';

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
    name: 'Модуль фактов',
    icon: AssignmentIcon,
    component: ModuleFact,
    layout: '/admin',
  },
  {
    path: '/fact',
    name: 'TaskTable',
    icon: AssignmentTurnedInIcon,
    component: TaskTable,
    layout: '/admin',
  },
  {
    path: '/issues',
    name: 'Issues',
    icon: AccessTimeIcon,
    component: Issues,
    layout: '/admin',
  },
  {
    path: '/jobtable',
    name: 'JobTables',
    icon: AccessibilityIcon,
    component: JobTables,
    layout: '/admin',
  },
  {
    path: '/tablelist',
    name: 'TableList',
    icon: AnnouncementIcon,
    component: TableList,
    layout: '/admin',
  },
  {
    path: '/labor',
    name: 'Labor',
    icon: AssessmentIcon,
    component: Labor,
    layout: '/admin',
  },
  {
    path: '/muidatatables',
    name: 'MuiDatatables',
    icon: AvTimerIcon,
    component: MuiDatatables,
    layout: '/admin',
  },
  {
    path: '/issuetable',
    name: 'IssueTable',
    icon: 'content_paste',
    component: IssueTable,
    layout: '/admin',
  },
  {
    path: '/user',
    name: 'Мой профиль',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
];

export default dashboardRoutes;
