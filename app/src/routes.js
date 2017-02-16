export default [{
  path: '/',
  name: 'MainView',
  component: require('./App'),
}, {
  path: '*',
  redirect: '/',
}, ];
