<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-base font-semibold text-gray-900 dark:text-white">
        Pricing
      </h2>
      <span class="text-sm text-gray-500">Step 3 of 4</span>
    </div>

    <div class="border-b border-gray-200 dark:border-gray-800 pb-8">
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Base Pricing
      </h3>

      <div class="grid grid-cols-2 gap-6">
        <UFormGroup label="Price" class="col-span-1">
          <div class="flex">
            <USelect
              v-model="form.currency"
              :options="currencyOptions"
              class="w-24 rounded-r-none"
            />
            <UInput
              v-model="form.price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="flex-1 rounded-l-none"
            />
          </div>
        </UFormGroup>

        <UFormGroup label="Pricing Type" class="col-span-1">
          <URadio
            v-model="pricingType"
            value="per-person"
            label="Per Person"
            class="mb-2"
          />
          <URadio
            v-model="pricingType"
            value="per-group"
            label="Per Group (up to max capacity)"
          />
        </UFormGroup>

        <UFormGroup label="Cancellation Policy" class="col-span-2">
          <USelect
            v-model="form.cancellationPolicy"
            :options="cancellationPolicies"
            option-attribute="name"
            placeholder="Select a cancellation policy"
          >
            <template #option="{ option }">
              <div class="flex flex-col py-1">
                <span class="font-medium">{{ option.name }}</span>
                <span class="text-sm text-gray-500">{{
                  option.description
                }}</span>
              </div>
            </template>
          </USelect>
        </UFormGroup>
      </div>
    </div>

    <div class="pt-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Additional Options (Optional)
        </h3>
        <UButton
          color="primary"
          variant="ghost"
          size="sm"
          icon="i-heroicons-plus"
          @click="addPricingOption"
        >
          Add Option
        </UButton>
      </div>

      <div
        v-if="pricingOptions.length === 0"
        class="text-center py-8 border border-dashed rounded-lg border-gray-200 dark:border-gray-700"
      >
        <UIcon
          name="i-heroicons-banknotes"
          class="mx-auto h-12 w-12 text-gray-400"
        />
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          No pricing options
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          You haven't added any additional pricing options yet.
        </p>
        <div class="mt-6">
          <UButton
            color="primary"
            variant="soft"
            size="sm"
            @click="addPricingOption"
          >
            Add pricing option
          </UButton>
        </div>
      </div>

      <div v-else class="space-y-4">
        <UCard
          v-for="(option, index) in pricingOptions"
          :key="index"
          class="relative"
        >
          <template #header>
            <div class="flex justify-between items-center">
              <h4 class="text-sm font-medium">
                {{ option.name || "New Option" }}
              </h4>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-trash"
                size="xs"
                @click="removePricingOption(index)"
              />
            </div>
          </template>

          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="Option Name" class="col-span-2">
              <UInput
                v-model="option.name"
                placeholder="e.g., Premium Package, Family Discount"
              />
            </UFormGroup>

            <UFormGroup label="Description" class="col-span-2">
              <UInput
                v-model="option.description"
                placeholder="What's included in this option"
              />
            </UFormGroup>

            <UFormGroup label="Price" class="col-span-1">
              <div class="flex">
                <USelect
                  v-model="option.currency"
                  :options="currencyOptions"
                  class="w-24 rounded-r-none"
                />
                <UInput
                  v-model="option.price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="flex-1 rounded-l-none"
                />
              </div>
            </UFormGroup>

            <UFormGroup label="Pricing Type" class="col-span-1">
              <URadio
                v-model="option.perPerson"
                :value="true"
                label="Per Person"
                class="mb-2"
              />
              <URadio
                v-model="option.perPerson"
                :value="false"
                label="Per Group"
              />
            </UFormGroup>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PricingOption, CancellationPolicy } from "~/types";

const experienceStore = useExperienceStore();
const { form } = storeToRefs(experienceStore);

// Pricing options
const pricingOptions = ref<PricingOption[]>([]);

function addPricingOption() {
  pricingOptions.value.push({
    name: "",
    description: "",
    price: 0,
    currency: form.value.currency || "USD",
    perPerson: true,
  });
}

function removePricingOption(index: number) {
  pricingOptions.value.splice(index, 1);
}

// Per person vs per group pricing
const pricingType = ref("per-person");

// Currency options
const currencyOptions = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  { label: "CAD", value: "CAD" },
  { label: "AUD", value: "AUD" },
  { label: "JPY", value: "JPY" },
];

// Cancellation policies
const cancellationPolicies: CancellationPolicy[] = [
  {
    id: "flexible",
    name: "Flexible",
    description: "Full refund up to 24 hours before the experience",
    refundPercentage: 100,
    cutoffHours: 24,
  },
  {
    id: "moderate",
    name: "Moderate",
    description: "Full refund up to 5 days before, 50% refund after",
    refundPercentage: 50,
    cutoffHours: 120,
  },
  {
    id: "strict",
    name: "Strict",
    description: "50% refund up to 7 days before, no refund after",
    refundPercentage: 50,
    cutoffHours: 168,
  },
  {
    id: "non-refundable",
    name: "Non-refundable",
    description: "No refunds once booked",
    refundPercentage: 0,
    cutoffHours: 0,
  },
];
</script>
