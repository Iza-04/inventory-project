<script setup>
import DataTable from "@/components/DataTable.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const columns = ["id", "name", "email", "role"];
const users = ref([]);

onMounted(async () => {
  const { data } = await axios.get("/api/users");
  users.value = data.users;
});
</script>

<template>
  <div>
    <h1>Admin panel</h1>

    <DataTable :columns="columns" :rows="users" />
  </div>
</template>
