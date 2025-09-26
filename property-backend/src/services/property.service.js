const Property = require('../models/property.model');

const getAllProperties = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const total = await Property.countDocuments();
  const items = await Property.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  return { total, page, limit, items };
};

const getPropertyById = async (id) => {
  const prop = await Property.findById(id);
  return prop;
};

const searchProperties = async ({ query = '', bhk, location }) => {
  const filters = {};
  if (bhk) filters.bhk = Number(bhk);
  if (location) filters.location = new RegExp(location, 'i');

  // Semantic mapping for simple simulation
  const semanticLocationMap = {
    cyberhub: ['Gurgaon', 'Gurugram', 'Cyberhub'],
    saket: ['Delhi', 'Saket'],
    bandra: ['Mumbai', 'Bandra']
  };

  const qLower = (query || '').toLowerCase();
  let semanticLocations = null;

  Object.entries(semanticLocationMap).forEach(([k, arr]) => {
    if (qLower.includes(k)) semanticLocations = arr;
  });

  const mongoQuery = { ...filters };

  if (query) {
    mongoQuery.$or = [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { location: { $regex: query, $options: 'i' } }
    ];
  }

  if (semanticLocations) {
    mongoQuery.$or = mongoQuery.$or || [];
    const semanticOr = semanticLocations.map((loc) => ({
      location: { $regex: `^${loc}$`, $options: 'i' }
    }));
    mongoQuery.$or = mongoQuery.$or.concat(semanticOr);
  }

  if (location && semanticLocations) {
    return Property.find({ ...filters, $or: mongoQuery.$or });
  }

  return Property.find(mongoQuery).limit(100);
};

const getRecommendations = async (id, count = 3) => {
  const prop = await Property.findById(id);
  if (!prop) return [];

  // Same location + same bhk
  let recs = await Property.find({
    _id: { $ne: prop._id },
    location: new RegExp(`^${prop.location}$`, 'i'),
    bhk: prop.bhk
  }).limit(count);

  if (recs.length >= count) return recs;

  // Same location only
  const stillNeed = count - recs.length;
  const more = await Property.find({
    _id: { $ne: prop._id },
    location: new RegExp(`^${prop.location}$`, 'i')
  }).limit(stillNeed);

  recs = recs.concat(more);
  if (recs.length >= count) return recs;

  // Same bhk anywhere
  const stillNeed2 = count - recs.length;
  const more2 = await Property.find({
    _id: { $ne: prop._id },
    bhk: prop.bhk
  }).limit(stillNeed2);

  recs = recs.concat(more2);
  return recs.slice(0, count);
};

module.exports = {
  getAllProperties,
  getPropertyById,
  searchProperties,
  getRecommendations
};
