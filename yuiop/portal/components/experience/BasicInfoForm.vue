<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-base font-semibold text-gray-900 dark:text-white">
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
        <template #help>
          A catchy, descriptive title helps your experience stand out.
        </template>
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
        <template #help>
          Describe what makes your experience unique and what participants can
          expect.
        </template>
      </UFormGroup>

      <UFormGroup class="col-span-2" label="Language" required>
        <USelect
          v-model="form.language"
          :options="languages"
          placeholder="Select language"
        />
        <template #help>
          The primary language this experience will be conducted in.
        </template>
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
              <div class="font-medium text-gray-900 dark:text-white">
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
</template>

<script setup lang="ts">
import type { ExperienceCategory, ExperienceType } from "~/types";
// Store is auto-imported

const experienceStore = useExperienceStore();
const { form } = storeToRefs(experienceStore);

// Option data
const categories: ExperienceCategory[] = [
  { name: "Adventure", value: "adventure" },
  { name: "Culture", value: "culture" },
  { name: "Food & Drink", value: "food-drink" },
  { name: "Nature", value: "nature" },
  { name: "Sports", value: "sports" },
  { name: "Wellness", value: "wellness" },
  { name: "Arts & Crafts", value: "arts-crafts" },
  { name: "Education", value: "education" },
  { name: "Entertainment", value: "entertainment" },
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
  { label: "Italian", value: "it" },
  { label: "Portuguese", value: "pt" },
  { label: "Japanese", value: "ja" },
  { label: "Chinese", value: "zh" },
];
</script>
