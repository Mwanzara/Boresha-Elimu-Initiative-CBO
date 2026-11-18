import scholasticBooksImg from '../assets/images/program_scholastic_books_1794878429749.jpg';

export const ORGANIZATION_INFO = {
  name: 'Boresha Elimu Initiative CBO',
  shortName: 'Boresha Elimu',
  slogan: "First things first. Your business is life, not death. And life is urgent: Announce God's kingdom!",
  sloganRef: 'Luke 9:60',
  foundedYear: 2024,
  recognition: 'Registered CBO · Recognized by Community & Local Government',
  address: 'P.O. Box 5383-80200, Malindi, Kenya',
  region: 'Coastal Region, Kilifi County, Kenya',
  email: 'e.boreshacbo@gmail.com',
  phone: '+254 714 869 417',
  phoneHref: 'tel:+254714869417',
  emailHref: 'mailto:e.boreshacbo@gmail.com',
};

export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  caption: string;
  label: string;
}

export const HERO_SLIDE_INTERVAL_MS = 60_000;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'corridor-learners',
    src: '/assets/aistudio/IMG_9753_157aa6ab.JPG',
    alt: 'Sponsored learners in school uniform along a school corridor in Malindi, Kenya',
    caption: 'Sponsored learners at a partner school in Malindi supported through tuition and scholastic sponsorship.',
    label: 'Partner School Learners',
  },
  {
    id: 'school-feeding',
    src: '/assets/aistudio/IMG_9768_e7c17a51.JPG',
    alt: 'Boresha Elimu team serving warm rice pilau meals while learners eat together during the school feeding program in Malindi',
    caption: 'Daily school feeding in Malindi—serving warm, balanced meals so every child can focus in class.',
    label: 'School Feeding Program',
  },
  {
    id: 'community-gathering',
    src: '/assets/aistudio/IMG_9850_724a6107.JPG',
    alt: 'Large group of Malindi children, parents, and Boresha Elimu leaders gathered beneath the organization banner',
    caption: 'Children, parents, and community coordinators gathered together under the Boresha Elimu Initiative CBO banner.',
    label: 'Malindi Community Cohort',
  },
  {
    id: 'household-food-aid',
    src: '/assets/aistudio/IMG_9905_034ca47d.JPG',
    alt: 'Boresha Elimu team and Malindi guardians with children beside household dry-food parcels beneath the banner',
    caption: 'Household dry-food support parcels distributed to guardians and families across Malindi.',
    label: 'Household Food Support',
  },
  {
    id: 'beneficiary-followup',
    src: '/assets/aistudio/IMG_9608_4061e68f.JPG',
    alt: 'Parents, guardians, and learners gathered in a Malindi classroom during a beneficiary follow-up session',
    caption: 'Regular beneficiary follow-up sessions engaging mothers, guardians, and students in Malindi.',
    label: 'Beneficiary Follow-Ups',
  },
  {
    id: 'shared-community-meal',
    src: '/assets/aistudio/WhatsApp_Image_2026-04-16_at_11.03.43_AM_c40dbf6f.jpeg',
    alt: 'Mothers, guardians, and children sharing warm meals together inside a Malindi partner classroom',
    caption: 'Families and learners sharing nourished community meals together during outreach gatherings.',
    label: 'Community Meal Outreach',
  },
];

export const HERO_MEDIA = HERO_SLIDES[0];

export interface KpiStat {
  value: string;
  label: string;
  context: string;
}

export const HEADLINE_KPIS: KpiStat[] = [
  {
    value: '100+',
    label: 'Children Enrolled',
    context: 'Supported across a 2-year span (2024–2026)',
  },
  {
    value: 'Full & Partial',
    label: 'Sponsorship Model',
    context: 'Tailored tuition and material coverage per household need',
  },
  {
    value: '3 Core Pillars',
    label: 'Holistic Mandate',
    context: 'Quality education, good nutrition & proper housing',
  },
  {
    value: 'Our Programs',
    label: 'Coastal Operations',
    context: 'Tuition, school feeding, household food & interior transport',
  },
];

