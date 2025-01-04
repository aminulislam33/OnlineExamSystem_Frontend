# Online Exam System Frontend

This project is the frontend part of the **Online Exam System** (OES) built with **React.js**. It allows students to register, log in, take exams, view results, and enables admins to manage questions and exams.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you're ready for it.

## Features

- **Student Authentication**: Register, log in, and take exams.
- **Admin Dashboard**: Manage questions, create and manage exams.
- **Results Page**: View exam results with detailed performance analytics.
- **Protected Routes**: Only authenticated users can access certain pages.
- **Question Management**: Add, update, and delete exam questions.
- **Real-time Exam Timer**: Countdown timer for exam duration.

## Technology Stack

- **Frontend**: React.js
- **Routing**: React Router
- **State Management**: Context API (for global state management)
- **Styling**: CSS/SCSS (or any CSS framework you are using)
- **API**: Axios (for making HTTP requests)

## Folder Structure

- **/src**
  - **/components**: Reusable components (e.g., Navbar, QuestionCard)
  - **/context**: React Context for global state (e.g., AuthContext, ExamContext)
  - **/pages**: Page components for different routes (e.g., Home, Login, StudentDashboard)
  - **/services**: Axios instance for API calls
  - **/styles**: Stylesheets for components and pages
  - **/utils**: Utility functions

## Setup Instructions

### 1. Clone the repository:

```bash
git clone <repo_url>
cd OnlineExamSystem_Frontend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Run the app:

```bash
npm start
```

This will start the React development server, and you can view the app at [http://localhost:3000](http://localhost:3000).

### 4. Deployment:

For deployment, we suggest using platforms like **Vercel** or **Netlify**. To deploy to **Vercel**, follow these steps:

1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. Run the following command in the root directory of your project:
   ```bash
   vercel
   ```

   Follow the instructions to connect your GitHub repository and deploy your app.

### 5. Additional Configuration (for API calls):

Ensure your backend is running and accessible to make API calls. In the code, you can configure your **Axios instance** to point to the correct base URL of the backend API.

For example, in `AxiosInstance.js`:
```javascript
const api = axios.create({
  baseURL: 'https://your-backend-url.com/api', // replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  }
});
```

## Future Enhancements

- **Add Exam Feedback**: Allow students to give feedback on exams.
- **Leaderboard**: Display top-performing students based on their scores.
- **Real-Time Notifications**: Notify users when their results are available or when exams are about to start.
- **Admin Role**: Implement different levels of access for admins, such as super admins and regular admins.

## Troubleshooting

- If you face any issues while running the app, make sure:
  - Your backend API is running and accessible.
  - All environment variables are set correctly.
  - Dependencies are installed (`npm install`).

## Contributing

If you'd like to contribute to this project, feel free to fork it and create a pull request. Here's how to contribute:

1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new branch for your feature (`git checkout -b feature-name`).
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to your fork (`git push origin feature-name`).
6. Create a pull request from your fork's branch to the main repository.

## License

This project is open-source and available under the MIT License.
```

