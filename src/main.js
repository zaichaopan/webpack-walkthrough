import Vue from 'vue';
import TodoList from './components/TodoList.vue';

Vue.component('todo-list', TodoList);

const app = new Vue({
    el: '#container'
});
