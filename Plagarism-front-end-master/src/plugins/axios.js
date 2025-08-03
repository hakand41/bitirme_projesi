import axios from "axios";
import router from "@/router";
import store from "@/store";

function parseJwt(token) {
  try {
    const b64  = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(b64);
    return JSON.parse(json);
  } catch {
    return {};
  }
}

axios.interceptors.request.use(config => {
  const token = store.state.token;
  if (token) {
    const { exp = 0 } = parseJwt(token);
    if (Date.now() >= exp * 1000) {
      // Süresi dolmuş
      store.dispatch("logout");
      // Hem history’yi temizleyelim hem de doğrudan sayfayı değiştir
      router.replace({ name: "Login" });
      // fallback olarak window.location
      window.location.href = "/login";
      // isteği iptal et
      throw new axios.Cancel("Token expired");
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Hem Cancel hem de HTTP 401 için yakalayalım
axios.interceptors.response.use(
  res => res,
  err => {
    // eğer axios.Cancel atıldıysa veya 401
    if (axios.isCancel(err) || err.response?.status === 401) {
      store.dispatch("logout");
      router.replace({ name: "Login" });
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axios;
