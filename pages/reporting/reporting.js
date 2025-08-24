// DOM Elements
const reportingForm = document.getElementById('reportingForm');
const reportType = document.getElementById('reportType');
const reportDescription = document.getElementById('reportDescription');
const charCount = document.getElementById('charCount');
const submitReport = document.getElementById('submitReport');
const notification = document.getElementById('notification');
const overlay = document.getElementById('overlay');
const confirmationMessage = document.getElementById('confirmationMessage');
const themeToggle = document.getElementById('themeToggle');
// const hamburger = document.getElementById('hamburger'); // Handled by shared navigation
const navMenu = document.getElementById('nav-menu');

// Enhanced Reporting Page JavaScript with Dynamic Interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeReportingPage();
});

// Global variables
let currentStep = 1;
const totalSteps = 4;
let uploadedFiles = [];

// Initialize all functionality
function initializeReportingPage() {
    initializeAnimatedCounters();
    initializeFormProgress();
    initializeMultiStepForm();
    initializeSmartSuggestions();
    initializeFileUpload();
    initializeTextareaTools();
    initializeInteractiveCards();
    initializeFormValidation();
    initializeCharacterCounter();
    initializeMobileNavigation();
    initializeThemeToggle();
    initializeSmoothScrolling();
    initializeFadeInAnimations();
    initializeFormSummary();
    initializeStatusFilters();
    initializeHelpAccordion();
    initializeAnalytics();
    initializeAISuggestions();
    initializeFileManagement();
    initializeRealTimeUpdates();
}

// Animated counters for statistics
function initializeAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Form progress indicator
function initializeFormProgress() {
    updateProgress();
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const percentage = (currentStep / totalSteps) * 100;
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (progressPercentage) {
        progressPercentage.textContent = Math.round(percentage) + '%';
    }
    
    // Update step indicators
    updateStepIndicators();
}

function updateStepIndicators() {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber === currentStep) {
            step.classList.add('active');
        } else if (stepNumber < currentStep) {
            step.classList.add('completed');
        }
    });
}

// Multi-step form navigation
function initializeMultiStepForm() {
    const nextBtn = document.getElementById('nextStepBtn');
    const prevBtn = document.getElementById('prevStepBtn');
    const submitBtn = document.getElementById('submitReport');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevStep);
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', handleFormSubmit);
    }
    
    // Show first step
    showStep(1);
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgress();
    }
}

