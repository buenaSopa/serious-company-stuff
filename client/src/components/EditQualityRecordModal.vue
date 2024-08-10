<template>
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4 text-black">Edit Quality Control Record</h2>
        <form @submit.prevent="updateRecord">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="product" class="block text-sm font-medium">Product</label>
              <input id="product" v-model="record.product" class="form-input" required />
            </div>
            <div>
              <label for="defects" class="block text-sm font-medium">Defects</label>
              <input id="defects" type="number" v-model="record.defects" class="form-input" required />
            </div>
            <div>
              <label for="status" class="block text-sm font-medium">Status</label>
              <select id="status" v-model="record.status" class="form-select" required>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label for="date" class="block text-sm font-medium">Date</label>
              <input id="date" type="date" v-model="record.date" class="form-input" required />
            </div>
            <div>
              <label for="comments" class="block text-sm font-medium">Comments</label>
              <textarea id="comments" v-model="record.comments" class="form-textarea" />
            </div>
            <div>
              <label for="attachment" class="block text-sm font-medium">Attachment</label>
              <input id="attachment" type="file" @change="handleFileUpload" />
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button type="button" @click="closeModal" class="btn-secondary mr-4">Cancel</button>
            <button type="submit" class="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
    <div class="fixed inset-0 bg-black opacity-50 -z-10" @click="closeModal"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  record: Object,
  showModal: Boolean
});

const emit = defineEmits(['update', 'close']);

const record = ref({ ...props.record });

watch(() => props.record, (newVal) => {
  record.value = { ...newVal };
}, { deep: true });

function updateRecord() {
  emit('update', record.value);
  closeModal();
}

function closeModal() {
  emit('close');
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  // Handle file upload logic here
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
</style>
