<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Production Tracking</h1>

    <!-- Add New Production Form -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Add New Production Record</h2>
      <form @submit.prevent="addProductionRecord">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="product" class="block text-sm font-medium">Product</label>
            <input id="product" v-model="newRecord.product" class="form-input" required />
          </div>
          <div>
            <label for="quantity" class="block text-sm font-medium">Quantity</label>
            <input id="quantity" type="number" v-model="newRecord.quantity" class="form-input" required />
          </div>
          <div>
            <label for="status" class="block text-sm font-medium">Status</label>
            <select id="status" v-model="newRecord.status" class="form-select" required>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <div>
            <label for="date" class="block text-sm font-medium">Date</label>
            <input id="date" type="date" v-model="newRecord.date" class="form-input" required />
          </div>
        </div>
        <button type="submit" class="btn-primary">Add Record</button>
      </form>
    </div>

    <!-- Production Records Table -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Production Records</h2>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="record in productionRecords" :key="record.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ record.product }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ record.quantity }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ record.status }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ record.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="openEditModal(record)" class="btn-secondary mr-4">Edit</button>
              <button @click="deleteRecord(record.id)" class="btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Record Modal -->
    <EditRecordModal
      :record="currentRecord"
      :showModal="isModalOpen"
      @update="updateRecord"
      @close="closeEditModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import EditRecordModal from '@/components/EditRecordModal.vue';

const apiUrl = '/api/production'; 

const productionRecords = ref([]);
const newRecord = ref({
  product: '',
  quantity: 0,
  status: 'In Progress',
  date: ''
});

const isModalOpen = ref(false);
const currentRecord = ref({});

async function fetchProductionRecords() {
  try {
    const response = await axios.get(apiUrl);
    productionRecords.value = response.data;
  } catch (error) {
    console.error('Error fetching production records:', error);
  }
}

async function addProductionRecord() {
  try {
    const response = await axios.post(apiUrl, newRecord.value);
    productionRecords.value.push(response.data[0]); // Assuming the response returns an array
    newRecord.value = { product: '', quantity: 0, status: 'In Progress', date: '' };
  } catch (error) {
    console.error('Error adding production record:', error);
  }
}

async function updateRecord(updatedRecord) {
  try {
    const response = await axios.put(`${apiUrl}/${updatedRecord.id}`, updatedRecord);
    const index = productionRecords.value.findIndex(record => record.id === updatedRecord.id);
    if (index !== -1) {
      productionRecords.value[index] = response.data[0]; // Assuming the response returns an array
    }
    closeEditModal();
  } catch (error) {
    console.error('Error updating production record:', error);
  }
}

async function deleteRecord(id) {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    productionRecords.value = productionRecords.value.filter(record => record.id !== id);
  } catch (error) {
    console.error('Error deleting production record:', error);
  }
}

function openEditModal(record) {
  currentRecord.value = { ...record };
  isModalOpen.value = true;
}

function closeEditModal() {
  isModalOpen.value = false;
}

// Fetch records when component mounts
onMounted(fetchProductionRecords);
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
