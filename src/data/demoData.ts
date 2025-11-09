export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  phone: string;
  rating: number;
  points: number;
  badges: string[];
  booksPosted: number;
  booksExchanged: number;
  booksDonated: number;
  bio: string;
  avatar: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  language: string;
  condition: string;
  ownerId: string;
  location: string;
  distanceKm: number;
  status: 'available' | 'under_claim' | 'donated' | 'exchanged' | 'deleted';
  image: string;
  description: string;
  postedDate: string;
}

export interface Receiver {
  id: string;
  orgName: string;
  orgType: 'orphanage' | 'school' | 'library' | 'ngo';
  address: string;
  contact: string;
  email: string;
  registrationDoc: string;
  verified: boolean;
  verificationStatus: 'not_submitted' | 'pending' | 'verified' | 'rejected';
  pickupAvailable: boolean;
  needs: string[];
  receivedCount: number;
  thankMessages: { donorId: string; donorName: string; msg: string; date: string }[];
  lat: number;
  lng: number;
}

export interface Request {
  id: string;
  bookId: string;
  requesterId: string;
  ownerId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  date: string;
  messages: { from: string; text: string; timestamp: string }[];
}

export interface Donation {
  id: string;
  donorId: string;
  receiverId: string;
  bookId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  pickupRequested: boolean;
  pickupScheduled: boolean;
  pickupDetails?: string;
  date: string;
}

export interface Complaint {
  id: string;
  fromUserId: string;
  targetId: string;
  targetType: 'user' | 'receiver' | 'book';
  category: string;
  description: string;
  status: 'open' | 'resolved' | 'escalated';
  date: string;
}

export interface AdminLog {
  id: string;
  action: string;
  targetId: string;
  details: string;
  date: string;
}

export const demoUsers: User[] = [
  {
    id: 'user01',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    city: 'Mumbai',
    phone: '9876543210',
    rating: 4.8,
    points: 150,
    badges: ['First Donor', 'Exchanger'],
    booksPosted: 5,
    booksExchanged: 3,
    booksDonated: 2,
    bio: 'Book lover, always happy to share knowledge',
    avatar: '👩'
  },
  {
    id: 'user02',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    city: 'Delhi',
    phone: '9876543211',
    rating: 4.5,
    points: 120,
    badges: ['First Donor'],
    booksPosted: 3,
    booksExchanged: 2,
    booksDonated: 1,
    bio: 'Engineering student sharing textbooks',
    avatar: '👨'
  },
  {
    id: 'user03',
    name: 'Ananya Desai',
    email: 'ananya@example.com',
    city: 'Bangalore',
    phone: '9876543212',
    rating: 4.9,
    points: 200,
    badges: ['Top Donor', 'Exchanger', 'First Donor'],
    booksPosted: 8,
    booksExchanged: 4,
    booksDonated: 6,
    bio: 'Supporting education through book donations',
    avatar: '👩‍🦰'
  },
  {
    id: 'user04',
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
    city: 'Pune',
    phone: '9876543213',
    rating: 4.6,
    points: 80,
    badges: [],
    booksPosted: 2,
    booksExchanged: 1,
    booksDonated: 0,
    bio: 'Medical student looking to exchange books',
    avatar: '👨‍⚕️'
  },
  {
    id: 'user05',
    name: 'Sneha Patel',
    email: 'sneha@example.com',
    city: 'Ahmedabad',
    phone: '9876543214',
    rating: 4.7,
    points: 110,
    badges: ['First Donor'],
    booksPosted: 4,
    booksExchanged: 2,
    booksDonated: 2,
    bio: 'Avid reader and book collector',
    avatar: '👩‍💼'
  },
  {
    id: 'user06',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    city: 'Jaipur',
    phone: '9876543215',
    rating: 4.4,
    points: 60,
    badges: [],
    booksPosted: 3,
    booksExchanged: 1,
    booksDonated: 1,
    bio: 'History enthusiast',
    avatar: '👨‍🎓'
  },
  {
    id: 'user07',
    name: 'Meera Iyer',
    email: 'meera@example.com',
    city: 'Chennai',
    phone: '9876543216',
    rating: 4.9,
    points: 180,
    badges: ['Top Donor', 'First Donor'],
    booksPosted: 6,
    booksExchanged: 3,
    booksDonated: 5,
    bio: 'Teacher sharing educational resources',
    avatar: '👩‍🏫'
  },
  {
    id: 'user08',
    name: 'Karan Verma',
    email: 'karan@example.com',
    city: 'Kolkata',
    phone: '9876543217',
    rating: 4.3,
    points: 40,
    badges: [],
    booksPosted: 2,
    booksExchanged: 0,
    booksDonated: 1,
    bio: 'New to book exchange',
    avatar: '👨‍💻'
  },
  {
    id: 'user09',
    name: 'Divya Nair',
    email: 'divya@example.com',
    city: 'Kochi',
    phone: '9876543218',
    rating: 4.8,
    points: 140,
    badges: ['Exchanger', 'First Donor'],
    booksPosted: 5,
    booksExchanged: 4,
    booksDonated: 2,
    bio: 'Literature lover',
    avatar: '👩‍🔬'
  },
  {
    id: 'user10',
    name: 'Rohan Gupta',
    email: 'rohan@example.com',
    city: 'Hyderabad',
    phone: '9876543219',
    rating: 4.5,
    points: 90,
    badges: ['First Donor'],
    booksPosted: 4,
    booksExchanged: 2,
    booksDonated: 1,
    bio: 'Competitive exam preparation books',
    avatar: '👨‍🔬'
  }
];

