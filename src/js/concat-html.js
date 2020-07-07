import { optInContact, featureTypes } from "./feature-toggle.js";

const allNamed = (nameToPromise) => {
  const entries = Object.entries(nameToPromise);
  return Promise.all(entries.map((e) => e[1])).then((results) => {
    const nameToResult = {};
    for (let i = 0; i < results.length; ++i) {
      const name = entries[i][0];
      nameToResult[name] = results[i];
    }
    return nameToResult;
  });
};

(async () => {
  const lookup = await allNamed({
    experiences: fetch("experiences.html").then((rs) => rs.text()),
    contact: fetch(`${featureTypes[optInContact()].html}`).then((rs) =>
      rs.text()
    ),
    footer: fetch("footer.html").then((rs) => rs.text()),
  });
  const experiences = document.querySelector("#experiences");
  const contact = document.querySelector("#contact");
  const footer = document.querySelector("footer");

  experiences.innerHTML = lookup.experiences;
  contact.innerHTML = lookup.contact;
  footer.innerHTML = optInContact() === "new_contact" ? "" : lookup.footer;
})();
