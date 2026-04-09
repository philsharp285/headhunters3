import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { C } from "../data";
import { BackBtn, SectionTitle, CalendlyBtn, GoldBtn } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function ResourcesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Executive Search Resources | Headhunter Tools, Guides & Salary Data";
    const cleanup = injectSchema(createBreadcrumbSchema([
      { name: "Home", url: "https://headhunters.co.uk" },
      { name: "Resources", url: "https://headhunters.co.uk/resources" }
    ]));
    return cleanup;
  }, []);

  const resources=[
    {title:"Fee Estimator",desc:"Calculate the cost of a retained executive search",icon:"💷",action:()=>navigate("/estimator")},
    {title:"Do I Need a Headhunter?",desc:"5-question quiz to help you decide",icon:"🎯",action:()=>navigate("/quiz")},
    {title:"Comprehensive Guides",desc:"Expert guides on executive search",icon:"📚",action:()=>navigate("/guides")},
    {title:"UK Statistics",desc:"Authoritative data on executive search",icon:"📊",action:()=>navigate("/statistics")},
    {title:"Glossary",desc:"Executive search terminology explained",icon:"📖",action:()=>navigate("/glossary")},
    {title:"Salary Benchmarks",desc:"UK senior executive salary ranges",icon:"💰",action:()=>navigate("/salaries")}
  ];

  return <div style={{padding:"60px 20px 80px",maxWidth:1000,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>navigate("/")}/>
    <h1 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:800,color:C.dark,textAlign:"center",margin:"0 0 16px"}}>Executive Search Resources & Tools</h1>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      Free tools, expert guides, and comprehensive data to support your headhunter selection and senior executive hiring decisions.
    </p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
      {resources.map((r,i)=><div key={i} onClick={r.action} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";e.currentTarget.style.borderColor=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor=C.bd;}}>
        <div style={{fontSize:40,marginBottom:12}}>{r.icon}</div>
        <h3 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 8px"}}>{r.title}</h3>
        <p style={{fontSize:13,color:C.tl,lineHeight:1.5,margin:0}}>{r.desc}</p>
      </div>)}
    </div>
    <EnquiryBox
      title="Ready to start your executive search?"
      subtitle="Get expert guidance tailored to your specific requirements"
      buttonText="Speak to a Specialist"
      context="Enquiry from Resources page"
    />
    <div style={{marginTop:40,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      <CalendlyBtn>Book Free Consultation</CalendlyBtn>
      <GoldBtn onClick={()=>navigate("/contact")}>Brief a Headhunter</GoldBtn>
    </div>
  </div>;
}
