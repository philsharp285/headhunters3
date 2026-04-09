import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { C, SALARY } from "../data";
import { BackBtn, GoldBtn, SectionTitle } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function SalaryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "UK Executive Salary Benchmarks | C-Suite Compensation Data";
    const cleanup = injectSchema(createBreadcrumbSchema([
      { name: "Home", url: "https://headhunters.co.uk" },
      { name: "Salary Benchmarks", url: "https://headhunters.co.uk/salary-benchmarks" }
    ]));
    return cleanup;
  }, []);

  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="Resources" onClick={()=>navigate("/resources")}/>
    <h1 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:800,color:C.dark,textAlign:"center",margin:"0 0 16px"}}>UK Executive Salary Benchmarks</h1>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      Typical salary ranges for senior executive roles in the UK (updated quarterly).
    </p>
    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:20,marginBottom:32,fontSize:13,color:C.tx}}>
      <strong>Note:</strong> Ranges reflect base salary only and exclude bonuses, equity, and benefits. Total compensation packages typically add 20–50% depending on role and sector.
    </div>
    <div style={{display:"grid",gap:16}}>
      {SALARY.map((s,i)=><div key={i} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:20,display:"grid",gridTemplateColumns:"1fr auto auto auto",gap:16,alignItems:"center"}}>
        <div style={{fontSize:16,fontWeight:700,color:C.tx}}>{s.role}</div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:11,color:C.tl,marginBottom:2}}>Lower Quartile</div>
          <div style={{fontSize:15,fontWeight:600,color:C.tx}}>£{s.low}k</div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:11,color:C.tl,marginBottom:2}}>Median</div>
          <div style={{fontSize:15,fontWeight:600,color:C.accent}}>£{s.mid}k</div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:11,color:C.tl,marginBottom:2}}>Upper Quartile</div>
          <div style={{fontSize:15,fontWeight:600,color:C.tx}}>£{s.high}k</div>
        </div>
      </div>)}
    </div>
    <EnquiryBox
      title="Planning an executive hire?"
      subtitle="Get a personalized assessment and fee estimate"
      buttonText="Get Expert Advice"
      context="Enquiry from Salary Benchmarks page"
    />
    <div style={{marginTop:40,textAlign:"center"}}>
      <p style={{fontSize:14,color:C.tl,marginBottom:20}}>Need a precise fee estimate for your role?</p>
      <GoldBtn onClick={()=>navigate("/estimator")}>Use Fee Estimator →</GoldBtn>
    </div>
  </div>;
}
