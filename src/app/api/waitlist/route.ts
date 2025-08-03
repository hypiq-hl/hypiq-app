import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import nodemailer from 'nodemailer'

// Gmail SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

// Send welcome email function
const sendWelcomeEmail = async (email: string): Promise<void> => {
  const transporter = createTransporter();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to HYPIQ</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #ffffff;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="font-size: 48px; margin-bottom: 16px;">🐋</div>
          <h1 style="margin: 0; font-size: 32px; font-weight: 700; background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">HYPIQ</h1>
        </div>
        
        <div style="background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(167, 139, 250, 0.1)); border: 1px solid rgba(96, 165, 250, 0.2); border-radius: 16px; padding: 32px; margin-bottom: 32px;">
          <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">Welcome aboard! 🎉</h2>
          <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #e5e7eb;">Thank you for joining the HYPIQ waitlist!</p>
          <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #e5e7eb;">We'll keep you updated on our progress and notify you as soon as HYPIQ is <strong style="color: #60a5fa;">ready for early access</strong>.</p>
        </div>
        
        <div style="margin-bottom: 32px;">
          <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; text-align: center;">What to expect:</h3>
          <div style="display: grid; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 8px; height: 8px; background: #60a5fa; border-radius: 50%; flex-shrink: 0;"></div>
              <span style="font-size: 14px; color: #e5e7eb;">Advanced trading insights</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 8px; height: 8px; background: #a78bfa; border-radius: 50%; flex-shrink: 0;"></div>
              <span style="font-size: 14px; color: #e5e7eb;">Real-time market analysis</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 8px; height: 8px; background: #60a5fa; border-radius: 50%; flex-shrink: 0;"></div>
              <span style="font-size: 14px; color: #e5e7eb;">Exclusive early access</span>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; padding-top: 32px; border-top: 1px solid rgba(96, 165, 250, 0.2);">
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #9ca3af;">Best regards,</p>
          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #60a5fa;">The HYPIQ Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const mailOptions = {
    from: `HYPIQ <hello@hypiq.xyz>`,
    to: email,
    subject: 'Welcome to HYPIQ! 🐋',
    html: htmlContent,
  };
  
  await transporter.sendMail(mailOptions);
};

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Insert email into waitlist
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select()

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        // Return success for duplicate emails (better UX)
        return NextResponse.json(
          { message: 'Successfully added to waitlist', duplicate: true },
          { status: 201 }
        )
      }
      
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to register email' },
        { status: 500 }
      )
    }

    // Send welcome email via Nodemailer
    try {
      await sendWelcomeEmail(email);
      console.log('Welcome email sent successfully to:', email);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the registration if email fails
    }

    return NextResponse.json(
      { message: 'Successfully added to waitlist', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Get waitlist count (public endpoint)
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to get waitlist count' },
        { status: 500 }
      )
    }

    return NextResponse.json({ count })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
