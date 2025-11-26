<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import DataTable from "@/components/DataTable.vue";

const columns = ["id", "email", "role"];
const rows = [
  { id: 1, email: "test@gmail.com", role: "admin" }
];
</script>



const userOrders = ref([]);

onMounted(async () => {
  const res = await axios.get("http://localhost:5000/api/orders?userId=1");
  userOrders.value = res.data;
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Ваши заказы</h2>

    <table class="w-full border">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">№ заказа</th>
          <th class="border p-2">Дата</th>
          <th class="border p-2">Статус</th>
          <th class="border p-2">Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in userOrders" :key="o.id">
          <td class="border p-2">{{ o.id }}</td>
          <td class="border p-2">{{ o.date }}</td>
          <td class="border p-2">{{ o.status }}</td>
          <td class="border p-2">{{ o.total }} $</td>
        </tr>
      </tbody>
    </table>
  </div>
  <DataTable :columns="columns" :rows="rows" />
</template>
