import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { C, SCHEMA_ORG, INTENT_PAGES, COMPARISONS, FUNCTIONS } from "../data";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(SCHEMA_ORG);
    document.head.appendChild(script);
    return () => {
      try {
        document.head.removeChild(script);
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navItems = [
    ["home", "Home", "/"],
    ["guides", "Guides", "/guides"],
    ["sectors", "Sectors", "/sectors"],
    ["functions", "Functions", "/functions"],
    ["comparisons", "Comparisons", "/comparisons"],
    ["blog", "Insights", "/insights"],
    ["locations", "Locations", "/locations"],
    ["glossary", "Glossary", "/glossary"],
    ["statistics", "Stats", "/statistics"],
    ["resources", "Resources", "/resources"],
    ["quiz", "Do I Need a Headhunter?", "/quiz"],
    ["estimator", "Fee Calculator", "/fee-estimator"],
    ["contact", "Brief a Headhunter", "/contact"]
  ];

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    const item = navItems.find(([, , p]) => p === path);
    return item ? item[0] : path.split("/")[1] || "home";
  };

  const navPg = getCurrentPage();

  return (
    <div style={{ fontFamily: "Inter,-apple-system,BlinkMacSystemFont,sans-serif", color: C.tx, background: C.bg, minHeight: "100vh" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(26,26,46,0.97)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.accent}33` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 18px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
          <Link to="/" style={{ cursor: "pointer", textDecoration: "none" }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>headhunters</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: C.gold }}>.co.uk</span>
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", padding: "4px 8px" }}>☰</button>
        </div>
        {menuOpen && (
          <div style={{ background: C.dark, borderTop: `1px solid ${C.accent}33`, padding: "8px 18px 14px", maxHeight: "75vh", overflowY: "auto" }}>
            {navItems.map(([id, label, path]) => (
              <Link
                key={id}
                to={path}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: navPg === id ? C.accent + "22" : "transparent",
                  border: "none",
                  color: ["contact", "quiz"].includes(id) ? C.gold : navPg === id ? "#fff" : "#ffffffcc",
                  padding: "9px 10px",
                  borderRadius: 5,
                  fontSize: 14,
                  fontWeight: ["contact", "quiz"].includes(id) ? 700 : 400,
                  cursor: "pointer",
                  textDecoration: "none"
                }}
              >
                {label}
              </Link>
            ))}
            <div style={{ borderTop: `1px solid ${C.accent}33`, marginTop: 8, paddingTop: 8 }}>
              <p style={{ fontSize: 11, color: "#ffffff44", margin: "0 0 6px" }}>Knowledge Hub</p>
              <Link
                to="/guides/bad-hire-cost"
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  color: "#ffffffaa",
                  padding: "7px 10px",
                  borderRadius: 5,
                  fontSize: 13,
                  cursor: "pointer",
                  textDecoration: "none"
                }}
              >
                💸 The True Cost of a Bad Hire
              </Link>
            </div>
            <div style={{ borderTop: `1px solid ${C.accent}33`, marginTop: 8, paddingTop: 8 }}>
              <p style={{ fontSize: 11, color: "#ffffff44", margin: "0 0 6px" }}>Intent guides</p>
              {INTENT_PAGES.map(p => (
                <Link
                  key={p.id}
                  to={`/intent/${p.id}`}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    color: "#ffffffaa",
                    padding: "7px 10px",
                    borderRadius: 5,
                    fontSize: 13,
                    cursor: "pointer",
                    textDecoration: "none"
                  }}
                >
                  {p.title}
                </Link>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${C.accent}33`, marginTop: 8, paddingTop: 8 }}>
              <p style={{ fontSize: 11, color: "#ffffff44", margin: "0 0 6px" }}>Functions</p>
              {FUNCTIONS.map(f => (
                <Link
                  key={f.id}
                  to={`/functions/${f.id}`}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    color: "#ffffffaa",
                    padding: "7px 10px",
                    borderRadius: 5,
                    fontSize: 13,
                    cursor: "pointer",
                    textDecoration: "none"
                  }}
                >
                  {f.icon} {f.name}
                </Link>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${C.accent}33`, marginTop: 8, paddingTop: 8 }}>
              <p style={{ fontSize: 11, color: "#ffffff44", margin: "0 0 6px" }}>Comparisons</p>
              {COMPARISONS.map(c => (
                <Link
                  key={c.id}
                  to={`/comparisons/${c.id}`}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    color: "#ffffffaa",
                    padding: "7px 10px",
                    borderRadius: 5,
                    fontSize: 13,
                    cursor: "pointer",
                    textDecoration: "none"
                  }}
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div style={{ paddingTop: 52 }}>
        <Outlet />
      </div>

      <footer style={{ background: C.dark, color: "#ffffff66", padding: "32px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
            headhunters<span style={{ color: C.gold }}>.co.uk</span>
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.6, margin: "0 0 14px" }}>The UK's leading authority on executive search.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
            {navItems
              .filter(([id]) => id !== "home")
              .map(([id, label, path]) => (
                <Link key={id} to={path} style={{ background: "none", border: "none", color: "#ffffff55", fontSize: 11, cursor: "pointer", padding: 0, textDecoration: "none" }}>
                  {label}
                </Link>
              ))}
            <Link to="/llms.txt" style={{ background: "none", border: "none", color: "#ffffff33", fontSize: 11, cursor: "pointer", padding: 0, textDecoration: "none" }}>
              llms.txt
            </Link>
          </div>
          <p style={{ fontSize: 11, margin: 0, color: "#ffffff33" }}>Updated March 2026 · Reviewed quarterly · Schema markup enabled · llms.txt available</p>
        </div>
      </footer>
    </div>
  );
}
