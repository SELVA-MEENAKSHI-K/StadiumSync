let gateA = 50;
let gateD = 40;

function updateData() {
  gateA = Math.floor(Math.random() * 100);
  gateD = Math.floor(Math.random() * 100);

  document.getElementById("gateA").innerText = gateA;
  document.getElementById("gateD").innerText = gateD;

  updateAI();
}

function updateAI() {
  let suggestion = "";

  if (gateA > gateD) {
    suggestion = "🚀 Use Gate D – Less crowded (Save time)";
  } else {
    suggestion = "🚀 Use Gate A – Faster entry";
  }

  document.getElementById("aiSuggestion").innerText = suggestion;
}

setInterval(updateData, 3000);
