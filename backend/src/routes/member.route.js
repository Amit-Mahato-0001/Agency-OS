const express = require("express")
const requireRole = require("../middleware/rbac.middleware")

const {
  getMembersHandler,
  deleteMemberHandler
} = require("../controllers/member.controller")

const router = express.Router()

router.get(
  "/",
  requireRole(["owner", "admin"]),
  getMembersHandler
)

router.delete(
  "/:memberId",
  requireRole(["owner", "admin"]),
  deleteMemberHandler
)

module.exports = router