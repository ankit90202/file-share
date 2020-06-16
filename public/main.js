const socket = io("http://127.0.0.1:3000/");
const download = document.querySelector("#uploaded a");
const img = document.querySelector("#uploaded a img");
const userDetail = document.getElementById("user_detail");

socket.on("bot", (files) => {
  files.forEach((element, index) => {
    console.log(element);
    download.setAttribute("href", `./uploads/${element}`);
    img.setAttribute("src", `./uploads/${element}`);
  });
});

socket.on("user", (user) => {
  userDetail.innerHTML += `<li>${user}</li>`;
});
