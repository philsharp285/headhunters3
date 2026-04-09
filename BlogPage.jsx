import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { C, COMPARISONS } from "../data";
import { BackBtn, GoldBtn, Btn, CalendlyCTA } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBreadcrumbSchema, injectSchema } from "../utils/schema";

export default function ComparisonPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const comp = COMPARISONS.find(c => c.id === id);

  useEffect(() => {
    if (comp) {
      document.title = `${comp.title} | headhunters.co.uk`;
      const cleanup = injectSchema(createBreadcrumbSchema([
        { name: "Home", url: "https://headhunters.co.uk" },
        { name: "Comparisons", url: "https://headhunters.co.uk/comparisons" },
        { name: comp.title, url: `https://headhunters.co.uk/comparisons/${comp.id}` }
      ]));
      return cleanup;
    }
  }, [comp]);

  if (!comp) {
    return (
      <div style={{padding: "60px 20px 80px", maxWidth: 1000, margin: "0 auto"}}>
        <BackBtn label="All Comparisons" onClick={() => navigate("/comparisons")} />
        <h1 style={{fontSize: 32, fontWeight: 750, color: C.dark, margin: "0 0 20px"}}>Comparison not found</h1>
        <button onClick={() => navigate("/comparisons")} style={{background:C.accent,color:"#fff",border:"none",padding:"11px 22px",borderRadius:6,fontSize:14,fontWeight:700,cursor:"pointer"}}>
          View All Comparisons
        </button>
      </div>
    );
  }

  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="All Comparisons" onClick={()=>navigate("/comparisons")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:56,marginBottom:12}}>{comp.icon}</div>
      <h1 style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>{comp.title}</h1>
      <p style={{fontSize:16,color:C.tl,lineHeight:1.6,fontWeight:500}}>{comp.subtitle}</p>
    </div>

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,marginBottom:32}}>
      {comp.intro.split('\n\n').map((p,i)=><p key={i} style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:i===0?"0 0 16px":"16px 0"}}>{p}</p>)}
    </div>

    {comp.table&&<div style={{marginBottom:32,overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
        <tbody>
          {comp.table.map((row,i)=><tr key={i} style={{background:i===0?C.accent:i%2===1?C.bg:C.card}}>
            {row.map((cell,j)=><td key={j} style={{padding:12,border:`1px solid ${C.bd}`,color:i===0?"#fff":C.tx,fontWeight:i===0||j===0?600:400}}>{cell}</td>)}
          </tr>)}
        </tbody>
      </table>
    </div>}

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,marginBottom:32}}>
      <h3 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 12px"}}>Verdict</h3>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:0}}>{comp.verdict}</p>
    </div>

    <EnquiryBox
      title="Not sure which approach is right for you?"
      subtitle="Discuss your hiring needs with an expert consultant"
      buttonText="Discuss Your Hire"
      context={`Enquiry from comparison: ${comp.title}`}
    />

    <CalendlyCTA/>

    <div style={{marginTop:40,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      <GoldBtn onClick={()=>navigate("/contact")}>{comp.cta} →</GoldBtn>
      <Btn onClick={()=>navigate("/estimator")}>Calculate Fee</Btn>
    </div>
  </div>;
}
