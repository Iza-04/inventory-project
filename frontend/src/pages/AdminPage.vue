<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
const loading = ref(true);

onMounted(async () => {
  const res = await axios.get("http://localhost:5000/api/users");
  users.value = res.data;
  loading.value = false;
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Админ — список пользователей</h2>

    <table class="w-full border">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">ID</th>
          <th class="border p-2">Имя</th>
          <th class="border p-2">Email</th>
          <th class="border p-2">Роль</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td class="border p-2">{{ u.id }}</td>
          <td class="border p-2">{{ u.name }}</td>
          <td class="border p-2">{{ u.email }}</td>
          <td class="border p-2">{{ u.role }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading" class="text-gray-500 mt-4">Загрузка...</div>
  </div>
</template>
