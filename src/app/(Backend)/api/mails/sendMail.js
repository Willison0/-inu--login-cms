const { sendMail } = require('../../libs/mailHandler');

export async function sendVerifiedEmail({ receiver, token }) {
  const bodyMail = `Email address verification: 
  Click this link to verify your email: <a>${token}</a>
  `;

  return await sendMail({
    to: receiver,
    text: bodyMail,
    subject: 'Email address verification'
  });
}
