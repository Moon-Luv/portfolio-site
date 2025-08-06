import { defineStore } from 'pinia'
import { ref } from 'vue'
import { databases } from '@/services/appwrite'

export const useCertificateStore = defineStore('certificates', () => {
    const certificates = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchCertificates = async () => {
        loading.value = true
        error.value = null
        try {
            const res = await databases.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_CERTIFICATES_COLLECTION_ID
            )
            certificates.value = res.documents
        } catch (err) {
            console.error('Error fetching certificates:', err)
            error.value = 'Failed to load certificates'
        } finally {
            loading.value = false
        }
    }

    return {
        certificates,
        loading,
        error,
        fetchCertificates
    }
})
