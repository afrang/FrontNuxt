import Vue from 'vue'
Vue.prototype.$url = process.env.BASE_BACKEND+'api/';
Vue.prototype.$storage =process.env.BASE_BACKEND;
import Swal from 'sweetalert2';
Vue.prototype.$swal =Swal;
Vue.use(require('vue-jalali-moment'));

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);
