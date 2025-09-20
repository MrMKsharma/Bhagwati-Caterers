import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from }: EmailData) {
  try {
    const info = await transporter.sendMail({
      from: from || process.env.EMAIL_FROM,
      to,
      subject,
      html
    })

    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Email templates
export const emailTemplates = {
  inquiryReceived: (data: any) => ({
    subject: `New Catering Inquiry from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ea580c; margin: 0; font-size: 28px;">Bhagwati Caterers</h1>
            <p style="color: #666; margin: 5px 0 0 0;">New Catering Inquiry</p>
          </div>
          
          <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #ea580c;">
            <h2 style="color: #ea580c; margin: 0 0 15px 0; font-size: 20px;">📋 Inquiry Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #555;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #555;">${data.email}</td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; color: #555;">${data.phone}</td>
              </tr>
              ` : ''}
              ${data.eventType ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Event Type:</td>
                <td style="padding: 8px 0; color: #555;">${data.eventType}</td>
              </tr>
              ` : ''}
              ${data.eventDate ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Event Date:</td>
                <td style="padding: 8px 0; color: #555;">${new Date(data.eventDate).toLocaleDateString()}</td>
              </tr>
              ` : ''}
              ${data.guestCount ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Guest Count:</td>
                <td style="padding: 8px 0; color: #555;">${data.guestCount}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #333; margin: 0 0 10px 0; font-size: 16px;">💬 Message:</h3>
            <p style="color: #555; margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXTAUTH_URL}/admin/inquiries" 
               style="background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              View in Admin Panel
            </a>
          </div>
          
          <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              This email was sent automatically from your Bhagwati Caterers website.
            </p>
          </div>
        </div>
      </div>
    `
  }),

  inquiryConfirmation: (data: any) => ({
    subject: 'Thank you for your catering inquiry - Bhagwati Caterers',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ea580c; margin: 0; font-size: 28px;">Bhagwati Caterers</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Thank you for your inquiry!</p>
          </div>
          
          <div style="margin-bottom: 25px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear ${data.name},</p>
            <p style="color: #555; line-height: 1.6;">
              Thank you for your interest in Bhagwati Caterers! We have received your inquiry and our team will review it shortly.
            </p>
            <p style="color: #555; line-height: 1.6;">
              We typically respond to all inquiries within 2-4 hours during business hours. 
              One of our catering specialists will contact you to discuss your event requirements and provide a customized quote.
            </p>
          </div>
          
          <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #ea580c;">
            <h3 style="color: #ea580c; margin: 0 0 15px 0; font-size: 18px;">📋 Your Inquiry Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${data.eventType ? `
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #333; width: 120px;">Event Type:</td>
                <td style="padding: 6px 0; color: #555;">${data.eventType}</td>
              </tr>
              ` : ''}
              ${data.eventDate ? `
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #333;">Event Date:</td>
                <td style="padding: 6px 0; color: #555;">${new Date(data.eventDate).toLocaleDateString()}</td>
              </tr>
              ` : ''}
              ${data.guestCount ? `
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #333;">Guest Count:</td>
                <td style="padding: 6px 0; color: #555;">${data.guestCount}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #10b981;">
            <h3 style="color: #059669; margin: 0 0 15px 0; font-size: 18px;">🚀 What happens next?</h3>
            <ul style="color: #555; line-height: 1.8; padding-left: 20px; margin: 0;">
              <li>Our team reviews your requirements</li>
              <li>We prepare a customized menu and quote</li>
              <li>You'll receive a detailed proposal within 24 hours</li>
              <li>We schedule a consultation to finalize details</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 25px 0;">
            <p style="color: #555; margin-bottom: 15px;">Need immediate assistance?</p>
            <div style="margin-bottom: 15px;">
              <a href="tel:+919876543210" style="background-color: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 5px;">
                📞 Call Us: +91 98765 43210
              </a>
            </div>
            <div>
              <a href="https://wa.me/919876543210" style="background-color: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 5px;">
                💬 WhatsApp Chat
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              Bhagwati Caterers - Creating memorable culinary experiences<br>
              📧 info@bhagwaticaterers.com | 📞 +91 98765 43210
            </p>
          </div>
        </div>
      </div>
    `
  })
}