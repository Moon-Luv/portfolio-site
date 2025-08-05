<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="mb-12 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      {{ subtitle }}
    </p>
    <div class="w-24 h-1 bg-primary-500 mx-auto mt-4"></div>
  </div>
</template>