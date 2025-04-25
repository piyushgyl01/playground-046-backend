const express = require("express");
const app = express();

const { connectDB } = require("./db/db.connect");

const AIModel = require("./models/ai.model");

connectDB();
app.use(express.json());

const cors = require("cors");
const aiModel = require("./models/ai.model");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("AI Modela Database! Browse your favorite ai model");
});

// async function insertData(data) {
//   try {
//     const savedData = await aiModel.insertMany(data);
//     console.log(savedData);
//   } catch (error) {
//     console.log(error);
//   }
// }

// insertData(mockAIModels)

app.get("/models", async (req, res) => {
  try {
    const models = await aiModel.find();
    res.json(models);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.get("/models/:id", async (req, res) => {
  try {
    const model = await aiModel.findById(req.params.id);
    res.json(model);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.listen(4000, () => {
  console.log("App is listening on port 4000");
});