function showStep(stepNumber) {
    const sections = document.querySelectorAll('.form-section');
    const nextBtn = document.getElementById('nextStepBtn');
    const prevBtn = document.getElementById('prevStepBtn');
    const submitBtn = document.getElementById('submitReport');
    
    sections.forEach((section, index) => {
        const sectionStep = parseInt(section.getAttribute('data-step'));
        if (sectionStep === stepNumber) {
            section.style.display = 'block';
            section.classList.add('active');
        } else {
            section.style.display = 'none';
            section.classList.remove('active');
        }
    });
    
    // Update button visibility
    if (stepNumber === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    } else if (stepNumber === totalSteps) {
        prevBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        prevBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

function validateCurrentStep() {
    const currentSection = document.querySelector(`[data-step="${currentStep}"]`);
    const requiredFields = currentSection.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'هذا الحقل مطلوب');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    return isValid;
}

// Smart suggestions based on report type
function initializeSmartSuggestions() {
    const reportType = document.getElementById('reportType');
    const smartSuggestions = document.getElementById('smartSuggestions');
    const suggestionContent = document.getElementById('suggestionContent');
    
    if (reportType) {
        reportType.addEventListener('change', function() {
            const selectedValue = this.value;
            
            if (selectedValue) {
                const suggestions = getSuggestions(selectedValue);
                if (suggestions.length > 0) {
                    displaySuggestions(suggestions);
                    smartSuggestions.style.display = 'block';
                } else {
                    smartSuggestions.style.display = 'none';
                }
            } else {
                smartSuggestions.style.display = 'none';
            }
        });
    }
}

function getSuggestions(reportType) {
    const suggestions = {
        'noDelivery': [
            { icon: 'fas fa-calendar', text: 'اذكر التاريخ المتفق عليه لتسليم العمل' },
            { icon: 'fas fa-clock', text: 'حدد الوقت الذي تأخر فيه التسليم' },
            { icon: 'fas fa-comments', text: 'اشرح محاولات التواصل مع المطور' }
        ],
        'abusiveContent': [
            { icon: 'fas fa-exclamation-triangle', text: 'حدد نوع المحتوى المسيء' },
            { icon: 'fas fa-link', text: 'أضف رابط المحتوى إن أمكن' },
            { icon: 'fas fa-user', text: 'اذكر اسم المستخدم المسؤول' }
        ],
        'fraud': [
            { icon: 'fas fa-money-bill', text: 'اذكر المبلغ المطلوب' },
            { icon: 'fas fa-credit-card', text: 'اشرح طريقة الدفع المطلوبة' },
            { icon: 'fas fa-user-secret', text: 'حدد هوية المحتال إن أمكن' }
        ],
        'technical': [
            { icon: 'fas fa-bug', text: 'اشرح المشكلة التقنية بالتفصيل' },
            { icon: 'fas fa-desktop', text: 'اذكر نوع الجهاز والمتصفح' },
            { icon: 'fas fa-screenshot', text: 'أرفق صورة للمشكلة إن أمكن' }
        ]
    };
    
    return suggestions[reportType] || [];
}

function displaySuggestions(suggestions) {
    const suggestionContent = document.getElementById('suggestionContent');
    
    suggestionContent.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" onclick="addSuggestionToTextarea('${suggestion.text}')">
            <i class="${suggestion.icon}"></i>
            <span>${suggestion.text}</span>
        </div>
    `).join('');
}

function addSuggestionToTextarea(text) {
    const textarea = document.getElementById('reportDescription');
    const cursorPos = textarea.selectionStart;
    const textBefore = textarea.value.substring(0, cursorPos);
    const textAfter = textarea.value.substring(cursorPos);
    
    textarea.value = textBefore + text + textAfter;
    textarea.focus();
    textarea.setSelectionRange(cursorPos + text.length, cursorPos + text.length);
    
    // Trigger character counter update
    const event = new Event('input');
    textarea.dispatchEvent(event);
}

// File upload functionality
function initializeFileUpload() {
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('reportFiles');
    const fileList = document.getElementById('fileList');
    
    if (fileUploadArea && fileInput) {
        // Click to upload
        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        // Drag and drop
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.classList.add('dragover');
        });
        
        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.classList.remove('dragover');
        });
        
        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }
}

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (validateFile(file)) {
            addFileToList(file);
            uploadedFiles.push(file);
        }
    });
}

function validateFile(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (file.size > maxSize) {
        showNotification('حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت', 'error');
        return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
        showNotification('نوع الملف غير مدعوم', 'error');
        return false;
    }
    
    return true;
}

function addFileToList(file) {
    const fileList = document.getElementById('fileList');
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    const fileIcon = getFileIcon(file.type);
    
    fileItem.innerHTML = `
        <div class="file-item-info">
            <i class="file-item-icon ${fileIcon}"></i>
            <div>
                <div class="file-item-name">${file.name}</div>
                <div class="file-item-size">${fileSize} MB</div>
            </div>
        </div>
        <button class="file-item-remove" onclick="removeFile(this, '${file.name}')">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    fileList.appendChild(fileItem);
}

function getFileIcon(fileType) {
    const icons = {
        'image/jpeg': 'fas fa-image',
        'image/png': 'fas fa-image',
        'image/gif': 'fas fa-image',
        'application/pdf': 'fas fa-file-pdf',
        'application/msword': 'fas fa-file-word',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'fas fa-file-word'
    };
    
    return icons[fileType] || 'fas fa-file';
}

function removeFile(button, fileName) {
    const fileItem = button.parentElement;
    fileItem.remove();
    
    uploadedFiles = uploadedFiles.filter(file => file.name !== fileName);
}

// Textarea tools
function initializeTextareaTools() {
    const addDateBtn = document.getElementById('addDateBtn');
    const addTimeBtn = document.getElementById('addTimeBtn');
    const addLocationBtn = document.getElementById('addLocationBtn');
    
    if (addDateBtn) {
        addDateBtn.addEventListener('click', () => {
            const date = new Date().toLocaleDateString('ar-EG');
            insertAtCursor(`التاريخ: ${date}`);
        });
    }
    
    if (addTimeBtn) {
        addTimeBtn.addEventListener('click', () => {
            const time = new Date().toLocaleTimeString('ar-EG');
            insertAtCursor(`الوقت: ${time}`);
        });
    }
    
    if (addLocationBtn) {
        addLocationBtn.addEventListener('click', () => {
            insertAtCursor('الموقع: ');
        });
    }
}

function insertAtCursor(text) {
    const textarea = document.getElementById('reportDescription');
    const cursorPos = textarea.selectionStart;
    const textBefore = textarea.value.substring(0, cursorPos);
    const textAfter = textarea.value.substring(cursorPos);
    
    textarea.value = textBefore + text + textAfter;
    textarea.focus();
    textarea.setSelectionRange(cursorPos + text.length, cursorPos + text.length);
    
    // Trigger character counter update
    const event = new Event('input');
    textarea.dispatchEvent(event);
}

// Interactive status cards
function initializeInteractiveCards() {
    const cards = document.querySelectorAll('.status-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.card-expand-btn')) {
                const expandBtn = this.querySelector('.card-expand-btn');
                if (expandBtn) {
                    toggleCardDetails(expandBtn);
                }
            }
        });
    });
}

