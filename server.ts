import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Local JSON backup database for reliable recording
const SUBMISSIONS_FILE = path.join(process.cwd(), 'submissions_backup.json');

function backupSubmission(type: string, data: any) {
  try {
    let current: any[] = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      current = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf-8'));
    }
    current.push({
      timestamp: new Date().toISOString(),
      type,
      data
    });
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(current, null, 2), 'utf-8');
    console.log(`[Backup] Successfully saved ${type} submission locally.`);
  } catch (error) {
    console.error(`[Backup] Error saving submission locally:`, error);
  }
}

// Nodemailer Helper to send email to thenewlistfoundation@gmail.com
async function sendEmailNotification(subject: string, htmlContent: string) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn(`[Mailer Warning] SMTP environment credentials are not fully configured.`);
    console.log(`[SMTP Simulated Email Dispatch]`);
    console.log(`To: thenewlistfoundation@gmail.com`);
    console.log(`Subject: ${subject}`);
    console.log(`Content:\n${htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')}\n`);
    return false; // Email wasn't sent via server due to missing configuration
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `"Newlist System Notification" <${user}>`,
      to: 'thenewlistfoundation@gmail.com',
      subject,
      html: htmlContent,
    });

    console.log(`[Mailer] Email dispatched successfully to thenewlistfoundation@gmail.com`);
    return true;
  } catch (error) {
    console.error(`[Mailer] Failed to transmit email via SMTP:`, error);
    return false;
  }
}

// REST API Endpoints

// 1. Submit contact form details
app.post('/api/submit-contact', async (req, res) => {
  const { name, email, phone, enquiryType, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are strictly required.' });
  }

  // Backup locally so no data is ever lost
  backupSubmission('contact', { name, email, phone, enquiryType, message });

  // Format Email body
  const subject = `[Newlist Contact] Message from ${name}`;
  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; padding: 20px; line-height: 1.6; color: #1e293b; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #1e1b4b; border-bottom: 2px solid #e11d48; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> ${phone || 'Not Specified'}</p>
      <p><strong>Enquiry Type / Group:</strong> ${enquiryType || 'General Enquiry'}</p>
      <div style="background: #ffffff; padding: 15px; border-left: 4px solid #1e1b4b; margin: 15px 0; border-radius: 4px;">
        <p style="margin: 0; font-style: italic;"><strong>Message:</strong></p>
        <p style="margin: 10px 0 0 0;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      <p style="font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-bottom: 0;">Recorded locally and dispatched automatically on behalf of Newlist Foundation.</p>
    </div>
  `;

  const sent = await sendEmailNotification(subject, htmlContent);

  return res.json({
    success: true,
    emailDispatched: sent,
    message: sent 
      ? 'Your message has been successfully dispatched to our team.' 
      : 'Your transmission was registered locally. (E-mail forwarding will occur upon server SMTP credential assignment).'
  });
});

// 2. Submit get involved interest proposals
app.post('/api/submit-proposal', async (req, res) => {
  const { name, email, channel, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message details are required.' });
  }

  // Backup locally so no data is ever lost
  backupSubmission('proposal', { name, email, channel, message });

  // Format Email body
  const subject = `[Newlist Proposal] ${channel || 'Interest Pathway'} from ${name}`;
  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; padding: 20px; line-height: 1.6; color: #1e293b; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #1e1b4b; border-bottom: 2px solid #ea580c; padding-bottom: 10px; margin-top: 0;">New Alignment Pathway Proposal</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Alignment Pathway Selected:</strong> ${channel || 'Unspecified'}</p>
      <div style="background: #ffffff; padding: 15px; border-left: 4px solid #ea580c; margin: 15px 0; border-radius: 4px;">
        <p style="margin: 0; font-style: italic;"><strong>Proposal / Message Details:</strong></p>
        <p style="margin: 10px 0 0 0;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      <p style="font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-bottom: 0;">Recorded locally and dispatched automatically on behalf of Newlist Foundation.</p>
    </div>
  `;

  const sent = await sendEmailNotification(subject, htmlContent);

  return res.json({
    success: true,
    emailDispatched: sent,
    message: sent 
      ? 'Your pathway interest proposal has been completed and dispatched.' 
      : 'Your interest proposal was saved locally on the network. (Email dispatch pending SMTP configuration).'
  });
});

// Configure Vite middleware or Serve static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[Dev] Activated Vite HMR Middleware');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[Prod] Serving static build files from dist');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on address: http://0.0.0.0:${PORT}`);
  });
}

startServer();
