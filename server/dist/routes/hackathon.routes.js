"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hackathon_controller_1 = require("../controllers/hackathon.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router
    .route("/create-hackathon")
    .post(auth_middleware_1.authenticate, hackathon_controller_1.createHackathon);
router
    .route("/get-hackathon-byquery")
    .get(auth_middleware_1.authenticate, hackathon_controller_1.getHackathonsbySearch);
router
    .route("/get-hackathon/:id")
    .get(auth_middleware_1.authenticate, hackathon_controller_1.getHackathonById);
router
    .route("/get-hackathon/:id/interest")
    .post(auth_middleware_1.authenticate, hackathon_controller_1.toggleHackathonInterest);
router
    .route("/getallhackathons")
    .get(auth_middleware_1.authenticate, hackathon_controller_1.getAllHackathon);
exports.default = router;
