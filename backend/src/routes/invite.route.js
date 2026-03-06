const express = require("express");
const { inviteUserHandler } = require("../controllers/invite.controller");
const { acceptInviteHandler } = require('../controllers/auth.controller')
const auth = require("../middleware/auth.middleware");
const tenant = require("../middleware/tenant.middleware");
const requireRole = require("../middleware/rbac.middleware");

const router = express.Router()

router.post(
  "/client",
  auth,
  tenant,
  requireRole(["owner", "admin"]),
  inviteUserHandler("client")
)

router.post(
  "/member",
  auth,
  tenant,
  requireRole(["owner", "admin"]),
  inviteUserHandler("member")
)

router.post(
  "/admin",
  auth,
  tenant,
  requireRole(["owner"]),
  inviteUserHandler("admin")
);

router.post("/accept-invite", acceptInviteHandler)

module.exports = router