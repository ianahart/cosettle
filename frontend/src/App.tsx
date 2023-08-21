import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeRoute from './routes/HomeRoute';
import RegisterRoute from './routes/RegisterRoute';
import LoginRoute from './routes/LoginRoute';
import Footer from './components/Shared/Footer';
import RequireGuest from './components/Guard/RequireGuest';
import ExplorerRoute from './routes/ExplorerRoute';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { UserContext } from './context/user';
import { IUserContext } from './interfaces';
import MainNavbar from './components/MainNavbar';
import ForgotPasswordRoute from './routes/ForgotPasswordRoute';
import { Client } from './util/client';
import { retreiveTokens } from './util';
import WithAxios from './util/WithAxios';
import AuthNavbar from './components/AuthNavbar';
import GroupsRoute from './routes/GroupsRoute';
import RequireAuth from './components/Guard/RequireAuth';
import MessagesRoute from './routes/MessagesRoute';
import SettingsRoute from './routes/SettingsRoute';

function App() {
  const { updateUser, stowTokens, user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const storeUser = useCallback(async () => {
    Client.syncUser(retreiveTokens()?.token)
      .then((res) => {
        updateUser(res.data);
        stowTokens(retreiveTokens());
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    if (shouldRun.current && retreiveTokens()?.token) {
      shouldRun.current = false;
      storeUser();
    }
  }, [shouldRun.current, storeUser]);

  return (
    <Box bg="black" className="App">
      <Router>
        {!user.loggedIn && <MainNavbar />}
        {user.loggedIn && <AuthNavbar />}
        <Box minH="100vh">
          <WithAxios>
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
              <Route
                path="/forgot-password"
                element={
                  <RequireGuest>
                    <ForgotPasswordRoute />
                  </RequireGuest>
                }
              />
              <Route
                path="/:username/groups"
                element={
                  <RequireAuth>
                    <GroupsRoute />
                  </RequireAuth>
                }
              />
              <Route
                path="/:username/messages"
                element={
                  <RequireAuth>
                    <MessagesRoute />
                  </RequireAuth>
                }
              />
              <Route
                path="/:username/settings"
                element={
                  <RequireAuth>
                    <SettingsRoute />
                  </RequireAuth>
                }
              />
              <Route path="/explorer" element={<ExplorerRoute />} />
            </Routes>
          </WithAxios>
        </Box>
      </Router>
      <Footer />
    </Box>
  );
}

export default App;
