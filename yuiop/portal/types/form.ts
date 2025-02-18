import type { ExperienceType } from ".";

export interface Step {
  id: number;
  name: string;
  status: "current" | "upcoming" | "completed";
}

export interface NewExperienceForm {
  title: string;
  description: string;
  category: string | undefined; // Changed from null to undefined
  type: ExperienceType["value"] | undefined; // Changed from null to undefined
  language: string | undefined; // Changed from null to undefined
}
