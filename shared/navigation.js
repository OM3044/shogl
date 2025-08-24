// Enhanced Dynamic Navigation JavaScript
// Use namespace to avoid conflicts
window.SharedNavigation = window.SharedNavigation || {};

// Initialize navigation functionality
window.SharedNavigation.initializeNavigation = function() {
    // Check if already initialized to prevent conflicts
    if (window.SharedNavigation.initialized) {
        return;
    }
    
    window.SharedNavigation.initialized = true;
    
    // Get elements without declaring conflicting variables
    const hamburgerEl = document.getElementById('hamburger');
    const navMenuEl = document.querySelector('.nav-menu');
    const navLinkEls = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    if (hamburgerEl && navMenuEl) {
        hamburgerEl.addEventListener('click', function() {
            navMenuEl.classList.toggle('active');
            hamburgerEl.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        navLinkEls.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenuEl.classList.remove('active');
                hamburgerEl.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerEl.contains(e.target) && !navMenuEl.contains(e.target)) {
                navMenuEl.classList.remove('active');
                hamburgerEl.classList.remove('active');
            }
        });
    }
    
    // Set active navigation link based on current page
    window.SharedNavigation.setActiveNavLink();
    
    // Add smooth scrolling for anchor links
    window.SharedNavigation.addSmoothScrolling();
    
    // Add navigation animations
    window.SharedNavigation.addNavigationAnimations();
};

// Set active navigation link
window.SharedNavigation.setActiveNavLink = function() {
    const currentPath = window.location.pathname;
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    navLinkElements.forEach(link => {
        link.classList.remove('active');
        const linkPath = new URL(link.href).pathname;
        
        // Check if current page matches the link
        if (currentPath === linkPath || 
            (currentPath.includes(linkPath.split('/').pop()) && linkPath !== '/')) {
            link.classList.add('active');
        }
        
        // Special case for home page
        if (currentPath === '/' || currentPath.includes('index.html')) {
            if (link.href.includes('index.html') || link.href.endsWith('/')) {
                link.classList.add('active');
            }
        }
    });
};

// Add smooth scrolling for anchor links
window.SharedNavigation.addSmoothScrolling = function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Add navigation animations
window.SharedNavigation.addNavigationAnimations = function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add stagger animation to nav links
    navLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('nav-link-animate');
    });
    
    // Add scroll effect to navbar
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add navbar background opacity based on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 1);
        navbar.style.background = `linear-gradient(to right, rgba(75, 0, 130, ${0.9 + opacity * 0.1}), rgba(118, 75, 162, ${0.9 + opacity * 0.1}))`;
    });
}

// Add CSS for nav link animations
window.SharedNavigation.addNavigationStyles = function() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-link-animate {
            opacity: 0;
            transform: translateY(-20px);
            animation: slideInDown 0.6s ease-out forwards;
        }
        
        @keyframes slideInDown {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .navbar {
            transition: transform 0.3s ease, background 0.3s ease;
        }
        
        /* Enhanced mobile menu animations */
        @media (max-width: 768px) {
            .nav-menu {
                transform: translateX(100%);
                opacity: 0;
            }
            
            .nav-menu.active {
                transform: translateX(0);
                opacity: 1;
            }
            
            .nav-menu .nav-link {
                transform: translateX(50px);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .nav-menu.active .nav-link {
                transform: translateX(0);
                opacity: 1;
            }
            
            .nav-menu.active .nav-link:nth-child(1) { transition-delay: 0.1s; }
            .nav-menu.active .nav-link:nth-child(2) { transition-delay: 0.2s; }
            .nav-menu.active .nav-link:nth-child(3) { transition-delay: 0.3s; }
            .nav-menu.active .nav-link:nth-child(4) { transition-delay: 0.4s; }
            .nav-menu.active .nav-link:nth-child(5) { transition-delay: 0.5s; }
            .nav-menu.active .nav-link:nth-child(6) { transition-delay: 0.6s; }
            .nav-menu.active .nav-link:nth-child(7) { transition-delay: 0.7s; }
            .nav-menu.active .nav-link:nth-child(8) { transition-delay: 0.8s; }
        }
    `;
    document.head.appendChild(style);
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.SharedNavigation.initializeNavigation();
    window.SharedNavigation.addNavigationStyles();
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.SharedNavigation;
}