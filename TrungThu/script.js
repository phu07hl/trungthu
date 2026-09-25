/* ============================================================
   PHẦN CẤU HÌNH: bạn có thể sửa nội dung và đường dẫn tại đây.
   Đường dẫn asset được tính từ thư mục chứa index.html.
   ============================================================ */
const danh_sach_loi_chuc = [
  "Chúc cậu một đời bình an",
  "Trung thu vui vẻ",
  "Mong mọi dịu dàng đều tìm đến cậu",
  "Mong nụ cười luôn ở trên môi bạn",
  "Điều ước dưới trăng rồi sẽ thành",
  "Chúc bạn luôn được yêu thương"
];
const link_anh_nen = "assets/intro/00-desktop-background.webp";
const link_nhac_nen = "assets/trung-thu.mp3";
const link_anh_bay_len = [
  "assets/memory-1.jpeg",
  "assets/memory-2.jpeg"
];
// Thời gian cần giữ mặt trăng để bắt đầu (mili giây).
const THOI_GIAN_AN_GIU = 1550;
const SO_HAT_SANG = window.matchMedia("(max-width: 700px)").matches ? 78 : 145;
const ANH_THO_BAY = [
  "assets/rabbits/rabbit-flying-with-star.webp",
  "assets/rabbits/rabbit-sleeping-white-crescent.webp",
  "assets/rabbits/rabbit-sitting-golden-crescent.webp"
];

const intro = document.querySelector("#intro");
const cosmos = document.querySelector("#cosmos");
const holdTarget = document.querySelector("#holdTarget");
const progressBar = document.querySelector("#holdProgress span");
const progressTrack = document.querySelector("#holdProgress");
const audio = document.querySelector("#bgMusic");
const soundToggle = document.querySelector("#soundToggle");
const floatingField = document.querySelector("#floatingField");
const starCanvas = document.querySelector("#starfield");

document.querySelector(".intro-sky").style.backgroundImage =
  `linear-gradient(180deg,rgba(4,8,20,.1),rgba(8,14,31,.3)),url("${link_anh_nen}")`;
audio.src = link_nhac_nen;

let holdTimer = null;
let holdStartedAt = 0;
let isTransitioning = false;
let audioStarted = false;
let animationFrame = 0;
let stars = [];
let lastFrameAt = 0;

// Phát nhạc ngay trong cử chỉ chạm/nhấn để trình duyệt cho phép autoplay.
function startMusic() {
  if (audioStarted) return;
  audio.volume = 0;
  const playRequest = audio.play();
  if (playRequest && typeof playRequest.then === "function") {
    playRequest.then(() => {
      audioStarted = true;
      soundToggle.classList.add("is-playing");
      soundToggle.setAttribute("aria-pressed", "true");
      rampVolume(0.42, 1300);
    }).catch(() => {
      // Nếu thiết bị chặn phát nhạc, nút ♫ vẫn cho phép bật nhạc thủ công.
      soundToggle.classList.remove("is-playing");
    });
  }
}

function rampVolume(target, duration) {
  const start = performance.now();
  const initial = audio.volume;
  function step(now) {
    const amount = Math.min(1, (now - start) / duration);
    audio.volume = initial + (target - initial) * amount;
    if (amount < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function beginHold(event) {
  if (isTransitioning || holdTimer) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;
  event.preventDefault();
  holdStartedAt = performance.now();
  holdTarget.classList.add("is-holding");
  progressTrack.style.opacity = "1";
  startMusic();

  const updateProgress = () => {
    if (!holdTimer) return;
    const amount = Math.min(1, (performance.now() - holdStartedAt) / THOI_GIAN_AN_GIU);
    progressBar.style.width = `${amount * 100}%`;
    if (amount < 1) requestAnimationFrame(updateProgress);
  };
  requestAnimationFrame(updateProgress);
  holdTimer = window.setTimeout(startExperience, THOI_GIAN_AN_GIU);
}

function cancelHold() {
  if (!holdTimer) return;
  window.clearTimeout(holdTimer);
  holdTimer = null;
  holdTarget.classList.remove("is-holding");
  progressBar.style.width = "0%";
  progressTrack.style.opacity = "0";
}

function startExperience() {
  if (isTransitioning) return;
  isTransitioning = true;
  holdTimer = null;
  holdTarget.classList.remove("is-holding");
  intro.classList.add("is-leaving");
  window.setTimeout(() => {
    intro.classList.remove("is-active");
    intro.setAttribute("aria-hidden", "true");
    cosmos.classList.add("is-active");
    cosmos.setAttribute("aria-hidden", "false");
    soundToggle.hidden = false;
    createFloatingWishes();
    startStarfield();
  }, 420);
}

holdTarget.addEventListener("pointerdown", beginHold);
holdTarget.addEventListener("pointerup", cancelHold);
holdTarget.addEventListener("pointercancel", cancelHold);
holdTarget.addEventListener("lostpointercapture", cancelHold);
window.addEventListener("pointerup", cancelHold);
window.addEventListener("blur", cancelHold);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) cancelHold();
});

