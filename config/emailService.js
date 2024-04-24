require("dotenv").config();
const postmark = require("postmark");

const serverToken = process.env.POSTMARK_SERVER_API_TOKEN;
const client = new postmark.ServerClient(serverToken);

const sendVerificationEmail = async (recipientEmail, verificationToken) => {
  try {
    await client.sendEmail({
      From: process.env.SENDER_EMAIL,
      To: recipientEmail,
      Subject: "Email Verification",
      HtmlBody: `
        <p>Please click the following link to verify your email:</p>
        <a href="${process.env.BASE_URL}/api/auth/verify/${verificationToken}">Verify Email</a>
      `,
    });
    console.log(`Verification email sent to ${recipientEmail}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

module.exports = { sendVerificationEmail };
