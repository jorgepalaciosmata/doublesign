import Navigation from './pages/patient/components/Navigation/Navigation';
import AuthService from './pages/shared/services/authService';
import Authentication from './pages/shared/components/Auth/authentication';
import Main from './pages/shared/components/Auth/Main/main';

export default function App() {

  // If a user is set show the navigation page.
  if (AuthService.getCurrentUserTokenString()) {
    return (<Main />)  }

  // If no user is set show Authentication screen.
  return <Authentication />;
}