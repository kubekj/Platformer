<script setup lang="ts">
interface NavigationLink {
  label: string;
  icon: string;
  to: string;
  active?: boolean;
}

const navigationLinks: NavigationLink[] = [
  {
    label: "Overview",
    icon: "i-heroicons-chart-bar",
    to: "/",
  },
  {
    label: "Create",
    icon: "i-heroicons-sparkles",
    to: "/create",
    active: true,
  },
  {
    label: "Bookings",
    icon: "i-heroicons-calendar",
    to: "/bookings",
  },
  {
    label: "Publish",
    icon: "i-heroicons-paper-airplane",
    to: "/publish",
  },
  {
    label: "Analyze",
    icon: "i-heroicons-chart-pie",
    to: "/analyze",
  },
  {
    label: "Calendar",
    icon: "i-heroicons-calendar-days",
    to: "/calendar",
  },
  {
    label: "Settings",
    icon: "i-heroicons-cog-6-tooth",
    to: "/settings",
  },
];

const route = useRoute();
</script>

<template>
  <div class="h-screen">
    <div class="flex h-full bg-white dark:bg-gray-900">
      <!-- Sidebar Navigation -->
      <nav class="w-64 bg-gray-50 dark:bg-gray-800 flex flex-col">
        <div class="px-6 py-4">
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
            Yuiop
          </h1>
        </div>

        <div class="flex-1 px-4 py-2">
          <UButton
            size="sm"
            color="primary"
            variant="soft"
            class="w-full mb-6 font-medium"
            to="/new"
          >
            <template #leading>
              <UIcon name="i-heroicons-plus" class="w-4 h-4" />
            </template>
            New experience
          </UButton>

          <div class="space-y-1">
            <UButton
              v-for="(link, index) in navigationLinks"
              :key="index"
              :to="link.to"
              :class="[
                'w-full justify-start font-normal',
                route.path === link.to
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50',
              ]"
              variant="ghost"
              size="sm"
            >
              <template #leading>
                <UIcon :name="link.icon" class="w-5 h-5" />
              </template>
              {{ link.label }}
            </UButton>
          </div>
        </div>
      </nav>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-auto bg-white dark:bg-gray-900">
        <slot />
      </main>
    </div>
  </div>
</template>
