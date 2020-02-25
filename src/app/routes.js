import NotFound from 'pages/fallbacks/NotFound'
import AppLayout from 'layouts/AppLayout'

import { routes as auth } from 'pages/auth'
import { routes as dashboard } from 'pages/dashboard'

import { access } from 'common/session'

const appRoutes = [
  {
    path: '/',
    exact: true,
    name: 'root',
    redirectTo: '/dashboard',
  },
  {
    path: '/',
    layout: AppLayout,
    routes: [
      {
        path: '/auth',
        routes: auth,
        access: access.F_UNAUTHORISED,
        accessRedirectTo: '/dashboard',
      },
      {
        path: '/dashboard',
        routes: dashboard,
        access: access.F_PROTECTED,
        accessRedirectTo: '/auth',
        name: 'dashboard',
      },
      {
        component: NotFound,
      },
    ],
  },
]

export default appRoutes
