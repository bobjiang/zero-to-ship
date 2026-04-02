export type WeeklyImpact = 'high' | 'medium' | 'low';

export type WeeklySectionId =
  | 'product-updates'
  | 'developer-tools'
  | 'community-learning'
  | 'research-safety'
  | 'whats-coming';

export interface WeeklyItem {
  title: string;
  summary: string;
  url: string;
  impact: WeeklyImpact;
  tags: string[];
}

export interface WeeklySection {
  id: WeeklySectionId;
  title: string;
  items: WeeklyItem[];
}

export interface WeeklyDigest {
  week: string;
  startDate: string;
  endDate: string;
  summary: string;
  sections: WeeklySection[];
}
