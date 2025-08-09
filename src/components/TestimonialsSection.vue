<script setup>
import { onMounted, ref } from "vue";
import SectionTitle from "./SectionTitle.vue";
import { useTestimonialStore } from "@/stores/testimonials";
import { Swiper, SwiperSlide } from "swiper/vue";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { Navigation, Autoplay, Pagination, EffectCoverflow } from "swiper/modules";

const testimonialStore = useTestimonialStore();
const swiperInstance = ref(null);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

onMounted(() => {
  testimonialStore.fetchTestimonials();
});
</script>

<template>
  <section id="testimonials" class="py-24 relative overflow-hidden">
    <!-- Background pattern -->  
    <div class="absolute inset-0 bg-gradient-to-b from-white to-gray-100 dark:from-dark-800 dark:to-dark-900 opacity-80"></div>
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <SectionTitle
        title="Client Testimonials"
        subtitle="Trusted by professionals across industries"
      />

      <!-- Loading state with skeleton -->  
      <div v-if="testimonialStore.loading" class="py-10 max-w-5xl mx-auto">
        <div class="swiper-container-skeleton">
          <div class="flex gap-8 overflow-hidden">
            <div v-for="i in 3" :key="i" class="testimonial-skeleton animate-pulse flex-shrink-0 w-full md:w-1/2 lg:w-1/3 h-64 rounded-2xl bg-gray-200 dark:bg-dark-700 p-6 flex flex-col">
              <div class="h-4 bg-gray-300 dark:bg-dark-600 rounded w-3/4 mb-4"></div>
              <div class="h-4 bg-gray-300 dark:bg-dark-600 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-300 dark:bg-dark-600 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-300 dark:bg-dark-600 rounded w-2/3 mb-6"></div>
              <div class="mt-auto flex items-center">
                <div class="w-12 h-12 rounded-full bg-gray-300 dark:bg-dark-600"></div>
                <div class="ml-4">
                  <div class="h-4 bg-gray-300 dark:bg-dark-600 rounded w-24 mb-2"></div>
                  <div class="h-3 bg-gray-300 dark:bg-dark-600 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error state with retry button -->
      <div
        v-else-if="testimonialStore.error"
        class="text-center py-16 max-w-md mx-auto"
      >
        <div class="bg-red-50 dark:bg-dark-700 p-6 rounded-xl border border-red-200 dark:border-red-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="text-red-600 dark:text-red-400 font-medium text-lg mb-2">{{ testimonialStore.error }}</p>
          <p class="text-gray-600 dark:text-gray-300 mb-4">We couldn't load the testimonials. Please try again.</p>
          <button 
            @click="testimonialStore.fetchTestimonials()" 
            class="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg transition-colors duration-200 font-medium flex items-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </button>
        </div>
      </div>

      <!-- Testimonials Slider with custom navigation -->  
      <div v-else class="relative max-w-6xl mx-auto">
        <!-- Custom navigation buttons -->  
        <div class="absolute top-1/2 -left-4 md:-left-8 z-20 transform -translate-y-1/2">
          <button 
            @click="swiperInstance?.slidePrev()" 
            class="testimonial-nav-button prev-button group"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        <div class="absolute top-1/2 -right-4 md:-right-8 z-20 transform -translate-y-1/2">
          <button 
            @click="swiperInstance?.slideNext()" 
            class="testimonial-nav-button next-button group"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <Swiper
          :modules="[Navigation, Autoplay, Pagination, EffectCoverflow]"
          :navigation="{ 
            nextEl: '.next-button', 
            prevEl: '.prev-button' 
          }"
          :pagination="{ 
            clickable: true, 
            dynamicBullets: true,
            dynamicMainBullets: 3
          }"
          :autoplay="{ 
            delay: 6000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }"
          :effect="'coverflow'"
          :coverflowEffect="{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }"
          :grab-cursor="true"
          :centered-slides="true"
          :space-between="30"
          :slides-per-view="1"
          :breakpoints="{
            640: { slidesPerView: 1.2, spaceBetween: 20 },
            768: { slidesPerView: 1.5, spaceBetween: 30 },
            1024: { slidesPerView: 2, spaceBetween: 40 },
            1280: { slidesPerView: 2.5, spaceBetween: 50 },
          }"
          class="testimonials-swiper !pb-16"
          @swiper="onSwiper"
        >
          <SwiperSlide
            v-for="(testimonial, index) in testimonialStore.testimonials"
            :key="testimonial.$id"
            class="!h-auto py-12"
          >
            <div
              class="h-full p-8 rounded-2xl relative flex flex-col justify-between transition-all duration-500 bg-white dark:bg-dark-800 shadow-testimonial dark:shadow-testimonial-dark border border-gray-100 dark:border-gray-700/30 overflow-hidden group"
            >
              <!-- Background pattern -->  
              <div class="absolute inset-0 bg-dot-pattern opacity-5 dark:opacity-10 transition-opacity duration-500 group-hover:opacity-10 dark:group-hover:opacity-15"></div>
              
              <!-- Quote icon -->  
              <div class="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 text-primary-100 dark:text-primary-900/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                  <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 006.75-6.75v-2.25h-2.25v2.25a4.5 4.5 0 01-9 0v-2.25a.75.75 0 01.75-.75h3a.75.75 0 010 1.5H4.5v2.25a4.5 4.5 0 004.5 4.5 4.513 4.513 0 003.307-1.438.75.75 0 011.09.062 6.961 6.961 0 01-5.093 2.275 6.721 6.721 0 01-6.75-6.75v-2.25h2.25v-3a.75.75 0 01.75-.75h3a.75.75 0 010 1.5H4.5v2.25c0 .414.336.75.75.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.696-.471z" clip-rule="evenodd" />
                </svg>
              </div>
              
              <!-- Rating stars -->  
              <div class="flex mb-4 text-yellow-400">
                <svg v-for="star in 5" :key="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
              </div>

              <!-- Testimonial content with gradient quote marks -->  
              <div class="relative mb-8">
                <div class="absolute -top-2 -left-1 text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 opacity-50">
                  &ldquo;
                </div>
                <p class="text-gray-700 dark:text-gray-200 italic leading-relaxed">
                  {{ testimonial.quote }}
                </p>
                <div class="absolute bottom-0 right-0 text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 opacity-50">
                  &rdquo;
                </div>
              </div>
              
              <div class="flex items-center mt-auto">
                <div class="relative">
                  <div class="w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary-100 dark:ring-primary-900/20 shadow-lg transition-all duration-300 group-hover:ring-primary-200 dark:group-hover:ring-primary-800/30">
                    <img
                      :src="testimonial.avatar"
                      :alt="testimonial.name"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-md transform transition-transform duration-300 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="font-semibold text-lg text-gray-800 dark:text-white transition-colors duration-300">
                    {{ testimonial.name }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    {{ testimonial.title }}
                    <span class="inline-block w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600 mx-2"></span>
                    <span class="text-primary-600 dark:text-primary-400 font-medium">Verified</span>
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    
    <!-- Testimonial count indicator -->  
    <div v-if="!testimonialStore.loading && !testimonialStore.error && testimonialStore.testimonials.length > 0" 
         class="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-md border border-gray-200/50 dark:border-gray-700/50 text-sm text-gray-500 dark:text-gray-400">
      <span class="font-medium text-primary-600 dark:text-primary-400">{{ testimonialStore.testimonials.length }}</span> client testimonials
    </div>
  </section>
</template>

<style scoped>
/* Custom background patterns */
.bg-grid-pattern {
  background-image: linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

.bg-dot-pattern {
  background-image: radial-gradient(currentColor 1px, transparent 1px);
  background-size: 16px 16px;
}

/* Custom navigation buttons */
.testimonial-nav-button {
  @apply w-12 h-12 rounded-full bg-white dark:bg-dark-800 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-primary-50 dark:hover:bg-dark-700 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-900;
}

/* Custom shadow for testimonial cards */
.shadow-testimonial {
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1);
}

.shadow-testimonial-dark {
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.1);
}

