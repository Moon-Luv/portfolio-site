<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import SectionTitle from './SectionTitle.vue';
import { useMotion } from '@vueuse/motion';
import { useExperienceStore } from '@/stores/experience';

// Initialize experience store
const experienceStore = useExperienceStore();

// For interactive filtering
const selectedYear = ref('All');
const years = computed(() => {
  if (!experienceStore.experiences.length) return ['All'];
  const uniqueYears = new Set(experienceStore.experiences.map(exp => {
    // Extract year from duration (e.g., "Jan 2022 - Present" -> "2022")
    const match = exp.duration.match(/\d{4}/);
    return match ? match[0] : 'Unknown';
  }));
  return ['All', ...Array.from(uniqueYears).sort().reverse()];
});

// For "Load More" functionality
const visibleCount = ref(3); // Initially show 3 items

// Filtered experiences based on selected year
const filteredExperiences = computed(() => {
  if (selectedYear.value === 'All') return experienceStore.experiences;
  return experienceStore.experiences.filter(exp => exp.duration.includes(selectedYear.value));
});

// Visible experiences based on visibleCount
const visibleExperiences = computed(() => {
  return filteredExperiences.value.slice(0, visibleCount.value);
});

// Reference for the newly loaded content
const newContentRef = ref(null);

// Function to load more experiences
const loadMore = () => {
  // Store the current count before adding more
  const previousCount = visibleCount.value;
  // Show 3 more items
  visibleCount.value += 3;
  
  // Scroll to the newly loaded content after DOM update
  setTimeout(() => {
    const newItems = document.querySelectorAll('.experience-item');
    if (newItems && newItems[previousCount]) {
      newItems[previousCount].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
      });
    }
  }, 100);
};

// Function to show less experiences
const showLess = () => {
  visibleCount.value = 3; // Reset to initial count
  
  // Scroll back to the top of the experience section
  setTimeout(() => {
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }, 100);
};

// Reset visibleCount when year filter changes
const resetVisibleCount = () => {
  visibleCount.value = 3;
};

// Watch for year filter changes to reset visible count
watch(selectedYear, resetVisibleCount);

onMounted(() => {
  experienceStore.fetchExperiences();
});