export interface RegistryEntry {
  term: string;
  detail: string;
  mono?: boolean;
}

export const REGISTRY_RECORDS: RegistryEntry[] = [
  {
    term: 'Official Entity',
    detail: 'Boresha Elimu Initiative CBO',
  },
  {
    term: 'Year Founded',
    detail: '2024',
    mono: true,
  },
  {
    term: 'Legal & Civic Standing',
    detail: 'Registered Community-Based Organization recognized by both community leadership and the local government',
  },
  {
    term: 'Local Postal Address',
    detail: '5383-80200 Malindi, Kenya (Coastal Region)',
    mono: true,
  },
  {
    term: 'Direct Email',
    detail: 'e.boreshacbo@gmail.com',
    mono: true,
  },
  {
    term: 'Telephone Contact',
    detail: '+254 714 869 417',
    mono: true,
  },
  {
    term: 'Beneficiary Reach',
    detail: 'Over 100 vulnerable and less privileged children enrolled across full and partial sponsorships within 2 years',
  },
];

export type ProgramFilter = 'all' | 'education' | 'nutrition' | 'assessment';

export interface PhaseOneProgram {
  id: Exclude<ProgramFilter, 'all'>;
  number: string;
  title: string;
  scopeLabel: string;
  statusLabel: string;
  summary: string;
  deliverables: string[];
  outcomeNote: string;
  imageSrc: string;
  imageAlt: string;
  figureLabel: string;
  secondaryPhotoSlot?: {
    title: string;
    caption: string;
    imageSrc?: string;
    imageAlt?: string;
  };
}

export const PHASE_ONE_PROGRAMS: PhaseOneProgram[] = [
  {
    id: 'education',
    number: '01',
    title: 'Tuition Fees & Scholastic Materials',
    scopeLabel: 'Full & Partial Sponsorships',
    statusLabel: 'Our Programs · Active',
    summary:
      'Removing financial barriers at the school gate by covering termly tuition fees—fully for our highest-need learners and partially where families can contribute a small share—paired with essential classroom supplies.',
    deliverables: [
      'Direct termly tuition disbursements to partner schools in Malindi',
      'Core scholastic kits: textbooks, exercise books, pens, pencils, and geometry sets',
      'School uniform support to ensure dignity and full classroom participation',
    ],
    outcomeNote: 'Sustained enrollment for 100+ learners with measurable improvements in end-of-term academic performance.',
    imageSrc: scholasticBooksImg,
    imageAlt: 'Primary school textbooks, exercise notebooks, pencils, and geometry tools on a wooden desk in Malindi',
    figureLabel: 'Fig. 2 — Core scholastic learning kits distributed at the start of each school term.',
  },
  {
    id: 'nutrition',
    number: '02',
    title: 'School Feeding & Household Food Support',
    scopeLabel: 'Daily Meals & Family Aid',
    statusLabel: 'Our Programs · Active',
    summary:
      'A hungry child cannot concentrate in class. Our school feeding initiative guarantees warm, balanced meals during the school day, complemented by partial household food parcels whenever CBO budget resources permit.',
    deliverables: [
      'Warm daily school lunches prepared with locally sourced grains, legumes, and coastal greens',
      'Targeted household dry-food assistance for vulnerable families during lean periods',
      'Coordination with school committees to monitor child health and energy levels',
    ],
    outcomeNote: 'Improved classroom attentiveness and higher consistent daily school attendance across sponsored cohorts.',
    imageSrc: '/assets/aistudio/IMG_9768_e7c17a51.JPG',
    imageAlt: 'Boresha Elimu team serving warm rice pilau meals while uniformed primary school learners eat together during the school feeding program in Malindi',
    figureLabel: 'School Feeding Program — Serving warm, nutritious meals to learners at our partner school in Malindi.',
    secondaryPhotoSlot: {
      title: 'Household Food Support',
      caption: 'Household Food Support — Dry-food parcels distributed to parents and guardians in Malindi.',
      imageSrc: '/assets/aistudio/IMG_9905_034ca47d.JPG',
      imageAlt: 'Boresha Elimu Initiative CBO team and Malindi guardians with children beside household dry-food parcels beneath the organization banner',
    },
  },
  {
    id: 'assessment',
    number: '03',
    title: 'Household Visits & Assessment',
    scopeLabel: 'Beneficiary Selection & Integrity',
    statusLabel: 'Our Programs · Active',
    summary:
      'Every enrollment begins with transparent beneficiary selection criteria. Our field officers conduct in-person household assessments together with trusted community representatives to verify family need, living conditions, and guardianship—ensuring sponsorships reach the most vulnerable children and eliminating any chances of corrupt activities.',
    deliverables: [
      'Joint household visits conducted by CBO field officers alongside village representatives',
      'Clear enrollment criteria assessing guardianship, household income, nutrition, and shelter conditions',
      'Community-verified vetting records to eliminate favoritism, ghost beneficiaries, or corrupt practices',
    ],
    outcomeNote: 'Accountable, need-based enrollment of 100+ vulnerable children trusted by families and local authorities.',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-04-16_at_9.05.49_AM__4__2300d028.jpeg',
    imageAlt: 'Boresha Elimu field officer sitting outside a Malindi home taking notes while interviewing children during a household assessment visit',
    figureLabel: 'Fig. 4 — Field officer conducting an in-person household assessment and documenting child needs in Malindi.',
  },
];

