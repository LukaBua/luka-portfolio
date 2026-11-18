export interface TelemetryBullet {
  label: string;
  detail: string;
}

export interface MetricBadge {
  text: string;
  variant?: 'cyan' | 'amber';
}

export interface ProjectItem {
  id: string;
  sysTag: string;
  coordTag: string;
  title: string;
  subtitle: string;
  metricBadges: MetricBadge[];
  tags: string[];
  telemetryBullets: TelemetryBullet[];
  accent?: 'cyan' | 'amber';
}

export interface CourseItem {
  code: string;
  title: string;
  domain: string;
  highlight?: boolean;
}

export interface SpokenLanguageItem {
  language: string;
  level: string;
  note: string;
}

export interface BenchmarkFigure {
  id: string;
  sysTag: string;
  coordTag: string;
  captionHeader: string;
  subtitle: string;
  src: string;
  metrics: string[];
}
