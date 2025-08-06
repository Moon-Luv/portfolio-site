import { defineStore } from 'pinia'
import { ref } from 'vue'
import { databases } from '@/services/appwrite'

export const useTestimonialStore = defineStore('testimonials', () => {
  const testimonials = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchTestimonials = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_TESTIMONIALS_COLLECTION_ID
      )
      testimonials.value = res.documents
    } catch (err) {
      console.error('Error fetching testimonials:', err)
      error.value = 'Failed to load testimonials'
    } finally {
      loading.value = false
    }
  }

  return {
    testimonials,
    loading,
    error,
    fetchTestimonials
  }
})
