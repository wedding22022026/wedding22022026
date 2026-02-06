/* ===========================
   Wedding Invitation JavaScript
   Đức Mạnh & Thảo Thương
   =========================== */

document.addEventListener('DOMContentLoaded', function () {
    initCountdown();
    initNavigation();
    initScrollAnimations();
    initFloatingHearts();
    initBackToTop();
    initFormSubmission();
});

/* ===========================
   Countdown Timer
   =========================== */
function initCountdown() {
    // Wedding date: February 22, 2026 at 10:15 AM (Vietnam timezone UTC+7)
    const weddingDate = new Date('2026-02-22T10:15:00+07:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            // Wedding day has passed
            daysEl.textContent = '🎊';
            hoursEl.textContent = '💒';
            minutesEl.textContent = '💕';
            secondsEl.textContent = '🎉';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ===========================
   Navigation
   =========================== */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Scroll effect for navbar
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===========================
   Scroll Animations
   =========================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/* ===========================
   Floating Hearts
   =========================== */
function initFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💕', '💖', '💗', '💓', '💞', '❤️', '🤍', '💐', '🌸'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        container.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 12000);
    }

    // Create hearts periodically
    setInterval(createHeart, 2000);

    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 500);
    }
}

/* ===========================
   Back to Top Button
   =========================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===========================
   Form Submission
   =========================== */
function initFormSubmission() {
    const form = document.getElementById('rsvpForm');
    const wishesContainer = document.getElementById('wishesContainer');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const guestName = formData.get('guestName');
        const attendance = formData.get('attendance');
        const wishes = formData.get('wishes');

        // Show confirmation
        if (attendance === 'yes') {
            showNotification('🎉 Cảm ơn bạn! Chúng tôi rất vui được đón tiếp bạn!', 'success');
        } else {
            showNotification('😢 Tiếc quá! Hy vọng gặp bạn vào dịp khác!', 'info');
        }

        // Add wish to the wishes section if provided
        if (wishes && wishes.trim() !== '') {
            addWishCard(guestName, wishes);
        }

        // Reset form
        form.reset();
    });

    function addWishCard(name, message) {
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        wishCard.style.animation = 'fadeInUp 0.5s ease';
        wishCard.innerHTML = `
            <div class="wish-avatar">💌</div>
            <div class="wish-content">
                <h4>Từ ${name}</h4>
                <p>${escapeHtml(message)}</p>
                <span class="wish-author">- Vừa gửi</span>
            </div>
        `;

        wishesContainer.insertBefore(wishCard, wishesContainer.firstChild);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

/* ===========================
   Notification System
   =========================== */
function showNotification(message, type = 'success') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? 'linear-gradient(135deg, #c9a86c, #e8b4b8)' : 'linear-gradient(135deg, #6c9ac9, #b4c8e8)'};
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideDown 0.5s ease;
        font-size: 1.1rem;
    `;

    // Add keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            .notification-close {
                background: rgba(255,255,255,0.3);
                border: none;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .notification-close:hover {
                background: rgba(255,255,255,0.5);
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideDown 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ===========================
   Parallax Effect (Optional)
   =========================== */
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;

    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});
