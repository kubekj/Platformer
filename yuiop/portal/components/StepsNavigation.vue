<template>
  <div class="w-96 p-8">
    <div class="sticky top-8">
      <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
        Your progress
      </h3>
      <nav class="relative">
        <div
          class="absolute left-[19px] top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"
        />
        <div class="relative space-y-8">
          <button
            v-for="step in steps"
            :key="step.id"
            class="group flex items-center w-full"
          >
            <span
              :class="[
                'relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
                step.status === 'current'
                  ? 'bg-primary-500 text-white ring-8 ring-primary-50 dark:ring-primary-950'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
              ]"
            >
              {{ step.id }}
            </span>
            <div class="ml-4 min-w-0">
              <div
                :class="[
                  'text-sm font-medium',
                  step.status === 'current'
                    ? 'text-primary-500'
                    : 'text-gray-500 dark:text-gray-400',
                ]"
              >
                {{ step.name }}
              </div>
            </div>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Step } from "~/types";

defineProps<{
  steps: Step[];
}>();
</script>
