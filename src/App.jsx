import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddEntretien from './components/AddEntretien';
import ListEntretiens from './components/ListEntretiens';
import EditEntretien from "./pages/EditEntretien";
import EntretienDetails from "./pages/EntretienDetails";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";

const App = () => {
  const isAuth = localStorage.getItem("auth"); // Vérifie si connecté

  return (
    <Router>
      {isAuth && <Navbar />} {/* Navbar visible seulement si connecté */}
      <Routes>
        {/* Route publique */}
        <Route path="/login" element={<Login />} />

        {/* Routes protégées */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/add-entretien" 
          element={
            <PrivateRoute>
              <AddEntretien />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/list-entretien" 
          element={
            <PrivateRoute>
              <ListEntretiens />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/entretien/:id" 
          element={
            <PrivateRoute>
              <EntretienDetails />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/edit-entretien/:id" 
          element={
            <PrivateRoute>
              <EditEntretien />
            </PrivateRoute>
          } 
        />

        {/* Redirection par défaut depuis '/' */}
        <Route 
          path="/" 
          element={isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
