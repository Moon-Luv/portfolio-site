<script setup>
import { ref } from 'vue'
import SectionTitle from './SectionTitle.vue'
import { useMotion } from '@vueuse/motion'

// Sample testimonials data - replace with your own testimonials
const testimonials = ref([
  {
    id: 1,
    quote: "Working with this developer was an absolute pleasure. They delivered our project on time and exceeded our expectations with their attention to detail and problem-solving skills.",
    name: "Sarah Johnson",
    title: "Product Manager at TechCorp",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    quote: "One of the most talented developers I've had the opportunity to work with. Their code is clean, well-documented, and they have an exceptional ability to translate complex requirements into elegant solutions.",
    name: "Michael Chen",
    title: "CTO at StartupX",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    id: 3,
    quote: "I was impressed by their technical expertise and communication skills. They took the time to understand our business needs and delivered a solution that perfectly matched our requirements.",
    name: "Emily Rodriguez",
    title: "Marketing Director at CreativeAgency",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 4,
    quote: "An exceptional problem-solver who consistently delivers high-quality work. Their ability to adapt to changing requirements and provide innovative solutions made our project a success.",
    name: "David Wilson",
    title: "Senior Developer at EnterpriseInc",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  }
])

// Animation for the testimonials section
const testimonialAnimation = {
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
      delay: i * 150 + 200
    }
  })
}

// Use motion for animations
const { motion } = useMotion()
</script>

<template>
  <section id="testimonials" class="py-20 bg-white dark:bg-dark-700">
    <div class="container mx-auto px-4">
      <SectionTitle 
        title="Testimonials" 
        subtitle="What people say about my work"
      />
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="testimonial.id"
          v-motion="testimonialAnimation"
          :custom="index"
          class="bg-gray-50 dark:bg-dark-600 p-6 rounded-lg shadow-lg relative"
        >
          <!-- Quote icon -->
          <div class="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          
          <!-- Testimonial content -->
          <div class="mb-6">
            <p class="text-gray-600 dark:text-gray-300 italic">
              "{{ testimonial.quote }}"
            </p>
          </div>
          
          <!-- Testimonial author -->
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full overflow-hidden mr-4">
              <img 
                :src="testimonial.avatar" 
                :alt="testimonial.name" 
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 class="font-bold text-gray-800 dark:text-white">
                {{ testimonial.name }}
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ testimonial.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>