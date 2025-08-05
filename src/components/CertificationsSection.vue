<script setup>
import { ref } from 'vue'
import SectionTitle from './SectionTitle.vue'
import { useMotion } from '@vueuse/motion'

// Sample certifications data - replace with your own certifications
const certifications = ref([
  {
    id: 1,
    name: 'Full-Stack Web Development',
    issuer: 'Udacity',
    date: 'December 2022',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Udacity_logo.png',
    url: 'https://www.udacity.com'
  },
  {
    id: 2,
    name: 'Advanced JavaScript',
    issuer: 'Frontend Masters',
    date: 'August 2022',
    logo: 'https://frontendmasters.com/static-assets/fm-meta-img.png',
    url: 'https://frontendmasters.com'
  },
  {
    id: 3,
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: 'March 2023',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    url: 'https://aws.amazon.com/certification/'
  },
  {
    id: 4,
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    date: 'January 2023',
    logo: 'https://www.scrum.org/themes/custom/scrumorg_v2/assets/images/logo-250.png',
    url: 'https://www.scrum.org/'
  },
  {
    id: 5,
    name: 'React and Redux',
    issuer: 'Coursera',
    date: 'May 2022',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/1200px-Coursera-Logo_600x600.svg.png',
    url: 'https://www.coursera.org'
  },
  {
    id: 6,
    name: 'UI/UX Design Fundamentals',
    issuer: 'Interaction Design Foundation',
    date: 'October 2022',
    logo: 'https://public-media.interaction-design.org/images/idf-logo-full.svg',
    url: 'https://www.interaction-design.org/'
  }
])

// Animation for the certifications section
const certificationAnimation = {
  initial: {
    y: 50,
    opacity: 0
  },
  enter: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 600,
      ease: 'easeOut',
      delay: i * 100 + 200
    }
  })
}

// Use motion for animations
const { motion } = useMotion()
</script>

<template>
  <section id="certifications" class="py-20 bg-gray-50 dark:bg-dark-800">
    <div class="container mx-auto px-4">
      <SectionTitle 
        title="Certifications" 
        subtitle="My professional certifications and courses"
      />
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(certification, index) in certifications" 
          :key="certification.id"
          v-motion="certificationAnimation"
          :custom="index"
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