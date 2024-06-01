import React from 'react';
import { ChakraProvider, ColorModeScript, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SaleOrders from './components/SaleOrders';
import theme from './theme';
import DarkThemeToggle from './components/DarkThemeToggle';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};
const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Box className="App" p={4}>
          <DarkThemeToggle />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sale-orders" element={<PrivateRoute><SaleOrders /></PrivateRoute>} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;