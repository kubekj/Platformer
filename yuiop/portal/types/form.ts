import { ExperienceType } from ".";

export interface Step {
  id: number;
  name: string;
  status: "current" | "upcoming" | "completed";
}

export interface NewExperienceForm {
  // Step 1: Basic Information
  title: string;
  description: string;
  category: string | undefined;
  type: ExperienceType["value"] | undefined;
  language: string | undefined;

  // Step 2: Details & Schedule
  inclusions?: string[];
  exclusions?: string[];
  location?: string;
  duration?: number;
  maxParticipants?: number;
  minParticipants?: number;
  scheduleType?: "fixed" | "recurring" | "flexible";
  startDate?: string;
  endDate?: string;
  recurringDays?: string[];

  // Step 3: Pricing
  price?: number;
  currency?: string;
  cancellationPolicy?: string;

  // Step 4: Media
  featuredImage?: string;
  galleryImages?: string[];
}

export interface PricingOption {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  currency: string;
  perPerson: boolean;
}

export interface CancellationPolicy {
  id: string;
  name: string;
  description: string;
  refundPercentage: number;
  cutoffHours: number;
}
