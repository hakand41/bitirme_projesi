<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Başlık -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Admin Paneli</h1>
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <i class="fas fa-user-circle text-indigo-600 text-2xl mr-2"></i>
            <span class="text-gray-700 font-medium">
              Hoş geldiniz, <span class="font-semibold">{{ userName }}</span>
            </span>
          </div>
          <button
            @click="logout"
            class="flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            <i class="fas fa-sign-out-alt mr-2"></i> Çıkış Yap
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- İstatistik Kartları -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm font-medium">Toplam Kullanıcı</p>
              <p class="text-3xl font-bold">{{ totalUsers }}</p>
            </div>
            <i class="fas fa-users text-3xl opacity-20"></i>
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm font-medium">Oluşturulan Ödev</p>
              <p class="text-3xl font-bold">{{ totalAssignments }}</p>
            </div>
            <i class="fas fa-tasks text-3xl opacity-20"></i>
          </div>
        </div>

        <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm font-medium">Teslim Edilen Ödev</p>
              <p class="text-3xl font-bold">{{ totalAssignmentsForStudent }}</p>
            </div>
            <i class="fas fa-file-upload text-3xl opacity-20"></i>
          </div>
        </div>
      </div>

      <!-- Kullanıcı Yönetimi -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-900">Kullanıcı Yönetimi</h2>
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Kullanıcı ara..."
              class="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            <button 
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ad Soyad
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-Posta
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in filteredUsers" :key="user.kullaniciId" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i class="fas fa-user text-indigo-600"></i>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.ad }} {{ user.soyad }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ user.eposta }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{
                    'bg-blue-100 text-blue-800': user.rol === 'Admin',
                    'bg-green-100 text-green-800': user.rol === 'Teacher',
                    'bg-purple-100 text-purple-800': user.rol === 'Student'
                  }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ user.rol }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="openEditModal(user)" class="text-indigo-600 hover:text-indigo-900 mr-4">
                    <i class="fas fa-edit mr-1"></i> Düzenle
                  </button>
                  <button @click="confirmDeleteUser(user)" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash-alt mr-1"></i> Sil
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Ödevler Bölümü -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Öğretmene Göre Ödevler -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="px-6 py-4 bg-indigo-50 border-b border-indigo-100 flex items-center">
            <i class="fas fa-chalkboard-teacher text-indigo-600 mr-3 text-xl"></i>
            <h2 class="text-lg font-semibold text-gray-900">Öğretmene Göre Ödevler</h2>
          </div>
          <div class="p-6">
            <form @submit.prevent="fetchAssignmentsByTeacher" class="space-y-4">
              <div class="flex items-center space-x-4">
                <div class="flex-1 relative">
                  <input
                    v-model="teacherName"
                    type="text"
                    class="block w-full pl-10 pr-12 py-3 sm:text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Öğretmen adı girin"
                  />
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-user-tie text-gray-400"></i>
                  </div>
                </div>
                <button
                  type="submit"
                  class="flex-shrink-0 inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <i class="fas fa-search mr-2"></i> Ara
                </button>
              </div>
            </form>

            <div v-if="assignments.length > 0" class="mt-6 space-y-4">
              <div v-for="assignment in assignments" :key="assignment.id" class="group p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 group-hover:text-indigo-600">{{ assignment.baslik }}</h3>
                    <p class="mt-1 text-sm text-gray-600 line-clamp-2">{{ assignment.aciklama }}</p>
                  </div>
                  <span class="text-xs px-2 py-1 rounded-full" :class="{
                    'bg-green-100 text-green-800': !isDeadlinePassed(assignment.bitisTarihi),
                    'bg-red-100 text-red-800': isDeadlinePassed(assignment.bitisTarihi)
                  }">
                    {{ isDeadlinePassed(assignment.bitisTarihi) ? 'Süresi Doldu' : 'Aktif' }}
                  </span>
                </div>
                <div class="mt-3 flex items-center text-sm text-gray-500">
                  <i class="far fa-calendar-alt mr-2 text-indigo-500"></i>
                  <span>Teslim Tarihi: {{ formatDate(assignment.bitisTarihi) }}</span>
                </div>
                <div class="mt-3 flex justify-end">
                  <button class="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                    Detayları Gör <i class="fas fa-chevron-right ml-1 text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
            <div v-else-if="teacherName" class="mt-6 text-center py-8 bg-gray-50 rounded-lg">
              <i class="fas fa-exclamation-circle text-gray-400 text-4xl mb-3"></i>
              <p class="text-gray-500">Bu öğretmene ait ödev bulunamadı</p>
            </div>
            <div v-else class="mt-6 text-center py-8 bg-gray-50 rounded-lg">
              <i class="fas fa-info-circle text-gray-400 text-4xl mb-3"></i>
              <p class="text-gray-500">Öğretmen adı girerek ödevleri listeleyin</p>
            </div>
          </div>
        </div>

        <!-- Aktif Ödevler -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="px-6 py-4 bg-green-50 border-b border-green-100 flex items-center">
            <i class="fas fa-clock text-green-600 mr-3 text-xl"></i>
            <h2 class="text-lg font-semibold text-gray-900">Aktif Ödevler</h2>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <p class="text-sm text-gray-500">Son güncellenme: {{ new Date().toLocaleTimeString() }}</p>
              <button
                @click="fetchActiveAssignments"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                <i class="fas fa-sync-alt mr-1"></i> Yenile
              </button>
            </div>

            <div v-if="activeAssignments.length > 0" class="space-y-4">
              <div v-for="assignment in activeAssignments" :key="assignment.id" class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">{{ assignment.baslik }}</h3>
                    <p class="mt-1 text-sm text-gray-600 line-clamp-2">{{ assignment.aciklama }}</p>
                  </div>
                  <span class="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <i class="fas fa-circle text-green-500 mr-1 text-xs"></i> Aktif
                  </span>
                </div>
                
                <div class="mt-4">
                  <div class="flex items-center justify-between text-sm text-gray-500 mb-1">
                    <span><i class="far fa-calendar-alt mr-1"></i> Teslim: {{ formatDate(assignment.bitisTarihi) }}</span>
                    <span class="font-medium" :class="{
                      'text-green-600': daysRemaining(assignment.bitisTarihi) > 3,
                      'text-yellow-600': daysRemaining(assignment.bitisTarihi) <= 3 && daysRemaining(assignment.bitisTarihi) > 0,
                      'text-red-600': daysRemaining(assignment.bitisTarihi) === 0
                    }">
                      {{ daysRemaining(assignment.bitisTarihi) > 0 ? 
                         `${daysRemaining(assignment.bitisTarihi)} gün kaldı` : 
                         'Son gün' 
                      }}
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full" 
                      :class="{
                        'bg-green-500': daysRemaining(assignment.bitisTarihi) > 3,
                        'bg-yellow-500': daysRemaining(assignment.bitisTarihi) <= 3 && daysRemaining(assignment.bitisTarihi) > 0,
                        'bg-red-500': daysRemaining(assignment.bitisTarihi) === 0
                      }"
                      :style="{ width: progressPercentage(assignment.bitisTarihi) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 bg-gray-50 rounded-lg">
              <i class="fas fa-check-circle text-gray-400 text-4xl mb-3"></i>
              <p class="text-gray-500">Şu anda aktif ödev bulunmamaktadır</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Kullanıcı Güncelleme Modalı -->
    <div v-if="isUserUpdateModalOpen" class="fixed inset-0 overflow-y-auto z-50 animate-fade-in">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Arkaplan overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75" @click="closeModal"></div>
        </div>

        <!-- Modal içeriği -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                <i class="fas fa-user-edit text-indigo-600"></i>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Kullanıcı Bilgilerini Güncelle
                </h3>
                <div class="mt-4 space-y-4">
                  <div>
                    <label for="ad" class="block text-sm font-medium text-gray-700">Ad</label>
                    <input
                      type="text"
                      id="ad"
                      v-model="editUserDto.ad"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label for="soyad" class="block text-sm font-medium text-gray-700">Soyad</label>
                    <input
                      type="text"
                      id="soyad"
                      v-model="editUserDto.soyad"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label for="eposta" class="block text-sm font-medium text-gray-700">E-Posta</label>
                    <input
                      type="email"
                      id="eposta"
                      v-model="editUserDto.eposta"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label for="rol" class="block text-sm font-medium text-gray-700">Rol</label>
                    <select
                      id="rol"
                      v-model="editUserDto.rol"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="Teacher">Öğretmen</option>
                      <option value="Student">Öğrenci</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="updateUser"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <i class="fas fa-save mr-2"></i> Güncelle
            </button>
            <button
              type="button"
              @click="closeModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <i class="fas fa-times mr-2"></i> İptal
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div v-if="isDeleteConfirmationOpen" class="fixed inset-0 overflow-y-auto z-50 animate-fade-in">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Arkaplan overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75" @click="cancelDelete"></div>
        </div>

        <!-- Modal içeriği -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <i class="fas fa-exclamation-triangle text-red-600"></i>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Kullanıcıyı Sil
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <span class="font-semibold">{{ userToDelete.ad }} {{ userToDelete.soyad }}</span> adlı kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="deleteUser"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <i class="fas fa-trash-alt mr-2"></i> Sil
            </button>
            <button
              type="button"
              @click="cancelDelete"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <i class="fas fa-times mr-2"></i> İptal
            </button>
          </div>
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
      isUserUpdateModalOpen: false,
      isDeleteConfirmationOpen: false,
      editUserDto: {
        kullaniciId: null,
        ad: "",
        soyad: "",
        eposta: "",
        rol: "Teacher",
      },
      userToDelete: {
        kullaniciId: null,
        ad: "",
        soyad: ""
      },
      users: [],
      allUsers: [],
      totalUsers: 0,
      totalAssignments: 0,
      totalAssignmentsForStudent: 0,
      teacherName: "",
      assignments: [],
      assigmentForStudent: [],
      activeAssignments: [],
      searchQuery: "",
    };
  },
  computed: {
    userName() {
      return this.$store.getters.getUserName;
    },
    filteredUsers() {
      if (!this.searchQuery) {
        return this.users;
      }
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user => {
        return (
          user.ad.toLowerCase().includes(query) ||
          user.soyad.toLowerCase().includes(query) ||
          user.eposta.toLowerCase().includes(query) ||
          user.rol.toLowerCase().includes(query)
        );
      });
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("https://localhost:7057/api/Kullanici");
        this.users = response.data;
        this.allUsers = response.data;
        this.totalUsers = this.users.length;
      } catch (error) {
        console.error("Kullanıcılar yüklenirken hata oluştu:", error);
      }
    },
    async fetchAssignmentsByTeacher() {
      try {
        const response = await axios.get(
          `https://localhost:7057/api/Icerik/teacher/${this.teacherName}`
        );
        this.assignments = response.data;
      } catch (error) {
        console.error("Ödevler yüklenirken hata oluştu:", error);
        this.assignments = [];
      }
    },
    async fetchActiveAssignments() {
      try {
        const response = await axios.get(
          "https://localhost:7057/api/Icerik/active"
        );
        this.activeAssignments = response.data;
      } catch (error) {
        console.error("Aktif ödevler yüklenirken hata oluştu:", error);
        this.activeAssignments = [];
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    isDeadlinePassed(deadline) {
      return new Date(deadline) < new Date();
    },
    daysRemaining(deadline) {
      const diffTime = new Date(deadline) - new Date();
      return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    },
    progressPercentage(deadline) {
      const startDate = new Date();
      const endDate = new Date(deadline);
      const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const daysLeft = this.daysRemaining(deadline);
      return Math.min(100, Math.max(0, ((totalDays - daysLeft) / totalDays) * 100));
    },
    openEditModal(user) {
      this.editUserDto = {
        kullaniciId: user.kullaniciId,
        ad: user.ad,
        soyad: user.soyad,
        eposta: user.eposta,
        rol: user.rol
      };
      this.isUserUpdateModalOpen = true;
    },
    confirmDeleteUser(user) {
      this.userToDelete = {
        kullaniciId: user.kullaniciId,
        ad: user.ad,
        soyad: user.soyad
      };
      this.isDeleteConfirmationOpen = true;
    },
    cancelDelete() {
      this.isDeleteConfirmationOpen = false;
      this.userToDelete = {
        kullaniciId: null,
        ad: "",
        soyad: ""
      };
    },
    async deleteUser() {
      try {
        await axios.delete(`https://localhost:7057/api/Kullanici/${this.userToDelete.kullaniciId}`);
        this.users = this.users.filter((user) => user.kullaniciId !== this.userToDelete.kullaniciId);
        this.totalUsers = this.users.length;
        this.isDeleteConfirmationOpen = false;
        
        // Başarı bildirimi
        this.$toast.success(`${this.userToDelete.ad} ${this.userToDelete.soyad} başarıyla silindi`, {
          position: 'top-right',
          duration: 3000
        });
      } catch (error) {
        console.error("Kullanıcı silinirken hata oluştu:", error);
        
        // Hata bildirimi
        this.$toast.error('Kullanıcı silinirken bir hata oluştu', {
          position: 'top-right',
          duration: 3000
        });
      } finally {
        this.userToDelete = {
          kullaniciId: null,
          ad: "",
          soyad: ""
        };
      }
    },
    async updateUser() {
      try {
        await axios.put(`https://localhost:7057/api/Kullanici/${this.editUserDto.kullaniciId}`, this.editUserDto);
        this.fetchUsers();
        this.closeModal();
        
        // Başarı bildirimi
        this.$toast.success('Kullanıcı başarıyla güncellendi', {
          position: 'top-right',
          duration: 3000
        });
      } catch (error) {
        console.error("Kullanıcı güncellenirken hata oluştu:", error);
        
        // Hata bildirimi
        this.$toast.error('Kullanıcı güncellenirken bir hata oluştu', {
          position: 'top-right',
          duration: 3000
        });
      }
    },
    async GetAssigmentForTeacher() {
      try {
        const response = await axios.get(`https://localhost:7057/api/Icerik`);
        this.assignments = response.data;
        this.totalAssignments = this.assignments.length;
      } catch (error) {
        console.error("Ödevler yüklenirken hata oluştu:", error);
        this.assignments = [];
      }
    },
    async GetAssigmentForStudent() {
      try {
        const response = await axios.get(`https://localhost:7057/api/Dosya`);
        this.assigmentForStudent = response.data;
        this.totalAssignmentsForStudent = this.assigmentForStudent.length;
      } catch (error) {
        console.error("Öğrenci ödevleri yüklenirken hata oluştu:", error);
      }
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
    closeModal() {
      this.isUserUpdateModalOpen = false;
    },
  },
  async mounted() {
    this.GetAssigmentForTeacher();
    this.GetAssigmentForStudent();
    this.fetchUsers();
    this.fetchActiveAssignments();
  },
};
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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

/* Toast bildirimleri için temel stil */
.toast {
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toast.success {
  background-color: #10B981;
  color: white;
}

.toast.error {
  background-color: #EF4444;
  color: white;
}
</style>