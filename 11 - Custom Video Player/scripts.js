 // styling a default video player; building our own interface
 // step attribute in input range
 //use square brackets qs('[data-skip]) for selecting attribute name, two words/dash?

 // get our elements
 
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const fullScreen = player.querySelector('.fullscreen');



// Build out functions

function togglePlay() {
    // if(video.paused){ //paused is a property that lives on video; there is no play property
    //     video.play();
    // } else {
    //     video.pause()
    // }

    //another way to write the above method
    const toggle = video.paused ?  'play' : 'pause'  
    video[toggle]()
}

function updateButton() {
    const icon = this.paused ?  '►' : '❚ ❚';
    toggle.textContent = icon
}

function skip() {
    console.log('skipping', this.dataset) // will tell you which one you clicked on. returns ==> DOMStringMap {skip: "-10"} // skip is a key through data-skip on dom
    video.currentTime += parseFloat(this.dataset.skip) //currentTIme is a property of video; dataset is a string (DOMstringMap)
}

function handleRangeUpdate() { //two in one action; as long as there's a name
    console.log(this.name)
    console.log(this.value)
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime/video.duration) * 100; //currentTime and duration are properties of video; *100 so it's above 0
    progressBar.style.flexBasis = `${percent}%` //flexBasis -- need to remember this
}

function scrub(e) {
    // get the percentage of where you click divided by total width; multiply it by video duration to get the exact time
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration //remember offsetX is how far in we are in the bar; the bar is position relative?;
    video.currentTime = scrubTime
}

function handleFullScreen() {
    console.log('fullscreen')
    video.requestFullscreen()
}

// Hook up the event listeners

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)  // rather than finding the play button and updating the textContent to pause, listen to the video itself to see if it's paused because there are multiple ways to pause a video including plugins
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress) //new property; similar/same as a 'progress' event; rather than using a timeout; updates video progress


toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

let mouseDown = false //like the canvas example; doing this instead of mouse move so the video isn't as "shaky" trying to catch up
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e)); //if mouseDown is true it will go on and run the scrub(); don't need if statements
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullScreen.addEventListener('click', handleFullScreen)
