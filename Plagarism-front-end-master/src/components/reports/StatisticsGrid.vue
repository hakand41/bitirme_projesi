<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="stat in stats" 
        :key="stat.title"
        class="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="text-sm font-medium text-gray-500">{{ stat.title }}</div>
        <div class="text-2xl font-bold mt-1 text-indigo-700">{{ stat.value }}</div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  interface StatCard {
    title: string
    value: string | number
  }
  
  export default defineComponent({
    name: 'StatisticsGrid',
    props: {
      stats: {
        type: Array as () => StatCard[],
        required: true
      }
    }
  })
  </script>