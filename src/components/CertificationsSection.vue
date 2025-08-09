<script setup>
import { onMounted, ref } from 'vue'
import { useCertificateStore } from '@/stores/certificates'
import SectionTitle from './SectionTitle.vue'
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const certificateStore = useCertificateStore()
const swiperInstance = ref(null)

// Swiper options
const swiperOptions = {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: { 
    clickable: true,
    dynamicBullets: true
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  grabCursor: true,
  effect: 'slide',
  speed: 600,
  loop: false,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
}

onMounted(() => {
  certificateStore.fetchCertificates()
})
</script>

<template>
  <section id="certifications" class="py-20 bg-white dark:bg-dark-900">
    <div class="container mx-auto px-4 sm:px-6">
      <SectionTitle 
        title="Certifications" 
        subtitle="Professional achievements and qualifications"
      />

      <!-- Loading -->
      <div v-if="certificateStore.loading" class="flex justify-center py-12">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-gray-200 dark:bg-dark-700 h-10 w-10"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-gray-200 dark:bg-dark-700 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-dark-700 rounded"></div>
              <div class="h-4 bg-gray-200 dark:bg-dark-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="certificateStore.error" class="flex justify-center items-center py-12">
        <div class="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="text-red-600 dark:text-red-400 font-medium">{{ certificateStore.error }}</p>
        </div>
      </div>

      <!-- Certificates Carousel -->
      <div v-else class="mt-12">
        <div class="flex justify-between items-center mb-6">
          <div class="flex space-x-2">
            <button 
              @click="swiperInstance?.slidePrev()" 
              class="p-2 rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              @click="swiperInstance?.slideNext()" 
              class="p-2 rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <swiper
          :slides-per-view="swiperOptions.slidesPerView"
          :space-between="swiperOptions.spaceBetween"
          :modules="swiperOptions.modules"
          :navigation="swiperOptions.navigation"
          :pagination="swiperOptions.pagination"
          :autoplay="swiperOptions.autoplay"
          :breakpoints="swiperOptions.breakpoints"
          @swiper="swiperInstance = $event"
          class="certification-swiper"
        >
          <swiper-slide 
            v-for="certification in certificateStore.certificates" 
            :key="certification.$id"
            class="pb-12"> <!-- Add padding for pagination dots -->
            <div class="h-full bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700 rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg group">
              <div class="p-6 h-full flex flex-col">
                <div class="flex flex-col items-center mb-5 text-center">
                  <div class="w-16 h-16 mb-4 flex-shrink-0 bg-gray-50 dark:bg-dark-700 rounded-full p-2 flex items-center justify-center shadow-sm group-hover:shadow group-hover:bg-gray-100 dark:group-hover:bg-dark-600 transition-all duration-300">
                    <img 
                      :src="certification.logo" 
                      :alt="certification.issuer + ' logo'" 
                      class="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 dark:text-white text-lg line-clamp-2">
                      {{ certification.name }}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {{ certification.issuer }}
                    </p>
                  </div>
                </div>
                
                <div class="pt-3 mt-auto border-t border-gray-100 dark:border-dark-700 flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ certification.date }}
                  </span>
                  <a 
                    :href="certification.url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-300 group-hover:underline"
                  >
                    View Certificate
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<style scoped>
.certification-swiper {
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0 -10px;
}

/* Navigation arrows */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: var(--color-primary-600);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: scale(1.05);
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 18px;
  font-weight: bold;
}

:deep(.swiper-button-next) {
  right: 10px;
}

:deep(.swiper-button-prev) {
  left: 10px;
}

/* Pagination bullets */
:deep(.swiper-pagination) {
  bottom: 0px;
}

:deep(.swiper-pagination-bullet) {
  background-color: var(--color-gray-400);
  opacity: 0.5;
  transition: all 0.3s ease;
  width: 8px;
  height: 8px;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: var(--color-primary-600);
  opacity: 1;
  width: 10px;
  height: 10px;
}

/* Dynamic bullets effect */
:deep(.swiper-pagination-bullet-active-main) {
  transform: scale(1.2);
}

/* Slide effects */
:deep(.swiper-slide) {
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: 0.7;
}

:deep(.swiper-slide-active) {
  opacity: 1;
  transform: scale(1.02);
}

/* Dark mode adjustments */
.dark :deep(.swiper-button-next),
.dark :deep(.swiper-button-prev) {
  background-color: rgba(30, 41, 59, 0.9);
  color: var(--color-primary-400);
}

.dark :deep(.swiper-button-next:hover),
.dark :deep(.swiper-button-prev:hover) {
  background-color: rgba(30, 41, 59, 1);
}

.dark :deep(.swiper-pagination-bullet) {
  background-color: var(--color-gray-500);
}

.dark :deep(.swiper-pagination-bullet-active) {
  background-color: var(--color-primary-400);
}

/* Custom animation for slides */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.swiper-slide-active .group {
  animation: fadeInScale 0.5s ease forwards;
}
</style>
