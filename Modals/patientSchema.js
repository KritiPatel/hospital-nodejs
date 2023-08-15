const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  billNo: String,
  dateTime: Date,
  receiptNo: String,
  mobileNumber: String,
  tax: Number,
  discount: Number,
  total: Number,
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
