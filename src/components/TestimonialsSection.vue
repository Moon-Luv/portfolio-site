<script setup>
import { onMounted } from "vue";
import SectionTitle from "./SectionTitle.vue";
import { useTestimonialStore } from "@/stores/testimonials";
import { Swiper, SwiperSlide } from "swiper/vue";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay} from "swiper/modules";

const testimonialStore = useTestimonialStore();

onMounted(() => {
  testimonialStore.fetchTestimonials();
});
</script>

<template>
  <section id="testimonials" class="py-20 bg-white dark:bg-dark-700">
    <div class="container mx-auto px-4">
      <SectionTitle
        title="Testimonials"
        subtitle="What people say about my work"
      />

      <!-- Loading -->
      <div v-if="testimonialStore.loading" class="text-center py-10">
        <p class="text-gray-500">Loading testimonials...</p>
      </div>

      <!-- Error -->
      <div
        v-else-if="testimonialStore.error"
        class="text-center py-10 text-red-500"
      >
        {{ testimonialStore.error }}
      </div>

      <!-- Slider -->
      <div v-else>
        <Swiper
          :modules="[Navigation, Autoplay]"
          navigation
          :autoplay= "{ delay: 5000, disableOnInteraction: false }"
          :space-between="30"
          :slides-per-view="1"
          :breakpoints="{
            768: { slidesPerView: 2, spaceBetween: 40 },
          }"
          class="!pb-10"
        >
          <SwiperSlide
            v-for="testimonial in testimonialStore.testimonials"
            :key="testimonial.$id"
            class="!h-auto"
          >
            <div
              class="h-full p-6 rounded-2xl shadow-lg relative flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl bg-white/80 dark:bg-dark-600/80 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30"
            >
              <!-- Quote icon -->
              <div
                class="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>

              <!-- Testimonial content -->
              <div class="mb-6">
                <p
                  class="text-lg text-gray-700 dark:text-gray-200 italic leading-relaxed"
                >
                  "{{ testimonial.quote }}"
                </p>
              </div>

              <!-- Author -->
              <div class="flex items-center mt-auto">
                <div
                  class="w-14 h-14 rounded-full overflow-hidden mr-4 ring-4 ring-primary-400/50 shadow-md"
                >
                  <img
                    :src="testimonial.avatar"
                    :alt="testimonial.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4
                    class="font-semibold text-lg text-gray-800 dark:text-white"
                  >
                    {{ testimonial.name }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ testimonial.title }}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>
