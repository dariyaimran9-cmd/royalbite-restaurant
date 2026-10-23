
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.navlinks');

// Mobile navigation
if (toggle && links) {
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('open');

        toggle.textContent = isOpen ? '✕' : '☰';
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.textContent = '☰';
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Automatically update copyright year
document.querySelectorAll('.year').forEach(element => {
    element.textContent = new Date().getFullYear();
});

// Show confirmation messages
const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.style.display = 'block';

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.style.display = 'none';
    }, 4500);
}

// Prevent choosing a past reservation date
const dateInput = document.getElementById('bookingDate');

if (dateInput) {
    const now = new Date();

    const localDate = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString().slice(0, 10);

    dateInput.min = localDate;
}

// Reservation form demo
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', event => {
        event.preventDefault();

        if (!bookingForm.reportValidity()) return;

        const data = new FormData(bookingForm);
        const name = data.get('name');

        showToast(
            `Thank you, ${name}! Your demo reservation form was submitted. No real booking was sent.`
        );

        bookingForm.reset();
    });
}

// Contact form demo
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        showToast(
            'Thank you for your message! This demo does not send an actual email.'
        );

        contactForm.reset();
    });
}