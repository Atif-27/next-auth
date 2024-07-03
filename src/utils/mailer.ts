import nodemailer from "nodemailer";

interface sendmailType {
  email: string;
  emailType: string;
  userId: string;
}
export default async function sendEmail({
  email,
  emailType,
  userId,
}: sendmailType) {
  // TODO - userId
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: "atif276ali@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: "<b>Hello world?</b>",
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", mailResponse.messageId);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
