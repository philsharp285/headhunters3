import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadPayload {
  name: string;
  email: string;
  role: string;
  roleTitle: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const YOUR_EMAIL = Deno.env.get("ENQUIRY_EMAIL");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!YOUR_EMAIL) {
      throw new Error("ENQUIRY_EMAIL environment variable not set");
    }

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable not set");
    }

    const payload: LeadPayload = await req.json();

    const emailBody = `
New Hiring Pack Download Lead

Name: ${payload.name}
Email: ${payload.email}
Downloaded Pack: ${payload.roleTitle}
Role ID: ${payload.role}

Time: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}

This lead came from downloading the "${payload.roleTitle}" hiring pack on headhunters.co.uk.
    `.trim();

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Headhunters Leads <onboarding@resend.dev>",
        to: [YOUR_EMAIL],
        reply_to: payload.email,
        subject: `🎯 New Lead: ${payload.roleTitle} Pack - ${payload.name}`,
        text: emailBody,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const data = await emailResponse.json();

    return new Response(
      JSON.stringify({ success: true, messageId: data.id }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending lead notification:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
