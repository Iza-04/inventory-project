<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const inventory = ref([]);

onMounted(async () => {
  const res = await axios.get("http://localhost:5000/api/stocks");
  inventory.value = res.data;
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Инвентарь</h2>

    <table class="w-full border">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">ID</th>
          <th class="border p-2">Название</th>
          <th class="border p-2">Количество</th>
          <th class="border p-2">Категория</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in inventory" :key="item.id">
          <td class="border p-2">{{ item.id }}</td>
          <td class="border p-2">{{ item.name }}</td>
          <td class="border p-2">{{ item.quantity }}</td>
          <td class="border p-2">{{ item.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
