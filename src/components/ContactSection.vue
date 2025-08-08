<script setup>
import { ref } from 'vue'
import SectionTitle from './SectionTitle.vue'
import { useMotion } from '@vueuse/motion'

// Form state
const formData = ref({
  name: '',
  email: '',
  message: ''
})

const status = ref('')
const isSubmitting = ref(false)

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault()
  isSubmitting.value = true
  status.value = ''

  try {
    // Build payload from formData
    const payload = {
      access_key: "9fc0cf69-a164-4499-9e4c-376c88766d64",
      name: formData.value.name,
      email: formData.value.email,
      message: formData.value.message,
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'  // Important for JSON payload
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (response.ok) {
      status.value = 'Thanks for your message! I\'ll get back to you soon.'
      formData.value = { name: '', email: '', message: '' }
    } else {
      throw new Error(data.error || 'Something went wrong. Please try again.')
    }
  } catch (error) {
    status.value = error.message
  } finally {
    isSubmitting.value = false
  }
}


// Social media links
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/nohan-ahmed',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/polash-pramanik/',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/nohan3303/',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>`
  },
  {
    name: 'Email',
    url: 'mailto:developer.polash@outlook.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
  }
]

// Animation for the contact section
const contactAnimation = {
  initial: {
    y: 50,
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
  <section id="contact" class="py-20 bg-white dark:bg-dark-700">
    <div class="container mx-auto px-4">
      <SectionTitle title="Contact Me" subtitle="Let's get in touch" />

      <div class="flex flex-col md:flex-row gap-12">
        <!-- Contact Form -->
        <div v-motion="contactAnimation" class="w-full md:w-1/2 space-y-6">
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white">
            Send Me a Message
          </h3>

          <form @submit="handleSubmit" class="space-y-4">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                v-model="formData.name"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-600 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                v-model="formData.email"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-600 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                v-model="formData.message"
                rows="5"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-600 text-gray-900 dark:text-white"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center"
                :class="{ 'opacity-75 cursor-not-allowed': isSubmitting }"
              >
                <svg
                  v-if="isSubmitting"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ isSubmitting ? "Sending..." : "Send Message" }}
              </button>
            </div>

            <div
              v-if="status"
              class="p-4 rounded-lg"
              :class="
                status.includes('Thanks')
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              "
            >
              {{ status }}
            </div>
          </form>
        </div>

        <!-- Contact Info -->
        <div v-motion="contactAnimation" class="w-full md:w-1/2 space-y-6">
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white">
            Connect With Me
          </h3>

          <p class="text-gray-600 dark:text-gray-300">
            Feel free to reach out to me through the contact form or via any of
            the social media platforms below. I'm always open to discussing new
            projects, creative ideas, or opportunities to be part of your
            vision.
          </p>

          <div class="flex flex-wrap gap-4 pt-4">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 bg-gray-100 dark:bg-dark-600 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-200 dark:hover:bg-dark-500 transition-colors duration-300"
              :aria-label="link.name"
            >
              <span v-html="link.icon"></span>
            </a>
          </div>

          <div class="pt-8">
            <p class="text-gray-600 dark:text-gray-300 mb-2">
              <strong>Location:</strong> Dhaka, Bangladesh
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> developer.polash@outlook.com
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
