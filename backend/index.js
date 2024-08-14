const express = require("express");
const cors = require("cors");
const app = express();
const { PORT, connectToDb } = require("./db");

const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/authRoutes");
const businessesRoutes = require("./routes/BusinessRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const bookingRoutes = require("./routes/BookingRoutes");

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/business", businessesRoutes);
app.use("/category", categoryRoutes);
app.use("/booking", bookingRoutes);

connectToDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
