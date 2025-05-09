# Notes Dashboard

A modern, secure notes management application with role-based access control and Docker support.

## Features

- **User Authentication**: Secure login and registration system
- **Role-Based Access Control**: Different permissions for regular users and administrators
- **Note Management**:
  - Create, read, update, and delete personal notes
  - Share notes with other users
  - Admin access user notes
- **Responsive Design**: Modern UI that works across devices
- **Docker Support**: Easy deployment with Docker and docker-compose

## Prerequisites

- Node.js (v14 or higher)
- Docker and docker-compose
- MongoDB (if running locally without Docker)

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd notes-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

### Docker Deployment

1. Build and run the containers:
```bash
docker-compose up -d
```

2. The application will be available at:
- Development: http://localhost:3000
- Production: http://localhost:80

## Project Structure

```
notes-dashboard/
├── src/
│   ├── components/     # React components
│   ├── contexts/       # Context providers
│   ├── pages/         # Next.js pages
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── public/            # Static assets
├── Dockerfile         # Production Dockerfile
├── Dockerfile.dev     # Development Dockerfile
├── docker-compose.yml # Docker compose configuration
└── next.config.js     # Next.js configuration
```

## User Roles

### Regular Users
- Create and manage personal notes
- Share notes with other users
- View and interact with shared notes
- Update personal profile

### Administrators
- View all user notes (read-only)
- Cannot modify or delete notes they don't own
- Access to admin dashboard
- User management capabilities

## Security Features

- JWT-based authentication
- Password hashing
- Role-based access control
- Protected API routes
- Secure note sharing
