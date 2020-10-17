import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import display from "display";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { me as appbit } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import { today as todayStats } from "user-activity";
import { battery } from "power";
import { charger } from "power";
import * as kpay from './kpay/release/kpay.js';
import * as kpay_common from '../common/kpay/kpay_common.js';
import './kpay/release/kpay_filetransfer.js';
import './kpay/release/kpay_dialogs.js';
import './kpay/release/kpay_time_trial.js';	
kpay.initialize();

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
var assemble = document.getElementById("assemble");
const final = document.getElementById("final");
const heartLabel = document.getElementById("heartLabel");
const caloriesLabel = document.getElementById("caloriesLabel");
const stepsLabel = document.getElementById("stepsLabel");
const activeLabel = document.getElementById("activeLabel");
const floorsLabel = document.getElementById("floorsLabel");
const distanceLabel = document.getElementById("distanceLabel");
const powerLabel = document.getElementById("powerLabel");
const batImg = document.getElementById("batImg"); 
const monthLabel = document.getElementById("monthLabel");
const dayLabel = document.getElementById("dayLabel");
const dayNameLabel = document.getElementById("dayNameLabel");
var statsFadedIn = document.getElementById("statsFadedIn");
const timeShadow = document.getElementById("timeShadow");
const apLabel = document.getElementById("apLabel");
const mLabel = document.getElementById("mLabel");


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  if (charger.connected) {
        batImg.href = "images/battery-charging.png";
  } else {
   batteryLevel();
  }
  activities()   
  showDate(evt)
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
      apLabel.text = today.getHours() < 12 ? "A" : "P";
      mLabel.text = "M";
      hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  // timeShadow.text = `${hours}:${mins}`;
}



display.addEventListener("change", function() {
  if (display.on) {
     wake();
  } else {
    sleep();
  }
})

function wake() {
  statsFadedIn.style.display = ("inline");
  assemble.animate("enable"); // Specify the name of the event to trigger
  statsFadedIn.animate("enable");
  
}

function sleep() {
 assemble.animate("disable");
 statsFadedIn.animate("disable");
 statsFadedIn.style.display = ("none");
  
}

// **********Heart Rate Sensor**********


if (HeartRateSensor) {
  const hrm = new HeartRateSensor();
  hrm.addEventListener("reading", () => {
    // console.log(`Current heart rate: ${hrm.heartRate}`);
    heartLabel.text=`${hrm.heartRate}`;
  });
  display.addEventListener("change", () => {
    // Automatically stop the sensor when the screen is off to conserve battery
    display.on ? hrm.start() : hrm.stop();
  });
  hrm.start();
}

// **********Body Presence Sensor**********

if (BodyPresenceSensor) {
  const body = new BodyPresenceSensor();
  body.addEventListener("reading", () => {
    if (!body.present) {
     heartLabel.text="--"
    } else {
      
    }
  });
  body.start();
}

// **********Permissions**********


if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
  const hrm = new HeartRateSensor();
  hrm.start();
}

// **********Activities**********   


function activities() {
  if (appbit.permissions.granted("access_activity")) {
        stepsLabel.text=`${todayStats.adjusted.steps}`;
        distanceLabel.text=`${todayStats.adjusted.distance}`;
        floorsLabel.text=`${todayStats.adjusted.elevationGain}`;
      if (todayStats.local.activeZoneMinutes !== undefined) {
          activeLabel.text=`${todayStats.adjusted.activeZoneMinutes.total}`;
      }  
      if (todayStats.local.calories !== undefined) {
          caloriesLabel.text=`${todayStats.adjusted.calories}`;
      }
    }
}
  


// **********Battery Life Display**********

console.log(Math.floor(battery.chargeLevel) + "%");
powerLabel.text = `${battery.chargeLevel}%`; // initialize on startup
battery.onchange = (charger, evt) => {
  powerLabel.text = `${battery.chargeLevel}%`;
}


// Determine which battery image needs to be shown.

// batImg.href = batteryLevel();

 function batteryLevel() {
   if (battery.chargeLevel >= 99) {
    batImg.href = "images/battery-100.png";
 } else if (battery.chargeLevel < 99 && battery.chargeLevel >= 5) {
   let ratio = Math.floor(battery.chargeLevel/5);
   batImg.href = 'images/battery-' + ratio*5 + '.png';
 } else {
   batImg.href = "images/battery-dead.png";
 }
}


// **********Month and Date**********


function showDate(evt) {
  let today = evt.date;
  let monthnum = today.getMonth();
  let day = today.getDate();
  var month = new Array ();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  var days = new Array();
  days [0] = "Sun";
  days [1] = "Mon";
  days [2] = "Tue";
  days [3] = "Wed";
  days [4] = "Thu";
  days [5] = "Fri";
  days [6] = "Sat";
  let monthname = month[monthnum];
  let dayname = days[today.getDay()];
  monthLabel.text = `${monthname}`;
  dayLabel.text = `${day}`;
  dayNameLabel.text = `${dayname}`;
}



 
