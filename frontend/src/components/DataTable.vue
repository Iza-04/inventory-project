<template>
  <div class="data-table">
    <!-- Поиск -->
    <input
      v-model="search"
      type="text"
      placeholder="Поиск..."
      class="search-input"
    />

    <!-- Таблица -->
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col"
            @click="sortBy(col)"
            class="sortable"
          >
            {{ col }}
            <span v-if="sort.column === col">
              {{ sort.direction === "asc" ? "▲" : "▼" }}
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in paginatedRows" :key="row.id">
          <td v-for="col in columns" :key="col">{{ row[col] }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Пагинация -->
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">Назад</button>

      <span>Страница {{ page }} из {{ totalPages }}</span>

      <button @click="nextPage" :disabled="page === totalPages">Вперед</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
});

// Поиск
const search = ref("");

const filteredRows = computed(() => {
  if (!search.value) return props.rows;

  return props.rows.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(search.value.toLowerCase())
  );
});
// Сортировка
const sort = ref({
  column: "",
  direction: "asc",
});

function sortBy(column) {
  if (sort.value.column === column) {
    sort.value.direction = sort.value.direction === "asc" ? "desc" : "asc";
  } else {
    sort.value.column = column;
    sort.value.direction = "asc";
  }
}

const sortedRows = computed(() => {
  if (!sort.value.column) return filteredRows.value;

  return [...filteredRows.value].sort((a, b) => {
    const col = sort.value.column;
    const dir = sort.value.direction === "asc" ? 1 : -1;

    if (a[col] > b[col]) return dir;
    if (a[col] < b[col]) return -dir;
    return 0;
  });
});
// Пагинация
const page = ref(1);
const perPage = 10;

const totalPages = computed(() => Math.ceil(sortedRows.value.length / perPage));

const paginatedRows = computed(() => {
  const start = (page.value - 1) * perPage;
  return sortedRows.value.slice(start, start + perPage);
});

function nextPage() {
  if (page.value < totalPages.value) page.value++;
}

function prevPage() {
  if (page.value > 1) page.value--;
}
</script>

<style scoped>
.data-table {
  max-width: 100%;
  margin: 20px 0;
}

.search-input {
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 12px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 10px;
}

.sortable {
  cursor: pointer;
  user-select: none;
  background: #f7f7f7;
}

.table th:hover {
  background: #eee;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
