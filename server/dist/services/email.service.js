"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = sendWelcomeEmail;
exports.hackathonCreation = hackathonCreation;
exports.subscribtionCretion = subscribtionCretion;
const resend_1 = require("resend");
const config_1 = __importDefault(require("../config"));
const resend = new resend_1.Resend(config_1.default.resendApiKey);
function sendWelcomeEmail(email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield resend.emails.send({
                from: "TeamUp <notifications@teamup.com>",
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
    });
}
function hackathonCreation(email, hackathonName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield resend.emails.send({
                from: "TeamUp <notifications@teamup.com>",
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
    });
}
function subscribtionCretion(email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield resend.emails.send({
                from: "TeamUp <notifications@teamup.com>",
                to: email,
                subject: `congratulation "${name}" `,
                html: `
            <div>
              <h1>Your Subscription at Team-up  Has Been Created!</h1>
              <p>Thank you for networking with us!</p>
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
    });
}