function toggleCardDetails(button) {
    const card = button.closest('.status-card');
    const details = card.querySelector('.card-details');
    const icon = button.querySelector('i');
    
    if (details.style.display === 'none' || !details.style.display) {
        details.style.display = 'block';
        button.classList.add('expanded');
        icon.className = 'fas fa-chevron-up';
        
        // Animate the details
        details.style.opacity = '0';
        details.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            details.style.transition = 'all 0.3s ease';
            details.style.opacity = '1';
            details.style.transform = 'translateY(0)';
        }, 10);
    } else {
        details.style.opacity = '0';
        details.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            details.style.display = 'none';
            button.classList.remove('expanded');
            icon.className = 'fas fa-chevron-down';
        }, 300);
    }
}

// Enhanced character counter with visual feedback
function initializeCharacterCounter() {
    const textarea = document.getElementById('reportDescription');
    const charCounter = document.getElementById('charCount');
    const charProgressFill = document.getElementById('charProgressFill');
    
    if (textarea && charCounter) {
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 1000;
            
            charCounter.textContent = currentLength;
            
            // Update progress bar with enhanced visual feedback
            if (charProgressFill) {
                const percentage = (currentLength / maxLength) * 100;
                charProgressFill.style.width = Math.min(percentage, 100) + '%';
                
                // Update progress bar color based on usage
                if (percentage > 90) {
                    charProgressFill.style.background = 'linear-gradient(90deg, #dc3545 0%, #c82333 100%)';
                } else if (percentage > 75) {
                    charProgressFill.style.background = 'linear-gradient(90deg, #ffc107 0%, #e0a800 100%)';
                } else {
                    charProgressFill.style.background = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)';
                }
            }
            
            // Update counter color and add visual feedback
            if (currentLength > maxLength * 0.9) {
                charCounter.style.color = '#dc3545';
                charCounter.style.fontWeight = 'bold';
                charCounter.style.animation = 'pulse 1s infinite';
            } else if (currentLength > maxLength * 0.8) {
                charCounter.style.color = '#ffc107';
                charCounter.style.fontWeight = '600';
                charCounter.style.animation = '';
    } else {
                charCounter.style.color = '#666';
                charCounter.style.fontWeight = 'normal';
                charCounter.style.animation = '';
            }
            
            // Limit text if exceeds max length
            if (currentLength > maxLength) {
                this.value = this.value.substring(0, maxLength);
                charCounter.textContent = maxLength;
                
                // Show notification
                showNotification('تم الوصول للحد الأقصى من الأحرف', 'error');
            }
        });
    }
}

// Enhanced textarea tools with visual feedback
function initializeTextareaTools() {
    const addDateBtn = document.getElementById('addDateBtn');
    const addTimeBtn = document.getElementById('addTimeBtn');
    const addLocationBtn = document.getElementById('addLocationBtn');
    
    if (addDateBtn) {
        addDateBtn.addEventListener('click', () => {
            const date = new Date().toLocaleDateString('ar-EG');
            insertAtCursor(`التاريخ: ${date}`);
            showToolFeedback(addDateBtn, 'تم إضافة التاريخ');
        });
    }
    
    if (addTimeBtn) {
        addTimeBtn.addEventListener('click', () => {
            const time = new Date().toLocaleTimeString('ar-EG');
            insertAtCursor(`الوقت: ${time}`);
            showToolFeedback(addTimeBtn, 'تم إضافة الوقت');
        });
    }
    
    if (addLocationBtn) {
        addLocationBtn.addEventListener('click', () => {
            insertAtCursor('الموقع: ');
            showToolFeedback(addLocationBtn, 'تم إضافة حقل الموقع');
        });
    }
}

function showToolFeedback(button, message) {
    // Add visual feedback
    button.style.transform = 'scale(1.2)';
    button.style.background = 'rgba(40, 167, 69, 0.2)';
    button.style.color = '#28a745';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        button.style.background = 'rgba(102, 126, 234, 0.1)';
        button.style.color = '#667eea';
    }, 300);
    
    // Show tooltip
    showNotification(message, 'success');
}

function insertAtCursor(text) {
    const textarea = document.getElementById('reportDescription');
    const cursorPos = textarea.selectionStart;
    const textBefore = textarea.value.substring(0, cursorPos);
    const textAfter = textarea.value.substring(cursorPos);
    
    textarea.value = textBefore + text + textAfter;
    textarea.focus();
    textarea.setSelectionRange(cursorPos + text.length, cursorPos + text.length);
    
    // Trigger character counter update
    const event = new Event('input');
    textarea.dispatchEvent(event);
}

