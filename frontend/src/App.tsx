import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeRoute from './routes/HomeRoute';
import RegisterRoute from './routes/RegisterRoute';
import LoginRoute from './routes/LoginRoute';
import Footer from './components/Shared/Footer';

function App() {
  return (
    <Box className="App">
      <Router>
        <Box minH="100vh">
          <Routes>
            <Route index element={<HomeRoute />} />
            <Route path="/register" element={<RegisterRoute />} />
            <Route path="/login" element={<LoginRoute />} />
          </Routes>
        </Box>
      </Router>
      <Footer />
    </Box>
  );
}

export default App;
