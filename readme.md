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
3. Set up the `.env` file in the root directory (already included for convenience with a sample DB). Ensure `MONGODB_URL` is set properly.
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
3. Run the Vite development server:
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
  5. Add `MONGODB_URL` inside the Render Environment variables configuration.

- **Frontend (Netlify)**:
  1. Add a `_redirects` file to the frontend's `public` folder with `/* /index.html 200` to prevent routing errors.
  2. Important: Change the `API_URL` variable in `src/App.jsx` from `http://localhost:5000/tasks` to the newly deployed Render backend URL.
  3. Deploy the frontend folder to Netlify by importing the GitHub repo and specifying the `frontend` root directory.
  4. Build command: `npm run build`, Publish directory `dist`.

## Challenges Faced & Addressed
- **CORS Errors**: Addressed successfully by including the `cors` package in the Express app.
- **Frontend State Management**: Addressed by making logical granular React components (TaskForm, TaskList) and lifting state up to `App.jsx` for a centralized single-source-of-truth.
- **Visuals**: Ensured it meets beautiful design criteria using custom CSS glassmorphism strategies instead of simple barebones CSS.