// Enhanced file upload with better visual feedback
function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (validateFile(file)) {
            addFileToList(file);
            uploadedFiles.push(file);
            
            // Show success feedback
            showNotification(`تم رفع الملف: ${file.name}`, 'success');
        }
    });
}

function addFileToList(file) {
    const fileList = document.getElementById('fileList');
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    const fileIcon = getFileIcon(file.type);
    
    fileItem.innerHTML = `
        <div class="file-item-info">
            <i class="file-item-icon ${fileIcon}"></i>
            <div>
                <div class="file-item-name">${file.name}</div>
                <div class="file-item-size">${fileSize} MB</div>
            </div>
        </div>
        <button class="file-item-remove" onclick="removeFile(this, '${file.name}')">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    fileList.appendChild(fileItem);
    
    // Add entrance animation
    fileItem.style.opacity = '0';
    fileItem.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        fileItem.style.transition = 'all 0.3s ease';
        fileItem.style.opacity = '1';
        fileItem.style.transform = 'translateX(0)';
    }, 10);
}

function removeFile(button, fileName) {
    const fileItem = button.parentElement;
    
    // Add exit animation
    fileItem.style.opacity = '0';
    fileItem.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        fileItem.remove();
        uploadedFiles = uploadedFiles.filter(file => file.name !== fileName);
        showNotification(`تم حذف الملف: ${fileName}`, 'success');
    }, 300);
}

// Form summary generation
function initializeFormSummary() {
    const form = document.getElementById('reportingForm');
    
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('change', updateFormSummary);
            input.addEventListener('input', updateFormSummary);
        });
    }
}

function updateFormSummary() {
    const summaryContent = document.getElementById('summaryContent');
    if (!summaryContent) return;
    
    const reportType = document.getElementById('reportType');
    const reportDescription = document.getElementById('reportDescription');
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactPhone = document.getElementById('contactPhone');
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked');
    
    const summary = [];
    
    if (reportType && reportType.value) {
        summary.push({
            label: 'نوع المشكلة',
            value: reportType.options[reportType.selectedIndex].text
        });
    }
    
    if (reportDescription && reportDescription.value) {
        const preview = reportDescription.value.substring(0, 100) + (reportDescription.value.length > 100 ? '...' : '');
        summary.push({
            label: 'وصف المشكلة',
            value: preview
        });
    }
    
    if (contactName && contactName.value) {
        summary.push({
            label: 'الاسم',
            value: contactName.value
        });
    }
    
    if (contactEmail && contactEmail.value) {
        summary.push({
            label: 'البريد الإلكتروني',
            value: contactEmail.value
        });
    }
    
    if (contactPhone && contactPhone.value) {
        summary.push({
            label: 'رقم الهاتف',
            value: contactPhone.value
        });
    }
    
    if (contactMethod) {
        const methodText = contactMethod.value === 'email' ? 'البريد الإلكتروني' : 
                          contactMethod.value === 'phone' ? 'الهاتف' : 'كليهما';
        summary.push({
            label: 'طريقة التواصل',
            value: methodText
        });
    }
    
    if (uploadedFiles.length > 0) {
        summary.push({
            label: 'الملفات المرفقة',
            value: `${uploadedFiles.length} ملف`
        });
    }
    
    summaryContent.innerHTML = summary.map(item => `
        <div class="summary-item">
            <span class="summary-label">${item.label}:</span>
            <span class="summary-value">${item.value}</span>
        </div>
    `).join('');
}

// Enhanced form validation with visual feedback
function initializeFormValidation() {
    const form = document.getElementById('reportingForm');
    
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
            input.addEventListener('input', updateInputState);
            input.addEventListener('focus', handleInputFocus);
        });
    }
}

function handleInputFocus(event) {
    const field = event.target;
    const formGroup = field.closest('.form-group');
    
    if (formGroup) {
        formGroup.classList.add('focused');
    }
}

function updateInputState(event) {
    const field = event.target;
    const formGroup = field.closest('.form-group');
    
    if (formGroup) {
        // Remove previous states
        formGroup.classList.remove('valid', 'error', 'loading');
        field.classList.remove('valid', 'error');
        
        // Add valid state if field has content and is valid
        if (field.value.trim() && validateFieldValue(field)) {
            formGroup.classList.add('valid');
            field.classList.add('valid');
        }
    }
}

function validateFieldValue(field) {
    const fieldType = field.type;
    const value = field.value.trim();
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }
    
    // Phone validation
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
        return phoneRegex.test(value);
    }
    
    // Text validation (minimum length)
    if (fieldType === 'text' && value) {
        return value.length >= 2;
    }
    
    // Textarea validation
    if (field.tagName === 'TEXTAREA' && value) {
        return value.length >= 10;
    }
    
    // Select validation
    if (field.tagName === 'SELECT' && value) {
        return value !== '';
    }
    
    return true;
}

function validateField(event) {
    const field = event.target;
    const fieldId = field.id;
    const errorElement = document.getElementById(fieldId + 'Error');
    const formGroup = field.closest('.form-group');
    
    if (!errorElement) return;
    
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is required
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'هذا الحقل مطلوب';
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'يرجى إدخال رقم هاتف صحيح';
        }
    }
    
    // Description length validation
    if (fieldId === 'reportDescription') {
        if (field.value.trim().length < 10) {
            isValid = false;
            errorMessage = 'يرجى كتابة وصف مفصل (10 أحرف على الأقل)';
        }
    }
    
    // Update error display and visual states
    if (!isValid) {
        showFieldError(field, errorMessage);
        if (formGroup) {
            formGroup.classList.add('error');
            formGroup.classList.remove('valid');
        }
    } else {
        clearFieldError(field);
        if (formGroup) {
            formGroup.classList.remove('error');
            if (field.value.trim()) {
                formGroup.classList.add('valid');
            }
        }
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const fieldId = field.id;
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        field.classList.add('error');
        
        // Add shake animation
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }
}

function clearFieldError(field) {
    const fieldId = field.id;
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (errorElement) {
        errorElement.classList.remove('show');
        field.classList.remove('error');
    }
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = document.getElementById('submitReport');
    
    // Validate all fields
    const isValid = validateAllFields(form);
    
    if (!isValid) {
        showNotification('يرجى تصحيح الأخطاء في النموذج', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        showConfirmationModal(form);
    }, 2000);
}

// Validate all fields
function validateAllFields(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const fieldId = field.id;
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (!field.value.trim()) {
            isValid = false;
            if (errorElement) {
                errorElement.textContent = 'هذا الحقل مطلوب';
                errorElement.classList.add('show');
                field.classList.add('error');
            }
        }
    });
    
    return isValid;
}

// Show confirmation modal
function showConfirmationModal(form) {
    const modal = document.getElementById('confirmationModal');
    const reportType = document.getElementById('reportType');
    const reportDescription = document.getElementById('reportDescription');
    
    // Update modal content
    const modalReportType = document.getElementById('modalReportType');
    const modalReportDate = document.getElementById('modalReportDate');
    const reportNumber = document.getElementById('reportNumber');
    
    if (modalReportType && reportType) {
        modalReportType.textContent = reportType.options[reportType.selectedIndex].text;
    }
    
    if (modalReportDate) {
        const now = new Date();
        modalReportDate.textContent = now.toLocaleDateString('ar-EG');
    }
    
    if (reportNumber) {
        const randomId = Math.floor(Math.random() * 1000);
        reportNumber.textContent = `#RPT-2024-${randomId.toString().padStart(3, '0')}`;
    }
    
    // Show modal
    modal.style.display = 'block';
    
    // Add success notification
    showNotification('تم إرسال البلاغ بنجاح!', 'success');
}

