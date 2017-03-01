export default [{
  path: '/',
  name: 'AppView',
  component: require('./App'),
}, {
  path: '/logo',
  name: 'LogoView',
  component: require('./components/Logo'),
}, {
  path: '/main',
  name: 'MainView',
  component: require('./components/Main'),
}, {
  path: '*',
  redirect: '/',
}, ];
