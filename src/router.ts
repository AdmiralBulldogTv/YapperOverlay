import {
  createRouter,
  RouteRecordRaw,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/Index.vue"),
  },
  {
    path: "/admin",
    component: () => import("@/views/Admin/Index.vue"),
  },
  {
    path: "/overlay/:id",
    component: () => import("@/views/Overlay/Index.vue"),
  },
];

export default createRouter({ routes, history: createWebHistory() });