// Close confirmation modal
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
    
    // Reset form
    resetForm();
}

// Reset form
function resetForm() {
    const form = document.getElementById('reportingForm');
    if (form) {
        form.reset();
        
        // Clear all errors
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(error => {
            error.classList.remove('show');
        });
        
        // Clear input errors
        const inputs = document.querySelectorAll('.modern-input, .modern-textarea, .modern-dropdown');
        inputs.forEach(input => {
            input.classList.remove('error');
        });
        
        // Reset character counter
        const charCounter = document.getElementById('charCount');
        const charProgressFill = document.getElementById('charProgressFill');
        if (charCounter) {
            charCounter.textContent = '0';
            charCounter.style.color = '#666';
        }
        if (charProgressFill) {
            charProgressFill.style.width = '0%';
        }
        
        // Reset file upload
        const fileList = document.getElementById('fileList');
        if (fileList) {
            fileList.innerHTML = '';
        }
        uploadedFiles = [];
        
        // Reset to first step
        currentStep = 1;
        showStep(1);
        updateProgress();
        
        // Hide smart suggestions
        const smartSuggestions = document.getElementById('smartSuggestions');
        if (smartSuggestions) {
            smartSuggestions.style.display = 'none';
        }
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageElement = notification.querySelector('.notification-message');
    const iconElement = notification.querySelector('.notification-icon');
    
    // Set message and icon
    messageElement.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
        iconElement.className = 'notification-icon fas fa-check-circle';
        notification.classList.add('success');
        notification.classList.remove('error');
    } else {
        iconElement.className = 'notification-icon fas fa-exclamation-circle';
        notification.classList.add('error');
        notification.classList.remove('success');
    }
    
    // Show notification
    notification.style.display = 'flex';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

// Hide notification
function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}

