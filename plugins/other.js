import Vue from 'vue'
Vue.prototype.$url = process.env.BASE_BACKEND+'api/';
Vue.prototype.$storage =process.env.BASE_BACKEND;
import Swal from 'sweetalert2';
Vue.prototype.$swal =Swal;

