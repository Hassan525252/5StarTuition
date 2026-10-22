export type Tutor = {
  id: number;
  name: string;
  initials: string;
  title: string;
  subjects: string[];
  levels: string[];
  experience: string;
  qualified: boolean;
  rating: number;
  reviews: number;
  availability: string;
  bio: string;
  qualifications?: string;
  location?: string;
  photo?: string;
};

export const navGroups = {
  tuition: [
    ['Primary', 'Years 3–6 personalised tuition'],
    ['Secondary', 'Years 7–9 subject support'],
    ['GCSE / IGCSE', 'Years 10–11 exam preparation'],
    ['A-Level / IB', 'Years 12–13 advanced study'],
    ['All Subjects', 'Browse our subject directory'],
    ['Curricula', 'UK and international curricula'],
  ],
  exams: [
    ['7+ / 8+ / 11+ / 13+', 'School entrance preparation'],
    ['ISEB / Common Entrance', 'Independent-school admissions'],
    ['UCAT / LNAT / TMUA', 'University admissions tests'],
    ['SAT / ACT / AP', 'US admissions and exams'],
    ['IELTS / TOEFL / PTE', 'English-language tests'],
    ['Oxbridge / Medicine', 'Interviews, MMI and applications'],
  ],
};

export const subjects = [
  'Mathematics','English','Biology','Chemistry','Physics','Computer Science',
  'Business','Economics','Psychology','History','Geography','Languages',
  'Sociology','Accounting','Politics','Law','Media Studies','Further Mathematics'
];

export const tutors: Tutor[] = [
  {
    id: 1, name: 'Mr. James Whitmore', initials: 'JW', title: 'GCSE & A-Level Mathematics',
    subjects: ['Mathematics', 'Further Mathematics'], levels: ['GCSE', 'A-Level'],
    experience: '8+ Years Teaching Experience', qualified: true, rating: 4.9, reviews: 48,
    availability: 'Tue & Thu evenings',
    qualifications: 'PGCE · BSc Mathematics · MA Education',
    location: 'London, United Kingdom',
    photo: '/images/james-whitmore.webp',
    bio: 'Clear, structured teaching with a strong focus on confidence, exam technique and ambitious grades.'
  },
  {
    id: 2, name: 'Daniel Foster', initials: 'DF', title: 'Science Specialist',
    subjects: ['Biology', 'Chemistry', 'Physics'], levels: ['KS3', 'GCSE', 'A-Level'],
    experience: '9+ years teaching experience', qualified: true, rating: 5.0, reviews: 61,
    availability: 'Tue, Thu, Sat',
    qualifications: 'PGCE Science · BSc Biomedical Sciences',
    location: 'Manchester, United Kingdom',
    bio: 'Makes difficult scientific ideas accessible and develops strong problem-solving habits.'
  },
  {
    id: 3, name: 'Mariam Ali', initials: 'MA', title: 'English & Admissions Tutor',
    subjects: ['English', '11+', 'UCAS'], levels: ['KS2', 'KS3', 'GCSE'],
    experience: '6+ years tutoring experience', qualified: true, rating: 4.9, reviews: 39,
    availability: 'Mon–Fri afternoons',
    qualifications: 'PGCE English · BA English Literature',
    location: 'Birmingham, United Kingdom',
    bio: 'Supportive, precise and highly experienced in writing, comprehension and entrance preparation.'
  },
  {
    id: 4, name: 'Omar Rahman', initials: 'OR', title: 'Computer Science Tutor',
    subjects: ['Computer Science', 'Python', 'AI & Digital Skills'], levels: ['KS3', 'GCSE', 'A-Level'],
    experience: '5+ years teaching & industry experience', qualified: true, rating: 4.8, reviews: 27,
    availability: 'Wed, Fri, Sun',
    qualifications: 'PGCE Computing · BSc Computer Science',
    location: 'Leeds, United Kingdom',
    bio: 'Combines curriculum knowledge with practical coding and real-world digital skills.'
  }
];

export const pricing = [
  ['Years 3–6', '£35/hr'],
  ['Years 7–9', '£40/hr'],
  ['GCSE / IGCSE', '£45/hr'],
  ['A-Level / Years 12–13', '£50/hr'],
  ['External prep — Under 16', '£38/hr'],
  ['External prep — 16+', '£48/hr'],
];

export const reviews = [
  {
    quote: 'The matching process felt personal and organised. My daughter became much more confident within a few weeks.',
    name: 'Parent of Year 10 student', meta: 'GCSE Mathematics'
  },
  {
    quote: 'Clear communication, a very professional tutor and a noticeable improvement in exam technique.',
    name: 'Parent of Year 12 student', meta: 'A-Level Chemistry'
  },
  {
    quote: 'The free trial made it easy to see whether the tutor was the right fit before committing.',
    name: 'Parent of Year 6 student', meta: '11+ Preparation'
  }
];

export const dashboardStats = [
  ['Active students', '157'],
  ['Active tutors', '42'],
  ['Lessons this week', '286'],
  ['Monthly revenue', '£24,810'],
];