export interface EnrollmentCohort {
  period: string;
  fullSponsorship: number;
  partialSponsorship: number;
  totalChildren: number;
  milestone: string;
}

export const ENROLLMENT_TIMELINE: EnrollmentCohort[] = [
  {
    period: 'Term 1 · 2024',
    fullSponsorship: 12,
    partialSponsorship: 16,
    totalChildren: 28,
    milestone: 'Founding cohort launched in Malindi with initial tuition & scholastic kits',
  },
  {
    period: 'Term 2 · 2024',
    fullSponsorship: 21,
    partialSponsorship: 24,
    totalChildren: 45,
    milestone: 'School feeding program initiated alongside local government recognition',
  },
  {
    period: 'Term 3 · 2024',
    fullSponsorship: 28,
    partialSponsorship: 34,
    totalChildren: 62,
    milestone: 'Interior commuter transport pilot added for outlying villages',
  },
  {
    period: 'Term 1 · 2025',
    fullSponsorship: 36,
    partialSponsorship: 43,
    totalChildren: 79,
    milestone: 'Budget-contingent household food parcels extended to vulnerable homes',
  },
  {
    period: 'Term 2 · 2025',
    fullSponsorship: 44,
    partialSponsorship: 51,
    totalChildren: 95,
    milestone: 'Strong termly attendance gains recorded across partner schools',
  },
  {
    period: '2026 Active',
    fullSponsorship: 58,
    partialSponsorship: 67,
    totalChildren: 125,
    milestone: 'Reached 125 enrolled children within two years of founding',
  },
];

export interface OutcomeMetric {
  area: string;
  baseline: string;
  current: string;
  observation: string;
}

export const OUTCOME_METRICS: OutcomeMetric[] = [
  {
    area: 'Enrolled Learners',
    baseline: '28 children (Founding Term 2024)',
    current: '125 children (2026)',
    observation: 'Sustained 2-year growth balancing full sponsorships and partial family-assisted placements.',
  },
  {
    area: 'School Attendance',
    baseline: 'Frequent absences due to fees, hunger & walk distance',
    current: 'Consistent daily attendance',
    observation: 'School feeding and interior transport eliminated the top two non-academic causes of missed school days.',
  },
  {
    area: 'Academic Performance',
    baseline: 'Disrupted revision from lack of textbooks & supplies',
    current: 'Notable upward termly results',
    observation: 'Complete scholastic kits and steady attendance have produced visible gains in reading, mathematics, and exam readiness.',
  },
  {
    area: 'Household Stability',
    baseline: 'Acute food insecurity during off-peak coastal seasons',
    current: 'Targeted dry-food relief',
    observation: 'Partial household food support cushions vulnerable guardians whenever CBO budget capacity allows.',
  },
];

