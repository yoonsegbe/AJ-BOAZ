let currentIndex = 0;
const intervalTime = 3000; // Auto-slide interval in milliseconds
let slideInterval;

// Function to show slides
function showSlide(index) {
    const slides = document.querySelectorAll('.slides');

    if (index >= slides.length) currentIndex = 0; // Reset to first slide
    if (index < 0) currentIndex = slides.length - 1; // Go to last slide

    slides.forEach((slide, i) => {
        slide.style.display = i === currentIndex ? 'block' : 'none';
    });
}

// Function to start auto-sliding
function startSlider() {
    showSlide(currentIndex); // Show the first slide
    slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % document.querySelectorAll('.slides').length;
        showSlide(currentIndex);
    }, intervalTime);
}

// Function to handle swipe gestures
function addSwipeListeners() {
    const slider = document.querySelector(".slideshow-container");
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance to trigger action
        if (touchStartX - touchEndX > swipeThreshold) {
            changeSlide(1); // Swipe left → next slide
        } else if (touchEndX - touchStartX > swipeThreshold) {
            changeSlide(-1); // Swipe right → previous slide
        }
    }
}

// Function for manual slide control (triggered by swiping)
function changeSlide(step) {
    clearInterval(slideInterval); // Stop auto-slide when swiped
    currentIndex += step;
    showSlide(currentIndex);
    startSlider(); // Restart auto-slide
}

// Start the slider and enable swipe gestures
startSlider();
addSwipeListeners();