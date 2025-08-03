// src/main.ts
import "./plugins/axios";

import "vuetify/dist/vuetify.min.css";
import "./style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import router from "./router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";

const app = createApp(App);

// 4. Plugin’leri sırayla kullanın
app.use(createPinia());  // Pinia (veya Vuex store’unuz)
app.use(store);          // Vuex Store
app.use(router);         // Vue Router
app.use(vuetify);        // Vuetify

// 5. Uygulamayı mount edin
app.mount("#app");
