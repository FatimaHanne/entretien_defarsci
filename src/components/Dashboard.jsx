import React from "react";
import { Users, Calendar, FileText, Bell, Settings } from "lucide-react";

const Dashboard = () => {
  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #e9f2ff)",
      }}
    >
      {/* Header */}
      <header className="bg-white border-bottom shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h3 fw-bold mb-0 text-primary">Dashboard</h1>
            <small className="text-muted">
              Bienvenue, gérez vos entretiens et employés
            </small>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary rounded-circle">
              <Bell size={18} />
            </button>
            <button className="btn btn-outline-secondary rounded-circle">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container flex-grow-1 d-flex flex-column justify-content-center">
        {/* Stats */}
        <div className="row g-4 mb-5 text-center">
          <div className="col-md-4">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="bg-primary text-white p-3 rounded">
                    <Calendar size={24} />
                  </div>
                  <span className="badge bg-primary-subtle text-primary fw-bold">
                    +5000 entretiens
                  </span>
                </div>
                <h2 className="fw-bold text-primary">5247</h2>
                <p className="text-muted">Total Entretiens</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="bg-success text-white p-3 rounded">
                    <Users size={24} />
                  </div>
                  <span className="badge bg-success-subtle text-success fw-bold">
                    +1000 employés
                  </span>
                </div>
                <h2 className="fw-bold text-success">1284</h2>
                <p className="text-muted">Total Employés</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="bg-danger text-white p-3 rounded">
                    <Calendar size={24} />
                  </div>
                  <span className="badge bg-danger-subtle text-danger fw-bold">
                    Cette semaine
                  </span>
                </div>
                <h2 className="fw-bold text-danger">234</h2>
                <p className="text-muted">Entretiens programmés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <h5 className="card-title text-center fw-bold mb-4 text-dark">
              🚀 Actions rapides
            </h5>
            <div className="row g-4 text-center">
              <div className="col-md-4">
                <button className="btn btn-primary w-100 py-4 shadow-sm">
                  <Calendar className="mb-2" />
                  <div>Planifier un entretien</div>
                </button>
              </div>
              <div className="col-md-4">
                <button className="btn btn-success w-100 py-4 shadow-sm">
                  <Users className="mb-2" />
                  <div>Ajouter un employé</div>
                </button>
              </div>
              <div className="col-md-4">
                <button className="btn btn-dark w-100 py-4 shadow-sm">
                  <FileText className="mb-2" />
                  <div>Générer un rapport</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
