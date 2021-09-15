function Carousel (containerID, slideID){

    this.container = document.querySelector(containerID)
    this.slides = this.container.querySelectorAll(slideID);
    this.indicatorsContainer = this.container.querySelector('#indicators-container');
    this.indicators = this.container.querySelectorAll('.indicator');
    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
    
    this.interval = 2000;
}

Carousel.prototype = {

    _initProps (){
        
        this.intervalID = null;
        this.currentSlide = 0;
        this.slidesCount = this.slides.length;
        this.isPlaying = true;
        this.swipeStartX = null;
        this.swipeEndX = null;

        this.LEFT_ARROW = 'ArrowLeft';
        this.RIGHT_ARROW = 'ArrowRight';
        this.SPACE = 'Space'
        this.FA_PAUSE = '<i class="far fa-pause-circle">';
        this.FA_PLAY = '<i class="far fa-play-circle">';
    },

    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
        document.addEventListener('keydown', this.pressKey.bind(this));
        this.container.addEventListener('touchstart', this.swipeStart.bind(this));
        this.container.addEventListener('touchend', this.swipeEnd.bind(this));
        
    },

    _gotoSlide(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.slidesCount) % this.slidesCount;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    },

    _gotoPrev() {
        this._gotoSlide(this.currentSlide - 1);
    },

    _gotoNext() {
        this._gotoSlide(this.currentSlide + 1);
    },

    _play() {
        this.intervalID = setInterval(() => this._gotoNext(), this.interval);
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.isPlaying = true;

    },

    _pause() {
        if (this.isPlaying) {
            clearInterval(this.intervalID);
            this.pauseBtn.innerHTML = this.FA_PLAY;
            this.isPlaying = false;
        }

    },

    pausePlay() {
        this.isPlaying ? this._pause() : this._play();
    },

     next(){
        this._pause();
        this._gotoNext();
        
    },
        
     prev(){
        this._pause();
        this._gotoPrev();
        
    },

    
     indicate (e){
        let target = e.target;
        if (target.classList.contains('indicator')){
            this._pause();
            // _gotoSlide(+target.getAttribute('data-slide-to')); 
            this._gotoSlide(+target.dataset.slideTo); 
        }  
    
    },
    
     pressKey(e) {
        if (e.code === this.LEFT_ARROW) this.prev();
        if (e.code === this.RIGHT_ARROW) this.next();
        if (e.code === this.SPACE) this.pausePlay();
    },
    
     swipeStart (e){
        this.swipeStartX = e.changedTouches[0].pageX;
    },
    
     swipeEnd (e){
        this.swipeEndX = e.changedTouches[0].pageX;
        this.swipeStartX - this.swipeEndX > 100 && this.next();
        this.swipeStartX - this.swipeEndX < -100 && this.prev();
    },

    init() {
        this._initProps ();
        this._initListeners();
        this.intervalID = setInterval(() => this._gotoNext(), this.interval);
    }
};

// Carousel.prototype.test1 = function () {
//     console.log("test1")

// }

// Carousel.prototype.test2 = function () {
//     console.log("test2")

// }