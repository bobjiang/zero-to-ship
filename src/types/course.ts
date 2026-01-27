export interface Video {
  title: string;
  description: string;
  youtubeId: string;
  maxLength?: string;
  estimatedDuration?: string;
  scriptOutline?: string[];
  talkingPoints?: string[];
}

export interface TextSection {
  title: string;
  content: string;
}

export interface CommonMistake {
  mistake: string;
  explanation: string;
}

export interface Exercise {
  title: string;
  description: string;
  output: string;
  successCriteria: string[] | string;
  estimatedTime: string;
}

export interface Resource {
  title: string;
  url: string;
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  duration: string;
  order: number;
  // Legacy single video support
  youtubeId?: string;
  transcript?: string;
  // Extended curriculum support
  learningObjectives?: string[];
  videos?: Video[];
  textSections?: TextSection[];
  commonMistakes?: CommonMistake[];
  reflectionQuestions?: string[];
  exercises?: Exercise[];
  resources?: Resource[];
  instructorNotes?: string[];
}

export interface Series {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: Lesson[];
  order: number;
}
