const express = require("express");

const {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
} = require("../controllers/planController");

const router = express.Router();

// Create
router.post("/", createPlan);

// Get all
router.get("/", getPlans);

// Get single
router.get("/:id", getPlanById);

// Update
router.put("/:id", updatePlan);

// Delete
router.delete("/:id", deletePlan);

module.exports = router;