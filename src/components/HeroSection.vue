<script setup>
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'

const phrases = ref(['Full-Stack Developer', 'Python Ninja', 'JavaScript Enthusiast', "Database warrior", 'Open Source Contributor'])
const currentPhraseIndex = ref(0)
const displayText = ref('')
const isDeleting = ref(false)
const typingSpeed = ref(100) // milliseconds per character
const deleteSpeed = ref(50) // faster deletion
const delayAfterPhrase = 1500 // pause after phrase is complete
const delayAfterDelete = 500 // pause after deletion

const typeText = () => {
  const currentPhrase = phrases.value[currentPhraseIndex.value]
  
  if (!isDeleting.value) {
    // Typing
    displayText.value = currentPhrase.substring(0, displayText.value.length + 1)
    
    // If completed typing the phrase
    if (displayText.value === currentPhrase) {
      isDeleting.value = true
      setTimeout(typeText, delayAfterPhrase)
      return
    }
  } else {
    // Deleting
    displayText.value = currentPhrase.substring(0, displayText.value.length - 1)
    
    // If completed deleting the phrase
    if (displayText.value === '') {
      isDeleting.value = false
      currentPhraseIndex.value = (currentPhraseIndex.value + 1) % phrases.value.length
      setTimeout(typeText, delayAfterDelete)
      return
    }
  }
  
  // Schedule next update
  setTimeout(typeText, isDeleting.value ? deleteSpeed.value : typingSpeed.value)
}

onMounted(() => {
  setTimeout(typeText, 1000) // Start typing after 1 second
})

// Animation for the hero section
const heroAnimation = {
  initial: {
    y: 20,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 800,
      ease: 'easeOut'
    }
  }
}

// Use motion for animations
const { motion } = useMotion()
</script>

<template>
  <section 
    id="home" 
    class="min-h-screen flex items-center pt-20 pb-16 px-4 bg-gradient-to-br from-white to-gray-100 dark:from-dark-700 dark:to-dark-900"
  >
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-12">
        <!-- Left side with text -->
        <div v-motion="heroAnimation" class="w-full md:w-1/2 space-y-6">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white">
            Hi, I'm <span class="text-primary-600 dark:text-primary-400">Polash</span>
          </h1>
          
          <div class="h-16 flex items-center">
            <p class="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 flex">
              I'm a 
              <span class="text-secondary-600 dark:text-secondary-400 ml-2 border-r-2 border-secondary-600 dark:border-secondary-400 pr-1 overflow-hidden whitespace-nowrap">
                {{ displayText }}
              </span>
            </p>
          </div>
          
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
            Passionate about creating elegant solutions to complex problems. I build modern web applications with cutting-edge technologies.
          </p>
          
          <div class="pt-4">
            <a 
              href="#contact" 
              class="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              @click.prevent="$emit('scrollTo', 'contact')"
            >
              Get In Touch
            </a>
            <a 
              href="#projects" 
              class="inline-block ml-4 px-8 py-3 bg-transparent border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-medium rounded-lg hover:bg-primary-600/10 transition-colors duration-300"
              @click.prevent="$emit('scrollTo', 'projects')"
            >
              View Projects
            </a>
          </div>
        </div>
        
        <!-- Right side with animated image -->
        <div v-motion="heroAnimation" class="w-full md:w-1/2 flex justify-center">
          <div class="relative w-full max-w-md animate-float">
            <!-- Replace with your own image or animation -->
            <svg class="w-full h-auto" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <path d="M488.5,274.5L446.5,238.391L403.31,258.227L403.5,263.5L408.5,264.5L442.748,301.466L442.5,364.5L435.5,367.5L370.5,369.5L352.5,363.5L333.5,352.5L304.5,303.5L288.5,278.5L288.5,266.5L243.5,215.5L210.5,203.5L176.5,233.5L176.5,248.5L142.5,229.5L142.5,190.5L133.5,177.5L125.5,177.5L92.5,212.5L68.5,208.5L39.5,184.5L16.5,176.5L13.5,156.5L1.5,144.5L1.5,125.5L17.5,100.5L33.5,98.5L51.5,105.5L72.5,122.5L97.5,131.5L121.5,129.5L148.5,97.5L168.5,80.5L193.5,78.5L213.5,95.5L242.5,97.5L250.5,113.5L279.5,125.5L286.5,141.5L321.5,154.5L337.5,166.5L344.5,187.5L361.5,203.5L384.5,217.5L401.5,239.5L431.5,245.5L453.5,252.5L486.5,263.5L488.5,274.5Z" fill="#0ea5e9" stroke="#0284c7" stroke-width="2"/>
              <circle cx="250" cy="250" r="120" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
              <path d="M280,230 Q250,280 220,230" stroke="#111827" stroke-width="3" fill="none"/>
              <circle cx="200" cy="200" r="10" fill="#111827"/>
              <circle cx="300" cy="200" r="10" fill="#111827"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>