// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Reveal Animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Skill Bars Animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
};

// Initialize animations when page loads
window.addEventListener('load', () => {
    scrollReveal();
    animateSkillBars();
});

// Add scroll reveal class to elements
document.querySelectorAll('.card, .skill-item, .resource-card').forEach(element => {
    element.classList.add('scroll-reveal');
});

// Advanced animations for founder card
const founderCard = document.querySelector('.founder-card');
let isVisible = false;

// Function to check if element is in viewport
const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Handle scroll animation
const handleScroll = () => {
    if (isElementInViewport(founderCard) && !isVisible) {
        founderCard.classList.add('active');
        isVisible = true;
    }
};

// Add mouse move effect
founderCard.addEventListener('mousemove', (e) => {
    const rect = founderCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    founderCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Reset card position when mouse leaves
founderCard.addEventListener('mouseleave', () => {
    founderCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial check for visibility
handleScroll();

// Make founder card active immediately
document.addEventListener('DOMContentLoaded', () => {
    const founderCard = document.querySelector('.founder-card');
    if (founderCard) {
        founderCard.classList.add('active');
    }
});

const GEMINI_API_KEY = "AIzaSyAWO0KSW28W9_h-cNIATd-Sjdtrcb1EATw";

const askButton = document.getElementById('askButton');
const userInput = document.getElementById('userInput');
const aiResponse = document.getElementById('aiResponse');

askButton.addEventListener('click', async () => {
    const question = userInput.value.trim();
    if (!question) {
        aiResponse.innerHTML = '<p>Please enter a question.</p>';
        return;
    }

    // Clear previous response and show loading indicator
    aiResponse.innerHTML = '<p>Thinking...</p>';

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: {
                    text: question
                },
                temperature: 0.7,
                maxOutputTokens: 150
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API error: ${errText}`);
        }

        const data = await response.json();
        const answer = data.candidates?.[0]?.output || "Sorry, no response was generated.";
        // Format response to preserve line breaks
        aiResponse.innerHTML = `<p>${answer.replace(/\n/g, '<br>')}</p>`;

    } catch (error) {
        console.error('API call error:', error);
        aiResponse.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

