import Vue from 'vue';
import Router from 'vue-router';


// import VueBlu from 'vue-blu'
// import 'vue-blu/dist/css/vue-blu.min.css'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'


import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

import 'roboto-fontface/css/roboto/roboto-fontface.css';

import 'material-design-icons/iconfont/material-icons.css';

import App from './App';
import routes from './routes';
import Locale from './locale';

Locale.use('zh-CN');

// Vue.use(VueBlu);
// Vue.use(ElementUI);
Vue.use(VueMaterial);
Vue.use(Router);

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
