<script setup>
import DataTable from "@/components/DataTable.vue";

// для примера
const columns = ["id", "email", "role"];
const rows = [
  { id: 1, email: "profileiza@gmail.com", role: "user" },
  { id: 2, email: "adminiza@gmail.com", role: "admin" },
];
</script>

<template>
  <div>
    <h1>Profile</h1>

    <DataTable :columns="columns" :rows="rows" />
  </div>
</template>