export const demoBooks: Book[] = [
  {
    id: 'book01',
    title: 'Physics Essentials',
    author: 'A. K. Singh',
    category: 'Higher Education',
    language: 'English',
    condition: 'Good',
    ownerId: 'user03',
    location: 'MG Road, Bangalore',
    distanceKm: 2.3,
    status: 'available',
    image: '/images/book01.jpg',
    description: 'Complete physics textbook for undergraduate students',
    postedDate: '2025-01-05'
  },
  {
    id: 'book02',
    title: 'Advanced Mathematics',
    author: 'R. D. Sharma',
    category: 'Higher Education',
    language: 'English',
    condition: 'Excellent',
    ownerId: 'user01',
    location: 'Andheri, Mumbai',
    distanceKm: 1.5,
    status: 'available',
    image: '/images/book02.jpg',
    description: 'Mathematics reference book with solved examples',
    postedDate: '2025-01-08'
  },
  {
    id: 'book03',
    title: 'Harry Potter Series',
    author: 'J.K. Rowling',
    category: 'Story Books',
    language: 'English',
    condition: 'Good',
    ownerId: 'user05',
    location: 'Satellite, Ahmedabad',
    distanceKm: 3.7,
    status: 'available',
    image: '/images/book03.jpg',
    description: 'Complete set of Harry Potter books',
    postedDate: '2025-01-10'
  },
  {
    id: 'book04',
    title: 'NCERT Science Class 10',
    author: 'NCERT',
    category: 'School Textbooks',
    language: 'English',
    condition: 'Fair',
    ownerId: 'user07',
    location: 'T Nagar, Chennai',
    distanceKm: 4.2,
    status: 'available',
    image: '/images/book04.jpg',
    description: 'Standard science textbook for class 10',
    postedDate: '2025-01-12'
  },
  {
    id: 'book05',
    title: 'IIT-JEE Physics',
    author: 'H.C. Verma',
    category: 'Competitive Exams',
    language: 'English',
    condition: 'Excellent',
    ownerId: 'user10',
    location: 'Banjara Hills, Hyderabad',
    distanceKm: 0.8,
    status: 'available',
    image: '/images/book05.jpg',
    description: 'Must-have for JEE preparation',
    postedDate: '2025-01-15'
  },
  {
    id: 'book06',
    title: 'Panchatantra Tales',
    author: 'Vishnu Sharma',
    category: 'Story Books',
    language: 'Hindi',
    condition: 'Good',
    ownerId: 'user06',
    location: 'Malviya Nagar, Jaipur',
    distanceKm: 2.1,
    status: 'available',
    image: '/images/book06.jpg',
    description: 'Classic Indian tales for children',
    postedDate: '2025-01-18'
  },
  {
    id: 'book07',
    title: 'Organic Chemistry',
    author: 'Morrison & Boyd',
    category: 'Higher Education',
    language: 'English',
    condition: 'Good',
    ownerId: 'user04',
    location: 'Kothrud, Pune',
    distanceKm: 1.9,
    status: 'under_claim',
    image: '/images/book07.jpg',
    description: 'Comprehensive organic chemistry textbook',
    postedDate: '2025-01-20'
  },
  {
    id: 'book08',
    title: 'Regional History of Kerala',
    author: 'K. M. Mathew',
    category: 'Regional Literature',
    language: 'Malayalam',
    condition: 'Excellent',
    ownerId: 'user09',
    location: 'Kakkanad, Kochi',
    distanceKm: 3.4,
    status: 'available',
    image: '/images/book08.jpg',
    description: 'Detailed history of Kerala',
    postedDate: '2025-01-22'
  },
  {
    id: 'book09',
    title: 'English Grammar',
    author: 'Wren & Martin',
    category: 'School Textbooks',
    language: 'English',
    condition: 'Fair',
    ownerId: 'user02',
    location: 'Connaught Place, Delhi',
    distanceKm: 2.8,
    status: 'available',
    image: '/images/book09.jpg',
    description: 'Classic English grammar book',
    postedDate: '2025-01-25'
  },
  {
    id: 'book10',
    title: 'CAT Quantitative Aptitude',
    author: 'Arun Sharma',
    category: 'Competitive Exams',
    language: 'English',
    condition: 'Good',
    ownerId: 'user03',
    location: 'Indiranagar, Bangalore',
    distanceKm: 1.2,
    status: 'available',
    image: '/images/book10.jpg',
    description: 'CAT exam preparation material',
    postedDate: '2025-01-28'
  },
  {
    id: 'book11',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Story Books',
    language: 'English',
    condition: 'Excellent',
    ownerId: 'user01',
    location: 'Bandra, Mumbai',
    distanceKm: 0.5,
    status: 'available',
    image: '/images/book11.jpg',
    description: 'Inspirational fiction novel',
    postedDate: '2025-02-01'
  },
  {
    id: 'book12',
    title: 'Computer Science Basics',
    author: 'E. Balagurusamy',
    category: 'Higher Education',
    language: 'English',
    condition: 'Good',
    ownerId: 'user08',
    location: 'Salt Lake, Kolkata',
    distanceKm: 4.5,
    status: 'available',
    image: '/images/book12.jpg',
    description: 'Introduction to computer programming',
    postedDate: '2025-02-03'
  },
  {
    id: 'book13',
    title: 'NCERT Mathematics Class 12',
    author: 'NCERT',
    category: 'School Textbooks',
    language: 'English',
    condition: 'Fair',
    ownerId: 'user07',
    location: 'Velachery, Chennai',
    distanceKm: 3.1,
    status: 'available',
    image: '/images/book13.jpg',
    description: 'Standard mathematics textbook',
    postedDate: '2025-02-05'
  },
  {
    id: 'book14',
    title: 'Indian Economy',
    author: 'Ramesh Singh',
    category: 'Competitive Exams',
    language: 'English',
    condition: 'Excellent',
    ownerId: 'user02',
    location: 'Rajouri Garden, Delhi',
    distanceKm: 2.6,
    status: 'available',
    image: '/images/book14.jpg',
    description: 'For UPSC and other competitive exams',
    postedDate: '2025-02-07'
  },
  {
    id: 'book15',
    title: 'Sherlock Holmes Collection',
    author: 'Arthur Conan Doyle',
    category: 'Story Books',
    language: 'English',
    condition: 'Good',
    ownerId: 'user05',
    location: 'Navrangpura, Ahmedabad',
    distanceKm: 1.7,
    status: 'available',
    image: '/images/book15.jpg',
    description: 'Complete detective stories collection',
    postedDate: '2025-02-09'
  }
];

