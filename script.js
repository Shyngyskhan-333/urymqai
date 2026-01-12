document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.input-group input');
    const pin = document.getElementById('pin-container');
    const message = document.getElementById('message');
    const accessLink = document.getElementById('access-link');
    const slider = document.getElementById('slide');
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