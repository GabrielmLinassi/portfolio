const urls = ["experiences.html"];

Promise.all(urls.map((url) => fetch(url)))
  .then((results) => Promise.all(results.map((result) => result.text())))
  .then((htmls) => fillContent(htmls));

function fillContent(htmls) {
  console.log("fillcontent");

  const experiences = document.querySelector("#experiences");
  experiences.innerHTML = htmls[0];
}
