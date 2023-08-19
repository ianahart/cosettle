import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeRoute from './routes/HomeRoute';
import RegisterRoute from './routes/RegisterRoute';
import LoginRoute from './routes/LoginRoute';
import Footer from './components/Shared/Footer';
import RequireGuest from './components/Guard/RequireGuest';
import ExplorerRoute from './routes/ExplorerRoute';
import { useContext } from 'react';
import { UserContext } from './context/user';
import { IUserContext } from './interfaces';
import MainNavbar from './components/MainNavbar';

function App() {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Box className="App">
      <Router>
        {!user.loggedIn && <MainNavbar />}
        <Box minH="100vh">
          <Routes>
            <Route index element={<HomeRoute />} />
            <Route
              path="/register"
              element={
                <RequireGuest>
                  <RegisterRoute />
                </RequireGuest>
              }
            />
            <Route
              path="/login"
              element={
                <RequireGuest>
                  <LoginRoute />
                </RequireGuest>
              }
            />
            <Route path="/explorer" element={<ExplorerRoute />} />
          </Routes>
        </Box>
      </Router>
      <Footer />
    </Box>
  );
}

export default App;
