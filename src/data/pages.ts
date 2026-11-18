export type PageId =
  | 'cover'
  | 'mission'
  | 'team'
  | 'programs'
  | 'urgency'
  | 'distribution'
  | 'impact'
  | 'gallery'
  | 'support';

export interface SitePageMeta {
  id: PageId;
  shortLabel: string;
  title: string;
}

export const SITE_PAGES: SitePageMeta[] = [
  {
    id: 'cover',
    shortLabel: 'Cover',
    title: 'Cover Page · Our Holistic Approach',
  },
  {
    id: 'mission',
    shortLabel: 'Who We Are',
    title: 'Who We Are · Founding Mandate',
  },
  {
    id: 'team',
    shortLabel: 'Our Team',
    title: 'Our Team · Leadership & Vision Implementors',
  },
  {
    id: 'programs',
    shortLabel: 'Our Programs',
    title: 'Our Programs · Education, Feeding & Assessments',
  },
  {
    id: 'urgency',
    shortLabel: 'Urgency',
    title: 'Urgency · Shelter & Beneficiary Follow-Ups',
  },
  {
    id: 'distribution',
    shortLabel: 'Beneficiary Distribution',
    title: 'Beneficiary Distribution · Malindi Cohort Breakdown',
  },
  {
    id: 'impact',
    shortLabel: 'Impact',
    title: 'Two-Year Impact & Testimonials',
  },
  {
    id: 'gallery',
    shortLabel: 'Gallery',
    title: 'Activity Gallery · Malindi Photo Album',
  },
  {
    id: 'support',
    shortLabel: 'Support',
    title: 'Support & Direct Contact',
  },
];

export const AUTO_ADVANCE_INTERVAL_MS = 25000;