// Animation for the experience items
const experienceAnimation = {
  initial: {
    y: 50,
    opacity: 0
  },
  enter: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

// Use motion for animations
const { motion } = useMotion();

// For hover effects
const hoveredItem = ref(null);
const setHoveredItem = (id) => {
  hoveredItem.value = id;
};
const clearHoveredItem = () => {
  hoveredItem.value = null;
};

// For random background patterns
const getRandomPattern = () => {
  const patterns = [
    'radial-gradient(circle at 10% 20%, rgba(14, 165, 233, 0.05) 0%, rgba(139, 92, 246, 0.05) 90%)',
    'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
    'repeating-linear-gradient(45deg, rgba(14, 165, 233, 0.03) 0px, rgba(14, 165, 233, 0.03) 10px, rgba(139, 92, 246, 0.03) 10px, rgba(139, 92, 246, 0.03) 20px)'
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
};

// Generate a unique pattern for each experience
const patterns = computed(() => {
  return experienceStore.experiences.reduce((acc, exp) => {
    acc[exp.id] = getRandomPattern();
    return acc;
  }, {});
});

</script>

<template>
  <section id="experience" class="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-dark-800 dark:to-dark-700 overflow-hidden">
    <div class="container mx-auto px-4 relative">
      <!-- Background decorative elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-3xl opacity-30 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 dark:bg-secondary-900/20 rounded-full filter blur-3xl opacity-30 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
      
      <SectionTitle 
        title="Experience" 
        subtitle="My professional journey and career milestones"
      />
      
      <!-- Year filter -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="year in years"
          :key="year"
          @click="selectedYear = year"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105"
          :class="selectedYear === year 
            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
            : 'bg-gray-200 dark:bg-dark-600 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-500'"
        >
          {{ year }}
        </button>
      </div>
      
      <div class="relative mt-12">
        <!-- Timeline line with gradient -->
        <div class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-400 via-primary-500 to-secondary-500 rounded-full opacity-70"></div>
        
        <!-- Experience items -->
        <div class="space-y-16">
          <!-- Loading state with animation -->
          <div v-if="experienceStore.loading" class="text-center py-16">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
            <p class="text-gray-500 dark:text-gray-400 animate-pulse">Loading experiences...</p>
          </div>
          
          <!-- Error state -->
          <div v-else-if="experienceStore.error" class="text-center py-16 px-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p class="text-red-600 dark:text-red-400 font-medium">{{ experienceStore.error }}</p>
          </div>
          
          <!-- No results state -->
          <div v-else-if="filteredExperiences.length === 0" class="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p class="text-gray-600 dark:text-gray-300">No experiences found for the selected filter.</p>
            <button 
              @click="selectedYear = 'All'" 
              class="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full text-sm font-medium transition-colors duration-300"
            >
              Show all experiences
            </button>
          </div>
          
          <!-- Experience items with enhanced styling -->
          <div 
            v-else
            v-for="(exp, index) in visibleExperiences" 
            :key="exp.id || index"
            :custom="index"
            class="relative group experience-item"
            :ref="index === visibleCount - 3 ? newContentRef : undefined"
            @mouseenter="setHoveredItem(exp.id)"
            @mouseleave="clearHoveredItem()"
          >
            <!-- Timeline dot with pulse effect -->
            <div class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 z-10">
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 border-4 border-white dark:border-dark-800 flex items-center justify-center shadow-lg">
                <div class="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <div 
                class="absolute top-0 left-0 w-8 h-8 rounded-full bg-primary-500 animate-ping opacity-20"
                :class="{ 'opacity-75': hoveredItem === exp.id }"
              ></div>
            </div>
            
            <!-- Content card with enhanced styling -->
            <div 
              class="md:w-5/12 ml-10 md:ml-0 transition-all duration-500 ease-in-out"
              :class="[index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12', 
                      hoveredItem === exp.id ? 'transform md:scale-105 z-20' : '']"
            >
              <div 
                class="bg-white dark:bg-dark-600 p-6 md:p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden"
                :style="{ background: `${patterns[exp.id] || ''}, var(--card-bg, white)` }"
                style="--card-bg: var(--tw-bg-opacity, 1) * 255, 255, 255;"
              >
                <!-- Decorative corner accent -->
                <div class="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
                  <div class="w-full h-full bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full"></div>
                </div>
                
                <!-- Duration badge with gradient -->
                <div class="relative">
                  <span class="inline-block px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full mb-4 shadow-sm">
                    {{ exp.duration }}
                  </span>
                </div>
                
                <!-- Company logo -->
                <div class="flex items-center mb-4">
                  <div class="w-16 h-16 rounded-full overflow-hidden shadow-md mr-4 flex-shrink-0 border-2 border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-110 hover:shadow-lg company-logo">
                    <img 
                      :src="exp.logo" 
                      :alt="exp.logoAlt || `${exp.company} logo`" 
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <!-- Role and company with enhanced styling -->
                    <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-1 relative">
                      {{ exp.role }}
                    </h3>
                    <h4 class="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 relative">
                      {{ exp.company }}
                    </h4>
                  </div>
                </div>
                
                <!-- Description with enhanced styling -->
                <p class="text-gray-600 dark:text-gray-300 mb-5 relative leading-relaxed">
                  {{ exp.description }}
                </p>
                
                <!-- Technologies with enhanced styling -->
                <div class="mb-5 relative">
                  <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Technologies
                  </h5>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="tech in exp.technologies" 
                      :key="tech"
                      class="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-dark-500 text-gray-800 dark:text-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-gray-200 dark:hover:bg-dark-400"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
                
                <!-- Achievements with enhanced styling -->
                <div class="relative">
                  <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Achievements
                  </h5>
                  <ul class="space-y-2">
                    <li 
                      v-for="(achievement, i) in exp.achievements" 
                      :key="i"
                      class="pl-6 relative text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      <div class="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400"></div>
                      {{ achievement }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Load More / Show Less buttons -->
          <div v-if="!experienceStore.loading && !experienceStore.error && filteredExperiences.length > 3" class="flex justify-center mt-12 space-x-4">
            <!-- Load More button -->
            <button 
              v-if="visibleCount < filteredExperiences.length"
              @click="loadMore" 
              class="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
            >
              <span>Load More</span>
              <span class="text-xs opacity-75">({{ filteredExperiences.length - visibleCount }} more)</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            
            <!-- Show Less button (appears when all items are shown) -->
            <button 
              v-if="visibleCount >= filteredExperiences.length && visibleCount > 3"
              @click="showLess" 
              class="px-6 py-3 bg-white dark:bg-dark-600 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105 hover:bg-gray-50 dark:hover:bg-dark-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>Show Less</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Timeline animations and effects */
@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(14, 165, 233, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(14, 165, 233, 0);
  }
}

/* Hover effects for cards */
.group:hover .bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Load More and Show Less button animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.relative.group {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Smooth scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

/* Animation for newly loaded items */
.experience-item:nth-child(n+4) {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .space-y-16 > div {
    margin-left: 1.5rem;
  }
}

/* Subtle hover effect for technology badges */
.bg-gray-100:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

/* Enhance dark mode experience */
.dark .bg-dark-600 {
  backdrop-filter: blur(5px);
}

/* Company logo hover effects */
.company-logo {
  position: relative;
  z-index: 10;
}

.company-logo:hover {
  box-shadow: 0 0 15px rgba(14, 165, 233, 0.5);
}

.dark .company-logo:hover {
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
}

.company-logo img {
  transition: transform 0.3s ease;
}

.company-logo:hover img {
  transform: scale(1.05);
}
</style>