export interface Ship {
  slug: string;
  title: string;
  builder: string;
  description: string;
  content?: string;
  date: string;
  cohort?: string;
  tags: string[];
  screenshot?: string;
  demoUrl?: string;
  repoUrl?: string;
}
