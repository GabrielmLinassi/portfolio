const urls = ["experiences.html", "contact.html", "new_contact.html"];

Promise.all(urls.map((url) => fetch(url)))
  .then((results) => Promise.all(results.map((result) => result.text())))
  .then((htmls) => fillContent(htmls));

function fillContent(htmls) {
  const experiences = document.querySelector("#experiences");
  experiences.innerHTML = htmls[0];

  const contact = document.querySelector("#contact");
  contact.innerHTML = htmls[1];
}
