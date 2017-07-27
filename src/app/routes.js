'use strict';

// HOC for check auth
import AuthCheck from 'modules/session/AuthCheck'

import AuthLogin from 'modules/session/AuthLogin'
//import AuthRegistration from 'modules/session/AuthRegistration'
//import AuthPasswordReset from 'modules/session/AuthPasswordReset'

import AppLayout from 'layouts/AppLayout'
import Dashboard from 'modules/dashboard/Dashboard'

const routes = {
  path: '/',
  component: AppLayout,
  //indexRoute: { component: Dashboard },
  childRoutes: [
    { path: 'dashboard', component: AuthCheck(Dashboard) },
    {
      path: 'auth',
      //component: AuthLogin,
      childRoutes: [{
        path: 'login', component: AuthLogin,
        //path: 'register', component: AuthRegistration,
        //path: 'password-reset', component: AuthPasswordReset,
      }],
    },
    //{ path: '*', component: NotFound }
  ]
}

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
