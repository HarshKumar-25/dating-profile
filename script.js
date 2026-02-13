document.addEventListener("DOMContentLoaded", () => {

    /* =====================
       CAROUSEL SETUP
    ===================== */

    const cards = document.querySelectorAll(".card");
    const lastCard = document.getElementById("lastCard");
    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");

    let currentIndex = 0;
    const spacing = 220;
    let isScrolling = false;
    let wheelCooldown = false;

    function updateCards() {
        cards.forEach((card, i) => {
            let offset = i - currentIndex;

            if (offset > 1) offset -= cards.length;
            if (offset < -1) offset += cards.length;

            if (offset === 0) {
                card.style.transform =
                    `translate(-50%, -50%) translateX(0) scale(1)`;
                card.style.zIndex = 3;
                card.style.opacity = 1;
            }
            else if (offset === 1) {
                card.style.transform =
                    `translate(-50%, -50%) translateX(${spacing}px) scale(0.95)`;
                card.style.zIndex = 2;
                card.style.opacity = 0.9;
            }
            else if (offset === -1) {
                card.style.transform =
                    `translate(-50%, -50%) translateX(-${spacing}px) scale(0.95)`;
                card.style.zIndex = 2;
                card.style.opacity = 0.9;
            }
            else {
                card.style.opacity = 0;
                card.style.zIndex = 0;
            }
        });
    }

    updateCards();

    function move(direction) {
        if (isScrolling) return;
        isScrolling = true;

        currentIndex =
            direction === "right"
                ? (currentIndex + 1) % cards.length
                : (currentIndex - 1 + cards.length) % cards.length;

        updateCards();
        setTimeout(() => isScrolling = false, 500);
    }

    /* =====================
       INPUT CONTROLS
    ===================== */

    window.addEventListener("wheel", (e) => {
        if (wheelCooldown) return;
        wheelCooldown = true;

        e.deltaY > 0 || e.deltaX > 0 ? move("right") : move("left");
        setTimeout(() => wheelCooldown = false, 600);
    }, { passive: true });

    let startX = 0;
    window.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    window.addEventListener("touchend", e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? move("right") : move("left");
        }
    });

    leftBtn?.addEventListener("click", () => move("left"));
    rightBtn?.addEventListener("click", () => move("right"));

    /* =====================
       LAST CARD – VALENTINE LOGIC
    ===================== */

    if (!lastCard) return;

    const storyBtn = lastCard.querySelector(".enter-btn");

    storyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showValentineQuestion();
    });
});

/* =====================
   💘 VALENTINE FLOW
===================== */

function showValentineQuestion() {
    if (document.getElementById("valentine-box")) return;

    const box = document.createElement("div");
    box.id = "valentine-box";
    box.style.marginTop = "16px";
    box.innerHTML = `
        <p style="font-weight:600;margin-bottom:10px;">
            Will you be my Valentine? 💖
        </p>
        <div style="display:flex;gap:14px;justify-content:center;">
            <button id="yesBtn">Yes ❤️</button>
            <button id="noBtn">No 😅</button>
        </div>
    `;

    document.getElementById("lastCard").appendChild(box);

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    /* No button runs away 😈 */
    noBtn.addEventListener("mouseenter", () => {
        noBtn.style.position = "absolute";
        noBtn.style.left = `${Math.random() * 200 - 100}px`;
        noBtn.style.top = `${Math.random() * 120}px`;
    });

    yesBtn.addEventListener("click", startCelebration);
}

/* =====================
   🎉 CELEBRATION
===================== */

function startCelebration() {
    startPoppers(5000);

    setTimeout(() => {
        startHeartRain(5000);
    }, 5000);

    setTimeout(() => {
        showFinalText();
    }, 10000);
}

/* =====================
   🎉 PARTY POPPERS
===================== */

function startPoppers(duration) {
    const left = document.querySelector(".left-popper");
    const right = document.querySelector(".right-popper");

    const interval = setInterval(() => {
        blast(left, 1);
        blast(right, -1);
    }, 300);

    setTimeout(() => clearInterval(interval), duration);
}

function blast(container, dir) {
    const emojis = ["❤️", "💖", "⭐", "✨", "💕"];

    for (let i = 0; i < 30; i++) {
        const e = document.createElement("div");
        e.className = "confetti";
        e.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        e.style.fontSize = `${Math.random() * 12 + 14}px`;
        e.style.setProperty("--x", `${dir * (Math.random() * 300 + 80)}px`);
        e.style.setProperty("--y", `${(Math.random() - 0.5) * 250}px`);

        container.appendChild(e);
        setTimeout(() => e.remove(), 1200);
    }
}

/* =====================
   💕 HEART RAIN
===================== */

function startHeartRain(duration) {
    const interval = setInterval(() => {
        const heart = document.createElement("div");
        heart.textContent = "❤️";
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-20px";
        heart.style.fontSize = `${Math.random() * 16 + 16}px`;
        heart.style.animation = "fall 5s linear forwards";
        heart.style.zIndex = 500;

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 200);

    setTimeout(() => clearInterval(interval), duration);
}

/* =====================
   💖 FINAL TEXT
===================== */

function showFinalText() {
    const text = document.createElement("div");
    text.textContent = "You are now my Valentine ❤️";
    text.style.position = "fixed";
    text.style.inset = "0";
    text.style.display = "flex";
    text.style.alignItems = "center";
    text.style.justifyContent = "center";
    text.style.fontSize = "32px";
    text.style.fontWeight = "700";
    text.style.color = "white";
    text.style.background = "rgba(0,0,0,0.4)";
    text.style.zIndex = 1000;

    document.body.appendChild(text);
}

/* =====================
   FALL ANIMATION
===================== */

const style = document.createElement("style");
style.textContent = `
@keyframes fall {
    to {
        transform: translateY(110vh);
        opacity: 0;
    }
}`;
document.head.appendChild(style);


function openValentine() {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.6s ease";
    setTimeout(() => {
        window.location.href = "valentine.html";
    }, 600);
}

