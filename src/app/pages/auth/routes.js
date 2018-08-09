import LoginFormContainer from './LoginFormContainer'

const routes = [
  {
    path: '/',
    routes: [
      {
        path: '/',
        exact: true,
        redirectTo: '/auth/login',
      },
      {
        path: '/login',
        component: LoginFormContainer,
        name: 'login',
      },
    ],
  },
]

export default routes
