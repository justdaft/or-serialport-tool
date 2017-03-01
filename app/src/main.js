import Vue from 'vue';
import Router from 'vue-router';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons/iconfont/material-icons.css';

import App from './App';
import routes from './routes';
import Locale from './locale';

//Locale.use('zh-CN');



Vue.use(VueMaterial);
Vue.use(Router);

Vue.material.registerTheme('default', {
  primary: 'grey',
  accent: 'red',
  warn: 'red',
});


Vue.config.debug = true;

const router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes
});

new Vue({
  router,
  ...App
}).$mount('#app');
