<template>
  <div class="container">
    <h1>📦 Inventory</h1>

    <form @submit.prevent="addItem">
      <input v-model="name" placeholder="Item name" />
      <input v-model.number="quantity" placeholder="Quantity" type="number" />
      <button>Add</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in inventories" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getInventories, createInventory } from "../services/inventoryService";

const inventories = ref([]);
const name = ref("");
const quantity = ref(1);

const load = async () => {
  inventories.value = await getInventories();
};

const addItem = async () => {
  await createInventory({
    name: name.value,
    quantity: quantity.value,
  });

  name.value = "";
  quantity.value = 1;

  await load();
};

onMounted(load);
</script>

<style>
.container {
  width: 600px;
  margin: 20px auto;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>
