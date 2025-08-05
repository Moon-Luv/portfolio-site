<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DarkModeToggle from './DarkModeToggle.vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    closeMenu()
    window.scrollTo({
      top: element.offsetTop - 80, // Adjust for navbar height
      behavior: 'smooth'
    })
  }
}

const checkScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  checkScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <header 
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-white/90 dark:bg-dark-700/90 backdrop-blur-sm shadow-md' : 'bg-transparent'"
  >
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <a href="#" class="text-xl font-bold text-primary-600 dark:text-primary-400">Portfolio</a>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <a 
          v-for="(item, index) in ['home', 'about', 'skills', 'certifications', 'projects', 'contact']" 
          :key="index"
          href="#"
          @click.prevent="scrollToSection(item)"
          class="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {{ item.charAt(0).toUpperCase() + item.slice(1) }}
        </a>
        <DarkModeToggle />
      </nav>
      
      <!-- Mobile Menu Button -->
      <div class="flex items-center md:hidden space-x-4">
        <DarkModeToggle />
        <button 
          @click="toggleMenu" 
          class="text-gray-700 dark:text-gray-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div 
      v-if="isMenuOpen" 
      class="md:hidden bg-white dark:bg-dark-700 shadow-lg absolute w-full py-4 transition-all duration-300"
    >
      <nav class="flex flex-col space-y-4 px-4">
        <a 
          v-for="(item, index) in ['home', 'about', 'skills', 'certifications', 'projects', 'contact']" 
          :key="index"
          href="#"
          @click.prevent="scrollToSection(item)"
          class="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 py-2 transition-colors"
        >
          {{ item.charAt(0).toUpperCase() + item.slice(1) }}
        </a>
      </nav>
    </div>
  </header>
</template>