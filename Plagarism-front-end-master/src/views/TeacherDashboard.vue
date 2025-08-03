<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Font Awesome CDN -->
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        rel="stylesheet"
      />
      <div class="announcement-container mb-4">
        <!-- Duyuru Oluştur Butonu -->
        <button
          @click="showModalNotification = true"
          class="announcement-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            class="mr-1"
          >
            <path
              d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
            />
          </svg>
          Duyuru Oluştur
        </button>

        <!-- Modal -->
        <div v-if="showModalNotification" class="modal-overlay">
          <div class="modal-card">
            <div class="modal-header">
              <h2 class="modal-title">Yeni Duyuru</h2>
              <button
                @click="showModalNotification = false"
                class="close-button"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <textarea
                v-model="duyuru.Mesaj"
                placeholder="Duyuru mesajınızı buraya yazın..."
                class="message-input"
                rows="5"
              ></textarea>
            </div>

            <div class="modal-footer">
              <button @click="submitDuyuru" class="submit-button">
                Yayınla
              </button>
              <button
                @click="showModalNotification = false"
                class="cancel-button"
              >
                Vazgeç
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute top-4 right-4 flex items-center gap-4 bg-white p-2 rounded-lg shadow-md mt-3"
      >
        <div class="flex items-center gap-2">
          <!-- Font Awesome kullanıcı ikonu -->
          <i class="fas fa-user-circle text-gray-700 text-3xl"></i>
          <span class="text-gray-700 font-medium text-sm">
            Hoş geldiniz,
            <span class="font-semibold">{{ userName }}</span>
          </span>
        </div>
        <button
          @click="logout"
          class="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        >
          Çıkış Yap
        </button>
      </div>

      <!-- Yükleniyor İndikatörü -->
      <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
      >
        <div
          class="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"
        ></div>
      </div>

      <!-- Hata Mesajı -->
      <transition name="slide-fade">
        <div
          v-if="error"
          class="fixed bottom-8 right-8 flex items-start p-4 pr-10 max-w-sm bg-white rounded-lg shadow-lg border-l-4 border-red-500 z-50 notification-toast error"
        >
          <div class="flex-shrink-0">
            <svg
              class="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Hata oluştu!</h3>
            <p class="text-sm text-red-600 mt-1">{{ error }}</p>
          </div>
          <button
            @click="error = ''"
            class="absolute top-2 right-2 text-red-400 hover:text-red-600"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </transition>

      <!-- Yeni Ödev Oluşturma Formu -->
      <div class="container">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Yeni Ödev Oluştur</h2>
          </div>

          <form @submit.prevent="createAssignment">
            <div class="form-group">
              <label for="title">Ödev Başlığı</label>
              <input
                id="title"
                v-model="newAssignment.title"
                type="text"
                required
                placeholder="Örn: React ile Todo Uygulaması"
              />
            </div>

            <div class="form-group">
              <label for="description">Açıklama</label>
              <textarea
                id="description"
                v-model="newAssignment.description"
                required
                placeholder="Ödev detaylarını buraya yazın..."
              ></textarea>
            </div>

            <div class="form-group">
              <label for="assignmentType">Ödev Tipi</label>
              <select
                id="assignmentType"
                v-model="assignmentType"
                required
                @change="updateProgrammingLanguageOptions"
                style="
                  display: block;
                  width: 100%;
                  padding: 8px;
                  font-size: 1em;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
                  margin-bottom: 10px;
                "
              >
                <option value="" disabled selected>
                  Ne tür bir ödev yüklemek istersiniz?
                </option>
                <option value="text">Text Tabanlı Ödev</option>
                <option value="code">Kod Tabanlı Ödev</option>
              </select>
            </div>
            <div class="form-group" v-if="showProgrammingLanguages">
              <label for="programmingLanguage">Programlama Dili</label>
              <select
                id="programmingLanguage"
                v-model="newAssignment.programmingLanguage"
                required
                style="
                  display: block;
                  width: 100%;
                  padding: 8px;
                  font-size: 1em;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
                  margin-bottom: 10px;
                "
              >
                <option value="" disabled selected>
                  Ödev için bir dil seçiniz
                </option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
                <option value="python3">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
              </select>
            </div>

            <div class="form-group" v-if="assignmentType === 'text'">
              <label for="textFormat">Metin Formatı</label>
              <select
                id="textFormat"
                v-model="newAssignment.programmingLanguage"
                required
                style="
                  display: block;
                  width: 100%;
                  padding: 8px;
                  font-size: 1em;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
                  margin-bottom: 10px;
                "
              >
                <option value="" disabled selected>
                  Metin formatını seçiniz
                </option>
                <option value="text">Düz Metin (.txt)</option>
                <option value="pdf">PDF (.pdf)</option>
                <option value="doc">Word Belgesi (.doc)</option>
                <option value="docx">Word Belgesi (.docx)</option>
              </select>
            </div>

            <div class="form-group date-inputs">
              <div>
                <label for="startDate">Başlangıç Tarihi</label>
                <input
                  id="startDate"
                  v-model="newAssignment.startDate"
                  type="datetime-local"
                  required
                />
              </div>

              <div>
                <label for="deadline">Son Teslim Tarihi</label>
                <input
                  id="deadline"
                  v-model="newAssignment.deadline"
                  type="datetime-local"
                  required
                />
              </div>
            </div>

            <button type="submit" class="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 5v14M5 12h14"></path>
              </svg>
              Ödev Oluştur
            </button>
          </form>
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
                Başarıyla Ödev Oluşturuldu!
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Ödeviniz başarıyla oluşturuldu. Ödev listenizde
                görüntüleyebilirsiniz.
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

      <!-- Ödevler Listesi -->
      <div
        class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
      >
        <!-- Başlık Alanı -->
        <div class="px-6 py-5 border-b border-gray-100">
          <h2 class="text-xl font-semibold text-gray-800">Ödevleriniz</h2>
        </div>

        <!-- Ödev Listesi -->
        <div class="divide-y divide-gray-100">
          <ul v-if="assignments.length > 0">
            <li
              v-for="assignment in assignments"
              :key="assignment.id"
              class="px-6 py-5 relative hover:bg-gray-50 transition-colors"
            >
              <!-- Geçmiş Ödev Uyarısı -->
              <div
                v-if="isDeadlinePassed(assignment.bitisTarihi)"
                class="absolute top-0 left-0 right-0 bg-red-50 text-red-800 text-xs font-medium px-3 py-1 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Teslim süresi doldu ({{ daysPassed(assignment.bitisTarihi) }}
                gün önce)
              </div>

              <!-- Ödev İçeriği -->
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2"
              >
                <!-- Ödev Bilgileri -->
                <div class="flex-1">
                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-indigo-50 rounded-lg">
                      <svg
                        class="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3
                        class="text-lg font-semibold text-gray-800 flex items-center"
                      >
                        {{ assignment.baslik }}
                        <span
                          v-if="isDeadlinePassed(assignment.bitisTarihi)"
                          class="ml-2 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full"
                          >GEÇTİ</span
                        >
                      </h3>
                      <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                        <p class="flex items-center text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-1 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          Başlangıç:
                          {{ formatDate(assignment.olusturmaTarihi) }}
                        </p>
                        <p class="flex items-center text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-1 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          Teslim: {{ formatDate(assignment.bitisTarihi) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- İşlem Butonları -->
                <div class="flex flex-wrap gap-2 justify-end">
                  <button
                    @click="editAssignment(assignment)"
                    :class="{
                      'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors': true,
                      'text-indigo-700 bg-indigo-50 hover:bg-indigo-100':
                        isAssignmentEditable(assignment),
                      'text-indigo-400 bg-indigo-50 cursor-not-allowed':
                        !isAssignmentEditable(assignment),
                    }"
                    :disabled="!isAssignmentEditable(assignment)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                    Düzenle
                  </button>
                  <!-- Düzenleme Modalı -->
                  <div v-if="isEditModalOpen" class="modal-overlay">
                    <div class="modal-card">
                      <div class="modal-header">
                        <h3 class="modal-title">Ödev Düzenle</h3>
                        <button class="close-button" @click="closeEditModal">
                          &times;
                        </button>
                      </div>

                      <div class="modal-body">
                        <div class="form-group">
                          <label>Başlık</label>
                          <input
                            v-model="editData.Baslik"
                            type="text"
                            class="message-input"
                          />
                        </div>

                        <div class="form-group">
                          <label>Açıklama</label>
                          <textarea
                            v-model="editData.Aciklama"
                            class="message-input"
                          ></textarea>
                        </div>

                        <div class="form-group">
                          <label>Bitiş Tarihi</label>
                          <input
                            v-model="editData.BitisTarihi"
                            type="datetime-local"
                            class="message-input"
                          />
                        </div>
                      </div>

                      <div class="modal-footer">
                        <button @click="closeEditModal" class="cancel-button">
                          İptal
                        </button>
                        <button
                          @click="updateAssignment(assignment.Baslik)"
                          class="submit-button"
                          :class="{ 'is-submitting': isLoading }"
                        >
                          <span v-if="!isLoading">Kaydet</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    @click="deleteAssignment(assignment.icerikId)"
                    class="btn-delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    Sil
                  </button>

                  <button
                    @click="openSubmissionModal(assignment.icerikId)"
                    class="btn-submissions"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    Gönderimler
                  </button>

                  <button
                    @click="openModel(assignment.icerikId)"
                    class="btn-similarity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      ></path>
                    </svg>
                    Benzerlik
                  </button>
                </div>
              </div>
            </li>
          </ul>

          <!-- Boş Liste Durumu -->
          <div v-else class="px-6 py-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <p class="text-gray-500 text-lg">Henüz ödev bulunmamaktadır</p>
          </div>
        </div>
      </div>

      <!-- Benzerlik Sonuçları Modalı -->
      <VDialog v-model="similaritymodalOpen" persistent max-width="800px">
        <VCard class="shadow-xl rounded-lg border border-gray-200 p-6">
          <VCardTitle class="text-2xl font-bold text-center text-gray-800 mb-6">
            Benzerlik Sonuçları
          </VCardTitle>

          <VCardText>
            <!-- Gelişmiş Filtreleme Alanı -->
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
              <div
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Minimum Benzerlik Oranı</label
                  >
                  <div class="flex items-center gap-3">
                    <input
                      v-model="minSimilarity"
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      @input="updateSimilarityFilter"
                    />
                    <span
                      class="w-16 text-center font-semibold bg-white border border-gray-300 px-2 py-1 rounded"
                    >
                      {{ minSimilarity }}%
                    </span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button
                    @click="setSimilarityPreset(30)"
                    class="px-3 py-1 text-xs rounded border"
                    :class="
                      minSimilarity == 30
                        ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                        : 'bg-white border-gray-300'
                    "
                  >
                    Düşük (30%)
                  </button>
                  <button
                    @click="setSimilarityPreset(50)"
                    class="px-3 py-1 text-xs rounded border"
                    :class="
                      minSimilarity == 50
                        ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                        : 'bg-white border-gray-300'
                    "
                  >
                    Orta (50%)
                  </button>
                  <button
                    @click="setSimilarityPreset(70)"
                    class="px-3 py-1 text-xs rounded border"
                    :class="
                      minSimilarity == 70
                        ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                        : 'bg-white border-gray-300'
                    "
                  >
                    Yüksek (70%)
                  </button>
                </div>
              </div>
            </div>

            <!-- Sonuç Listesi -->
            <div class="space-y-4">
              <div v-if="filteredSimilarityData.length > 0">
                <!-- Başlıklar -->
                <div
                  class="grid grid-cols-12 gap-4 items-center bg-gray-50 py-3 px-4 rounded-lg text-gray-700 font-semibold"
                >
                  <div class="col-span-4">Dosya 1</div>
                  <div class="col-span-1 text-center">↔</div>
                  <div class="col-span-4">Dosya 2</div>
                  <div class="col-span-2 text-center">Oran</div>
                  <div class="col-span-1"></div>
                </div>

                <!-- Sonuçlar -->
                <div
                  v-for="(similarity, index) in filteredSimilarityData"
                  :key="index"
                  class="grid grid-cols-12 gap-4 items-center py-3 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div
                    class="col-span-4 flex items-center gap-2 group relative"
                  >
                    <i class="fas fa-file-alt text-blue-500"></i>
                    <span class="truncate">
                      {{ similarity.ilkKullaniciAdiSoyad }}
                    </span>
                    <div class="tooltip">
                      {{ similarity.ilkKullaniciAdiSoyad }}
                    </div>
                  </div>

                  <div class="col-span-1 text-center text-gray-400">↔</div>

                  <div
                    class="col-span-4 flex items-center gap-2 group relative"
                  >
                    <i class="fas fa-file-alt text-blue-500"></i>
                    <span class="truncate">
                      {{ similarity.ikinciKullaniciAdiSoyad }}
                    </span>
                    <div class="tooltip">
                      {{ similarity.ikinciKullaniciAdiSoyad }}
                    </div>
                  </div>

                  <div class="col-span-2">
                    <div class="flex items-center justify-center gap-2">
                      <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          class="bg-indigo-600 h-2.5 rounded-full"
                          :style="{
                            width: similarity.benzerlikOrani * 100 + '%',
                          }"
                        ></div>
                      </div>
                      <span class="text-sm font-semibold whitespace-nowrap">
                        {{ (similarity.benzerlikOrani * 100).toFixed(2) }}%
                      </span>
                    </div>
                  </div>

                  <!-- Detay Butonu -->
                  <div class="col-span-1 flex justify-end">
                    <button
                      @click="viewDetails(similarity)"
                      class="text-indigo-600 hover:text-indigo-800 transition-colors"
                      title="Detayları Görüntüle"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-8 text-gray-400">
                <i class="fas fa-search-minus text-4xl text-gray-300 mb-2"></i>
                <p>Filtreleme kriterlerinize uygun sonuç bulunamadı</p>
              </div>
            </div>
          </VCardText>

          <VCardActions class="justify-center pt-4">
            <button
              @click="closeModalSimilarityResponse"
              class="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Kapat
            </button>
          </VCardActions>
        </VCard>
      </VDialog>

      <!-- Gönderilen Ödevler Modal -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm transition-opacity"
      >
        <div
          class="bg-white rounded-xl shadow-xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] flex flex-col"
        >
          <!-- Modal Header -->
          <div
            class="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 rounded-t-xl flex justify-between items-center z-10"
          >
            <div>
              <h3 class="text-xl font-bold text-gray-800">
                Gönderilen Ödevler
              </h3>
              <p class="text-sm text-gray-500 mt-1">
                {{ currentSubmissions.length }} öğrenci tarafından gönderildi
              </p>
            </div>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="overflow-y-auto px-6 py-4 flex-1">
            <div v-if="currentSubmissions.length > 0" class="space-y-3">
              <div
                v-for="submission in currentSubmissions"
                :key="submission.dosyaId"
                class="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors border border-gray-200"
              >
                <div
                  class="flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <!-- Student Info -->
                  <div class="flex items-center gap-3">
                    <div class="bg-indigo-100 p-2 rounded-full">
                      <svg
                        class="w-5 h-5 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-800">
                        {{ submission.kullanici.ad }}
                        {{ submission.kullanici.soyad }}
                      </h4>
                      <p class="text-sm text-gray-500 flex items-center mt-1">
                        <svg
                          class="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                        {{ submission.cleanedPath }}
                      </p>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex gap-2 justify-end">
                    <button
                      @click="downloadFile(submission)"
                      class="flex items-center gap-1 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        ></path>
                      </svg>
                      <span class="hidden sm:inline">İndir</span>
                    </button>
                    <button
                      @click="viewFile(submission)"
                      class="flex items-center gap-1 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                      <span class="hidden sm:inline">Görüntüle</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <div class="bg-gray-100 p-6 rounded-xl inline-block">
                <svg
                  class="w-12 h-12 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h4 class="mt-3 text-gray-600 font-medium">
                  Gönderilen ödev bulunamadı
                </h4>
                <p class="text-sm text-gray-500 mt-1">
                  Öğrenciler henüz ödev göndermedi
                </p>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div
            class="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 rounded-b-xl flex justify-end"
          >
            <button
              @click="compareSubmissions"
              :disabled="currentSubmissions.length < 2"
              class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                class="w-5 h-5 inline mr-2 -mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
              Karşılaştır
            </button>
          </div>

          <!-- Comparison Success Modal -->
          <div
            v-if="isComparisonSuccess"
            class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50"
          >
            <div
              class="bg-white rounded-xl shadow-xl w-11/12 md:w-1/2 lg:w-1/3 p-6 text-center"
            >
              <div
                class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
              >
                <svg
                  class="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 class="mt-3 text-lg font-medium text-gray-900">
                Karşılaştırma Tamamlandı
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                Ödevler başarıyla karşılaştırıldı ve sonuçlar kaydedildi.
              </p>
              <div class="mt-4">
                <button
                  @click="isComparisonSuccess = false"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Tamam
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import {
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VBtn,
  VProgressLinear,
} from "vuetify/components";

