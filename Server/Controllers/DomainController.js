const Domain = require("../Models/Domain");

// Create a new domain || POST Request
const createDomain = async (req, res) => {
  const { name, type, description } = req.body;

  try {
    const domain = new Domain({ name, type, description });
    const newDomain = await domain.save();
    return res.status(201).json(newDomain);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Get all domains || GET Request
const getDomain = async (req, res) => {
  try {
    const domains = await Domain.find();
    return res.json(domains);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get domain by ID || GET Request
const getDomainById = async (req, res) => {
  try {
    const domain = await Domain.findById(req.params.id);
    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }
    return res.json(domain);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update a domain || PUT Request
const updateDomain = async (req, res) => {
  const { name, type, description } = req.body;

  try {
    const domain = await Domain.findByIdAndUpdate(
      req.params.id,
      { name, type, description },
      { new: true }
    );
    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }
    return res.json(domain);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Delete a domain || DELETE Request
const deleteDomain = async (req, res) => {
  const { id } = req.params;
  try {
    const domain = await Domain.findByIdAndDelete(id);
    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }
    return res.json({ message: "Domain deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createDomain,
  getDomain,
  getDomainById,
  updateDomain,
  deleteDomain,
};
