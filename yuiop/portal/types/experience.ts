export interface Experience {
    id: string
    title: string
    description: string
    language: string
    inclusions: string[]
    status: 'draft' | 'published' | 'archived'
    createdAt: string
    updatedAt: string
  }

  export interface ExperienceFormData {
    title: string
    description: string
    language: string
    inclusions: string[]
  }