<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Top Navigation Bar -->
    <div class="bg-white shadow-sm">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between"
      >
        <div class="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h2 class="font-semibold text-xl text-gray-800">EduPortal</h2>
        </div>
        <div class="flex items-center gap-6">
          <!-- Notification Bell -->
          <div class="relative">
            <button
              @click="toggleNotifications"
              class="p-1 text-gray-600 hover:text-indigo-600 transition-colors relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                v-if="notifications.length > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ notifications.length }}
              </span>
            </button>

            <!-- Notification Dropdown -->
            <div
              v-if="showNotificationDropdown"
              class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200"
            >
              <div class="py-1">
                <div
                  class="px-4 py-2 border-b border-gray-100 bg-gray-50 flex justify-between items-center"
                >
                  <h3 class="text-sm font-medium text-gray-800">Bildirimler</h3>
                  <span class="text-xs text-gray-500"
                    >{{ notifications.length }} yeni</span
                  >
                </div>

                <div
                  v-if="notifications.length === 0"
                  class="px-4 py-3 text-center text-sm text-gray-500"
                >
                  Bildirim yok
                </div>

                <div v-else class="max-h-96 overflow-y-auto">
                  <div
                    v-for="(notification, index) in notifications"
                    :key="notification.bildirimId"
                    class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-800">
                          {{ notification.kullaniciAdi }}
                        </p>
                        <p class="text-sm text-gray-600 mt-1">
                          {{ notification.mesaj }}
                        </p>
                        <p class="text-xs text-gray-400 mt-1">
                          {{
                            formatNotificationDate(notification.olusturmaTarihi)
                          }}
                        </p>
                      </div>
                      <button
                        @click.stop="markAsRead(notification.bildirimId)"
                        class="ml-2 text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        Okudum
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-700 font-medium">{{ userName }}</span>
          </div>
          <button
            @click="logout"
            class="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 9a1 1 0 11-2 0v-3H7v3a1 1 0 01-2 0V7a1 1 0 012 0v1h5V7a1 1 0 112 0v5z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Çıkış</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Rest of your template remains exactly the same -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 class="text-3xl font-bold text-gray-900 mb-1 text-center">
        Öğrenci Paneli
      </h1>
      <p class="text-gray-600 text-center mb-10">
        Ödevlerinizi görüntüleyin ve teslim edin
      </p>

      <!-- Assignment Cards -->
      <div v-if="assignments.length === 0" class="text-center py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-gray-300 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p class="text-gray-500 text-lg">Henüz mevcut ödev yok.</p>
        <p class="text-gray-400 text-sm mt-2">
          Ödevler eklendiğinde burada görünecek.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="assignment in assignments"
          :key="assignment.icerikId"
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div>
                <div class="text-xs font-medium text-indigo-600 mb-1">
                  {{ getAssignmentPrefix(assignment) }}
                  <span class="text-gray-500 ml-2">
                    <strong
                      >({{
                        assignmentCounts[assignment.icerikId] || 0
                      }}
                      teslim)</strong
                    >
                  </span>
                </div>
                <div class="flex items-start mb-4">
                  <div class="p-2 bg-indigo-100 rounded-lg mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-800">
                      {{ assignment.baslik }}
                    </h3>
                  </div>
                </div>
              </div>
              <span
                :class="
                  isDeadlinePassed(assignment.icerikId)
                    ? 'bg-red-100 text-red-800'
                    : 'bg-indigo-100 text-indigo-800'
                "
                class="text-xs px-2 py-1 rounded-full font-medium"
              >
                {{
                  isDeadlinePassed(assignment.icerikId)
                    ? "Süresi Doldu"
                    : "Aktif"
                }}
              </span>
            </div>

            <div class="flex items-center text-sm text-gray-600 mb-4">
              <div
                class="flex items-center bg-indigo-50 rounded-full px-3 py-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-indigo-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span class="font-medium text-gray-700">
                  <span class="text-indigo-600 font-semibold">{{
                    assignment.olusturanKullanici
                  }}</span>
                  <span class="text-gray-400 mx-1">•</span>
                  <span class="text-gray-500">oluşturdu</span>
                </span>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Teslim Tarihi:</span>
                <span class="font-medium">{{
                  formatDate(assignment.bitisTarihi)
                }}</span>
              </div>

              <div v-if="!isDeadlinePassed(assignment.icerikId)">
                <div class="flex items-center justify-between text-sm mb-1">
                  <span class="text-gray-600">Kalan Süre:</span>
                  <span class="font-medium text-indigo-600">{{
                    formatTimeLeft(assignment.bitisTarihi)
                  }}</span>
                </div>

                <!-- Progress bar -->
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-indigo-500 h-2 rounded-full"
                    :style="{
                      width: calculateProgress(assignment.bitisTarihi) + '%',
                    }"
                  ></div>
                </div>
              </div>

              <div v-else class="text-red-600 text-sm font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 inline mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                Teslim süresi geçti
              </div>
            </div>

            <div class="space-y-4">
              <div
                v-if="!isDeadlinePassed(assignment.icerikId)"
                class="relative"
              >
                <input
                  type="file"
                  :id="'file-upload-' + assignment.icerikId"
                  class="hidden"
                  @change="
                    ($event) => fileSelected($event, assignment.icerikId)
                  "
                />
                <label
                  :for="'file-upload-' + assignment.icerikId"
                  class="flex items-center justify-center w-full py-2.5 px-4 bg-gray-50 border border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <span class="text-sm text-gray-500"
                    >Dosya Seç veya Sürükle</span
                  >
                </label>

                <div
                  v-if="uploadedFiles[assignment.icerikId]"
                  class="mt-2 bg-green-50 rounded-lg p-2 flex items-start"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div>
                    <p class="text-sm text-green-800 font-medium break-all">
                      {{ uploadedFiles[assignment.icerikId].name }}
                    </p>
                    <p class="text-xs text-green-600">
                      {{
                        formatFileSize(uploadedFiles[assignment.icerikId].size)
                      }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex space-x-3">
                <button
                  v-if="!isDeadlinePassed(assignment.icerikId)"
                  @click="submitFile(assignment.icerikId)"
                  :disabled="!uploadedFiles[assignment.icerikId]"
                  class="flex-1 flex items-center justify-center py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Gönder
                </button>

                <button
                  @click="viewDetails(assignment.icerikId)"
                  class="flex items-center justify-center py-2 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Detaylar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Toast Message -->
      <div
        v-if="showToast"
        class="fixed bottom-8 right-8 bg-white text-gray-800 py-3 px-4 rounded-lg shadow-lg border-l-4 border-green-500 flex items-center gap-3 transform transition-all duration-300 ease-in-out animate-slideUp max-w-md"
        style="z-index: 9999"
      >
        <div class="flex-shrink-0 bg-green-100 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div>
          <h4 class="font-medium text-gray-800">Başarılı!</h4>
          <p class="text-sm text-gray-600">
            Ödev dosyanız başarıyla gönderildi.
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- Ödev Detay Modalı -->
  <div
    v-if="showDetails"
    class="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50"
  >
    <div class="bg-white rounded-xl shadow-xl w-11/12 md:w-1/2 lg:w-1/3 p-6">
      <h2 class="text-xl font-bold mb-4 text-indigo-700">
        <strong>Ödevin Adı :</strong>{{ assignmentDetails?.baslik }}
      </h2>
      <p class="mb-2">
        <strong>Açıklama:</strong> {{ assignmentDetails?.aciklama }}
      </p>
      <p class="mb-2">
        <strong>Ödevin Türü:</strong> {{ assignmentDetails?.icerikTuru }}
      </p>
      <p class="mb-2">
        <strong>Oluşturma Tarihi:</strong>
        {{ new Date(assignmentDetails?.olusturmaTarihi).toLocaleString() }}
      </p>
      <p class="mb-2">
        <strong>Bitiş Tarihi:</strong>
        {{ new Date(assignmentDetails?.bitisTarihi).toLocaleString() }}
      </p>
      <p class="mb-2">
        <strong>Ödevi oluşturan Öğretmen:</strong> {{ assignmentDetails?.kullaniciAd }}
        {{ assignmentDetails?.kullaniciSoyad }} ({{
          assignmentDetails?.kullaniciEposta
        }})
      </p>
      <div class="text-right mt-6">
        <button
          @click="showDetails = false"
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Kapat
        </button>
      </div>
    </div>
  </div>

  <!-- Başarı Mesajı Modal -->
  <div
        v-if="successMessage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-11/12 sm:max-w-md transform transition-all duration-300 scale-95 hover:scale-100"
        >
          <div class="p-6">
            <div class="flex items-center justify-center mb-5">
              <div
                class="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full"
              >
                <svg
                  class="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>

            <div class="text-center">
              <h3
                class="text-2xl font-semibold text-gray-800 dark:text-white mb-2"
              >
                Tebrikler!
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Ödev Başarıyla yüklendi!
              </p>
            </div>

            <div class="flex justify-center">
              <button
                @click="closeSuccessMessage"
                class="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      successMessage:null,
      assignmentDetails: null,
      showDetails: false,
      assignments: [],
      notifications: [],
      uploadedFiles: {},
      showToast: false,
      timeIntervals: {},
      assignmentCounts: {},
      showNotificationDropdown: false, // Yeni eklenen bildirim açılır kutusu durumu

      assignmentTypes: {
        HOMEWORK: "Ödev",
        PROJECT: "Proje",
        QUIZ: "Quiz",
        EXAM: "Sınav",
        PRESENTATION: "Sunum",
        REPORT: "Rapor",
        RESEARCH: "Araştırma",
        ESSAY: "Makale",
      },
    };
  },
  computed: {
    userName() {
      return this.$store.getters.getUserName;
    },
    ...mapGetters(["userRole"]),
  },
  methods: {
    async FetchNotifications() {
      try {
        const token = this.$store.state.token;
        if (!token) {
          throw new Error("Token bulunamadı! Lütfen giriş yapın.");
        }

        const response = await axios.get(
          "https://localhost:7057/api/Bildirim/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Bildirimler alındı:", response.data);
        this.notifications = response.data;
      } catch (error) {
        console.error("Bildirimler alınamadı:", error);
      }
    },

    toggleNotifications() {
      this.showNotificationDropdown = !this.showNotificationDropdown;
      if (this.showNotificationDropdown && this.notifications.length === 0) {
        this.FetchNotifications();
      }
    },

    async markAsRead(bildirimId) {
      console.log(`BildirimID: ${bildirimId}`);
      try {
        const token = this.$store.state.token;
        const response = await axios.put(
          `https://localhost:7057/api/Bildirim/mark-as-read/${bildirimId}`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          console.log("Bildirim güncellendi:", response.data);
          // Bildirimi ID'ye göre filtreleyerek kaldır
          this.notifications = this.notifications.filter(
            (n) => n.bildirimId !== bildirimId
          );

          // Eğer tüm bildirimler okunduysa dropdown'ı kapat
          if (this.notifications.length === 0) {
            this.showNotificationDropdown = false;
          }
        }
      } catch (error) {
        console.error("Bildirim güncellenirken hata oluştu:", error);
      }
    },

    formatNotificationDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    async fetchAssignments() {
      try {
        const token = this.$store.state.token;
        if (!token) {
          throw new Error("Token bulunamadı! Lütfen giriş yapın.");
        }

        const response = await axios.get("https://localhost:7057/api/Icerik", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Ödevler alındı:", response.data);

        this.assignments = response.data.map((assignment) => ({
          ...assignment,
          deadlinePassed: new Date(assignment.bitisTarihi) < new Date(),
          assignmentType: this.determineAssignmentType(assignment),
        }));

        await Promise.all(
          this.assignments.map(async (assignment) => {
            await this.fetchAssignmentForIcerıkId(assignment.icerikId);
          })
        );

        this.assignments.forEach((assignment) => {
          this.updateTimeLeft(assignment.icerikId, assignment.bitisTarihi);
        });
      } catch (error) {
        console.error("Ödevler alınamadı:", error);
      }
    },

    async fetchAssignmentForIcerıkId(icerikID) {
      try {
        const response = await axios.get(
          `https://localhost:7057/api/Dosya/${icerikID}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        this.assignmentCounts = {
          ...this.assignmentCounts,
          [icerikID]: Array.isArray(response.data) ? response.data.length : 0,
        };
      } catch (error) {
        console.error(`Hata (${icerikID}):`, error);
        this.assignmentCounts = {
          ...this.assignmentCounts,
          [icerikID]: 0,
        };
      }
    },

    determineAssignmentType(assignment) {
      const types = Object.keys(this.assignmentTypes);
      const randomIndex = Math.floor(Math.random() * types.length);
      return types[randomIndex];
    },

    getAssignmentPrefix(assignment) {
      const type = this.assignmentTypes[assignment.assignmentType] || "Ödev";
      const course = assignment.dersAdi || assignment.modulAdi || "Ders";
      return `${type} · ${course}`;
    },

    updateTimeLeft(icerikId, bitisTarihi) {
      this.timeIntervals[icerikId] = setInterval(() => {
        this.$forceUpdate();
      }, 1000);
    },

    fileSelected(event, icerikId) {
      const file = event.target.files[0];
      if (file) {
        this.uploadedFiles = {
          ...this.uploadedFiles,
          [icerikId]: file,
        };
      }
    },

    async submitFile(icerikId) {
      const assignment = this.assignments.find(
        (assignment) => assignment.icerikId === icerikId
      );
      if (!assignment) {
        alert("İlgili ödev bulunamadı.");
        return;
      }

      if (assignment.deadlinePassed) {
        alert("Ödev teslim tarihi geçtiği için dosya gönderilemez.");
        return;
      }

      const file = this.uploadedFiles[icerikId];
      if (!file) {
        alert("Lütfen bir dosya seçin.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("user_id", this.$store.getters.userId);
        formData.append("content_id", icerikId);
        formData.append("baslik", assignment.baslik);
        formData.append("ad_soyad", this.$store.state.userName);
        formData.append("icerik_turu", assignment.icerikTuru);
        formData.append("file", file);

        const response = await axios.post(
          "http://127.0.0.1:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        );
        console.log("Dosya başarıyla yüklendi:", response.data);
       // alert("Dosya başarıyla yüklendi!");
        this.successMessage = "Dosya başarıyla yüklendi:"
        // Başarılı yükleme sonrası yapılacak işlemler (örneğin, uploadedFiles dizisini temizleme)
        this.uploadedFiles[icerikId] = null;
      } catch (error) {
        console.error("Dosya yüklenirken bir hata oluştu:", error);
        alert("Dosya yüklenirken bir hata oluştu.");
      }
    },

    async viewDetails(icerikId) {
      try {
        const response = await axios.get(
          `https://localhost:7057/api/Icerik/details/${icerikId}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        );
        this.assignmentDetails = response.data;
        this.showDetails = true;
        console.log("Detaylar alındı:", response.data);
      } catch (error) {
        console.error("Detaylar görüntülenirken hata oluştu:", error);
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    isDeadlinePassed(icerikId) {
      const assignment = this.assignments.find(
        (assignment) => assignment.icerikId === icerikId
      );
      return assignment && assignment.deadlinePassed;
    },

    formatTimeLeft(deadline) {
      const now = new Date();
      const endDate = new Date(deadline);
      const timeDiff = endDate - now;

      if (timeDiff <= 0) {
        return "Bitiş tarihi geçti";
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        return `${days} gün ${hours} saat`;
      } else if (hours > 0) {
        return `${hours} saat ${minutes} dk`;
      } else {
        return `${minutes} dakika`;
      }
    },

    calculateProgress(deadline) {
      const now = new Date();
      const endDate = new Date(deadline);
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 7);

      const total = endDate - startDate;
      const elapsed = now - startDate;

      const progress =
        100 - Math.min(100, Math.max(0, (elapsed / total) * 100));
      return progress.toFixed(0);
    },

    formatFileSize(bytes) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    },

    async logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
    closeSuccessMessage() {
      this.successMessage = "";
    },
  },
  async mounted() {
    await this.fetchAssignments();
    await this.FetchNotifications();
  },
  beforeDestroy() {
    Object.values(this.timeIntervals).forEach(clearInterval);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

* {
  font-family: "Inter", sans-serif;
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(1rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

/* Notification dropdown styles */
.notification-dropdown {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  transition: background-color 0.2s ease;
}

.notification-item:hover {
  background-color: #f9fafb;
}
</style>
