# Development

Running BACKEND:

    cd apps/backend
    npm run dev

Running FRONTEND:

    cd apps/frontend
    npm run dev

You can create and change .env file in both projects.

**Backend .env**

    NODE_ENV=development
    PORT=3000
    MONGODB_URL=mongodb://localhost:27017/deversity

**Frotnend .env**

    VITE_API_URL=http://localhost:3000

# Production

You can run everything in docker with:
`npm run docker:up`
