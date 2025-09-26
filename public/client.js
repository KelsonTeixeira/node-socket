// const socket = io();
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const messages = document.querySelector("#messages");

const username = prompt("Enter your username");

const socket = io( {
  query: { username },
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("chat message", input.value);
  input.value = "";
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

socket.on("user joined", (username) => {
  const item = document.createElement("li");
  item.textContent = `${username} joined the chat!`;
  messages.appendChild(item);
});
