import { createRouter, createWebHistory } from "vue-router";
import InventoryPage from "@/pages/InventoryPage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";

const routes = [
  { path: "/", name: "inventory", component: InventoryPage },
  { path: "/admin", name: "admin", component: AdminPage },
  { path: "/profile", name: "profile", component: ProfilePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
