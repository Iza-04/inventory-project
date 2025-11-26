<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import DataTable from "@/components/DataTable.vue";

const items = ref([]);

const columns = ["id", "name", "category", "price", "count"];

onMounted(async () => {
  const { data } = await axios.get("/api/inventories");
  items.value = data.inventories;
});
</script>

<template>
  <h1>Inventory</h1>
  <DataTable :columns="columns" :rows="items" />
</template>
