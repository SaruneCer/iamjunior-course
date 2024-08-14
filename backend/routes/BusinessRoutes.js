const express = require("express");
const Business = require("../schemas/Business");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (business) {
      res.json(business);
    } else {
      res.status(404).send("Business not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const businesses = await Business.find({
      category: new RegExp(`^${category}$`, "i"),
    });
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const newBusiness = new Business(req.body);
  try {
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedBusiness);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBusiness = await Business.findByIdAndDelete(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(deletedBusiness);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:businessId/bookings/date/:date", async (req, res) => {
  try {
    const { businessId, date } = req.params;
    const bookings = await Booking.find({ businessId, date });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
