'use strict';

// HOC for check auth
import AuthCheck from 'modules/session/AuthCheck'

import AppLayout from 'layouts/AppLayout'
import LoginPage from 'modules/login-page/LoginPage'
import { Page404 } from 'layouts/404'
import { Main } from 'modules/dashboard/main'
import BioTrace from 'modules/dashboard/biotrace'

const routes = [
  { path: '/login', component: LoginPage },
  {
    path: '/',
    component: AuthCheck(AppLayout),
    childRoutes: [
      { path: '/biotrace', component: BioTrace },
    ]
  },
  { path: '*', component: Page404 },
]

export default routes

/*
  /
  /auth/
  /auth/registration
  /auth/password-reset
  /dashboard
  /items
  /item/:id
*/
