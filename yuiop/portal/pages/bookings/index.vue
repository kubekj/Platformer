<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-800">
    <div class="max-w-[1600px] mx-auto p-8">
      <!-- Header -->
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
        Bookings
      </h1>

      <!-- Filters -->
      <div class="flex gap-4 mb-8">
        <USelect v-model="sortBy" :options="sortOptions" placeholder="Sort by" class="w-48" />
        <USelect v-model="dateRange" :options="dateRangeOptions" placeholder="Select date range" class="w-48" />
      </div>

      <!-- Experiences List -->
      <div class="space-y-4">
        <div v-for="experience in experiences" :key="experience.id"
          class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div class="flex items-center justify-between w-full">
            <!-- Experience Info -->
            <div class="flex items-center gap-4 min-w-[350px] max-w-[350px]">
              <img :src="experience.image" :alt="experience.title" class="w-16 h-16 rounded-lg object-cover" />
              <h3 class="font-medium text-gray-900 dark:text-white truncate">
                {{ experience.title }}
              </h3>
            </div>

            <!-- Upcoming Events -->
            <div class="min-w-[200px] max-w-[200px]">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ experience.upcomingEvents }}
              </span>
            </div>

            <!-- Guests -->
            <div class="min-w-[150px] max-w-[150px]">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ experience.guests }}
              </span>
            </div>

            <!-- Storefront Link -->
            <div class="min-w-[180px] max-w-[180px]">
              <UButton size="xs" color="gray" variant="ghost" :to="experience.storefrontLink">
                {{ experience.title === 'Create your cer...' ? 'Experience link' : 'Link to Storefront' }}
              </UButton>
            </div>

            <!-- Status Badge -->
            <div class="min-w-[120px] max-w-[120px] flex justify-center">
              <UBadge :color="experience.active ? 'green' : 'red'" variant="soft" size="sm"
                class="w-[72px] justify-center">
                {{ experience.active ? 'Active' : 'Inactive' }}
              </UBadge>
            </div>

            <!-- Action Button -->
            <div class="w-[50px] flex justify-end">
              <UButton color="gray" variant="ghost" icon="i-heroicons-chevron-right"
                :to="`/bookings/${experience.id}`" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Experience {
  id: string;
  title: string;
  image: string;
  upcomingEvents: string;
  guests: string;
  storefrontLink: string;
  active: boolean;
}

const sortBy = ref('alphabetic');
const dateRange = ref('');

const sortOptions = [
  { label: 'Alphabetic', value: 'alphabetic' },
  { label: 'Date', value: 'date' },
  { label: 'Status', value: 'status' },
];

const dateRangeOptions = [
  { label: 'Today', value: 'today' },
  { label: 'This week', value: 'week' },
  { label: 'This month', value: 'month' },
  { label: 'Custom range', value: 'custom' },
];

// Mock data - in a real app this would come from an API
const experiences = ref<Experience[]>([
  {
    id: '1',
    title: 'Create your certification',
    image: '/images/experiences/1.jpg',
    upcomingEvents: '28 upcoming events',
    guests: '36/42 guests',
    storefrontLink: '#',
    active: true,
  },
  {
    id: '2',
    title: 'Dinner there',
    image: '/images/experiences/2.jpg',
    upcomingEvents: '28 upcoming events',
    guests: '88/100 guests',
    storefrontLink: '#',
    active: true,
  },
  {
    id: '3',
    title: 'Beach volley',
    image: '/images/experiences/3.jpg',
    upcomingEvents: '32 upcoming events',
    guests: '22/24 guests',
    storefrontLink: '#',
    active: true,
  },
  {
    id: '4',
    title: 'Hiking around',
    image: '/images/experiences/4.jpg',
    upcomingEvents: '15 upcoming events',
    guests: '38/45 guests',
    storefrontLink: '#',
    active: true,
  },
  {
    id: '5',
    title: 'Riding in the wild',
    image: '/images/experiences/5.jpg',
    upcomingEvents: '10 upcoming events',
    guests: '90/120 guests',
    storefrontLink: '#',
    active: false,
  },
  {
    id: '6',
    title: 'Climbing with Laura',
    image: '/images/experiences/6.jpg',
    upcomingEvents: '28 upcoming events',
    guests: '18/20 guests',
    storefrontLink: '#',
    active: true,
  },
]);
</script>
