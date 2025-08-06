import { defineStore } from 'pinia'
import { ref } from 'vue'
import { databases } from '@/services/appwrite'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProjects = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID
      )
      projects.value = res.documents
    } catch (err) {
      console.error('Error fetching projects:', err)
      error.value = 'Failed to load projects'
    } finally {
      loading.value = false
    }
  }

  return {
    projects,
    loading,
    error,
    fetchProjects
  }
})
