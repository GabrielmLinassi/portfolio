import cfg from "../config.js";

function do_translate() {
  $("html").i18n();

  $("#skillcard2-skillbar1").attr(
    "data-skillbar-label",
    $.i18n("skillcard2-skillbar1")
  );

  $("#skillcard2-skillbar2").attr(
    "data-skillbar-label",
    $.i18n("skillcard2-skillbar2")
  );

  $("#skillcard2-skillbar3").attr(
    "data-skillbar-label",
    $.i18n("skillcard2-skillbar3")
  );

  $("#skillcard2-skillbar4").attr(
    "data-skillbar-label",
    $.i18n("skillcard2-skillbar4")
  );

  $("#skillcard2-skillbar5").attr(
    "data-skillbar-label",
    $.i18n("skillcard2-skillbar5")
  );

  $("#skillcard3-skillbar1").attr(
    "data-skillbar-label",
    $.i18n("skillcard3-skillbar1")
  );

  $("#skillcard3-skillbar2").attr(
    "data-skillbar-label",
    $.i18n("skillcard3-skillbar2")
  );
}

jQuery(function ($) {
  $.i18n({})
    .load({
      en: "./i18n/en.json",
      pt: "./i18n/pt.json",
    })
    .done(() => {
      $(".lang-switch").on("change", (e) => {
        const lang = e.target.options[e.target.selectedIndex].value;
        $.i18n().locale = lang;
        document.documentElement.lang = lang;
        do_translate();
      });
      do_translate();

      // Add observer for the skillbar animation
      const options = {
        rootMargin: "0px",
        threshold: 0.3,
      };

      const callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            SKILLBAR_ANIME();
          }
        });
      };

      let observer = new IntersectionObserver(callback, options);
      let target = document.querySelector(".skillcards");
      observer.observe(target);
    });
});

const handleSubmit = (e) => {
  e.preventDefault();

  const url = cfg.EMAIL_API;
  const formData = new FormData(e.target);
  const formDataToJson = Object.fromEntries(formData);

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataToJson),
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log("ErrLog:", res);
        alert("Algo deu errado ;((");
        return;
      }
      e.target.reset();
      alert("Obrigado pela mensagem. Logo entrarei em contato.");
    })
    .catch((err) => {
      console.log("ErrLog::Fetching Error: ", err);
    });
};

// ======== Scroll to top ===
const handleScroll = () => {
  var returnTop = $("#return-to-top");
  if ($(document).scrollTop() >= 50) {
    $(returnTop).fadeIn(200);
  } else {
    $(returnTop).fadeOut(200);
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

// after content loaded from other html file
window.addEventListener("load", () => {
  document.querySelector("form").addEventListener("submit", handleSubmit);
});

window.onscroll = handleScroll;

// ======== Video poster animation ===
$("video").on("playing", () => {
  $("video").css({ transition: "opacity .8s linear", opacity: 1 });

  $(".video-bg").append(
    `<style>
        .video-bg:before { 
            transition: backdrop-filter .8s linear; 
            -webkit-backdrop-filter: blur(0px);
            backdrop-filter: blur(0px); 
        }
    </style>`
  );
});
