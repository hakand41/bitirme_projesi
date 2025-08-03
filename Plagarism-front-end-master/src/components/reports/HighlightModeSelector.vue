<template>
    <div class="flex justify-center flex-wrap gap-3 px-4 py-4 bg-gray-50 border-b">
      <button
        v-for="mode in modes"
        :key="mode.value"
        @click="$emit('update:modelValue', mode.value)"
        :class="[
          'px-4 py-2 rounded-lg transition-all flex items-center gap-2',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          modelValue === mode.value 
            ? 'bg-indigo-600 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
        ]"
      >
        <span v-if="mode.value === 'match'" class="w-3 h-3 rounded-full bg-green-500"></span>
        <span v-if="mode.value === 'diff'" class="w-3 h-3 rounded-full bg-gray-400"></span>
        <span v-if="mode.value === 'none'" class="w-3 h-3 rounded-full bg-indigo-500"></span>
        {{ mode.label }}
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  interface HighlightMode {
    value: string
    label: string
  }
  
  export default defineComponent({
    name: 'HighlightModeSelector',
    props: {
      modelValue: {
        type: String,
        required: true
      },
      modes: {
        type: Array as () => HighlightMode[],
        required: true
      }
    },
    emits: ['update:modelValue']
  })
  </script>