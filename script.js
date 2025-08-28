// DOM Elements
// const hamburger = document.querySelector('.hamburger'); // Handled by shared navigation
const navMenu = document.querySelector('.nav-menu');

// Mobile Navigation Toggle
// if (hamburger && navMenu) {
//     hamburger.addEventListener('click', () => {
//         navMenu.classList.toggle('active');
//     });
// } // Handled by shared navigation

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Enhanced Chatbot Integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbot enhancements
    initializeChatbotEnhancements();
    
    // Add hover effects to cards
    addCardHoverEffects();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
    
    // Add performance optimizations
    addPerformanceOptimizations();
    
    console.log('Shoglak Gambak website loaded successfully with enhanced features!');
});

// Initialize chatbot enhancements
function initializeChatbotEnhancements() {
    // Wait for chatbot to be available
    setTimeout(() => {
        if (window.chatbotInstance) {
            // Add global chatbot features
            addGlobalChatbotFeatures();
            
            // Add page-specific enhancements
            addPageSpecificEnhancements();
        }
    }, 2000);
}

// Add global chatbot features
function addGlobalChatbotFeatures() {
    if (window.ModernChatbot) {
        // Add analytics tracking
        window.ModernChatbot.prototype.trackInteraction = function(action, data) {
            console.log('Chatbot Interaction:', action, data);
            // Here you can add actual analytics tracking
        };
        
        // Add user preference storage
        window.ModernChatbot.prototype.saveUserPreference = function(key, value) {
            localStorage.setItem(`chatbot_${key}`, JSON.stringify(value));
        };
        
        window.ModernChatbot.prototype.getUserPreference = function(key) {
            const stored = localStorage.getItem(`chatbot_${key}`);
            return stored ? JSON.parse(stored) : null;
        };
        
        // Override send message to track interactions
        const originalSendMessage = window.ModernChatbot.prototype.sendMessage;
        window.ModernChatbot.prototype.sendMessage = function() {
            const message = this.input.value.trim();
            if (message) {
                this.trackInteraction('message_sent', { message, timestamp: Date.now() });
            }
            originalSendMessage.call(this);
        };
    }
}

// Add page-specific enhancements
function addPageSpecificEnhancements() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('index.html') || currentPath === '/') {
        // Homepage specific enhancements
        addHomepageEnhancements();
    } else if (currentPath.includes('profile')) {
        // Profile page specific enhancements
        addProfileEnhancements();
    } else if (currentPath.includes('opportunities')) {
        // Opportunities page specific enhancements
        addOpportunitiesEnhancements();
    }
}

// Homepage enhancements
function addHomepageEnhancements() {
    // Add welcome animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Add feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
    });
}

// Profile page enhancements
function addProfileEnhancements() {
    // Add profile completion indicator
    const profileCompletion = calculateProfileCompletion();
    if (profileCompletion < 100) {
        showProfileCompletionPrompt(profileCompletion);
    }
}

// Opportunities page enhancements
function addOpportunitiesEnhancements() {
    // Add search suggestions
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        addSearchSuggestions(searchInput);
    }
}

// Calculate profile completion percentage
function calculateProfileCompletion() {
    const requiredFields = [
        'profileName',
        'profileTitle',
        'profileEmail',
        'profilePhone',
        'profileBio'
    ];
    
    let completedFields = 0;
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && field.value.trim()) {
            completedFields++;
        }
    });
    
    return Math.round((completedFields / requiredFields.length) * 100);
}

// Show profile completion prompt
function showProfileCompletionPrompt(completion) {
    const prompt = document.createElement('div');
    prompt.className = 'profile-completion-prompt';
    prompt.innerHTML = `
        <div class="prompt-content">
            <i class="fas fa-user-edit"></i>
            <span>اكمل ملفك الشخصي (${completion}%)</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(prompt);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (prompt.parentElement) {
            prompt.remove();
        }
    }, 10000);
}

// Add search suggestions
function addSearchSuggestions(searchInput) {
    const suggestions = [
        'مطور ويب',
        'مصمم جرافيك',
        'مطور تطبيقات',
        'كاتب محتوى',
        'مترجم',
        'مدير مشاريع'
    ];
    
    let suggestionIndex = 0;
    
    setInterval(() => {
        if (document.activeElement !== searchInput) {
            searchInput.placeholder = `ابحث عن فرص عمل... مثال: ${suggestions[suggestionIndex]}`;
            suggestionIndex = (suggestionIndex + 1) % suggestions.length;
        }
    }, 3000);
}

// Add card hover effects
function addCardHoverEffects() {
    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 15px 35px rgba(75, 0, 130, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 20px rgba(75, 0, 130, 0.1)';
            });
        });
    }

    // Page cards hover effect
    const pageCards = document.querySelectorAll('.page-card');
    if (pageCards.length > 0) {
        pageCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 15px 35px rgba(75, 0, 130, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 20px rgba(75, 0, 130, 0.1)';
            });
        });
    }
}

// Add keyboard shortcuts
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K: Open chatbot
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (window.chatbotInstance) {
                window.chatbotInstance.openChat();
            }
        }
        
        // Ctrl/Cmd + /: Show help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            showKeyboardShortcuts();
        }
        
        // Escape: Close modals and chatbot
        if (e.key === 'Escape') {
            closeAllModals();
            if (window.chatbotInstance && window.chatbotInstance.isOpen) {
                window.chatbotInstance.closeChat();
            }
        }
    });
}

// Show keyboard shortcuts help
function showKeyboardShortcuts() {
    const shortcuts = [
        { key: 'Ctrl + K', description: 'فتح المساعد الذكي' },
        { key: 'Ctrl + /', description: 'عرض اختصارات لوحة المفاتيح' },
        { key: 'Escape', description: 'إغلاق النوافذ المنبثقة' }
    ];
    
    let helpText = 'اختصارات لوحة المفاتيح:\n\n';
    shortcuts.forEach(shortcut => {
        helpText += `${shortcut.key}: ${shortcut.description}\n`;
    });
    
    alert(helpText);
}

// Close all modals
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Add performance optimizations
function addPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        '/pages/chatbot/chatbot.css',
        '/pages/chatbot/chatbot.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Add profile completion prompt styles
const profileCompletionStyles = `
    .profile-completion-prompt {
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        z-index: 9999;
        animation: slideInFromRight 0.5s ease-out;
        max-width: 300px;
    }
    
    .prompt-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .prompt-content button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    @keyframes slideInFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        .profile-completion-prompt {
            top: 80px;
            right: 15px;
            left: 15px;
            max-width: none;
        }
    }
`;

// Inject profile completion styles
const styleSheet = document.createElement('style');
styleSheet.textContent = profileCompletionStyles;
document.head.appendChild(styleSheet);

