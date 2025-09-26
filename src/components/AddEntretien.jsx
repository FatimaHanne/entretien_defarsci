import React, { useState } from "react";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";
import {
  Person,
  GeoAlt,
  Book,
  Heart,
  People,
  Eye,
  Bullseye,
  Lightning,
  ExclamationTriangle,
  Save,
} from "react-bootstrap-icons";

// Composant pour les inputs modernes
const ModernInput = ({ label, name, value, onChange, placeholder, type = "textarea", rows = 3, icon: Icon }) => {
  if (type === "text" || type === "date") {
    return (
      <div className="mb-3">
        <label className="form-label d-flex align-items-center">
          {Icon && <Icon className="me-2" />}
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control"
        />
      </div>
    );
  }
  return (
    <div className="mb-3">
      <label className="form-label d-flex align-items-center">
        {Icon && <Icon className="me-2" />}
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  );
};

// Composant pour les sections de formulaire
const FormSection = ({ title, subtitle, icon: Icon, children, color = "primary" }) => {
  const colors = {
    primary: "bg-primary text-white",
    success: "bg-success text-white",
    danger: "bg-danger text-white",
    warning: "bg-warning text-dark",
    info: "bg-info text-white",
    secondary: "bg-secondary text-white",
  };

  return (
    <div className="card shadow mb-4">
      <div className={`card-header d-flex align-items-center ${colors[color]}`}>
        <div className="me-3 p-2 bg-white bg-opacity-25 rounded">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h5 className="mb-0">{title}</h5>
          <small>{subtitle}</small>
        </div>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

const AddEntretien = () => {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    adresse: "",
    domaine: "",
    pourquoiChoix: "",
    participants: "",
    presentationBref: "",
    presentationDetail: "",
    commentVoyezDefarSci: "",
    quAttendezDeDefarSci: "",
    atouts: "",
    faiblesses: "",
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (statusType) => {
    const requiredFields = [
      "prenom",
      "nom",
      "adresse",
      "domaine",
      "pourquoiChoix",
      "participants",
      "presentationBref",
    ];

    if (statusType === "complete") {
      const emptyFields = requiredFields.filter((field) => !formData[field]?.trim());
      if (emptyFields.length > 0) {
        setToast({
          show: true,
          message: "Veuillez remplir toutes les informations obligatoires !",
          type: "danger",
        });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
        return;
      }
    }

    try {
      if (statusType === "draft") {
        await axios.post("http://entretiens.defarsci.fr/api/brouillons", formData);
        setToast({ show: true, message: "Brouillon enregistré", type: "warning" });
      } else {
        await axios.post("http://entretiens.defarsci.fr/api/entretiens", {
          ...formData,
          dateEntretien: new Date().toISOString(),
        });
        setToast({ show: true, message: "Entretien enregistré", type: "success" });
        setFormData({
          prenom: "",
          nom: "",
          adresse: "",
          domaine: "",
          pourquoiChoix: "",
          participants: "",
          presentationBref: "",
          presentationDetail: "",
          commentVoyezDefarSci: "",
          quAttendezDeDefarSci: "",
          atouts: "",
          faiblesses: "",
        });
      }
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (err) {
      console.error("Erreur :", err);
      setToast({ show: true, message: "Erreur lors de l'enregistrement", type: "danger" });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <ToastContainer className="position-fixed top-0 end-0 p-3">
        <Toast
          show={toast.show}
          bg={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "" })}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <Save className="me-2" />
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className={toast.type === "warning" ? "text-dark" : "text-white"}>
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="container">
        <div className="card shadow p-4 mt-5">
          <h2 className="h4 mb-5">Nouveau candidat</h2>

          <div className="row">
            <div className="col-lg-8">
              <FormSection title="Profil candidat" subtitle="Informations de base" icon={Person} color="primary">
                <div className="row">
                  <div className="col-md-6">
                    <ModernInput label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom du candidat" type="text" icon={Person} />
                  </div>
                  <div className="col-md-6">
                    <ModernInput label="Nom" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom de famille" type="text" icon={Person} />
                  </div>
                </div>
                <ModernInput label="Adresse" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse complète" type="text" icon={GeoAlt} />
              </FormSection>

              <FormSection title="Orientation académique" subtitle="Choix et motivation" icon={Book} color="success">
                <ModernInput label="Domaine choisi" name="domaine" value={formData.domaine} onChange={handleChange} placeholder="Ex: Informatique" rows={1} icon={Book} />
                <ModernInput label="Motivation" name="pourquoiChoix" value={formData.pourquoiChoix} onChange={handleChange} placeholder="Pourquoi ce domaine ?" rows={4} icon={Heart} />
              </FormSection>

              <FormSection title="Présentation candidat" subtitle="Profil et parcours" icon={People} color="danger">
                <ModernInput label="Équipe d'évaluation" name="participants" value={formData.participants} onChange={handleChange} placeholder="Responsables de l'entretien" rows={2} icon={People} />
                <div className="row">
                  <div className="col-md-6">
                    <ModernInput label="Résumé express" name="presentationBref" value={formData.presentationBref} onChange={handleChange} placeholder="Présentation en une phrase" rows={3} />
                  </div>
                  <div className="col-md-6">
                    <ModernInput label="Profil détaillé" name="presentationDetail" value={formData.presentationDetail} onChange={handleChange} placeholder="Parcours, formations, expériences..." rows={3} />
                  </div>
                </div>
              </FormSection>
            </div>

            <div className="col-lg-4">
              <FormSection title="Vision & attentes" subtitle="Perspective du candidat" icon={Eye} color="warning">
                <ModernInput label="Vision DEFAR SCI" name="commentVoyezDefarSci" value={formData.commentVoyezDefarSci} onChange={handleChange} placeholder="Comment voyez-vous l'école ?" rows={4} icon={Eye} />
                <ModernInput label="Attentes" name="quAttendezDeDefarSci" value={formData.quAttendezDeDefarSci} onChange={handleChange} placeholder="Que souhaitez-vous accomplir ?" rows={4} icon={Bullseye} />
              </FormSection>

              <FormSection title="Évaluation" subtitle="Forces et développement" icon={Lightning} color="info">
                <ModernInput label="Points forts" name="atouts" value={formData.atouts} onChange={handleChange} placeholder="Compétences et atouts principaux" rows={4} icon={Lightning} />
                <ModernInput label="Axes d'amélioration" name="faiblesses" value={formData.faiblesses} onChange={handleChange} placeholder="Domaines à développer" rows={4} icon={ExclamationTriangle} />
              </FormSection>
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button onClick={() => handleSave("draft")} className="btn btn-secondary d-flex align-items-center gap-1">
              <Save className="w-4 h-4" /> Brouillon
            </button>
            <button onClick={() => handleSave("complete")} className="btn btn-primary">
              Valider l'entretien
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEntretien;
