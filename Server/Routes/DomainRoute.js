const express = require("express");
const router = express.Router();
const Domain = require("../Models/Domain");
const {
  createDomain,
  getDomain,
  getDomainById,
  updateDomain,
  deleteDomain,
} = require("../Controllers/DomainController");

router.get("/", getDomain);

router.post("/", createDomain);

router.get("/:id", getDomainById);

router.put("/:id", updateDomain);

router.delete("/:id", deleteDomain);

module.exports = router;
