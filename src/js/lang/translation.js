import { mlCodes } from "./mlcodes.js";
import { MLstrings } from "./mlstrings.js";

// Global var
let mlrLangInUse;

export const mlr = function ({
  dropID = "mbPOCControlsLangDrop",
  stringAttribute = "data-mlr-text",
  chosenLang = "English",
  mLstrings = MLstrings,
  countryCodes = true,
  countryCodeData = mlCodes || [],
}) {
  const root = document.documentElement;

  const firstObj = Object.values(mLstrings)[0];
  const listOfLanguages = Object.keys(firstObj);

  mlrLangInUse = chosenLang;

  (function createMLDrop() {
    var mbPOCControlsLangDrop = document.getElementById(dropID);

    // Reset the menu
    mbPOCControlsLangDrop.innerHTML = "";

    // Now build the options
    listOfLanguages.forEach((lang) => {
      let HTMLoption = document.createElement("option");
      HTMLoption.value = lang;
      HTMLoption.textContent = lang;
      mbPOCControlsLangDrop.appendChild(HTMLoption);

      if (lang === chosenLang) {
        mbPOCControlsLangDrop.value = lang;
      }
    });

    const handleChange = () => {
      mlrLangInUse =
        mbPOCControlsLangDrop[mbPOCControlsLangDrop.selectedIndex].value;

      resolveAllMLStrings();

      // Here we update the 2-digit lang attribute if required
      if (countryCodes === true) {
        if (!Array.isArray(countryCodeData) || !countryCodeData.length) {
          console.warn("Cannot access strings for language codes");
          return;
        }

        root.setAttribute("lang", updateCountryCodeOnHTML().code);
      }
    };

    mbPOCControlsLangDrop.addEventListener("change", handleChange);
  })();

  function updateCountryCodeOnHTML() {
    return countryCodeData.find(function (this2Digit) {
      return this2Digit.name === mlrLangInUse;
    });
  }

  function resolveAllMLStrings() {
    const stringsToBeResolved = document.querySelectorAll(
      `[${stringAttribute}]`
    );

    stringsToBeResolved.forEach((stringToBeResolved) => {
      const resolvedText = resolveMLStringId(stringToBeResolved.id, MLstrings);
      stringToBeResolved.innerHTML = resolvedText;
    });
  }
};

function resolveMLStringId(stringIdToBeResolved, mLstrings) {
  return mLstrings[stringIdToBeResolved][mlrLangInUse] || "";
}
