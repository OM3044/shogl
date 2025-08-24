// DOM Elements
const onboardingForm = document.getElementById('onboardingForm');
const phoneNumberInput = document.getElementById('phoneNumber');
const otpSection = document.getElementById('otpSection');
const otpCodeInput = document.getElementById('otpCode');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const timerElement = document.getElementById('timer');
const timerTextElement = document.getElementById('timerText');
const resendOtpBtn = document.getElementById('resendOtp');

// State variables
let isOtpSent = false;
let timerInterval;
let countdown = 120; // 2 minutes

// Phone number validation
function validatePhoneNumber(phone) {
    const phoneRegex = /^1[0-2,5]\d{8}$/;
    return phoneRegex.test(phone);
}

// Format phone number for display
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

// Show loading state
function showLoading() {
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled = true;
}

// Hide loading state
function hideLoading() {
    btnText.style.display = 'block';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
}

// Start countdown timer
function startTimer() {
    countdown = 120;
    resendOtpBtn.disabled = true;
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (countdown <= 0) {
            clearInterval(timerInterval);
            timerTextElement.textContent = 'يمكنك إعادة إرسال الرمز الآن';
            resendOtpBtn.disabled = false;
        }
        
        countdown--;
    }, 1000);
}

// Simulate OTP sending
function sendOTP(phoneNumber) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate API call
            console.log(`OTP sent to ${phoneNumber}`);
            resolve('1234'); // Simulated OTP code
        }, 2000);
    });
}

// Simulate OTP verification
function verifyOTP(otp) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate API verification
            const isValid = otp === '1234';
            resolve(isValid);
        }, 1500);
    });
}

// Show success message and redirect
function showSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: #28a745; margin-bottom: 15px;"></i>
            <h3 style="color: #28a745; margin-bottom: 10px;">تم إنشاء الحساب بنجاح!</h3>
            <p style="color: #666;">سيتم توجيهك إلى الصفحة الرئيسية خلال لحظات...</p>
        </div>
    `;
    
    onboardingForm.innerHTML = '';
    onboardingForm.appendChild(successMessage);
    
    // Redirect to main page after 3 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

// Handle form submission
onboardingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const phoneNumber = phoneNumberInput.value.trim();
    
    if (!validatePhoneNumber(phoneNumber)) {
        showError('يرجى إدخال رقم هاتف مصري صحيح (11 أرقام)');
        return;
    }
    
    if (!isOtpSent) {
        // First submission - send OTP
        await handleSendOTP(phoneNumber);
    } else {
        // Second submission - verify OTP
        await handleVerifyOTP();
    }
});

// Handle OTP sending
async function handleSendOTP(phoneNumber) {
    try {
        showLoading();
        btnText.textContent = 'جاري إرسال الرمز...';
        
        const otp = await sendOTP(phoneNumber);
        
        // Show OTP section
        otpSection.style.display = 'block';
        otpCodeInput.focus();
        
        // Update form state
        isOtpSent = true;
        btnText.textContent = 'تحقق من الرمز';
        
        // Start timer
        startTimer();
        
        // Show success message
        showMessage('تم إرسال رمز التحقق إلى هاتفك', 'success');
        
    } catch (error) {
        showError('حدث خطأ في إرسال الرمز. يرجى المحاولة مرة أخرى.');
    } finally {
        hideLoading();
    }
}

// Handle OTP verification
async function handleVerifyOTP() {
    const otpCode = otpCodeInput.value.trim();
    
    if (otpCode.length !== 4) {
        showError('يرجى إدخال رمز التحقق المكون من 4 أرقام');
        return;
    }
    
    try {
        showLoading();
        btnText.textContent = 'جاري التحقق...';
        
        const isValid = await verifyOTP(otpCode);
        
        if (isValid) {
            // Store user data in localStorage
            const userData = {
                phoneNumber: phoneNumberInput.value.trim(),
                isVerified: true,
                createdAt: new Date().toISOString()
            };
            localStorage.setItem('shoglakUser', JSON.stringify(userData));
            
            showSuccess();
        } else {
            showError('رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.');
            otpCodeInput.value = '';
            otpCodeInput.focus();
        }
        
    } catch (error) {
        showError('حدث خطأ في التحقق من الرمز. يرجى المحاولة مرة أخرى.');
    } finally {
        hideLoading();
    }
}

// Handle resend OTP
resendOtpBtn.addEventListener('click', async () => {
    const phoneNumber = phoneNumberInput.value.trim();
    
    if (!validatePhoneNumber(phoneNumber)) {
        showError('يرجى إدخال رقم هاتف صحيح');
        return;
    }
    
    try {
        resendOtpBtn.disabled = true;
        resendOtpBtn.textContent = 'جاري الإرسال...';
        
        await sendOTP(phoneNumber);
        
        // Reset OTP input
        otpCodeInput.value = '';
        otpCodeInput.focus();
        
        // Restart timer
        startTimer();
        
        showMessage('تم إعادة إرسال رمز التحقق', 'success');
        
    } catch (error) {
        showError('حدث خطأ في إعادة إرسال الرمز');
    }
});

// Auto-focus next OTP input field
otpCodeInput.addEventListener('input', (e) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
        e.target.value = value.replace(/\D/g, '');
        return;
    }
    
    // Auto-submit when 4 digits are entered
    if (value.length === 4) {
        onboardingForm.dispatchEvent(new Event('submit'));
    }
});

// Show error message
function showError(message) {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 1px solid #f5c6cb;
        font-size: 0.9rem;
    `;
    errorDiv.textContent = message;
    
    onboardingForm.insertBefore(errorDiv, onboardingForm.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Show success/info message
function showMessage(message, type = 'info') {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    const bgColor = type === 'success' ? '#d4edda' : '#d1ecf1';
    const textColor = type === 'success' ? '#155724' : '#0c5460';
    const borderColor = type === 'success' ? '#c3e6cb' : '#bee5eb';
    
    messageDiv.style.cssText = `
        background: ${bgColor};
        color: ${textColor};
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 1px solid ${borderColor};
        font-size: 0.9rem;
    `;
    messageDiv.textContent = message;
    
    onboardingForm.insertBefore(messageDiv, onboardingForm.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Phone number input formatting
phoneNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    
    e.target.value = value;
});

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('shoglakUser');
    if (userData) {
        const user = JSON.parse(userData);
        if (user.isVerified) {
            // User is already logged in, redirect to main page
            window.location.href = 'index.html';
        }
    }
});

// Add some CSS for messages
const style = document.createElement('style');
style.textContent = `
    .error-message, .message {
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .success-message {
        animation: fadeIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 