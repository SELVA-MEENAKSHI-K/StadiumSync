const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/crowd", (req, res) => {
  res.json([
    { zone: "Gate A", waitTime: 18 },
    { zone: "Gate B", waitTime: 5 },
    { zone: "Food Stand 7", waitTime: 8 },
    { zone: "Drinks Stand 2", waitTime: 22 }
  ]);
});

app.listen(5000, () => {
  console.log("🔥 Server running on http://localhost:5000");
});