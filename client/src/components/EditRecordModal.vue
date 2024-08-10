<template>
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-lg">
      <h2 class="text-xl text-black font-semibold mb-4">Edit Production Record</h2>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="product" class="block text-sm font-medium">Product</label>
            <input id="product" v-model="localRecord.product" class="form-input" required />
          </div>
          <div>
            <label for="quantity" class="block text-sm font-medium">Quantity</label>
            <input id="quantity" type="number" v-model="localRecord.quantity" class="form-input" required />
          </div>
          <div>
            <label for="status" class="block text-sm font-medium">Status</label>
            <select id="status" v-model="localRecord.status" class="form-select" required>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <div>
            <label for="date" class="block text-sm font-medium">Date</label>
            <input id="date" type="date" v-model="localRecord.date" class="form-input" required />
          </div>
        </div>
        <div class="flex justify-end gap-4">
          <button type="button" @click="closeModal" class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  record: Object,
  showModal: Boolean
});

const emit = defineEmits(['update', 'close']);

const localRecord = ref({ ...props.record });

watch(() => props.record, (newRecord) => {
  localRecord.value = { ...newRecord };
});

function submitForm() {
  emit('update', localRecord.value);
  closeModal();
}

function closeModal() {
  emit('close');
}
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
</style>
