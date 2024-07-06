import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
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
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedToken = await bcrypt.hash(userId.toString(), salt);
    const expiry = Date.now() + 3600000;

    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: expiry,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpiry: expiry,
        },
      });
    }

    const verifyHtml = `<p>Click the link to verify your account 
     ${process.env.DOMAIN}/verify-email?token=${hashedToken}
    </p>`;
    const resetHtml = `<p>Click the link to reset your account's password 
     ${process.env.DOMAIN}/reset-password?token=${hashedToken}
    </p>`;
    // !Node mailer
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b95bf79ba92caa",
        pass: "a2d6e0c715361b",
      },
    });

    const mailOptions = {
      from: "atif276ali@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailType === "VERIFY" ? verifyHtml : resetHtml,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", mailResponse.messageId);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
