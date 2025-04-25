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

app.post("/models", async (req, res) => {
  const { name, capabilities, company } = req.body;

  if (!name || !capabilities || !company) {
    return res
      .status(404)
      .json({ message: "Please fill in all required fields" });
  }
  try {
    const newModel = new aiModel({ name, capabilities, company });
    const savedModel = await newModel.save();

    res.status(201).json(savedModel);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.put("/models/:id", async (req, res) => {
  try {
    const editedModel = await aiModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!editedModel) {
      return res.status(404).json({ message: "Unable to find the model" });
    }

    res.json(editedModel);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.delete("/models/:id", async (req, res) => {
  try {
    const deletedModel = await aiModel.findByIdAndDelete(req.params.id);

    if (!deletedModel) {
      return res.status(404).json({ message: "Unable to find the model" });
    }

    res.json(deletedModel);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.listen(4000, () => {
  console.log("App is listening on port 4000");
});
