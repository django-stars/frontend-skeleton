import LoginForm from './login'

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
        component: LoginForm,
        name: 'login',
      },
    ],
  },
]

export default routes
