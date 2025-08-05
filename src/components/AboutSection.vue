<script setup>
import SectionTitle from './SectionTitle.vue'
import { useMotion } from '@vueuse/motion'

// Animation for the about section
const aboutAnimation = {
  initial: {
    y: 50,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 800,
      ease: 'easeOut',
      delay: 200
    }
  }
}

// Use motion for animations
const { motion } = useMotion()
</script>

<template>
  <section id="about" class="py-20 bg-gray-50 dark:bg-dark-800">
    <div class="container mx-auto px-4">
      <SectionTitle 
        title="About Me" 
        subtitle="Get to know me better"
      />
      
      <div class="flex flex-col md:flex-row items-center gap-12">
        <!-- Photo -->
        <div v-motion="aboutAnimation" class="w-full md:w-2/5 lg:w-1/3">
          <div class="relative">
            <!-- Replace with your own photo -->
            <div class="w-full h-80 md:h-96 bg-gray-300 dark:bg-dark-600 rounded-lg overflow-hidden">
              <div class="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <!-- Decorative element -->
            <div class="absolute -bottom-4 -right-4 w-full h-full border-4 border-primary-500 rounded-lg -z-10"></div>
          </div>
        </div>
        
        <!-- About text -->
        <div v-motion="aboutAnimation" class="w-full md:w-3/5 lg:w-2/3 space-y-6">
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white">
            Who am I?
          </h3>
          
          <p class="text-gray-600 dark:text-gray-300">
            I'm a passionate software developer with a strong focus on creating clean, efficient, and user-friendly applications. With several years of experience in web development, I've worked on a variety of projects ranging from small business websites to complex enterprise applications.
          </p>
          
          <p class="text-gray-600 dark:text-gray-300">
            My journey in software development began when I was in college, where I discovered my love for problem-solving and creating digital solutions. Since then, I've been constantly learning and improving my skills to stay up-to-date with the latest technologies and best practices.
          </p>
          
          <p class="text-gray-600 dark:text-gray-300">
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities. I believe in continuous learning and am always looking for new challenges to tackle.
          </p>
          
          <div class="pt-4 flex flex-wrap gap-4">
            <a 
              href="#contact" 
              class="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300"
              @click.prevent="$emit('scrollTo', 'contact')"
            >
              Contact Me
            </a>
            <a 
              href="#" 
              class="inline-block px-6 py-3 bg-gray-200 dark:bg-dark-600 hover:bg-gray-300 dark:hover:bg-dark-500 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>