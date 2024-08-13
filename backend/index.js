const express = require("express");
const cors = require("cors");
const app = express();
const { PORT, connectToDb } = require("./db");
const Booking = require("./schemas/Booking"); 
const Business = require("./schemas/Business");

app.use(cors());
app.use(express.json());

connectToDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

const data = {
  categories: [
    {
      id: 1,
      name: "Food",
      bgcolor: { hex: "#f00" },
      icon: { url: "http://example.com/icon1.png" },
    },
    {
      id: 2,
      name: "Retail",
      bgcolor: { hex: "#0f0" },
      icon: { url: "http://example.com/icon2.png" },
    },
  ],
  bookings: [],
};

//businesses

app.get("/businesses", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/businesses/:id", async (req, res) => {
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

  app.get("/businesses/category/:category", async (req, res) => {
    try {
      const category = req.params.category.toLowerCase();
      const businesses = await Business.find({ category: new RegExp(`^${category}$`, 'i') });
      res.json(businesses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.post("/businesses", async (req, res) => {
  const newBusiness = new Business(req.body);
  try {
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/businesses/:id", async (req, res) => {
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

app.delete("/businesses/:id", async (req, res) => {
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



app.get("/businesses/:businessId/bookings/date/:date", async (req, res) => {
  try {
    const { businessId, date } = req.params;
    const bookings = await Booking.find({ businessId, date });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Categories
app.get("/categories", async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  app.post("/categories", async (req, res) => {
    const newCategory = new Category(req.body);
    try {
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(400).json(error);
    }
  });


  app.put("/categories/:id", async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.json(updatedCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  
  app.delete("/categories/:id", async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      res.json(deletedCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  

// Bookings
app.post("/bookings", async (req, res) => {
    const { businessId, date, time, userEmail, userName } = req.body;
  
    const newBooking = new Booking({
      businessId,
      date,
      time,
      userEmail,
      userName,
      status: "confirmed", 
    });
  
    try {
      const savedBooking = await newBooking.save();
      res.status(201).json(savedBooking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

  app.get("/bookings/user/:email", async (req, res) => {
    try {
      const userBookings = await Booking.find({ userEmail: req.params.email });
      res.json(userBookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  app.delete("/bookings/:id", async (req, res) => {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
      if (deletedBooking) {
        res.send("Booking deleted");
      } else {
        res.status(404).send("Booking not found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  