export default {
  components: {
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VBtn,
    VProgressLinear,
  },
  data() {
    return {
      selectedAssignmentId: null,
      isEditModalOpen: false,//düzenleme modalı açık mı kapalı mı
      editData: {
        Baslik: "",
        Aciklama: "",
        BitisTarihi: "",
      },
      currentAssignmentId: null,
      isSubmitting: false,
      assignmentType: "", // kod tabanlı mı temel tabanlı mı
      showProgrammingLanguages: false,
      showModalNotification: false,
      duyuru: {
        Mesaj: "",
        OlusturmaTarihi: new Date().toISOString(),
      },
      minSimilarity: 0,
      similaritymodalOpen: false,
      similarityData: [],
      isLoading: false,
      isComparisonSuccess: false, // Karşılaştırma başarılı mı?
      successMessage: "",
      assignments: [],
      newAssignment: {
        title: "",
        description: "",
        startDate: "",
        deadline: "",
        programmingLanguage: "",
      },
      error: "",
      errorTimeout: null,
      isModalOpen: false, // Modal açık/kapalı durumu
      currentSubmissions: [], // Seçilen ödevin gönderimleri
      currentIcerikId: null, // Seçilen ödevin icerikId'si
    };
  },
  beforeDestroy() {
    // Component yok edilirken timeout'u temizle
    clearTimeout(this.errorTimeout);
  },

  computed: {
    // Kullanıcı adını Vuex store'dan al
    userName() {
      return this.$store.getters.getUserName;
    },
    similarityPercentage() {
      // 0-1 arasındaki değeri % cinsine çevirme
      return this.similarityData[index]
        ? Math.round(this.similarityData[index].benzerlikOrani * 100)
        : 0;
    },
    filteredSimilarityData() {
      return this.similarityData.filter(
        (similarity) => similarity.benzerlikOrani * 100 >= this.minSimilarity
      );
    },
  },
  methods: {
    isAssignmentEditable(assignment) {
      const deadline = new Date(assignment.bitisTarihi); // Ödev bitiş tarihi
      const now = new Date();
      return now < deadline; // Tarih geçmemişse `true`
    },
    updateProgrammingLanguageOptions() {
      this.showProgrammingLanguages = this.assignmentType === "code";
      if (this.assignmentType === "text") {
        this.newAssignment.programmingLanguage = "text";
      } else {
        this.newAssignment.programmingLanguage = ""; // Kod seçildiğinde programlama dili seçeneğini sıfırlama
      }
    },
    triggerError() {
      this.error = "Bir hata oluştu. Lütfen tekrar deneyin.";
    },

    async submitDuyuru() {
      try {
        // Loading state'i aktif et
        this.isSubmitting = true;

        const response = await axios.post(
          "https://localhost:7057/api/bildirim/create",
          this.duyuru,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Başarılı bildirim göster
        this.showNotification({
          type: "success",
          title: "Başarılı",
          message: "Duyuru başarıyla yayınlandı!",
          duration: 3000,
        });

        // Formu temizle ve modal'ı kapat
        this.showModalNotification = false;
        this.duyuru.Mesaj = "";
      } catch (error) {
        // Hata bildirimi göster
        const errorMessage =
          error.response?.data?.message || "Duyuru eklenirken bir hata oluştu";

        this.showNotification({
          type: "error",
          title: "Hata",
          message: errorMessage,
          duration: 5000,
        });
      } finally {
        this.isSubmitting = false;
      }
    },
    showNotification(notification) {
      const toast = document.createElement("div");
      toast.className = `notification-toast ${notification.type}`;
      toast.innerHTML = `
      <div class="notification-header">
        <span class="notification-title">${notification.title}</span>
        <button class="notification-close">&times;</button>
      </div>
      <div class="notification-body">${notification.message}</div>
    `;

      document.body.appendChild(toast);

      setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => toast.remove(), 300);
      }, notification.duration);

      toast
        .querySelector(".notification-close")
        .addEventListener("click", () => {
          toast.classList.add("fade-out");
          setTimeout(() => toast.remove(), 300);
        });
    },

    setSimilarityPreset(value) {
      this.minSimilarity = value;
      this.updateSimilarityFilter();
    },

    updateSimilarityFilter() {
      console.log("Filtre güncellendi:", this.minSimilarity);
    },
    viewDetails(similarity) {
      if (!similarity) return;

      const url = this.$router.resolve({
        name: "Comparison",
        params: { contentId: similarity.icerikId },
        query: {
          // user1: similarity.ilkKullaniciAdiSoyad,
          // user2: similarity.ikinciKullaniciAdiSoyad,
          // file1: encodeURIComponent(similarity.ilkDosyaCleanPath),
          // file2: encodeURIComponent(similarity.ikinciDosyaCleanPath),
          // ratio: similarity.benzerlikOrani,
          //contentId: similarity.icerikId,
          file1_id: similarity.file1_id,
          file2_id: similarity.file2_id,
        },
      }).href;
      this.similaritymodalOpen=false; // Modalı kapat

      window.open(url, "_blank"); // Yeni sekmede aç
    },

    async fetchAssignments() {
      try {
        this.isLoading = true; // Loading başlat
        const teacherId = this.$store.getters.userId;
        if (!teacherId) {
          console.error("Öğretmen ID'si bulunamadı.");
          this.error = "Öğretmen ID'si bulunamadı.";
          return;
        }

        const response = await axios.get(
          `https://localhost:7057/api/Icerik/teacher/${teacherId}/all`,
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
          }
        );

        if (response.status === 200) {
          console.log("Ödevler alındı:", response.data);
          this.assignments = response.data.map((assignment) => ({
            ...assignment,
            showSubmissions: false,
            submissions: [],
          }));
        } else {
          this.error = "Ödevler alınamadı. Lütfen tekrar deneyin.";
        }
      } catch (error) {
        console.error("Ödevler alınamadı:", error);
        this.error = "Bir hata oluştu. Lütfen tekrar deneyin.";
      } finally {
        this.isLoading = false; // Loading durdur
      }
    },
    closeModalSimilarityResponse() {
      this.similaritymodalOpen = false;
      this.similarityData = []; // Modal kapatıldığında verileri temizle
      this.minSimilarity = 0;
    },

    async openSubmissionModal(icerikId) {
      try {
        this.isLoading = true; // Loading başlat
        const response = await axios.get(
          `https://localhost:7057/api/Dosya/${icerikId}`,
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
          }
        );

        if (response.status === 200) {
          console.log("Gönderilen ödevler alındı:", response.data);
          this.currentSubmissions = response.data;
          this.currentIcerikId = icerikId; // İçerik ID'sini sakla
          this.isModalOpen = true;
        } else {
          console.error(
            "Gönderilen ödevler alınamadı. Status:",
            response.status
          );
          this.error = "Gönderilen ödevler alınamadı.";
        }
      } catch (error) {
        console.error("Gönderilen ödevler alınamadı:", error);
        this.error = "Gönderilen ödevler alınamadı. Lütfen tekrar deneyin.";
      } finally {
        this.isLoading = false; // Loading durdur
      }
    },
    formatCreationDate(dateString) {
      if (!dateString) return "Bilinmiyor";
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },

    closeModal() {
      this.isModalOpen = false;
      this.currentSubmissions = [];
      this.currentIcerikId = null;
      this.error = ""; // Hata mesajını da temizleyin
    },

    async compareSubmissions() {
      if (!this.currentIcerikId) {
        this.error = "İçerik ID'si bulunamadı.";
        return;
      }

      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://127.0.0.1:5000/compare",
          { content_id: this.currentIcerikId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        );

        if (response.status === 200) {
          this.isComparisonSuccess = true;
        } else {
          this.error = "Karşılaştırma sırasında bir hata oluştu.";
        }
      } catch (error) {
        console.error("Karşılaştırma hatası:", error);
        this.error = "Karşılaştırma sırasında bir hata oluştu.";
      } finally {
        this.isLoading = false; // Loading durdur
      }
    },
    async openModel(icerikId) {
      this.isLoading = true;
      this.error = "";

      // 1) İlgili ödevi bul
      const assignment = this.assignments.find((a) => a.icerikId === icerikId);
      if (!assignment) {
        this.error = "Ödev bulunamadı.";
        this.isLoading = false;
        return;
      }

      // 2) Uzantıyı al ve türü belirle
      const ext = (assignment.icerikTuru || "").toLowerCase();
      const isTextDoc = ["text", "doc", "docx", "pdf"].includes(ext);

      if (isTextDoc) {
        // 3a) Metin/pdf/doc ise: benzerlik sonuçlarını getir
        try {
          const resp = await axios.get(
            `https://localhost:7057/api/BenzerlikSonuclari/icerik/${icerikId}`,
            { headers: { Authorization: `Bearer ${this.$store.state.token}` } }
          );
          this.similarityData = Array.isArray(resp.data) ? resp.data : [];
          console.log("Benzerlik sonuçları alındı:", this.similarityData);
          this.similaritymodalOpen = true;
        } catch (err) {
          console.error(err);
          this.error = "Benzerlik sonuçları alınamadı. Lütfen tekrar deneyin.";
        } finally {
          this.isLoading = false;
        }
      } else {
        // 3b) Kod tabanlıysa: JPlag arayüzünü başlat
        try {
          const { data } = await axios.post(
            "http://127.0.0.1:5000/jplag/view",
            { content_id: icerikId },
            { headers: { Authorization: `Bearer ${this.$store.state.token}` } }
          );
        } catch (err) {
          console.error(err);
          this.error = "JPlag arayüzü açılamadı. Lütfen tekrar deneyin.";
        } finally {
          this.isLoading = false;
        }
      }
    },

    async createAssignment() {
      if (
        !this.newAssignment.title ||
        !this.newAssignment.description ||
        !this.newAssignment.startDate ||
        !this.newAssignment.deadline ||
        !this.newAssignment.programmingLanguage
      ) {
        alert("Tüm alanları doldurduğunuzdan emin olun.");
        return;
      }

      try {
        this.isLoading = true; // Loading başlat

        // Tarihleri ISO formatına çevir
        const formattedStartDate = new Date(
          this.newAssignment.startDate
        ).toISOString();
        const formattedDeadline = this.newAssignment.deadline
          ? new Date(this.newAssignment.deadline).toISOString()
          : null;

        console.log("Gönderilen Başlangıç Tarihi:", formattedStartDate);
        console.log("Gönderilen Bitiş Tarihi:", formattedDeadline);

        const response = await axios.post(
          "https://localhost:7057/api/Icerik",
          {
            Baslik: this.newAssignment.title,
            Aciklama: this.newAssignment.description,
            OlusturmaTarihi: formattedStartDate,
            BitisTarihi: formattedDeadline,
            IcerikTuru: this.newAssignment.programmingLanguage,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          this.newAssignment = {
            title: "",
            description: "",
            startDate: "",
            deadline: "",
            programmingLanguage: "",
          };
          this.successMessage = "Başarıyla ödev oluşturuldu!"; // Başarı mesajı
          this.fetchAssignments();
        } else {
          alert("Ödev oluşturulurken bir hata oluştu.");
        }
      } catch (error) {
        alert("Ödev oluşturulurken bir hata oluştu.");
      } finally {
        this.isLoading = false; // Loading durdur
      }
    },

    editAssignment(assignment) {
      console.log("Atanan ödev verisi:", assignment);
      this.currentAssignmentId = assignment.icerikId;
      this.editData = {
        Baslik: assignment.baslik,
        Aciklama: assignment.aciklama,
        BitisTarihi: this.formatDateForInput(assignment.bitisTarihi),
      };
      this.isEditModalOpen = true;
    },
    formatDateForInput(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      // Timezone düzeltmesi yapıyoruz
      const offset = date.getTimezoneOffset() * 60000;
      const localISOTime = new Date(date.getTime() - offset).toISOString();
      return localISOTime.slice(0, 16);
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.resetEditData();
    },
    resetEditData() {
      this.editData = {
        Baslik: "",
        Aciklama: "",
        BitisTarihi: "",
      };
      this.currentAssignmentId = null;
    },
    async updateAssignment() {
      if (this.isSubmitting) return;

      this.isSubmitting = true;
      this.isLoading = true;

      try {
        const updateDto = {
          Baslik: this.editData.Baslik,
          Aciklama: this.editData.Aciklama,
          BitisTarihi: new Date(this.editData.BitisTarihi).toISOString(),
        };

        const response = await axios.put(
          `https://localhost:7057/api/Icerik/${this.currentAssignmentId}`,
          updateDto,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const originalAssignment = this.assignments.find(
          (a) => a.icerikId === this.currentAssignmentId
        );
        const updatedAssignment = {
          ...originalAssignment,
          baslik: updateDto.Baslik,
          aciklama: updateDto.Aciklama,
          bitisTarihi: updateDto.BitisTarihi,
        };

        this.assignments = this.assignments.map((a) =>
          a.icerikId === this.currentAssignmentId ? updatedAssignment : a
        );

        this.closeEditModal();
        console.log("Duyuru mesajı atanıyor:", originalAssignment.baslik); // Kontrol
        this.duyuru.Mesaj = `"${originalAssignment.baslik}" başlıklı ödev güncellendi!`;
        this.showModalNotification = true;
      } catch (error) {
        console.error("Güncelleme hatası:", error);
        this.handleApiError(error);
      } finally {
        this.isSubmitting = false;
        this.isLoading = false;
      }
    },

    handleApiError(error) {
      if (error.response) {
        const message = error.response.data?.message || "Bir hata oluştu";
        if (error.response.status === 400) {
          this.showErrorNotification(`Geçersiz istek: ${message}`);
        } else if (error.response.status === 404) {
          this.showErrorNotification("Ödev bulunamadı");
        } else {
          this.showErrorNotification(`Sunucu hatası: ${message}`);
        }
      } else if (error.request) {
        this.showErrorNotification("Sunucuya ulaşılamadı");
      } else {
        this.showErrorNotification(`İstek hatası: ${error.message}`);
      }
    },
    showSuccessNotification(message) {
      this.showModalNotification = true;
      this.duyuru = {
        Mesaj: message,
        OlusturmaTarihi: new Date().toISOString(),
      };
      this.isComparisonSuccess = true;

      // 3 saniye sonra otomatik kapat
      setTimeout(() => {
        this.showModalNotification = false;
      }, 5000);
    },
    showErrorNotification(message) {
      this.showModalNotification = true;
      this.duyuru = {
        Mesaj: message,
        OlusturmaTarihi: new Date().toISOString(),
      };
      this.isComparisonSuccess = false;

      // 5 saniye sonra otomatik kapat
      setTimeout(() => {
        this.showModalNotification = false;
      }, 5000);
    },

    async deleteAssignment(id) {
      try {
        await axios.delete(`https://localhost:7057/api/Icerik/${id}`, {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        });
        this.assignments = this.assignments.filter((a) => a.id !== id);
      } catch (error) {
        console.error("Ödev silinemedi:", error);
        this.error = "Ödev silinemedi. Lütfen tekrar deneyin.";
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleString();
    },

    async downloadFile(submission) {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `https://localhost:7057/api/Dosya/download/${submission.dosyaId}`,
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
            responseType: "blob", // Dosya indirme için responseType blob olmalı
          }
        );

        // Dosyayı indirme işlemi
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", submission.cleanedPath.split("\\").pop()); // Dosya adını al
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Dosya indirilemedi:", error);
        this.error = "Dosya indirilemedi. Lütfen tekrar deneyin.";
      } finally {
        this.isLoading = false;
      }
    },
    isDeadlinePassed(deadline) {
      return new Date(deadline) < new Date();
    },
    daysPassed(deadline) {
      const diffTime = new Date() - new Date(deadline);
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    },

    async viewFile(submission) {
      try {
        this.isLoading = true;
        const token = this.$store.state.token;
        const fileId = submission.dosyaId;
        const url = `https://localhost:7057/api/Dosya/view/${fileId}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error(
            "Dosya görüntüleme hatası:",
            response.status,
            response.statusText
          );
          this.$toast.error(
            `Dosya görüntülenirken hata oluştu: ${response.statusText}`
          );
          return;
        }

        const blob = await response.blob();
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, "_blank");
        URL.revokeObjectURL(fileURL); // Belleği temizle
      } catch (error) {
        console.error("Dosya görüntüleme hatası:", error);
        this.$toast.error("Dosya görüntülenirken hata oluştu");
      } finally {
        this.isLoading = false;
      }
    },
    closeSuccessMessage() {
      this.successMessage = "";
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    this.fetchAssignments();
  },
  watch: {
    error(newVal) {
      if (newVal) {
        // Yeni hata mesajı geldiğinde önceki timeout'u temizle
        clearTimeout(this.errorTimeout);

        // 5 saniye sonra otomatik kapat
        this.errorTimeout = setTimeout(() => {
          this.error = "";
        }, 5000);
      }
    },
  },
};
</script>

<style>
btn-edit {
  @apply flex items-center px-3 py-2 text-sm font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors;
}
.btn-delete {
  @apply flex items-center px-3 py-2 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors;
}
.btn-submissions {
  @apply flex items-center px-3 py-2 text-sm font-medium rounded-lg text-green-700 bg-green-50 hover:bg-green-100 transition-colors;
}
.btn-similarity {
  @apply flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 transition-colors shadow-sm;
}

.tooltip {
  visibility: hidden;
  min-width: 120px;
  max-width: 300px;
  background-color: #374151;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 12px;
  position: absolute;
  z-index: 100;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #374151 transparent transparent transparent;
}

.group:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

:root {
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --primary-light: #eef2ff;
  --secondary: #f9fafb;
  --border: #e5e7eb;
  --text: #1f2937;
  --text-light: #6b7280;
  --danger: #ef4444;
  --success: #10b981;
  --radius: 0.5rem;
  --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Base styles */
body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  color: var(--text);
  background-color: #f3f4f6;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

/* Layout */
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Card components */
.card {
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  padding: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

/* Form elements */
.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text);
}

input,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: white;
  font-size: 0.95rem;
  transition: all 0.2s;
  outline: none;
  color: var(--text);
}

input:focus,
textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.date-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.btn:hover {
  background-color: var(--primary-hover);
}

.btn svg {
  margin-right: 0.5rem;
}

/* Modal styles */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Width utilities */
.w-full {
  width: 100%;
}

.w-11\/12 {
  width: 91.666667%;
}

/* Padding */
.p-6 {
  padding: 1.5rem;
}

/* Colors */
.bg-white {
  background-color: #ffffff;
}

.text-gray-500 {
  color: #6b7280;
}

.text-gray-700 {
  color: #374151;
}

.text-gray-900 {
  color: #111827;
}

.text-white {
  color: #ffffff;
}

/* Button variants */
.bg-blue-600 {
  background-color: #2563eb;
}

.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}

.bg-green-600 {
  background-color: #16a34a;
}

.hover\:bg-green-700:hover {
  background-color: #15803d;
}

.bg-purple-600 {
  background-color: #9333ea;
}

.hover\:bg-purple-700:hover {
  background-color: #7e22ce;
}

.bg-red-600 {
  background-color: #dc2626;
}

.hover\:bg-red-700:hover {
  background-color: #b91c1c;
}

/* Focus states */
.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.focus\:ring-offset-2:focus {
  outline-offset: 2px;
}

.focus\:ring-purple-500:focus {
  box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.5);
}

/* Modal specific styles */
.modal-content {
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.modal-header {
  font-size: 1.25rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 1rem;
}

.modal-body {
  font-size: 1rem;
  color: #6b7280;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.modal-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
}

.modal-button-blue {
  background-color: #2563eb;
  color: #fff;
}

.modal-button-blue:hover {
  background-color: #1d4ed8;
}

.modal-button-red {
  background-color: #ef4444;
  color: #fff;
}

.modal-button-red:hover {
  background-color: #dc2626;
}

.modal-button-green {
  background-color: #16a34a;
  color: #fff;
}

.modal-button-green:hover {
  background-color: #15803d;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .date-inputs {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) {
  .md\:w-3\/4 {
    width: 75%;
  }
}

@media (min-width: 1024px) {
  .lg\:w-1\/2 {
    width: 50%;
  }
}

.announcement-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.announcement-button {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.announcement-button:hover {
  background-color: #4338ca;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  color: #111827;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0 8px;
}

.close-button:hover {
  color: #4b5563;
}

.modal-body {
  padding: 20px;
}

.message-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
  font-size: 0.875rem;
}

.message-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.submit-button {
  padding: 8px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #4338ca;
}

.cancel-button {
  padding: 8px 16px;
  background-color: #f3f4f6;
  color: #4b5563;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-button:hover {
  background-color: #e5e7eb;
}

.notification-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transform: translateX(0);
  transition: all 0.3s ease;
  overflow: hidden;
}

.notification-toast.success {
  background: #f0fdf4;
  border-left: 4px solid #10b981;
  color: #065f46;
}

.notification-toast.error {
  background: #fef2f2;
  border-left: 4px solid #ef4444;
  color: #991b1b;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.notification-title {
  font-weight: 600;
  font-size: 16px;
}

.notification-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
}

.notification-close:hover {
  opacity: 1;
}

.notification-body {
  font-size: 14px;
}

.fade-out {
  transform: translateX(120%);
  opacity: 0;
}

/* Loading indicator */
.is-submitting {
  position: relative;
  pointer-events: none;
  opacity: 0.8;
}

.is-submitting::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin-top: -8px;
  margin-left: -8px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* Toast stilleri */
.notification-toast {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.notification-toast.error {
  background-color: #fef2f2;
  border-left-color: #ef4444;
}
</style>
