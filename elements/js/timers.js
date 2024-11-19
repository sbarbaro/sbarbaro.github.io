var globalDate = new Date();
var timeFormat = {hour: '2-digit', minute:'2-digit', second:'2-digit', hour12: false};
var intervalPrecision = 250;
var offset = 1;

function initialize() {
  var now = new Date();
  var showTime = applyOffset(now.toLocaleTimeString('en-US', timeFormat), offset);
  document.querySelector('#real').innerHTML = 'REAL ' + now.toLocaleTimeString('en-US', timeFormat);
  document.querySelector('#show').innerHTML = 'SHOW ' + showTime;
  document.querySelector('.bigClock').innerHTML = 'SEGM ' + timeDifference(showTime, queryNextSegment(showTime, 'epoch'));
  document.querySelector('#next').innerHTML = 'NEXT ' + queryNextSegment(showTime, 'epoch');
  getAirStatus(showTime, '.segTitle');
  //console.log(document.querySelector(".bigClock").innerHTML.substring(11,13));
  timeWarning('.bigClock');
  setTimeout(initialize, intervalPrecision);
}

function timeWarning(tag) {
  if (document.querySelector(tag).innerHTML.substring(5, 10) == '00:00' && document.querySelector(tag).innerHTML.substring(11, 13) <= 05) {
    document.querySelector(tag).style.color = 'red';
  } else {
    document.querySelector(tag).style.color = 'white';
  }
}

function toSeconds(hms) {
  var a = hms.split(":");
  return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
}

function toHMS(seconds) {
  var hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  var minutes = Math.floor(seconds / 60);
  var seconds = seconds % 60;
  var hms = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  return hms;
}

function pad(n) {
  return (n < 10 ? '0' + n : n);
}

function applyOffset(realTime, setting) {
  var realInSeconds = toSeconds(realTime);
  var offsetTime = realInSeconds + setting;
  return toHMS(offsetTime);
}

function timeDifference(current, next) {
  current = toSeconds(current);
  next = toSeconds(next);
  return (toHMS(Math.abs(current - next)));
}

function queryCurrentSegment(tcs, queryItem) {
  for (var day in showData) {
    if (day === globalDate.getDay().toString()) {
      for (var info in showData[day]) {
        if (tcs <= showData[day][info]['epoch']) {
          return showData[day][--info][queryItem];
        }
      }
    }
  }
}

function queryNextSegment(tcs, queryItem) {
  for (var day in showData) {
    if (day === globalDate.getDay().toString()) {
      for (var info in showData[day]) {
        if (tcs <= showData[day][info]['epoch']) {
          return showData[day][info][queryItem];
        }
      }
    }
  }
}

function getAirStatus(tcs, tag) {
  var airStatus = queryCurrentSegment(tcs, 'on_air');
  var segName = queryCurrentSegment(tcs, 'segment');
  var target = document.querySelector(tag);
  target.innerHTML = segName;
  if (airStatus === 'true') {
    if (segName != 'PSA') {
      target.style.backgroundColor = '#ad0000';
    } else if (segName === 'PSA') {
      target.style.backgroundColor = 'orange';
    }
  } else if (airStatus === 'false') {
    target.style.backgroundColor = 'black';
  }
}
