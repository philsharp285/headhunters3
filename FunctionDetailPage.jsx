import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { C, SECTORS } from "../data";
import { BackBtn, GoldBtn } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function SectorDetailPage() {
  const navigate = useNavigate();
  const { sectorId } = useParams();
  const sector = SECTORS.find(s => s.id === sectorId);

  useEffect(() => {
    if (sector) {
      document.title = `${sector.name} | headhunters.co.uk`;
      const cleanup = injectSchema(createBreadcrumbSchema([
        { name: "Home", url: "https://headhunters.co.uk" },
        { name: "Sectors", url: "https://headhunters.co.uk/sectors" },
        { name: sector.name, url: `https://headhunters.co.uk/sectors/${sector.id}` }
      ]));
      return cleanup;
    }
  }, [sector]);

  if (!sector) {
    return (
      <div style={{padding: "60px 20px 80px", maxWidth: 1000, margin: "0 auto"}}>
        <BackBtn label="All Sectors" onClick={() => navigate("/sectors")} />
        <h1 style={{fontSize: 32, fontWeight: 750, color: C.dark, margin: "0 0 20px"}}>Sector not found</h1>
        <button onClick={() => navigate("/sectors")} style={{background:C.accent,color:"#fff",border:"none",padding:"11px 22px",borderRadius:6,fontSize:14,fontWeight:700,cursor:"pointer"}}>
          View All Sectors
        </button>
      </div>
    );
  }

  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="All Sectors" onClick={()=>navigate("/sectors")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:56,marginBottom:12}}>{sector.icon}</div>
      <h1 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>{sector.name}</h1>
      <p style={{fontSize:16,color:C.tl,fontWeight:500}}>{sector.desc}</p>
    </div>

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:28,marginBottom:32}}>
      <h2 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 16px"}}>Overview</h2>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:0}}>{sector.intro}</p>
    </div>

    <EnquiryBox
      title={`Hiring in ${sector.name}?`}
      subtitle="Get expert advice from specialist consultants"
      buttonText="Request a Free Consultation"
      context={`Enquiry from sector: ${sector.name}`}
    />

    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Typical Roles</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
        {sector.roles.map((r,i)=><div key={i} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:6,padding:"10px 14px",fontSize:14,fontWeight:500,color:C.tx}}>{r}</div>)}
      </div>
    </div>

    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Key Challenges</h2>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx}}>{sector.challenges}</p>
    </div>

    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Why Use Executive Search</h2>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx}}>{sector.whySearch}</p>
    </div>

    <div style={{background:`linear-gradient(135deg,${C.dark}dd,${C.accent}dd)`,borderRadius:8,padding:24,color:"#fff"}}>
      <h3 style={{fontSize:17,fontWeight:700,margin:"0 0 8px"}}>Typical Fees</h3>
      <p style={{fontSize:15,margin:0,opacity:0.95}}>{sector.fees}</p>
    </div>

    <div style={{marginTop:60,textAlign:"center"}}>
      <GoldBtn onClick={()=>navigate("/contact")}>Discuss Your {sector.name} Search →</GoldBtn>
    </div>
  </div>;
}