// Initialize mobile navigation
function initializeMobileNavigation() {
    // const hamburger = document.getElementById('hamburger'); // Handled by shared navigation
    const navMenu = document.getElementById('nav-menu');
    
    // if (hamburger && navMenu) {
    //     hamburger.addEventListener('click', () => {
    // navMenu.classList.toggle('active');
    // hamburger.classList.toggle('active');
    //     });
    //     
    //     // Close menu when clicking on links
    // const navLinks = document.querySelectorAll('.nav-link');
    // navLinks.forEach(link => {
    //     link.addEventListener('click', () => {
    //             navMenu.classList.remove('active');
    //             hamburger.classList.remove('active');
    //         });
    //     });
    // } // Handled by shared navigation
}

// Initialize theme toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            // Update icon
            const icon = themeToggle.querySelector('i');
            if (isDarkMode) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
        
        // Load saved preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            const icon = themeToggle.querySelector('i');
            icon.className = 'fas fa-sun';
        }
    }
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
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
}

// Initialize fade-in animations
function initializeFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced form validation with visual feedback
function enhanceFormValidation() {
    const form = document.getElementById('reportingForm');
    
    if (form) {
        // Add visual feedback for valid fields
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() && !this.classList.contains('error')) {
                    this.classList.add('valid');
                } else {
                    this.classList.remove('valid');
                }
    });
});
    }
}

// Add parallax effect to header
function addParallaxEffect() {
    const header = document.querySelector('.page-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            header.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    enhanceFormValidation();
    addParallaxEffect();
});

// Export functions for global access
window.showNotification = showNotification;
window.hideNotification = hideNotification;
window.closeConfirmationModal = closeConfirmationModal;
window.resetForm = resetForm;
window.toggleCardDetails = toggleCardDetails;

// Status filtering functionality
function initializeStatusFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const statusCards = document.querySelectorAll('.status-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            filterStatusCards(filter);
        });
    });
}

function filterStatusCards(filter) {
    const statusCards = document.querySelectorAll('.status-card');
    
    statusCards.forEach(card => {
        const status = card.getAttribute('data-status');
        
        if (filter === 'all' || status === filter) {
            card.classList.remove('hidden');
            card.classList.add('visible');
            
            // Add entrance animation
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
        }
    });
    
    // Update statistics
    updateFilteredStatistics(filter);
}

function updateFilteredStatistics(filter) {
    const totalCards = document.querySelectorAll('.status-card').length;
    const visibleCards = document.querySelectorAll('.status-card.visible').length;
    
    // Update total reports count
    const totalReportsElement = document.getElementById('totalReports');
    if (totalReportsElement) {
        totalReportsElement.textContent = filter === 'all' ? totalCards : visibleCards;
    }
    
    // Animate the number change
    animateNumberChange(totalReportsElement, filter === 'all' ? totalCards : visibleCards);
}

// Help accordion functionality
function initializeHelpAccordion() {
    const helpItems = document.querySelectorAll('.help-item');
    
    helpItems.forEach(item => {
        const question = item.querySelector('.help-question');
        const answer = item.querySelector('.help-answer');
        
        // Add click event
        question.addEventListener('click', function() {
            toggleHelpItem(this);
        });
        
        // Add keyboard support
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleHelpItem(this);
            }
        });
    });
}

function toggleHelpItem(questionElement) {
    const helpItem = questionElement.closest('.help-item');
    const answer = helpItem.querySelector('.help-answer');
    const icon = questionElement.querySelector('i');
    
    // Close other open items
    const otherItems = document.querySelectorAll('.help-item.active');
    otherItems.forEach(item => {
        if (item !== helpItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.help-answer');
            const otherIcon = item.querySelector('.help-question i');
            otherAnswer.style.maxHeight = '0';
            otherIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current item
    if (helpItem.classList.contains('active')) {
        helpItem.classList.remove('active');
        answer.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
    } else {
        helpItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
        
        // Add entrance animation for answer
        answer.style.opacity = '0';
        setTimeout(() => {
            answer.style.transition = 'opacity 0.3s ease';
            answer.style.opacity = '1';
        }, 10);
    }
}

// Analytics functionality
function initializeAnalytics() {
    const analyticsNumbers = document.querySelectorAll('.analytics-number');
    
    analyticsNumbers.forEach(number => {
        const target = parseFloat(number.textContent);
        animateNumberChange(number, target);
    });
}

function animateNumberChange(element, target) {
    const current = parseFloat(element.textContent);
    const increment = (target - current) / 20;
    let currentValue = current;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if ((increment > 0 && currentValue >= target) || 
            (increment < 0 && currentValue <= target)) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue * 10) / 10;
        }
    }, 50);
}

// AI Suggestions functionality
function initializeAISuggestions() {
    // Show AI panel after form interaction
    const form = document.getElementById('reportingForm');
    if (form) {
        form.addEventListener('input', function() {
            setTimeout(() => {
                generateAISuggestions();
            }, 2000);
        });
    }
}

