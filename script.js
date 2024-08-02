let startTime, updatedTime, difference, tInterval;
let running = false;
let paused = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time');
const lapsContainer = document.getElementById('laps');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        paused = false;
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pauseTimer() {
    if (!paused) {
        clearInterval(tInterval);
        paused = true;
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
    timeDisplay.innerHTML = '00:00:00';
    lapsContainer.innerHTML = '';
    lapCounter = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    timeDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function addLap() {
    if (running || paused) {
        lapCounter++;
        const lapTime = timeDisplay.innerHTML;
        const lapElement = document.createElement('div');
        lapElement.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);
