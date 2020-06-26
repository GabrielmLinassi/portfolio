const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  let data = {};

  formData.forEach((value, input) => {
    data[input] = value;
  });

  fetch(e.target.action, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).finally(() => {
    alert("Obrigado pela mensagem. Logo entrarei em contato.");
    e.target.reset();
  });
};

// ======== Scroll to top ===
const handleScroll = () => {
  $returnTop = $("#return-to-top");
  if ($(this).scrollTop() >= 50) {
    $returnTop.fadeIn(200);
  } else {
    $returnTop.fadeOut(200);
  }
};

// ======== Skillbar animation ===
function SKILLBAR_ANIME() {
  const SKILLBAR = document.querySelectorAll(".skillbar");

  SKILLBAR.forEach((el) => {
    const SKILLBAR_HEADWAY = el.querySelector(".skillbar__headway");
    const SKILLBAR_HEADER = el.querySelector(".skillbar__header");
    const SKILLBAR_VALUE = SKILLBAR_HEADWAY.dataset.skillbarValue;
    const SKILLBAR_NAME = SKILLBAR_HEADWAY.dataset.skillbarLabel;
    const SKILLBAR_HEADWAY_NAME = el.querySelector(".skillbar__label");
    const SKILLBAR_HEADWAY_COUNTER = el.querySelector(".skillbar__counter");

    SKILLBAR_HEADWAY_NAME.textContent = `${SKILLBAR_NAME}`;
    SKILLBAR_HEADWAY_COUNTER.textContent = `${SKILLBAR_VALUE}%`;
    SKILLBAR_HEADWAY.style.width = `${SKILLBAR_VALUE}%`;
  });
}

document.addEventListener("DOMContentLoaded", SKILLBAR_ANIME);

document.querySelector("form").addEventListener("submit", handleSubmit);
window.onscroll = handleScroll;
