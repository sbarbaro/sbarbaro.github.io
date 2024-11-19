// set offset from atomic time in seconds. can be positive or negative offset
var time_offset = 1;
//set air status colors here
var live_bg_color = 'red';
var live_txt_color = 'white';
var psa_bg_color = 'orange';
var psa_txt_color = 'white';
var idle_bg_color = 'black';
var idle_txt_color = 'white';
var remn_txt_color_idle = 'white';
var remn_txt_color_flash = 'red';
var remn_txt_color_music = 'yellow';
var remn_txt_color_creds = 'orange';

//set points in the countdown sequence you would like to flash here
var standard = ['01:00:00', '00:30:00', '00:15:00', '00:10:00', '00:05:00', '00:04:00', '00:03:00', '00:02:00', '00:01:00', '00:00:30', '00:00:05', '00:00:04', '00:00:03', '00:00:02', '00:00:01', '00:00:00'];
var psaFlash = ["00:01:00", "00:00:45", "00:00:30", "00:00:15", "00:00:10", "00:00:05", "00:00:04", "00:00:03", "00:00:02", "00:00:01", "00:00:00"];
//list segments with 24-hour time format in JSON
var showData = {
  "0" : [
    {
      "epoch" : "00:00:00",
      "status" : "idle",
      "segment" : "OFF AIR",
      "short" : "DOWN",
      "flash" : standard
    },
    {
      "epoch" : "18:30:00",
      "status" : "live",
      "segment" : "SEGMENT 1",
      "short" : "SEG1",
      "flash" : standard,
      "music" : "00:00:25"
    },
    {
      "epoch" : "18:43:00",
      "status" : "psa",
      "segment" : "PSA",
      "short" : "PSA1",
      "flash" : psaFlash,
    },
    {
      "epoch" : "18:45:00",
      "status" : "live",
      "segment" : "SEGMENT 2",
      "short" : "SEG2",
      "flash" : standard,
      "music" : "00:00:25"
    },
    {
      "epoch" : "18:58:00",
      "status" : "psa",
      "segment" : "PSA",
      "short" : "PSA2",
      "flash" : psaFlash,
    },
    {
      "epoch" : "19:00:00",
      "status" : "live",
      "segment" : "SEGMENT 3",
      "short" : "SEG3",
      "flash" : standard,
      "music" : "00:00:25"
    },
    {
      "epoch" : "19:13:00",
      "status" : "psa",
      "segment" : "PSA",
      "short" : "PSA3",
      "flash" : psaFlash,
    },
    {
      "epoch" : "19:15:00",
      "status" : "live",
      "segment" : "SEGMENT 4",
      "short" : "SEG4",
      "flash" : standard,
      "music" : "00:00:30",
      "credits" : "00:00:40",
    },
    {
      "epoch" : "19:27:53",
      "status" : "psa",
      "segment" : "PSA",
      "short" : "PSA4",
    },
    {
      "epoch" : "19:30:00",
      "status" : "idle",
      "segment" : "OFF AIR",
      "short" : "DOWN"
    },
    {
      "epoch" : "23:59:59",
      "status" : "idle",
      "segment" : "OFF AIR",
      "short" : "DOWN"
    }
  ],
  "2": [{
      "epoch": "00:00:00",
      "status": "idle",
      "segment": "OFF AIR",
      "short": "DOWN",
      "flash": standard
    },
    {
      "epoch": "20:00:00",
      "status": "live",
      "segment": "OPEN",
      "short": "OPEN",
      "flash": standard
    },
    {
      "epoch": "20:08:00",
      "status": "live",
      "segment": "Q&A",
      "short": "Q&A",
      "flash": standard
    },
    {
      "epoch": "20:51:30",
      "status": "live",
      "segment": "CLOSING",
      "short": "CLOS",
      "flash": standard,
      "credits": "00:00:40",
      "music": "00:00:30",
    },
    {
      "epoch": "20:58:00",
      "status": "psa",
      "segment": "PSA",
      "short": "PSA",
      "flash": psaFlash
    },
    {
      "epoch": "21:00:00",
      "status": "idle",
      "segment": "OFF AIR",
      "short": "DOWN"
    },
    {
      "epoch": "23:59:59",
      "status": "idle",
      "segment": "OFF AIR",
      "short": "DOWN"
    }
  ],
  "1" : [
    {
      "epoch" : "00:00:00",
      "status" : "idle",
      "segment" : "OFF AIR",
      "short" : "DOWN",
      "flash" : standard
    },
    {
      "epoch" : "20:00:00",
      "status" : "live",
      "segment" : "SEGMENT 1",
      "short" : "SEG1",
      "flash" : standard,
      "music" : "00:00:25"
    },
    {
      "epoch" : "20:13:00",
      "status" : "psa",
      "segment" : "PSA",
      "short" : "PSA1",
      "flash" : psaFlash,
    },
    {
      "epoch" : "20:15:00",
      "status" : "live",
      "segment" : "SEGMENT 2",
      "short" : "SEG2",
      "flash" : standard,
      "music" : "00:00:25"
    },
    {
      "epoch" : "20:28:00",
      "status" : "psa",
      "segment" : "PSA",
      "short" : "PSA2",
      "flash" : psaFlash,
    },
    {
      "epoch" : "20:30:00",
      "status" : "live",
      "segment" : "SEGMENT 3",
      "short" : "SEG3",
      "flash" : standard,
      "music" : "00:00:25"
    },
    {
      "epoch" : "20:43:00",
      "status" : "psa",
      "segment" : "PSA",
      "short" : "PSA3",
      "flash" : psaFlash,
    },
    {
      "epoch" : "20:45:00",
      "status" : "live",
      "segment" : "SEGMENT 4",
      "short" : "SEG4",
      "flash" : standard,
      "music" : "00:00:30",
      "credits" : "00:00:40",
    },
    {
      "epoch" : "20:57:56",
      "status" : "psa",
      "segment" : "PSA",
      "short" : "PSA4",
    },
    {
      "epoch" : "19:30:00",
      "status" : "idle",
      "segment" : "OFF AIR",
      "short" : "DOWN"
    },
    {
      "epoch" : "23:59:59",
      "status" : "idle",
      "segment" : "OFF AIR",
      "short" : "DOWN"
    }
  ]
}
