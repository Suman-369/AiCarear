
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    init3DEffects();
    initNewsSlider();
    initContactForm();
    initParallaxEffects();
    initLoadingAnimations();
    setupWipRedirects();
    initThemeToggle();
    initMembersSectionToggle();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.setProperty('background', 'var(--bg-navbar-scrolled)', 'important');
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.setProperty('background', 'var(--bg-primary-translucent)', 'important');
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.news-card, .research-card, .stat-item, .pillar');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// 3D Effects
function init3DEffects() {
    // 3D card tilt effect
    const cards = document.querySelectorAll('.news-card, .research-card, .pillar');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });

    // 3D button effects
    const buttons = document.querySelectorAll('.btn-3d');
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// News slider functionality
function initNewsSlider() {
    const newsCards = document.querySelectorAll('.news-card');
    let currentIndex = 0;

    // Auto-rotate news cards
    setInterval(() => {
        newsCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.transform = 'scale(1.05) translateY(-10px)';
                card.style.zIndex = '10';
            } else {
                card.style.transform = 'scale(1) translateY(0)';
                card.style.zIndex = '1';
            }
        });
        
        currentIndex = (currentIndex + 1) % newsCards.length;
    }, 3000);

    // Add click handlers for news cards
    newsCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add your news detail functionality here
            console.log('News card clicked:', this.querySelector('h3').textContent);
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'wip.html';
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effects
function initParallaxEffects() {
    const shapes = document.querySelectorAll('.shape');
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// Loading animations
function initLoadingAnimations() {
    // Add loading class to elements
    const elements = document.querySelectorAll('.news-card, .research-card, .stat-item, .pillar');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Enhanced 3D cube interaction
function initCubeInteraction() {
    const cube = document.querySelector('.research-cube');
    if (!cube) return;
    
    let isMouseDown = false;
    let startX, startY;
    let rotateX = 0, rotateY = 0;
    
    cube.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.clientX;
        startY = e.clientY;
        cube.style.animationPlayState = 'paused';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;
        
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        startX = e.clientX;
        startY = e.clientY;
    });
    
    document.addEventListener('mouseup', () => {
        isMouseDown = false;
        cube.style.animationPlayState = 'running';
    });
}

// Initialize cube interaction
initCubeInteraction();

// Smooth reveal animations for sections
function initSectionReveals() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Initialize section reveals
initSectionReveals();

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations can go here
}, 16)); // ~60fps

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Add touch support for mobile devices
function initTouchSupport() {
    const cards = document.querySelectorAll('.news-card, .research-card, .pillar');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize touch support
initTouchSupport();

// Add loading state for buttons
function initButtonLoading() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                this.disabled = true;
                
                // Simulate loading time
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
}

// Initialize button loading states
initButtonLoading();

// WIP Page Redirects
function setupWipRedirects() {
    const redirectElements = document.querySelectorAll('.hero-buttons .btn, a.read-more');
    redirectElements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'wip.html';
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggleButton = document.querySelector('.theme-toggle-button');
    const body = document.body;

    // Function to apply theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // Toggle theme on button click
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Members Section Toggle
function initMembersSectionToggle() {
    const openBtn = document.getElementById('open-members-btn');
    const membersSection = document.getElementById('members');
    const closeBtn = membersSection ? membersSection.querySelector('.close-members-section') : null;
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');

    if (!openBtn || !membersSection || !closeBtn) return;

    function openMembersSection() {
        membersSection.style.display = 'block';
        closeBtn.style.display = 'block';
        // Hide nav menu on mobile
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    function closeMembersSection() {
        membersSection.style.display = 'none';
        closeBtn.style.display = 'none';
        document.body.style.overflow = '';
    }
    openBtn.addEventListener('click', openMembersSection);
    closeBtn.addEventListener('click', closeMembersSection);
    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && membersSection.style.display === 'block') {
            closeMembersSection();
        }
    });
} 