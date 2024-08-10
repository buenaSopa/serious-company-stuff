<template>
  <div class="w-full">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Existing Cards -->
      <div class="p-4 rounded shadow-md card">
        <h2 class="text-xl font-semibold mb-2">Production Status</h2>
        <p>{{ productionStatus }}</p>
      </div>

      <div class="p-4 rounded shadow-md card">
        <h2 class="text-xl font-semibold mb-2">Machine Utilization</h2>
        <div class="flex items-center">
          <div class="w-full">
            <div class="bg-blue-500 h-4 rounded" :style="{ width: machineUtilization }"></div>
          </div>
          <span class="ml-2">{{ machineUtilization }}</span>
        </div>
      </div>

      <div class="p-4 rounded shadow-md card">
        <h2 class="text-xl font-semibold mb-2">Defect Rates</h2>
        <p>{{ defectRates }}%</p>
      </div>

      <!-- New Charts -->
      <ChartCard
        title="Production Trends"
        :data="productionTrendsData"
        :options="chartOptions"
      />

      <ChartCard
        title="Machine Downtime"
        :data="machineDowntimeData"
        :options="chartOptions"
      />

      <ChartCard
        title="Monthly Defects"
        :data="monthlyDefectsData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script setup>
import ChartCard from '@/components/ChartCard.vue';
import { ref, onMounted } from 'vue';

// Existing Data
const productionStatus = ref('Loading...');
const machineUtilization = ref('50%');
const defectRates = ref('2%');

// New Chart Data
const productionTrendsData = ref({
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Production',
      data: [120, 150, 100, 180],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
    },
  ],
});

const machineDowntimeData = ref({
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Downtime (hours)',
      data: [5, 8, 3, 6],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
    },
  ],
});

const monthlyDefectsData = ref({
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Defects',
      data: [20, 15, 25, 10],
      borderColor: '#f43f5e',
      backgroundColor: 'rgba(244, 63, 94, 0.2)',
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.raw}`;
        },
      },
    },
  },
});

// Fetch data when the component is mounted
onMounted(() => {
  fetchDashboardData();
});

async function fetchDashboardData() {
  // Simulate fetching data
  setTimeout(() => {
    productionStatus.value = 'Running smoothly';
    machineUtilization.value = '75%';
    defectRates.value = '1.5%';
  }, 1000);
}
</script>

<style scoped>
.bg-blue-500 {
  background-color: #3b82f6;
}

.card {
  background-color: #000;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
