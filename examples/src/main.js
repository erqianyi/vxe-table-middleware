import Vue from 'vue';
import App from './App.vue';
import router from './router'
import './styles/reset.css'
import VxeUIAll from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'
import './styles/index.css'

Vue.use(VxeUIAll)
Vue.use(VxeUITable)

import PageCard from '@/components/PageCard.vue';
Vue.component('PageCard', PageCard);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
