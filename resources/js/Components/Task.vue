<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    complete() {
      this.task.completed = true;
      this.$emit('complete', this.task.id);
    },
    incomplete() {
      this.task.completed = false;
      this.$emit('incomplete', this.task.id);
    },
  },
});
</script>

<template>
  <li>
    <h3> {{ task.title }} </h3>
    <sub> {{ task.description }} </sub>
    <button @click="complete" v-if="!task.completed"> Complete </button>
    <button @click="incomplete" v-if="task.completed"> Incomplete </button>
    <button @click="$emit('delete', task.id)"> Delete </button>
  </li>
</template>

<style scoped>

</style>
