import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const updateTitle = () => {
      switch (location.pathname) {
        case '/':
          document.title = 'Home';
          break;
        case '/student/dashboard':
          document.title = 'Dashboard - AptiCrack';
          break;
        case '/student/dashboard/profile':
          document.title = 'Profile';
          break;
        case '/user/login':
          document.title = 'Login';
          break;
        case '/user/signup':
          document.title = 'Sign Up';
          break;
        case '/student/exam/start/:examId':
          document.title = 'Exam - AptiCrack';
          break;
        case '/student/dashboard/results':
          document.title = 'Results';
          break;
        default:
          document.title = 'AptiCrack';
          break;
      }
    };

    updateTitle();
  }, [location]);

  return null;
};

export default PageTitleUpdater;