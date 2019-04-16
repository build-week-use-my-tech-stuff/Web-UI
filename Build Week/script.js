// home click events
const button = document.querySelector('.btn');
button.addEventListener('mouseover', function(eventObject){
    console.log(`Event Target: ${eventObject.target}`);
    eventObject.target.style.backgroundColor = "red"; 
});

const imgHover = document.querySelectorAll('.guarantee');




// Scale on hover code
// .grow { transition: all .2s ease-in-out; }
// .grow:hover { transform: scale(1.1); }

// class Button {
//     constructor(element){
//         this.element = element;
//         this.element.addEventListener()
//     }
// }

// Typerwriter Effect 

const TypeWriter = function(txtElement, words, wait = 3000){
	this.txtElement = txtElement;
	this.words = words;
	this.txt = " ";
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
}

// Type Method 
TypeWriter.prototype.type = function(){
	// Current Index of word
	const current = this.wordIndex % this.words.length;
	// Get full text of current word
	const fullTxt = this.words[current];

	// Check if deleting 
if(this.isDeleting){
	// Remove Char
	this.txt = fullTxt.substring(0, this.txt.length -1);
} else {
	// Add char
	this.txt = fullTxt.substring(0, this.txt.length +1);
}

	// Insert txt into element
	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

	// Initial type speed
	let typeSpeed = 100;

	if(this.isDeleting){
		typeSpeed /= 2;
	}

	// If word is complete 
	if(!this.isDeleting && this.txt === fullTxt){
		// Make pause at end
		typeSpeed = this.wait;
		// Set delete to true
		this.isDeleting = true;
	} else if(this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		// move to next word
		this.wordIndex++;
		// Pause before start typing 
		typeSpeed = 500;
	}

	setTimeout(() => this.type(), typeSpeed)
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);
// Init App
function init(){
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	// Init TypeWriter
	new TypeWriter(txtElement, words, wait);

}

// Typewriter End 

// Carousel Start 
var slideIndex,slides,dots,captionText;
function initGallery(){
    slideIndex = 0;
    slides=document.getElementsByClassName("imageHolder");
    slides[slideIndex].style.opacity=1;

    captionText=document.querySelector(".captionTextHolder .captionText");
    captionText.innerText=slides[slideIndex].querySelector(".captionText").innerText;

    //disable nextPrevBtn if slide count is one
    if(slides.length<2){
        var nextPrevBtns=document.querySelector(".leftArrow,.rightArrow");
        nextPrevBtns.style.display="none";
        for (i = 0; i < nextPrevBtn.length; i++) {
            nextPrevBtn[i].style.display="none";
        }
    }

    //add dots
    dots=[];
    var dotsContainer=document.getElementById("dotsContainer"),i;
    for (i = 0; i < slides.length; i++) {
        var dot=document.createElement("span");
        dot.classList.add("dots");
        dotsContainer.append(dot);
        dot.setAttribute("onclick","moveSlide("+i+")");
        dots.push(dot);
    }
    dots[slideIndex].classList.add("active");
}
initGallery();
function plusSlides(n) {
    moveSlide(slideIndex+n);
}
function moveSlide(n){
    var i;
    var current,next;
    var moveSlideAnimClass={
          forCurrent:"",
          forNext:""
    };
    var slideTextAnimClass;
    if(n>slideIndex) {
        if(n >= slides.length){n=0;}
        moveSlideAnimClass.forCurrent="moveLeftCurrentSlide";
        moveSlideAnimClass.forNext="moveLeftNextSlide";
        slideTextAnimClass="slideTextFromTop";
    }else if(n<slideIndex){
        if(n<0){n=slides.length-1;}
        moveSlideAnimClass.forCurrent="moveRightCurrentSlide";
        moveSlideAnimClass.forNext="moveRightPrevSlide";
        slideTextAnimClass="slideTextFromBottom";
    }

    if(n!=slideIndex){
        next = slides[n];
        current=slides[slideIndex];
        for (i = 0; i < slides.length; i++) {
            slides[i].className = "imageHolder";
            slides[i].style.opacity=0;
            dots[i].classList.remove("active");
        }
        current.classList.add(moveSlideAnimClass.forCurrent);
        next.classList.add(moveSlideAnimClass.forNext);
        dots[n].classList.add("active");
        slideIndex=n;
        captionText.style.display="none";
        captionText.className="captionText "+slideTextAnimClass;
        captionText.innerText=slides[n].querySelector(".captionText").innerText;
        captionText.style.display="block";
    }

}
var timer=null;
function setTimer(){
    timer=setInterval(function () {
        plusSlides(1) ;
    },9000);
}
setTimer();
function playPauseSlides() {
    var playPauseBtn=document.getElementById("playPause");
    if(timer==null){
        setTimer();
        playPauseBtn.style.backgroundPositionY="0px"
    }else{
        clearInterval(timer);
        timer=null;
        playPauseBtn.style.backgroundPositionY="-33px"
    }
}

// Carousel End