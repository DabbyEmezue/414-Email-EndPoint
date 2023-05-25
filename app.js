const express = require("express");
const app = express();
const router = express.Router();
const emailModel = require("./model");
let PORT = process.env.PORT || 3000 || 5174;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGODBURI;
const cors = require("cors");

//
app.use(cors({ origin: "*" }));
app.use(express.json());
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(console.log("DB connected"));
///

router.post("/mails", async (req, res) => {
  try {
    const { Email } = req.body;
    if (!Email) {
      return res.status(400).send("Please input a valid Email");
    }
    const dbEmail = await emailModel.findOne({ email: Email });
    if (!dbEmail) {
      emailModel.create({ email: Email });
      return res.status(200).send("Your email has been registered");
    }
    return res.status(409).send("We have your email already");
  } catch (err) {
    console.log(err);
  }
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