export const demoReceivers: Receiver[] = [
  {
    id: 'recv01',
    orgName: 'Little Stars Orphanage',
    orgType: 'orphanage',
    address: 'Sector 5, MG Road, Bangalore',
    contact: '9876543210',
    email: 'littlestars@example.com',
    registrationDoc: '/images/reg01.jpg',
    verified: true,
    verificationStatus: 'verified',
    pickupAvailable: true,
    needs: ['School Textbooks', 'Story Books'],
    receivedCount: 34,
    thankMessages: [
      { donorId: 'user05', donorName: 'Sneha Patel', msg: 'Thank you for the wonderful books!', date: '2025-01-20' },
      { donorId: 'user03', donorName: 'Ananya Desai', msg: 'The children loved the story books!', date: '2025-01-15' }
    ],
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: 'recv02',
    orgName: 'Government Primary School, Sector 12',
    orgType: 'school',
    address: 'Sector 12, Dwarka, Delhi',
    contact: '9876543220',
    email: 'gpsschool@example.com',
    registrationDoc: '/images/reg02.jpg',
    verified: true,
    verificationStatus: 'verified',
    pickupAvailable: false,
    needs: ['School Textbooks', 'Regional Literature'],
    receivedCount: 56,
    thankMessages: [
      { donorId: 'user07', donorName: 'Meera Iyer', msg: 'Grateful for your contribution to education!', date: '2025-01-22' }
    ],
    lat: 28.5921,
    lng: 77.0460
  },
  {
    id: 'recv03',
    orgName: 'City Public Library',
    orgType: 'library',
    address: 'Anna Nagar, Chennai',
    contact: '9876543230',
    email: 'citylibrary@example.com',
    registrationDoc: '/images/reg03.jpg',
    verified: true,
    verificationStatus: 'verified',
    pickupAvailable: true,
    needs: ['Higher Education', 'Story Books', 'Regional Literature'],
    receivedCount: 89,
    thankMessages: [
      { donorId: 'user01', donorName: 'Priya Sharma', msg: 'Your books enrich our community!', date: '2025-01-25' },
      { donorId: 'user09', donorName: 'Divya Nair', msg: 'Thank you for supporting literacy!', date: '2025-01-18' }
    ],
    lat: 13.0827,
    lng: 80.2707
  },
  {
    id: 'recv04',
    orgName: 'Helping Hands NGO',
    orgType: 'ngo',
    address: 'Banjara Hills, Hyderabad',
    contact: '9876543240',
    email: 'helpinghands@example.com',
    registrationDoc: '/images/reg04.jpg',
    verified: true,
    verificationStatus: 'verified',
    pickupAvailable: true,
    needs: ['School Textbooks', 'Competitive Exams', 'Story Books'],
    receivedCount: 67,
    thankMessages: [
      { donorId: 'user10', donorName: 'Rohan Gupta', msg: 'Making a real difference, thank you!', date: '2025-01-28' }
    ],
    lat: 17.4239,
    lng: 78.4738
  }
];

