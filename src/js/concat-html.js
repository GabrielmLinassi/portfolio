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
    contact: fetch(`new_contact.html`).then((rs) => rs.text()),
  });
  const experiences = document.querySelector("#experiences");
  const contact = document.querySelector("#contact");

  experiences.innerHTML = lookup.experiences;
  contact.innerHTML = lookup.contact;
})();