function generateAISuggestions() {
    const reportType = document.getElementById('reportType');
    const reportDescription = document.getElementById('reportDescription');
    
    if (reportType.value && reportDescription.value.length > 50) {
        const suggestions = getAISuggestions(reportType.value, reportDescription.value);
        showAIPanel(suggestions);
    }
}

function getAISuggestions(reportType, description) {
    const suggestions = {
        'noDelivery': [
            {
                title: 'إضافة تفاصيل أكثر',
                content: 'يمكنك إضافة تفاصيل أكثر عن المشروع المتفق عليه والتواريخ المحددة'
            },
            {
                title: 'إرفاق المراسلات',
                content: 'يفضل إرفاق نسخ من المراسلات مع المطور لتوضيح المشكلة'
            }
        ],
        'abusiveContent': [
            {
                title: 'تحديد المحتوى المسيء',
                content: 'يرجى تحديد نوع المحتوى المسيء بالضبط (عنف، تحرش، إلخ)'
            },
            {
                title: 'إضافة روابط',
                content: 'يمكنك إضافة روابط مباشرة للمحتوى المسيء إن أمكن'
            }
        ],
        'fraud': [
            {
                title: 'تفاصيل مالية',
                content: 'يرجى إضافة تفاصيل المبالغ المطلوبة وطرق الدفع'
            },
            {
                title: 'إرفاق الأدلة',
                content: 'يفضل إرفاق لقطات شاشة أو رسائل الاحتيال'
            }
        ]
    };
    
    return suggestions[reportType] || [
        {
            title: 'تحسين الوصف',
            content: 'يمكنك إضافة المزيد من التفاصيل لمساعدة فريق التحقيق'
        }
    ];
}

function showAIPanel(suggestions) {
    const panel = document.getElementById('aiSuggestionsPanel');
    const content = document.getElementById('aiSuggestionsContent');
    
    if (panel && content) {
        content.innerHTML = suggestions.map(suggestion => `
            <div class="ai-suggestion-item" onclick="applySuggestion('${suggestion.title}')">
                <h5>${suggestion.title}</h5>
                <p>${suggestion.content}</p>
            </div>
        `).join('');
        
        panel.style.display = 'block';
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            hideAIPanel();
        }, 10000);
    }
}

function hideAIPanel() {
    const panel = document.getElementById('aiSuggestionsPanel');
    if (panel) {
        panel.style.display = 'none';
    }
}

function toggleAIPanel() {
    const panel = document.getElementById('aiSuggestionsPanel');
    if (panel.style.display === 'none') {
        showAIPanel([]);
    } else {
        hideAIPanel();
    }
}

function applySuggestion(suggestionTitle) {
    // Apply suggestion based on title
    const textarea = document.getElementById('reportDescription');
    if (textarea) {
        const currentText = textarea.value;
        const enhancedText = currentText + '\n\n' + suggestionTitle + ': ';
        textarea.value = enhancedText;
        textarea.focus();
        textarea.setSelectionRange(enhancedText.length, enhancedText.length);
        
        // Trigger character counter update
        const event = new Event('input');
        textarea.dispatchEvent(event);
    }
    
    hideAIPanel();
    showNotification('تم تطبيق الاقتراح بنجاح', 'success');
}

// File Management functionality
function initializeFileManagement() {
    // Show file management section when files are uploaded
    const fileInput = document.getElementById('reportFiles');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                showFileManagement();
            }
        });
    }
}

function showFileManagement() {
    const section = document.getElementById('fileManagementSection');
    if (section) {
        section.style.display = 'block';
        organizeFiles();
    }
}

function organizeFiles() {
    const imageFiles = document.getElementById('imageFiles');
    const documentFiles = document.getElementById('documentFiles');
    const otherFiles = document.getElementById('otherFiles');
    
    if (imageFiles && documentFiles && otherFiles) {
        // Clear existing content
        imageFiles.innerHTML = '';
        documentFiles.innerHTML = '';
        otherFiles.innerHTML = '';
        
        uploadedFiles.forEach(file => {
            const fileItem = createFileItem(file);
            
            if (file.type.startsWith('image/')) {
                imageFiles.appendChild(fileItem);
            } else if (file.type.includes('pdf') || file.type.includes('word')) {
                documentFiles.appendChild(fileItem);
            } else {
                otherFiles.appendChild(fileItem);
            }
        });
    }
}

