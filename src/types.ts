export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type SkillCategory = 'Coding' | 'CAD & Fabrication' | 'Simulation & Analysis' | 'Soft Skills';

export type ToolIconId =
  | 'python'
  | 'cpp'
  | 'typescript'
  | 'latex'
  | 'solidworks'
  | 'fusion'
  | 'cnc'
  | 'pytorch'
  | 'matlab'
  | 'astropy'
  | 'excel'
  | 'leadership'
  | 'mentoring';

export type FlagCode = 'ge' | 'gb' | 'ru' | 'tr';

export type CompanyLogoId = 'cyber-infinity' | 'bog' | 'gita';

export interface SkillEntry {
  name: string;
  icon: ToolIconId;
  category: SkillCategory;
  level: SkillLevel;
  evidence: string;
}

export interface SpokenLanguageEntry {
  language: string;
  flag: FlagCode;
  level: string;
  evidence: string;
}

export interface ExperienceEntry {
  id: string;
  logo: CompanyLogoId;
  role: string;
  company: string;
  dates: string;
  location: string;
  summary: string;
  bullets: string[];
  tools: string[];
  growth: string;
}

export interface ProjectMediaItem {
  id: string;
  title: string;
  caption: string;
  src: string;
  badge: string;
  surface?: 'dark' | 'light';
}

export interface FourBoxContent {
  problem: { headline: string; points: string[] };
  approach: { headline: string; points: string[] };
  result: { headline: string; points: string[] };
  learnt: { headline: string; points: string[] };
}

export interface LostMarksCallout {
  title: string;
  points: string[];
}

export interface ProjectPageData {
  pageNumber: string;
  sectionCode: string;
  title: string;
  date: string;
  roleLabel: string;
  metricsStrip: { label: string; value: string }[];
  boxes: FourBoxContent;
  lostMarks?: LostMarksCallout;
  media: ProjectMediaItem[];
  repoUrl?: string;
  repoLabel?: string;
}

export interface LearningEntry {
  id: string;
  title: string;
  provider: string;
  date: string;
  format: 'In-Person Cohort' | 'In-Person Hardware Team' | 'In-Person Judging & Mentoring' | 'In-Person University & Research';
  keyTask: string;
  constraint: string;
  tools: string;
  output: string;
}

export interface LightboxAsset {
  title: string;
  caption: string;
  src: string;
}
