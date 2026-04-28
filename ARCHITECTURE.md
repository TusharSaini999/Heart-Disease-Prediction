# Architecture

This document describes the overall architecture of the Heart Disease Prediction project.

## System Overview

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                   │
│                                                     │
│  - User Interface                                  │
│  - Authentication Handling                        │
│  - Data Visualization                             │
└────────────────┬────────────────────────────────────┘
                 │
                 │ HTTP/REST
                 ▼
┌─────────────────────────────────────────────────────┐
│              Backend (Node.js + Express)            │
│                                                     │
│  - API Endpoints                                   │
│  - Authentication & Authorization                 │
│  - Database Management                            │
│  - Data Processing                                │
└────────────────┬────────────────────────────────────┘
         ┌───────┴────────┐
         │                │
         ▼                ▼
    ┌─────────┐      ┌──────────────────┐
    │ Database│      │ Python ML Model  │
    │ (SQL)   │      │ (Flask/FastAPI)  │
    └─────────┘      └──────────────────┘
```

## Component Breakdown

### Frontend (React + Vite)

**Purpose:** User-facing interface for heart disease prediction

**Key Components:**
- `components/` - Reusable UI components
- `Pages/` - Page components for routing
- `App.jsx` - Main app component
- Authentication and protected routes

**Technologies:**
- React 18+
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation

### Backend (Node.js + Express)

**Purpose:** API server and business logic

**Key Files:**
- `server.js` - Main server entry point
- `ai.js` - Integration with ML model
- `authentication.js` - Auth logic
- `db.js` - Database connection
- `verifyToken.js` - JWT verification middleware

**Technologies:**
- Express.js
- JWT for authentication
- SQL for database

### AI Model (Python)

**Purpose:** Machine learning model for heart disease prediction

**Key Files:**
- `model.py` - Model training and prediction
- `pythonapi.py` - Flask/FastAPI server
- `AIModel.ipynb` - Model development notebook
- `heart.csv` - Training dataset

**Technologies:**
- Python 3.8+
- Scikit-learn for ML
- Flask or FastAPI for serving

### Database

**Purpose:** Data persistence

**Components:**
- `Db.sql` - Main database schema
- `Backup.sql` - Database backup
- Tables for users, predictions, history

## Data Flow

### Prediction Flow

1. User submits health data through frontend
2. Frontend sends request to backend API
3. Backend validates and processes data
4. Backend sends data to Python ML model
5. ML model returns prediction
6. Backend stores result in database
7. Frontend displays result to user

### Authentication Flow

1. User registers/logs in
2. Backend generates JWT token
3. Frontend stores token
4. Subsequent requests include token
5. Backend verifies token with `verifyToken.js`
6. Request is processed if valid

## Deployment Architecture

### Docker Containers

- Frontend container (Nginx)
- Backend container (Node.js)
- Python API container (Flask/FastAPI)
- Database container (SQL)

### Environment Variables

Each service uses environment variables for configuration:
- Database credentials
- API keys
- JWT secret
- Service URLs

## Security Considerations

1. **Authentication:** JWT tokens for secure API access
2. **Environment Variables:** Sensitive data not hardcoded
3. **HTTPS:** Use in production
4. **Input Validation:** Server-side validation
5. **CORS:** Properly configured for frontend domain
6. **Database:** SQL injection prevention through parameterized queries

## Performance Optimization

1. **Frontend:** Vite bundling, lazy loading components
2. **Backend:** Caching, connection pooling
3. **ML Model:** Model optimization, prediction caching
4. **Database:** Indexing, query optimization

## Future Enhancements

- Microservices architecture
- GraphQL API
- Real-time notifications
- Advanced caching strategies
- Load balancing
- API rate limiting
