import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { C, FUNCTIONS } from "../data";
import { BackBtn, GoldBtn } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function FunctionDetailPage() {
  const navigate = useNavigate();
  const { functionId } = useParams();
  const func = FUNCTIONS.find(f => f.id === functionId);

  useEffect(() => {
    if (func) {
      document.title = `${func.fullName} (${func.name}) | headhunters.co.uk`;
      const cleanup = injectSchema(createBreadcrumbSchema([
        { name: "Home", url: "https://headhunters.co.uk" },
        { name: "Functions", url: "https://headhunters.co.uk/functions" },
        { name: func.name, url: `https://headhunters.co.uk/functions/${func.id}` }
      ]));
      return cleanup;
    }
  }, [func]);

  if (!func) {
    return (
      <div style={{padding: "60px 20px 80px", maxWidth: 1000, margin: "0 auto"}}>
        <BackBtn label="All Functions" onClick={() => navigate("/functions")} />
        <h1 style={{fontSize: 32, fontWeight: 750, color: C.dark, margin: "0 0 20px"}}>Function not found</h1>
        <button onClick={() => navigate("/functions")} style={{background:C.accent,color:"#fff",border:"none",padding:"11px 22px",borderRadius:6,fontSize:14,fontWeight:700,cursor:"pointer"}}>
          View All Functions
        </button>
      </div>
    );
  }

  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="All Functions" onClick={()=>navigate("/functions")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:56,marginBottom:12}}>{func.icon}</div>
      <h1 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>{func.fullName} ({func.name})</h1>
      <p style={{fontSize:16,color:C.tl,fontWeight:500}}>{func.desc}</p>
    </div>

    {func.intro && <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:28,marginBottom:32}}>
      <h2 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 16px"}}>Overview</h2>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:0}}>{func.intro}</p>
    </div>}

    <EnquiryBox
      title={`Hiring a ${func.name}?`}
      subtitle="Get expert advice from specialist consultants"
      buttonText="Request a Free Consultation"
      context={`Enquiry from function: ${func.name}`}
    />

    {func.roles && func.roles.length > 0 && <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Related Roles</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
        {func.roles.map((r,i)=><div key={i} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:6,padding:"10px 14px",fontSize:14,fontWeight:500,color:C.tx}}>{r}</div>)}
      </div>
    </div>}

    {func.challenges && <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Key Hiring Challenges</h2>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx}}>{func.challenges}</p>
    </div>}

    {func.whySearch && <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Why Use Executive Search</h2>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx}}>{func.whySearch}</p>
    </div>}

    {func.fees && <div style={{background:`linear-gradient(135deg,${C.dark}dd,${C.accent}dd)`,borderRadius:8,padding:24,color:"#fff",marginBottom:32}}>
      <h3 style={{fontSize:17,fontWeight:700,margin:"0 0 8px"}}>Typical Fees</h3>
      <p style={{fontSize:15,margin:0,opacity:0.95}}>{func.fees}</p>
    </div>}

    <div style={{marginTop:60,textAlign:"center"}}>
      <GoldBtn onClick={()=>navigate("/contact")}>Discuss Your {func.name} Search →</GoldBtn>
    </div>
  </div>;
}
