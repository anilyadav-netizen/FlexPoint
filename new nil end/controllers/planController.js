const Plan = require("../models/Plan");

// ============================
// CREATE PLAN
// ============================
const createPlan = async (req, res) => {
  try {
    const { name, price, popular, features, isActive } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
      });
    }

    const existingPlan = await Plan.findOne({
      name: name.trim().toUpperCase(),
    });

    if (existingPlan) {
      return res.status(409).json({
        success: false,
        message: "Plan already exists",
      });
    }

    const plan = await Plan.create({
      name,
      price,
      popular: popular ?? false,
      features: Array.isArray(features) ? features : [],
      isActive: isActive ?? true,
    });

    return res.status(201).json({
      success: true,
      message: "Plan created successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Create Plan Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ============================
// GET ALL PLANS
// ============================

const getPlans = async (req, res) => {
  try {
    const { active } = req.query;

    const filter = {};

    if (active !== undefined) {
      filter.isActive = active === "true";
    }

    const plans = await Plan.find(filter).sort({
      price: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    console.error("Get Plans Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ============================
// GET SINGLE PLAN
// ============================

const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error("Get Plan Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ============================
// UPDATE PLAN
// ============================
const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, price, popular, features, isActive } = req.body;

    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    if (name !== undefined) {
      const existingPlan = await Plan.findOne({
        name: name.trim().toUpperCase(),
        _id: { $ne: id },
      });

      if (existingPlan) {
        return res.status(409).json({
          success: false,
          message: "Another plan with this name already exists",
        });
      }

      plan.name = name;
    }

    if (price !== undefined) {
      plan.price = price;
    }

    if (popular !== undefined) {
      plan.popular = popular;
    }

    if (features !== undefined) {
      plan.features = Array.isArray(features) ? features : [];
    }

    if (isActive !== undefined) {
      plan.isActive = isActive;
    }

    await plan.save();

    return res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Update Plan Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ============================
// DELETE PLAN
// ============================

const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findByIdAndDelete(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Delete Plan Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};