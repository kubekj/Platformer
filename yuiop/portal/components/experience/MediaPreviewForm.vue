<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-base font-semibold text-gray-900 dark:text-white">
        Media & Preview
      </h2>
      <span class="text-sm text-gray-500">Step 4 of 4</span>
    </div>

    <!-- Media Upload Section -->
    <div class="border-b border-gray-200 dark:border-gray-800 pb-8">
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Experience Photos
      </h3>

      <UFormGroup label="Cover Photo" required class="mb-6">
        <div
          class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-700 px-6 py-10"
        >
          <div v-if="!form.featuredImage" class="text-center">
            <UIcon
              name="i-heroicons-photo"
              class="mx-auto h-12 w-12 text-gray-300"
            />
            <div
              class="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400"
            >
              <label
                for="file-upload"
                class="relative cursor-pointer rounded-md bg-white dark:bg-gray-900 font-semibold text-primary-600 dark:text-primary-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  @change="handleCoverPhotoUpload"
                />
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs leading-5 text-gray-600 dark:text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
          <div v-else class="w-full">
            <img
              :src="form.featuredImage"
              alt="Cover photo"
              class="h-48 w-full object-cover rounded-md"
            />
            <div class="mt-2 flex justify-end">
              <UButton
                color="gray"
                variant="ghost"
                size="sm"
                icon="i-heroicons-trash"
                @click="removeCoverPhoto"
              >
                Remove
              </UButton>
            </div>
          </div>
        </div>
      </UFormGroup>

      <UFormGroup label="Gallery Images" class="mb-6">
        <div class="mt-2 grid grid-cols-3 gap-4">
          <div
            v-for="(image, index) in form.galleryImages"
            :key="index"
            class="relative rounded-lg overflow-hidden h-32"
          >
            <img
              :src="image"
              alt="Gallery image"
              class="h-full w-full object-cover"
            />
            <button
              class="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
              @click="removeGalleryImage(index)"
            >
              <UIcon name="i-heroicons-x-mark" class="h-4 w-4" />
            </button>
          </div>

          <div
            v-if="form.galleryImages && form.galleryImages.length < 6"
            class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 flex items-center justify-center cursor-pointer h-32"
            @click="triggerGalleryUpload"
          >
            <div class="text-center">
              <UIcon
                name="i-heroicons-plus"
                class="mx-auto h-6 w-6 text-gray-400"
              />
              <p class="text-xs text-gray-500 mt-1">Add Image</p>
              <input
                ref="galleryUploadInput"
                type="file"
                class="hidden"
                @change="handleGalleryImageUpload"
              />
            </div>
          </div>
        </div>
        <template #help>
          Add up to 6 additional images to showcase your experience.
        </template>
      </UFormGroup>
    </div>

    <!-- Preview Section -->
    <div class="pt-4">
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Experience Preview
      </h3>

      <UCard class="mb-8">
        <template #header>
          <div class="flex justify-between items-center">
            <h4 class="font-medium">Preview</h4>
            <UBadge color="blue" variant="soft">{{
              form.status || "Draft"
            }}</UBadge>
          </div>
        </template>

        <div class="space-y-4">
          <!-- Preview image or placeholder -->
          <div
            class="bg-gray-100 dark:bg-gray-800 rounded-lg h-48 w-full overflow-hidden"
          >
            <img
              v-if="form.featuredImage"
              :src="form.featuredImage"
              alt="Experience cover"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <UIcon name="i-heroicons-photo" class="h-12 w-12 text-gray-300" />
            </div>
          </div>

          <h2 class="text-xl font-semibold">
            {{ form.title || "Experience Title" }}
          </h2>

          <div
            class="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-4"
          >
            <div v-if="form.category" class="flex items-center">
              <UIcon name="i-heroicons-tag" class="mr-1 h-4 w-4" />
              <span>{{ getCategoryName(form.category) }}</span>
            </div>
            <div v-if="form.duration" class="flex items-center">
              <UIcon name="i-heroicons-clock" class="mr-1 h-4 w-4" />
              <span>{{ form.duration }} hours</span>
            </div>
            <div v-if="form.language" class="flex items-center">
              <UIcon name="i-heroicons-language" class="mr-1 h-4 w-4" />
              <span>{{ getLanguageName(form.language) }}</span>
            </div>
          </div>

          <p class="text-gray-700 dark:text-gray-300">
            {{ form.description || "Experience description will appear here" }}
          </p>

          <div v-if="form.price" class="font-medium text-lg">
            {{ form.currency }} {{ form.price.toFixed(2) }}
          </div>
        </div>
      </UCard>

      <UAlert
        title="Ready to publish?"
        description="Once you've filled out all required information, you can publish this experience to make it visible to guests."
        color="info"
        variant="soft"
        class="mb-4"
      >
        <template #icon>
          <UIcon name="i-heroicons-information-circle" />
        </template>
      </UAlert>
    </div>
  </div>
</template>

<script setup lang="ts">
// Store is auto-imported
import type { ExperienceCategory } from "~/types";

const experienceStore = useExperienceStore();
const { form } = storeToRefs(experienceStore);

// References for file inputs
const galleryUploadInput = ref(null);

// Mock image upload (would connect to a real backend in production)
function handleCoverPhotoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.featuredImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removeCoverPhoto() {
  form.value.featuredImage = undefined;
}

function triggerGalleryUpload() {
  galleryUploadInput.value.click();
}

function handleGalleryImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!form.value.galleryImages) {
        form.value.galleryImages = [];
      }
      form.value.galleryImages.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

function removeGalleryImage(index) {
  form.value.galleryImages.splice(index, 1);
}

// Helper functions for preview
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

function getCategoryName(value: string) {
  const category = categories.find((cat) => cat.value === value);
  return category ? category.name : value;
}

function getLanguageName(value: string) {
  const language = languages.find((lang) => lang.value === value);
  return language ? language.label : value;
}
</script>
