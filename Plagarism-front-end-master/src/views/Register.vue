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
          <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">Hesap Oluştur</h1>
          <p class="text-center text-gray-500 mb-8">Bilgilerinizi girerek hesabınızı oluşturun</p>
          
          <form @submit.prevent="handleRegister" class="space-y-5">
            <!-- Ad ve Soyad -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="ad" class="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <input
                    v-model="ad"
                    type="text"
                    id="ad"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Adınız"
                    required
                  />
                </div>
              </div>
              <div>
                <label for="soyad" class="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                <input
                  v-model="soyad"
                  type="text"
                  id="soyad"
                  class="block w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Soyadınız"
                  required
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="ornek@mail.com"
                  required
                />
              </div>
            </div>

            <!-- Şifre -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  v-model="password"
                  type="password"
                  id="password"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <!-- Rol Seçimi -->
            <div>
              <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Hesap Türü</label>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <input
                    v-model="role"
                    type="radio"
                    id="student"
                    value="Student"
                    class="hidden peer"
                    checked
                  />
                  <label
                    for="student"
                    class="flex items-center justify-center p-3 w-full border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-600 hover:bg-gray-50"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    Öğrenci
                  </label>
                </div>
                <div>
                  <input
                    v-model="role"
                    type="radio"
                    id="teacher"
                    value="Teacher"
                    class="hidden peer"
                  />
                  <label
                    for="teacher"
                    class="flex items-center justify-center p-3 w-full border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-600 hover:bg-gray-50"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                    Öğretmen
                  </label>
                </div>
              </div>
            </div>

            <!-- Hata Mesajı -->
            <div v-if="error" class="p-3 bg-red-50 text-red-600 rounded-lg flex items-center">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ error }}
            </div>

            <!-- Kayıt Butonu -->
            <button
              type="submit"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              :disabled="loading"
            >
              <span v-if="!loading">Hesap Oluştur</span>
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </form>
        </div>
        
        <!-- Giriş Yap Kısmı -->
        <div class="bg-gray-50 px-8 py-6 rounded-b-xl text-center">
          <p class="text-gray-600">Zaten bir hesabınız var mı?</p>
          <router-link 
            to="/login" 
            class="mt-2 text-indigo-600 hover:text-indigo-500 font-medium hover:underline focus:outline-none"
          >
            Giriş yapın
          </router-link>
        </div>
      </div>
    </div>

    <!-- Toast Bildirim Sistemi -->
    <div 
      v-if="showToast" 
      class="fixed bottom-4 right-4 flex items-center p-4 mb-4 space-x-3 text-green-800 bg-white rounded-lg shadow-lg border-l-4 border-green-500 animate-slide-up transform transition-all duration-300"
      role="alert"
    >
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg">
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div class="text-sm font-medium">
        {{ toastMessage }}
      </div>
      <button type="button" class="ml-auto -mx-1.5 -my-1.5" @click="hideToast">
        <svg class="w-4 h-4 text-gray-400 hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ad: "",
      soyad: "",
      email: "",
      password: "",
      role: "Student",
      error: null,
      loading: false,
      showToast: false,
      toastMessage: "",
      toastTimer: null
    };
  },
  methods: {
    async handleRegister() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.post("https://localhost:7057/api/Kullanici", {
          Ad: this.ad,
          Soyad: this.soyad,
          Eposta: this.email,
          Sifre: this.password,
          Rol: this.role,
        });

        // Başarılı kayıt sonrası toast bildirimini göster
        this.showSuccessToast(`Tebrikler ${this.ad}! Hesabınız başarıyla oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz...`);
        
        // 3 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
          this.$router.push({
            name: 'Login',
            query: { registered: 'true' }
          });
        }, 3000);
      } catch (error) {
        this.error = error.response?.data?.errors
          ? Object.values(error.response.data.errors).flat().join(", ")
          : "Kayıt işlemi sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.";
      } finally {
        this.loading = false;
      }
    },

    // Toast bildirimini gösterme metodu
    showSuccessToast(message) {
      // Eğer önceki bir zamanlayıcı varsa temizle
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
      }
      
      this.toastMessage = message;
      this.showToast = true;
      
      // 5 saniye sonra toast bildirimi gizle
      this.toastTimer = setTimeout(() => {
        this.hideToast();
      }, 5000);
    },
    
    // Toast bildirimini gizleme metodu
    hideToast() {
      this.showToast = false;
    }
  }
};
</script>

<style scoped>
/* Animasyonlar */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

input[type="radio"]:checked + label {
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5);
}
</style>