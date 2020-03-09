// ==UserScript==
// @name        MeasurementTry4.js
// @namespace   http://tampermonkey.net/
// @version     1
// @description Measurement-script for heatmap-data.
// @author      Viktor Abrahamsson
// @require     https://code.jquery.com/jquery-3.4.0.js
// @match       http://127.0.0.1:5500/HeatmapJS/index.html
// grant        none
// ==/UserScript==

let numberOfRuns = 3;
let counter = localStorage.getItem("counter");
const measurementButton = document.getElementById("startMeasurement");
let t0;
let t1;
let result;

(function() {
  // First check if script have been ran before.
  if (counter == null || counter == "" || counter == "NaN") {
    counter = 0;
    localStorage.setItem("counter", counter);
  }

  // Run while the window refreshes.
  function loadWindow(event) {
    // Check counter-value aginst runs.
    if (counter <= numberOfRuns) {
      // setTimeout(function() {}, 3000);
      measurementButton.addEventListener("click", event => {
        t0 = new Date();
        localStorage.setItem("t0", t0);
        location.reload();
      });

      document.addEventListener("readystatechange", event => {
        if (event.target.readyState == "complete") {
          t1 = new Date();
          localStorage.setItem("t1", t1);
        } else {
          console.log("Error");
        }
      });
      // Import the t0-variable and make it to a Date-object.
      t0 = new Date(localStorage.getItem("t0"));

      // Import the t1-variable.
      t1 = localStorage.getItem("t1");

      // Calculate the result.
      result = t1 - t0 + "\n";
      localStorage.setItem("Result: ", result);
    } else {
    }
  }
})();
