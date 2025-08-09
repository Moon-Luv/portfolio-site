import { defineStore } from 'pinia'
import { ref } from 'vue'
import { databases } from '@/services/appwrite'

export const useExperienceStore = defineStore('experience', () => {
  const experiences = ref([])
  const loading = ref(false)
  const error = ref(null)

  // This function would fetch from Appwrite when you set up the collection
  const fetchExperiences = async () => {
    // For now, we're using the hardcoded data above
    // When you set up Appwrite collection, uncomment the code below

    loading.value = true
    error.value = null
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_EXPERIENCE_COLLECTION_ID
      )
      experiences.value = res.documents
    } catch (err) {
      console.error('Error fetching experiences:', err)
      error.value = 'Failed to load experiences'
    } finally {
      loading.value = false
    }
  }

  return {
    experiences,
    loading,
    error,
    fetchExperiences
  }
})