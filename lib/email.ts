import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@heavenshospitality.org';
const SITE_NAME = "Heaven's Hospitality Ministries";

export async function sendWelcomeEmail(to: string, name?: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: `Welcome to ${SITE_NAME} Newsletter`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Georgia, serif; background: #faf7f0; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 48px 40px; text-align: center;">
            <div style="color: #d4af37; font-size: 13px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 16px;">Heaven's Hospitality</div>
            <h1 style="color: #fff; font-size: 32px; margin: 0; font-weight: 300; letter-spacing: 1px;">Welcome${name ? ', ' + name : ''}!</h1>
            <div style="width: 60px; height: 2px; background: #d4af37; margin: 20px auto 0;"></div>
          </div>
          <div style="padding: 48px 40px;">
            <p style="color: #444; font-size: 17px; line-height: 1.8; margin: 0 0 24px;">
              You've joined a community of believers walking together in faith. You'll receive daily devotions, sermon announcements, and ministry updates to nourish your spiritual journey.
            </p>
            <p style="color: #666; font-size: 15px; line-height: 1.8;">
              <em>"For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future."</em><br>
              <strong style="color: #1a1a2e;">— Jeremiah 29:11</strong>
            </p>
            <div style="margin-top: 40px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="background: #d4af37; color: #1a1a2e; text-decoration: none; padding: 14px 36px; border-radius: 6px; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">Visit Our Ministry</a>
            </div>
          </div>
          <div style="background: #f8f5ef; padding: 24px 40px; text-align: center; border-top: 1px solid #e8e0d0;">
            <p style="color: #999; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

export async function sendNewDevotionEmail(
  subscribers: string[],
  devotion: { title: string; scripture_reference: string; slug: string; content: string }
) {
  const preview = devotion.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
  
  for (const email of subscribers) {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Daily Devotion: ${devotion.title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Georgia, serif; background: #faf7f0; margin: 0; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%); padding: 40px; text-align: center;">
              <div style="color: #d4af37; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 12px;">Daily Devotion</div>
              <h1 style="color: #fff; font-size: 26px; margin: 0; font-weight: 400;">${devotion.title}</h1>
              <p style="color: #d4af37; margin: 12px 0 0; font-style: italic;">${devotion.scripture_reference}</p>
            </div>
            <div style="padding: 40px;">
              <p style="color: #555; font-size: 16px; line-height: 1.9;">${preview}</p>
              <div style="margin-top: 32px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/devotions/${devotion.slug}" style="background: #d4af37; color: #1a1a2e; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">Read Full Devotion</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });
  }
}

export async function sendContactNotification(message: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: process.env.ADMIN_EMAIL || FROM,
    subject: `New Contact: ${message.subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px;">
        <h2 style="color: #1a1a2e;">New Contact Message</h2>
        <p><strong>From:</strong> ${message.name} (${message.email})</p>
        <p><strong>Subject:</strong> ${message.subject}</p>
        <div style="background: #f8f5ef; padding: 20px; border-radius: 8px; margin-top: 16px;">
          <p style="margin: 0; line-height: 1.7;">${message.message}</p>
        </div>
      </div>
    `,
  });
}
