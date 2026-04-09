export const baseOrganization = {
  "@type": "Organization",
  "@id": "https://headhunters.co.uk/#org",
  "name": "headhunters.co.uk",
  "url": "https://headhunters.co.uk",
  "description": "The UK's leading authority on executive search and headhunting — guides, tools, and resources for businesses making senior hires.",
  "sameAs": ["https://elliotmarsh.com", "https://executiveheadhunters.co.uk"]
};

export const baseWebsite = {
  "@type": "WebSite",
  "@id": "https://headhunters.co.uk/#website",
  "url": "https://headhunters.co.uk",
  "name": "headhunters.co.uk",
  "publisher": { "@id": "https://headhunters.co.uk/#org" }
};

export const baseFAQ = {
  "@type": "FAQPage",
  "@id": "https://headhunters.co.uk/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between a headhunter and a recruiter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A headhunter proactively researches and approaches senior candidates — including those not actively looking. A recruiter typically advertises and screens applications. Headhunters access the full talent market; recruiters access only the 15–20% actively job-seeking."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a headhunter charge in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retained search fees: 25–35% of first-year total compensation. Most commonly ~30%. Contingent fees: 15–25% on placement. A £200k role typically costs £50k–£70k in retained search fees."
      }
    },
    {
      "@type": "Question",
      "name": "How long does an executive search take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typically 10–14 weeks for director-level roles. CEO and board searches: 16–20 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "Do headhunters guarantee placements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reputable retained firms offer a guarantee period of 6–12 months. If the placed candidate leaves within that period, the firm re-runs the search at no additional fee."
      }
    },
    {
      "@type": "Question",
      "name": "When should I use a headhunter instead of a recruitment agency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When the role is director level or above, confidentiality is required, the best candidates are unlikely to be actively looking, or previous agency campaigns have failed."
      }
    }
  ]
};

export function createGuideSchema(guide) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.subtitle,
    "author": {
      "@type": "Organization",
      "name": "headhunters.co.uk"
    },
    "publisher": baseOrganization,
    "dateModified": guide.updated,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://headhunters.co.uk/guides/${guide.id}`
    }
  };
}

export function createBlogSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "author": {
      "@type": "Organization",
      "name": "headhunters.co.uk"
    },
    "publisher": baseOrganization,
    "datePublished": article.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://headhunters.co.uk/insights/${article.id}`
    }
  };
}

export function createBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function injectSchema(schema) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
  return () => {
    try {
      document.head.removeChild(script);
    } catch (e) {}
  };
}

export function createHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [baseOrganization, baseWebsite, baseFAQ]
  };
}
