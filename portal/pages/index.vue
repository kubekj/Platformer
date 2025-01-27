<script setup lang="ts">
import type { Experience } from '~/types'

definePageMeta({
  layout: 'default'
})

// Experience statistics
const stats = reactive({
  totalExperiences: 12,
  activeExperiences: 8,
  averageRating: 4.8,
  monthlyBookings: 156
})

// Mock data - In production, this would come from an API
const recentExperiences = ref<Experience[]>([
  {
    id: '1',
    title: 'City Walking Tour',
    description: 'Experience the city like a local',
    language: 'en',
    inclusions: ['Guide', 'Map', 'Refreshments'],
    status: 'published',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  }
])

const { data: experiences } = await useAsyncData('experiences', () => {
  // In production: return queryClient.experiences.list()
  return Promise.resolve(recentExperiences.value)
})
</script>

<template>
  <div class="min-h-screen p-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Dashboard Overview
      </h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Monitor and manage your experiences performance
      </p>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
      <UCard v-for="(value, key) in stats" :key="key">
        <div class="flex items-center gap-4">
          <UIcon
            :name="getStatIcon(key)"
            class="flex-shrink-0 w-8 h-8 text-primary-500"
          />
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatStatLabel(key) }}
            </p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">
              {{ formatStatValue(key, value) }}
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Recent Experiences -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">
            Recent Experiences
          </h2>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-arrow-right"
            to="/experiences"
          >
            View all
          </UButton>
        </div>
      </template>

      <UTable
        :rows="experiences"
        :columns="[
          {
            key: 'title',
            label: 'Experience',
          },
          {
            key: 'status',
            label: 'Status',
          },
          {
            key: 'createdAt',
            label: 'Created',
          }
        ]"
      >
        <template #status-data="{ row }">
          <UBadge
            :color="getStatusColor(row.status)"
            size="sm"
            class="capitalize"
          >
            {{ row.status }}
          </UBadge>
        </template>
        <template #createdAt-data="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script lang="ts">
// Utility functions
function getStatIcon(key: string): string {
  const iconMap: Record<string, string> = {
    totalExperiences: 'i-heroicons-book-open',
    activeExperiences: 'i-heroicons-sparkles',
    averageRating: 'i-heroicons-star',
    monthlyBookings: 'i-heroicons-calendar'
  }
  return iconMap[key] || 'i-heroicons-question-mark-circle'
}

function formatStatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^\w/, c => c.toUpperCase())
}

function formatStatValue(key: string, value: number): string {
  if (key === 'averageRating') return value.toFixed(1)
  return value.toLocaleString()
}

function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    published: 'green',
    draft: 'gray',
    archived: 'red'
  }
  return colorMap[status] || 'gray'
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>