import nodemailer from 'nodemailer';

const getTransporter = () => {
  const port = parseInt(process.env.SMTP_PORT || '465');
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const password = process.env.SMTP_PASSWORD?.replace(/^"|"$/g, '') || '';

  console.log('SMTP Config:', {
    host: process.env.SMTP_HOST,
    port,
    secure,
    user: process.env.SMTP_USER,
    passLength: password.length,
  });

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      type: 'login',
      user: process.env.SMTP_USER || '',
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    },
    authMethod: 'LOGIN',
  } as any);
};

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  telegram?: string;
  projectName: string;
  projectDescription: string;
  budget?: string;
  packageName: string;
  packagePrice: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background: linear-gradient(135deg, #111111 0%, #1a1a2e 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(139, 92, 246, 0.2);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                KRAVEN
              </h1>
              <p style="margin: 10px 0 0; color: #06b6d4; font-size: 14px; letter-spacing: 2px;">
                NEW CONTACT FORM SUBMISSION
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Sender Info Card -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 16px; color: #8b5cf6; font-size: 16px; font-weight: 600;">
                      👤 Sender Information
                    </h2>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; width: 100px;">Name:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 500;">${data.name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Email:</td>
                        <td style="padding: 8px 0;">
                          <a href="mailto:${data.email}" style="color: #06b6d4; font-size: 14px; text-decoration: none;">${data.email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Card -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 12px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 16px; color: #06b6d4; font-size: 16px; font-weight: 600;">
                      💬 Message
                    </h2>
                    <p style="margin: 0; color: #e5e5e5; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>

              <!-- Reply Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: Your inquiry to Kraven" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px;">
                      Reply to ${data.name}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="margin: 0; color: #71717a; font-size: 12px; text-align: center;">
                This email was sent from the Kraven website contact form.<br>
                © ${new Date().getFullYear()} Kraven. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
New Contact Form Submission
===========================

Sender Information:
- Name: ${data.name}
- Email: ${data.email}

Message:
${data.message}

---
This email was sent from the Kraven website contact form.
  `;

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: process.env.CONTACT_EMAIL,
    subject: `New Contact Form Submission from ${data.name}`,
    text,
    html,
  });
}

export async function sendBookingEmail(data: BookingFormData) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background: linear-gradient(135deg, #111111 0%, #1a1a2e 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(139, 92, 246, 0.2);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                KRAVEN
              </h1>
              <p style="margin: 10px 0 0; color: #8b5cf6; font-size: 14px; letter-spacing: 2px;">
                📞 NEW BOOKING REQUEST
              </p>
            </td>
          </tr>

          <!-- Package Badge -->
          <tr>
            <td style="padding: 24px 40px 0;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2)); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 12px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 4px; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Selected Package</p>
                    <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">${data.packageName}</h2>
                    <p style="margin: 8px 0 0; color: #06b6d4; font-size: 18px; font-weight: 600;">${data.packagePrice}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 24px 40px 40px;">
              <!-- Contact Info Card -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; margin-bottom: 16px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px; color: #8b5cf6; font-size: 16px; font-weight: 600;">
                      👤 Contact Information
                    </h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; width: 120px;">Name:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 500;">${data.name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Email:</td>
                        <td style="padding: 8px 0;">
                          <a href="mailto:${data.email}" style="color: #06b6d4; font-size: 14px; text-decoration: none;">${data.email}</a>
                        </td>
                      </tr>
                      ${data.telegram ? `
                      <tr>
                        <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Telegram:</td>
                        <td style="padding: 8px 0;">
                          <a href="https://t.me/${data.telegram.replace('@', '')}" style="color: #06b6d4; font-size: 14px; text-decoration: none;">${data.telegram}</a>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Project Info Card -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 12px; margin-bottom: 16px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px; color: #06b6d4; font-size: 16px; font-weight: 600;">
                      🚀 Project Details
                    </h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; width: 120px;">Project Name:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 500;">${data.projectName}</td>
                      </tr>
                      ${data.budget ? `
                      <tr>
                        <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Budget:</td>
                        <td style="padding: 8px 0; color: #22c55e; font-size: 14px; font-weight: 500;">${data.budget}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Description Card -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: rgba(244, 114, 182, 0.1); border: 1px solid rgba(244, 114, 182, 0.3); border-radius: 12px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px; color: #f472b6; font-size: 16px; font-weight: 600;">
                      📝 Project Description
                    </h3>
                    <p style="margin: 0; color: #e5e5e5; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.projectDescription}</p>
                  </td>
                </tr>
              </table>

              <!-- Action Buttons -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: Your Booking Request for ${data.packageName}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px; margin-right: 12px;">
                      📧 Reply via Email
                    </a>
                    ${data.telegram ? `
                    <a href="https://t.me/${data.telegram.replace('@', '')}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #06b6d4, #8b5cf6); color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px;">
                      💬 Message on Telegram
                    </a>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="margin: 0; color: #71717a; font-size: 12px; text-align: center;">
                This booking request was submitted via the Kraven website.<br>
                © ${new Date().getFullYear()} Kraven. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
New Booking Request
===================

Package: ${data.packageName}
Price: ${data.packagePrice}

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
${data.telegram ? `- Telegram: ${data.telegram}` : ''}

Project Details:
- Project Name: ${data.projectName}
${data.budget ? `- Budget: ${data.budget}` : ''}

Project Description:
${data.projectDescription}

---
This booking request was submitted via the Kraven website.
  `;

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: process.env.CONTACT_EMAIL,
    subject: `🚀 New Booking Request: ${data.packageName} - ${data.projectName}`,
    text,
    html,
  });
}
