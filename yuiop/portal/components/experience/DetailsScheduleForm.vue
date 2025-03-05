<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-base font-semibold text-gray-900 dark:text-white">
        Details & Schedule
      </h2>
      <span class="text-sm text-gray-500">Step 2 of 4</span>
    </div>

    <!-- Details Section -->
    <div class="border-b border-gray-200 dark:border-gray-800 pb-8">
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Experience Details
      </h3>

      <div class="grid grid-cols-2 gap-6">
        <UFormGroup label="Location" class="col-span-2">
          <UInput
            v-model="form.location"
            placeholder="Where will this experience take place?"
          />
        </UFormGroup>

        <UFormGroup label="Duration (hours)" class="col-span-1">
          <UInput
            v-model="form.duration"
            type="number"
            placeholder="2"
            min="0.5"
            step="0.5"
          />
        </UFormGroup>

        <UFormGroup label="Capacity" class="col-span-1">
          <div class="flex gap-4">
            <UInput
              v-model="form.minParticipants"
              type="number"
              placeholder="Min"
              min="1"
              class="w-1/2"
            />
            <UInput
              v-model="form.maxParticipants"
              type="number"
              placeholder="Max"
              min="1"
              class="w-1/2"
            />
          </div>
        </UFormGroup>

        <UFormGroup label="What's included?" class="col-span-2">
          <UTextarea
            v-model="inclusionsText"
            placeholder="Enter each item on a new line"
            :rows="3"
            @input="parseInclusions"
          />
          <template #help>
            List all items, equipment, or services included in this experience.
          </template>
        </UFormGroup>

        <UFormGroup label="What's excluded?" class="col-span-2">
          <UTextarea
            v-model="exclusionsText"
            placeholder="Enter each item on a new line"
            :rows="3"
            @input="parseExclusions"
          />
          <template #help>
            Make it clear what participants need to bring or arrange themselves.
          </template>
        </UFormGroup>
      </div>
    </div>

    <!-- Schedule Section -->
    <div class="pt-4">
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Schedule
      </h3>

      <UFormGroup label="Schedule Type" class="mb-6">
        <URadioGroup
          v-model="form.scheduleType"
          :options="scheduleTypes"
          option-attribute="name"
          class="grid grid-cols-3 gap-4"
        >
          <template #option="{ option }">
            <div
              class="p-4 border rounded-lg hover:border-primary-500 cursor-pointer"
              :class="[
                form.scheduleType === option.value
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

      <!-- Fixed schedule options -->
      <div v-if="form.scheduleType === 'fixed'" class="grid grid-cols-2 gap-6">
        <UFormGroup label="Start Date" class="col-span-1">
          <UInput v-model="form.startDate" type="date" />
        </UFormGroup>
        <UFormGroup label="End Date" class="col-span-1">
          <UInput v-model="form.endDate" type="date" />
        </UFormGroup>
      </div>

      <!-- Recurring schedule options -->
      <div
        v-if="form.scheduleType === 'recurring'"
        class="grid grid-cols-2 gap-6"
      >
        <UFormGroup label="Repeat on Days" class="col-span-2">
          <UCheckbox
            v-for="day in weekDays"
            :key="day.value"
            v-model="selectedDays"
            :value="day.value"
            :label="day.label"
            class="mr-4"
          />
        </UFormGroup>

        <UFormGroup label="Start Date" class="col-span-1">
          <UInput v-model="form.startDate" type="date" />
        </UFormGroup>
        <UFormGroup label="End Date" class="col-span-1">
          <UInput v-model="form.endDate" type="date" />
        </UFormGroup>
      </div>

      <!-- Flexible schedule options -->
      <div
        v-if="form.scheduleType === 'flexible'"
        class="grid grid-cols-2 gap-6"
      >
        <UFormGroup label="Availability" class="col-span-2">
          <UTextarea
            placeholder="Describe when this experience is generally available"
            :rows="3"
          />
          <template #help>
            Ex: "Available upon request with at least 48 hours notice"
          </template>
        </UFormGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Store is auto-imported

const experienceStore = useExperienceStore();
const { form } = storeToRefs(experienceStore);

// For handling inclusions/exclusions as text areas
const inclusionsText = ref("");
const exclusionsText = ref("");

// Parse lists from textareas
function parseInclusions() {
  form.value.inclusions = inclusionsText.value
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");
}

function parseExclusions() {
  form.value.exclusions = exclusionsText.value
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");
}

// Set initial textarea values if they already exist
onMounted(() => {
  if (form.value.inclusions?.length) {
    inclusionsText.value = form.value.inclusions.join("\n");
  }
  if (form.value.exclusions?.length) {
    exclusionsText.value = form.value.exclusions.join("\n");
  }
});

// Schedule type options
const scheduleTypes = [
  {
    name: "Fixed Dates",
    value: "fixed",
    description: "Specific start/end dates",
  },
  {
    name: "Recurring",
    value: "recurring",
    description: "Repeats on specific days",
  },
  {
    name: "Flexible",
    value: "flexible",
    description: "Available upon request",
  },
];

// Weekday options for recurring schedule
const weekDays = [
  { label: "Mon", value: "mon" },
  { label: "Tue", value: "tue" },
  { label: "Wed", value: "wed" },
  { label: "Thu", value: "thu" },
  { label: "Fri", value: "fri" },
  { label: "Sat", value: "sat" },
  { label: "Sun", value: "sun" },
];

// For managing selected days
const selectedDays = ref([]);

// Sync selectedDays with form.recurringDays
watch(
  selectedDays,
  (newVal) => {
    form.value.recurringDays = newVal;
  },
  { deep: true }
);

// Initialize selectedDays from form
onMounted(() => {
  if (form.value.recurringDays?.length) {
    selectedDays.value = form.value.recurringDays;
  }
});
</script>
