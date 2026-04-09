import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { C, GUIDES } from "../data";
import { BackBtn, CalendlyBtn, GoldBtn, CalendlyCTA } from "../components/Buttons";
import { EnquiryBox } from "../components/EnquiryForm";
import { createGuideSchema, injectSchema } from "../utils/schema";
import DownloadGateModal from "../components/DownloadGateModal";

export default function GuidePage() {
  const navigate = useNavigate();
  const { guideId } = useParams();
  const guide = GUIDES.find(g => g.id === guideId);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  useEffect(() => {
    if (guide) {
      document.title = `${guide.title} | Executive Search & Headhunter Guide`;
      const cleanup = injectSchema(createGuideSchema(guide));
      return cleanup;
    }
  }, [guide]);

  if (!guide) {
    navigate("/guides");
    return null;
  }

  const isHiringGuide = guide.id?.startsWith('hire-');
  const midPoint = guide.sections ? Math.floor(guide.sections.length / 2) : 0;

  return (
    <div style={{ padding: "60px 20px 80px", maxWidth: 800, margin: "0 auto" }}>
      <BackBtn label="All Guides" onClick={() => navigate("/guides")} />
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{guide.icon}</div>
        <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 750, color: C.tx, margin: "0 0 12px" }}>{guide.title}</h1>
        {guide.subtitle && <p style={{ fontSize: 16, color: C.tl, lineHeight: 1.6, margin: "0 0 8px" }}>{guide.subtitle}</p>}
        {guide.time && guide.updated && <div style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>{guide.time} • Updated {guide.updated}</div>}
      </div>
      {isHiringGuide && (
        <div style={{background:"linear-gradient(135deg, #1a1a2e 0%, #2563eb 100%)",borderRadius:12,padding:32,textAlign:"center",marginBottom:32,color:"#fff"}}>
          <h3 style={{fontSize:22,fontWeight:700,margin:"0 0 8px",color:"#fff"}}>Download Complete {guide.role} Hiring Pack</h3>
          <p style={{fontSize:15,margin:"0 0 20px",opacity:0.9}}>Sample job description, interview questions, search process guide & more</p>
          <button onClick={() => setShowDownloadModal(true)} style={{background:"#fff",color:"#1a1a2e",border:"none",padding:"14px 32px",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",transition:"transform 0.2s"}} onMouseOver={e => e.target.style.transform = "translateY(-2px)"} onMouseOut={e => e.target.style.transform = "translateY(0)"}>
            Download Free Hiring Pack
          </button>
        </div>
      )}
      <EnquiryBox
        title="Need help with your executive search?"
        subtitle="Get expert guidance tailored to your specific requirements"
        buttonText="Request a Free Consultation"
        context={`Enquiry from guide: ${guide.title}`}
      />
      {isHiringGuide ? (
        <>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:32}}>
            <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:20,textAlign:'center'}}>
              <div style={{fontSize:12,color:C.tl,textTransform:'uppercase',letterSpacing:0.5,marginBottom:4}}>Salary Range</div>
              <div style={{fontSize:18,fontWeight:700,color:C.tx}}>{guide.salaryRange}</div>
            </div>
            <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:20,textAlign:'center'}}>
              <div style={{fontSize:12,color:C.tl,textTransform:'uppercase',letterSpacing:0.5,marginBottom:4}}>Typical Search Fee</div>
              <div style={{fontSize:18,fontWeight:700,color:C.tx}}>{guide.searchFee}</div>
            </div>
            <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:20,textAlign:'center'}}>
              <div style={{fontSize:12,color:C.tl,textTransform:'uppercase',letterSpacing:0.5,marginBottom:4}}>Timeline</div>
              <div style={{fontSize:18,fontWeight:700,color:C.tx}}>{guide.timeline}</div>
            </div>
          </div>

          <h2 style={{fontSize:22,fontWeight:700,color:C.tx,margin:"40px 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>What to Look For</h2>
          <p style={{fontSize:15,lineHeight:1.7,color:C.tx,marginBottom:16}}>{guide.intro}</p>
          {guide.keyQualities && (
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:32}}>
              {guide.keyQualities.map((q,i) => {
                const [title,...rest] = q.split(':');
                return <div key={i} style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:16}}>
                  <h4 style={{fontSize:14,fontWeight:700,marginBottom:4,color:C.tx}}>{title}</h4>
                  <p style={{fontSize:13,margin:0,color:C.tl}}>{rest.join(':').trim()}</p>
                </div>;
              })}
            </div>
          )}

          <h2 style={{fontSize:22,fontWeight:700,color:C.tx,margin:"40px 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>How to Run the Process</h2>
          {guide.hiringGuide?.map((step,i) => (
            <div key={i} style={{display:'flex',gap:16,marginBottom:20}}>
              <div style={{flexShrink:0,width:32,height:32,background:C.dark,color:'#fff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,marginTop:2}}>{i+1}</div>
              <div>
                <h4 style={{fontSize:15,fontWeight:700,marginBottom:4,color:C.tx}}>{step.step}</h4>
                <p style={{fontSize:14,margin:0,color:C.tl}}>{step.detail}</p>
              </div>
            </div>
          ))}

          <h2 style={{fontSize:22,fontWeight:700,color:C.tx,margin:"40px 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Interview Questions to Ask</h2>
          {guide.interviewQuestions?.map((q,i) => (
            <div key={i} style={{background:C.bl,borderLeft:`3px solid ${C.accent}`,padding:'12px 16px',marginBottom:10,borderRadius:'0 6px 6px 0',fontSize:14,color:C.tx}}>{q}</div>
          ))}

          {guide.whySearch && (
            <>
              <h2 style={{fontSize:22,fontWeight:700,color:C.tx,margin:"40px 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Why Use Executive Search</h2>
              <p style={{fontSize:15,lineHeight:1.7,color:C.tx,marginBottom:16}}>{guide.whySearch}</p>
            </>
          )}
        </>
      ) : (
        guide.sections?.map((s, i) => <React.Fragment key={i}>
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.tx, margin: "0 0 16px", borderBottom: `2px solid ${C.accent}`, paddingBottom: 8 }}>{s.h}</h2>
            {s.b.split('\n\n').map((p, j) => {
              if (p.startsWith('|')) return <table key={j} style={{ width: "100%", borderCollapse: "collapse", margin: "16px 0", fontSize: 14 }}><tbody>{p.split('\n').filter(r => !r.includes('---')).map((r, ri) => <tr key={ri}>{r.split('|').filter(c => c.trim()).map((c, ci) => <td key={ci} style={{ border: `1px solid ${C.bd}`, padding: 8, background: ri === 0 ? C.bl : "#fff", fontWeight: ri === 0 ? 600 : 400 }}>{c.trim()}</td>)}</tr>)}</tbody></table>;

              const parseTextWithLinks = (text) => {
                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                if (!linkRegex.test(text)) return text;

                const parts = [];
                let lastIndex = 0;
                const matches = [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];

                matches.forEach((match, idx) => {
                  parts.push(text.slice(lastIndex, match.index));
                  parts.push(<Link key={`link-${j}-${idx}`} to={match[2]} style={{ color: C.accent, fontWeight: 600, textDecoration: "underline" }}>{match[1]}</Link>);
                  lastIndex = match.index + match[0].length;
                });
                parts.push(text.slice(lastIndex));
                return parts;
              };

              if (p.startsWith('**')) return <div key={j} style={{ background: C.bl, border: `1px solid ${C.bd}`, borderRadius: 6, padding: 16, margin: "16px 0" }}>{p.split('\n').map((line, li) => { const m = line.match(/^\*\*(.+?)\*\*\s*(.*)$/); return m ? <p key={li} style={{ margin: "0 0 8px", fontSize: 14 }}><strong style={{ color: C.accent }}>{m[1]}</strong> {parseTextWithLinks(m[2])}</p> : <p key={li} style={{ margin: "0 0 8px", fontSize: 14 }}>{parseTextWithLinks(line)}</p>; })}</div>;

              return <p key={j} style={{ fontSize: 15, lineHeight: 1.7, color: C.tx, margin: "0 0 16px" }}>{parseTextWithLinks(p)}</p>;
            })}
          </div>
          {i === midPoint && <CalendlyCTA />}
        </React.Fragment>)
      )}
      <div style={{ marginTop: 60, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <CalendlyBtn>Book Free Consultation</CalendlyBtn>
        <GoldBtn onClick={() => navigate("/fee-estimator")}>Calculate Your Fee</GoldBtn>
      </div>
      <DownloadGateModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        roleData={guide}
      />
    </div>
  );
}
