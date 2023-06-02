import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-pool';

const {
  VITE_SMTP_HOST,
  VITE_SMTP_PORT,
  VITE_SMTP_USERNAME,
  VITE_SMTP_PASSWORD,
  VITE_SMTP_SENDER_NAME,
  VITE_SMTP_RECIPIENT,
} = import.meta.env;

const missingValues = Object.entries({
  VITE_SMTP_HOST,
  VITE_SMTP_PORT,
  VITE_SMTP_USERNAME,
  VITE_SMTP_PASSWORD,
  VITE_SMTP_SENDER_NAME,
  VITE_SMTP_RECIPIENT,
}).reduce((missing, [key, value]) => {
  if (value === undefined) {
    missing.push(key);
  }
  return missing;
}, <string[]>[]);

const transporter = createTransport({
  host: VITE_SMTP_HOST,
  port: Number(VITE_SMTP_PORT) || 0,
  auth: {
    user: VITE_SMTP_USERNAME,
    pass: VITE_SMTP_PASSWORD,
  },
});

const sendMail = async (subject: string, body: string) => {
  if (missingValues.length > 0) {
    throw new Error(`Missing values: ${missingValues.join(', ')}`);
  }

  const mailOptions: MailOptions = {
    from: `<${VITE_SMTP_USERNAME}> ${VITE_SMTP_SENDER_NAME}`,
    to: VITE_SMTP_RECIPIENT,
    html: body,
    subject,
  };

  return transporter.sendMail(mailOptions);
};

export default sendMail;
