//loading screen
const loadingStorageKey = "portfolio-loading-screen-seen";
const loadingDelay = 700;
const firstLoadingDuration = 1800;
let hasSeenLoadingScreen = false;

try {
  hasSeenLoadingScreen = sessionStorage.getItem(loadingStorageKey) === "true";
} catch (error) {
  hasSeenLoadingScreen = true;
}

function createLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";
  loadingScreen.setAttribute("aria-hidden", "true");
  loadingScreen.innerHTML = `
    <div class="loading-mark">
      <div class="loading-wand">
        <svg class="loading-wand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 56" fill="none" aria-hidden="true">
          <path d="M18.8542 0.248735L12.5448 5.00656L6.07018 0.475695C5.10421 -0.200094 3.83737 0.755208 4.22148 1.86977L6.79725 9.34068L0.48705 14.0991C-0.454485 14.8091 0.0621654 16.3089 1.24155 16.2884L9.14225 16.1481L11.718 23.619C12.1021 24.7336 13.6885 24.7058 14.0331 23.5783L14.5566 21.8634C16.282 23.2203 18.539 24.7254 19.8286 26.2028C19.8606 26.2401 19.8939 26.2777 19.9264 26.3158C19.6432 26.73 19.6395 27.297 19.9571 27.7182L20.4863 28.42C20.8274 28.8723 21.4316 29.0135 21.9298 28.7946C26.8716 35.1584 35.6759 47.7168 36.8453 49.3889C36.7996 49.7756 36.8952 50.18 37.1471 50.5141L38.2374 51.9599C38.5617 52.3899 39.0684 52.6046 39.5708 52.5793C39.3613 52.9781 39.3838 53.4801 39.6725 53.863L40.2071 54.5719C40.6049 55.0994 41.362 55.2056 41.8895 54.8078L46.6067 51.2506C47.1343 50.8528 47.2404 50.0957 46.8426 49.5682L46.308 48.8592C46.0199 48.4772 45.5434 48.3175 45.1018 48.4085C45.2643 47.9324 45.1966 47.3854 44.8729 46.9562L43.7826 45.5103C43.5307 45.1762 43.1682 44.9732 42.7838 44.9107C41.4945 43.329 31.8323 31.4502 27.0599 24.9386C27.4324 24.5198 27.4714 23.8798 27.1224 23.417L26.5932 22.7153C26.2672 22.2829 25.6998 22.134 25.2149 22.314C25.185 22.2677 25.1548 22.2227 25.1261 22.1779C24.048 20.5072 23.2914 17.9659 22.457 15.9133L24.242 15.8812C25.4207 15.86 25.8843 14.3432 24.9177 13.6666L18.4431 9.13571L20.7506 1.57818C21.0952 0.450705 19.7947 -0.459256 18.8532 0.250741L18.8542 0.248735Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="loading-sparkle loading-sparkle-1"></div>
      <div class="loading-sparkle loading-sparkle-2"></div>
      <div class="loading-sparkle loading-sparkle-3"></div>
      <div class="loading-sparkle loading-sparkle-4"></div>
      <div class="loading-sparkle loading-sparkle-5"></div>
      <div class="loading-sparkle loading-sparkle-6"></div>
      <div class="loading-sparkle loading-sparkle-7"></div>
      <div class="loading-sparkle loading-sparkle-8"></div>
    </div>
  `;
  document.body.prepend(loadingScreen);

  return loadingScreen;
}

function markLoadingScreenSeen() {
  try {
    sessionStorage.setItem(loadingStorageKey, "true");
  } catch (error) {
    // Storage can be unavailable in private or restricted contexts.
  }
}

function removeLoadingScreen(loadingScreen) {
  loadingScreen.classList.add("is-hiding");
  window.setTimeout(() => loadingScreen.remove(), 500);
}

if (!hasSeenLoadingScreen) {
  const loadingScreen = createLoadingScreen();
  const loadingStartedAt = performance.now();

  function hideFirstLoadingScreen() {
    markLoadingScreenSeen();

    const elapsed = performance.now() - loadingStartedAt;
    const remaining = Math.max(0, firstLoadingDuration - elapsed);

    window.setTimeout(() => {
      removeLoadingScreen(loadingScreen);
    }, remaining);
  }

  if (document.readyState === "complete") {
    hideFirstLoadingScreen();
  } else {
    window.addEventListener("load", hideFirstLoadingScreen, { once: true });
  }
} else if (document.readyState !== "complete") {
  let delayedLoadingScreen = null;
  const loadingTimer = window.setTimeout(() => {
    if (document.readyState !== "complete") {
      delayedLoadingScreen = createLoadingScreen();
    }
  }, loadingDelay);

  window.addEventListener("load", () => {
    window.clearTimeout(loadingTimer);
    markLoadingScreenSeen();

    if (delayedLoadingScreen) {
      removeLoadingScreen(delayedLoadingScreen);
    }
  }, { once: true });
} else {
  markLoadingScreenSeen();
}

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

//header active page
const siteMenu = document.getElementById("menu");

if (siteMenu) {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const archivePages = new Set([
    "archive.html",
    "maisonchance.html",
    "themergedlayers.html",
    "thepedlar.html",
    "wheredolostthingsgo.html"
  ]);
  const worksPages = new Set([
    "works.html",
    "anam.html",
    "fieldop.html",
    "nguyetvienhoi.html",
    "soaikinhlam.html",
    "taadesign.html",
    "thaytuongdoivan.html",
    "touristsgohome.html"
  ]);

  let activeHref = "";

  if (currentPage === "about.html") {
    activeHref = "about.html";
  } else if (archivePages.has(currentPage)) {
    activeHref = "archive.html";
  } else if (worksPages.has(currentPage)) {
    activeHref = "works.html";
  }

  siteMenu.querySelectorAll("li").forEach(item => {
    const link = item.querySelector("a");
    item.classList.toggle(
      "is-active",
      Boolean(activeHref && link && link.getAttribute("href") === activeHref)
    );
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
const canUseFinePointer = window.matchMedia("(pointer: fine)").matches;
const profileDragCursor = canUseFinePointer ? "var(--cursor-wand-hover), grabbing" : "grabbing";
const profileRestCursor = canUseFinePointer ? "var(--cursor-wand-hover), grab" : "grab";

if (profilePic) {
  profilePic.addEventListener("mousedown", (e) => {
    isDragging = true;

    offsetX = e.clientX - profilePic.offsetLeft;
    offsetY = e.clientY - profilePic.offsetTop;

    profilePic.style.cursor = profileDragCursor;
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
    profilePic.style.cursor = profileRestCursor;
});
