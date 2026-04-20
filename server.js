const express = require("express");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= USERS =================
let users = [
  {
    name: "Alex Johnson",
    email: "attendee@stadium.com",
    password: "1234",
    role: "attendee"
  },
  {
    name: "Maria Chen",
    email: "staff@stadium.com",
    password: "1234",
    role: "staff"
  },
  {
    name: "David Osei",
    email: "admin@stadium.com",
    password: "1234",
    role: "admin"
  }
];

let sosLogs = [];

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("🚀 StadiumSync API running on Cloud Run");
});

// ================= LOGIN =================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } else {
    res.json({
      success: false,
      message: "Invalid credentials ❌"
    });
  }
});

// ================= CROWD DATA =================
app.get("/api/crowd", (req, res) => {
  res.json([
    { zone: "Gate A", waitTime: Math.floor(Math.random() * 20) + 5 },
    { zone: "Gate B", waitTime: Math.floor(Math.random() * 10) + 2 },
    { zone: "Food Stand 7", waitTime: Math.floor(Math.random() * 15) + 3 },
    { zone: "Drinks Stand 2", waitTime: Math.floor(Math.random() * 25) + 10 }
  ]);
});

// ================= AI (SIMPLE MOCK) =================
app.post("/api/ai", (req, res) => {
  const userMsg = req.body.message;

  let reply = "🤖 I can help with navigation, crowd, and alerts.";

  if (userMsg.toLowerCase().includes("food")) {
    reply = "🍔 Least crowded food stand: Food Stand 3 (5 min wait)";
  } else if (userMsg.toLowerCase().includes("restroom")) {
    reply = "🚻 Nearest restroom: Block C (12% crowd)";
  } else if (userMsg.toLowerCase().includes("exit")) {
    reply = "🚪 Best exit: Gate C (clear route)";
  } else if (userMsg.toLowerCase().includes("score")) {
    reply = "⚽ Score: Lions FC 2 - 1 Eagles SC";
  }

  res.json({ reply });
});

// ================= SOS =================
app.post("/api/sos", (req, res) => {
  const log = {
    user: req.body.user,
    location: req.body.location,
    type: req.body.type,
    time: new Date()
  };

  sosLogs.push(log);

  console.log("🚨 SOS RECEIVED:", log);

  res.json({
    message: "SOS sent successfully 🚨",
    status: "ok"
  });
});

// ================= PORT =================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
