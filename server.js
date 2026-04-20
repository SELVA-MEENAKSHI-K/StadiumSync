const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ================= USERS =================
let users = [
  {
    name: "Alex Johnson",
    email: "attendee@stadium.com",
    password: "1234",
    role: "attendee"
  }
];

let sosLogs = [];

// ================= LOGIN =================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

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
    res.json({ success: false, message: "Invalid credentials ❌" });
  }
});

// ================= CROWD =================
app.get("/api/crowd", (req, res) => {
  res.json([
    { zone: "Gate A", waitTime: Math.floor(Math.random()*20)+5 },
    { zone: "Gate B", waitTime: Math.floor(Math.random()*10)+2 },
    { zone: "Food Stand 7", waitTime: Math.floor(Math.random()*15)+3 },
    { zone: "Drinks Stand 2", waitTime: Math.floor(Math.random()*25)+10 }
  ]);
});

// ================= AI (SAFE VERSION) =================
app.post("/api/ai", (req, res) => {
  res.json({ reply: "AI working locally 🤖" });
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
  console.log("🚨 SOS:", log);

  res.json({ message: "SOS sent 🚨" });
});

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("StadiumSync API running ✅");
});

// ================= SERVER =================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("🔥 Server running on port " + PORT);
});
