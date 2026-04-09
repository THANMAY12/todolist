# To-Do List Application

A simple, modern, full-stack To-Do list application leveraging Node.js, Express, MongoDB, and React. 

## Structure
- **Backend**: `/` (root directory)
- **Frontend**: `/frontend` (Vite + React)

## Backend Configuration
1. The backend uses Express and Mongoose.
2. In the root directory, install dependencies:
   ```bash
   npm install
   ```
3. Create and set up the `.env` file in the root directory. Required variables:
   ```env
   MONGODB_URL=mongodb://<username>:<password>@<cluster-url>/<db-name>
   PORT=5000
   CORS_ORIGIN=http://localhost:5173 
   ```
   *Note: Ensure `CORS_ORIGIN` precisely matches the domain your frontend is running on. Use `*` to allow all origins temporarily for development.*
4. Run the server:
   ```bash
   npm start
   ```
   *The server will run on http://localhost:5000*

## Frontend Configuration
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install React dependencies:
   ```bash
   npm install
   ```
3. Optional: Configure your local frontend API URL by creating a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/tasks
   ```
4. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The client will run on http://localhost:5173*.

## Deployment
Since the assignment requires hosting:
- **Backend (Render.com)**:
  1. Push the repository to GitHub.
  2. Create a "Web Service" on Render and link the repo.
  3. Set Root Directory to `Assignment 8` space (or leave blank if it's the root of your repo).
  4. Build command: `npm install`, Start command: `npm start`.
  5. Add `MONGODB_URL`, `PORT`, and `CORS_ORIGIN` inside the Render Environment variables configuration. Make sure `CORS_ORIGIN` is the finalized URL of your deployed frontend.

- **Frontend (Netlify)**:
  1. Add a `_redirects` file to the frontend's `public` folder with `/* /index.html 200` to prevent routing errors.
  2. Deploy the frontend folder to Netlify by importing the GitHub repo and specifying the `frontend` root directory.
  3. In Netlify Build Settings, verify Build command is `npm run build` and Publish directory is `dist`.
  4. Also add the Environment Variable `VITE_API_URL` pointing to your real Render backend backend URL (e.g. `https://my-backend-app.onrender.com/tasks`).

## Challenges Faced & Addressed
- **CORS Errors**: Addressed successfully by including the `cors` package in the Express app and enforcing an environment variable origin match rather than wide-open permissions in production.
- **Frontend State Management**: Addressed by making logical granular React components (TaskForm, TaskList) and properly handling data states utilizing structured asynchronous REST responses maping out explicit conditional logic rendering.
- **Robustness**: Ensured full ReDoS sanitization on backend searches, thorough ID validation before performing Mongo document modifications, and customized HTTP status code messaging dynamically forwarded through the application flow.
