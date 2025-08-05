<script setup>
import { ref } from 'vue'
import SectionTitle from './SectionTitle.vue'
import { useMotion } from '@vueuse/motion'

// Sample skills data - replace with your own skills
const skillCategories = ref([
  {
    id: 1,
    name: 'Frontend',
    skills: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
    ]
  },
  {
    id: 2,
    name: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg' },
    ]
  },
  {
    id: 3,
    name: 'Database',
    skills: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    ]
  },
  {
    id: 4,
    name: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ]
  }
])

// Animation for the skills section
const skillsAnimation = {
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
  <section id="skills" class="py-20 bg-gray-50 dark:bg-dark-800">
    <div class="container mx-auto px-4">
      <SectionTitle 
        title="My Skills" 
        subtitle="Technologies I work with"
      />
      
      <div class="space-y-12">
        <div 
          v-for="(category, categoryIndex) in skillCategories" 
          :key="category.id"
          v-motion="skillsAnimation"
          :custom="categoryIndex"
          class="space-y-6"
        >
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white text-center md:text-left">
            {{ category.name }}
          </h3>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            <div 
              v-for="(skill, skillIndex) in category.skills" 
              :key="skillIndex"
              class="flex flex-col items-center p-4 bg-white dark:bg-dark-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div class="w-12 h-12 mb-3 flex items-center justify-center">
                <img 
                  :src="skill.icon" 
                  :alt="skill.name" 
                  class="w-10 h-10 object-contain"
                />
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>