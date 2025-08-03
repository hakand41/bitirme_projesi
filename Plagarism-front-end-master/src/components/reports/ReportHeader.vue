<template>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 rounded-t-xl">
      <div class="mb-4 sm:mb-0">
        <h1 class="text-2xl font-bold">Benzerlik Raporu</h1>
        <p class="text-sm opacity-90">
          <span class="font-medium">{{ user1 }}</span> ⇌ 
          <span class="font-medium">{{ user2 }}</span> | 
          Benzerlik: <span class="font-bold">{{ (similarity * 100).toFixed(1) }}%</span>
        </p>
      </div>
      <button 
        @click="$emit('toggle-chart')"
        class="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
        {{ showChart ? 'Grafikleri Gizle' : 'Grafikleri Göster' }}
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'ReportHeader',
    props: {
      user1: {
        type: String,
        required: true
      },
      user2: {
        type: String,
        required: true
      },
      similarity: {
        type: Number,
        required: true
      },
      showChart: {
        type: Boolean,
        required: true
      }
    },
    emits: ['toggle-chart']
  })
  </script>