export const demoRequests: Request[] = [
  {
    id: 'req01',
    bookId: 'book02',
    requesterId: 'user02',
    ownerId: 'user01',
    status: 'pending',
    date: '2025-02-08',
    messages: []
  },
  {
    id: 'req02',
    bookId: 'book05',
    requesterId: 'user04',
    ownerId: 'user10',
    status: 'accepted',
    date: '2025-02-05',
    messages: [
      { from: 'user04', text: 'Hi, is this book still available?', timestamp: '2025-02-05T10:00:00' },
      { from: 'user10', text: 'Yes, it is! Let me know when you can pick it up.', timestamp: '2025-02-05T11:30:00' }
    ]
  },
  {
    id: 'req03',
    bookId: 'book07',
    requesterId: 'user08',
    ownerId: 'user04',
    status: 'accepted',
    date: '2025-02-03',
    messages: [
      { from: 'user08', text: 'I need this for my semester exams.', timestamp: '2025-02-03T14:00:00' },
      { from: 'user04', text: 'Sure, happy to help!', timestamp: '2025-02-03T15:00:00' }
    ]
  },
  {
    id: 'req04',
    bookId: 'book01',
    requesterId: 'user06',
    ownerId: 'user03',
    status: 'rejected',
    date: '2025-02-01',
    messages: []
  },
  {
    id: 'req05',
    bookId: 'book11',
    requesterId: 'user05',
    ownerId: 'user01',
    status: 'completed',
    date: '2025-01-28',
    messages: [
      { from: 'user05', text: 'Would love to read this!', timestamp: '2025-01-28T09:00:00' },
      { from: 'user01', text: 'Its yours! Meet at Starbucks?', timestamp: '2025-01-28T10:00:00' },
      { from: 'user05', text: 'Perfect! See you tomorrow.', timestamp: '2025-01-28T11:00:00' }
    ]
  },
  {
    id: 'req06',
    bookId: 'book09',
    requesterId: 'user03',
    ownerId: 'user02',
    status: 'pending',
    date: '2025-02-07',
    messages: []
  },
  {
    id: 'req07',
    bookId: 'book13',
    requesterId: 'user10',
    ownerId: 'user07',
    status: 'accepted',
    date: '2025-02-06',
    messages: [
      { from: 'user10', text: 'Need this for my sister.', timestamp: '2025-02-06T16:00:00' }
    ]
  },
  {
    id: 'req08',
    bookId: 'book15',
    requesterId: 'user09',
    ownerId: 'user05',
    status: 'pending',
    date: '2025-02-09',
    messages: []
  }
];

