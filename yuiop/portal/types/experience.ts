export interface Experience {
  id: string;
  title: string;
  description: string;
  language: string;
  inclusions: string[];
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceFormData {
  title: string;
  description: string;
  language: string;
  inclusions: string[];
}

export interface ExperienceType {
  name: string;
  value: "one-time" | "recurring" | "on-demand";
  description: string;
}

export interface ExperienceCategory {
  name: string;
  value: string;
}
