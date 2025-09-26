const propertyService = require("../services/property.service");

const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await propertyService.getAllProperties(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const prop = await propertyService.getPropertyById(id);
    if (!prop) return res.status(404).json({ message: "Property not found" });
    res.json(prop);
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {
  try {
    const { query = "", bhk, location } = req.query;
    const results = await propertyService.searchProperties({
      query,
      bhk,
      location,
    });
    res.json({ count: results.length, results });
  } catch (err) {
    next(err);
  }
};

const recommendations = async (req, res, next) => {
  try {
    const id = req.params.id;
    const recs = await propertyService.getRecommendations(id, 3);
    res.json({ count: recs.length, recommendations: recs });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, search, recommendations };
