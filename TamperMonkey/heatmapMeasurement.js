// ==UserScript==
// @name        heatmapMeasurement.js
// @namespace   http://tampermonkey.net/
// @version     0.1
// @description Measurement-script for heatmap-data.
// @author      Viktor Abrahamsson
// @match       https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
// @require     https://code.jquery.com/jquery-2.2.4.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function() {
  "use strict";
  // Variables
  const URL =
    "https://wwwlab.iit.his.se/a17vikab/examensarbete/dataReceiver.php";
  let scrapedData = [];
  let runs = 10;
  let counter = localstorage.getItem("counter");
  const measurementButton = document.getElementById("startMeasurement");
  let t0;
  let t1;

  function ajaxCall(data) {
    try {
      GM_xmlhttpRequest({
        method: "POST",
        url: URL,
        data: "str=" + encodeURIComponent(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
    } catch (ex1) {
      console.log(ex1);
    }
  }

  if (window.addEventListener) {
    t0 = new Date();
    localStorage.setItem("Start: ", t0);

    window.addEventListener("load", loadWindow, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", loadWindow);
  }

  measurementButton.addEventListener("click", function() {});

  if (counter == null) {
    counter = 0;
    localStorage.setItem("counter", counter);
  }

  function loadWindow(event) {
    // Get localStorage for counter.
    counter = localStorage.getItem("counter");

    if (counter < runs) {
    }
  }
})();
