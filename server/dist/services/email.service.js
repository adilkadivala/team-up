"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = sendWelcomeEmail;
exports.sendHackathonCreationEmail = sendHackathonCreationEmail;
exports.subscribtionCretion = subscribtionCretion;
const resend_1 = require("resend");
const config_1 = __importDefault(require("../config"));
const resend = new resend_1.Resend(config_1.default.resendApiKey);
async function sendWelcomeEmail(email, name) {
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
    }
    catch (error) {
        console.log("error got from sendWelcomeEmail", error);
        return { success: false, error };
    }
}
async function sendHackathonCreationEmail(email, hackathonName) {
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
    }
    catch (error) {
        console.log("error got from hackathonCreation", error);
        return { success: false, error };
    }
}
async function subscribtionCretion(email, name) {
    console.log("📨 email service hit with:", email);
    try {
        const data = await resend.emails.send({
            from: "TeamUp <onboarding@resend.dev>",
            to: email,
            subject: `Congrats ${name}!`,
            html: `
        <div>
          <h1>Hi ${name}, thanks for subscribing to TeamUp!</h1>
          <h5>Your Subscription at Team-up Has Been Created!</h5>
          <p>Thank you for networking with us!</p>
          <p>— The TeamUp Team</p>
        </div>
      `,
        });
        console.log("✅ Email sent:", data);
        return { success: true, data };
    }
    catch (error) {
        console.error("❌ Error sending email:", error);
        return { success: false, error };
    }
}
