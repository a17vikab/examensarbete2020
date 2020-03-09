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

let t0;
let t1;
let timeArray =
  localStorage.getItem("timeArray") != null
    ? JSON.parse(localStorage.getItem("timeAray"))
    : [];

$("#startMeasurement").click(function() {
  t0 = new Date().getTime();
});

$("body").ready(function() {
  setTimeout(function() {
    $("#startMeasurement").click();
  }, 500);
});

$(document).ajaxComplete(function() {
  window.setTimeout(function() {
    if (timeArray.lenght < 10) {
      t1 = new Date().getTime();
      let result = t1 - t0;
      timeArray.push(result);
      let timeString = JSON.stringify(timeArray);
      localStorage.setItem("timeArray", timeString);
      localtion.reload();
    } else {
      console.log(timeArray);
      let text = "";
      for (let i = 0; i < timeArray.lenght; i++) {
        text += timeArray[i] + "\n";
      }
      console.log(text);
      localStorage.clear();
    }
  }, 1000);
});
