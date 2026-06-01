import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletterEmail(
  to: string,
  subject: string,
  htmlContent: string
) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@mail.ibiz.name.ng',
      to,
      subject,
      html: htmlContent,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export async function sendDevotionEmail(
  subscribers: string[],
  devotion: { title: string; scripture: string; content: string; author: string }
) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${devotion.title}</title>
      <style>
        body { font-family: Georgia, serif; background: #f9f6f0; color: #2c2c2c; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #6b3a1f 100%); padding: 40px 30px; text-align: center; }
        .header h1 { color: #d4af37; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 10px; }
        .header h2 { color: #fff; font-size: 28px; margin: 0; font-style: italic; }
        .scripture { background: #f9f6f0; padding: 20px 30px; border-left: 4px solid #d4af37; margin: 0; font-style: italic; color: #6b4c2a; font-size: 16px; }
        .content { padding: 30px; font-size: 16px; line-height: 1.8; color: #333; }
        .footer { background: #1a0a00; color: #d4af37; text-align: center; padding: 20px; font-size: 12px; letter-spacing: 1px; }
        .footer a { color: #d4af37; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Heaven's Hospitality Ministries</h1>
          <h2>${devotion.title}</h2>
        </div>
        <div class="scripture">
          📖 ${devotion.scripture}
        </div>
        <div class="content">
          ${devotion.content.replace(/\n/g, '<br>')}
          <p style="margin-top: 30px; color: #6b4c2a; font-style: italic;">— ${devotion.author}</p>
        </div>
        <div class="footer">
          <p>Heaven's Hospitality Ministries | Spreading the Love of God</p>
          <p><a href="{{unsubscribe_url}}">Unsubscribe</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const results = await Promise.allSettled(
    subscribers.map(email =>
      resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@mail.ibiz.name.ng',
        to: email,
        subject: `Daily Devotion: ${devotion.title}`,
        html,
      })
    )
  );
  return results;
}

export async function sendWelcomeEmail(email: string, name: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Georgia, serif; background: #f9f6f0; color: #2c2c2c; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #6b3a1f 100%); padding: 40px 30px; text-align: center; }
        .header h1 { color: #d4af37; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 10px; }
        .header h2 { color: #fff; font-size: 32px; margin: 0; }
        .content { padding: 40px 30px; }
        .content p { font-size: 16px; line-height: 1.8; }
        .cta { display: block; background: #d4af37; color: #1a0a00; text-decoration: none; padding: 14px 30px; border-radius: 8px; text-align: center; font-weight: bold; margin: 30px 0; font-size: 16px; }
        .footer { background: #1a0a00; color: #d4af37; text-align: center; padding: 20px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Heaven's Hospitality Ministries</h1>
          <h2>Welcome, ${name || 'Beloved'}! 🙏</h2>
        </div>
        <div class="content">
          <p>Thank you for joining the Heaven's Hospitality Ministries family! You are now subscribed to receive our daily devotions, sermon updates, and ministry news.</p>
          <p>We believe that every person deserves to experience the warmth and love of God's hospitality. Our mission is to spread hope, peace, and the transforming power of the Gospel to every corner of the world.</p>
          <p>Expect to receive your first daily devotion soon. In the meantime, visit our website to explore our sermons and teachings.</p>
          <a class="cta" href="${process.env.NEXT_PUBLIC_APP_URL}">Visit Our Website</a>
          <p style="font-style: italic; color: #6b4c2a;">"For I was hungry and you gave me food, I was thirsty and you gave me drink, I was a stranger and you welcomed me." — Matthew 25:35</p>
        </div>
        <div class="footer">
          <p>Heaven's Hospitality Ministries | Global Ministry</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return resend.emails.send({
    from: process.env.EMAIL_FROM || 'noreply@mail.ibiz.name.ng',
    to: email,
    subject: "Welcome to Heaven's Hospitality Ministries!",
    html,
  });
}

export default resend;
