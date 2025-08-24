// Project Download Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const backButton = document.getElementById('backButton');
    // const hamburger = document.getElementById('hamburger'); // Handled by shared navigation
    const navMenu = document.getElementById('nav-menu');
    
    // Navigation
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Mobile menu functionality
    // hamburger.addEventListener('click', function() {
    //     hamburger.classList.toggle('active');
    //     navMenu.classList.toggle('active');
    // });
    // 
    // // Close mobile menu when clicking on a link
    // document.querySelectorAll('.nav-link').forEach(link => {
    //     link.addEventListener('click', () => {
    //         hamburger.classList.remove('active');
    //         navMenu.classList.remove('active');
    //     });
    // }); // Handled by shared navigation
    
    // Initialize page
    console.log('Project Download Page loaded successfully');
});

// Global functions for download buttons
function downloadFile(filename) {
    // Simulate file download
    showNotification(`جاري تحميل ${filename}...`, 'info');
    
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = '#';
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Simulate download delay
    setTimeout(() => {
        showNotification(`تم تحميل ${filename} بنجاح!`, 'success');
        document.body.removeChild(link);
    }, 1500);
}

function downloadAllFiles() {
    showNotification('جاري تحميل جميع ملفات المشروع...', 'info');
    
    setTimeout(() => {
        showNotification('تم تحميل جميع الملفات بنجاح!', 'success');
    }, 2000);
}

function goToHome() {
    window.location.href = 'index.html';
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        font-family: 'Cairo', sans-serif;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px;
            margin-left: auto;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'linear-gradient(135deg, #28a745, #20c997)';
        case 'error': return 'linear-gradient(135deg, #dc3545, #c82333)';
        case 'warning': return 'linear-gradient(135deg, #ffc107, #e0a800)';
        default: return 'linear-gradient(135deg, #4B0082, #764ba2)';
    }
}