export const demoDonations: Donation[] = [
  {
    id: 'don01',
    donorId: 'user03',
    receiverId: 'recv01',
    bookId: 'book04',
    status: 'completed',
    pickupRequested: true,
    pickupScheduled: true,
    pickupDetails: 'Picked up on Jan 15, 2025 at 10 AM',
    date: '2025-01-10'
  },
  {
    id: 'don02',
    donorId: 'user07',
    receiverId: 'recv02',
    bookId: 'book09',
    status: 'accepted',
    pickupRequested: false,
    pickupScheduled: false,
    date: '2025-01-20'
  },
  {
    id: 'don03',
    donorId: 'user05',
    receiverId: 'recv01',
    bookId: 'book06',
    status: 'pending',
    pickupRequested: true,
    pickupScheduled: false,
    date: '2025-02-05'
  },
  {
    id: 'don04',
    donorId: 'user01',
    receiverId: 'recv03',
    bookId: 'book11',
    status: 'pending',
    pickupRequested: true,
    pickupScheduled: false,
    date: '2025-02-08'
  },
  {
    id: 'don05',
    donorId: 'user10',
    receiverId: 'recv04',
    bookId: 'book05',
    status: 'accepted',
    pickupRequested: true,
    pickupScheduled: true,
    pickupDetails: 'Scheduled for Feb 12, 2025 at 3 PM',
    date: '2025-02-01'
  },
  {
    id: 'don06',
    donorId: 'user09',
    receiverId: 'recv03',
    bookId: 'book08',
    status: 'rejected',
    pickupRequested: true,
    pickupScheduled: false,
    date: '2025-01-25'
  },
  {
    id: 'don07',
    donorId: 'user02',
    receiverId: 'recv02',
    bookId: 'book14',
    status: 'pending',
    pickupRequested: false,
    pickupScheduled: false,
    date: '2025-02-09'
  },
  {
    id: 'don08',
    donorId: 'user06',
    receiverId: 'recv04',
    bookId: 'book06',
    status: 'completed',
    pickupRequested: true,
    pickupScheduled: true,
    pickupDetails: 'Delivered on Jan 28, 2025',
    date: '2025-01-20'
  }
];

export const demoComplaints: Complaint[] = [
  {
    id: 'comp01',
    fromUserId: 'user04',
    targetId: 'user06',
    targetType: 'user',
    category: 'No Show',
    description: 'User did not show up for the book exchange meeting.',
    status: 'open',
    date: '2025-02-05'
  },
  {
    id: 'comp02',
    fromUserId: 'user08',
    targetId: 'book12',
    targetType: 'book',
    category: 'Incorrect Information',
    description: 'Book condition was listed as Excellent but was actually damaged.',
    status: 'open',
    date: '2025-02-07'
  },
  {
    id: 'comp03',
    fromUserId: 'user05',
    targetId: 'recv02',
    targetType: 'receiver',
    category: 'Other',
    description: 'Organization did not acknowledge donation.',
    status: 'resolved',
    date: '2025-01-28'
  },
  {
    id: 'comp04',
    fromUserId: 'user09',
    targetId: 'user02',
    targetType: 'user',
    category: 'Inappropriate Behavior',
    description: 'User was rude during communication.',
    status: 'open',
    date: '2025-02-09'
  }
];

export const demoAdminLogs: AdminLog[] = [
  {
    id: 'log01',
    action: 'Approved Receiver',
    targetId: 'recv01',
    details: 'Verified Little Stars Orphanage documentation',
    date: '2025-01-05'
  },
  {
    id: 'log02',
    action: 'Resolved Complaint',
    targetId: 'comp03',
    details: 'Contacted organization and resolved issue',
    date: '2025-01-30'
  },
  {
    id: 'log03',
    action: 'Approved Receiver',
    targetId: 'recv03',
    details: 'Verified City Public Library documentation',
    date: '2025-01-10'
  }
];