export interface CommunityPerspective {
  quote: string;
  author: string;
  role: string;
  context: string;
}

export const COMMUNITY_PERSPECTIVES: CommunityPerspective[] = [
  {
    quote:
      'Before tuition and daily school meals were organized for our interior pupils, absenteeism spiked every week before exams. Since Boresha Elimu stepped in with books, feeding, and transport help, these learners arrive on time and are posting some of our strongest term improvements.',
    author: 'Madam Doris',
    role: 'Teacher',
    context: 'Rural Partner School · Malindi',
  },
  {
    quote:
      'By the time I met Boresha Elimu Initiative CBO, my two daughters—aged 7 and 3—had not yet joined school. As a single mum struggling to make ends meet and barely surviving, I had no idea how or when my children would ever step into a classroom. Through their sponsorship, school feeding, and learning support, both of my girls are now enrolled and learning steadily.',
    author: 'Mama Hawa',
    role: 'Single Mum & Guardian',
    context: 'Maweni Village · Malindi',
  },
  {
    quote:
      'Because Boresha Elimu works openly with village representatives and local government offices, community trust is high. Every shilling goes visibly into fees, food, and keeping vulnerable children safely anchored in class.',
    author: 'Mrs. Bahati',
    role: 'Village Representative',
    context: 'Airport Village · Malindi',
  },
];

export const SPONSORSHIP_OPTIONS = [
  {
    id: 'full-sponsorship',
    title: 'Full Child Sponsorship',
    scope: 'Tuition fees, full scholastic kit, school feeding & transport where needed',
    suggestion: 'Supports one child completely for a full school term or academic year.',
  },
  {
    id: 'partial-sponsorship',
    title: 'Partial Tuition & Materials',
    scope: 'Co-funded term fees, textbooks, exercise books & school uniform support',
    suggestion: 'Pairs with guardian contributions to keep partially sponsored learners enrolled.',
  },
  {
    id: 'nutrition-food',
    title: 'School Feeding & Household Food',
    scope: 'Daily school meals and dry-food parcels for vulnerable households',
    suggestion: 'Directly strengthens daily nutrition and expands household food capacity.',
  },
  {
    id: 'interior-transport',
    title: 'Interior Transport Fund',
    scope: 'Safe daily school commutes for children living in Malindi interior villages',
    suggestion: 'Removes distance barriers and prevents weather-related absenteeism.',
  },
  {
    id: 'housing-shelter',
    title: 'Proper Housing & Safe Shelter',
    scope: 'Holistic shelter improvements for vulnerable families alongside education',
    suggestion: 'Advances our core mandate for safe, dignified housing.',
  },
];

export interface VillageNeedDistribution {
  village: string;
  educationalNeeds: number;
  nutritionalNeeds: number;
  shelterSupport: number;
  totalBeneficiaries: number;
  keyNeedsIdentified: string;
}

export const PDF_BENEFICIARY_DISTRIBUTION: VillageNeedDistribution[] = [
  {
    village: 'Maweni',
    educationalNeeds: 13,
    nutritionalNeeds: 13,
    shelterSupport: 3,
    totalBeneficiaries: 13,
    keyNeedsIdentified: 'Educational and food support',
  },
  {
    village: 'Ngala',
    educationalNeeds: 27,
    nutritionalNeeds: 17,
    shelterSupport: 5,
    totalBeneficiaries: 27,
    keyNeedsIdentified: 'Educational and food support',
  },
  {
    village: 'Takaye',
    educationalNeeds: 25,
    nutritionalNeeds: 10,
    shelterSupport: 2,
    totalBeneficiaries: 25,
    keyNeedsIdentified: 'School support, shelter and nutrition assistance',
  },
  {
    village: 'Kwachocha',
    educationalNeeds: 60,
    nutritionalNeeds: 25,
    shelterSupport: 10,
    totalBeneficiaries: 60,
    keyNeedsIdentified: 'Food support, school attendance, and shelter improvement',
  },
];

