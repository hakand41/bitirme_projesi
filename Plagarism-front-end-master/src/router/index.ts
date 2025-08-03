// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import Login            from "../views/Login.vue";
import Register         from "../views/Register.vue";
import AdminDashboard   from "../views/AdminDashboard.vue";
import TeacherDashboard from "../views/TeacherDashboard.vue";
import StudentDashboard from "../views/StudentDashboard.vue";
import ComparisonView from '@/views/ComparisonView.vue'
import ErrorGithub from "@/components/ErrorView/ErrorGithub.vue"; 
import ErrorGoogle from "@/components/ErrorView/ErrorGoogle.vue";
// Basit JWT payload parse fonksiyonu
function parseJwt(token: string): { exp?: number } {
  try {
    // token: header.payload.signature
    const base64Url = token.split(".")[1];
    // URL-safe Base64 → standart Base64
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // atob ile payload’u elde et, URI component’e çevir
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return {};
  }
}

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login",    name: "Login",           component: Login },
  { path: "/register", name: "Register",        component: Register },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: "Admin" },
  },
  {
    path: "/teacher",
    name: "TeacherDashboard",
    component: TeacherDashboard,
    meta: { requiresAuth: true, role: "Teacher" },
  },
  {
    path: "/student",
    name: "StudentDashboard",
    component: StudentDashboard,
    meta: { requiresAuth: true, role: "Student" },
  },
  {
    path: '/comparison/:contentId',
    name: 'Comparison',
    component: ComparisonView,
    props: true,
    meta: { requiresAuth: true, role: "Teacher" }
  },{
    path : '/error/github',
    name : 'ErrorGithub',
    component : ErrorGithub,
  },{
    path : '/error/google',
    name : 'ErrorGoogle',
    component : ErrorGoogle,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global route guard
router.beforeEach((to, from, next) => {
  const token = store.state.token;

  // 1) Token süresi dolmuş mu?
  if (token) {
    const { exp = 0 } = parseJwt(token);
    if (Date.now() >= exp * 1000) {
      store.dispatch("logout");
      return next({ name: "Login" });
    }
  }

  const isAuth = store.getters.isAuthenticated;
  const role   = store.getters.userRole;

  // 2) Auth gerektiren sayfalar
  if (to.meta.requiresAuth && !isAuth) {
    return next({ name: "Login" });
  }

  // 3) Role kontrolü
  if (to.meta.role && to.meta.role !== role) {
    return next({ name: "Login" });
  }

  // 4) Zaten girişli Admin, Login’e gelmesin
  if (to.name === "Login" && isAuth && role === "Admin") {
    return next({ name: "AdminDashboard" });
  }

  next();
});

export default router;
