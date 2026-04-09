import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { C, CALENDLY_URL, GUIDES, INTENT_PAGES, SALARY, SECTORS, FUNCTIONS, COMPARISONS, LOCS, FAQS } from "../data";
import { CalendlyBtn, GoldBtn, SectionTitle, Card, Btn } from "../components/Buttons";
import { createHomeSchema, injectSchema } from "../utils/schema";

export default function HomePage() {
  const [fOpen, setFOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Executive Search & Headhunters UK | Expert Guides, Salary Data & Tools";
    const cleanup = injectSchema(createHomeSchema());
    return cleanup;
  }, []);

  return (
    <div>
      <section style={{ background: `linear-gradient(135deg,${C.dark} 0%,${C.navy} 60%,${C.accent} 100%)`, padding: "100px 20px 70px", textAlign: "center" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: C.gold + "22", border: `1px solid ${C.gold}44`, borderRadius: 20, padding: "4px 14px", fontSize: 12, color: C.gold, fontWeight: 600, marginBottom: 16 }}>UK's leading executive search resource</div>
          <h1 style={{ fontSize: "clamp(32px,5vw,58px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: "0 0 18px", letterSpacing: "-1px" }}>
            UK Executive Search & Headhunters<br /><span style={{ color: C.gold }}>Expert Guides & Resources</span>
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "#ffffffbb", lineHeight: 1.6, margin: "0 0 32px" }}>Independent <span style={{cursor:"pointer",textDecoration:"underline"}} onClick={() => navigate("/guides")}>executive search guides</span>, <span style={{cursor:"pointer",textDecoration:"underline"}} onClick={() => navigate("/salary-benchmarks")}>salary data</span>, and free tools to help you hire C-suite executives with confidence.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <CalendlyBtn>Book Free Consultation</CalendlyBtn>
            <GoldBtn onClick={() => navigate("/contact")}>Brief a Headhunter</GoldBtn>
          </div>
          <p style={{ fontSize: 12, color: "#ffffff66", marginTop: 14 }}>⚡ Free 15-min consultation · No obligation · Expert advice</p>
        </div>
      </section>

      <div style={{ background: C.accent, padding: "14px 20px", textAlign: "center" }}>
        <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Ready to discuss your search? </span>
        <button onClick={() => window.open(CALENDLY_URL, '_blank')} style={{ background: C.gold, color: C.dark, border: "none", padding: "7px 16px", borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: "pointer", marginLeft: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>Book 15-Min Consultation (Free) →</button>
      </div>

      <section style={{ padding: "56px 20px", background: C.bg }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <SectionTitle title="Knowledge Hub" sub="Eight definitive guides to executive search — written by practitioners" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
            {GUIDES.map(g => <Card key={g.id} onClick={() => navigate(`/guides/${g.id}`)}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 26 }}>{g.icon}</span>
                <span style={{ background: C.accent + "15", color: C.accent, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4 }}>{g.tag}</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: C.dark, margin: "0 0 6px" }}>{g.title}</h3>
              <p style={{ fontSize: 13, color: C.tl, lineHeight: 1.5, margin: "0 0 12px" }}>{g.subtitle}</p>
              <span style={{ fontSize: 12, color: C.tl }}>⏱ {g.time}</span>
            </Card>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 20px", background: C.card }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <SectionTitle title="How to Hire Executive Roles" sub="Complete guides with salary benchmarks, interview questions, and hiring strategies" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
            {INTENT_PAGES.filter(p => p.responsibilities).map(p => <Card key={p.id} onClick={() => navigate(`/intent/${p.id}`)}>
              <span style={{ fontSize: 32, marginBottom: 12, display: "block" }}>{p.icon}</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.dark, margin: "0 0 8px" }}>{p.title}</h3>
              <div style={{ fontSize: 13, color: C.tl, marginBottom: 12, lineHeight: 1.5 }}>{p.intro.split('\n\n')[0].substring(0, 140)}...</div>
              <div style={{ display: "grid", gap: 6, fontSize: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: `1px solid ${C.bl}` }}>
                  <span style={{ color: C.tl }}>Salary Range:</span>
                  <span style={{ fontWeight: 600, color: C.accent }}>{p.salaryRange.split(' ')[0]}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: `1px solid ${C.bl}` }}>
                  <span style={{ color: C.tl }}>Timeline:</span>
                  <span style={{ fontWeight: 600, color: C.dark }}>{p.timeline}</span>
                </div>
              </div>
            </Card>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 20px", background: C.bg }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <SectionTitle title="Free Tools" sub="Interactive calculators and decision aids for senior hiring" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
            {[
              { icon: "🧮", t: "Enhanced ROI Calculator", d: "Get a complete fee estimate with bad-hire cost breakdown and ROI analysis for your search.", pg: "/fee-estimator", gold: true },
              { icon: "❓", t: "Do I Need a Headhunter?", d: "5 questions, instant recommendation on whether retained search is the right approach for your hire.", pg: "/quiz", gold: true },
              { icon: "📅", t: "Book Free Consultation", d: "15-minute call with a specialist consultant. Discuss your search requirements and get expert advice.", action: () => window.open(CALENDLY_URL, '_blank'), gold: false },
              { icon: "📋", t: "Brief a Headhunter", d: "Submit your requirements and get a response within 2 hours during business hours.", pg: "/contact", gold: false }
            ].map(tool => <Card key={tool.t} onClick={tool.action || (() => navigate(tool.pg))}>
              <span style={{ fontSize: 28, marginBottom: 10, display: "block" }}>{tool.icon}</span>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: C.dark, margin: "0 0 6px" }}>{tool.t}</h3>
              <p style={{ fontSize: 13, color: C.tl, lineHeight: 1.5, margin: "0 0 14px" }}>{tool.d}</p>
              {tool.action ? <CalendlyBtn small>Book Now →</CalendlyBtn> : <GoldBtn onClick={tool.action || (() => navigate(tool.pg))} small>Open →</GoldBtn>}
            </Card>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 20px", background: C.bg }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <SectionTitle title="UK Senior Executive Salary Benchmarks 2026" />
          <Card>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead><tr style={{ background: C.bl }}>{["Role", "Low", "Mid", "High"].map(h => <th key={h} style={{ padding: "9px 12px", textAlign: h === "Role" ? "left" : "right", fontWeight: 700, color: C.dark, borderBottom: `1px solid ${C.bd}`, fontSize: 12 }}>{h}</th>)}</tr></thead>
                <tbody>{SALARY.map((r, i) => <tr key={i} style={{ borderBottom: `1px solid ${C.bl}` }}>
                  <td style={{ padding: "9px 12px", fontWeight: 600, color: C.dark }}>{r.role}</td>
                  <td style={{ padding: "9px 12px", textAlign: "right", color: C.tl }}>£{r.low}k</td>
                  <td style={{ padding: "9px 12px", textAlign: "right", color: C.accent, fontWeight: 700 }}>£{r.mid}k</td>
                  <td style={{ padding: "9px 12px", textAlign: "right", color: C.tl }}>£{r.high}k+</td>
                </tr>)}</tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: C.tl, margin: "10px 0 0" }}>Base salary + anticipated annual bonus. UK market data, March 2026.</p>
          </Card>
        </div>
      </section>

      <section style={{ padding: "48px 20px", background: C.bg }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <SectionTitle title="Comparison Guides" sub="Understanding your options before you hire" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
            {COMPARISONS.map(c => <Card key={c.id} onClick={() => navigate(`/comparisons/${c.id}`)} style={{ padding: "16px 14px" }}>
              <span style={{ fontSize: 22, marginBottom: 6, display: "block" }}>{c.icon}</span>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: C.dark, margin: "0 0 4px" }}>{c.title}</h3>
              <p style={{ fontSize: 12, color: C.tl, margin: 0, lineHeight: 1.4 }}>{c.subtitle.substring(0, 80)}...</p>
            </Card>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 20px", background: C.bg }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <SectionTitle title="Executive Search by Sector" sub="Industry-specific insights and headhunter directories" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
            {SECTORS.map(s => <Card key={s.id} onClick={() => navigate(`/sectors/${s.id}`)}>
              <span style={{ fontSize: 32, marginBottom: 12, display: "block" }}>{s.icon}</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.dark, margin: "0 0 8px" }}>{s.name}</h3>
              <p style={{ fontSize: 13, color: C.tl, lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
            </Card>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 20px", background: C.card }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <SectionTitle title="Executive Search by Function" sub="Role-specific guides for C-suite and senior leadership hiring" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
            {FUNCTIONS.map(f => <Card key={f.id} onClick={() => navigate(`/functions/${f.id}`)}>
              <span style={{ fontSize: 32, marginBottom: 12, display: "block" }}>{f.icon}</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.dark, margin: "0 0 8px" }}>{f.fullName} ({f.name})</h3>
              <p style={{ fontSize: 13, color: C.tl, lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
            </Card>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 20px", background: C.card }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <SectionTitle title="UK Locations" sub="Find headhunters across the UK" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {LOCS.map((l, i) => <button key={i} onClick={() => navigate(`/locations/${l.c.toLowerCase()}`)} style={{ background: C.bg, border: `1px solid ${C.bd}`, borderRadius: 6, padding: "8px 18px", fontSize: 13, fontWeight: 600, color: C.dark, cursor: "pointer" }}>📍 {l.c}</button>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 20px", background: C.card }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{fontSize:"clamp(24px,3vw,32px)",fontWeight:700,color:C.dark,textAlign:"center",margin:"0 0 12px"}}>Why Choose Executive Search Headhunters?</h2>
          <p style={{fontSize:15,color:C.tl,textAlign:"center",maxWidth:700,margin:"0 auto 32px"}}>
            Professional headhunters specialise in finding senior executives and C-suite leaders who aren't actively job hunting.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            <div style={{background:C.bg,border:`1px solid ${C.bd}`,borderRadius:8,padding:24}}>
              <h3 style={{fontSize:16,fontWeight:700,color:C.dark,margin:"0 0 12px"}}>🎯 Access Hidden Talent</h3>
              <p style={{fontSize:14,color:C.tl,lineHeight:1.6,margin:0}}>
                Executive search firms access the 70% of senior executives who aren't looking at job boards. Learn <span style={{color:C.accent,cursor:"pointer",fontWeight:600}} onClick={()=>navigate("/guides/what-is-executive-search")}>what executive search is</span> and how it works.
              </p>
            </div>
            <div style={{background:C.bg,border:`1px solid ${C.bd}`,borderRadius:8,padding:24}}>
              <h3 style={{fontSize:16,fontWeight:700,color:C.dark,margin:"0 0 12px"}}>💼 Industry Expertise</h3>
              <p style={{fontSize:14,color:C.tl,lineHeight:1.6,margin:0}}>
                Specialist headhunters have deep networks in <span style={{color:C.accent,cursor:"pointer",fontWeight:600}} onClick={()=>navigate("/sectors")}>specific sectors</span> and understand nuances of different <span style={{color:C.accent,cursor:"pointer",fontWeight:600}} onClick={()=>navigate("/functions")}>executive functions</span>.
              </p>
            </div>
            <div style={{background:C.bg,border:`1px solid ${C.bd}`,borderRadius:8,padding:24}}>
              <h3 style={{fontSize:16,fontWeight:700,color:C.dark,margin:"0 0 12px"}}>⚖️ Informed Decisions</h3>
              <p style={{fontSize:14,color:C.tl,lineHeight:1.6,margin:0}}>
                Check <span style={{color:C.accent,cursor:"pointer",fontWeight:600}} onClick={()=>navigate("/salary-benchmarks")}>executive salary benchmarks</span> and compare <span style={{color:C.accent,cursor:"pointer",fontWeight:600}} onClick={()=>navigate("/comparisons")}>headhunters vs recruiters</span> to make the right hiring choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 20px", background: C.bg }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <SectionTitle title="Frequently Asked Questions" />
          {FAQS.map((f, i) => <div key={i} style={{ borderBottom: `1px solid ${C.bd}` }}>
            <div onClick={() => setFOpen(fOpen === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", cursor: "pointer" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.dark, paddingRight: 12 }}>{f.q}</span>
              <span style={{ color: C.accent, fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{fOpen === i ? "−" : "+"}</span>
            </div>
            {fOpen === i && <p style={{ fontSize: 13, color: C.tl, lineHeight: 1.65, paddingBottom: 14, margin: 0 }}>{f.a}</p>}
          </div>)}
        </div>
      </section>

      <section style={{ padding: "56px 20px", background: `linear-gradient(135deg,${C.dark},${C.accent})`, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 750, color: "#fff", margin: "0 0 8px" }}>Ready to start your search?</h2>
          <p style={{ fontSize: 16, color: "#ffffffbb", margin: "0 0 8px" }}>Book a free 15-minute consultation with a specialist.</p>
          <p style={{ fontSize: 13, color: C.gold, margin: "0 0 24px", fontWeight: 600 }}>⚡ No obligation · Expert advice · Available today</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <CalendlyBtn>Book Free Consultation</CalendlyBtn>
            <GoldBtn onClick={() => navigate("/contact")}>Brief a Headhunter</GoldBtn>
          </div>
        </div>
      </section>
    </div>
  );
}
