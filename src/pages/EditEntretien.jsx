// src/pages/EditEntretien.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEntretien = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entretien, setEntretien] = useState({
    nom: "",
    prenom: "",
    domaine: "",
    dureeFormation: "",
    maladie: "",
    interviewer: "",
    dateEntretien: "",
  });

  useEffect(() => {
    axios
      .get("http://entretiens.defarsci.fr/api/entretiens")
      .then((res) => {
        let liste = Array.isArray(res.data) ? res.data : res.data.entretiens;
        const found = liste.find((e) => e.id === parseInt(id));
        setEntretien(found || {});
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntretien({ ...entretien, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://entretiens.defarsci.fr/api/entretiens/${id}`, entretien)
      .then(() => {
        alert("✅ Entretien mis à jour avec succès !");
        navigate("/list-entretien");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      {/* Bouton retour */}
      <button
        className="btn mb-4"
        style={{ backgroundColor: "#6c757d", color: "#fff" }}
        onClick={() => navigate("/list-entretien")}
      >
        ← Retour à la liste
      </button>

      {/* Titre */}
      <h2 className="mb-4 fw-bold text-dark">
        ✏️ Modifier l’entretien de {entretien.nom} {entretien.prenom}
      </h2>

      {/* Formulaire dans une card */}
      <div
        className="card shadow-sm border-0"
        style={{ borderRadius: "12px", backgroundColor: "#fdfdfd" }}
      >
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nom</label>
                <input
                  type="text"
                  name="nom"
                  className="form-control"
                  value={entretien.nom || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  className="form-control"
                  value={entretien.prenom || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Domaine</label>
                <input
                  type="text"
                  name="domaine"
                  className="form-control"
                  value={entretien.domaine || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Durée Formation</label>
                <input
                  type="text"
                  name="dureeFormation"
                  className="form-control"
                  value={entretien.dureeFormation || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Maladie</label>
                <select
                  name="maladie"
                  className="form-select"
                  value={entretien.maladie?.toString() || ""}
                  onChange={handleChange}
                >
                  <option value="">Choisir</option>
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Interviewer</label>
                <input
                  type="text"
                  name="interviewer"
                  className="form-control"
                  value={entretien.interviewer || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Date Entretien</label>
                <input
                  type="date"
                  name="dateEntretien"
                  className="form-control"
                  value={entretien.dateEntretien?.slice(0, 10) || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Bouton enregistrer */}
            <div className="mt-4">
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#415379", color: "#fff" }}
              >
                💾 Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEntretien;
