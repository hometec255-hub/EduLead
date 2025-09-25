const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const scholarshipRoutes = require('./src/routes/scholarshipRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');
const mentorshipRoutes = require('./src/routes/mentorshipRoutes');
const resourceRoutes = require('./src/routes/resourceRoutes');
const institutionRoutes = require('./src/routes/institutionRoutes');
const studentRoutes = require('./src/routes/studentRoutes');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/mentorships', mentorshipRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/students', studentRoutes);

app.get("/", (req, res) => {
  res.send("EduLead API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
