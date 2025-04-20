import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "teamup-default",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "3d",
  resendApiKey:
    process.env.RESEND_API_KEY || "re_X6eGydGH_FqE6oSC3T2dewdCypFiXBryN",
};
