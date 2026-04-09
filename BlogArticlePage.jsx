import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { C } from "../data";
import { BackBtn, Btn } from "../components/Buttons";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function ContactPage() {
  const navigate = useNavigate();
  const [form,setForm]=useState({name:"",email:"",company:"",role:"",salary:"",urgency:"",message:""});
  const [submitted,setSubmitted]=useState(false);
  const [submitting,setSubmitting]=useState(false);
  const [error,setError]=useState("");

  useEffect(() => {
    document.title = "Contact Executive Search Headhunters | Get Expert Recruitment Advice";
    const cleanup = injectSchema(createBreadcrumbSchema([
      { name: "Home", url: "https://headhunters.co.uk" },
      { name: "Contact", url: "https://headhunters.co.uk/contact" }
    ]));
    return cleanup;
  }, []);

  const update=(k,v)=>setForm({...form,[k]:v});

  const submit=async(e)=>{
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-enquiry`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send enquiry");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Unable to send your enquiry. Please try again or email directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if(submitted){
    return <div style={{padding:"60px 20px 80px",maxWidth:600,margin:"0 auto",textAlign:"center"}}>
      <div style={{fontSize:64,marginBottom:20}}>✓</div>
      <h1 style={{fontSize:32,fontWeight:750,color:C.ok,margin:"0 0 16px"}}>Thank You</h1>
      <p style={{fontSize:16,color:C.tx,lineHeight:1.6,marginBottom:24}}>
        Your brief has been received. A specialist consultant will be in touch within 2 hours during business hours.
      </p>
      <Btn onClick={()=>navigate("/")}>← Back to Home</Btn>
    </div>;
  }

  return <div style={{padding:"60px 20px 80px",maxWidth:700,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>navigate("/")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:48,marginBottom:12}}>📋</div>
      <h1 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>Brief a Headhunter</h1>
      <p style={{fontSize:15,color:C.tl}}>Tell us about your search and a specialist consultant will be in touch.</p>
      <p style={{fontSize:13,color:C.gold,fontWeight:600,margin:"8px 0 0"}}>⚡ Typical response within 2 hours</p>
    </div>

    <form onSubmit={submit} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:32}}>
      <div style={{display:"grid",gap:20}}>
        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Your Name *</label>
          <input required type="text" value={form.name} onChange={e=>update("name",e.target.value)} placeholder="John Smith" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
        </div>

        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Email Address *</label>
          <input required type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="john.smith@company.com" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
        </div>

        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Company</label>
          <input type="text" value={form.company} onChange={e=>update("company",e.target.value)} placeholder="Company name" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
        </div>

        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Role You're Hiring For *</label>
          <input required type="text" value={form.role} onChange={e=>update("role",e.target.value)} placeholder="e.g., CFO, Sales Director, CTO" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div>
            <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Salary Range</label>
            <input type="text" value={form.salary} onChange={e=>update("salary",e.target.value)} placeholder="e.g., £120k-£150k" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
          </div>
          <div>
            <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Timeline</label>
            <select value={form.urgency} onChange={e=>update("urgency",e.target.value)} style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}>
              <option value="">Select...</option>
              <option value="critical">Critical (0-4 weeks)</option>
              <option value="important">Important (1-3 months)</option>
              <option value="planning">Planning (3-6 months)</option>
              <option value="exploratory">Exploratory</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Brief Description</label>
          <textarea value={form.message} onChange={e=>update("message",e.target.value)} placeholder="Tell us about the role, your organisation, and what you're looking for..." rows="5" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx,fontFamily:"inherit",resize:"vertical"}}/>
        </div>

        <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:6,padding:16,fontSize:13,color:C.tl,lineHeight:1.6}}>
          <strong style={{color:C.tx}}>What happens next:</strong> A specialist consultant will review your brief and contact you within 2 hours during business hours to discuss your search.
        </div>

        {error && (
          <div style={{background:"#fee",border:"1px solid #fcc",borderRadius:6,padding:16,fontSize:14,color:"#c33"}}>
            {error}
          </div>
        )}

        <button type="submit" disabled={submitting} style={{width:"100%",padding:"14px",fontSize:16,fontWeight:700,background:submitting?"#ccc":`linear-gradient(135deg,${C.gold},${C.gold}dd)`,color:"#fff",border:"none",borderRadius:6,cursor:submitting?"not-allowed":"pointer",transition:"all 0.2s",opacity:submitting?0.6:1}} onMouseEnter={e=>!submitting&&(e.currentTarget.style.transform="translateY(-2px)")} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
          {submitting ? "Sending..." : "Submit Brief →"}
        </button>
      </div>
    </form>
  </div>;
}
