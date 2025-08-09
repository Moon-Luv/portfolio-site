import { defineStore } from 'pinia'
import { ref } from 'vue'
import { databases } from '@/services/appwrite'

export const useExperienceStore = defineStore('experience', () => {
  const experiences = ref([
    {
      id: 1,
      role: 'Senior Backend Developer',
      company: 'Tech Innovations Inc.',
      logo: 'https://logo.clearbit.com/google.com',
      logoAlt: 'Tech Innovations Inc. logo',
      duration: 'Jan 2022 - Present',
      description: 'Led the development of responsive web applications using Vue.js and Tailwind CSS. Implemented state management with Pinia and improved performance by 40%.',
      technologies: ['Vue.js', 'Tailwind CSS', 'Pinia', 'TypeScript'],
      achievements: [
        'Reduced page load time by 35% through code optimization',
        'Implemented CI/CD pipeline reducing deployment time by 50%',
        'Mentored 5 junior developers on modern frontend practices'
      ]
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      logo: 'https://placehold.co/200x200?text=DS&font=roboto&fontcolor=fff&bg=8b5cf6',
      logoAlt: 'Digital Solutions Ltd. logo',
      duration: 'Mar 2020 - Dec 2021',
      description: 'Developed and maintained full-stack web applications using Vue.js, Node.js, and MongoDB. Collaborated with UX designers to implement responsive designs.',
      technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Docker'],
      achievements: [
        'Built RESTful APIs serving 10,000+ daily users',
        'Implemented authentication system with JWT and OAuth',
        'Optimized database queries reducing response time by 25%'
      ]
    },
    {
      id: 3,
      role: 'Web Developer',
      company: 'Creative Web Agency',
      logo: 'https://placehold.co/200x200?text=CWA&font=roboto&fontcolor=fff&bg=6d28d9',
      logoAlt: 'Creative Web Agency logo',
      duration: 'Jun 2018 - Feb 2020',
      description: 'Created responsive websites for clients across various industries. Worked with JavaScript frameworks and CSS preprocessors to deliver modern web experiences.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'SASS', 'jQuery', 'WordPress'],
      achievements: [
        'Delivered 20+ client websites with 100% satisfaction rate',
        'Implemented responsive designs for mobile-first experiences',
        'Optimized WordPress sites for better SEO performance'
      ]
    },

    {
      id: 4,
      role: 'Web Developer',
      company: 'Creative Web Agency',
      logo: 'https://placehold.co/200x200?text=CWA&font=roboto&fontcolor=fff&bg=6d28d9',
      logoAlt: 'Creative Web Agency logo',
      duration: 'Jun 2018 - Feb 2020',
      description: 'Created responsive websites for clients across various industries. Worked with JavaScript frameworks and CSS preprocessors to deliver modern web experiences.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'SASS', 'jQuery', 'WordPress'],
      achievements: [
        'Delivered 20+ client websites with 100% satisfaction rate',
        'Implemented responsive designs for mobile-first experiences',
        'Optimized WordPress sites for better SEO performance'
      ]
    }
  ])
  const loading = ref(false)
  const error = ref(null)

  // This function would fetch from Appwrite when you set up the collection
  const fetchExperiences = async () => {
    // For now, we're using the hardcoded data above
    // When you set up Appwrite collection, uncomment the code below
    
    /*
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
    */
  }

  return {
    experiences,
    loading,
    error,
    fetchExperiences
  }
})