function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    const fileIcon = getFileIcon(file.type);
    
    fileItem.innerHTML = `
        <div class="file-item-info">
            <i class="file-item-icon ${fileIcon}"></i>
            <div>
                <div class="file-item-name">${file.name}</div>
                <div class="file-item-size">${fileSize} MB</div>
            </div>
        </div>
        <button class="file-item-remove" onclick="removeFile(this, '${file.name}')">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    return fileItem;
}

// Real-time updates functionality
function initializeRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
        updateRandomStatistics();
    }, 30000);
    
    // Update status cards periodically
    setInterval(() => {
        updateStatusCardProgress();
    }, 15000);
}

function updateRandomStatistics() {
    const analyticsCards = document.querySelectorAll('.analytics-card');
    const randomCard = analyticsCards[Math.floor(Math.random() * analyticsCards.length)];
    const analyticsNumber = randomCard.querySelector('.analytics-number');
    
    if (analyticsNumber) {
        const currentValue = parseFloat(analyticsNumber.textContent);
        const newValue = currentValue + (Math.random() * 0.2 - 0.1); // +/- 0.1
        
        if (newValue >= 0) {
            animateNumberChange(analyticsNumber, newValue);
            
            // Add visual feedback
            randomCard.style.transform = 'scale(1.05)';
            setTimeout(() => {
                randomCard.style.transform = 'scale(1)';
            }, 300);
        }
    }
}

function updateStatusCardProgress() {
    const progressBars = document.querySelectorAll('.progress-fill-small');
    
    progressBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width) || 0;
        const newWidth = Math.min(currentWidth + Math.floor(Math.random() * 10), 100);
        
        if (newWidth > currentWidth) {
            bar.style.width = newWidth + '%';
            
            // Update progress text
            const progressText = bar.closest('.progress-indicator').querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = newWidth + '%';
            }
            
            // Add visual feedback
            bar.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                bar.style.animation = '';
            }, 500);
        }
    });
}

// Enhanced form validation with real-time feedback
function enhanceFormValidation() {
    const form = document.getElementById('reportingForm');
    
    if (form) {
        // Add real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateFieldRealTime(this);
            });
            
            input.addEventListener('blur', function() {
                validateFieldOnBlur(this);
            });
        });
    }
}

function validateFieldRealTime(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = document.getElementById(field.id + 'Error');
    
    // Remove previous states
    formGroup.classList.remove('valid', 'error', 'loading');
    field.classList.remove('valid', 'error');
    
    // Add loading state
    formGroup.classList.add('loading');
    
    // Simulate validation delay
    setTimeout(() => {
        formGroup.classList.remove('loading');
        
        if (field.value.trim() && validateFieldValue(field)) {
            formGroup.classList.add('valid');
            field.classList.add('valid');
            
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        } else if (field.hasAttribute('required') && !field.value.trim()) {
            formGroup.classList.add('error');
            field.classList.add('error');
            
            if (errorElement) {
                errorElement.textContent = 'هذا الحقل مطلوب';
                errorElement.classList.add('show');
            }
        }
    }, 500);
}

function validateFieldOnBlur(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = document.getElementById(field.id + 'Error');
    
    // Remove loading state
    formGroup.classList.remove('loading');
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        formGroup.classList.add('error');
        field.classList.add('error');
        
        if (errorElement) {
            errorElement.textContent = 'هذا الحقل مطلوب';
            errorElement.classList.add('show');
        }
    } else if (field.value.trim() && validateFieldValue(field)) {
        formGroup.classList.add('valid');
        field.classList.add('valid');
        
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
}

// Enhanced notification system
function showNotification(message, type = 'success', duration = 5000) {
    const notification = document.getElementById('notification');
    const messageElement = notification.querySelector('.notification-message');
    const iconElement = notification.querySelector('.notification-icon');
    
    // Set message and icon
    messageElement.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
        iconElement.className = 'notification-icon fas fa-check-circle';
        notification.classList.add('success');
        notification.classList.remove('error', 'warning');
    } else if (type === 'error') {
        iconElement.className = 'notification-icon fas fa-exclamation-circle';
        notification.classList.add('error');
        notification.classList.remove('success', 'warning');
    } else if (type === 'warning') {
        iconElement.className = 'notification-icon fas fa-exclamation-triangle';
        notification.classList.add('warning');
        notification.classList.remove('success', 'error');
    }
    
    // Show notification with entrance animation
    notification.style.display = 'flex';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
        notification.style.transition = 'all 0.3s ease';
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto hide after duration
    setTimeout(() => {
        hideNotification();
    }, duration);
}

// Export additional functions for global access
window.showNotification = showNotification;
window.hideNotification = hideNotification;
window.closeConfirmationModal = closeConfirmationModal;
window.resetForm = resetForm;
window.toggleCardDetails = toggleCardDetails;
window.toggleHelpItem = toggleHelpItem;
window.filterStatusCards = filterStatusCards;
window.animateNumberChange = animateNumberChange;
window.removeFile = removeFile;
window.toggleAIPanel = toggleAIPanel;
window.applySuggestion = applySuggestion;