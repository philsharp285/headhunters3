import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { C, LOCS } from "../data";
import { BackBtn, GoldBtn, CalendlyCTA, renderBody } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function LocationPage() {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const loc = LOCS.find(l => l.c.toLowerCase() === locationId?.toLowerCase());

  useEffect(() => {
    if (loc) {
      document.title = `Executive Search in ${loc.c} | headhunters.co.uk`;
      const cleanup = injectSchema(createBreadcrumbSchema([
        { name: "Home", url: "https://headhunters.co.uk" },
        { name: "Locations", url: "https://headhunters.co.uk/locations" },
        { name: loc.c, url: `https://headhunters.co.uk/locations/${loc.c.toLowerCase()}` }
      ]));
      return cleanup;
    }
  }, [loc]);

  if (!loc) {
    return (
      <div style={{padding: "60px 20px 80px", maxWidth: 1000, margin: "0 auto"}}>
        <BackBtn label="All Locations" onClick={() => navigate("/locations")} />
        <h1 style={{fontSize: 32, fontWeight: 750, color: C.dark, margin: "0 0 20px"}}>Location not found</h1>
        <button onClick={() => navigate("/locations")} style={{background:C.accent,color:"#fff",border:"none",padding:"11px 22px",borderRadius:6,fontSize:14,fontWeight:700,cursor:"pointer"}}>
          View All Locations
        </button>
      </div>
    );
  }

  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="All Locations" onClick={()=>navigate("/locations")}/>
    <h1 style={{fontSize:"clamp(30px,5vw,42px)",fontWeight:750,color:C.tx,margin:"0 0 12px",textAlign:"center"}}>Executive Search in {loc.c}</h1>
    <p style={{fontSize:14,color:C.tl,textAlign:"center",margin:"0 0 32px"}}>Specialist headhunters for senior appointments in {loc.c}</p>

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:28,marginBottom:32}}>
      {renderBody(loc.p)}
    </div>

    <EnquiryBox
      title={`Looking to hire in ${loc.c}?`}
      subtitle="Speak with a specialist about your executive search needs"
      buttonText="Request a Consultation"
      context={`Enquiry from location: ${loc.c}`}
    />

    <div style={{marginBottom:40}}>
      <h2 style={{fontSize:22,fontWeight:700,color:C.tx,margin:"0 0 20px",borderBottom:`2px solid ${C.accent}`,paddingBottom:10}}>Typical Executive Roles in {loc.c}</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
        {loc.roles.map((r,i)=><div key={i} onClick={()=>navigate(`/guide/${r.link}`)} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:"12px 16px",cursor:"pointer",transition:"all 0.2s",textAlign:"center"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.background=C.accent+"08";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bd;e.currentTarget.style.background=C.card;}}>
          <span style={{fontSize:14,fontWeight:600,color:C.dark}}>{r.title}</span>
          <div style={{fontSize:11,color:C.accent,marginTop:4,fontWeight:600}}>View Guide →</div>
        </div>)}
      </div>
    </div>

    <CalendlyCTA/>

    <div style={{marginTop:40,textAlign:"center"}}>
      <GoldBtn onClick={()=>navigate("/contact")}>Request a Callback for Your {loc.c} Search →</GoldBtn>
    </div>
  </div>;
}
