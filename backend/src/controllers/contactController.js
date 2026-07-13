const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

exports.sendEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message, enquiryType } = req.body;
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.SMTP_USER,
      subject: `New Enquiry: ${subject || enquiryType}`,
      html: `
        <h2>New Enquiry from GRD Travels Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Type:</strong> ${enquiryType || 'General'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    // Auto-reply
    await transporter.sendMail({
      from: `"GRD Travels" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: 'Thank you for contacting GRD Travels',
      html: `<h2>Dear ${name},</h2><p>Thank you for your enquiry. Our team will contact you within 24 hours.</p><p>For urgent queries, call us at <strong>+91 8595995437</strong></p><br><p>GRD Travels Team</p>`,
    });
    res.json({ success: true, message: 'Enquiry sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
