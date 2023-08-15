const Patient = require("../Modals/patientSchema");
const Service = require("../Modals/servicSchema");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getAllPatientsWithServices = async (req, res) => {
  try {
    const patientsWithServices = await Patient.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "patientId",
          as: "services",
        },
      },
    ]);

    console.log("Patients with services:", patientsWithServices);

    res.json(patientsWithServices);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPatientDetails = async (req, res) => {
  try {
    const patientId = req.params.id;
    console.log(patientId);
    const patient = await Patient.findById(patientId).lean();
    console.log("data", patient);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const services = await Service.find({ patientId: patientId }).lean();

    patient.services = services;
    res.json(patient);
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchPatientsByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Name parameter is required for search" });
    }

    const patientsWithServices = await Patient.aggregate([
      {
        $match: {
          name: { $regex: name, $options: 'i' }
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "patientId",
          as: "services",
        },
      },
    ]);

    console.log("Patients with services:", patientsWithServices);

    res.json(patientsWithServices);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
