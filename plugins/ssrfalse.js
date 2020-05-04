import Vue from 'vue';
import VuePersianDatetimePicker  from 'vue-persian-datetime-picker'
Vue.component('date-picker', VuePersianDatetimePicker);
import 'nuxt-dropzone/dropzone.css'

import VueTagsInput from '@johmun/vue-tags-input';
Vue.component('vue-tags-input', VueTagsInput);
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate);
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import slider2 from "~/components/view/template/slider2";
Vue.component('slider2', slider2);
import countdown from "~/components/view/tools/countdown";
Vue.component('countdown', countdown);
import VueNumeric from 'vue-numeric';
import { Carousel, Slide } from 'vue-carousel';

Vue.component('VueNumeric', VueNumeric);
Vue.component('Carousel', Carousel);

