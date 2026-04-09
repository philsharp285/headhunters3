import React, { useState } from "react";
import { C } from "../data";
import { Btn } from "./Buttons";

export function EnquiryForm({
  title = "Get a Free Consultation",
  subtitle = "Speak to a specialist about your executive search needs",
  buttonText = "Request a Call Back",
  context = "",
  compact = false,
  style = {}
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    salary: "",
    urgency: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/send-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
          ...formData,
          message: context ? `${context}\n\n${formData.message}` : formData.message
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          salary: "",
          urgency: "",
          message: ""
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    fontSize: 14,
    border: `1.5px solid ${C.bd}`,
    borderRadius: 6,
    fontFamily: "inherit",
    boxSizing: "border-box"
  };

  const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: C.dark,
    marginBottom: 6
  };

  if (status === "success") {
    return (
      <div style={{
        background: `linear-gradient(135deg, ${C.accent}11, ${C.al}11)`,
        border: `2px solid ${C.accent}`,
        borderRadius: 10,
        padding: compact ? "20px" : "28px",
        margin: "32px 0",
        textAlign: "center",
        ...style
      }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: C.dark, margin: "0 0 8px" }}>
          Thank you for your enquiry
        </h3>
        <p style={{ fontSize: 14, color: C.tl, margin: 0 }}>
          We'll be in touch within 2 hours during business hours
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.accent}08, ${C.al}08)`,
      border: `2px solid ${C.accent}33`,
      borderRadius: 10,
      padding: compact ? "20px" : "28px",
      margin: "32px 0",
      ...style
    }}>
      <div style={{ marginBottom: 20, textAlign: compact ? "left" : "center" }}>
        <h3 style={{ fontSize: compact ? 18 : 22, fontWeight: 700, color: C.dark, margin: "0 0 6px" }}>
          {title}
        </h3>
        <p style={{ fontSize: 14, color: C.tl, margin: 0 }}>
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Your name"
            />
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Company name"
            />
          </div>
          <div>
            <label style={labelStyle}>Role to Fill *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="e.g. Chief Financial Officer"
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Salary Range</label>
            <select
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select range</option>
              <option value="£80k-£120k">£80k-£120k</option>
              <option value="£120k-£200k">£120k-£200k</option>
              <option value="£200k-£300k">£200k-£300k</option>
              <option value="£300k+">£300k+</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Urgency</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select urgency</option>
              <option value="Immediate (1-2 weeks)">Immediate (1-2 weeks)</option>
              <option value="Soon (2-4 weeks)">Soon (2-4 weeks)</option>
              <option value="Planning (1-3 months)">Planning (1-3 months)</option>
              <option value="Future (3+ months)">Future (3+ months)</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Additional Information</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={{
              ...inputStyle,
              minHeight: 80,
              resize: "vertical"
            }}
            placeholder="Tell us about your requirements..."
          />
        </div>

        {status === "error" && (
          <div style={{
            background: "#fef2f2",
            border: "1.5px solid #fca5a5",
            borderRadius: 6,
            padding: "10px 12px",
            marginBottom: 16,
            fontSize: 13,
            color: "#991b1b"
          }}>
            There was an error sending your enquiry. Please try again or email us directly.
          </div>
        )}

        <Btn onClick={handleSubmit} variant="primary">
          {loading ? "Sending..." : buttonText}
        </Btn>
      </form>
    </div>
  );
}

export function EnquiryBox({
  title,
  subtitle,
  buttonText = "Get Expert Advice",
  context = "",
  compact = false
}) {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <EnquiryForm
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
      context={context}
      compact={compact}
    />;
  }

  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.accent}11, ${C.al}11)`,
      border: `2px solid ${C.accent}`,
      borderRadius: 10,
      padding: compact ? "16px 20px" : "20px 24px",
      margin: "32px 0"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16
      }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h3 style={{ fontSize: compact ? 16 : 18, fontWeight: 700, color: C.dark, margin: "0 0 6px" }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{ fontSize: 14, color: C.tl, margin: 0 }}>
              {subtitle}
            </p>
          )}
        </div>
        <Btn onClick={() => setShowForm(true)} variant="primary">
          {buttonText} →
        </Btn>
      </div>
    </div>
  );
}