// Tạo lời chúc và các chú thỏ ở nhiều độ sâu, tốc độ và độ mờ khác nhau.
function createFloatingWishes() {
  floatingField.replaceChildren();
  const width = window.innerWidth;
  const isPhone = window.matchMedia("(max-width: 700px)").matches;
  const pieces = isPhone
    ? Math.max(15, Math.min(24, Math.round(width / 21)))
    : Math.max(22, Math.min(38, Math.round(width / 38)));
  for (let i = 0; i < pieces; i += 1) {
    const useRabbit = i % 6 === 4;
    const usePhoto = !useRabbit && i % 3 !== 0;
    const useImage = useRabbit || usePhoto;
    const item = document.createElement(useImage ? "img" : "span");
    const depth = Math.random();
    const left = 3 + Math.random() * 89;
    const duration = (useImage ? 8 : 10) + Math.random() * (useImage ? 9 : 12);
    const delay = -Math.random() * duration;
    const blur = depth < 0.3 ? "1.8px" : depth > 0.78 ? "1px" : "0px";
    const opacity = 0.24 + depth * 0.58;
    const maxDrift = Math.min(isPhone ? 105 : 235, window.innerWidth * (isPhone ? 0.26 : 0.18));
    let drift = Math.round(Math.random() * maxDrift * 2 - maxDrift);
    item.style.left = `${left}%`;
    item.style.setProperty("--duration", `${duration}s`);
    item.style.setProperty("--delay", `${delay}s`);
    item.style.setProperty("--blur", blur);
    item.style.setProperty("--depth", `${Math.round(depth * 130 - 35)}px`);
    item.style.setProperty("--alpha", opacity.toFixed(2));
    item.style.setProperty("--drift", `${drift}px`);
    item.style.setProperty("--drift-mid", `${Math.round(drift * 0.48)}px`);
    item.style.setProperty("--tilt-start", `${Math.round(Math.random() * 18 - 9)}deg`);
    item.style.setProperty("--tilt-end", `${Math.round(Math.random() * 34 - 17)}deg`);
    item.style.setProperty("--scale-start", (0.68 + depth * 0.28).toFixed(2));
    item.style.setProperty("--scale-end", (0.86 + depth * 0.5).toFixed(2));

    if (useImage) {
      item.className = `wish-image${usePhoto ? " wish-photo" : ""}`;
      item.src = usePhoto
        ? link_anh_bay_len[Math.floor(Math.random() * link_anh_bay_len.length)]
        : ANH_THO_BAY[Math.floor(Math.random() * ANH_THO_BAY.length)];
      item.alt = "";
      const imageSize = usePhoto
        ? (isPhone ? 42 + Math.random() * 28 : 55 + Math.random() * 55)
        : (isPhone ? 34 + Math.random() * 24 : 38 + Math.random() * 40);
      item.style.setProperty("--width", `${imageSize}px`);
    } else {
      item.className = `wish${i % 3 === 0 ? " is-greeting" : ""}`;
      item.textContent = danh_sach_loi_chuc[i % danh_sach_loi_chuc.length];
      item.style.setProperty("--size", `${12 + depth * 13}px`);
      item.style.setProperty("--mobile-size", `${11 + depth * 5}px`);
    }
    floatingField.append(item);
    if (!useImage) {
      // Căn từng câu vào vùng an toàn để chữ không bị cắt ở cạnh màn hình.
      const textWidth = item.getBoundingClientRect().width;
      const safeRight = Math.max(12, window.innerWidth - textWidth - 12);
      const startX = Math.min(window.innerWidth * left / 100, safeRight);
      drift = Math.max(12 - startX, Math.min(safeRight - startX, drift));
      item.style.left = `${startX}px`;
      item.style.setProperty("--drift", `${drift}px`);
      item.style.setProperty("--drift-mid", `${Math.round(drift * 0.48)}px`);
    }
  }
}

// Vẽ sao trên canvas, không cần thư viện ngoài.
function resizeStarfield() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = starCanvas.getBoundingClientRect();
  starCanvas.width = Math.round(rect.width * dpr);
  starCanvas.height = Math.round(rect.height * dpr);
  const context = starCanvas.getContext("2d");
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({ length: SO_HAT_SANG }, () => ({
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,
    radius: Math.random() * 1.6 + 0.25,
    alpha: Math.random() * 0.65 + 0.15,
    speed: Math.random() * 0.45 + 0.12,
    phase: Math.random() * Math.PI * 2
  }));
}

function drawStarfield(now = 0) {
  if (now - lastFrameAt < 32) {
    animationFrame = requestAnimationFrame(drawStarfield);
    return;
  }
  lastFrameAt = now;
  const context = starCanvas.getContext("2d");
  const width = starCanvas.clientWidth;
  const height = starCanvas.clientHeight;
  context.clearRect(0, 0, width, height);
  for (const star of stars) {
    star.y -= star.speed;
    if (star.y < -2) {
      star.y = height + 2;
      star.x = Math.random() * width;
    }
    const twinkle = 0.65 + Math.sin(now * 0.0012 + star.phase) * 0.35;
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(255,231,190,${star.alpha * twinkle})`;
    context.shadowBlur = star.radius > 1.1 ? 9 : 0;
    context.shadowColor = "#f5d799";
    context.fill();
  }
  context.shadowBlur = 0;
  animationFrame = requestAnimationFrame(drawStarfield);
}

function startStarfield() {
  resizeStarfield();
  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(drawStarfield);
}
window.addEventListener("resize", () => {
  if (cosmos.classList.contains("is-active")) {
    resizeStarfield();
    createFloatingWishes();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") cancelHold();
});

soundToggle.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      audioStarted = true;
      soundToggle.classList.add("is-playing");
      soundToggle.setAttribute("aria-pressed", "true");
      rampVolume(0.42, 500);
    } catch {
      soundToggle.setAttribute("aria-pressed", "false");
    }
  } else {
    rampVolume(0, 250);
    window.setTimeout(() => audio.pause(), 260);
    audioStarted = false;
    soundToggle.classList.remove("is-playing");
    soundToggle.setAttribute("aria-pressed", "false");
  }
});

