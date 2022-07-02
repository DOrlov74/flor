import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/normal';
import Header from './components/Header';
import { Box, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SigninForm from './components/SigninForm';
import MessageAlert from './components/MessageAlert';
import Services from './pages/Services';
import ServicePage from './pages/ServicePage';
import Book from './pages/Book';
import Bookings from './pages/Bookings';
import Vacancies from './pages/Vacancies';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ResetPassForm from './components/ResetPassForm';
import UserSettings from './pages/UserSettings';
import ContactsPage from './pages/ContactsPage';
import Privacy from './pages/Privacy';
import News from './pages/News';
import SigninAndBookForm from './components/SigninAndBookForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <Header/>
        <Box component='div' sx={{position: 'relative'}}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/service/:id" element={<ServicePage/>}/>
            <Route path="/book" element={<Book/>}/>
            <Route path="/book/:id" element={<Book/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/login/:id" element={<LoginForm/>}/>
            <Route path="/signin" element={<SigninForm/>}/>
            <Route path="/signin/:id" element={<SigninForm/>}/>
            <Route path="/reset" element={<ResetPassForm/>}/>
            <Route path="/bookings" element={<Bookings/>}/>
            <Route path="/vacancies" element={<Vacancies/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/settings" element={<UserSettings/>}/>
            <Route path="/contacts" element={<ContactsPage/>}/>
            <Route path="/privacy" element={<Privacy/>}/>
            <Route path="/signinandbook" element={<SigninAndBookForm/>}/>
            <Route path="/signinandbook/:id" element={<SigninAndBookForm/>}/>
          </Routes>
          </LocalizationProvider>
          <MessageAlert/>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
