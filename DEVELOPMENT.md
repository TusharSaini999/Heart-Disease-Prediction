# Development Setup

This guide will help you set up the development environment for the Heart Disease Prediction project.

## Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- Git
- Docker (optional, for containerized development)

## Project Structure

```
├── frontend/          # React + Vite frontend
├── backend/           # Node.js + Express backend
├── AI/               # Python AI model
└── DB/               # Database files
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Backend Setup

```bash
cd backend
npm install
npm start
```

## AI Model Setup

```bash
cd AI
pip install -r requirements.txt
python model.py
```

## Database Setup

1. Import SQL files from `DB/` folder into your database
2. Configure database connection in `backend/db.js`

## Running with Docker

```bash
docker-compose up -d
```

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PYTHON_API_URL=http://localhost:5001
```

## Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# AI Model tests
cd AI && pytest
```

## Troubleshooting

### Issue: Port already in use
```bash
# Windows
netstat -ano | findstr :PORT
taskkill /PID pid_number /F

# macOS/Linux
lsof -i :PORT
kill -9 pid_number
```

### Issue: Dependencies not installing
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run lint` | Run linter |

## Need Help?

- See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- See [SUPPORT.md](SUPPORT.md) for support options
- Check existing issues for solutions

## Additional Resources

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)
- [AI README](AI/README.md)
