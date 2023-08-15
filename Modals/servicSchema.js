const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  serviceName: String,
  price: Number,
  quantity: Number,
  amount: Number,
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
