export interface Lesson {
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  transcript?: string;
  order: number;
}

export interface Series {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: Lesson[];
  order: number;
}
