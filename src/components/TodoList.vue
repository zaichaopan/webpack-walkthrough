<template>
    <u>
        <todo-item v-for="(item, index) in tasks" :key="index" :task="item"></todo-item>
    </u>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  components: { TodoItem },

  data() {
    return {
      tasks: [
        { name: "Go to grocery", completed: true },
        { name: "Go to school", completed: false },
        { name: "Go to landuary", completed: false },
        { name: "Go to Meetting", completed: false },
        { name: "Go to Party", completed: false }
      ]
    };
  }
};
</script>

