<template>
  <div class="p-4 rounded shadow-md card">
    <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
    <div class="chart-container">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs';
import { ref, defineProps } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const props = defineProps({
  title: String,
  data: Object,
  options: Object
});

const chartData = ref(props.data);
const chartOptions = ref(props.options);
</script>

<style scoped>
.card {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