export interface VillageProgressionPoint {
  village: string;
  currentPopulation: number;
  projectedJune: number;
  endOfYearProjection: number;
}

export const PDF_POPULATION_PROGRESSION: VillageProgressionPoint[] = [
  {
    village: 'Maweni',
    currentPopulation: 13,
    projectedJune: 25,
    endOfYearProjection: 45,
  },
  {
    village: 'Kwachocha',
    currentPopulation: 60,
    projectedJune: 120,
    endOfYearProjection: 210,
  },
  {
    village: 'Ngala',
    currentPopulation: 27,
    projectedJune: 55,
    endOfYearProjection: 98,
  },
  {
    village: 'Takaye',
    currentPopulation: 25,
    projectedJune: 50,
    endOfYearProjection: 87,
  },
  {
    village: 'Ganda',
    currentPopulation: 0,
    projectedJune: 25,
    endOfYearProjection: 63,
  },
];

export type GalleryCategory = 'all' | 'community' | 'feeding' | 'learners';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  alt: string;
  category: Exclude<GalleryCategory, 'all'>;
}

export const GALLERY_ALBUM_META = {
  title: 'Boresha CBO Field Activities',
  subtitle: 'Boresha CBO field activities.',
  coverSrc: '/assets/aistudio/IMG_9850_724a6107.JPG',
  coverAlt:
    'Children, parents, and community leaders of Boresha Elimu Initiative CBO gathered together beneath the organization banner in Malindi',
  previewThumbs: [
    '/assets/aistudio/IMG_9768_e7c17a51.JPG',
    '/assets/aistudio/IMG_9905_034ca47d.JPG',
    '/assets/aistudio/IMG_9608_4061e68f.JPG',
  ],
};

export const GALLERY_FEATURE_VIDEO = {
  id: 'boreshaproject-film',
  src: '/assets/aistudio/BORESHA_INITIATIVE__1__5d2a3bd3.mp4',
  poster: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_10.10.53_PM_cd809dc5.jpeg',
  title: 'Boresha Elimu Initiative CBO — Full Project Breakdown',
  duration: '2:00',
  summary:
    'A voiceover-narrated field walkthrough guiding donors from household vulnerability assessments and safeguarding girls against early marriage to beneficiary enrollment, guardian forums, school feeding, and clothing and food distribution in Malindi.',
  chapters: [
    '01. Household Assessment',
    '02. Beneficiary Enrollment',
    '03. Food & Clothing Distribution',
    '04. Guardian Forums & Meals',
  ],
};

