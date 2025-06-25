// src/lib/types.ts

export interface QuestionOption {
  id: number;
  text: string;
}

export interface SurveyQuestion {
  id: number;
  question_text: string;
  question_type: 'TEXT' | 'TEXTAREA' | 'BOOLEAN' | 'NUMBER' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  is_required: boolean;
  options?: QuestionOption[];
}

export interface Problematica {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  status: string;
  allow_forum: boolean;
  show_results: boolean;
  created_at: string;
  end_date?: string | null;
  image_url?: string;
}