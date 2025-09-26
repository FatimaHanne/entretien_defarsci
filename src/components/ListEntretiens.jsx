import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// --- Helpers ---
  const normalizeDomain = (str) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
};

const formatLabel = (str) =>
  str
    .split(" ")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
    .join(" ");

const ListEntretiens = () => {
  const [entretiens, setEntretiens] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [domains, setDomains] = useState([]);
  const [filters, setFilters] = useState({
    domaine: "",
    maladie: "",
    dateEntretien: "",
    nom: "",
    prenom: "",
  });
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 20;

const totalPages = Math.ceil(filtered.length / itemsPerPage);

// Découpe des entretiens affichés
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

// Tableau des pages [1,2,3,...]
const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);


  const navigate = useNavigate();

  // --- Récupération des entretiens et domaines depuis API ---
  useEffect(() => {
    axios
      .get("https://entretiens.defarsci.fr/api/entretiens") // HTTPS pour Netlify
      .then((res) => {
        console.log("Réponse API:", res.data);

        const liste = Array.isArray(res.data)
          ? res.data
          : res.data.entretiens || [];

        console.log("Liste traitée:", liste);

        setEntretiens(liste);
        setFiltered(liste);

        // Création des domaines uniques
        const domainMap = new Map();
        liste.forEach((e) => {
          if (e.domaine) {
            const key = normalizeDomain(e.domaine);
            if (!domainMap.has(key)) {
              domainMap.set(key, formatLabel(key));
            }
          }
        });

        setDomains(
          Array.from(domainMap.entries()).map(([key, label]) => ({
            key,
            label,
          }))
        );
      })
      .catch((err) => console.error("Erreur récupération entretiens :", err));
  }, []);

  // --- Application des filtres ---
  useEffect(() => {
    let data = [...entretiens];

    if (filters.domaine) {
      data = data.filter(
        (e) => normalizeDomain(e.domaine) === filters.domaine
      );
    }

    if (filters.maladie) {
      data = data.filter((e) => {
        if (typeof e.maladie_ou_allergie === "boolean") {
          return filters.maladie === "oui"
            ? e.maladie_ou_allergie === true
            : e.maladie_ou_allergie === false;
        }
        return (
          e.maladie_ou_allergie?.toLowerCase() ===
          filters.maladie.toLowerCase()
        );
      });
    }

    if (filters.dateEntretien) {
      data = data.filter(
        (e) =>
          e.created_at?.slice(0, 10) === filters.dateEntretien
      );
    }

    if (filters.nom) {
      data = data.filter((e) =>
        e.nom?.toLowerCase().includes(filters.nom.toLowerCase())
      );
    }

    if (filters.prenom) {
      data = data.filter((e) =>
        e.prenom?.toLowerCase().includes(filters.prenom.toLowerCase())
      );
    }

    setFiltered(data);
  }, [filters, entretiens]);

  return (
    <div className="container mt-5">
      <h2 className="mb-2" style={{ paddingTop: "70px" }}>
        Liste des Entretiens
      </h2>

      {/* Filtres */}
      <div className="d-flex flex-nowrap align-items-center gap-3 p-3 bg-light rounded shadow-sm mb-4 overflow-auto">
        <select
          className="form-select"
          style={{ minWidth: "150px" }}
          value={filters.domaine}
          onChange={(e) => setFilters({ ...filters, domaine: e.target.value })}
        >
          <option value="">Domaine</option>
          {domains.map((d) => (
            <option key={d.key} value={d.key}>
              {d.label}
            </option>
          ))}
        </select>

        <select
          className="form-select"
          style={{ minWidth: "120px" }}
          value={filters.maladie}
          onChange={(e) => setFilters({ ...filters, maladie: e.target.value })}
        >
          <option value="">Maladie</option>
          <option value="oui">Oui</option>
          <option value="non">Non</option>
        </select>

        <input
          type="date"
          className="form-control"
          style={{ minWidth: "150px" }}
          value={filters.dateEntretien}
          onChange={(e) => setFilters({ ...filters, dateEntretien: e.target.value })}
        />

        <input
          type="text"
          className="form-control"
          style={{ minWidth: "150px" }}
          placeholder="Prénom"
          value={filters.prenom}
          onChange={(e) => setFilters({ ...filters, prenom: e.target.value })}
        />

        <input
          type="text"
          className="form-control"
          style={{ minWidth: "150px" }}
          placeholder="Nom"
          value={filters.nom}
          onChange={(e) => setFilters({ ...filters, nom: e.target.value })}
        />
      </div>

      {/* Tableau */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
             currentItems.map((entretien) => (
              <tr key={entretien.id}>
                <td>{entretien.id}</td>
                <td>{entretien.nom}</td>
                <td>{entretien.prenom}</td>
                <td>
                  {entretien.created_at
                    ? new Date(entretien.created_at).toLocaleDateString("fr-FR")
                    : ""}
                </td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => navigate(`/entretien/${entretien.id}`)}
                  >
                    Voir
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/edit-entretien/${entretien.id}`)}
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Aucun entretien trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
          <button
            className="btn btn-dark"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ◀ Précédent
          </button>

          <span>
            Page {currentPage} / {totalPages}
          </span>

          <button
            className="btn btn-dark"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Suivant ▶
          </button>
        </div>

            </div>
          );
        };

export default ListEntretiens;
