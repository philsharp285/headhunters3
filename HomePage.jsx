import React from "react";
import { useNavigate } from "react-router-dom";
import { C, CALENDLY_URL } from "../data";

export function Btn({children,onClick,variant="primary",small=false}){
  const s = variant==="primary"
    ? {background:C.accent,color:"#fff",border:"none"}
    : variant==="gold"
    ? {background:C.gold,color:C.dark,border:"none"}
    : {background:"transparent",color:C.accent,border:`1.5px solid ${C.accent}`};
  return <button onClick={onClick} style={{...s,padding:small?"7px 14px":"11px 22px",borderRadius:6,fontSize:small?12:14,fontWeight:700,cursor:"pointer",transition:"opacity .15s"}}>{children}</button>;
}

export function GoldBtn({children,onClick,small=false}){
  return <button onClick={onClick} style={{background:C.gold,color:C.dark,border:"none",padding:small?"7px 14px":"11px 22px",borderRadius:6,fontSize:small?12:14,fontWeight:700,cursor:"pointer"}}>{children}</button>;
}

export function CalendlyBtn({children,small=false}){
  return <button onClick={()=>window.open(CALENDLY_URL,'_blank')} style={{background:`linear-gradient(135deg,${C.accent},${C.al})`,color:"#fff",border:"none",padding:small?"7px 14px":"12px 24px",borderRadius:6,fontSize:small?12:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 12px rgba(15,76,117,0.3)",transition:"transform 0.2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>{children}</button>;
}

export function CalendlyCTA({style={}}){
  return <div style={{background:`linear-gradient(135deg,${C.accent}11,${C.al}11)`,border:`2px solid ${C.accent}`,borderRadius:10,padding:"20px 24px",margin:"32px 0",...style}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
      <div style={{flex:1,minWidth:200}}>
        <h3 style={{fontSize:18,fontWeight:700,color:C.dark,margin:"0 0 6px"}}>Ready to discuss your search?</h3>
        <p style={{fontSize:14,color:C.tl,margin:0}}>Book a free 15-minute consultation with a specialist</p>
      </div>
      <CalendlyBtn>Book Free Consultation →</CalendlyBtn>
    </div>
  </div>;
}

export function CallbackBanner(){
  const navigate = useNavigate();
  return <div style={{background:C.accent+"0D",border:`1px solid ${C.accent}22`,borderRadius:8,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:20}}>
    <div>
      <span style={{fontSize:13,fontWeight:600,color:C.dark}}>Speak to a specialist consultant</span>
      <span style={{fontSize:12,color:C.tl,marginLeft:8}}>Typical response within 2 hours</span>
    </div>
    <GoldBtn onClick={()=>navigate("/contact")} small>Request a Callback →</GoldBtn>
  </div>;
}

export function SectionTitle({title,sub}){
  return <div style={{textAlign:"center",marginBottom:32}}>
    <h2 style={{fontSize:"clamp(22px,3vw,32px)",fontWeight:750,color:C.dark,margin:"0 0 8px"}}>{title}</h2>
    {sub&&<p style={{fontSize:15,color:C.tl,margin:0}}>{sub}</p>}
  </div>;
}

export function Card({children,onClick,style={}}){
  return <div onClick={onClick} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:10,padding:"20px 18px",cursor:onClick?"pointer":"default",...style}}>{children}</div>;
}

export function BackBtn({label,onClick}){
  return <button onClick={onClick} style={{background:"none",border:"none",color:C.accent,fontSize:13,fontWeight:600,cursor:"pointer",padding:0,marginBottom:20}}>← {label||"Back"}</button>;
}

export function renderBody(text){
  return text.split("\n\n").map((para,pi)=>{
    if(para.startsWith("|")){
      const rows=para.trim().split("\n").filter(r=>!r.match(/^\|[-\s|]+\|$/));
      return <div key={pi} style={{overflowX:"auto",margin:"14px 0"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          {rows.map((row,ri)=>{
            const cells=row.split("|").filter((_,ci)=>ci>0&&ci<row.split("|").length-1);
            const Tag=ri===0?"th":"td";
            return <tr key={ri} style={{background:ri===0?C.bl:ri%2===0?C.bg:C.card}}>
              {cells.map((c,ci)=><Tag key={ci} style={{padding:"8px 10px",textAlign:"left",borderBottom:`1px solid ${C.bd}`,fontWeight:ri===0?700:400,fontSize:12}}>{c.trim()}</Tag>)}
            </tr>;
          })}
        </table>
      </div>;
    }
    const lines=para.split("\n");
    return <p key={pi} style={{fontSize:14,lineHeight:1.75,color:C.tx,margin:"0 0 12px"}}>
      {lines.map((line,li)=>{
        const parts=line.split(/(\*\*[^*]+\*\*)/g);
        return <React.Fragment key={li}>
          {li>0&&<br/>}
          {parts.map((p,pj)=>p.startsWith("**")&&p.endsWith("**")?<strong key={pj}>{p.slice(2,-2)}</strong>:<React.Fragment key={pj}>{p}</React.Fragment>)}
        </React.Fragment>;
      })}
    </p>;
  });
}
