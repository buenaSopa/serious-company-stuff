<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Quality Control</h1>

    <!-- Add New Quality Control Form -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Add New Quality Control Record</h2>
      <form @submit.prevent="addQualityControlRecord">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="product" class="block text-sm font-medium">Product</label>
            <input id="product" v-model="newRecord.product" class="form-input" required />
          </div>
          <div>
            <label for="defects" class="block text-sm font-medium">Defects</label>
            <input id="defects" type="number" v-model="newRecord.defects" class="form-input" required />
          </div>
          <div>
            <label for="status" class="block text-sm font-medium">Status</label>
            <select id="status" v-model="newRecord.status" class="form-select" required>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label for="date" class="block text-sm font-medium">Date</label>
            <input id="date" type="date" v-model="newRecord.date" class="form-input" required />
          </div>
          <div>
            <label for="comments" class="block text-sm font-medium">Comments</label>
            <textarea id="comments" v-model="newRecord.comments" class="form-textarea" />
          </div>
          <div>
            <label for="attachment" class="block text-sm font-medium">Attachment</label>
            <input id="attachment" type="file" @change="handleFileUpload" />
          </div>
        </div>
        <button type="submit" class="btn-primary">Add Record</button>
      </form>
    </div>

    <!-- Quality Control Records Table -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Quality Control Records</h2>
      <input v-model="searchQuery" class="form-input mb-4" placeholder="Search records..." />

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Defects</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="record in filteredRecords" :key="record.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ record.product }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ record.defects }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ record.status }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ record.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ record.comments }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="openEditModal(record)" class="btn-secondary mr-4">Edit</button>
              <button @click="deleteRecord(record.id)" class="btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <!-- Generate Report Button -->
    <div class="mb-6">
      <button @click="generateReport" class="btn-primary mr-4">Generate Report</button>
<button @click="downloadPDF" class="btn-secondary">Download PDF</button>
    </div>

    <!-- Chart for Report Visualization -->
    <div class="mb-6">
      <canvas id="reportChart" width="400" height="200"></canvas>
    </div>

    <!-- Edit Record Modal -->
    <EditQualityRecordModal
      :record="currentRecord"
      :showModal="isModalOpen"
      @update="updateRecord"
      @close="closeEditModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import EditQualityRecordModal from '@/components/EditQualityRecordModal.vue';

Chart.register(...registerables);

const qualityControlRecords = ref([]);
const newRecord = ref({
  product: '',
  defects: 0,
  status: 'Pass',
  date: '',
  comments: ''
});

const isModalOpen = ref(false);
const currentRecord = ref({});
const searchQuery = ref('');

let reportChart = null; // Track the current chart instance

const apiUrl = '/api/quality-control';

async function fetchRecords() {
  try {
    const response = await axios.get(apiUrl);
    qualityControlRecords.value = response.data;
  } catch (error) {
    console.error('Error fetching records:', error);
  }
}

async function addQualityControlRecord() {
  try {
    const response = await axios.post(apiUrl, newRecord.value);
    qualityControlRecords.value.push(response.data[0]);
    newRecord.value = { product: '', defects: 0, status: 'Pass', date: '', comments: '' };
  } catch (error) {
    console.error('Error adding record:', error);
  }
}

async function updateRecord(updatedRecord) {
  try {
    await axios.put(`${apiUrl}/${updatedRecord.id}`, updatedRecord);
    const index = qualityControlRecords.value.findIndex(record => record.id === updatedRecord.id);
    if (index !== -1) {
      qualityControlRecords.value[index] = updatedRecord;
    }
  } catch (error) {
    console.error('Error updating record:', error);
  }
}

async function deleteRecord(id) {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    qualityControlRecords.value = qualityControlRecords.value.filter(record => record.id !== id);
  } catch (error) {
    console.error('Error deleting record:', error);
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  // Handle file upload logic here
}

const filteredRecords = computed(() => {
  return qualityControlRecords.value.filter(record =>
    record.product.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    record.comments.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Generate a report with Chart.js
function generateReport() {
  const ctx = document.getElementById('reportChart').getContext('2d');
  
  // Destroy existing chart if it exists
  if (reportChart) {
    reportChart.destroy();
  }

  // Create a new chart
  reportChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: qualityControlRecords.value.map(record => record.product),
      datasets: [{
        label: 'Defects Count',
        data: qualityControlRecords.value.map(record => record.defects),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw} defects`;
            }
          }
        }
      }
    }
  });
}

function downloadPDF() {
  if (!reportChart) {
    alert('Please generate the report first.');
    return;
  }

  // Convert chart to image
  const canvas = document.getElementById('reportChart');
  const imgData = canvas.toDataURL('image/png');
  
  // Create PDF and add the chart image
  const pdf = new jsPDF('p', 'mm', 'a4');
  pdf.addImage(imgData, 'PNG', 10, 10, 190, 100); // Adjust dimensions as needed
  pdf.save('QualityControlReport.pdf');
}

onMounted(() => {
  fetchRecords(); // Fetch records when component mounts
});
</script>

<style scoped>
.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  color: #000;
}

.form-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  color: #000;
}

.form-textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  color: #000;
}

.btn-primary {
  background-color: #3b82f6;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-secondary {
  background-color: #fbbf24;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-danger {
  background-color: #ef4444;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
</style>
