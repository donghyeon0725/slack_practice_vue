import Vue from 'vue';
import { formatDate, dayAgo } from '@/util/date';

Vue.filter('formatDate', formatDate);
Vue.filter('dayAgo', dayAgo);
