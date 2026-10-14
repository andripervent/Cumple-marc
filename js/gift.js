document.addEventListener("DOMContentLoaded", () => {
  const giftGrid = document.getElementById("giftGrid");
  const huntMessage = document.getElementById("huntMessage");

  if (!giftGrid || !huntMessage) return;

  // Utilitza la caixa correcta definida a config.js
  const correctIndex =
    typeof BirthdayConfig !== "undefined" &&
    Number.isInteger(BirthdayConfig.correctGiftIndex) &&
    BirthdayConfig.correctGiftIndex >= 0 &&
    BirthdayConfig.correctGiftIndex <= 4
      ? BirthdayConfig.correctGiftIndex
      : 2;

  // Missatges quan la caixa no és la correcta
  const baseWrongMessages =
    typeof BirthdayConfig !== "undefined" &&
    BirthdayConfig.wrongGiftMessages
      ? BirthdayConfig.wrongGiftMessages
      : [
          "Ui, aquest no és! 😂",
          "Torna-ho a provar, Marc ❤️",
          "Gairebé ho tens...",
          "No et rendisques ara! 😉"
        ];

  const wrongMessages = [
    ...baseWrongMessages,
    "Nooo... aquest tampoc! 🥹"
  ];

  const clickedIndices = [];
  let huntCompleted = false;

  function createGiftBox(index) {
    const button = document.createElement("button");
    button.className = "mini-gift";
    button.type = "button";
    button.setAttribute("aria-label", `Caixa de regal ${index + 1}`);

    button.innerHTML = `
      <span class="luxury-gift" aria-hidden="true">
        <span class="gift-glow"></span>
        <img src="luxury_gift_box.png" class="gift-slice gift-lid-img" alt="" />
        <img src="luxury_gift_box.png" class="gift-slice gift-body-img" alt="" />
      </span>
    `;

    button.addEventListener("click", () => {
      if (huntCompleted) return;
      if (clickedIndices.includes(index)) return;

      clickedIndices.push(index);
      button.disabled = true;
      button.style.pointerEvents = "none";

      if (index === correctIndex) {
        huntCompleted = true;
        button.classList.add("is-correct");

        huntMessage.textContent = "L'has trobat! ❤️";

        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }

        setTimeout(() => {
          if (typeof navigateWithTransition === "function") {
            navigateWithTransition("story.html");
          } else {
            window.location.href = "story.html";
          }
        }, 1500);
      } else {
        button.classList.add("is-wrong");

        const randomMsg =
          wrongMessages[Math.floor(Math.random() * wrongMessages.length)];

        huntMessage.textContent = randomMsg;

        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
    });

    return button;
  }

  // Genera les cinc caixes
  for (let i = 0; i < 5; i++) {
    giftGrid.appendChild(createGiftBox(i));
  }
});
