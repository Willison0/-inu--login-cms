import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

/**
 *
 * @param {object} mailData
 * @param {string} mailData.from
 * @param {string} mailData.to
 * @param {string} mailData.subject
 * @param {string} mailData.text
 * @param {HTMLElement} mailData.html
 * @param {Mail.Attachment[]} mailData.attachments
 */
export async function sendMail({ from, to, subject, text, html, attachments }) {
  /**
   * Esta sección hace uso de las variables de entorno.
   */
  const { SMTP_HOST, SMTP_PORT, NODEMAILER_USER, NODEMAILER_PASS } = process.env;
  const transportObject = {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS
    }
  };
  const transporter = nodemailer.createTransport({ ...transportObject });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: from || NODEMAILER_USER,
    to,
    subject,
    text,
    html,
    attachments // attach files array
  });
  if (info.accepted.includes(to)) return await info;
  else throw new Error(`no delivered email from ${to}`);
}
