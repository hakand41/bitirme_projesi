<template>
    <transition name="fade">
      <div v-if="visible" class="fixed inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
        <div class="p-6 bg-white rounded-lg shadow-xl text-center min-w-[300px]">
          <div class="flex justify-center mb-4">
            <svg class="h-10 w-10 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Lütfen Bekleyin</h3>
          <p class="text-gray-600">{{ message }}</p>
        </div>
      </div>
    </transition>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'LoadingOverlay',
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      message: {
        type: String,
        default: 'Veriler yükleniyor...'
      }
    }
  })
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>