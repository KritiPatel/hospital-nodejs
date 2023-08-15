const express = require("express");
const apiRoutes = require("../blue-infinity-node/Routes/routes");
const db = require("../blue-infinity-node/Db/connection");
const app = express();
const cors = require('cors');

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', 
}));

app.use(express.json());
app.use("/api", apiRoutes);
// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
