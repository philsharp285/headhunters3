<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>headhunters.co.uk — UK's Authority on Executive Search</title>
  <meta name="description" content="The UK's leading authority on executive search and headhunting — guides, tools, and resources for businesses making senior hires.">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
      color: #2D2D2D;
      background: #FAFAF8;
      line-height: 1.6;
    }

    /* Header */
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(26, 26, 46, 0.97);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(15, 76, 117, 0.2);
    }
    nav .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 52px;
    }
    .logo { cursor: pointer; }
    .logo-main { font-size: 16px; font-weight: 800; color: #fff; }
    .logo-accent { font-size: 16px; font-weight: 800; color: #C9A84C; }

    /* Content */
    main { padding-top: 52px; }
    .container-main { max-width: 1200px; margin: 0 auto; padding: 60px 20px 80px; }

    /* Hero */
    .hero {
      background: linear-gradient(135deg, #16213E 0%, #0F4C75 100%);
      color: #fff;
      padding: 80px 20px;
      text-align: center;
    }
    .hero h1 {
      font-size: clamp(32px, 5vw, 48px);
      font-weight: 800;
      margin: 0 0 16px;
    }
    .hero p {
      font-size: 18px;
      margin: 0 0 32px;
      opacity: 0.95;
    }
    .hero-btn {
      display: inline-block;
      background: linear-gradient(135deg, #C9A84C, rgba(201, 168, 76, 0.87));
      color: #fff;
      padding: 14px 32px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }
    .hero-btn:hover { transform: translateY(-2px); }

    /* Sections */
    .section { padding: 60px 20px; }
    .section-title {
      font-size: clamp(28px, 4vw, 38px);
      font-weight: 750;
      color: #2D2D2D;
      text-align: center;
      margin: 0 0 16px;
    }
    .section-subtitle {
      font-size: 15px;
      color: #6B7280;
      text-align: center;
      max-width: 700px;
      margin: 0 auto 40px;
    }

    /* Cards Grid */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .card {
      background: #FFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 24px;
      transition: all 0.2s;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border-color: #0F4C75;
    }
    .card-icon { font-size: 36px; margin-bottom: 12px; }
    .card-tag {
      display: inline-block;
      background: #0F4C75;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    .card-time { font-size: 12px; color: #6B7280; margin-bottom: 12px; }
    .card-title {
      font-size: 20px;
      font-weight: 700;
      color: #2D2D2D;
      margin: 0 0 8px;
    }
    .card-desc {
      font-size: 14px;
      color: #6B7280;
      line-height: 1.5;
      margin: 0;
    }

    /* Contact Form */
    .form-container {
      max-width: 700px;
      margin: 0 auto;
      background: #FFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 32px;
    }
    .form-grid { display: grid; gap: 20px; }
    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #2D2D2D;
      margin-bottom: 8px;
    }
    input, textarea, select {
      width: 100%;
      padding: 12px 16px;
      font-size: 15px;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      background: #FAFAF8;
      color: #2D2D2D;
      font-family: inherit;
    }
    textarea { resize: vertical; }
    button[type="submit"] {
      width: 100%;
      padding: 14px;
      font-size: 16px;
      font-weight: 700;
      background: linear-gradient(135deg, #C9A84C, rgba(201, 168, 76, 0.87));
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    button[type="submit"]:hover { transform: translateY(-2px); }
    button[type="submit"]:disabled {
      background: #ccc;
      cursor: not-allowed;
      opacity: 0.6;
    }
    .form-note {
      background: #F3F4F6;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      padding: 16px;
      font-size: 13px;
      color: #6B7280;
      line-height: 1.6;
    }
    .error-msg {
      background: #fee;
      border: 1px solid #fcc;
      border-radius: 6px;
      padding: 16px;
      font-size: 14px;
      color: #c33;
    }

    /* Footer */
    footer {
      background: #1A1A2E;
      color: rgba(255,255,255,0.4);
      padding: 32px 20px;
      text-align: center;
    }
    footer .footer-brand {
      font-size: 15px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 6px;
    }
    footer .footer-brand span { color: #C9A84C; }
    footer p { font-size: 12px; line-height: 1.6; margin: 0 0 14px; }
  </style>
</head>
<body>
  <nav>
    <div class="container">
      <div class="logo">
        <span class="logo-main">headhunters</span><span class="logo-accent">.co.uk</span>
      </div>
    </div>
  </nav>

  <main>
    <div class="hero">
      <div class="container">
        <h1>The UK's Authority on Executive Search</h1>
        <p>Comprehensive guides, salary benchmarks, and free tools for senior hiring</p>
        <button class="hero-btn" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">Brief a Headhunter</button>
      </div>
    </div>

    <section class="section" id="guides">
      <div class="container-main">
        <h2 class="section-title">Executive Search Guides</h2>
        <p class="section-subtitle">Expert-reviewed guides on every aspect of executive search and senior hiring.</p>

        <div class="cards-grid">
          <div class="card">
            <div class="card-icon">🔍</div>
            <span class="card-tag">Essential Reading</span>
            <div class="card-time">14 min read</div>
            <h3 class="card-title">What is a Headhunter?</h3>
            <p class="card-desc">The definitive guide to executive search — what headhunters do, how they work, and why businesses use them.</p>
          </div>

          <div class="card">
            <div class="card-icon">💷</div>
            <span class="card-tag">Most Popular</span>
            <div class="card-time">12 min read</div>
            <h3 class="card-title">How Much Does a Headhunter Cost?</h3>
            <p class="card-desc">A transparent breakdown of executive search fees — pricing models, typical percentages, and ROI analysis.</p>
          </div>

          <div class="card">
            <div class="card-icon">⚖️</div>
            <span class="card-tag">Comparison</span>
            <div class="card-time">10 min read</div>
            <h3 class="card-title">Headhunter vs Recruitment Agency</h3>
            <p class="card-desc">The critical distinctions in methodology, fee structure, candidate access, and outcomes.</p>
          </div>

          <div class="card">
            <div class="card-icon">✅</div>
            <span class="card-tag">Decision Guide</span>
            <div class="card-time">9 min read</div>
            <h3 class="card-title">How to Choose a Headhunter</h3>
            <p class="card-desc">Evaluation criteria, red flags, questions to ask, and what AESC accreditation really means.</p>
          </div>

          <div class="card">
            <div class="card-icon">📋</div>
            <span class="card-tag">Process Guide</span>
            <div class="card-time">11 min read</div>
            <h3 class="card-title">The Executive Search Process</h3>
            <p class="card-desc">What to expect at every stage — from briefing to placement and beyond.</p>
          </div>

          <div class="card">
            <div class="card-icon">🎯</div>
            <span class="card-tag">Decision Guide</span>
            <div class="card-time">8 min read</div>
            <h3 class="card-title">When Should You Use a Headhunter?</h3>
            <p class="card-desc">A practical decision framework with specific signals that mean it's time for executive search.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: #fff;" id="resources">
      <div class="container-main">
        <h2 class="section-title">Free Tools & Resources</h2>
        <p class="section-subtitle">Interactive tools, data, and benchmarks to support your senior hiring decisions.</p>

        <div class="cards-grid">
          <div class="card">
            <div class="card-icon">💷</div>
            <h3 class="card-title">Fee Estimator</h3>
            <p class="card-desc">Calculate the cost of a retained executive search including ROI analysis and bad hire comparison.</p>
          </div>

          <div class="card">
            <div class="card-icon">🎯</div>
            <h3 class="card-title">Do I Need a Headhunter?</h3>
            <p class="card-desc">5-question quiz to help you decide whether executive search is right for your role.</p>
          </div>

          <div class="card">
            <div class="card-icon">💰</div>
            <h3 class="card-title">Salary Benchmarks</h3>
            <p class="card-desc">UK senior executive salary ranges by role — updated quarterly with total comp data.</p>
          </div>

          <div class="card">
            <div class="card-icon">📊</div>
            <h3 class="card-title">UK Statistics</h3>
            <p class="card-desc">12 citable data points on executive search fees, timelines, and market trends.</p>
          </div>

          <div class="card">
            <div class="card-icon">📖</div>
            <h3 class="card-title">Glossary</h3>
            <p class="card-desc">38-term executive search glossary with plain-English definitions.</p>
          </div>

          <div class="card">
            <div class="card-icon">👑</div>
            <h3 class="card-title">How to Hire a CEO</h3>
            <p class="card-desc">Complete guide to CEO search — from defining the brief to onboarding.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="contact">
      <div class="container-main">
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="font-size: 48px; margin-bottom: 12px;">📋</div>
          <h2 class="section-title">Brief a Headhunter</h2>
          <p class="section-subtitle">Tell us about your search and a specialist consultant will be in touch.</p>
          <p style="font-size: 13px; color: #C9A84C; font-weight: 600; margin: 8px 0 0;">⚡ Typical response within 2 hours</p>
        </div>

        <form id="enquiryForm" class="form-container">
          <div class="form-grid">
            <div>
              <label>Your Name *</label>
              <input type="text" name="name" placeholder="John Smith" required>
            </div>

            <div>
              <label>Email Address *</label>
              <input type="email" name="email" placeholder="john.smith@company.com" required>
            </div>

            <div>
              <label>Company</label>
              <input type="text" name="company" placeholder="Company name">
            </div>

            <div>
              <label>Role You're Hiring For *</label>
              <input type="text" name="role" placeholder="e.g., CFO, Sales Director, CTO" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label>Salary Range</label>
                <input type="text" name="salary" placeholder="e.g., £120k-£150k">
              </div>
              <div>
                <label>Timeline</label>
                <select name="urgency">
                  <option value="">Select...</option>
                  <option value="critical">Critical (0-4 weeks)</option>
                  <option value="important">Important (1-3 months)</option>
                  <option value="planning">Planning (3-6 months)</option>
                  <option value="exploratory">Exploratory</option>
                </select>
              </div>
            </div>

            <div>
              <label>Brief Description</label>
              <textarea name="message" rows="5" placeholder="Tell us about the role, your organisation, and what you're looking for..."></textarea>
            </div>

            <div class="form-note">
              <strong style="color: #2D2D2D;">What happens next:</strong> A specialist consultant will review your brief and contact you within 2 hours during business hours to discuss your search.
            </div>

            <div id="formMessage"></div>

            <button type="submit">Submit Brief →</button>
          </div>
        </form>
      </div>
    </section>
  </main>

  <footer>
    <div style="max-width: 900px; margin: 0 auto;">
      <div class="footer-brand">headhunters<span>.co.uk</span></div>
      <p>The UK's leading authority on executive search.</p>
      <p style="font-size: 11px; margin: 0; color: rgba(255,255,255,0.2);">Updated March 2026 · Comprehensive guides, tools, and resources for senior hiring</p>
    </div>
  </footer>

  <script>
    document.getElementById('enquiryForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      const button = e.target.querySelector('button[type="submit"]');
      const messageDiv = document.getElementById('formMessage');

      button.textContent = 'Sending...';
      button.disabled = true;
      messageDiv.innerHTML = '';

      try {
        const response = await fetch('YOUR_SUPABASE_URL/functions/v1/send-enquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ANON_KEY'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          messageDiv.innerHTML = '<div style="background: #d1fae5; border: 1px solid #6ee7b7; border-radius: 6px; padding: 16px; font-size: 14px; color: #065f46;">✓ Thank you! We\'ll be in touch within 2 hours during business hours.</div>';
          e.target.reset();
        } else {
          throw new Error('Failed to send');
        }
      } catch (error) {
        messageDiv.innerHTML = '<div class="error-msg">Unable to send your enquiry. Please email us directly or try again.</div>';
      }

      button.textContent = 'Submit Brief →';
      button.disabled = false;
    });
  </script>
</body>
</html>
