<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo Alanı -->
      <div class="flex justify-center mb-8">
        <div class="bg-white p-4 rounded-full shadow-lg">
          <svg class="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
      </div>

      <!-- Kart -->
      <div class="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div class="p-8">
          <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">Hoş Geldiniz</h1>
          <p class="text-center text-gray-500 mb-8">Devam etmek için hesabınıza giriş yapın</p>
          
          <form @submit.prevent="login" class="space-y-6">
            <!-- Email Input -->
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <input
                v-model="email"
                type="email"
                class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="E-posta adresiniz"
                required
              />
            </div>
            
            <!-- Password Input -->
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                v-model="password"
                type="password"
                class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Şifreniz"
                required
              />
            </div>
            
            <!-- Şifremi Unuttum -->
            <div class="flex items-center justify-end">
              <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500 hover:underline">Şifremi unuttum?</a>
            </div>
            
            <!-- Giriş Butonu -->
            <button
              type="submit"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              :disabled="loading"
            >
              <span v-if="!loading">Giriş Yap</span>
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
            
            <!-- Hata Mesajı -->
            <div v-if="error" class="mt-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ error }}
            </div>
          </form>
        </div>
        
        <!-- Kayıt Ol Kısmı -->
        <div class="bg-gray-50 px-8 py-6 rounded-b-xl text-center">
          <p class="text-gray-600">Hesabınız yok mu?</p>
          <button 
            @click="goToRegister" 
            class="mt-2 text-indigo-600 hover:text-indigo-500 font-medium hover:underline focus:outline-none"
          >
            Kayıt olun
          </button>
        </div>
      </div>
      
      <!-- Sosyal Medya Girişleri -->
      <div class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Veya şununla devam edin</span>
          </div>
        </div>
        
        <div class="mt-6 grid grid-cols-2 gap-3">
          <button
            @click="loginWithGithub"
            type="button"
            class="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clip-rule="evenodd"></path>
            </svg>
            <span class="ml-2">GitHub</span>
          </button>
          
          <button
            @click="loginWithGoogle"
            type="button"
            class="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm6.25 10c0 3.452-2.798 6.25-6.25 6.25-3.452 0-6.25-2.798-6.25-6.25 0-3.452 2.798-6.25 6.25-6.25 3.452 0 6.25 2.798 6.25 6.25zm-6.25-3.125a3.125 3.125 0 100 6.25 3.125 3.125 0 000-6.25z" clip-rule="evenodd"></path>
            </svg>
            <span class="ml-2">Google</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      loading: false
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch("https://localhost:7057/api/Auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Eposta: this.email, Sifre: this.password }),
        });

        if (!response.ok) {
          throw new Error("Giriş başarısız");
        }

        const data = await response.json();
        
        // Vuex'e kullanıcı bilgilerini kaydet
        await this.$store.dispatch("login", {
          token: data.token,
          role: data.rol,
          id: data.id,
          refreshToken: data.refreshToken,
          userName: data.userName,
        });

        // Kullanıcı rolüne göre yönlendirme yap
        this.redirectUser(data.rol);
      } catch (error) {
        console.error("Giriş hatası:", error);
        this.error = "E-posta veya şifre yanlış. Lütfen tekrar deneyin.";
      } finally {
        this.loading = false;
      }
    },
    goToRegister() {
      this.$router.push({ name: "Register" });
    },
    redirectUser(role) {
      const routes = {
        Admin: "AdminDashboard",
        Teacher: "TeacherDashboard",
        Student: "StudentDashboard"
      };
      
      if (routes[role]) {
        this.$router.push({ name: routes[role] });
      }
    },
    loginWithGithub(){
      this.$router.push({ name: 'ErrorGithub' });
      //alert("GitHub ile giriş yapma işlemi henüz uygulanmadı.");
    },
    loginWithGoogle(){
      this.$router.push({ name: 'ErrorGoogle' });
      //alert("Google ile giriş yapma işlemi henüz uygulanmadı.");
    },
    setupAxiosInterceptors() {
      axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
          if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const newToken = await this.$store.dispatch("refreshToken");
              axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              return axios(originalRequest);
            } catch (refreshError) {
              this.$store.dispatch("logout");
              return Promise.reject(refreshError);
            }
          }
          return Promise.reject(error);
        }
      );
    }
  },
  watch: {
    $route(to, from) {
      if (this.$store.getters.isAuthenticated && (from.name === null || from.name === "Login")) {
        this.redirectUser(this.$store.getters.userRole);
      }
    }
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      this.redirectUser(this.$store.getters.userRole);
    }
  },
  created() {
    this.setupAxiosInterceptors();
  }
};
</script>

<style>
/* Animasyonlar */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Geçişler */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Özel scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>