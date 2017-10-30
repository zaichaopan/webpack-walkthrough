import Vue from 'vue';
import TodoList from './src/TodoList.vue';

Vue.component('todo-list', TodoList);

const app = new Vue({
    el: '#container'
});
