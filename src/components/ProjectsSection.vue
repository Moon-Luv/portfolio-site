<script setup>
import { onMounted } from "vue";
import SectionTitle from "./SectionTitle.vue";
import { useProjectStore } from "@/stores/projects";

const projectStore = useProjectStore();

onMounted(() => {
  projectStore.fetchProjects();
});
</script>

<template>
  <section id="projects" class="py-20 bg-white dark:bg-dark-700">
    <div class="container mx-auto px-4">
      <SectionTitle
        title="My Projects"
        subtitle="Check out some of my recent work"
      />

      <!-- Loading -->
      <div v-if="projectStore.loading" class="text-center py-10">
        <p class="text-gray-500">Loading projects...</p>
      </div>

      <!-- Error -->
      <div
        v-else-if="projectStore.error"
        class="text-center py-10 text-red-500"
      >
        {{ projectStore.error }}
      </div>

      <!-- Projects -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div
          v-for="project in projectStore.projects"
          :key="project.$id"
          class="bg-gray-50 dark:bg-dark-600 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <!-- Project Image -->
          <div class="relative overflow-hidden group h-60">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6"
            >
              <div class="space-x-4">
                <a
                  :href="project.demoLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-block px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300 text-sm"
                >
                  Live Demo
                </a>
                <a
                  :href="project.sourceLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors duration-300 text-sm"
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>

          <!-- Project Info -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {{ project.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tech, techIndex) in project.techStack"
                :key="techIndex"
                class="px-3 py-1 bg-gray-200 dark:bg-dark-500 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