export const GALLERY_ALBUM_PHOTOS: GalleryPhoto[] = [
  {
    id: 'img-9893',
    src: '/assets/aistudio/IMG_9893_f86b7070.JPG',
    title: 'Inclusive Care Beyond Borders',
    caption: 'Leadership and sponsored girls standing together beneath the Boresha Elimu banner in Malindi.',
    alt: 'Boresha Elimu Initiative CBO representative standing with two sponsored schoolgirls from different backgrounds in front of the organization banner',
    category: 'community',
  },
  {
    id: 'img-9850',
    src: '/assets/aistudio/IMG_9850_724a6107.JPG',
    title: 'Malindi Cohort & Community Gathering',
    caption: 'Children, parents, and CBO coordinators gathered during a community outreach day.',
    alt: 'Large group of sponsored children, mothers, and Boresha Elimu leaders seated together in front of the organization banner',
    category: 'community',
  },
  {
    id: 'img-9852',
    src: '/assets/aistudio/IMG_9852_8b0b9c11.JPG',
    title: 'United Across Age Groups',
    caption: 'Early-years, primary, and older learners attending a joint Malindi activity session.',
    alt: 'Group of young children and older school learners seated together with a Boresha Elimu leader under the CBO banner',
    category: 'community',
  },
  {
    id: 'img-9863',
    src: '/assets/aistudio/IMG_9863_98866f0d.JPG',
    title: 'Senior Primary & Secondary Scholars',
    caption: 'Sponsored pupils and older learners gathered with leadership during term check-ins.',
    alt: 'Group of uniformed and casual-dressed older sponsored students seated and standing with a Boresha Elimu representative',
    category: 'learners',
  },
  {
    id: 'img-9870',
    src: '/assets/aistudio/IMG_9870_0065b6da.JPG',
    title: 'Peer Mentorship & Follow-Up Group',
    caption: 'Learners sharing a moment after mentorship and termly progress discussions.',
    alt: 'Smiling cohort of sponsored students standing and seated beside a Boresha Elimu team member',
    category: 'learners',
  },
  {
    id: 'img-9768',
    src: '/assets/aistudio/IMG_9768_e7c17a51.JPG',
    title: 'School Feeding Program',
    caption: 'Boresha Elimu team serving warm rice pilau meals to learners during the school day.',
    alt: 'Boresha Elimu team serving warm rice pilau meals while uniformed primary school learners eat together during the school feeding program',
    category: 'feeding',
  },
  {
    id: 'img-9751',
    src: '/assets/aistudio/IMG_9751_6b95f155.JPG',
    title: 'Nutritious Hot School Meal',
    caption: 'A freshly prepared plate of rice pilau with beef and potatoes served to keep children energized.',
    alt: 'Close-up of a child holding a green plate filled with warm rice pilau, beef, and potatoes',
    category: 'feeding',
  },
  {
    id: 'img-9758',
    src: '/assets/aistudio/IMG_9758_8c1b40e5.JPG',
    title: 'Veranda Meal Distribution',
    caption: 'Volunteers dishing out warm lunches to queuing students along the corridor.',
    alt: 'Boresha Elimu volunteers serving plates of warm rice pilau to children queuing along a shaded school veranda',
    category: 'feeding',
  },
  {
    id: 'img-9764',
    src: '/assets/aistudio/IMG_9764_6919a1be.JPG',
    title: 'Community Kitchen Teamwork',
    caption: 'Guardians and CBO members coordinating meal service for visiting families and pupils.',
    alt: 'Community volunteers and guardians gathered at the serving table dishing out warm meals during outreach',
    category: 'feeding',
  },
  {
    id: 'img-9905',
    src: '/assets/aistudio/IMG_9905_034ca47d.JPG',
    title: 'Household Food Support Parcels',
    caption: 'Dry-food bundles distributed to parents and guardians to strengthen home food security.',
    alt: 'Boresha Elimu team and Malindi guardians with children beside household dry-food parcels beneath the organization banner',
    category: 'feeding',
  },
  {
    id: 'img-9917',
    src: '/assets/aistudio/IMG_9917_e678fed5.JPG',
    title: 'Family Food Relief Handover',
    caption: 'Guardians receiving flour and pantry staples during a household relief distribution.',
    alt: 'Parents and a young girl holding packages of maize flour and household food supplies alongside a Boresha Elimu coordinator',
    category: 'feeding',
  },
  {
    id: 'img-9516',
    src: '/assets/aistudio/IMG_9516_1f133a05.JPG',
    title: 'Beneficiary Intake & Documentation',
    caption: 'Field officers and community elders recording guardian details and learner needs.',
    alt: 'Boresha Elimu field officers seated at a table registering children and speaking with a community elder',
    category: 'community',
  },
  {
    id: 'img-9569',
    src: '/assets/aistudio/IMG_9569_7a52ecfb.JPG',
    title: 'Classroom Guardian & Learner Assembly',
    caption: 'Parents, guardians, and children gathered inside a Malindi classroom for orientation.',
    alt: 'Children and parents seated in blue chairs inside a bright classroom beneath a blackboard during a CBO meeting',
    category: 'community',
  },
  {
    id: 'img-9599',
    src: '/assets/aistudio/IMG_9599_c8eb01eb.JPG',
    title: 'Youth & Children Listening Session',
    caption: 'Sponsored learners following closely during an interactive guidance talk.',
    alt: 'Primary and pre-primary learners seated attentively in rows during a Boresha Elimu follow-up gathering',
    category: 'learners',
  },
  {
    id: 'img-9603',
    src: '/assets/aistudio/IMG_9603_c8b5885d.JPG',
    title: 'Beneath Our Charter Banner',
    caption: 'Guardians and children seated beside the Luke 9:60 motto and learning posters.',
    alt: 'Guardians and children seated in front of the Boresha Elimu Initiative CBO banner and classroom wall charts',
    category: 'community',
  },
  {
    id: 'img-9604',
    src: '/assets/aistudio/IMG_9604_e9d4c054.JPG',
    title: 'Hospitality & Classroom Forum',
    caption: 'Volunteers distributing water as families participate in the community dialogue.',
    alt: 'Wider classroom view of guardians and children seated in blue chairs while a volunteer brings bottled water',
    category: 'community',
  },
  {
    id: 'img-9608',
    src: '/assets/aistudio/IMG_9608_4061e68f.JPG',
    title: 'Community Voices in Session',
    caption: 'Mothers, caregivers, and students engaging during a Malindi beneficiary forum.',
    alt: 'Rows of guardians with young children and sponsored learners attending a follow-up session in a Malindi classroom',
    category: 'community',
  },
  {
    id: 'img-9613',
    src: '/assets/aistudio/IMG_9613_170ef102.JPG',
    title: 'Guardian Dialogue & Feedback',
    caption: 'Open conversation with parents to assess school attendance and household welfare.',
    alt: 'Mothers and learners conversing attentively during an indoor Boresha Elimu community assembly',
    category: 'community',
  },
  {
    id: 'img-9636',
    src: '/assets/aistudio/IMG_9636_ac80224b.JPG',
    title: 'Beneficiary Follow-Up Gathering',
    caption: 'Termly check-in bringing families and learners together to track steady progress.',
    alt: 'Beneficiary learners, mothers, and guardians seated together during a Boresha Elimu follow-up forum beneath the banner',
    category: 'community',
  },
  {
    id: 'img-9753',
    src: '/assets/aistudio/IMG_9753_157aa6ab.JPG',
    title: 'School Corridor Activity Lineup',
    caption: 'Learners gathering along the school walkway during our partner-school visit.',
    alt: 'Sponsored learners standing and smiling along a Malindi school corridor',
    category: 'learners',
  },
  {
    id: 'img-9534',
    src: '/assets/aistudio/IMG_9534_626a8cbd.JPG',
    title: 'Sponsored Learner Portrait I',
    caption: 'Individual documentation portrait taken during enrollment and term follow-up.',
    alt: 'Portrait of a sponsored teenage student in a navy school tracksuit jacket against a neutral wall',
    category: 'learners',
  },
  {
    id: 'img-9580',
    src: '/assets/aistudio/IMG_9580_095b4949.JPG',
    title: 'Sponsored Learner Portrait II',
    caption: 'Serving vulnerable children across Malindi equitably regardless of race, religion, or culture.',
    alt: 'Portrait of a young girl enrolled through Boresha Elimu Initiative CBO wearing a white patterned hijab',
    category: 'learners',
  },
  {
    id: 'img-9591',
    src: '/assets/aistudio/IMG_9591_59af9d72.JPG',
    title: 'Sponsored Learner Portrait III',
    caption: 'Learner profile portrait recorded to maintain accurate sponsorship records.',
    alt: 'Portrait of a young sponsored boy wearing a navy fleece jacket against a concrete wall',
    category: 'learners',
  },
  {
    id: 'img-9887',
    src: '/assets/aistudio/IMG_9887_51b1b0cc.JPG',
    title: 'CBO Leadership & Coordination Team',
    caption: 'Co-coordinators standing beside the Vision and Mission banner during community day.',
    alt: 'Two Boresha Elimu Initiative CBO leaders standing on either side of the organization Vision and Mission banner',
    category: 'community',
  },
];

