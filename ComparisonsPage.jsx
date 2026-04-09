import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { C, SECTORS } from "../data";
import { BackBtn, SectionTitle, CalendlyBtn, GoldBtn } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function SectorsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Executive Search by Sector | Industry-Specialist Headhunters UK";
    const cleanup = injectSchema(createBreadcrumbSchema([
      { name: "Home", url: "https://headhunters.co.uk" },
      { name: "Sectors", url: "https://headhunters.co.uk/sectors" }
    ]));
    return cleanup;
  }, []);

  return (
    <div style={{ padding: "60px 20px 80px", maxWidth: 1100, margin: "0 auto" }}>
      <BackBtn label="Home" onClick={() => navigate("/")} />
      <h1 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:800,color:C.dark,textAlign:"center",margin:"0 0 16px"}}>Executive Search by Industry Sector</h1>
      <p style={{ fontSize: 15, color: C.tl, maxWidth: 700, margin: "0 auto 40px", textAlign: "center" }}>
        Specialist headhunters with deep sector expertise across 12 major industries.
      </p>
      <EnquiryBox
        title="Looking to hire in a specific sector?"
        subtitle="Connect with consultants who specialize in your industry"
        buttonText="Request a Consultation"
        context="Enquiry from Sectors page"
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
        {SECTORS.map(s => <div key={s.id} onClick={() => navigate(`/sectors/${s.id}`)} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 8, padding: 24, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = C.accent; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = C.bd; }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.tx, margin: "0 0 8px" }}>{s.name}</h3>
          <p style={{ fontSize: 13, color: C.tl, lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
        </div>)}
      </div>
      <div style={{ marginTop: 48, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <CalendlyBtn>Book Free Consultation</CalendlyBtn>
        <GoldBtn onClick={() => navigate("/contact")}>Brief a Headhunter</GoldBtn>
      </div>
    </div>
  );
}
