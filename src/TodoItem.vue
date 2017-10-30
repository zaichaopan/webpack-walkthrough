<template>
    <li>
        <input type="checkbox" id="checkbox" v-model="task.completed">
        <label for="checkbox">{{ task.name }}</label>
    </li>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    }
}
</script>
