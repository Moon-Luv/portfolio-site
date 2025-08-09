<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import CertificationsSection from './components/CertificationsSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

// Initialize theme store
const themeStore = useThemeStore()

// Scroll to section handler
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Adjust for navbar height
      behavior: 'smooth'
    })
  }
}

// Initialize dark mode and system preference watch on mount
onMounted(() => {
  themeStore.initDarkMode()
  themeStore.setupSystemPreferenceWatch()
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <Navbar @scroll-to="scrollToSection" />
    
    <main>
      <HeroSection @scroll-to="scrollToSection" />
      <AboutSection @scroll-to="scrollToSection" />
      <SkillsSection />
      <ExperienceSection />
      <CertificationsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
    
    <FooterSection />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Adjust for navbar height */
}

body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
