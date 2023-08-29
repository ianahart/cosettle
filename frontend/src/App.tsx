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
import CreateSpaceRoute from './routes/CreateSpaceRoute';
import Details from './components/Settings/Details';
import EditProfile from './components/Settings/EditProfile';
import Password from './components/Settings/Password';
import Notifications from './components/Settings/Notifications';
import Visibility from './components/Settings/Visibility';

function App() {
  const { updateUser, stowTokens, user, nonAuthTheme } = useContext(
    UserContext
  ) as IUserContext;
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

  useEffect(() => {
    if (shouldRun.current && !retreiveTokens()?.token) {
      localStorage.setItem('theme', 'dark');
      shouldRun.current = false;
    }
  }, [shouldRun.current]);

  return (
    <Box
      bg={nonAuthTheme === 'dark' || user.theme === 'dark' ? '#161515' : 'white'}
      className="App"
    >
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
              >
                <Route
                  path="details"
                  element={
                    <RequireAuth>
                      <Details />
                    </RequireAuth>
                  }
                />
                <Route
                  path="edit-profile"
                  element={
                    <RequireAuth>
                      <EditProfile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="password"
                  element={
                    <RequireAuth>
                      <Password />
                    </RequireAuth>
                  }
                />
                <Route
                  path="notifications"
                  element={
                    <RequireAuth>
                      <Notifications />
                    </RequireAuth>
                  }
                />
                <Route
                  path="visibility"
                  element={
                    <RequireAuth>
                      <Visibility />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route
                path="/spaces/create"
                element={
                  <RequireAuth>
                    <CreateSpaceRoute />
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
