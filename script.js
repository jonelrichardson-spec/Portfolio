// Navigation and scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section[id]');
    const backToTop = document.getElementById('backToTop');

    // Back to top button functionality
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('scrolled');
        } else {
            backToTop.classList.remove('scrolled');
        }
    }

    // Scroll to top when clicked
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide back to top button on scroll
    window.addEventListener('scroll', toggleBackToTop);

    // Smooth scroll for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation item on scroll - FIXED VERSION
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            // Remove active class completely
            item.classList.remove('active');
            item.style.background = '';
            item.style.color = '';
            item.style.boxShadow = '';
            item.style.transform = '';
            item.style.borderLeft = '';
            
            // Add active styles manually for gold navigation
            if (item.getAttribute('data-section') === current) {
                item.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
                item.style.color = 'white';
                item.style.boxShadow = '0 5px 15px rgba(245, 158, 11, 0.4)';
                item.style.transform = 'translateX(-3px)';
                item.style.borderLeft = '3px solid #fbbf24';
                item.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNav);
    
    // Set initial active state
    updateActiveNav();

    // Smooth scroll for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderStyle = 'solid';
        });
        card.addEventListener('mouseleave', function() {
            this.style.borderStyle = 'dashed';
        });
    });

    // Dynamic typing effect for the handwriting text
    const handwritingElements = document.querySelectorAll('.handwriting');
    handwritingElements.forEach((element, index) => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transition = 'opacity 0.5s ease-in';
        }, (index + 1) * 500);
    });
});