/* Custom swiper styling */
.testimonials-swiper :deep(.swiper-pagination) {
  bottom: 0;
}

.testimonials-swiper :deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: theme('colors.gray.300');
  opacity: 0.5;
  transition: all 0.3s ease;
}

.testimonials-swiper :deep(.swiper-pagination-bullet-active) {
  background: theme('colors.primary.500');
  opacity: 1;
  width: 12px;
  height: 12px;
}

:deep(.swiper-pagination-bullet-active-main) {
  transform: scale(1.2);
}

/* Dark mode adjustments */
.dark .testimonials-swiper :deep(.swiper-pagination-bullet) {
  background: theme('colors.gray.600');
}

.dark .testimonials-swiper :deep(.swiper-pagination-bullet-active) {
  background: theme('colors.primary.400');
}

/* Slide transition effects */
:deep(.swiper-slide) {
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: 0.4;
  transform: scale(0.85);
}

:deep(.swiper-slide-active),
:deep(.swiper-slide-prev),
:deep(.swiper-slide-next) {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 768px) {
  :deep(.swiper-slide-active) {
    opacity: 1;
    transform: scale(1);
  }
  
  :deep(.swiper-slide-prev),
  :deep(.swiper-slide-next) {
    opacity: 0.7;
    transform: scale(0.9);
  }
}
</style>
