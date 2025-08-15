import { NextResponse } from 'next/server'

// Email template preview endpoint
export async function GET() {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>HYPIQ Waitlist Confirmed</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; color: #1e293b; line-height: 1.6;">
      
      <!-- Main Container -->
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
        
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #0e241f 0%, #10b981 100%); padding: 48px 40px; text-align: center; position: relative; overflow: hidden;">
          <!-- Subtle background pattern -->
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1; background-image: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);"></div>
          
          <!-- Logo & Title -->
          <div style="position: relative; z-index: 1;">

            <h1 style="margin: 0; font-size: 36px; font-weight: 200; font-style: italic; color: #ffffff; letter-spacing: -0.025em; font-family: 'Inter', sans-serif;">HYPIQ</h1>
          </div>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 40px 40px 20px;">
          <!-- Status Badge -->
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-flex; align-items: center; background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 12px; padding: 12px 20px;">
              <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px; display: inline-block; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></span>
              <span style="font-size: 16px; font-weight: 600; color: #0e241f;">Waitlist Confirmed</span>
            </div>
          </div>
          
          <!-- Main Message -->
          <div style="text-align: center; margin-bottom: 32px;">
            <p style="margin: 0; font-size: 18px; color: #374151; line-height: 1.6;">You've been shortlisted for early access and will receive testnet codes when ready.</p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 24px 40px; text-align: center;">
          <!-- Social Links -->
          <div style="margin-bottom: 20px;">
            <a href="https://x.com/hypiq_fi" style="display: inline-block; margin: 0 12px; padding: 8px 16px; background: #ffffff; border: 1px solid #10b981; border-radius: 8px; text-decoration: none; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);">
              <span style="font-size: 14px; color: #10b981; font-weight: 500;">X</span>
            </a>
            <a href="https://discord.gg/7gkZDasMAr" style="display: inline-block; margin: 0 12px; padding: 8px 16px; background: #ffffff; border: 1px solid #10b981; border-radius: 8px; text-decoration: none; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);">
              <span style="font-size: 14px; color: #10b981; font-weight: 500;">Discord</span>
            </a>
            <a href="https://github.com/hypiq-hl" style="display: inline-block; margin: 0 12px; padding: 8px 16px; background: #ffffff; border: 1px solid #10b981; border-radius: 8px; text-decoration: none; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);">
              <span style="font-size: 14px; color: #10b981; font-weight: 500;">Github</span>
            </a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 16px;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
              © 2025 HYPIQ. You received this email because you joined our waitlist for early access to prediction markets.
            </p>
          </div>
        </div>
        
      </div>
      
      <!-- Pulse animation for status indicator -->
      <style>
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      </style>
      
    </body>
    </html>
  `;

  return new NextResponse(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
