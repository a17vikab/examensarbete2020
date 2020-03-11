// ==UserScript==
// @name        d3Measurement.js
// @namespace   http://tampermonkey.net/
// @version     1
// @description Measurement-script for heatmap-data.
// @author      Viktor Abrahamsson
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match       http://127.0.0.1:5500/D3/index.html
// grant        none
// ==/UserScript==

let numberOfRuns = 1000;
let counter = localStorage.getItem("counter");
let resultArray = localStorage.getItem("resultArray");

(function() {
  if (
    counter == null ||
    counter == undefined ||
    counter == "" ||
    counter == "NaN"
  ) {
    counter = 0;
    localStorage.setItem("counter", counter);
  }

  if (counter < numberOfRuns) {
    setTimeout(function() {
      location.reload();
      if (resultArray == "" || resultArray == null) {
        resultArray = [];
      } else {
        resultArray = JSON.parse(resultArray);
      }
      resultArray.push(localStorage.getItem("result"));
      localStorage.setItem("resultArray", JSON.stringify(resultArray));
      localStorage.setItem("counter", ++counter);
    }, 2500);
  } else {
    $("html").append(
      '<a download="data.txt" id="download" style="display: none;">Download</a>'
    );
    let link;
    let data;
    let text = "";
    let textFile = null;
    var makeTextFile = () => {
      // Import resultArray from localStorage.
      resultArray = JSON.parse(localStorage.getItem("resultArray"));
      // Iterate resultArray length into text-variable.
      for (let i = 0; i < resultArray.length; i++) {
        text += resultArray[i] + "\n";
      }
      data = new Blob([text], { type: "text/plain" });
      textFile = window.URL.createObjectURL(data);
      return textFile;
    };

    link = document.getElementById("download");
    link.href = makeTextFile("data");
    localStorage.clear();
    link.click();
  }
})();
