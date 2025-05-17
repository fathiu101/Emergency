import { Resend } from 'npm:resend@1.1.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface EmergencyReport {
  type: string;
  description: string;
  location: string;
  contact: string;
}

const resend = new Resend('re_35GftmVa_GCMMswQybyU3RpvQ4v6xDFND');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { report } = await req.json() as { report: EmergencyReport };

    // Create email content with improved HTML formatting
    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #dc2626; color: white; padding: 20px; margin-bottom: 20px; }
            .details { background-color: #f9fafb; padding: 20px; border-radius: 8px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 0.875rem; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Emergency Report Alert</h1>
            </div>
            <div class="details">
              <h2>Report Details:</h2>
              <p><strong>Type:</strong> ${report.type}</p>
              <p><strong>Location:</strong> ${report.location}</p>
              <p><strong>Contact:</strong> ${report.contact}</p>
              
              <h2>Description:</h2>
              <p>${report.description}</p>
            </div>
            <div class="footer">
              <p>This is an automated message from the Emergency Response System.</p>
              <p>Please respond to this emergency according to standard protocols.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('Attempting to send email...');

    // Send email using Resend with explicit error handling
    const { data, error } = await resend.emails.send({
      from: 'Emergency Response <onboarding@resend.dev>',
      to: ['olowosunafathiu2004@gmail.com'],
      subject: `URGENT: New Emergency Report - ${report.type}`,
      html: emailContent,
    });

    if (error) {
      console.error('Resend API Error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', data);

    return new Response(
      JSON.stringify({ 
        message: 'Report submitted and email sent successfully',
        emailId: data?.id 
      }), 
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders,
        } 
      }
    );
  } catch (error) {
    console.error('Function error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process emergency report',
        details: error.message 
      }), 
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders,
        }
      }
    );
  }
});