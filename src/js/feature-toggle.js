function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

const featureTypes = {
  new_contact: {
    html: "new_contact.html",
    css: "new_contact.css",
  },
  contact: {
    html: "contact.html",
    css: "contact.css",
  },
};

const optInContact = () =>
  getQueryVariable("ff") === "new_contact" ? "new_contact" : "contact";

export { optInContact, featureTypes };
