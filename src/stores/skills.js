// src/stores/skills.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { databases } from '@/services/appwrite'

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref([])                // flat array of skills
  const categories = ref(['All'])       // "All" by default
  const selectedCategory = ref('All')   // default filter
  const loading = ref(false)
  const error = ref(null)

  const fetchSkills = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_SKILLS_COLLECTION_ID
      )

      skills.value = res.documents

      // Generate unique category list dynamically
      const uniqueCategories = [...new Set(res.documents.map(skill => skill.category))]
      categories.value = ['All', ...uniqueCategories]
    } catch (err) {
      console.error('Error fetching skills:', err)
      error.value = 'Failed to load skills'
    } finally {
      loading.value = false
    }
  }

  return {
    skills,
    categories,
    selectedCategory,
    loading,
    error,
    fetchSkills
  }
})
