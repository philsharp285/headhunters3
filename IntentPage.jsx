import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { C, GUIDES } from "../data";
import { BackBtn, SectionTitle, CalendlyBtn, GoldBtn } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function GuidesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Executive Search & Headhunter Guides | Hiring Best Practices UK";
    const cleanup = injectSchema(createBreadcrumbSchema([
      { name: "Home", url: "https://headhunters.co.uk" },
      { name: "Guides", url: "https://headhunters.co.uk/guides" }
    ]));
    return cleanup;
  }, []);
  
  return <div style={{padding:"60px 20px 80px",maxWidth:1100,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>navigate("/")}/>
    <h1 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:800,color:C.dark,textAlign:"center",margin:"0 0 16px"}}>Executive Search & Headhunter Guides</h1>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 24px",textAlign:"center"}}>
      Expert guides covering every aspect of executive search and headhunting in the UK. Learn how to hire C-suite executives, understand headhunter fees, and navigate the retained search process.
    </p>
    <p style={{fontSize:14,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      Also explore our <span style={{color:C.accent,cursor:"pointer",fontWeight:600,textDecoration:"underline"}} onClick={()=>navigate("/salary-benchmarks")}>executive salary benchmarks</span>, <span style={{color:C.accent,cursor:"pointer",fontWeight:600,textDecoration:"underline"}} onClick={()=>navigate("/sectors")}>sector-specific insights</span>, and <span style={{color:C.accent,cursor:"pointer",fontWeight:600,textDecoration:"underline"}} onClick={()=>navigate("/functions")}>role-specific guidance</span>.
    </p>
    <EnquiryBox
      title="Need personalized guidance?"
      subtitle="Speak with an expert about your executive search requirements"
      buttonText="Request a Free Consultation"
      context="Enquiry from Guides page"
    />
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
      {GUIDES.map(g=><div key={g.id} onClick={()=>navigate(`/guides/${g.id}`)} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";e.currentTarget.style.borderColor=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor=C.bd;}}>
        <div style={{fontSize:32,marginBottom:12}}>{g.icon}</div>
        {g.tag&&<span style={{display:"inline-block",background:C.gold,color:"#fff",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:4,marginBottom:8}}>{g.tag}</span>}
        <h3 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 8px"}}>{g.title}</h3>
        <p style={{fontSize:13,color:C.tl,lineHeight:1.5,margin:"0 0 12px"}}>{g.subtitle}</p>
        <div style={{fontSize:11,color:C.accent,fontWeight:600}}>{g.time} →</div>
      </div>)}
    </div>
    <div style={{marginTop:48,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      <CalendlyBtn>Book Free Consultation</CalendlyBtn>
      <GoldBtn onClick={()=>navigate("/contact")}>Brief a Headhunter</GoldBtn>
    </div>
  </div>;
}
