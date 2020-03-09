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

  // URL for the php-file for the scrapper.
  const URL =
    "https://wwwlab.iit.his.se/a17vikab/examensarbete/dataReceiver.php";
  // Button to start measurement.
  const measurementButton = document.getElementById("startMeasurement");
  // Container for the scraped data.
  let scrapedData = [];
  // Variable for keeping score of how many times each word are searched.
  let counter = localstorage.getItem("counter");
  // Number of times the script will run.
  let runs = 10;
  // Variable that tracks the start of the timer.
  let t0;
  // Variable that tracks the end of the timer.
  let t1;
  // The difference between t0 and t1.
  let result;

  // Function that handles the datatransfer.
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

  // This makes sure that we can run the script after the page has loaded.
  if (window.addEventListener) {
    // Mozilla, Netscape, Firefox
    window.addEventListener("load", loadWindow, false);
  } else if (window.attachEvent) {
    // IE
    window.attachEvent("onload", loadWindow);
  }

  // Eventlistener that start the timer and stores the beginning in LocalStorage.
  measurementButton.addEventListener("click", function() {
    localStorage.setItem("sendData: ", "yes");
    localStorage.setItem("clicked: ", "yes");
    t0 = new Date();
    localStorage.setItem("Start: ", t0);
  });

  // Check if the script have been active before.
  if (counter == null) {
    counter = 0;
    localStorage.setItem("counter", counter);
  }

  // This makes sure that we can run the script after the page has loaded.
  function loadWindow(event) {
    // Get localStorage for counter.
    counter = localStorage.getItem("counter");

    if (counter < runs) {
      // Click the measurementButton.
      measurementButton.click();

      // Get localStorage for clicked.
      var clicked = localStorage.getItem("clicked");

      if (clicked == "yes") {
        // Get localStorage for sendData.
        var sendData = localStorage.getItem("sendData: ");

        // Import the t0-variable and make it to a Date-object.
        t0 = new Date(localStorage.getItem("Start: "));

        // Import the t1-variable.
        t1 = new Date();
        localStorage.setItem("End: ", t1);

        // Calculate the result.
        result = t1 - t0 + "\n";
        localStorage.setItem("Result: ", result);

        // Send data to txt-file with ajaxCall-function.
        if (sendData == "yes") {
          scrapedData.push(result);
          ajaxCall(scrapedData);
          sendData == "no";
        }

        counter++;

        // Store counter and clicked in localStorage.
        localStorage.setItem("counter", counter);
        localStorage.setItem("clicked", "no");
      }
    }
  }
})();
