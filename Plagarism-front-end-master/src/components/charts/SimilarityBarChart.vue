<template>
    <div class="h-[200px]">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, computed } from 'vue'
  import { Bar } from 'vue-chartjs'
  import { 
    Chart as ChartJS, 
    Title, 
    Tooltip, 
    Legend, 
    BarElement, 
    CategoryScale, 
    LinearScale,
    ChartData,
    ChartOptions
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  interface BarChartProps {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string | string[]
    }[]
  }
  
  export default defineComponent({
    name: 'SimilarityBarChart',
    components: { Bar },
    props: {
      data: {
        type: Object as PropType<BarChartProps>,
        required: true,
        validator: (value: BarChartProps) => {
          return Array.isArray(value.labels) && Array.isArray(value.datasets)
        }
      },
      options: {
        type: Object as PropType<ChartOptions<'bar'>>,
        required: true
      }
    },
    setup(props) {
      // Convert the props to the exact format Chart.js expects
      const chartData = computed<ChartData<'bar'>>(() => ({
        labels: props.data.labels,
        datasets: props.data.datasets.map(dataset => ({
          ...dataset,
          barPercentage: 0.6,
          categoryPercentage: 0.8
        }))
      }))
  
      const chartOptions = computed<ChartOptions<'bar'>>(() => ({
        ...props.options,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...props.options.plugins,
          legend: {
            display: false
          }
        }
      }))
  
      return {
        chartData,
        chartOptions
      }
    }
  })
  </script>