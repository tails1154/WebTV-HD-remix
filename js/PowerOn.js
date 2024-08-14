let stopProgressUpdates = false;

function wait(ms) {
  return new Promise(function(resolve) {setTimeout(resolve, ms);});
}

function getDialingTheme(){
  var dialingMusic = document.getElementById("dialing-music");
  var a = Math.floor(Math.random() * 10) + 1;
  if (a === 1) {
    dialingMusic.src = "audio/music/other/aoltv.mp3";
    dialingMusic.load();
    showAlert("secret music");
  }
}
window.addEventListener("load", getDialingTheme);

async function doSplash(withInterval) {
  var hiddenUntilConnected = document.querySelector(".hiddenUntilConnected");
  var hiddenUntilLogo = document.querySelector(".hiddenUntilLogo");
  var dialingMusic = document.getElementById("dialing-music");
  var splashJingle = document.getElementById("splash-jingle");
  setTimeout(function(){
    dialingMusic.pause();
    splashJingle.play();
    hiddenUntilLogo.classList.add('animation', 'cityCrossfade');
    setTimeout(function(){hiddenUntilLogo.remove();},450);
    hiddenUntilConnected.style.display = "flex";
    hiddenUntilConnected.classList.add("fadeIn");
    document.title = "WebTV Service";
    setTimeout(function(){location.href = "Home.html"},(splashJingle.duration * 1000));
  },withInterval);
}

async function powerOn(){
  document.querySelector(".hideOnClick").remove();
  document.querySelector(".logoArea").classList.add("noCursor"); // Disable cursor only whilst logo appears
  await wait(800);
  document.getElementById("modem").play();
  var img = document.querySelector(".hiddenUntilClick");
  img.classList.remove("hiddenUntilClick");
  img.classList.add("animating");

  var imgAnimating = document.querySelector(".animating");
  imgAnimating.style.animationPlayState = "running";

  await wait(3000); // Wait for logo to finish
  initDialing(); // Show dialing elements
}

function initDialing(){
  var hiddenUntilLogo = document.querySelector(".hiddenUntilLogo");
  var logoArea = document.querySelector(".logoArea");
  var dialingMusic = document.getElementById("dialing-music");
  var progressBar = document.getElementById('progressbar');
  var progressMessage = document.getElementById('progressbar-message');

  // Options relative to page appearance and functionality
  logoArea.remove();
  hiddenUntilLogo.classList.add("fadeIn"); // Make sure we fade in the newly given page
  hiddenUntilLogo.style.display = "block";
  dialingMusic.play();
  document.title = "Connecting to WebTV";

  let value = 10;

  var interval = setInterval(function(){
    if (stopProgressUpdates) {
      clearInterval(interval);
      return;
    }
    value += 10;
    /*  Progress bar messages. For first message, see Dialing.html
        When setting these messages, set an interval value for when they should occur.
        Progress bar values are defined from 0 to 100, counting by tens.
        The example provided mimmics a box with a Tellyscript. */
    var progressBarMessages = [
      { message: "Deleting Brainrot", interval: 20, value: 11 },
      { message: "Why is the progressbar at -43?", interval: 40, value: -43 },
      { message: "hahaha", interval: 100, value: 60 },
      { message: "Not Deleting Files", interval: 120, value: 90 },
      { message: "Connecting to WebTV", interval: 140, value: 1 },
      { message: "I am totally updating right now leave me alone", interval: 141, value: 1},
      { message: "I am totally updating right now leave me alone", interval: 143, value: 2},
      { message: "I am totally updating right now leave me alone", interval: 151, value: 3},
      { message: "I am totally updating right now leave me alone", interval: 160, value: 4},
      { message: "Are you bored of staring at this yet?", interval: 170, value: 40},
      { message: "Checking if my ebay package has came in yet", interval: 200, value: 50},
      { message: ":)", interval: 230, value: 60},
      { message: "oops I broke the progress bar", interval: 300, value: 500},
      { message: "Actually, No", interval: 350, value: 0},
      { message: "What do you mean by  'Progressbar95?'", interval: 400, value: 50},
      { message: "Okay you can connect now", interval: 600, value: 1000}
    ];
    progressBarMessages.forEach((details) => {
      if (value == details.interval) {
        progressBar.value = details.value;
        progressMessage.textContent = details.message;
        if (details.value >= 1000) doSplash(5000);
      }
    });
  }, 2000);
}

function skipDialing(){
//  stopProgressUpdates = true;
  showAlert("lol no you have to wait for this");
}