export interface TeamMember {
  order: string;
  id: string;
  roleTitle: string;
  division: string;
  mandate: string;
  imageSrc?: string;
  imageAlt: string;
  imagePositionClass?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    order: '01',
    id: 'cbo-president',
    roleTitle: 'CBO President',
    division: 'Executive Leadership',
    mandate:
      'Provides overarching organizational vision, governance stewardship, and community-government representation to uphold our founding mandate in Malindi.',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_9.20.24_PM_0b491601.jpeg',
    imageAlt: 'Studio portrait of the CBO President of Boresha Elimu Initiative CBO in a grey plaid suit and burgundy patterned tie',
    imagePositionClass: 'object-[50%_12%]',
  },
  {
    order: '02',
    id: 'vice-president',
    roleTitle: 'Vice President',
    division: 'Executive Leadership',
    mandate:
      'Supports executive leadership, strengthens partner school and village committee collaboration, and oversees strategic program reviews.',
    imageSrc: '/assets/aistudio/IMG_9661__1__2ed93150.jpg',
    imageAlt: 'Portrait of the Vice President of Boresha Elimu Initiative CBO wearing a pink blazer and patterned navy dress',
    imagePositionClass: 'object-top',
  },
  {
    order: '03',
    id: 'director',
    roleTitle: 'Director',
    division: 'Executive Leadership',
    mandate:
      'Directs program strategy, donor accountability, and coordinated execution across tuition support, school feeding, household outreach, and shelter advocacy.',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_9.20.23_PM_f81a09eb.jpeg',
    imageAlt: 'Studio portrait of the Director of Boresha Elimu Initiative CBO wearing glasses and a black-and-white polka-dot dress',
    imagePositionClass: 'object-[50%_18%]',
  },
  {
    order: '04',
    id: 'cbo-administrator',
    roleTitle: 'CBO Administrator',
    division: 'Administration & Compliance',
    mandate:
      'Coordinates beneficiary documentation, transparent termly fee disbursements, procurement records, and daily administrative operations.',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_9.51.26_PM_6bd19954.jpeg',
    imageAlt: 'Portrait of the CBO Administrator of Boresha Elimu Initiative CBO smiling in a patterned collared shirt',
    imagePositionClass: 'object-[62%_50%] scale-[1.32] origin-[50%_10%]',
  },
  {
    order: '05',
    id: 'implementation-team',
    roleTitle: 'Implementation Team',
    division: 'Vision Implementors & Field Operations',
    mandate:
      'Dedicated field officers, school feeding coordinators, and community volunteers carrying out household assessments, meal service, food parcel distribution, and termly beneficiary follow-ups across Malindi.',
    imageSrc: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_10.16.40_PM_ca775a28.jpeg',
    imageAlt: 'Boresha Elimu Initiative CBO Implementation Team gathered around a classroom table in Malindi for program planning',
    imagePositionClass: 'object-top scale-[1.16] origin-top',
  },
];

