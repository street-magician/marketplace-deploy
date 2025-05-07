const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createListing = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        imageUrl,
        ownerId: req.user.userId
      }
    });

    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create listing', detail: err.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      include: { owner: { select: { email: true } } }
    });

    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};

exports.getListingById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateListing = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, price, imageUrl } = req.body;

  try {
    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing || listing.ownerId !== req.user.userId)
      return res.status(403).json({ error: 'Unauthorized or not found' });

    const updated = await prisma.listing.update({
      where: { id },
      data: { title, description, price: parseFloat(price), imageUrl }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update listing' });
  }
};

exports.deleteListing = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing || listing.ownerId !== req.user.userId)
      return res.status(403).json({ error: 'Unauthorized or not found' });

    await prisma.listing.delete({ where: { id } });
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete listing' });
  }
};
