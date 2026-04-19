const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

// USERS
let users = [
  {
    name: "Alex Johnson",
    email: "attendee@stadium.com",
    password: "1234",
    role: "attendee"
  }
];

let sosLogs = [];

// LOGIN
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
    res.json({ success: false });
  }
});

// CROWD
app.get("/api/crowd", (req, res) => {
  res.json([
    { zone: "Gate A", waitTime: Math.floor(Math.random()*20)+5 },
    { zone: "Gate B", waitTime: Math.floor(Math.random()*10)+2 },
    { zone: "Food Stand 7", waitTime: Math.floor(Math.random()*15)+3 },
    { zone: "Drinks Stand 2", waitTime: Math.floor(Math.random()*25)+10 }
  ]);
});

// AI
app.post("/api/ai", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await response.json();

    res.json({
      reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
    });

  } catch (err) {
    res.json({ reply: "AI error ❌" });
  }
});

// SOS
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

// SERVER
app.listen(5000, () => {
  console.log("🔥 Server running on http://localhost:5000");
});
