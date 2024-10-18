let servitor = document.querySelector(".servitor");
let connectButton = document.querySelector(".connect-button");
let msgCount = 0;

const connectTexts = [
  { Text: "Establishing data-link .........", delay: 0 },
  { Text: "Signal received. Calibrating .........", delay: 40 },
  { Text: "Calibrating .........", delay: 100 },
  { Text: "Data protocols aligned!", delay: 130 },
  { Text: "Uplink stabilizing .........", delay: 170 },
  { Text: "Uplink stabilized.", delay: 200 },
  { Text: "Connection established!", delay: 230 },
  { Text: "Establishing secure encryption cipher .........", delay: 270 },
  {
    Text: "Cipher confirmed. Proceeding with verification .........",
    delay: 300,
  },
  { Text: "Authorization in progress .........", delay: 330 },
  { Text: "Verifying identity markers .........", delay: 370 },
  { Text: "Gene-code and clearance level detected .........", delay: 400 },
  { Text: "Identity confirmed. Sanctity of protocol preserved!", delay: 1150 },
  { Text: "Authorization complete!", delay:1200 },
  {
    Text: "Access granted to mission briefing. Loading data .........",
    delay: 1600,
  },
  { Text: "Data fully retrieved!", delay: 2200 },
];

const constructMessageElement = (message) => {
  let messageElement = document.createElement("p");
  messageElement.innerText = message;
  messageElement.classList.add("flash");

  if (
    servitor.lastElementChild &&
    servitor.lastElementChild.classList.contains("flash")
  ) {
    servitor.lastElementChild.classList.remove("flash");
  }

  servitor.appendChild(messageElement);
  return messageElement;
};

const constructOpenChannel = () => {
  let openChannel = document.createElement("p");
  openChannel.innerText = "By the will of the Omnissiah, the channel is open!";
  openChannel.classList.add("open-channel");
  openChannel.classList.add("last");
  servitor.innerHTML = openChannel.outerHTML;
  console.log("redirect! in 4");
  redirect();
  return openChannel;
};

const messageTimeout = (message, time) => {
  setTimeout(() => {
    constructMessageElement(message);
    msgCount++;
    if (msgCount === connectTexts.length) {
      constructOpenChannel();
    }
  }, time);
};

const connect = () => {
  connectButton.classList.add("connecting");
  connectTexts.forEach((message) => {
    messageTimeout(message.Text, message.delay);
  });
};

const redirect = () => {
  console.log("Redirecting to index.html");
  setTimeout(() => {
    window.location.href = "pages/quiz.html";


  }, 4000);
};

connectButton.addEventListener("click", connect);
