// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Number Counting Animation
const counters = document.querySelectorAll('.metric-val[data-target]');
let hasCounted = false;
const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current).toLocaleString() + (target > 10000 ? ' L' : (target === 840 ? '' : (target === 3 ? '' : '+')));
                requestAnimationFrame(updateCounter);
            } else {
                let suffix = '';
                if (target === 85000 || target === 12000) suffix = ' L';
                else if (target === 1250) suffix = '+';
                counter.innerText = target.toLocaleString() + suffix;
            }
        };
        updateCounter();
    });
};

const impactSection = document.querySelector('#impact');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasCounted) {
        startCounters();
        hasCounted = true;
    }
}, { threshold: 0.5 });
observer.observe(impactSection);
// Spotlight Mouse Tracking
const spotlights = document.querySelectorAll('.spotlight');
document.addEventListener('mousemove', (e) => {
    spotlights.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
}
