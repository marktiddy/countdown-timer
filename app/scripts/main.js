//Global variables
var hours = 0;
var minutes = 0;
var seconds = 0;
var t;

//Make our inputs empty on click
$('#hours').click(() => {
  $('#hours').val('');
});
$('#minutes').click(() => {
  $('#minutes').val('');
});
$('#seconds').click(() => {
  $('#seconds').val('');
});

const processForm = () => {
  checkForm();
};
const checkForm = () => {
  var showError = false;
  var errorCount = 0;

  hours = $('#hours').val();
  minutes = $('#minutes').val();
  seconds = $('#seconds').val();

  checkNum(hours) ? null : errorCount++;
  checkNum(minutes) ? null : errorCount++;
  checkNum(seconds) ? null : errorCount++;

  errorCount == 0 ? (showError = false) : (showError = true);

  //Show error if we need to but remove previous entry first
  $('.error') ? $('.error').remove().fadeOut() : null;
  showError
    ? $('#countdown-form')
        .prepend(
          '<p class="error">One of more of your inputs is not a number</p>'
        )
        .fadeIn()
    : timer();
};

const checkNum = (num) => {
  const newNum = parseInt(num);
  var result = false;
  isNaN(newNum) || newNum < 0 ? (result = false) : (result = true);
  return result;
};

const timer = () => {
  $('#countdown-form').hide();
  $('#restart').show();
  t = setTimeout(minus, 1000);
};

const minus = () => {
  //Format our time
  const hoursDisplay = hours < 10 == 1 ? `0${hours}` : `${hours}`,
    minutesDisplay = minutes < 10 == 1 ? `0${minutes}` : `${minutes}`,
    secondsDisplay = seconds < 10 == 1 ? `0${seconds}` : `${seconds}`;

  if (seconds == 0 && hours == 0 && minutes == 0) {
    updateDisplay('Times Up!');
    return;
  }

  updateDisplay(`${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`);
  seconds--;

  if (seconds < 0) {
    minutes--;
    seconds = 59;
  }
  if (minutes < 0) {
    if (hours > 0) {
      minutes = 59;
      hours--;
    }
  }

  timer();
};

const updateDisplay = (display) => {
  $('#countdown-timer-display').html(display);
  if (display == 'Times Up!') {
    $('#countdown-timer-display')
      .addClass('accentText')
      .addClass('animate-item');
    var x = document.getElementById('time-up-sound');
    x.play();
    setTimeout(() => x.pause(), 10000);
  }
};

const restart = () => {
  $('#countdown-form').show();
  $('#restart').hide();
  $('#countdown-timer-display')
    .removeClass('accentText')
    .removeClass('animate-item')
    .html('00:00:00');
  //Clear the timeout
  document.getElementById('time-up-sound').pause();
  clearTimeout(t);
  //Empty our inputs
  $('#hours').val('');
  $('#minutes').val('');
  $('#seconds').val('');
};
