const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ================= DATABASE (TEMP)
let users = [
  { email: "attendee@stadium.com", password: "1234", role: "attendee" }
];

let sosLogs = [];

// ================= LOGIN API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, user });
  } else {
    res.json({ success: false, message: "Invalid credentials ❌" });
  }
});

// ================= DYNAMIC CROWD DATA
app.get("/api/crowd", (req, res) => {
  const data = [
    { zone: "Gate A", waitTime: Math.floor(Math.random()*20)+5 },
    { zone: "Gate B", waitTime: Math.floor(Math.random()*10)+2 },
    { zone: "Food Stand 7", waitTime: Math.floor(Math.random()*15)+3 },
    { zone: "Drinks Stand 2", waitTime: Math.floor(Math.random()*25)+10 }
  ];

  res.json(data);
});

// ================= AI CHAT (SMART)
app.post("/api/ai", async (req, res) => {
  try {
    const { message } = req.body;

    const context = `
You are StadiumSync AI.
Use this real-time data:
- Gate A wait: 18 min
- Gate B wait: 5 min
- Food Stand 7: 8 min
- Drinks Stand 2: 22 min

Give smart suggestions.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: context + "\nUser: " + message }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.json({
      reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
    });

  } catch (error) {
    res.json({ reply: "AI error ❌" });
  }
});

// ================= SOS SYSTEM
app.post("/api/sos", (req, res) => {
  const { user, location, type } = req.body;

  const log = {
    user,
    location,
    type,
    time: new Date()
  };

  sosLogs.push(log);

  console.log("🚨 SOS ALERT:", log);

  res.json({ message: "Emergency sent to control room 🚨" });
});

// ================= SERVER
app.listen(5000, () => {
  console.log("🔥 Server running on http://localhost:5000");
});
