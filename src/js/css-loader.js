/* ==========================================================================
             Load CSS asynchronously and conditionally after initial painting
   ========================================================================== 
*/

import { optInContact } from "./feature-toggle.js";

var bodyClasses = optInContact();

var pagetypeCssData = [
  {
    test: /(?=\bcontact\b)/, // Leaving this blank will load the files below on every page
    files: ["contact.css", "footer.css"],
  },
  {
    test: /(?=\bnew_contact\b)/,
    files: ["new_contact.css"],
  },
];

/* Function to test if (body tag classes) string contains some text */
const stringHasText = (test, regex) => new RegExp(regex).test(test);

var cb = function () {
  /* Function to set media type to all */
  function setMedia(element) {
    setTimeout(function () {
      element.media = "all";
    });
  }

  for (var prop in pagetypeCssData) {
    if (stringHasText(bodyClasses, pagetypeCssData[prop].test)) {
      for (var i = 0, l = pagetypeCssData[prop].files.length; i < l; i++) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./css/" + pagetypeCssData[prop].files[i];
        link.media = "only x";

        var firstScriptTag = document.getElementsByTagName("script")[0];

        // Insert CSS file before first script tag
        firstScriptTag.parentNode.insertBefore(link, firstScriptTag);

        // Set the media type back to all
        setMedia(link);
      }
    }
  }
};

const raf =
  requestAnimationFrame ||
  mozRequestAnimationFrame ||
  webkitRequestAnimationFrame ||
  msRequestAnimationFrame;

raf ? raf(cb) : window.addEventListener("load", cb);
