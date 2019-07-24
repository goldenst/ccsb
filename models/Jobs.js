const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const JobSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  order: {
    type: String
  },
  vehicle: {
    type: String
  },
  jobdesc: {
    type: String
  },
  parts: {
    type: String
  },
  tech: {
    type: String
  },
  promised: {
    type: String
  },
  status: {
    type: String
  },
  priorty: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("job", JobSchema);
