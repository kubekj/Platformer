<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-800">
    <div class="flex max-w-[1600px] mx-auto">
      <!-- Main Form Content -->
      <div
        class="flex-1 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700"
      >
        <div class="max-w-3xl mx-auto py-8 px-12">
          <!-- Header -->
          <div class="mb-12">
            <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
              New experience
            </h1>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
              Get started by filling in the information below to create your new
              experience.
            </p>
          </div>

          <form @submit.prevent="handleSubmit">
            <!-- Basic Information -->
            <div class="space-y-12">
              <div class="border-b border-gray-200 dark:border-gray-800 pb-12">
                <div class="flex justify-between items-center mb-6">
                  <h2
                    class="text-base font-semibold text-gray-900 dark:text-white"
                  >
                    Basic information
                  </h2>
                  <span class="text-sm text-gray-500">Step 1 of 4</span>
                </div>

                <div class="grid grid-cols-2 gap-6">
                  <UFormGroup class="col-span-2" label="Title" required>
                    <UInput
                      v-model="form.title"
                      placeholder="Enter a clear name for your experience"
                    />
                  </UFormGroup>

                  <UFormGroup class="col-span-2" label="Category" required>
                    <USelect
                      v-model="form.category"
                      :options="categories"
                      option-attribute="name"
                      placeholder="Select category"
                    />
                  </UFormGroup>

                  <UFormGroup class="col-span-2" label="Description" required>
                    <UTextarea
                      v-model="form.description"
                      placeholder="Provide a detailed description of your experience"
                      :rows="4"
                    />
                  </UFormGroup>

                  <UFormGroup class="col-span-2" label="Language" required>
                    <USelect
                      v-model="form.language"
                      :options="languages"
                      placeholder="Select language"
                    />
                  </UFormGroup>

                  <UFormGroup class="col-span-2" label="Type" required>
                    <URadioGroup
                      v-model="form.type"
                      :options="types"
                      option-attribute="name"
                      class="grid grid-cols-3 gap-4"
                    >
                      <template #option="{ option }">
                        <div
                          class="p-4 border rounded-lg hover:border-primary-500 cursor-pointer"
                          :class="[
                            form.type === option.value
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                              : 'border-gray-200 dark:border-gray-800',
                          ]"
                        >
                          <div
                            class="font-medium text-gray-900 dark:text-white"
                          >
                            {{ option.name }}
                          </div>
                          <p class="mt-1 text-sm text-gray-500">
                            {{ option.description }}
                          </p>
                        </div>
                      </template>
                    </URadioGroup>
                  </UFormGroup>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="mt-6 flex items-center justify-end gap-x-6">
              <UButton color="gray" variant="ghost" to="/">Cancel</UButton>
              <UButton type="submit" color="primary">Next step</UButton>
            </div>
          </form>
        </div>
      </div>

      <!-- Steps Navigation -->
      <div class="w-96 p-8">
        <div class="sticky top-8">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
            Your progress
          </h3>
          <nav class="relative">
            <!-- Connecting Line -->
            <div
              class="absolute left-[19px] top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"
            />

            <!-- Steps -->
            <div class="relative space-y-8">
              <button
                v-for="step in steps"
                :key="step.id"
                class="group flex items-center w-full"
              >
                <!-- Circle with number -->
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
                <!-- Step text -->
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ExperienceCategory,
  ExperienceType,
  Step,
  NewExperienceForm,
} from "~/types";

const form = reactive<NewExperienceForm>({
  title: "",
  description: "",
  category: undefined, // Changed from null to undefined
  type: undefined, // Changed from null to undefined
  language: undefined, // Changed from null to undefined
});

const categories: ExperienceCategory[] = [
  { name: "Adventure", value: "adventure" },
  { name: "Culture", value: "culture" },
  { name: "Food & Drink", value: "food-drink" },
  { name: "Nature", value: "nature" },
  { name: "Sports", value: "sports" },
];

const types: ExperienceType[] = [
  {
    name: "One-time",
    value: "one-time",
    description: "A single occurrence event",
  },
  {
    name: "Recurring",
    value: "recurring",
    description: "Repeats on a schedule",
  },
  {
    name: "On-demand",
    value: "on-demand",
    description: "Available anytime",
  },
];

const languages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
];

const steps: Step[] = [
  { id: 1, name: "Basic Information", status: "current" },
  { id: 2, name: "Details & Schedule", status: "upcoming" },
  { id: 3, name: "Pricing", status: "upcoming" },
  { id: 4, name: "Preview & Publish", status: "upcoming" },
];

const handleSubmit = () => {
  console.log(form);
};
</script>
