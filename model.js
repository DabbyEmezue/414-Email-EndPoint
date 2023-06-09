const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const emailSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

const emailModel = mongoose.model("test", emailSchema);

module.exports = emailModel;
