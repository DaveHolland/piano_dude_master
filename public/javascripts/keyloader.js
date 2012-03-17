
var recording = false;
var recordedEvents = [];
var sequenceIndex = 0;

function myTurn()
{
	recording = true;
	recordedEvents = [];
	sequenceIndex = 0;
}

function help()
{
}

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};


BrowserDetect.init();

//if (BrowserDetect.browser == "Chrome")
//{
//	var theElement = document.getElementById('caveat');
//	theElement.className += "hidden";
//}
//else {
//	var theElement = document.getElementById('caveat');
//	theElement.className += "shown";
//}

//alert('got here 3');
	
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

window.onload = init;
var context;
var bufferLoader;

var runtime;

function init() {
  context = new webkitAudioContext();
  
  bufferLoader = new BufferLoader(
    context,
    [
	'/wav/chimes.wav',
      '/mp3/PIANO_LOUD_G2s.mp3',
      '/mp3/PIANO_LOUD_AB2s.mp3',
	'/mp3/PIANO_LOUD_A2s.mp3',
	'/mp3/PIANO_LOUD_BB2s.mp3',
	'/wav/PIANO_LOUD_B2s.wav',
      '/wav/PIANO_LOUD_C3s.wav',
      '/wav/PIANO_LOUD_DB3s.wav',
	'/wav/PIANO_LOUD_D3s.wav',
	'/wav/PIANO_LOUD_EB3s.wav',
	'/wav/PIANO_LOUD_E3s.wav',
	'/wav/PIANO_LOUD_F3s.wav',
      '/wav/PIANO_LOUD_GB3s.wav',
	'/wav/PIANO_LOUD_G3s.wav',
	'/wav/PIANO_LOUD_AB3s.wav',
	'/wav/PIANO_LOUD_A3s.wav',
	'/wav/PIANO_LOUD_BB3s.wav',
	'/wav/PIANO_LOUD_B3s.wav',
	'/wav/PIANO_LOUD_C4s.wav',
      '/wav/PIANO_LOUD_DB4s.wav',
	'/wav/PIANO_LOUD_D4s.wav',
	'/wav/PIANO_LOUD_EB4s.wav',
	'/wav/PIANO_LOUD_E4s.wav',
	'/wav/PIANO_LOUD_F4s.wav',
      '/wav/PIANO_LOUD_GB4s.wav',
	'/wav/PIANO_LOUD_G4s.wav',
	'/wav/PIANO_LOUD_AB4s.wav',
	'/wav/PIANO_LOUD_A4s.wav',
	'/wav/PIANO_LOUD_BB4s.wav',
	'/wav/PIANO_LOUD_B4s.wav',
	'/wav/PIANO_LOUD_C5s.wav',
      '/wav/PIANO_LOUD_DB5s.wav',
	'/wav/PIANO_LOUD_D5s.wav',
	'/wav/PIANO_LOUD_EB5s.wav',
	'/wav/PIANO_LOUD_E5s.wav',
	'/wav/PIANO_LOUD_F5s.wav',
      '/wav/PIANO_LOUD_GB5s.wav',
	'/wav/PIANO_LOUD_G5s.wav',
	'/wav/PIANO_LOUD_AB5s.wav',
	'/wav/PIANO_LOUD_A5s.wav',
	'/wav/PIANO_LOUD_BB5s.wav',
	'/wav/PIANO_LOUD_B5s.wav',
	'/wav/PIANO_LOUD_C6s.wav',
      '/wav/PIANO_LOUD_DB6s.wav',
	'/wav/PIANO_LOUD_D6s.wav',
	'/wav/PIANO_LOUD_EB6s.wav',
	'/wav/PIANO_LOUD_E6s.wav',
	'/wav/PIANO_LOUD_F6s.wav',
      '/wav/PIANO_LOUD_GB6s.wav',
	'/wav/PIANO_LOUD_G6s.wav',
	'/wav/PIANO_LOUD_AB6s.wav',
	'/wav/PIANO_LOUD_A6s.wav',
	'/wav/PIANO_LOUD_BB6s.wav',
	'/wav/PIANO_LOUD_B6s.wav',
	'/wav/PIANO_LOUD_C7s.wav',
      '/wav/PIANO_LOUD_DB7s.wav',
	'/wav/PIANO_LOUD_D7s.wav'
    ],
    finishedLoading
    );

	alert('Done creating loader.  Wait till you hear the chimes!');
	
	bufferLoader.load();
}

function finishedLoading(bufferList) {

  // Create two sources and play them both together.
  var source1 = context.createBufferSource();

  source1.buffer = bufferList[0];
  source1.connect(context.destination);
  source1.noteOn(0);
}
