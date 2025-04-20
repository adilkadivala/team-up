import { Resend } from "resend";
import config from "../config";

const resend = new Resend(config.resendApiKey);

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const data = await resend.emails.send({
      from: "TeamUp onboarding@resend.dev",
      to: email,
      subject: "welcome to Team-Up",
      html: `
        <div>
          <h1>Welcome to TeamUp, ${name}!</h1>
          <p>Thank you for joining our platform. We're excited to help you find the perfect hackathon teammates.</p>
          <p>Get started by:</p>
          <ul>
            <li>Completing your profile</li>
            <li>Adding your skills</li>
            <li>Browsing upcoming hackathons</li>
          </ul>
          <p>Happy hacking!</p>
          <p>The TeamUp Team</p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    console.log("error got from sendWelcomeEmail", error);
    return { success: false, error };
  }
}

export async function sendHackathonCreationEmail(
  email: string,
  hackathonName: string
) {
  try {
    const data = await resend.emails.send({
      from: "TeamUp onboarding@resend.dev",
      to: email,
      subject: `Your Hackathon "${hackathonName}" Has Been Created`,
      html: `
          <div>
            <h1>Your Hackathon Has Been Created!</h1>
            <p>Your hackathon "${hackathonName}" has been successfully created on TeamUp.</p>
            <p>Users can now express interest and form teams for your event.</p>
            <p>Thank you for organizing this event!</p>
            <p>The TeamUp Team</p>
          </div>
        `,
    });
    return { success: true, data };
  } catch (error) {
    console.log("error got from hackathonCreation", error);
    return { success: false, error };
  }
}

export async function subscribtionCretion(email: string, name: string) {
  console.log("📨 email service hit with:", email);

  try {
    const data = await resend.emails.send({
      from: "TeamUp <onboarding@resend.dev>",
      to: email,
      subject: `Congrats ${name}!`,
      html: `
        <div>
          <p>Hi ${name}, thanks for subscribing to TeamUp!</p>
          <h1>Your Subscription at Team-up Has Been Created!</h1>
          <p>Thank you for networking with us!</p>
          <p>— The TeamUp Team</p>
        </div>
      `,
    });

    console.log("✅ Email sent:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error };
  }
}
