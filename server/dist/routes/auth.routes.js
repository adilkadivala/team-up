"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.route("/register").post(auth_controller_1.register);
router.route("/login").post(auth_controller_1.login);
exports.default = router;
