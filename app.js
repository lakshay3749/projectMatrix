const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

// Route & Controller Imports
const { passRoute } = require('./routes/passRouter');
const { residentRoute } = require('./routes/residentRouter');
const { guardRoute } = require('./routes/guardRouter');
const { authRoute } = require('./routes/authRoute');
const { adminRoute } = require('./routes/adminRouter');
const { updateLocationStatusController } = require('./controller/guardController');

// Socket Initialization
const { initSocket } = require('./socket');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- API Routes ---
app.use(passRoute);
app.use(residentRoute);
app.use('/guard', guardRoute);
app.use('/api', authRoute);
app.use('/admin', adminRoute);

// Specialized Controller Route
app.use('/updateLocationStatus', updateLocationStatusController);

// Wake-up Utility (useful for keeping free-tier hosting alive)
app.get("/wakeUp", (req, res) => {
  res.status(200).json({ status: "success", message: "Server is awake!" });
});

// --- Database & Server Start ---

const DB_PATH = process.env.DB_PATH 
const PORT = process.env.PORT || 3000;

mongoose.connect(DB_PATH)
  .then(() => {
    console.log("Hello Saint Lucifer!");
    console.log("Connection to Mongo Successful...");

    const server = http.createServer(app);
    initSocket(server);

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });
