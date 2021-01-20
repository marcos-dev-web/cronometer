var running = false;

const elements = () => {
  return {
    input_hours: document.querySelector(".hour"),
    input_minutes: document.querySelector(".minute"),
    input_seconds: document.querySelector(".second"),
  };
};

function showError(msg) {
  let view = document.querySelector(".alert");
  let text = document.querySelector(".alert .msg .text");
  view.style.display = "flex";
  text.innerText = msg;
  view.addEventListener("click", (e) => {
    e.preventDefault();

    view.style.display = "none";
  });
}

function reset() {
  let el = elements();

  el.input_hours.value = 0;
  el.input_minutes.value = 1;
  el.input_seconds.value = 0;
}

function verify() {
  let el = elements();

  if (!(el.input_seconds.value.length > 0 && el.input_minutes.value.length > 0 && el.input_hours.value.length > 0)) {
    reset()
    showError("Enter values in fields! example: [0:1:35]")
    return false
  }

  let hours = Number.parseInt(el.input_hours.value);
  let minutes = Number.parseInt(el.input_minutes.value);
  let seconds = Number.parseInt(el.input_seconds.value);
  if ((hours === 0 && minutes === 0 && seconds === 0) || (hours && minutes && seconds) != 0) {
    reset();
    showError("minimo counter is: [0:0:1]");
    return false;
  } else {
    return true;
  }
}

function playAlarm() {
  let audio = new Audio('./audios/alarm-sound-effect.mp3');
  audio.play();
  setTimeout(() => {
    audio.pause()
  }, 5000)
}

function run() {
  running = true;
  let { input_hours, input_minutes, input_seconds } = elements();

  let h = Number.parseInt(input_hours.value);
  let m = Number.parseInt(input_minutes.value);
  let s = Number.parseInt(input_seconds.value);

  let time = setInterval(() => {
    if (h === 0 && m === 0 && s === 0) {
      clearInterval(time);
      input_hours.value = 0;
      input_minutes.value = 0;
      input_seconds.value = 0;
      playAlarm()
      running = false
      return true;
    }
    if (s === 0) {
      if (m > 0) {
        m--;
        s = 60;
      }
    }
    if (m === 0) {
      if (h > 0) {
        h--;
        m = 59;
        s = 60;
      }
    }
    s--;
    // console.log(`[${h}]:[${m}]:[${s}]`)
    input_hours.value = h;
    input_minutes.value = m;
    input_seconds.value = s;
  }, 1000);
}

function init() {
  if (!running) {
    if (verify()) {
      run()
    } else {
      reset();
      showError('ERROR: enter valids values');
    }
  } else {
    showError("Counter has running")
  }
}
