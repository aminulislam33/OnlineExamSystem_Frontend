# Online Exam System — Frontend (React)

This repository contains the React frontend for the Online Exam System (OES). It provides student-facing pages (authentication, dashboard, exam-taking, and results) and basic admin-related UI placeholders. The frontend talks to a backend REST API (configured via `REACT_APP_API_URL`).

## Quick facts
- Bootstrapped with Create React App
- React Router for routing
- Context API for authentication state
- Axios for API calls
- Styling: Bootstrap + MDB React UI Kit + custom CSS

## Getting started (development)
1. Clone the repository and install dependencies:

```powershell
git clone <repo_url>
cd OnlineExamSystem_Frontend
npm install
```

2. Set environment variables (example `.env` at project root):

```
REACT_APP_API_URL=https://your-backend.example.com/api
```

3. Start dev server:

```powershell
npm start
```

Open http://localhost:3000

## NPM scripts
- `npm start` — start dev server
- `npm run build` — production build
- `npm test` — run tests

## Important environment variables
- `REACT_APP_API_URL` — Base URL used by `src/services/AxiosInstance.js` (required)

## Project structure (key files)
- `src/App.js` — router and top-level layout
- `src/context/AuthContext.jsx` — authentication context, token handling, user fetch
- `src/services/AxiosInstance.js` — Axios instance with `baseURL` from env
- `src/services/StartExamButton.jsx` — Start button (navigates to internal exam route)
- `src/pages/StudentDashboard.jsx` — student dashboard; lists upcoming exams (`/exams/upcoming`)
- `src/pages/ExamInterface.jsx` — route loader for starting an exam; hits `/exam-taking/start/:examId`
- `src/pages/ExamInterfaceContent.jsx` — exam UI: questions, timer, localStorage persistence, submit
- `src/pages/Login.jsx`, `src/pages/Signup.jsx`, `src/pages/Results.jsx` — authentication and results pages
- `src/components` — shared UI components (Navbar, Footer)

## Routing (important routes)
- `/` — Home
- `/user/login` — Login
- `/user/signup` — Signup
- `/student/dashboard` — Student dashboard (lists upcoming exams)
- `/student/exam/start/:examId` — Exam interface (loads exam and renders exam UI)
- `/student/dashboard/results` — Results

These routes are configured in `src/App.js`.

## API endpoints used by the frontend
The frontend expects a REST API; the following endpoints are referenced in the code:
- `POST /auth/login` — login (returns JWT)
- `POST /profile` — fetch authenticated user profile (requires `Authorization: Bearer <token>`)
- `GET /exams/upcoming` — list upcoming exams for dashboard
- `POST /exam-taking/start/:examId` — start/lock the exam and return exam data
- `POST /exam-taking/submit` — submit answers for grading

All requests use the Axios instance in `src/services/AxiosInstance.js` which reads `REACT_APP_API_URL`.

## Exam flow (how it works in this frontend)
1. Student clicks **Start Exam** on the dashboard (`StartExamButton`).
2. The app navigates to `/student/exam/start/:examId` (served by `ExamInterface`).
3. `ExamInterface` calls `POST /exam-taking/start/:examId` with the JWT in `Authorization` header to fetch exam data (questions, start/end times).
4. `ExamInterfaceContent` initializes UI state:
   - stores `exam_<examId>_endTime` in `localStorage` to persist timer across reloads
   - stores `exam_<examId>_answers` in `localStorage` to persist answers
   - runs a countdown timer and auto-submits when time expires
5. On submit (manual or auto), `POST /exam-taking/submit` is called with `{ examId, answers }` and the token; on success the UI navigates back to student dashboard and clears localStorage keys.

Local storage keys used
- `authToken` — JWT token stored by `AuthContext` on login
- `exam_<examId>_endTime` — exam end timestamp
- `exam_<examId>_answers` — JSON array of saved answers

## Authentication and token handling
- `AuthContext` stores token in `localStorage` and validates expiration.
- On valid token, `AuthContext` fetches user profile from `POST /profile` and exposes `user`, `token`, and helper methods via context.

## Notes about StartExam behavior
- Previous versions redirected users to an external exam host. The app now navigates to the internal route `/student/exam/start/:examId` so the exam runs inside this frontend (see `src/services/StartExamButton.jsx`). If you need to revert to an external host, modify that file.

## Styling and UI
- Bootstrap and `mdb-react-ui-kit` are used for buttons, modals and layout. Custom CSS lives under `src/styles`.

## Testing
- Unit and integration tests are not included by default. Use `react-scripts test` to run test runner if tests exist.

## Deployment
- Build with `npm run build` and deploy the `build/` folder to static hosting (e.g., Vercel, Netlify). Ensure `REACT_APP_API_URL` is set in the hosting environment.

## Contributing
- Fork, branch, and open PRs. Keep changes focused and add tests where appropriate.

## Troubleshooting
- If API requests fail, confirm `REACT_APP_API_URL` is correct and CORS is enabled on the backend.
- If auth fails, check that `authToken` exists in localStorage and that it has not expired.

## License
- MIT