export const DONATION_PAYMENT_DETAILS = {
  accountName: 'Boresha Elimu Initiative CBO',
  paybillNumber: '522533',
  accountNumber: '9799970',
  branchLocation: 'Malindi, Kilifi County, Kenya',
  postalAddress: 'P.O. Box 5383-80200, Malindi, Kenya',
  treasuryPhone: '+254 714 869 417',
  treasuryPhoneHref: 'tel:+254714869417',
  treasuryEmail: 'e.boreshacbo@gmail.com',
  treasuryEmailHref:
    'mailto:e.boreshacbo@gmail.com?subject=Banking%20%26%20Donation%20Verification%20%E2%80%94%20Boresha%20Elimu%20Initiative%20CBO',
  supportedCurrencies: 'KES · USD · M-Pesa Paybill & Partner Grants',
  bankVerificationNote:
    'Direct M-Pesa / Bank Paybill transfers use Paybill 522533 and Account Number 9799970. For international wire (SWIFT/BIC) coordinates or an official CBO receipt, contact our Malindi Treasury Desk via phone or email.',
  allocationAreas: [
    'Termly School Tuition & Exam Fees',
    'Scholastic Kits & School Uniforms',
    'Daily School Feeding Meals',
    'Household Dry-Food Relief & Shelter Advocacy',
  ],
};



