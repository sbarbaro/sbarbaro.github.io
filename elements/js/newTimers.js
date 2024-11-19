var globalDate = new Date();
var timeFormat = {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false};
var interval = 0;
var target = 1000;
var nowGMT = 0;
var currentInterval = setInterval(genlock, interval);

function initialize() {
  genlock();
  setScan(4, 3);
}

function genlock() {
  clearInterval(currentInterval);
  clocks();
  var now = new Date().getTime();
  interval = target - now.toString().substring(now.toString().length - 3);
  currentInterval = setInterval(genlock, interval);
}

function clocks() {
  var real = new Date();
  var showTime = applyOffset(real.toLocaleTimeString('en-US', timeFormat), time_offset);
  var remaining = timeDifference(showTime, queryNextSegment(showTime, 'epoch'));
  setTitle(showTime, '.segTitle');
  display('#real', 'REAL', real.toLocaleTimeString('en-US', timeFormat));
  display('#show', 'SHOW', showTime);
  money('.bigClock', showTime, remaining);
  preview('#next', showTime, remaining);
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

function display(tag, label, content) {
  document.querySelector(tag).innerHTML = label + " " + content;
}

function setScan(height, width) {
  var tgt = document.querySelector('.main-container');
  var out = height + "vh " + width + "vw";
  tgt.style.margin = out;
  console.log('overscan compensation set to ' + out);
}

function setTitle(tcs, target) {
  var text = queryCurrentSegment(tcs, 'segment');
  var status = queryCurrentSegment(tcs, 'status');
  if(status === 'live') {
    document.querySelector(target).style.background = live_bg_color;
    document.querySelector(target).style.color = live_txt_color;
  } else if (status === 'psa') {
    document.querySelector(target).style.background = psa_bg_color;
    document.querySelector(target).style.color = psa_txt_color;
  } else if (status === 'idle') {
    document.querySelector(target).style.background = idle_bg_color;
    document.querySelector(target).style.color = idle_txt_color;
  }
  document.querySelector(target).innerHTML = text;
}

function preview(tag, time, target) {
  var musicAt,
      credsAt,
      nextSeg,
      out;
  if (typeof(queryCurrentSegment(time, 'music')) === 'undefined') {
    musicAt = ' M--';
  } else {
    musicAt = ' M' + queryCurrentSegment(time, 'music').substring(6,8);
  }
  if (typeof(queryCurrentSegment(time, 'credits')) === 'undefined') {
    credsAt = 'C-- ';
  } else {
    credsAt = 'C' + queryCurrentSegment(time, 'credits').substring(6,8);
  }
  nextSeg = queryNextSegment(time, 'short');
  out = credsAt + musicAt + " |" + nextSeg;
  display(tag, '', out);
}

function money(target, tcs, remn) {
  var seizureMaster = queryCurrentSegment(tcs, 'flash');
  var zero = queryNextSegment(tcs, 'epoch');
  document.querySelector(target).style.color = remn_txt_color_idle;
  for(var time in seizureMaster) {
    if (seizureMaster[time] === remn) {
      document.querySelector(target).style.color = remn_txt_color_flash;
    }
  }
  display(target, 'SEGM ', remn);
}

function flashTime(tag, list, timeSource, color) {
  document.querySelector(tag).style.color = 'white';
  for(timeRecord in list) {
    if(list[timeRecord] === timeSource) {
      document.querySelector(tag).style.color = 'red';
    }
  }
}
