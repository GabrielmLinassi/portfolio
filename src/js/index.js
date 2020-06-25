document.querySelector("form").addEventListener("submit", (e) => {
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
});

// ======== Scroll to top ===
$returnTop = $("#return-to-top");

$(window).scroll(() => {
  if ($(this).scrollTop() >= 50) {
    $returnTop.fadeIn(200);
  } else {
    $returnTop.fadeOut(200);
  }
});
