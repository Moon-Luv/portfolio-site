<script setup>
import { onMounted } from 'vue'
import { useCertificateStore } from '@/stores/certificates'
import SectionTitle from './SectionTitle.vue'

const certificateStore = useCertificateStore()

onMounted(() => {
  certificateStore.fetchCertificates()
})
</script>

<template>
  <section id="certifications" class="py-20 bg-gray-50 dark:bg-dark-800">
    <div class="container mx-auto px-4">
      <SectionTitle 
        title="Certifications" 
        subtitle="My professional certifications and courses"
      />

      <!-- Loading -->
      <div v-if="certificateStore.loading" class="text-center py-10">
        <p class="text-gray-500">Loading certificates...</p>
      </div>

      <!-- Error -->
      <div v-else-if="certificateStore.error" class="text-center py-10 text-red-500">
        {{ certificateStore.error }}
      </div>

      <!-- Certificates -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div 
          v-for="certification in certificateStore.certificates" 
          :key="certification.$id"
          class="bg-white dark:bg-dark-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 mr-4 flex-shrink-0">
                <img 
                  :src="certification.logo" 
                  :alt="certification.issuer + ' logo'" 
                  class="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 class="font-bold text-gray-800 dark:text-white text-lg">
                  {{ certification.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ certification.issuer }}
                </p>
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-300">
                {{ certification.date }}
              </span>
              <a 
                :href="certification.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-300"
              >
                View Certificate
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
