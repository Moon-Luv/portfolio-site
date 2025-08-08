<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { useSkillsStore } from '@/stores/skills'

const skillsStore = useSkillsStore()
const scrolling = ref(false)

const selectedCategory = ref('All')
const categories = ref(['All'])

onMounted(async () => {
  await skillsStore.fetchSkills()
  categories.value = ['All', ...new Set(skillsStore.skills.map(s => s.category))]
})

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'All') {
    return skillsStore.skills
  }
  return skillsStore.skills.filter(skill => skill.category === selectedCategory.value)
})

watch(filteredSkills, () => {
  scrolling.value = filteredSkills.value.length > 10
})
</script>

<template>
  <section id="skills" class="py-20 bg-gray-50 dark:bg-dark-800 overflow-hidden">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-extrabold text-center mb-12">My Skills</h2>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
          :class="selectedCategory === cat 
            ? 'bg-blue-500 text-white shadow-lg' 
            : 'bg-gray-200 dark:bg-dark-600 text-gray-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-dark-500'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Skills Grid -->
      <div
        class="skills-wrapper"
        :class="{ scrolling: scrolling }"
      >
        <div
          v-for="(skill, i) in (scrolling ? [...filteredSkills, ...filteredSkills] : filteredSkills)"
          :key="i + skill.name"
          class="skill-item bg-white/80 dark:bg-dark-700/80 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <img :src="skill.icon" :alt="skill.name" class="w-14 h-14 mb-3 transition-transform duration-300 group-hover:scale-110" />
          <span class="text-base font-medium text-gray-800 dark:text-gray-200 text-center">
            {{ skill.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-wrapper {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-auto-flow: column;
  gap: 1.5rem;
}

.skill-item {
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
}

/* Marquee effect */
.scrolling {
  animation: scrollLeft 15s linear infinite;
}

@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
