import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddEntretien from './components/AddEntretien';
import ListEntretiens from './components/ListEntretiens';
import EditEntretien from "./pages/EditEntretien";
import EntretienDetails from "./pages/EntretienDetails";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-entretien" element={<AddEntretien />} />
        <Route path="/list-entretien" element={<ListEntretiens />} />
        <Route path="/entretien/:id" element={<EntretienDetails />} />
        <Route path="/edit-entretien/:id" element={<EditEntretien />} />
      </Routes>
    </Router>
  );
};

export default App;
