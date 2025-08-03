import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    id: localStorage.getItem("id") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    userName: localStorage.getItem("userName") || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setRole(state, role) {
      state.role = role;
      localStorage.setItem("role", role);
    },
    setId(state, id) {
      state.id = id;
      localStorage.setItem("id", id);
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
      document.cookie = `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict;`;
    },
    setUserName(state, userName) {
      console.log("Setting userName:", userName); // Debug için log ekleyin
      if (!userName) {
        console.error("userName is undefined or null!"); // Hata durumunda log ekleyin
      }
      state.userName = userName;
      localStorage.setItem("userName", userName);
    },
    clearAuth(state) {
      state.token = null;
      state.role = null;
      state.id = null;
      state.userName = null;
      state.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userName");
      document.cookie = "refreshToken=; Max-Age=0; Secure; SameSite=Strict;";
    },
  },
  actions: {
    async login({ commit }, { token, role, id, refreshToken, userName }) {
      try {
        console.log("Received userName:", userName);
        if (!userName) {
          console.error("userName is undefined or null!"); // Hata durumunda log ekleyin
          throw new Error("userName is required!");
        }
        commit("setToken", token);
        commit("setRole", role);
        commit("setId", id);
        commit("setRefreshToken", refreshToken);
        commit("setUserName", userName); // Kullanıcı adını kaydet
      }  catch (error) {
        console.error("Login action error:", error);
      }
    },
    async refreshToken({ commit, dispatch }) {
      try {
        const response = await axios.post("/api/auth/refresh", {}, { withCredentials: true });
        commit("setToken", response.data.Token);
        commit("setRefreshToken", response.data.RefreshToken);
        return response.data;
      } catch (error) {
        console.error("Refresh token hatası:", error.response?.data || error.message);
        dispatch("logout"); // Refresh token başarısız olursa oturumu kapat
        throw error;
      }
    },
    logout({ commit }) {
      commit("clearAuth");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    tokenExpiresAt: (state) => {
      try {
        const { exp } = jwtDecode(state.token)
        // exp saniye cinsinden, Date.now() ise ms
        return exp * 1000
      } catch {
        return 0
      }
    },
    userRole: (state) => state.role,
    userId: (state) => state.id,
    getRefreshToken: (state) => state.refreshToken,
    getUserName: (state) => state.userName, // Kullanıcı adını döndüren getter
  },
});

export default store; 