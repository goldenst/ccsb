const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validator } = require("express-validator");

const Job = require("../models/Jobs");
const User = require("../models/Users");

// @Route   GET api/jobs
// @desc    get users jobs
// @access  private
// @Status  Works
router.get("/",  async (req, res) => {
  try {
    const job = await Job.find().sort({
      priorty: 1
    });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route   GET api/jobs/:id
// @desc    get users jobs
// @access  private
// @Status  Works
router.get("/:id",  async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    console.log(req.params.id)
    if (!job) return res.status(404).json({ msg: "Job not found" });

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route   POST api/jobs
// @desc    Add new job
// @access  private
// @Status  broken  

router.post("/",  async (req, res) => {
  const {
    order,
    vehicle,
    jobdesc,
    parts,
    tech,
    promised,
    status,
    priorty
    
  } = req.body;

  try {
    const newJob = new Job({
      order,
      vehicle,
      jobdesc,
      parts,
      tech,
      promised,
      status,
      priorty,
      
    });

    const job = await newJob.save();

    res.json(job)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error 61')
  }
});

// @Route   PUT api/jobs/:id
// @desc    update job
// @access  private
// @Status  Works
router.put("/:id", async (req, res) => {
  
  const {
    order,
    vehicle,
    jobdesc,
    parts,
    tech,
    promised,
    status,
    priorty
  } = req.body;

  const jobFields = {};
  if (order) jobFields.order = order;
  if (vehicle) jobFields.vehicle = vehicle;
  if (jobdesc) jobFields.jobdesc = jobdesc;
  if (parts) jobFields.parts = parts;
  if (tech) jobFields.tech = tech;
  if (promised) jobFields.promised = promised;
  if (status) jobFields.status = status;
  if (priorty) jobFields.priorty = priorty;

  try {
    let job = await Job.findById(req.params.id);
    console.log(req.params.id)
    if (!job) return res.status(404).json({ msg: "Job not found" });
   
    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route   DELETE api/jobs/:id
// @desc    delete job
// @access  private
// @Status  Works
router.delete("/:id", async (req, res) => {

  try {
   
   let job = await Job.findById(req.params.id);

    await Job.findByIdAndRemove(req.params.id);

    res.json('deleted');
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
