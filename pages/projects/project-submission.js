// Project Submission Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const backButton = document.getElementById('backButton');
    const userTypeSection = document.getElementById('userTypeSection');
    const freelancerSection = document.getElementById('freelancerSection');
    const clientSection = document.getElementById('clientSection');
    const userTypeCards = document.querySelectorAll('.user-type-card');
    
    // File upload elements
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadArea = document.getElementById('uploadArea');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const removeFileBtn = document.getElementById('removeFileBtn');
    const uploadProjectBtn = document.getElementById('uploadProjectBtn');
    const completePaymentBtn = document.getElementById('completePaymentBtn');
    
    // Client elements
    const exportProjectBtn = document.getElementById('exportProjectBtn');
    
    // Modal elements
    const verificationModal = document.getElementById('verificationModal');
    const closeModal = document.getElementById('closeModal');
    const verificationCode = document.getElementById('verificationCode');
    const submitVerification = document.getElementById('submitVerification');
    const cancelVerification = document.getElementById('cancelVerification');
    
    // Variables
    let selectedFile = null;
    let selectedUserType = null;
    
    // Navigation
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // User Type Selection
    userTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            const userType = this.getAttribute('data-type');
            selectUserType(userType);
        });
    });
    
    function selectUserType(userType) {
        selectedUserType = userType;
        
        // Remove selected class from all cards
        userTypeCards.forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        const selectedCard = document.querySelector(`[data-type="${userType}"]`);
        selectedCard.classList.add('selected');
        
        // Show appropriate section
        if (userType === 'freelancer') {
            userTypeSection.style.display = 'none';
            freelancerSection.style.display = 'block';
            clientSection.style.display = 'none';
        } else if (userType === 'client') {
            userTypeSection.style.display = 'none';
            freelancerSection.style.display = 'none';
            clientSection.style.display = 'block';
        }
    }
    
    // File Upload Functionality
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });
    
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });
    
    function handleFileSelect(file) {
        // Validate file type
        const allowedTypes = ['.zip', '.rar', '.pdf', '.doc', '.docx'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        
        if (!allowedTypes.includes(fileExtension)) {
            showNotification('نوع الملف غير مدعوم. يرجى اختيار ملف بصيغة ZIP, RAR, PDF, DOC, أو DOCX', 'error');
            return;
        }
        
        // Validate file size (max 50MB)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            showNotification('حجم الملف كبير جداً. الحد الأقصى 50 ميجابايت', 'error');
            return;
        }
        
        selectedFile = file;
        displayFileInfo(file);
        uploadProjectBtn.disabled = false;
    }
    
    function displayFileInfo(file) {
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        fileInfo.style.display = 'flex';
        uploadArea.style.display = 'none';
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    removeFileBtn.addEventListener('click', function() {
        selectedFile = null;
        fileInput.value = '';
        fileInfo.style.display = 'none';
        uploadArea.style.display = 'block';
        uploadProjectBtn.disabled = true;
    });
    
    // Upload Project Button
    uploadProjectBtn.addEventListener('click', function() {
        if (!selectedFile) {
            showNotification('يرجى اختيار ملف أولاً', 'error');
            return;
        }
        
        // Simulate upload process
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الرفع...';
        
        setTimeout(() => {
            // Simulate successful upload
            showNotification('تم رفع المشروع بنجاح!', 'success');
            this.style.display = 'none';
            completePaymentBtn.style.display = 'flex';
            
            // Reset button text
            this.innerHTML = '<i class="fas fa-upload"></i> رفع المشروع';
        }, 2000);
    });
    
    // Complete Payment Button
    completePaymentBtn.addEventListener('click', function() {
        showNotification('سيتم توجيهك إلى صفحة الدفع قريباً...', 'info');
        // Here you would typically redirect to a payment page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
    
    // Export Project Button (Client)
    exportProjectBtn.addEventListener('click', function() {
        showVerificationModal();
    });
    
    // Modal Functionality
    function showVerificationModal() {
        verificationModal.style.display = 'block';
        verificationCode.focus();
    }
    
    function hideVerificationModal() {
        verificationModal.style.display = 'none';
        verificationCode.value = '';
    }
    
    closeModal.addEventListener('click', hideVerificationModal);
    cancelVerification.addEventListener('click', hideVerificationModal);
    
    // Close modal when clicking outside
    verificationModal.addEventListener('click', function(e) {
        if (e.target === verificationModal) {
            hideVerificationModal();
        }
    });
    
    // Submit Verification
    submitVerification.addEventListener('click', function() {
        const code = verificationCode.value.trim();
        
        if (!code) {
            showNotification('يرجى إدخال رمز التحقق', 'error');
            return;
        }
        
        // For demo purposes, accept any code
        // In real implementation, you would validate against a server
        if (code.length >= 4) {
            hideVerificationModal();
            showNotification('تم التحقق بنجاح! جاري التوجيه...', 'success');
            
            setTimeout(() => {
                // Navigate to project download page
                window.location.href = 'project-download.html';
            }, 1500);
        } else {
            showNotification('رمز التحقق غير صحيح', 'error');
        }
    });
    
    // Handle Enter key in verification input
    verificationCode.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitVerification.click();
        }
    });
    
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
    
    // Mobile menu functionality
    // const hamburger = document.getElementById('hamburger'); // Handled by shared navigation
    const navMenu = document.getElementById('nav-menu');
    
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
    console.log('Project Submission Page loaded successfully');
});