const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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
    businesses: [
      {
        id: 1,
        name: "Business One",
        about: "Description One",
        address: "Address One",
        category: "Food",
        contactPerson: "Person One",
        email: "email@example.com",
        images: [{ url: "http://example.com/image1.png" }],
      },
      {
        id: 2,
        name: "Business Two",
        about: "Description Two",
        address: "Address Two",
        category: "Retail",
        contactPerson: "Person Two",
        email: "email2@example.com",
        images: [{ url: "http://example.com/image2.png" }],
      },
    ],
    bookings: [],
};
  

// Categories
app.get("/categories", (req, res) => {
    res.json(data.categories);
  });
  
  app.post("/categories", (req, res) => {
    const newCategory = {
      id: data.categories.length + 1,
      ...req.body,
    };
    data.categories.push(newCategory);
    res.status(201).json(newCategory);
  });
  
  // Businesses
  app.get("/businesses", (req, res) => {
    res.json(data.businesses);
  });
  
  app.get("/businesses/category/:category", (req, res) => {
    const filteredBusinesses = data.businesses.filter(
      (b) => b.category.toLowerCase() === req.params.category.toLowerCase()
    );
    res.json(filteredBusinesses);
  });
  
  app.get("/businesses/:id", (req, res) => {
    const business = data.businesses.find((b) => b.id == req.params.id);
    if (business) {
      res.json(business);
    } else {
      res.status(404).send("Business not found");
    }
  });
  
  app.get("/businesses/:businessId/bookings/date/:date", (req, res) => {
    const slots = data.bookings.filter(
      (b) => b.businessId == req.params.businessId && b.date === req.params.date
    );
    res.json(slots);
  });
  
  // Bookings
  app.post("/bookings", (req, res) => {
    const { businessId, date, time, userEmail, userName } = req.body;
    const newBooking = {
      id: data.bookings.length + 1,
      businessId,
      date,
      time,
      userEmail,
      userName,
      status: "Booked",
    };
    data.bookings.push(newBooking);
    res.status(201).json(newBooking);
  });
  
  app.get("/bookings/user/:email", (req, res) => {
    const userBookings = data.bookings.filter(
      (b) => b.userEmail === req.params.email
    );
    res.json(userBookings);
  });
  
  app.delete("/bookings/:id", (req, res) => {
    const index = data.bookings.findIndex((b) => b.id == req.params.id);
    if (index !== -1) {
      data.bookings.splice(index, 1);
      res.send("Booking deleted");
    } else {
      res.status(404).send("Booking not found");
    }
  });

app.listen(8080, () => {
    console.log("Server started");
  });