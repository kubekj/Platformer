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
            <!-- Step 1: Basic Information -->
            <div v-if="currentStep === 1" class="space-y-12">
              <div class="border-b border-gray-200 dark:border-gray-800 pb-12">
                <BasicInfoForm />
              </div>
            </div>

            <!-- Step 2: Details & Schedule -->
            <div v-else-if="currentStep === 2" class="space-y-12">
              <div class="border-b border-gray-200 dark:border-gray-800 pb-12">
                <DetailsScheduleForm />
              </div>
            </div>

            <!-- Step 3: Pricing -->
            <div v-else-if="currentStep === 3" class="space-y-12">
              <div class="border-b border-gray-200 dark:border-gray-800 pb-12">
                <PricingForm />
              </div>
            </div>

            <!-- Step 4: Media & Preview -->
            <div v-else-if="currentStep === 4" class="space-y-12">
              <div class="pb-12">
                <MediaPreviewForm />
              </div>
            </div>

            <!-- Form Actions -->
            <div class="mt-6 flex items-center justify-end gap-x-6">
              <UButton
                v-if="currentStep > 1"
                color="gray"
                variant="ghost"
                @click="prevStep"
              >
                Back
              </UButton>
              <UButton
                v-if="currentStep < totalSteps"
                type="button"
                color="primary"
                :disabled="!canProceed"
                @click="nextStep"
              >
                Next step
              </UButton>
              <UButton
                v-else
                type="submit"
                color="primary"
                :loading="isSubmitting"
              >
                Create Experience
              </UButton>
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
                @click="goToStep(step.id)"
              >
                <!-- Circle with number -->
                <span
                  :class="[
                    'relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
                    step.status === 'current'
                      ? 'bg-primary-500 text-white ring-8 ring-primary-50 dark:ring-primary-950'
                      : step.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
                  ]"
                >
                  <UIcon
                    v-if="step.status === 'completed'"
                    name="i-heroicons-check"
                    class="h-5 w-5"
                  />
                  <span v-else>{{ step.id }}</span>
                </span>
                <!-- Step text -->
                <div class="ml-4 min-w-0">
                  <div
                    :class="[
                      'text-sm font-medium',
                      step.status === 'current'
                        ? 'text-primary-500'
                        : step.status === 'completed'
                        ? 'text-green-500'
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
// Store is auto-imported via the Pinia Nuxt module configuration
import type { Step } from "~/types";
import BasicInfoForm from "~/components/experience/BasicInfoForm.vue";
import DetailsScheduleForm from "~/components/experience/DetailsScheduleForm.vue";
import PricingForm from "~/components/experience/PricingForm.vue";
import MediaPreviewForm from "~/components/experience/MediaPreviewForm.vue";

// Ensure we have access to useToast for notifications
const toast = useToast();

const experienceStore = useExperienceStore();
const { currentStep, totalSteps, stepValidation, form } =
  storeToRefs(experienceStore);
const { nextStep, prevStep, goToStep, submitExperience } = experienceStore;

// Submission state
const isSubmitting = ref(false);

// Determine if we can proceed to the next step
const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return stepValidation.value.step1;
  }

  // For other steps, we could be more permissive
  return true;
});

// Steps configuration
const steps = computed(
  () =>
    [
      {
        id: 1,
        name: "Basic Information",
        status:
          currentStep.value === 1
            ? "current"
            : currentStep.value > 1
            ? "completed"
            : "upcoming",
      },
      {
        id: 2,
        name: "Details & Schedule",
        status:
          currentStep.value === 2
            ? "current"
            : currentStep.value > 2
            ? "completed"
            : "upcoming",
      },
      {
        id: 3,
        name: "Pricing",
        status:
          currentStep.value === 3
            ? "current"
            : currentStep.value > 3
            ? "completed"
            : "upcoming",
      },
      {
        id: 4,
        name: "Preview & Publish",
        status: currentStep.value === 4 ? "current" : "upcoming",
      },
    ] as Step[]
);

async function handleSubmit() {
  isSubmitting.value = true;

  try {
    const result = await submitExperience();

    // Show success notification
    const toast = useToast();
    toast.add({
      title: "Experience Created",
      description: `"${result.title}" has been created successfully.`,
      icon: "i-heroicons-check-circle",
      color: "green",
      timeout: 5000,
    });

    // Redirect to the experiences page
    await navigateTo("/bookings");
  } catch (error) {
    console.error("Failed to create experience:", error);

    // Show error notification
    const toast = useToast();
    toast.add({
      title: "Creation Failed",
      description:
        "There was an error creating your experience. Please try again.",
      icon: "i-heroicons-exclamation-triangle",
      color: "red",
      timeout: 5000,
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>
