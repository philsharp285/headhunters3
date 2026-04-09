import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { C, STATS } from "../data";
import { BackBtn, SectionTitle } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function StatsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Executive Search Statistics | headhunters.co.uk";
    const cleanup = injectSchema(createBreadcrumbSchema([
      { name: "Home", url: "https://headhunters.co.uk" },
      { name: "Statistics", url: "https://headhunters.co.uk/statistics" }
    ]));
    return cleanup;
  }, []);

  return (
    <div style={{ padding: "60px 20px 80px", maxWidth: 1000, margin: "0 auto" }}>
      <BackBtn label="Home" onClick={() => navigate("/")} />
      <SectionTitle title="Executive Search Statistics" />
      <p style={{ fontSize: 15, color: C.tl, maxWidth: 700, margin: "0 auto 40px", textAlign: "center" }}>
        Authoritative UK executive search data points — market benchmarks, timelines, and industry standards.
      </p>
      <div style={{ display: "grid", gap: 20 }}>
        {STATS.map((st, i) => <div key={i} style={{ background: C.card, border: `1px solid ${C.bd}`, borderRadius: 8, padding: 24, display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "center" }}>
          <div style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, color: C.accent, textAlign: "center", minWidth: 140 }}>{st.s}</div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 600, color: C.tx, margin: "0 0 6px", lineHeight: 1.4 }}>{st.l}</p>
            <p style={{ fontSize: 12, color: C.tl, margin: 0, fontStyle: "italic" }}>Source: {st.src}</p>
          </div>
        </div>)}
      </div>
      <EnquiryBox
        title="Need help with your executive search?"
        subtitle="Get a personalized assessment from an expert consultant"
        buttonText="Request a Free Consultation"
        context="Enquiry from Statistics page"
      />
    </div>
  );
}
