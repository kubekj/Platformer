import type {
  ExperienceFormData,
  ExperienceCategory,
  ExperienceType,
  NewExperienceForm,
} from "~/types";

// Using defineStore from Pinia (auto-imported by the Nuxt Pinia module)
export const useExperienceStore = defineStore("experience", () => {
  // Form state with proper typing
  const form = reactive<NewExperienceForm>({
    title: "",
    description: "",
    category: undefined,
    type: undefined,
    language: undefined,
    // Extended form fields for additional steps
    inclusions: [],
    exclusions: [],
    location: undefined,
    duration: undefined,
    maxParticipants: undefined,
    minParticipants: undefined,
    // Schedule
    scheduleType: undefined, // 'fixed', 'recurring', 'flexible'
    startDate: undefined,
    endDate: undefined,
    recurringDays: [],
    // Pricing
    price: undefined,
    currency: "USD",
    cancellationPolicy: undefined,
    // Media
    featuredImage: undefined,
    galleryImages: [],
  });

  // Current active step
  const currentStep = ref(1);
  const totalSteps = 4;

  // Navigation
  function nextStep() {
    if (currentStep.value < totalSteps) {
      currentStep.value++;
    }
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  }

  function goToStep(step: number) {
    if (step >= 1 && step <= totalSteps) {
      currentStep.value = step;
    }
  }

  // Step validation status
  const stepValidation = reactive({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });

  // Update validation status when form changes
  watch(
    () => ({
      title: form.title,
      description: form.description,
      category: form.category,
      type: form.type,
      language: form.language,
    }),
    () => {
      // Basic validation for step 1
      stepValidation.step1 = Boolean(
        form.title &&
          form.description &&
          form.category &&
          form.type &&
          form.language
      );
    },
    { deep: true }
  );

  // Mock submission - in a real app this would interact with an API
  async function submitExperience() {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, return a mock response
      return {
        id: "exp-" + Date.now(),
        ...form,
        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error submitting experience:", error);
      throw error;
    }
  }

  return {
    form,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    stepValidation,
    submitExperience,
  };
});
