export function generateHiringPackPDF(roleData) {
  const doc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${roleData.title} - Hiring Pack</title>
  <style>
    @page {
      size: A4;
      margin: 2cm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1a1a2e;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #1a1a2e;
      font-size: 28px;
      margin-bottom: 10px;
      border-bottom: 3px solid #1a1a2e;
      padding-bottom: 10px;
    }
    h2 {
      color: #1a1a2e;
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 15px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 5px;
    }
    h3 {
      color: #1a1a2e;
      font-size: 16px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 12px;
      color: #374151;
    }
    ul, ol {
      margin-bottom: 15px;
      padding-left: 25px;
    }
    li {
      margin-bottom: 8px;
      color: #374151;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #1a1a2e;
    }
    .logo {
      font-size: 18px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 5px;
    }
    .subtitle {
      color: #6b7280;
      font-size: 14px;
    }
    .stats-box {
      background: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    .stat {
      text-align: center;
    }
    .stat-label {
      font-size: 11px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .stat-value {
      font-size: 16px;
      font-weight: 700;
      color: #1a1a2e;
    }
    .quality-box {
      background: #f8fafc;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 15px;
      margin-bottom: 10px;
    }
    .quality-title {
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 5px;
    }
    .question-box {
      background: #f8fafc;
      border-left: 3px solid #2563eb;
      padding: 12px 15px;
      margin-bottom: 10px;
      border-radius: 0 6px 6px 0;
    }
    .step {
      margin-bottom: 20px;
      padding-left: 35px;
      position: relative;
    }
    .step-num {
      position: absolute;
      left: 0;
      top: 0;
      width: 28px;
      height: 28px;
      background: #1a1a2e;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    .page-break {
      page-break-after: always;
    }
    @media print {
      body { margin: 0; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">headhunters.co.uk</div>
    <div class="subtitle">UK's Authority on Executive Search</div>
  </div>

  <h1>${roleData.title}</h1>

  <p><strong>${roleData.intro}</strong></p>

  <div class="stats-box">
    <div class="stat">
      <div class="stat-label">Salary Range</div>
      <div class="stat-value">${roleData.salaryRange}</div>
    </div>
    <div class="stat">
      <div class="stat-label">Typical Search Fee</div>
      <div class="stat-value">${roleData.searchFee}</div>
    </div>
    <div class="stat">
      <div class="stat-label">Timeline</div>
      <div class="stat-value">${roleData.timeline}</div>
    </div>
  </div>

  <h2>Sample Job Description</h2>

  <h3>Role Overview</h3>
  <p>${roleData.intro}</p>

  <h3>Key Responsibilities</h3>
  <ul>
    ${roleData.responsibilities?.map(r => `<li>${r}</li>`).join('') || '<li>Define strategic direction and objectives</li>'}
  </ul>

  <h3>Essential Qualities</h3>
  ${roleData.keyQualities?.map(q => {
    const [title, ...rest] = q.split(':');
    return `
      <div class="quality-box">
        <div class="quality-title">${title}</div>
        <div>${rest.join(':').trim()}</div>
      </div>
    `;
  }).join('') || ''}

  <div class="page-break"></div>

  <h2>Interview Structure & Questions</h2>

  <h3>Recommended Interview Structure</h3>
  <ol>
    <li><strong>Initial Screening (45-60 minutes)</strong>
      <ul>
        <li>Career background and key achievements</li>
        <li>Motivation for the role and organization</li>
        <li>Initial culture fit assessment</li>
      </ul>
    </li>
    <li><strong>Technical/Competency Interview (90 minutes)</strong>
      <ul>
        <li>Deep dive into relevant experience</li>
        <li>Case study or business scenario discussion</li>
        <li>Detailed competency-based questions (see below)</li>
      </ul>
    </li>
    <li><strong>Cultural Fit & Values (60 minutes)</strong>
      <ul>
        <li>Leadership style and team dynamics</li>
        <li>Stakeholder management approach</li>
        <li>Values alignment and working preferences</li>
      </ul>
    </li>
    <li><strong>Final Interview with Board/Senior Stakeholders (60-90 minutes)</strong>
      <ul>
        <li>Strategic thinking and vision</li>
        <li>Questions from the candidate</li>
        <li>Chemistry and final assessment</li>
      </ul>
    </li>
  </ol>

  <h3>Interview Questions to Ask</h3>
  ${roleData.interviewQuestions?.map(q => `<div class="question-box">${q}</div>`).join('') || ''}

  <div class="page-break"></div>

  <h2>How to Run the Search Process</h2>
  ${roleData.hiringGuide?.map((step, i) => `
    <div class="step">
      <div class="step-num">${i + 1}</div>
      <h3>${step.step}</h3>
      <p>${step.detail}</p>
    </div>
  `).join('') || ''}

  <h2>Questions to Ask Executive Search Firms</h2>
  <div class="quality-box">
    <div class="quality-title">1. What is your specific experience in placing ${roleData.role} roles?</div>
    <p>Look for: Recent, relevant placements at similar organizations. Ask for specific examples and outcomes.</p>
  </div>

  <div class="quality-box">
    <div class="quality-title">2. How will you approach this search differently?</div>
    <p>Look for: Understanding of your unique context, challenges, and what makes this opportunity compelling.</p>
  </div>

  <div class="quality-box">
    <div class="quality-title">3. Who will actually work on this assignment?</div>
    <p>Look for: Meet the team who will do the work, not just the partner who wins the business.</p>
  </div>

  <div class="quality-box">
    <div class="quality-title">4. What is your research and sourcing methodology?</div>
    <p>Look for: Proactive headhunting approach, not just database searching. Ask about their market mapping process.</p>
  </div>

  <div class="quality-box">
    <div class="quality-title">5. How do you assess candidates beyond their CV?</div>
    <p>Look for: Robust assessment methodology including competency interviews, references, and psychometric testing where appropriate.</p>
  </div>

  <div class="quality-box">
    <div class="quality-title">6. What does your fee structure include?</div>
    <p>Look for: Clear explanation of what's included, payment terms, and any additional costs. Ask about off-limits policies.</p>
  </div>

  <div class="quality-box">
    <div class="quality-title">7. What is your guarantee or replacement policy?</div>
    <p>Look for: Clear terms on what happens if the placement doesn't work out within a specified period.</p>
  </div>

  <div class="quality-box">
    <div class="quality-title">8. How will you keep us informed throughout the process?</div>
    <p>Look for: Clear communication plan, regular updates, and transparency about challenges or market feedback.</p>
  </div>

  <div class="quality-box">
    <div class="quality-title">9. Can you provide references from recent similar searches?</div>
    <p>Look for: Willingness to provide references. Speak to clients about their experience, not just the outcome.</p>
  </div>

  <div class="quality-box">
    <div class="quality-title">10. What do you see as the key challenges in this search?</div>
    <p>Look for: Honest assessment of market conditions, potential obstacles, and how they plan to overcome them.</p>
  </div>

  <div class="page-break"></div>

  <h2>Why Use Executive Search</h2>
  <p>${roleData.whySearch || `The best ${roleData.role}s are not actively looking. They are performing well in their current roles and not scanning job boards. Reaching them requires a headhunter with deep sector knowledge, an established network, and the credibility to make an approach that gets taken seriously.`}</p>

  <p>Executive search firms add value beyond candidate sourcing:</p>
  <ul>
    <li><strong>Market Intelligence:</strong> Understanding of compensation benchmarks, availability, and competitive landscape</li>
    <li><strong>Confidentiality:</strong> Protecting your search from competitors, customers, and internal politics</li>
    <li><strong>Assessment:</strong> Robust evaluation methodology to reduce hiring risk</li>
    <li><strong>Negotiation:</strong> Managing offer process and navigating counter-offers</li>
    <li><strong>Speed:</strong> Dedicated resources focused exclusively on your search</li>
  </ul>

  <h2>Key Considerations Before Starting</h2>
  <ul>
    ${roleData.considerations?.map(c => `<li>${c}</li>`).join('') || ''}
  </ul>

  <div class="footer">
    <p><strong>headhunters.co.uk</strong> - UK's Authority on Executive Search</p>
    <p>This hiring pack is provided as a guide. For personalized advice on your ${roleData.role} search, speak to an independent executive search advisor.</p>
    <p>© ${new Date().getFullYear()} headhunters.co.uk</p>
  </div>
</body>
</html>
  `.trim();

  return doc;
}
