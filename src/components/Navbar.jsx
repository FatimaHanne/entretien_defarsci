import React from "react";
import { Link } from "react-router-dom";
import { BarChart2, PlusCircle, List } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // nécessaire pour le burger menu

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container">
        <div className="d-flex flex-column align-items-center me-3">
          <img
            src="public/images/images-removebg-preview.png"
            alt="logo"
            style={{ height: "70px", width: "70px" }}
          />
          <h3 className="fw-bold m-0" style={{ fontSize: "17px",color:"#7FB3FF" }}>
            DefarSci
          </h3>
        </div>
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <BarChart2 size={22} className="me-1 " style={{color:"#84ADDB"}} />
          Gestion Entretien
        </Link>

        {/* Bouton burger pour mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Liens */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/">
                <BarChart2 size={18} className="me-1" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/add-entretien">
                <PlusCircle size={18} className="me-1" />
                Ajouter Entretien
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/list-entretien">
                <List size={18} className="me-1" />
                Liste Entretien
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
