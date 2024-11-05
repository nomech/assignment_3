//  Importing the connectTexts array from the data.js file
import { connectTexts } from "./data.js";

//  Initializing variables
const connectText = document.querySelector(".connect__text");
const connectButton = document.querySelector(".connect__button");
let msgCount = 0;

//  Function to construct the message element
const constructMessageElement = (message) => {
  const messageElement = document.createElement("p");
  messageElement.innerText = message;
  messageElement.classList.add("connect__text-line");

  //  Removing the last class from the last message element
  if (
    connectText.lastElementChild &&
    connectText.lastElementChild.classList.contains("connect__text-line")
  ) {
    connectText.lastElementChild.classList.remove("connect__text-line");
    connectText.lastElementChild.classList.add("connect__text");
  }

  //  Appending the message element to the connect text
  connectText.appendChild(messageElement);
  return messageElement;
};

//  Function to construct the open channel message element
const constructOpenChannel = () => {
  //  Creating the open channel message element
  const openChannel = document.createElement("p");
  openChannel.innerText = "Secure channel successfully established! The Emperor Protects!";
  openChannel.classList.add("connect__text-line");
  openChannel.classList.add("connect__text-line--last");
  connectText.innerHTML = openChannel.outerHTML;

  //  Redirecting to the quiz page
  redirect();
  return openChannel;
};


//  Function to create a message element with a delay
const messageTimeout = (message, time) => {
  //  Setting a timeout to construct the message element
  setTimeout(() => {
    //  Constructing the message element
    constructMessageElement(message);

    //  Incrementing the message count
    msgCount++;
    //  Checking if all messages have been displayed
    if (msgCount === connectTexts.length) {
      //  Constructing the open channel message element
      constructOpenChannel();
    }
  }, time);
};

//  Function to handle the connection process
const connect = () => {
  //  Adding the connecting class to the connect button
  connectButton.classList.add("connecting");

  //  Iterating through the connect texts
  connectTexts.forEach((message) => {
    messageTimeout(message.Text, message.delay);
  });
};

//  Function to redirect to the quiz page
const redirect = () => {
  //  Setting a timeout to redirect to the quiz page
  setTimeout(() => {
    window.location.href = "pages/quiz.html";
  }, 1500);
};

//  Adding an event listener to the connect button
connectButton.addEventListener("click", connect);
