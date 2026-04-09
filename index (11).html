import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { C, BLOG_ARTICLES } from "../data";
import { BackBtn, GoldBtn, CalendlyBtn, CalendlyCTA } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createBlogSchema, injectSchema } from "../utils/schema";

export default function BlogArticlePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const article = BLOG_ARTICLES.find(a => a.id === id);
  const midPoint = article ? Math.floor(article.sections.length / 2) : 0;

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | headhunters.co.uk`;
      const cleanup = injectSchema(createBlogSchema(article));
      return cleanup;
    }
  }, [article]);

  if (!article) {
    return (
      <div style={{padding: "60px 20px 80px", maxWidth: 1000, margin: "0 auto"}}>
        <BackBtn label="All Insights" onClick={() => navigate("/blog")} />
        <h1 style={{fontSize: 32, fontWeight: 750, color: C.dark, margin: "0 0 20px"}}>Article not found</h1>
        <button onClick={() => navigate("/blog")} style={{background:C.accent,color:"#fff",border:"none",padding:"11px 22px",borderRadius:6,fontSize:14,fontWeight:700,cursor:"pointer"}}>
          View All Insights
        </button>
      </div>
    );
  }

  return <div style={{padding:"60px 20px 80px",maxWidth:800,margin:"0 auto"}}>
    <BackBtn label="All Insights" onClick={()=>navigate("/blog")}/>
    <div style={{marginBottom:32}}>
      <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
        <span style={{display:"inline-block",background:C.accent,color:"#fff",fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:4}}>{article.tag}</span>
        <span style={{fontSize:13,color:C.tl}}>{article.date} • {article.readTime}</span>
      </div>
      <h1 style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>{article.title}</h1>
      <p style={{fontSize:17,color:C.tl,lineHeight:1.6,fontWeight:500,margin:0}}>{article.subtitle}</p>
    </div>
    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,marginBottom:32}}>
      {article.intro.split('\n\n').map((p,i)=><p key={i} style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:i===0?"0 0 16px":"16px 0"}}>{p}</p>)}
    </div>
    <EnquiryBox
      title="Need specific advice for your situation?"
      subtitle="Discuss your requirements with an executive search specialist"
      buttonText="Get a Free Consultation"
      context={`Enquiry from article: ${article.title}`}
      compact
    />
    {article.sections.map((s,i)=><React.Fragment key={i}>
      <div style={{marginBottom:36}}>
        <h2 style={{fontSize:22,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>{s.h}</h2>
        {s.b.split('\n\n').map((p,j)=>{
          if(p.startsWith('**Total:'))return <div key={j} style={{background:C.gold+"11",border:`2px solid ${C.gold}`,borderRadius:6,padding:20,margin:"16px 0",fontSize:17,fontWeight:700,color:C.tx,textAlign:"center"}}>{p.replace(/\*\*/g,'')}</div>;
          if(p.startsWith('-'))return <ul key={j} style={{fontSize:15,lineHeight:1.8,color:C.tx,margin:"16px 0",paddingLeft:20}}>{p.split('\n').map((li,k)=><li key={k} style={{marginBottom:8}}>{li.replace(/^- /,'')}</li>)}</ul>;
          if(p.includes('**'))return <p key={j} style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:"16px 0"}}>{p.split('**').map((t,ti)=>ti%2===1?<strong key={ti} style={{fontWeight:700,color:C.accent}}>{t}</strong>:t)}</p>;
          return <p key={j} style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:"16px 0"}}>{p}</p>;
        })}
      </div>
      {i===midPoint&&<CalendlyCTA/>}
    </React.Fragment>)}
    <div style={{marginTop:60,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      <CalendlyBtn>Book Free Consultation</CalendlyBtn>
      <GoldBtn onClick={()=>navigate("/estimator")}>Calculate Fee & ROI</GoldBtn>
    </div>
  </div>;
}
