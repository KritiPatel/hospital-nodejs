const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.json());

const patientController = require("../Controller/patientController");
router.get("/billing", patientController.getAllPatientsWithServices);
router.get("/billing/search", patientController.searchPatientsByName);
router.get("/patients/:id", patientController.getPatientDetails);

module.exports = router;
