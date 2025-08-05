<script setup>
import { ref } from 'vue'
import SectionTitle from './SectionTitle.vue'
import { useMotion } from '@vueuse/motion'

// Sample projects data - replace with your own projects
const projects = ref([
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, shopping cart, and payment processing.',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=E-Commerce+Project',
    techStack: ['Vue.js', 'Node.js', 'Express', 'MongoDB'],
    demoLink: 'https://example.com',
    sourceLink: 'https://github.com/yourusername/project'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A productivity application for managing tasks, projects, and team collaboration with real-time updates.',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Task+Management+App',
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
    demoLink: 'https://example.com',
    sourceLink: 'https://github.com/yourusername/project'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A weather application that provides current conditions and forecasts for locations worldwide using weather APIs.',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Weather+Dashboard',
    techStack: ['JavaScript', 'HTML/CSS', 'OpenWeather API', 'Chart.js'],
    demoLink: 'https://example.com',
    sourceLink: 'https://github.com/yourusername/project'
  },
  {
    id: 4,
    title: 'Social Media Analytics',
    description: 'A dashboard for tracking and analyzing social media performance across multiple platforms.',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Social+Media+Analytics',
    techStack: ['Vue.js', 'D3.js', 'Node.js', 'PostgreSQL'],
    demoLink: 'https://example.com',
    sourceLink: 'https://github.com/yourusername/project'
  }
])

// Animation for the projects section
const projectAnimation = {
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
  <section id="projects" class="py-20 bg-white dark:bg-dark-700">
    <div class="container mx-auto px-4">
      <SectionTitle 
        title="My Projects" 
        subtitle="Check out some of my recent work"
      />
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div 
          v-for="(project, index) in projects" 
          :key="project.id"
          v-motion="projectAnimation"
          :custom="index"
          class="bg-gray-50 dark:bg-dark-600 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <!-- Project Image -->
          <div class="relative overflow-hidden group h-60">
            <img 
              :src="project.image" 
              :alt="project.title" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
              <div class="space-x-4">
                <a 
                  :href="project.demoLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-block px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300 text-sm"
                >
                  Live Demo
                </a>
                <a 
                  :href="project.sourceLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors duration-300 text-sm"
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>
          
          <!-- Project Info -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(tech, techIndex) in project.techStack" 
                :key="techIndex"
                class="px-3 py-1 bg-gray-200 dark:bg-dark-500 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>