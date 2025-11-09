# Community Book Exchange & Donation Platform

A fully navigable, frontend-only prototype demonstrating a complete multi-role book exchange and donation platform.

## Features

### Three User Roles

1. **User (Donor/Exchanger)** - Browse and exchange books, donate to verified organizations
2. **Receiver (Organizations)** - Schools, libraries, orphanages, NGOs accepting donations
3. **Admin** - Platform management, verification, and moderation

### Key Functionality

- **Book Exchange**: Browse nearby books, request exchanges, chat with owners
- **Donation System**: Donate books to verified organizations with pickup options
- **Verification System**: Admin verification of receiver organizations
- **Complaint Management**: Report and resolve user complaints
- **Points & Badges**: Gamification to encourage participation
- **Real-time Updates**: Client-side state management simulating live interactions

## Demo Credentials

### User Login
- priya@example.com
- rahul@example.com
- ananya@example.com
- (Any demo user email from the list)

### Receiver Login
- littlestars@example.com (Little Stars Orphanage)
- gpsschool@example.com (Government Primary School)
- citylibrary@example.com (City Public Library)
- helpinghands@example.com (Helping Hands NGO)

### Admin Login
- Email: admin@bookshare.com
- Password: admin123

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Navigation Guide

### As User
1. Login with any demo user email
2. Dashboard shows overview of your activity
3. Browse Books - Search, filter, and request books
4. Post Book - List your books for exchange or donation
5. My Requests - Track your exchange requests
6. Donate - View verified receivers and donate books
7. Profile - View stats, badges, and achievements

### As Receiver
1. Login with any receiver email
2. Dashboard shows donation overview
3. Upload ID - Submit verification documents
4. Required Books - Specify categories needed
5. Donations - Accept/reject incoming donations
6. Pickups - Manage pickup requests (if enabled)
7. Profile - Public organization profile with thank you messages

### As Admin
1. Login with admin@bookshare.com / admin123
2. Dashboard shows platform KPIs
3. Verify Receivers - Approve/reject organization verification requests
4. Complaints - Resolve user complaints and grievances
5. Malpractice - Handle reports and block users if needed
6. All Users - View and manage all registered users
7. All Books - Monitor book listings and remove if needed
8. Donations - Track all donation requests
9. Exchanges - Monitor all exchange requests

## Technical Details

### Frontend-Only Architecture
- **No Backend**: All data is stored in React state
- **No Real Authentication**: Login pages are UI-only
- **Static Demo Data**: Pre-populated with sample users, books, receivers
- **Client State Management**: React Context API for global state
- **Local Actions**: All button clicks update UI state immediately

### Technology Stack
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

### Demo Data Includes
- 10 demo users with varied profiles
- 15 demo books across categories
- 4 verified receiver organizations
- Sample requests, donations, and complaints

## Important Notes

⚠️ **This is a frontend-only prototype**
- No data persistence (refreshing page resets state)
- No real authentication or security
- No backend API calls
- All actions are simulated client-side

### Simulated Features
- Book requests update status locally
- Donations create entries in demo data
- Chat messages append to conversation array
- Admin actions update verification status
- Points and badges awarded on actions

## Project Structure

```
src/
├── components/      # Reusable UI components
│   └── Layout.tsx   # Role-specific layout wrapper
├── context/         # React Context for state
│   └── AppContext.tsx
├── data/            # Demo data models
│   └── demoData.ts
├── pages/           # All page components
│   ├── auth/        # Login pages
│   ├── user/        # User role pages
│   ├── receiver/    # Receiver role pages
│   ├── admin/       # Admin role pages
│   └── donation/    # Donation flow pages
├── Router.tsx       # Route definitions
└── App.tsx          # Root component
```

## Future Enhancements (Not Implemented)

If this were a real application, the following would be added:
- Real backend with database (Supabase, Firebase, etc.)
- Actual authentication and authorization
- Real-time messaging with WebSockets
- Email notifications
- Payment integration for donations
- Mobile app versions
- PDF certificate generation
- QR code scanning for exchanges
- Geolocation and maps integration
- Image upload for books and documents

## License

This is a demonstration project created for educational purposes.
