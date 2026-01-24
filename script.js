document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.input-group input');
    const pin = document.getElementById('pin-container');
    const message = document.getElementById('message');
    const accessLink = document.getElementById('access-link');
    const correctPin = "101";

    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
            if (e.key === 'Enter') checkPin();
        });
    });

    window.checkPin = function() {
        let enteredPin = "";
        inputs.forEach(input => enteredPin += input.value);

        if (enteredPin === correctPin) {
            accessLink.style.display = "inline-block"; 
            accessLink.classList.add('success');
            pin.classList.add('success');
            slider.style.display = "inline-block";
            inputs.forEach(input => input.disabled = true);

            inputs.forEach(input => {
                input.value = "";
                input.style.borderColor = "#00FF00";});
                setTimeout(() => input.style.borderColor = "darkgrey", 500);
        } else {
            message.style.color = "#ff4d4d";
            message.textContent = "FAKE URYMQAI DETECTED";
            inputs.forEach(input => {
                input.value = "";
                input.style.borderColor = "#ff4d4d";
                setTimeout(() => input.style.borderColor = "darkgrey", 500);
            });
            inputs[0].focus();
            accessLink.style.display = "none";
            accessLink.classList.remove('success');
        }
    };
});


const wrapper = document.querySelector('.episodes');
    const nextEpBtn = document.querySelector('#nextEpBtn');
    const prevEpBtn = document.querySelector('#prevEpBtn');
    const blocks = document.querySelectorAll('.cardep');

    let currentIndex = 0;
    const totalBlocks = blocks.length;
    const blockWidth = 400; // Matches CSS width

    nextEpBtn.addEventListener('click', () => {
        if (currentIndex < totalBlocks - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // The Loop: Go back to start
        }
        updateSlider();
    });

    prevEpBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalBlocks - 1; // The Loop: Jump to end
        }
        updateSlider();
    });

    function updateSlider() {
        // Shift the wrapper to the left based on the index
        const offset = -currentIndex * blockWidth;
        wrapper.style.transform = `translateX(${offset}px)`;
    }

    let touchStartX = 0;
let touchEndX = 0;

const episodeview = document.querySelector('.episodeview');

episodeview.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

episodeview.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
}, { passive: true });

function handleGesture() {
    const swipeThreshold = 50; // Minimum distance to count as a swipe
    
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swiped Left -> Show Next
        nextEpBtn.click();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swiped Right -> Show Previous
        prevEpBtn.click();
    }
}
