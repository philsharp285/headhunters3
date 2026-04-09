import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { C, ROLES_ESTIMATOR, URGENCY, SCOPE } from "../data";
import { BackBtn, Btn, CalendlyCTA } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function EstimatorPage() {
  const navigate = useNavigate();
  const [role,setRole]=useState("");
  const [salary,setSalary]=useState("");
  const [urgency,setUrgency]=useState(1);
  const [scope,setScope]=useState(0);
  const [showResult,setShowResult]=useState(false);

  useEffect(() => {
    document.title = "Fee Estimator | headhunters.co.uk";
    const cleanup = injectSchema(createBreadcrumbSchema([
      { name: "Home", url: "https://headhunters.co.uk" },
      { name: "Fee Estimator", url: "https://headhunters.co.uk/fee-estimator" }
    ]));
    return cleanup;
  }, []);

  const calc=()=>{
    if(!role||!salary)return null;
    const s=parseInt(salary.replace(/[^0-9]/g,''));
    if(isNaN(s)||s<1)return null;
    const tier=ROLES_ESTIMATOR.find(r=>r.label===role)?.tier||2;
    const base=tier===3?0.30:tier===2?0.28:0.25;
    const urg=URGENCY[urgency];
    const scp=SCOPE[scope];
    const fee=s*base*urg.mult*scp.mult;
    const badHireMin=s*3;
    const badHireMax=s*5;
    const vacancyCost=s*0.15*3;
    const productivityLoss=s*0.6;
    const teamImpact=s*0.25;
    const totalRisk=(badHireMin+badHireMax)/2+vacancyCost+productivityLoss+teamImpact;
    const roi=totalRisk/fee;
    return {fee:Math.round(fee),badHireMin,badHireMax,vacancyCost:Math.round(vacancyCost),productivityLoss:Math.round(productivityLoss),teamImpact:Math.round(teamImpact),totalRisk:Math.round(totalRisk),roi:Math.round(roi*10)/10,weeks:urg.weeks,pct:Math.round(base*urg.mult*scp.mult*100)};
  };

  const res=calc();

  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>navigate("/")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:48,marginBottom:12}}>💷</div>
      <h1 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>Enhanced ROI Fee Calculator</h1>
      <p style={{fontSize:15,color:C.tl}}>Calculate your search fee with full ROI analysis and bad hire cost breakdown</p>
    </div>

    <div style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:32}}>
      <div style={{marginBottom:24}}>
        <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Role Level</label>
        <select value={role} onChange={e=>setRole(e.target.value)} style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}>
          <option value="">Select role...</option>
          {ROLES_ESTIMATOR.map(r=><option key={r.label} value={r.label}>{r.label}</option>)}
        </select>
      </div>

      <div style={{marginBottom:24}}>
        <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Annual Salary (£)</label>
        <input type="text" value={salary} onChange={e=>setSalary(e.target.value)} placeholder="e.g., 150000" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:32}}>
        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:12}}>Urgency</label>
          <select value={urgency} onChange={e=>setUrgency(parseInt(e.target.value))} style={{width:"100%",padding:"12px 16px",fontSize:14,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}>
            {URGENCY.map((u,i)=><option key={i} value={i}>{u.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:12}}>Search Scope</label>
          <select value={scope} onChange={e=>setScope(parseInt(e.target.value))} style={{width:"100%",padding:"12px 16px",fontSize:14,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}>
            {SCOPE.map((s,i)=><option key={i} value={i}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <Btn onClick={()=>setShowResult(true)} style={{width:"100%",padding:"14px",fontSize:16,fontWeight:700}}>Calculate Fee & ROI Analysis</Btn>

      {showResult&&res&&<div style={{marginTop:32}}>
        <div style={{padding:24,background:`linear-gradient(135deg,${C.dark},${C.accent})`,borderRadius:8,color:"#fff",marginBottom:20}}>
          <h3 style={{fontSize:18,fontWeight:700,margin:"0 0 16px",textAlign:"center"}}>Estimated Search Fee</h3>
          <div style={{fontSize:48,fontWeight:800,textAlign:"center",margin:"0 0 8px",color:C.gold}}>£{res.fee.toLocaleString()}</div>
          <div style={{fontSize:14,textAlign:"center",opacity:0.9}}>({res.pct}% of salary • {res.weeks})</div>
        </div>

        <div style={{background:C.bl,border:`2px solid ${C.red}33`,borderRadius:8,padding:24,marginBottom:20}}>
          <h3 style={{fontSize:18,fontWeight:700,color:C.red,margin:"0 0 16px"}}>Cost of a Bad Hire (Full Breakdown)</h3>

          <div style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:14,color:C.tx}}>Direct costs (severance, legal, rehire)</span>
              <span style={{fontSize:16,fontWeight:700,color:C.red}}>£{res.badHireMin.toLocaleString()}–£{res.badHireMax.toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:14,color:C.tx}}>Vacancy cost (3 months at 15%)</span>
              <span style={{fontSize:16,fontWeight:700,color:C.red}}>£{res.vacancyCost.toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:14,color:C.tx}}>Productivity loss (underperformance)</span>
              <span style={{fontSize:16,fontWeight:700,color:C.red}}>£{res.productivityLoss.toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:12,borderBottom:`2px solid ${C.bd}`}}>
              <span style={{fontSize:14,color:C.tx}}>Team impact & turnover</span>
              <span style={{fontSize:16,fontWeight:700,color:C.red}}>£{res.teamImpact.toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12}}>
              <span style={{fontSize:16,fontWeight:700,color:C.dark}}>Total Risk</span>
              <span style={{fontSize:22,fontWeight:800,color:C.red}}>£{res.totalRisk.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div style={{background:`linear-gradient(135deg,${C.ok}22,${C.ok}11)`,border:`2px solid ${C.ok}`,borderRadius:8,padding:24,textAlign:"center"}}>
          <h3 style={{fontSize:18,fontWeight:700,color:C.ok,margin:"0 0 12px"}}>Return on Investment</h3>
          <div style={{fontSize:40,fontWeight:800,color:C.ok,marginBottom:8}}>{res.roi}× ROI</div>
          <p style={{fontSize:14,color:C.tx,margin:0,lineHeight:1.6}}>
            For every £1 spent on retained search, you get £{res.roi} in downside risk protection. This doesn't include the upside value of an exceptional hire.
          </p>
        </div>

        <EnquiryBox
          title="Want a detailed quote for your search?"
          subtitle="Discuss your specific requirements with a specialist"
          buttonText="Request a Detailed Quote"
          context={`Fee estimate: £${res.fee.toLocaleString()} for ${role} role at £${salary} salary`}
        />
      </div>}
    </div>

    <CalendlyCTA style={{marginTop:40}}/>
  </div>;
}
