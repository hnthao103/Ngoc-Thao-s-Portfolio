//header homepage
const header = document.getElementById("header-home");
const intro = document.getElementById("introduction-text");

if (header && intro) {
  window.addEventListener("scroll", () => {

    if (intro.getBoundingClientRect().top < window.innerHeight * 0.8) {
      header.classList.add("show");
    } else {
      header.classList.remove("show");
    }

  });
}

//sao nhấp nháy homepage

const starsContainer = document.getElementById("stars");

const starAssets = [
  "assets/general/blue star.png",
  "assets/general/yellow star.png"
];

const positions = [
  { x: 4, y: 25 },
  { x: 6, y: 6 },
  { x: 15, y: 8 },
  { x: 20, y: 5 },
  { x: 40, y: 10 },
  { x: 50, y: 5 },
  { x: 60, y: 15 },
  { x: 73, y: 17 },
  { x: 78, y: 12 },
  { x: 87, y: 23 },
  { x: 90, y: 32 },
  { x: 86, y: 60 },
  { x: 82, y: 70 },
  { x: 60, y: 82 },
  { x: 45, y: 61 },
  { x: 26, y: 70 },
  { x: 10, y: 65 },
  { x: 4, y: 72 },
  { x: 7, y: 82 },
  { x: 0, y: 48 }
];

let activeStars = [];

function renderStars() {
  if (!starsContainer) return;

  starsContainer.innerHTML = "";

  activeStars.forEach(pos => {

    const star = document.createElement("div");
    star.classList.add("star");

    const img = document.createElement("img");

    img.src =
      starAssets[Math.floor(Math.random() * starAssets.length)];

    star.appendChild(img);

    star.style.left = `${pos.x}%`;
    star.style.top = `${pos.y}%`;

    starsContainer.appendChild(star);

  });

}

function initializeStars() {

  const shuffled = [...positions].sort(() => Math.random() - 0.5);

  activeStars = shuffled.slice(0, 10);

  renderStars();

}

function twinkleStars() {

  const activeIndex =
    Math.floor(Math.random() * activeStars.length);

  const activeKeys = activeStars.map(
    p => `${p.x}-${p.y}`
  );

  const availablePositions = positions.filter(
    p => !activeKeys.includes(`${p.x}-${p.y}`)
  );

  const newPosition =
    availablePositions[
      Math.floor(Math.random() * availablePositions.length)
    ];

  // tắt 1 sao
  activeStars.splice(activeIndex, 1);

  // bật 1 sao mới
  activeStars.push(newPosition);

  renderStars();

}

window.addEventListener("load", () => {
  if (!starsContainer) return;

  initializeStars();

  setInterval(() => {

  const changes =
    Math.floor(Math.random() * 3) + 1;

  for(let i = 0; i < changes; i++) {
    twinkleStars();
  }

}, 300);

});

//draggable profile pic
const profilePic = document.getElementById("profile-pic");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

if (profilePic) {
  profilePic.addEventListener("mousedown", (e) => {
    isDragging = true;

    offsetX = e.clientX - profilePic.offsetLeft;
    offsetY = e.clientY - profilePic.offsetTop;

    profilePic.style.cursor = "grabbing";
  });
}

document.addEventListener("mousemove", (e) => {
    if (!isDragging || !profilePic) return;

    profilePic.style.left = `${e.clientX - offsetX}px`;
    profilePic.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
    if (!profilePic) return;
    isDragging = false;
    profilePic.style.cursor = "grab";
});
