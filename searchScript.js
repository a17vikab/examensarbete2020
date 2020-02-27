// ==UserScript==
// @name         SearchScript
// @namespace    Viktor Abrahamsson & Jacob Svensson
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.groupeight.tk:20007/blog*
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
  "use strict";

  // URL for the php-file for the scrapper.
  const URL = "https://wwwlab.iit.his.se/a17vikab/CMS/scraped_receiver.php";
  // Container for the scraped data.
  var scrapedData = [];
  // Variable that tracks the start of the timer.
  var t0;
  // Variable that tracks the end of the timer.
  var t1;
  // The difference between t0 and t1.
  var result;
  // Searchbutton.
  const searchBtn = document.querySelector(".btn-primary");
  // Inputfield for the from.
  const formInput = document.querySelector(".form-control");
  // Variable for keeping score of how many times each word are searched.
  var counter = localStorage.getItem("counter");

  // Function that handles the datatransfer, taken from dugga.iit.his.se
  function ajaxCall(data) {
    try {
      GM_xmlhttpRequest({
        method: "POST",
        url: URL,
        data: "str=" + encodeURIComponent(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response) {
          //alert("Sent " + scrapedData.length + " data post(s).");
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

  // Select a word that will be searched.
  formInput.value = "could";

  // Eventlistener that start the timer and stores the beginning in LocalStorage.
  searchBtn.addEventListener("click", function() {
    localStorage.setItem("sendData: ", "yes");
    localStorage.setItem("clicked", "yes");
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
    // Get localStorage for counter
    counter = localStorage.getItem("counter");

    // Number of times the script will search words.
    var numberOfSearches = 200;

    if (counter < numberOfSearches) {
      // Click the searchbutton
      searchBtn.click();

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
