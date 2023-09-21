<template>
  <h1> Tasks </h1>

  <div class='incompleted-div'>
    <ul>
      <task @complete='complete($event)' v-for='task in incomplete_tasks' :key='task.id' :task='task' />
    </ul>
  </div>

  <button @click='previousInCompletedPage'> Previous Page</button>
  <button @click='nextInCompletedPage'> Next Page</button>

  <hr>

  <div class='completed-div'>
    <ul>
      <task @incomplete='incomplete($event)' v-for='task in completed_tasks' :key='task.id' :task='task' />
    </ul>
  </div>

  <button @click='previousCompletedPage'> Previous Page</button>
  <button @click='nextCompletedPage'> Next Page</button>
</template>

<script>
import { Link } from '@inertiajs/inertia-vue3';
import { router } from '@inertiajs/vue3';
import Task from '../../Components/Task.vue';
import axios from 'axios';

export default {
  components: {
    Link,
    Task
  },
  props: {
    ipage: {
      type: Number,
      required: false,
      default: 1,
    },
    cpage: {
      type: Number,
      required: false,
      default: 1,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      completedTasksData: [],
      incompleteTasksData: [],
    };
  },
  computed: {
    completed_tasks() {
      return this.completedTasksData?.data;
    },
    incomplete_tasks() {
      return this.incompleteTasksData?.data;
    },
    cpagination() {
      return this.completedTasksData?.meta;
    },
    ipagination() {
      return this.incompleteTasksData?.meta;
    },
  },
  mounted() {
    this.completedTasksData = this.data.completedTasksData;
    this.incompleteTasksData = this.data.incompleteTasksData;
  },
  methods: {
    nextInCompletedPage() {
      router.visit(
        '/tasks', {
          method: 'get',
          data: {
            ipage: parseInt(this.ipage) + 1,
          },
        },
      );
    },
    previousInCompletedPage() {
      router.visit(
        '/tasks', {
          method: 'get',
          data: {
            ipage: parseInt(this.ipage) - 1,
          },
        },
      );
    },
    nextCompletedPage() {
      router.visit(
        '/tasks', {
          method: 'get',
          data: {
            cpage: parseInt(this.cpage) + 1,
          },
        },
      );
    },
    previousCompletedPage() {
      router.visit(
        '/tasks', {
          method: 'get',
          data: {
            cpage: parseInt(this.cpage) - 1,
          },
        },
      );
    },
    complete(id) {
      axios.put(`/tasks/${id}`, {
        completed: 1,
      }).then(() => {
        this.refreshList(false);
        this.refreshList(true);
      });
    },
    incomplete(id) {
      axios.put(`/tasks/${id}`, {
        completed: 0,
      }).then(() => {
        this.refreshList(true);
        this.refreshList(false);
      });
    },
    refreshList(completedTasks) {
      console.log('kokot');
      let page = completedTasks ? this.cpage : this.ipage;

      let data = axios.get('/tasks/list', {
        params: {
          page: page,
          completed: completedTasks ? 1 : 0
        },
      }).then((response) => {
        if (completedTasks) {
          this.completedTasksData = response.data;
          console.log({
            response: response.data,
            data: this.completedTasksData,
          })
        } else {
          this.incompleteTasksData = response.data;
          console.log({
            response: response.data,
            data: this.incompleteTasksData,
          })
        }
      });
    }
  },
};
</script>

<style scoped>

</style>
