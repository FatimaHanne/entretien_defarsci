import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const EntretienDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [entretien, setEntretien] = useState(location.state || null);

  useEffect(() => {
    if (!entretien) {
      axios
        .get("http://entretiens.defarsci.fr/api/entretiens")
        .then((res) => {
          const liste = Array.isArray(res.data) ? res.data : res.data.entretiens;
          const found = liste.find((e) => e.id === parseInt(id));
          setEntretien(found || null);
        })
        .catch((err) => console.error(err));
    }
  }, [entretien, id]);

 const handleDownloadPDF = () => {
  if (!entretien) return;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(16);
  doc.setTextColor(65, 83, 121); // couleur titre similaire header
  doc.text(`Entretien de ${entretien.nom} ${entretien.prenom}`, pageWidth / 2, 20, { align: "center" });

  let y = 30;
  const cardHeight = 15;
  const cardSpacing = 10;
  const leftMargin = 20;
  const rightMargin = 20;
  const cardWidth = pageWidth - leftMargin - rightMargin;

  Object.entries(entretien)
    .filter(([key]) => key !== "updated_at")
    .forEach(([key, value]) => {
      // Card background
      doc.setFillColor(245, 245, 245); // couleur fond similaire
      doc.roundedRect(leftMargin, y, cardWidth, cardHeight, 2, 2, "F");

      // Card header
      doc.setFillColor(65, 83, 121); // bleu header
      doc.rect(leftMargin, y, cardWidth, 6, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(key.replace(/_/g, " "), leftMargin + 2, y + 4);

      // Card body
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(value?.toString() || "", leftMargin + 2, y + 12);

      y += cardHeight + cardSpacing;

      // Nouvelle page si trop bas
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

  doc.save(`entretien_${entretien.id}.pdf`);
};

  if (!entretien) return <div className="container mt-5">Chargement...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-2 fs-2 fw-bold text-dark" style={{paddingTop:"50px"}}>
        Entretien de {entretien.nom} {entretien.prenom}
      </h2>
      <div className="row g-3 mt-3">
        {Object.entries(entretien)
          .filter(([key]) => key !== "updated_at") // ❌ enlève updated_at
          .map(([key, value]) => (
            <div key={key} className="col-md-4">
              <div
                className="card h-100 shadow-sm border-0"
                style={{ backgroundColor: "#fdfdfd", borderRadius: "10px"}}
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
                <div className="card-body" style={{ color: "black",fontWeight:"bold"}}>
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
          style={{ backgroundColor: "#f8f9fa", color: "#212529", border: "1px solid #ced4da" }}
          onClick={() => navigate(-1)}
        >
          Retour à la liste
        </button>
      </div>
    </div>
  );
};

export default EntretienDetails;
