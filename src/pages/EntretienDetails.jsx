import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const EntretienDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entretien, setEntretien] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  axios
    .get(`https://entretiens.defarsci.fr/api/entretiens/${id}`)
    .then((res) => {
      console.log("Réponse API détail:", res.data);

      // Normalisation de la donnée
      let data = res.data;
      if (data.entretien) {
        data = data.entretien; // cas { entretien: {...} }
      }
      if (Array.isArray(data)) {
        data = data[0]; // cas [ {...} ]
      }

      setEntretien(data || null);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Erreur API:", err);
      setLoading(false);
    });
}, [id]);


  // --- Téléchargement PDF ---
  const handleDownloadPDF = () => {
    if (!entretien) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);
    doc.setTextColor(65, 83, 121);
    doc.text(
      `Entretien de ${entretien.nom} ${entretien.prenom}`,
      pageWidth / 2,
      20,
      { align: "center" }
    );

    let y = 30;
    const cardHeight = 15;
    const cardSpacing = 10;
    const leftMargin = 20;
    const rightMargin = 20;
    const cardWidth = pageWidth - leftMargin - rightMargin;

    Object.entries(entretien)
      .filter(([key]) => key !== "updated_at")
      .forEach(([key, value]) => {
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(leftMargin, y, cardWidth, cardHeight, 2, 2, "F");

        doc.setFillColor(65, 83, 121);
        doc.rect(leftMargin, y, cardWidth, 6, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text(key.replace(/_/g, " "), leftMargin + 2, y + 4);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(value?.toString() || "", leftMargin + 2, y + 12);

        y += cardHeight + cardSpacing;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

    doc.save(`entretien_${entretien.id}.pdf`);
  };

  if (loading)
    return (
      <div className="container mt-5">
        <h3>Chargement...</h3>
      </div>
    );

  if (!entretien)
    return (
      <div className="container mt-5">
        <h3>Aucun entretien trouvé</h3>
        <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>
          Retour
        </button>
      </div>
    );

  return (
    <div className="container mt-5">
      <h2 className="mt-5 fs-2 fw-bold text-dark" style={{ paddingTop: "90px" }}>
        Entretien de {entretien.nom} {entretien.prenom}
      </h2>

      <div className="row g-3 mt-3">
        {Object.entries(entretien)
          .filter(([key]) => key !== "updated_at")
          .map(([key, value]) => (
            <div key={key} className="col-md-4">
              <div
                className="card h-100 shadow-sm border-0"
                style={{ backgroundColor: "#fdfdfd", borderRadius: "10px" }}
              >
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#415379",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    borderRadius: "10px 10px 0 0",
                  }}
                >
                  {key.replace(/_/g, " ")}
                </div>
                <div className="card-body" style={{ color: "black", fontWeight: "bold" }}>
                  {value?.toString()}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-4 d-flex gap-2 flex-wrap">
        <button
          className="btn"
          style={{ backgroundColor: "#6c757d", color: "#fff" }}
          onClick={() => navigate(`/edit-entretien/${entretien.id}`)}
        >
          Modifier
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "#17a2b8", color: "#fff" }}
          onClick={handleDownloadPDF}
        >
          Télécharger PDF
        </button>
        <button
          className="btn"
          style={{
            backgroundColor: "#f8f9fa",
            color: "#212529",
            border: "1px solid #ced4da",
          }}
          onClick={() => navigate(-1)}
        >
          Retour à la liste
        </button>
      </div>
    </div>
  );
};

export default EntretienDetails;
