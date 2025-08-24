// DOM Elements
const editProfileBtn = document.getElementById('editProfileBtn');
const profileStars = document.getElementById('profileStars');
const verificationModal = document.getElementById('verificationModal');
const closeVerificationModalBtn = document.getElementById('closeVerificationModal');
const prevStepBtn = document.getElementById('prevStepBtn');
const nextStepBtn = document.getElementById('nextStepBtn');
const submitVerificationBtn = document.getElementById('submitVerificationBtn');
const idUpload = document.getElementById('idUpload');
const photoUpload = document.getElementById('photoUpload');
const themeToggle = document.getElementById('themeToggle');
// const hamburger = document.getElementById('hamburger'); // Handled by shared navigation
const navMenu = document.getElementById('nav-menu');

// User Type Selector Functionality
function initializeUserTypeSelector() {
    const freelancerBtn = document.getElementById('freelancerBtn');
    const clientBtn = document.getElementById('clientBtn');
    const userTypeBadge = document.getElementById('userTypeBadge');
    
    if (freelancerBtn && clientBtn) {
        // Set default user type
        let currentUserType = localStorage.getItem('userType') || 'freelancer';
        setUserType(currentUserType);
        
        // Add event listeners
        freelancerBtn.addEventListener('click', () => setUserType('freelancer'));
        clientBtn.addEventListener('click', () => setUserType('client'));
    }
}

function setUserType(userType) {
    const freelancerBtn = document.getElementById('freelancerBtn');
    const clientBtn = document.getElementById('clientBtn');
    const userTypeBadge = document.getElementById('userTypeBadge');
    const body = document.body;
    
    if (freelancerBtn && clientBtn) {
        // Update button states
        freelancerBtn.classList.toggle('active', userType === 'freelancer');
        clientBtn.classList.toggle('active', userType === 'client');
    }
    
    // Update body class
    body.classList.toggle('client-mode', userType === 'client');
    
    // Update badge
    updateUserTypeBadge(userType);
    
    // Save to localStorage
    localStorage.setItem('userType', userType);
    
    // Show notification
    const message = userType === 'freelancer' ? 
        'تم التبديل إلى وضع المستقل - عرض جميع الميزات' : 
        'تم التبديل إلى وضع العميل - عرض المنشورات والتقييمات فقط';
    showNotification(message, 'info');
}

function updateUserTypeBadge(userType) {
    const userTypeBadge = document.getElementById('userTypeBadge');
    
    if (userTypeBadge) {
        if (userType === 'freelancer') {
            userTypeBadge.innerHTML = `
                <i class="fas fa-user-tie"></i>
                <span>مستقل</span>
            `;
        } else {
            userTypeBadge.innerHTML = `
                <i class="fas fa-user-check"></i>
                <span>عميل</span>
            `;
        }
    }
}

// Profile data storage
let profileData = {
    name: 'أحمد محمد سعيد',
    title: 'مطور ويب ومطور تطبيقات جوال',
    email: 'ahmed.mohamed@example.com',
    phone: '+966501234567',
    location: 'riyadh',
    experience: '3-5',
    bio: 'مطور ويب متخصص في تطوير التطبيقات الحديثة باستخدام أحدث التقنيات. أعمل على تطوير حلول مبتكرة وفعالة للشركات والأفراد.',
    hourlyRate: 150,
    website: 'https://ahmed-portfolio.com',
    skills: [
        { name: 'React.js', level: 'expert' },
        { name: 'Node.js', level: 'advanced' },
        { name: 'MongoDB', level: 'advanced' }
    ],
    socialLinks: {
        linkedin: 'https://linkedin.com/in/ahmed-saeed',
        github: 'https://github.com/ahmed-saeed',
        behance: '',
        dribbble: ''
    },
    privacy: {
        showEmail: true,
        showPhone: true,
        allowDirectMessages: true,
        emailNotifications: true,
        profileVisibility: 'public' // public, private, friends
    },
    avatar: null
};

// Load profile data from localStorage on page load
function loadProfileData() {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
        profileData = { ...profileData, ...JSON.parse(savedData) };
        updateProfileDisplay();
        // Load data into form fields when available
        setTimeout(loadDataIntoForm, 100);
    }
}

// Load profile data into form fields
function loadDataIntoForm() {
    const profileNameInput = document.getElementById('profileName');
    const profileTitleInput = document.getElementById('profileTitle');
    const profileBioInput = document.getElementById('profileBio');
    const profileLocationInput = document.getElementById('profileLocation');
    const profileHourlyRateInput = document.getElementById('profileHourlyRate');
    const profileWebsiteInput = document.getElementById('profileWebsite');
    const profileExperienceInput = document.getElementById('profileExperience');
    
    if (profileNameInput && profileData.name) profileNameInput.value = profileData.name;
    if (profileTitleInput && profileData.title) profileTitleInput.value = profileData.title;
    if (profileBioInput && profileData.bio) profileBioInput.value = profileData.bio;
    if (profileLocationInput && profileData.location) profileLocationInput.value = profileData.location;
    if (profileHourlyRateInput && profileData.hourlyRate) profileHourlyRateInput.value = profileData.hourlyRate;
    if (profileWebsiteInput && profileData.website) profileWebsiteInput.value = profileData.website;
    if (profileExperienceInput && profileData.experience) profileExperienceInput.value = profileData.experience;
}

// Initialize real-time profile saving
function initializeRealTimeProfileSaving() {
    const formFields = [
        'profileName',
        'profileTitle', 
        'profileBio',
        'profileLocation',
        'profileHourlyRate',
        'profileWebsite',
        'profileExperience'
    ];
    
    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            // Add input event listener for real-time saving
            field.addEventListener('input', debounce(() => {
                saveProfileDataRealTime(fieldId, field.value);
            }, 500));
            
            // Add change event listener for immediate saving on select/blur
            field.addEventListener('change', () => {
                saveProfileDataRealTime(fieldId, field.value);
            });
        }
    });
}

// Save profile data in real-time
function saveProfileDataRealTime(fieldId, value) {
    const fieldMap = {
        'profileName': 'name',
        'profileTitle': 'title',
        'profileBio': 'bio', 
        'profileLocation': 'location',
        'profileHourlyRate': 'hourlyRate',
        'profileWebsite': 'website',
        'profileExperience': 'experience'
    };
    
    const profileKey = fieldMap[fieldId];
    if (profileKey) {
        // Update profile data object
        if (fieldId === 'profileHourlyRate') {
            profileData[profileKey] = parseInt(value) || 0;
        } else {
            profileData[profileKey] = value.trim();
        }
        
        // Save to localStorage
        saveProfileData();
        
        // Update display immediately
        updateProfileDisplay();
        
        // Show subtle notification
        showNotification('تم حفظ التغييرات تلقائياً', 'success', 2000);
    }
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Save profile data to localStorage
function saveProfileData() {
    localStorage.setItem('profileData', JSON.stringify(profileData));
    // Don't show notification here as it's called from other functions that show their own notifications
}

// Update profile display with current data
function updateProfileDisplay() {
    // Update basic info
    const profileNameElement = document.getElementById('profileName');
    if (profileNameElement) {
        profileNameElement.textContent = profileData.name;
    }
    
    // Update contact info if elements exist
    const phoneDisplay = document.getElementById('phoneDisplay');
    const emailDisplay = document.getElementById('emailDisplay');
    if (phoneDisplay) phoneDisplay.textContent = profileData.phone;
    if (emailDisplay) emailDisplay.textContent = profileData.email;
    
    // Update form fields in edit modal
    const profileNameInput = document.querySelector('#editProfileModal #profileName');
    const profileTitleInput = document.querySelector('#editProfileModal #profileTitle');
    const profileEmailInput = document.querySelector('#editProfileModal #profileEmail');
    const profilePhoneInput = document.querySelector('#editProfileModal #profilePhone');
    const profileLocationInput = document.querySelector('#editProfileModal #profileLocation');
    const profileExperienceInput = document.querySelector('#editProfileModal #profileExperience');
    const profileBioInput = document.querySelector('#editProfileModal #profileBio');
    const profileHourlyRateInput = document.querySelector('#editProfileModal #profileHourlyRate');
    const profileWebsiteInput = document.querySelector('#editProfileModal #profileWebsite');
    
    if (profileNameInput) profileNameInput.value = profileData.name;
    if (profileTitleInput) profileTitleInput.value = profileData.title;
    if (profileEmailInput) profileEmailInput.value = profileData.email;
    if (profilePhoneInput) profilePhoneInput.value = profileData.phone;
    if (profileLocationInput) profileLocationInput.value = profileData.location;
    if (profileExperienceInput) profileExperienceInput.value = profileData.experience;
    if (profileBioInput) profileBioInput.value = profileData.bio;
    if (profileHourlyRateInput) profileHourlyRateInput.value = profileData.hourlyRate;
    if (profileWebsiteInput) profileWebsiteInput.value = profileData.website;
    
    // Update social links
    const linkedinInput = document.querySelector('#editProfileModal #linkedinUrl');
    const githubInput = document.querySelector('#editProfileModal #githubUrl');
    const behanceInput = document.querySelector('#editProfileModal #behanceUrl');
    const dribbbleInput = document.querySelector('#editProfileModal #dribbbleUrl');
    
    if (linkedinInput) linkedinInput.value = profileData.socialLinks.linkedin;
    if (githubInput) githubInput.value = profileData.socialLinks.github;
    if (behanceInput) behanceInput.value = profileData.socialLinks.behance;
    if (dribbbleInput) dribbbleInput.value = profileData.socialLinks.dribbble;
    
    // Update privacy settings
    const showEmailCheck = document.querySelector('#editProfileModal #showEmail');
    const showPhoneCheck = document.querySelector('#editProfileModal #showPhone');
    const allowDirectMessagesCheck = document.querySelector('#editProfileModal #allowDirectMessages');
    const emailNotificationsCheck = document.querySelector('#editProfileModal #emailNotifications');
    
    if (showEmailCheck) showEmailCheck.checked = profileData.privacy.showEmail;
    if (showPhoneCheck) showPhoneCheck.checked = profileData.privacy.showPhone;
    if (allowDirectMessagesCheck) allowDirectMessagesCheck.checked = profileData.privacy.allowDirectMessages;
    if (emailNotificationsCheck) emailNotificationsCheck.checked = profileData.privacy.emailNotifications;
    
    // Update skills display
    updateSkillsDisplay();
    
    // Update avatar if exists
    if (profileData.avatar) {
        const profileAvatar = document.querySelector('.profile-avatar');
        if (profileAvatar) {
            profileAvatar.innerHTML = `<img src="${profileData.avatar}" alt="Profile Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        }
    }
}

// Enhanced Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Add transition effect
    themeToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
}

// Enhanced Profile Editing - Main Profile
function toggleEditProfile() {
    const btnText = editProfileBtn.querySelector('.btn-text');
    const btnLoading = editProfileBtn.querySelector('.btn-loading');
    const isEditing = editProfileBtn.classList.contains('editing');
    
    if (isEditing) {
        // Save profile changes
        saveProfileChanges();
        editProfileBtn.classList.remove('editing');
        btnText.innerHTML = '<i class="fas fa-edit"></i> تعديل الملف الشخصي';
        btnText.style.display = 'flex';
        btnLoading.style.display = 'none';
        editProfileBtn.disabled = false;
    } else {
        // Enter edit mode
        enterProfileEditMode();
        editProfileBtn.classList.add('editing');
        btnText.innerHTML = '<i class="fas fa-save"></i> حفظ التغييرات';
        btnText.style.display = 'flex';
        btnLoading.style.display = 'none';
    }
}

function enterProfileEditMode() {
    // Make profile name editable
    const profileName = document.getElementById('profileName');
    const currentName = profileName.textContent;
    
    // Create input for profile name
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = currentName;
    nameInput.className = 'profile-name-input';
    nameInput.style.cssText = `
        font-size: 2rem;
        font-weight: 700;
        background: transparent;
        border: 2px solid var(--primary-color);
        border-radius: 8px;
        padding: 8px 16px;
        color: var(--light-text);
        font-family: 'Cairo', sans-serif;
        text-align: center;
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        display: block;
    `;
    
    if (document.body.classList.contains('dark-mode')) {
        nameInput.style.color = 'var(--dark-text)';
    }
    
    // Replace name with input
    profileName.style.display = 'none';
    profileName.parentNode.insertBefore(nameInput, profileName);
    nameInput.focus();
    
    // Make avatar clickable for upload
    const profileAvatar = document.querySelector('.profile-avatar');
    profileAvatar.style.cursor = 'pointer';
    profileAvatar.onclick = () => uploadProfileAvatar();
    
    // Add visual indicators
    document.querySelectorAll('.profile-card').forEach(card => {
        card.style.border = '2px solid var(--primary-color)';
    });
    
    showNotification('يمكنك الآن تعديل اسم الملف الشخصي والصورة', 'success');
}

function saveProfileChanges() {
    // Save profile name
    const nameInput = document.querySelector('.profile-name-input');
    const profileName = document.getElementById('profileName');
    
    if (nameInput) {
        profileName.textContent = nameInput.value;
        profileName.style.display = 'block';
        nameInput.remove();
    }
    
    // Reset avatar
    const profileAvatar = document.querySelector('.profile-avatar');
    profileAvatar.style.cursor = 'default';
    profileAvatar.onclick = null;
    
    // Remove visual indicators
    document.querySelectorAll('.profile-card').forEach(card => {
        card.style.border = '';
    });
    
    showNotification('تم حفظ تغييرات الملف الشخصي بنجاح!', 'success');
}

function uploadProfileAvatar() {
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const profileAvatar = document.querySelector('.profile-avatar');
                profileAvatar.innerHTML = `<img src="${e.target.result}" alt="Profile Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
                
                showNotification('تم تحديث الصورة الشخصية بنجاح!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

// Enhanced Verification Modal
let currentStep = 1;
const totalSteps = 3;

function showVerificationModal() {
    verificationModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    currentStep = 1;
    updateStepDisplay();
    
    // Add entrance animation
    const modalContent = verificationModal.querySelector('.modal-content');
    modalContent.style.animation = 'slideIn 0.4s ease';
}

function closeVerificationModalFunc() {
    verificationModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    resetVerificationForm();
}

function updateStepDisplay() {
    const steps = document.querySelectorAll('.step');
    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    const submitBtn = document.getElementById('submitVerificationBtn');
    
    steps.forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
            step.style.animation = 'fadeIn 0.5s ease';
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update buttons with enhanced animations
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    } else if (currentStep === totalSteps) {
        prevBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        prevBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
    
    // Add button animations
    [prevBtn, nextBtn, submitBtn].forEach(btn => {
        if (btn.style.display !== 'none') {
            btn.style.animation = 'fadeIn 0.3s ease';
        }
    });
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateStepDisplay();
        
        // Add step transition animation
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        currentStepElement.style.animation = 'slideInRight 0.4s ease';
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
        
        // Add step transition animation
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        currentStepElement.style.animation = 'slideInLeft 0.4s ease';
    }
}

function resetVerificationForm() {
    currentStep = 1;
    updateStepDisplay();
    
    // Reset file inputs
    idUpload.value = '';
    photoUpload.value = '';
    
    // Reset form fields
    document.getElementById('verificationPhone').value = '01012345678';
    document.getElementById('verificationAddress').value = '123 شارع النصر، حي المعادي، القاهرة، مصر';
    
    // Reset upload areas
    const uploadAreas = document.querySelectorAll('.upload-area');
    uploadAreas.forEach(area => {
        area.classList.remove('has-file');
        const content = area.querySelector('.upload-content');
        content.style.display = 'block';
        const preview = area.querySelector('.file-preview');
        if (preview) preview.remove();
    });
}

function handleFileUpload(input, areaId) {
    const file = input.files[0];
    if (file) {
        const area = document.getElementById(areaId);
        const content = area.querySelector('.upload-content');
        const reader = new FileReader();
        
        reader.onload = function(e) {
            content.style.display = 'none';
            
            const preview = document.createElement('div');
            preview.className = 'file-preview';
            preview.style.animation = 'fadeIn 0.3s ease';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Uploaded file" style="max-width: 100%; max-height: 200px; border-radius: 10px;">
                <button type="button" class="remove-file-btn" onclick="removeFile('${areaId}')" style="position: absolute; top: 10px; right: 10px; background: rgba(255,0,0,0.8); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            area.appendChild(preview);
            area.classList.add('has-file');
            
            // Add success animation
            area.style.animation = 'pulse 0.5s ease';
        };
        
        reader.readAsDataURL(file);
    }
}

function removeFile(areaId) {
    const area = document.getElementById(areaId);
    const content = area.querySelector('.upload-content');
    const preview = area.querySelector('.file-preview');
    const input = area.querySelector('input[type="file"]');
    
    content.style.display = 'block';
    if (preview) {
        preview.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => preview.remove(), 300);
    }
    area.classList.remove('has-file');
    input.value = '';
}

function submitVerification() {
    const btnText = submitVerificationBtn.querySelector('.btn-text');
    const btnLoading = submitVerificationBtn.querySelector('.btn-loading');
    
    // Show loading state with enhanced animation
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitVerificationBtn.disabled = true;
    submitVerificationBtn.style.animation = 'pulse 1s infinite';
    
    // Simulate submission
    setTimeout(() => {
        // Success
        showNotification('تم إرسال طلب التحقق بنجاح! سيتم مراجعته خلال 24 ساعة.', 'success');
        closeVerificationModalFunc();
        
        // Reset button
        btnText.style.display = 'flex';
        btnLoading.style.display = 'none';
        submitVerificationBtn.disabled = false;
        submitVerificationBtn.style.animation = '';
    }, 2000);
}

// Enhanced Star Rating System
function initStarRating() {
    const stars = profileStars.querySelectorAll('i');
    let currentRating = 4; // Default rating
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            currentRating = index + 1;
            updateStars(currentRating);
            showRatingModal();
            
            // Add click animation
            star.style.animation = 'bounce 0.3s ease';
            setTimeout(() => {
                star.style.animation = '';
            }, 300);
        });
        
        star.addEventListener('mouseenter', () => {
            updateStars(index + 1);
        });
        
        star.addEventListener('mouseleave', () => {
            updateStars(currentRating);
        });
    });
}

function updateStars(rating) {
    const stars = profileStars.querySelectorAll('i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.className = 'fas fa-star';
            star.style.color = '#ffc107';
        } else {
            star.className = 'far fa-star';
            star.style.color = '#ddd';
        }
    });
}

function showRatingModal() {
    const rating = getCurrentRating();
    const message = `شكراً لك! لقد قمت بتقييم الملف الشخصي بـ ${rating} نجوم.`;
    showNotification(message, 'success');
}

function getCurrentRating() {
    const filledStars = profileStars.querySelectorAll('.fas.fa-star').length;
    return filledStars;
}

// Enhanced Contact Information Editing
function toggleEdit(section) {
    if (section === 'contact') {
        toggleContactEdit();
        return;
    }
    
    const displayElements = document.querySelectorAll(`#${section}Display`);
    const inputElements = document.querySelectorAll(`#${section}Input`);
    const editBtn = event.target.closest('.edit-btn');
    
    // Toggle edit mode
    const isEditing = displayElements[0] && displayElements[0].style.display === 'none';
    
    if (isEditing) {
        // Save mode
        saveChanges(section);
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.style.color = 'var(--primary-color)';
    } else {
        // Edit mode
        displayElements.forEach(element => {
            element.style.display = 'none';
        });
        
        inputElements.forEach(element => {
            element.style.display = 'block';
            element.focus();
            element.style.animation = 'fadeIn 0.3s ease';
        });
        
        editBtn.innerHTML = '<i class="fas fa-save"></i>';
        editBtn.style.color = 'var(--success-color)';
    }
}

// Enhanced Contact Information Management
function toggleContactEdit() {
    const contactGrid = document.getElementById('contactGrid');
    const editBtn = event.target.closest('.edit-btn');
    const addBtn = document.getElementById('addContactBtn');
    const contactItems = contactGrid.querySelectorAll('.contact-item');
    
    const isEditing = contactItems[0].querySelector('.contact-input').style.display === 'block';
    
    if (isEditing) {
        // Save contact changes
        saveContactChanges();
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.title = 'تعديل معلومات التواصل';
        editBtn.style.color = 'var(--primary-color)';
        addBtn.style.display = 'none';
        
        // Hide delete buttons and validation messages
        contactItems.forEach(item => {
            const deleteBtn = item.querySelector('.delete-contact-btn');
            const validationMsg = item.querySelector('.validation-message');
            if (deleteBtn) deleteBtn.remove();
            if (validationMsg) validationMsg.remove();
        });
        
        showContactNotification('تم حفظ تغييرات معلومات التواصل بنجاح!', 'success');
    } else {
        // Enter edit mode
        enterContactEditMode();
        editBtn.innerHTML = '<i class="fas fa-save"></i>';
        editBtn.title = 'حفظ التغييرات';
        editBtn.style.color = 'var(--success-color)';
        addBtn.style.display = 'inline-flex';
    }
}

function enterContactEditMode() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const contactText = item.querySelector('.contact-text');
        const contactInput = item.querySelector('.contact-input');
        const contactActions = item.querySelector('.contact-actions');
        
        // Show input, hide text
        contactText.style.display = 'none';
        contactInput.style.display = 'block';
        contactInput.style.animation = 'slideInRight 0.3s ease';
        
        // Hide action buttons during edit
        if (contactActions) {
            contactActions.style.display = 'none';
        }
        
        // Add delete button for non-primary contacts
        if (!item.classList.contains('primary-contact')) {
            addDeleteButton(item);
        }
        
        // Add validation
        addContactValidation(contactInput);
    });
}

function addDeleteButton(contactItem) {
    const contactDetails = contactItem.querySelector('.contact-details');
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-contact-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = 'حذف طريقة التواصل';
    deleteBtn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: var(--danger-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 0.8rem;
        transition: all 0.3s ease;
        z-index: 10;
    `;
    
    deleteBtn.addEventListener('click', () => deleteContactMethod(contactItem));
    deleteBtn.addEventListener('mouseenter', () => {
        deleteBtn.style.transform = 'scale(1.1)';
        deleteBtn.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.3)';
    });
    deleteBtn.addEventListener('mouseleave', () => {
        deleteBtn.style.transform = 'scale(1)';
        deleteBtn.style.boxShadow = 'none';
    });
    
    contactItem.style.position = 'relative';
    contactItem.appendChild(deleteBtn);
}

function addContactValidation(input) {
    const contactItem = input.closest('.contact-item');
    const contactType = contactItem.dataset.type;
    
    input.addEventListener('input', () => validateContactInput(input, contactType));
    input.addEventListener('blur', () => validateContactInput(input, contactType));
}

function validateContactInput(input, type) {
    const value = input.value.trim();
    const contactItem = input.closest('.contact-item');
    
    // Remove existing validation message
    const existingMsg = contactItem.querySelector('.validation-message');
    if (existingMsg) existingMsg.remove();
    
    let isValid = true;
    let message = '';
    
    // Validation rules based on contact type
    switch (type) {
        case 'phone':
        case 'whatsapp':
            isValid = /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(value);
            message = isValid ? '' : 'رقم الهاتف غير صحيح';
            break;
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            message = isValid ? '' : 'البريد الإلكتروني غير صحيح';
            break;
        case 'telegram':
            isValid = /^@[a-zA-Z0-9_]{5,32}$/.test(value);
            message = isValid ? '' : 'معرف تليجرام يجب أن يبدأ بـ @ ويحتوي على 5-32 حرف';
            break;
        case 'linkedin':
            isValid = value.includes('linkedin.com') || /^[a-zA-Z0-9\-]+$/.test(value);
            message = isValid ? '' : 'رابط لينكد إن غير صحيح';
            break;
        case 'github':
            isValid = value.includes('github.com') || /^[a-zA-Z0-9\-]+$/.test(value);
            message = isValid ? '' : 'رابط جيت هاب غير صحيح';
            break;
        case 'website':
            isValid = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value);
            message = isValid ? '' : 'رابط الموقع غير صحيح';
            break;
        case 'discord':
            isValid = /^.{3,32}#[0-9]{4}$/.test(value);
            message = isValid ? '' : 'معرف ديسكورد يجب أن ينتهي بـ #0000';
            break;
    }
    
    // Update input styling
    input.style.borderColor = isValid ? 'var(--success-color)' : 'var(--danger-color)';
    
    // Show validation message if invalid
    if (!isValid && message) {
        const validationMsg = document.createElement('div');
        validationMsg.className = 'validation-message';
        validationMsg.textContent = message;
        validationMsg.style.cssText = `
            color: var(--danger-color);
            font-size: 0.8rem;
            margin-top: 4px;
            animation: slideInDown 0.3s ease;
        `;
        contactItem.appendChild(validationMsg);
    }
    
    return isValid;
}

function saveContactChanges() {
    const contactItems = document.querySelectorAll('.contact-item');
    let hasErrors = false;
    
    contactItems.forEach(item => {
        const contactText = item.querySelector('.contact-text');
        const contactInput = item.querySelector('.contact-input');
        const contactActions = item.querySelector('.contact-actions');
        const contactType = item.dataset.type;
        
        // Validate before saving
        if (!validateContactInput(contactInput, contactType)) {
            hasErrors = true;
            return;
        }
        
        // Update display value
        contactText.textContent = contactInput.value;
        
        // Update action button data attributes
        const actionBtns = contactActions ? contactActions.querySelectorAll('.action-btn') : [];
        actionBtns.forEach(btn => {
            if (btn.onclick) {
                const newOnclick = btn.onclick.toString().replace(/['"][^'"]*['"]/, `'${contactInput.value}'`);
                btn.onclick = new Function('return ' + newOnclick)();
            }
        });
        
        // Show text, hide input
        contactText.style.display = 'block';
        contactInput.style.display = 'none';
        
        // Show action buttons
        if (contactActions) {
            contactActions.style.display = 'flex';
        }
    });
    
    if (hasErrors) {
        showContactNotification('يرجى تصحيح الأخطاء قبل الحفظ', 'error');
        return false;
    }
    
    // Save to localStorage
    saveContactData();
    return true;
}

function saveContactData() {
    const contactData = {};
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const type = item.dataset.type;
        const value = item.querySelector('.contact-text').textContent;
        contactData[type] = value;
    });
    
    localStorage.setItem('contactData', JSON.stringify(contactData));
}

function loadContactData() {
    const savedData = localStorage.getItem('contactData');
    if (savedData) {
        const contactData = JSON.parse(savedData);
        
        Object.keys(contactData).forEach(type => {
            const contactText = document.getElementById(`${type}Display`);
            const contactInput = document.getElementById(`${type}Input`);
            
            if (contactText) contactText.textContent = contactData[type];
            if (contactInput) contactInput.value = contactData[type];
        });
    }
}

function deleteContactMethod(contactItem) {
    const contactType = contactItem.dataset.type;
    const contactLabel = contactItem.querySelector('.contact-label').textContent;
    
    if (confirm(`هل أنت متأكد من حذف ${contactLabel}؟`)) {
        contactItem.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            contactItem.remove();
            showContactNotification(`تم حذف ${contactLabel} بنجاح`, 'success');
        }, 300);
    }
}

// Add new contact method
function addContactMethod() {
    const modal = createContactMethodModal();
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function createContactMethodModal() {
    const modal = document.createElement('div');
    modal.className = 'contact-method-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeContactMethodModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-plus-circle"></i> إضافة طريقة تواصل جديدة</h3>
                <button class="close-btn" onclick="closeContactMethodModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="contact-type-selection">
                    <h4>اختر نوع التواصل:</h4>
                    <div class="contact-types-grid">
                        <div class="contact-type-option" data-type="skype">
                            <i class="fab fa-skype"></i>
                            <span>سكايب</span>
                        </div>
                        <div class="contact-type-option" data-type="twitter">
                            <i class="fab fa-twitter"></i>
                            <span>تويتر</span>
                        </div>
                        <div class="contact-type-option" data-type="instagram">
                            <i class="fab fa-instagram"></i>
                            <span>إنستجرام</span>
                        </div>
                        <div class="contact-type-option" data-type="facebook">
                            <i class="fab fa-facebook"></i>
                            <span>فيسبوك</span>
                        </div>
                        <div class="contact-type-option" data-type="youtube">
                            <i class="fab fa-youtube"></i>
                            <span>يوتيوب</span>
                        </div>
                        <div class="contact-type-option" data-type="behance">
                            <i class="fab fa-behance"></i>
                            <span>بيهانس</span>
                        </div>
                    </div>
                </div>
                <div class="contact-details-form" style="display: none;">
                    <div class="form-group">
                        <label for="newContactValue">معلومات التواصل:</label>
                        <input type="text" id="newContactValue" placeholder="أدخل معلومات التواصل">
                        <div class="input-help"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeContactMethodModal()">إلغاء</button>
                <button class="btn btn-primary" onclick="confirmAddContact()" disabled id="confirmAddBtn">
                    <i class="fas fa-plus"></i> إضافة
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const typeOptions = modal.querySelectorAll('.contact-type-option');
    typeOptions.forEach(option => {
        option.addEventListener('click', () => selectContactType(option));
    });
    
    return modal;
}

function selectContactType(option) {
    const modal = option.closest('.contact-method-modal');
    const detailsForm = modal.querySelector('.contact-details-form');
    const input = modal.querySelector('#newContactValue');
    const helpText = modal.querySelector('.input-help');
    const confirmBtn = modal.querySelector('#confirmAddBtn');
    
    // Remove previous selection
    modal.querySelectorAll('.contact-type-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select current option
    option.classList.add('selected');
    
    const type = option.dataset.type;
    const typeInfo = getContactTypeInfo(type);
    
    // Update form
    input.placeholder = typeInfo.placeholder;
    helpText.textContent = typeInfo.help;
    detailsForm.style.display = 'block';
    
    // Store selected type
    modal.dataset.selectedType = type;
    
    // Enable confirm button and add validation
    input.addEventListener('input', () => {
        const isValid = validateNewContactInput(input.value, type);
        confirmBtn.disabled = !isValid || !input.value.trim();
    });
    
    input.focus();
}

function getContactTypeInfo(type) {
    const typeInfo = {
        skype: {
            placeholder: 'اسم المستخدم في سكايب',
            help: 'مثال: john.doe أو live:john.doe',
            icon: 'fab fa-skype'
        },
        twitter: {
            placeholder: '@اسم_المستخدم',
            help: 'مثال: @username',
            icon: 'fab fa-twitter'
        },
        instagram: {
            placeholder: '@اسم_المستخدم',
            help: 'مثال: @username',
            icon: 'fab fa-instagram'
        },
        facebook: {
            placeholder: 'رابط الفيسبوك أو اسم المستخدم',
            help: 'مثال: facebook.com/username',
            icon: 'fab fa-facebook'
        },
        youtube: {
            placeholder: 'رابط القناة أو اسم المستخدم',
            help: 'مثال: youtube.com/c/channelname',
            icon: 'fab fa-youtube'
        },
        behance: {
            placeholder: 'رابط بيهانس أو اسم المستخدم',
            help: 'مثال: behance.net/username',
            icon: 'fab fa-behance'
        }
    };
    
    return typeInfo[type] || { placeholder: '', help: '', icon: 'fas fa-link' };
}

function validateNewContactInput(value, type) {
    switch (type) {
        case 'skype':
            return /^[a-zA-Z0-9\.\-_:]{6,32}$/.test(value);
        case 'twitter':
        case 'instagram':
            return /^@[a-zA-Z0-9_]{1,15}$/.test(value);
        case 'facebook':
        case 'youtube':
        case 'behance':
            return value.length > 3;
        default:
            return value.length > 0;
    }
}

function confirmAddContact() {
    const modal = document.querySelector('.contact-method-modal');
    const type = modal.dataset.selectedType;
    const value = modal.querySelector('#newContactValue').value.trim();
    
    if (!type || !value) return;
    
    const typeInfo = getContactTypeInfo(type);
    const contactGrid = document.getElementById('contactGrid');
    
    // Create new contact item
    const newContactItem = document.createElement('div');
    newContactItem.className = 'contact-item additional-contact';
    newContactItem.dataset.type = type;
    
    newContactItem.innerHTML = `
        <div class="contact-icon">
            <i class="${typeInfo.icon}"></i>
        </div>
        <div class="contact-details">
            <span class="contact-label">${getContactLabel(type)}</span>
            <span class="contact-text" id="${type}Display">${value}</span>
            <input type="text" class="contact-input" id="${type}Input" value="${value}" style="display: none;" placeholder="${typeInfo.placeholder}">
            <div class="contact-actions" style="display: none;">
                <button class="action-btn ${type}-btn" onclick="open${type.charAt(0).toUpperCase() + type.slice(1)}('${value}')" title="فتح ${getContactLabel(type)}">
                    <i class="${typeInfo.icon}"></i>
                </button>
                <button class="action-btn copy-btn" onclick="copyToClipboard('${value}')" title="نسخ">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add animation
    newContactItem.style.animation = 'slideInLeft 0.5s ease';
    
    // Append to grid
    contactGrid.appendChild(newContactItem);
    
    // Close modal
    closeContactMethodModal();
    
    // Show success message
    showContactNotification(`تم إضافة ${getContactLabel(type)} بنجاح!`, 'success');
    
    // Add validation to new input
    addContactValidation(newContactItem.querySelector('.contact-input'));
}

function getContactLabel(type) {
    const labels = {
        skype: 'سكايب',
        twitter: 'تويتر',
        instagram: 'إنستجرام',
        facebook: 'فيسبوك',
        youtube: 'يوتيوب',
        behance: 'بيهانس'
    };
    return labels[type] || type;
}

function closeContactMethodModal() {
    const modal = document.querySelector('.contact-method-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Enhanced contact action functions
function openSkype(username) {
    window.open(`skype:${username}?chat`, '_blank');
}

function openTwitter(username) {
    const cleanUsername = username.replace('@', '');
    window.open(`https://twitter.com/${cleanUsername}`, '_blank');
}

function openInstagram(username) {
    const cleanUsername = username.replace('@', '');
    window.open(`https://instagram.com/${cleanUsername}`, '_blank');
}

function openFacebook(url) {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(fullUrl, '_blank');
}

function openYoutube(url) {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(fullUrl, '_blank');
}

function openBehance(url) {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(fullUrl, '_blank');
}

function saveChanges(section) {
    const displayElements = document.querySelectorAll(`#${section}Display`);
    const inputElements = document.querySelectorAll(`#${section}Input`);
    
    // Update display values with input values
    inputElements.forEach((input, index) => {
        if (displayElements[index]) {
            displayElements[index].textContent = input.value;
            displayElements[index].style.display = 'block';
        }
    });
    
    // Hide inputs
    inputElements.forEach(element => {
        element.style.display = 'none';
    });
    
    // Show success notification
    showNotification('تم حفظ التغييرات بنجاح!', 'success');
}

// Enhanced Skills Editing
function toggleSkillsEdit() {
    const skillsList = document.getElementById('skillsList');
    const editBtn = event.target.closest('.edit-btn');
    
    const isEditing = skillsList.querySelector('.skill-input');
    
    if (isEditing) {
        // Save skills
        saveSkills();
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.style.color = 'var(--primary-color)';
    } else {
        // Edit skills
        makeSkillsEditable();
        editBtn.innerHTML = '<i class="fas fa-save"></i>';
        editBtn.style.color = 'var(--success-color)';
    }
}

function makeSkillsEditable() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name');
        const skillBar = item.querySelector('.skill-bar');
        
        // Create container for all inputs
        const editContainer = document.createElement('div');
        editContainer.className = 'skill-edit-container';
        editContainer.style.cssText = `
            background: var(--light-bg);
            border: 2px solid var(--primary-color);
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 10px;
        `;
        
        // Create input for skill name
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'skill-input';
        nameInput.value = skillName.textContent;
        nameInput.style.cssText = `
            width: 100%;
            padding: 8px 12px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background: white;
            color: var(--light-text);
            font-family: 'Cairo', sans-serif;
            font-size: 0.9rem;
            margin-bottom: 12px;
        `;
        
        // Create experience inputs container
        const experienceContainer = document.createElement('div');
        experienceContainer.className = 'experience-inputs';
        experienceContainer.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 12px;
        `;
        
        // Years of experience input
        const yearsInput = document.createElement('input');
        yearsInput.type = 'number';
        yearsInput.className = 'years-input';
        yearsInput.placeholder = 'سنوات الخبرة';
        yearsInput.min = '0';
        yearsInput.max = '20';
        yearsInput.value = item.dataset.years || '0';
        yearsInput.style.cssText = `
            padding: 8px 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: white;
            font-size: 0.85rem;
        `;
        
        // Projects count input
        const projectsInput = document.createElement('input');
        projectsInput.type = 'number';
        projectsInput.className = 'projects-input';
        projectsInput.placeholder = 'عدد المشاريع';
        projectsInput.min = '0';
        projectsInput.max = '100';
        projectsInput.value = item.dataset.projects || '0';
        projectsInput.style.cssText = `
            padding: 8px 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: white;
            font-size: 0.85rem;
        `;
        
        experienceContainer.appendChild(yearsInput);
        experienceContainer.appendChild(projectsInput);
        
        // Create certification checkbox
        const certificationContainer = document.createElement('div');
        certificationContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
        `;
        
        const certificationInput = document.createElement('input');
        certificationInput.type = 'checkbox';
        certificationInput.className = 'certification-input';
        certificationInput.checked = item.dataset.certified === 'true';
        certificationInput.style.cssText = `
            width: 18px;
            height: 18px;
            accent-color: var(--primary-color);
        `;
        
        const certificationLabel = document.createElement('label');
        certificationLabel.textContent = 'لديه شهادة معتمدة';
        certificationLabel.style.cssText = `
            font-size: 0.85rem;
            color: var(--light-text);
            cursor: pointer;
        `;
        
        certificationContainer.appendChild(certificationInput);
        certificationContainer.appendChild(certificationLabel);
        
        // Create calculated level display
        const calculatedLevelContainer = document.createElement('div');
        calculatedLevelContainer.style.cssText = `
            background: rgba(0, 123, 255, 0.1);
            border: 1px solid var(--primary-color);
            border-radius: 8px;
            padding: 10px;
            margin-bottom: 12px;
            text-align: center;
        `;
        
        const calculatedLevel = document.createElement('div');
        calculatedLevel.className = 'calculated-level';
        calculatedLevel.style.cssText = `
            font-size: 0.9rem;
            color: var(--primary-color);
            font-weight: 600;
            margin-bottom: 5px;
        `;
        
        const calculatedBar = document.createElement('div');
        calculatedBar.className = 'calculated-bar';
        calculatedBar.style.cssText = `
            height: 6px;
            background: #e9ecef;
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 8px;
        `;
        
        const calculatedFill = document.createElement('div');
        calculatedFill.className = 'calculated-fill';
        calculatedFill.style.cssText = `
            height: 100%;
            background: var(--gradient-primary);
            border-radius: 3px;
            transition: width 0.3s ease;
            width: 0%;
        `;
        
        calculatedBar.appendChild(calculatedFill);
        
        const autoCalculateBtn = document.createElement('button');
        autoCalculateBtn.type = 'button';
        autoCalculateBtn.className = 'auto-calculate-btn';
        autoCalculateBtn.textContent = 'حساب تلقائي';
        autoCalculateBtn.style.cssText = `
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 6px;
            padding: 6px 12px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        
        calculatedLevelContainer.appendChild(calculatedLevel);
        calculatedLevelContainer.appendChild(calculatedBar);
        calculatedLevelContainer.appendChild(autoCalculateBtn);
        
        // Create manual level input (optional override)
        const manualLevelContainer = document.createElement('div');
        manualLevelContainer.style.cssText = `
            margin-bottom: 10px;
        `;
        
        const manualLabel = document.createElement('label');
        manualLabel.textContent = 'تعديل يدوي (اختياري):';
        manualLabel.style.cssText = `
            display: block;
            font-size: 0.8rem;
            color: var(--light-text);
            margin-bottom: 5px;
        `;
        
        const levelInput = document.createElement('input');
        levelInput.type = 'range';
        levelInput.min = '0';
        levelInput.max = '100';
        levelInput.className = 'skill-level-input';
        levelInput.value = parseInt(skillBar.style.width) || 0;
        levelInput.style.cssText = `
            width: 100%;
            margin-bottom: 5px;
        `;
        
        const levelDisplay = document.createElement('span');
        levelDisplay.className = 'skill-level-display';
        levelDisplay.textContent = `${levelInput.value}%`;
        levelDisplay.style.cssText = `
            font-size: 0.8rem;
            color: var(--primary-color);
            font-weight: 600;
            display: block;
            text-align: center;
        `;
        
        manualLevelContainer.appendChild(manualLabel);
        manualLevelContainer.appendChild(levelInput);
        manualLevelContainer.appendChild(levelDisplay);
        
        // Assemble the edit container
        editContainer.appendChild(nameInput);
        editContainer.appendChild(experienceContainer);
        editContainer.appendChild(certificationContainer);
        editContainer.appendChild(calculatedLevelContainer);
        editContainer.appendChild(manualLevelContainer);
        
        // Replace content
        skillName.style.display = 'none';
        skillBar.style.display = 'none';
        item.appendChild(editContainer);
        
        // Calculate skill level function
        function calculateSkillLevel() {
            const years = parseInt(yearsInput.value) || 0;
            const projects = parseInt(projectsInput.value) || 0;
            const hasCertification = certificationInput.checked;
            
            // Experience-based calculation algorithm
            let baseLevel = 0;
            
            // Years contribution (max 60%)
            if (years >= 5) baseLevel += 60;
            else if (years >= 3) baseLevel += 45;
            else if (years >= 2) baseLevel += 30;
            else if (years >= 1) baseLevel += 15;
            else if (years > 0) baseLevel += 5;
            
            // Projects contribution (max 25%)
            if (projects >= 20) baseLevel += 25;
            else if (projects >= 10) baseLevel += 20;
            else if (projects >= 5) baseLevel += 15;
            else if (projects >= 3) baseLevel += 10;
            else if (projects >= 1) baseLevel += 5;
            
            // Certification bonus (max 15%)
            if (hasCertification) baseLevel += 15;
            
            // Cap at 100%
            baseLevel = Math.min(baseLevel, 100);
            
            // Update display
            calculatedLevel.textContent = `المستوى المحسوب: ${baseLevel}%`;
            calculatedFill.style.width = `${baseLevel}%`;
            
            return baseLevel;
        }
        
        // Auto-calculate button event
        autoCalculateBtn.addEventListener('click', () => {
            const calculatedValue = calculateSkillLevel();
            levelInput.value = calculatedValue;
            levelDisplay.textContent = `${calculatedValue}%`;
            showNotification('تم حساب مستوى المهارة تلقائياً', 'success');
        });
        
        // Update displays on input change
        [yearsInput, projectsInput, certificationInput].forEach(input => {
            input.addEventListener('input', calculateSkillLevel);
        });
        
        levelInput.addEventListener('input', () => {
            levelDisplay.textContent = `${levelInput.value}%`;
        });
        
        // Initial calculation
        calculateSkillLevel();
    });
}

function saveSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name');
        const skillBar = item.querySelector('.skill-bar');
        const editContainer = item.querySelector('.skill-edit-container');
        
        if (editContainer) {
            const nameInput = editContainer.querySelector('.skill-input');
            const levelInput = editContainer.querySelector('.skill-level-input');
            const yearsInput = editContainer.querySelector('.years-input');
            const projectsInput = editContainer.querySelector('.projects-input');
            const certificationInput = editContainer.querySelector('.certification-input');
            
            // Update skill name and level
            skillName.textContent = nameInput.value;
            skillBar.style.width = `${levelInput.value}%`;
            
            // Save experience data to dataset
            item.dataset.years = yearsInput.value;
            item.dataset.projects = projectsInput.value;
            item.dataset.certified = certificationInput.checked;
            item.dataset.level = levelInput.value;
            
            // Add experience indicator to skill display
            let experienceIndicator = item.querySelector('.experience-indicator');
            if (!experienceIndicator) {
                experienceIndicator = document.createElement('div');
                experienceIndicator.className = 'experience-indicator';
                experienceIndicator.style.cssText = `
                    font-size: 0.7rem;
                    color: #666;
                    margin-top: 2px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                `;
                item.appendChild(experienceIndicator);
            }
            
            // Update experience indicator content
            const years = parseInt(yearsInput.value) || 0;
            const projects = parseInt(projectsInput.value) || 0;
            const hasCertification = certificationInput.checked;
            
            let indicatorText = '';
            if (years > 0) indicatorText += `${years} سنة`;
            if (projects > 0) {
                if (indicatorText) indicatorText += ' • ';
                indicatorText += `${projects} مشروع`;
            }
            if (hasCertification) {
                if (indicatorText) indicatorText += ' • ';
                indicatorText += '<i class="fas fa-certificate" style="color: #ffc107;"></i>';
            }
            
            experienceIndicator.innerHTML = indicatorText || 'بدون خبرة محددة';
            
            // Show original elements
            skillName.style.display = 'block';
            skillBar.style.display = 'block';
            
            // Remove edit container
            editContainer.remove();
        }
    });
    
    // Save to localStorage for persistence
    saveSkillsToStorage();
    showNotification('تم حفظ المهارات والخبرات بنجاح!', 'success');
}

// Save skills data to localStorage
function saveSkillsToStorage() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsData = [];
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name');
        const skillBar = item.querySelector('.skill-bar');
        
        if (skillName && skillBar) {
            skillsData.push({
                name: skillName.textContent,
                level: parseInt(skillBar.style.width) || 0,
                years: parseInt(item.dataset.years) || 0,
                projects: parseInt(item.dataset.projects) || 0,
                certified: item.dataset.certified === 'true'
            });
        }
    });
    
    localStorage.setItem('userSkills', JSON.stringify(skillsData));
}

// Load skills data from localStorage
function loadSkillsFromStorage() {
    const savedSkills = localStorage.getItem('userSkills');
    if (!savedSkills) return;
    
    try {
        const skillsData = JSON.parse(savedSkills);
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            if (skillsData[index]) {
                const data = skillsData[index];
                const skillName = item.querySelector('.skill-name');
                const skillBar = item.querySelector('.skill-bar');
                
                if (skillName && skillBar) {
                    skillName.textContent = data.name;
                    skillBar.style.width = `${data.level}%`;
                    
                    // Set dataset values
                    item.dataset.years = data.years;
                    item.dataset.projects = data.projects;
                    item.dataset.certified = data.certified;
                    item.dataset.level = data.level;
                    
                    // Add experience indicator
                    let experienceIndicator = item.querySelector('.experience-indicator');
                    if (!experienceIndicator) {
                        experienceIndicator = document.createElement('div');
                        experienceIndicator.className = 'experience-indicator';
                        experienceIndicator.style.cssText = `
                            font-size: 0.7rem;
                            color: #666;
                            margin-top: 2px;
                            display: flex;
                            align-items: center;
                            gap: 5px;
                        `;
                        item.appendChild(experienceIndicator);
                    }
                    
                    // Update experience indicator
                    let indicatorText = '';
                    if (data.years > 0) indicatorText += `${data.years} سنة`;
                    if (data.projects > 0) {
                        if (indicatorText) indicatorText += ' • ';
                        indicatorText += `${data.projects} مشروع`;
                    }
                    if (data.certified) {
                        if (indicatorText) indicatorText += ' • ';
                        indicatorText += '<i class="fas fa-certificate" style="color: #ffc107;"></i>';
                    }
                    
                    experienceIndicator.innerHTML = indicatorText || 'بدون خبرة محددة';
                }
            }
        });
    } catch (error) {
         console.error('Error loading skills from storage:', error);
     }
 }

// Add new skill function
function addNewSkill() {
    const skillsContainer = document.querySelector('.skills-section .skill-item').parentNode;
    
    const newSkillItem = document.createElement('div');
    newSkillItem.className = 'skill-item';
    newSkillItem.style.cssText = `
        margin-bottom: 20px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    `;
    
    newSkillItem.innerHTML = `
        <div class="skill-info">
            <span class="skill-name">مهارة جديدة</span>
            <span class="skill-percentage">50%</span>
        </div>
        <div class="skill-bar" style="width: 50%;"></div>
    `;
    
    skillsContainer.appendChild(newSkillItem);
    
    // Animate in
    setTimeout(() => {
        newSkillItem.style.opacity = '1';
        newSkillItem.style.transform = 'translateY(0)';
    }, 10);
    
    showNotification('تم إضافة مهارة جديدة!', 'success');
}

// Show preset levels modal
function showPresetLevels() {
    const modal = document.createElement('div');
    modal.className = 'preset-modal';
    modal.innerHTML = `
        <div class="preset-modal-content">
            <h3>تطبيق مستويات محددة مسبقاً</h3>
            <div class="preset-options">
                <div class="preset-option" onclick="applyPresetToAll(25)">
                    <h4>مبتدئ</h4>
                    <p>25% - مستوى أساسي</p>
                </div>
                <div class="preset-option" onclick="applyPresetToAll(50)">
                    <h4>متوسط</h4>
                    <p>50% - مستوى متوسط</p>
                </div>
                <div class="preset-option" onclick="applyPresetToAll(75)">
                    <h4>متقدم</h4>
                    <p>75% - مستوى متقدم</p>
                </div>
                <div class="preset-option" onclick="applyPresetToAll(90)">
                    <h4>خبير</h4>
                    <p>90% - مستوى خبير</p>
                </div>
                <div class="preset-option" onclick="applyRandomLevels()">
                    <h4>عشوائي</h4>
                    <p>مستويات متنوعة</p>
                </div>
            </div>
            <div class="preset-modal-actions">
                <button class="preset-modal-btn secondary" onclick="closePresetModal()">إلغاء</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Apply preset level to all skills
function applyPresetToAll(level) {
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillPercentages = document.querySelectorAll('.skill-percentage');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = `${level}%`;
            if (skillPercentages[index]) {
                skillPercentages[index].textContent = `${level}%`;
            }
        }, index * 100);
    });
    
    closePresetModal();
    showNotification(`تم تطبيق مستوى ${level}% على جميع المهارات!`, 'success');
}

// Apply random levels
function applyRandomLevels() {
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillPercentages = document.querySelectorAll('.skill-percentage');
    
    skillBars.forEach((bar, index) => {
        const randomLevel = Math.floor(Math.random() * 70) + 30; // 30-100%
        setTimeout(() => {
            bar.style.width = `${randomLevel}%`;
            if (skillPercentages[index]) {
                skillPercentages[index].textContent = `${randomLevel}%`;
            }
        }, index * 100);
    });
    
    closePresetModal();
    showNotification('تم تطبيق مستويات عشوائية على المهارات!', 'success');
}

// Close preset modal
function closePresetModal() {
    const modal = document.querySelector('.preset-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Sort skills by level
function sortSkillsByLevel() {
    const skillsContainer = document.querySelector('.skills-section .skill-item').parentNode;
    const skillItems = Array.from(skillsContainer.querySelectorAll('.skill-item'));
    
    skillItems.sort((a, b) => {
        const levelA = parseInt(a.querySelector('.skill-bar').style.width) || 0;
        const levelB = parseInt(b.querySelector('.skill-bar').style.width) || 0;
        return levelB - levelA; // Sort descending
    });
    
    // Re-append in sorted order
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            skillsContainer.appendChild(item);
        }, index * 50);
    });
    
    showNotification('تم ترتيب المهارات حسب المستوى!', 'success');
}

// Enhanced About Section Editing
function toggleAboutEdit() {
    const aboutContent = document.getElementById('aboutContent');
    const aboutInput = document.getElementById('aboutInput');
    const editBtn = event.target.closest('.edit-btn');
    
    const isEditing = aboutInput.style.display === 'block';
    
    if (isEditing) {
        // Save about section
        aboutContent.innerHTML = `<p>${aboutInput.value.replace(/\n/g, '</p><p>')}</p>`;
        aboutContent.style.display = 'block';
        aboutInput.style.display = 'none';
        
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.style.color = 'var(--primary-color)';
        
        showNotification('تم حفظ التغييرات بنجاح!', 'success');
    } else {
        // Edit about section
        aboutInput.value = aboutContent.textContent.trim();
        aboutContent.style.display = 'none';
        aboutInput.style.display = 'block';
        aboutInput.focus();
        
        editBtn.innerHTML = '<i class="fas fa-save"></i>';
        editBtn.style.color = 'var(--success-color)';
    }
}

// Enhanced Statistics Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Enhanced Portfolio Management
function addPortfolioItem() {
    showAddPortfolioForm();
}

// Show Add Portfolio Form
function showAddPortfolioForm() {
    const modal = document.createElement('div');
    modal.className = 'portfolio-add-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="portfolio-add-content" style="
            background: var(--light-card);
            border-radius: 20px;
            padding: 30px;
            max-width: 700px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        ">
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid var(--primary-color); padding-bottom: 15px;">
                <h3 style="color: var(--light-text); margin: 0; font-size: 1.5rem; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-plus-circle" style="color: var(--primary-color);"></i>
                    إضافة مشروع جديد
                </h3>
                <button onclick="closeAddPortfolioForm()" style="background: none; border: none; font-size: 1.5rem; color: #666; cursor: pointer; padding: 5px; border-radius: 50%; transition: all 0.3s ease;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <form id="addPortfolioForm" class="portfolio-form" style="display: flex; flex-direction: column; gap: 20px;">
                <div class="form-group">
                    <label for="portfolioTitle" style="display: block; margin-bottom: 8px; color: var(--light-text); font-weight: 600; font-size: 1rem;">
                        <i class="fas fa-heading" style="margin-left: 8px; color: var(--primary-color);"></i>
                        عنوان المشروع *
                    </label>
                    <input type="text" id="portfolioTitle" name="title" required 
                           placeholder="أدخل عنوان المشروع..."
                           style="width: 100%; padding: 12px 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1rem; transition: all 0.3s ease; background: var(--light-bg); color: var(--light-text);">
                </div>
                
                <div class="form-group">
                    <label for="portfolioDescription" style="display: block; margin-bottom: 8px; color: var(--light-text); font-weight: 600; font-size: 1rem;">
                        <i class="fas fa-align-left" style="margin-left: 8px; color: var(--primary-color);"></i>
                        وصف المشروع *
                    </label>
                    <textarea id="portfolioDescription" name="description" required rows="4"
                              placeholder="اكتب وصفاً مفصلاً عن المشروع والتقنيات المستخدمة..."
                              style="width: 100%; padding: 12px 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1rem; resize: vertical; min-height: 100px; transition: all 0.3s ease; background: var(--light-bg); color: var(--light-text); font-family: inherit;"></textarea>
                </div>
                
                <div class="form-group">
                     <label for="portfolioCategory" style="display: block; margin-bottom: 8px; color: var(--light-text); font-weight: 600; font-size: 1rem;">
                         <i class="fas fa-layer-group" style="margin-left: 8px; color: var(--primary-color);"></i>
                         نوع المشروع *
                     </label>
                     <select id="portfolioCategory" name="category" required
                             style="width: 100%; padding: 12px 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1rem; transition: all 0.3s ease; background: var(--light-bg); color: var(--light-text); cursor: pointer;">
                         <option value="">اختر نوع المشروع...</option>
                         
                         <optgroup label="🔧 تطوير البرمجيات">
                             <option value="web" data-icon="fas fa-globe">تطوير ويب</option>
                             <option value="mobile" data-icon="fas fa-mobile-alt">تطبيق موبايل</option>
                             <option value="desktop" data-icon="fas fa-desktop">تطبيق سطح المكتب</option>
                             <option value="ecommerce" data-icon="fas fa-shopping-cart">متجر إلكتروني</option>
                             <option value="api" data-icon="fas fa-server">API/Backend</option>
                             <option value="database" data-icon="fas fa-database">قاعدة بيانات</option>
                             <option value="ai" data-icon="fas fa-robot">ذكاء اصطناعي</option>
                             <option value="game" data-icon="fas fa-gamepad">لعبة</option>
                             <option value="blockchain" data-icon="fas fa-link">بلوك تشين</option>
                             <option value="iot" data-icon="fas fa-microchip">إنترنت الأشياء</option>
                         </optgroup>
                         
                         <optgroup label="🎨 التصميم والإبداع">
                             <option value="ui-design" data-icon="fas fa-paint-brush">تصميم UI/UX</option>
                             <option value="graphic-design" data-icon="fas fa-palette">تصميم جرافيك</option>
                             <option value="logo-design" data-icon="fas fa-copyright">تصميم شعارات</option>
                             <option value="web-design" data-icon="fas fa-laptop-code">تصميم مواقع</option>
                             <option value="print-design" data-icon="fas fa-print">تصميم مطبوعات</option>
                             <option value="illustration" data-icon="fas fa-pencil-alt">رسم وتوضيح</option>
                             <option value="animation" data-icon="fas fa-play-circle">رسوم متحركة</option>
                             <option value="3d-design" data-icon="fas fa-cube">تصميم ثلاثي الأبعاد</option>
                         </optgroup>
                         
                         <optgroup label="✍️ المحتوى والكتابة">
                             <option value="content-writing" data-icon="fas fa-pen-nib">كتابة المحتوى</option>
                             <option value="copywriting" data-icon="fas fa-ad">كتابة إعلانية</option>
                             <option value="technical-writing" data-icon="fas fa-file-code">كتابة تقنية</option>
                             <option value="creative-writing" data-icon="fas fa-feather-alt">كتابة إبداعية</option>
                             <option value="blogging" data-icon="fas fa-blog">كتابة مدونات</option>
                             <option value="scriptwriting" data-icon="fas fa-film">كتابة سيناريو</option>
                             <option value="academic-writing" data-icon="fas fa-graduation-cap">كتابة أكاديمية</option>
                         </optgroup>
                         
                         <optgroup label="🌍 الترجمة واللغات">
                             <option value="translation" data-icon="fas fa-language">ترجمة</option>
                             <option value="localization" data-icon="fas fa-globe-americas">توطين</option>
                             <option value="interpretation" data-icon="fas fa-microphone">ترجمة فورية</option>
                             <option value="proofreading" data-icon="fas fa-spell-check">تدقيق لغوي</option>
                             <option value="subtitling" data-icon="fas fa-closed-captioning">ترجمة ترجمة</option>
                             <option value="voice-over" data-icon="fas fa-volume-up">تعليق صوتي</option>
                         </optgroup>
                         
                         <optgroup label="🎬 التحرير والإنتاج">
                             <option value="video-editing" data-icon="fas fa-video">مونتاج فيديو</option>
                             <option value="audio-editing" data-icon="fas fa-music">تحرير صوتي</option>
                             <option value="photo-editing" data-icon="fas fa-camera">تحرير صور</option>
                             <option value="content-editing" data-icon="fas fa-edit">تحرير محتوى</option>
                             <option value="podcast-editing" data-icon="fas fa-podcast">تحرير بودكاست</option>
                             <option value="documentary" data-icon="fas fa-file-video">إنتاج وثائقي</option>
                         </optgroup>
                         
                         <optgroup label="📊 التسويق والأعمال">
                             <option value="digital-marketing" data-icon="fas fa-chart-line">تسويق رقمي</option>
                             <option value="seo" data-icon="fas fa-search">تحسين محركات البحث</option>
                             <option value="social-media" data-icon="fas fa-share-alt">إدارة وسائل التواصل</option>
                             <option value="branding" data-icon="fas fa-bullseye">هوية تجارية</option>
                             <option value="consulting" data-icon="fas fa-handshake">استشارات</option>
                             <option value="market-research" data-icon="fas fa-chart-pie">بحث السوق</option>
                         </optgroup>
                         
                         <optgroup label="📚 التعليم والتدريب">
                             <option value="course-creation" data-icon="fas fa-chalkboard-teacher">إنشاء دورات</option>
                             <option value="tutoring" data-icon="fas fa-user-graduate">تدريس خصوصي</option>
                             <option value="training" data-icon="fas fa-dumbbell">تدريب وتطوير</option>
                             <option value="curriculum" data-icon="fas fa-book-open">تطوير مناهج</option>
                         </optgroup>
                         
                         <optgroup label="🔬 أخرى">
                             <option value="research" data-icon="fas fa-microscope">بحث وتحليل</option>
                             <option value="data-analysis" data-icon="fas fa-chart-bar">تحليل بيانات</option>
                             <option value="project-management" data-icon="fas fa-tasks">إدارة مشاريع</option>
                             <option value="other" data-icon="fas fa-project-diagram">أخرى</option>
                         </optgroup>
                     </select>
                 </div>
                 
                 <div class="form-group">
                     <label for="portfolioTags" style="display: block; margin-bottom: 8px; color: var(--light-text); font-weight: 600; font-size: 1rem;">
                         <i class="fas fa-tags" style="margin-left: 8px; color: var(--primary-color);"></i>
                         التقنيات والعلامات
                     </label>
                     <input type="text" id="portfolioTags" name="tags"
                            placeholder="مثال: React, JavaScript, CSS (افصل بفاصلة)"
                            style="width: 100%; padding: 12px 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1rem; transition: all 0.3s ease; background: var(--light-bg); color: var(--light-text);">
                     <small style="color: #666; font-size: 0.85rem; margin-top: 5px; display: block;">
                         <i class="fas fa-info-circle" style="margin-left: 5px;"></i>
                         افصل العلامات بفاصلة (,)
                     </small>
                 </div>
                
                <div class="form-group">
                    <label for="portfolioImage" style="display: block; margin-bottom: 8px; color: var(--light-text); font-weight: 600; font-size: 1rem;">
                        <i class="fas fa-image" style="margin-left: 8px; color: var(--primary-color);"></i>
                        رابط الصورة (اختياري)
                    </label>
                    <input type="url" id="portfolioImage" name="image"
                           placeholder="https://example.com/image.jpg"
                           style="width: 100%; padding: 12px 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1rem; transition: all 0.3s ease; background: var(--light-bg); color: var(--light-text);">
                    <small style="color: #666; font-size: 0.85rem; margin-top: 5px; display: block;">
                        <i class="fas fa-info-circle" style="margin-left: 5px;"></i>
                        إذا لم تضع رابط صورة، سيتم استخدام أيقونة افتراضية
                    </small>
                </div>
                
                <div class="form-group">
                    <label for="portfolioLink" style="display: block; margin-bottom: 8px; color: var(--light-text); font-weight: 600; font-size: 1rem;">
                        <i class="fas fa-link" style="margin-left: 8px; color: var(--primary-color);"></i>
                        رابط المشروع (اختياري)
                    </label>
                    <input type="url" id="portfolioLink" name="link"
                           placeholder="https://github.com/username/project"
                           style="width: 100%; padding: 12px 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 1rem; transition: all 0.3s ease; background: var(--light-bg); color: var(--light-text);">
                </div>
                
                <div class="form-actions" style="display: flex; gap: 15px; justify-content: flex-end; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                    <button type="button" onclick="closeAddPortfolioForm()" 
                            style="padding: 12px 25px; border: 2px solid #ddd; background: transparent; color: var(--light-text); border-radius: 10px; cursor: pointer; font-size: 1rem; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-times"></i>
                        إلغاء
                    </button>
                    <button type="submit" 
                            style="padding: 12px 25px; border: none; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; border-radius: 10px; cursor: pointer; font-size: 1rem; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);">
                        <i class="fas fa-plus"></i>
                        إضافة المشروع
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.portfolio-add-content').style.transform = 'scale(1)';
    }, 10);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAddPortfolioForm();
        }
    });
    
    // Handle form submission
    document.getElementById('addPortfolioForm').addEventListener('submit', handleAddPortfolioSubmit);
    
    // Add input focus effects
    const inputs = modal.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--primary-color)';
            input.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = '#e0e0e0';
            input.style.boxShadow = 'none';
        });
    });
}

// Close Add Portfolio Form
function closeAddPortfolioForm() {
    const modal = document.querySelector('.portfolio-add-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.portfolio-add-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Handle Add Portfolio Form Submission
function handleAddPortfolioSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const portfolioData = {
        title: formData.get('title').trim(),
        description: formData.get('description').trim(),
        category: formData.get('category').trim(),
        tags: formData.get('tags').trim(),
        image: formData.get('image').trim(),
        link: formData.get('link').trim()
    };
    
    // Validate required fields
    if (!portfolioData.title || !portfolioData.description || !portfolioData.category) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // Process tags
    const tagsArray = portfolioData.tags 
        ? portfolioData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [getCategoryDisplayName(portfolioData.category)];
    
    // Create the portfolio item
    createPortfolioItem(portfolioData, tagsArray);
    
    // Close the form
    closeAddPortfolioForm();
    
    showNotification('تم إضافة المشروع بنجاح!', 'success');
}

// Get category display name and icon
function getCategoryDisplayName(category) {
    const categories = {
        // Software Development
        'web': 'تطوير ويب',
        'mobile': 'تطبيق موبايل',
        'desktop': 'تطبيق سطح المكتب',
        'ecommerce': 'متجر إلكتروني',
        'api': 'API/Backend',
        'database': 'قاعدة بيانات',
        'ai': 'ذكاء اصطناعي',
        'game': 'لعبة',
        'blockchain': 'بلوك تشين',
        'iot': 'إنترنت الأشياء',
        
        // Design & Creative
        'ui-design': 'تصميم UI/UX',
        'graphic-design': 'تصميم جرافيك',
        'logo-design': 'تصميم شعارات',
        'web-design': 'تصميم مواقع',
        'print-design': 'تصميم مطبوعات',
        'illustration': 'رسم وتوضيح',
        'animation': 'رسوم متحركة',
        '3d-design': 'تصميم ثلاثي الأبعاد',
        
        // Content & Writing
        'content-writing': 'كتابة المحتوى',
        'copywriting': 'كتابة إعلانية',
        'technical-writing': 'كتابة تقنية',
        'creative-writing': 'كتابة إبداعية',
        'blogging': 'كتابة مدونات',
        'scriptwriting': 'كتابة سيناريو',
        'academic-writing': 'كتابة أكاديمية',
        
        // Translation & Languages
        'translation': 'ترجمة',
        'localization': 'توطين',
        'interpretation': 'ترجمة فورية',
        'proofreading': 'تدقيق لغوي',
        'subtitling': 'ترجمة ترجمة',
        'voice-over': 'تعليق صوتي',
        
        // Editing & Production
        'video-editing': 'مونتاج فيديو',
        'audio-editing': 'تحرير صوتي',
        'photo-editing': 'تحرير صور',
        'content-editing': 'تحرير محتوى',
        'podcast-editing': 'تحرير بودكاست',
        'documentary': 'إنتاج وثائقي',
        
        // Marketing & Business
        'digital-marketing': 'تسويق رقمي',
        'seo': 'تحسين محركات البحث',
        'social-media': 'إدارة وسائل التواصل',
        'branding': 'هوية تجارية',
        'consulting': 'استشارات',
        'market-research': 'بحث السوق',
        
        // Education & Training
        'course-creation': 'إنشاء دورات',
        'tutoring': 'تدريس خصوصي',
        'training': 'تدريب وتطوير',
        'curriculum': 'تطوير مناهج',
        
        // Other
        'research': 'بحث وتحليل',
        'data-analysis': 'تحليل بيانات',
        'project-management': 'إدارة مشاريع',
        'other': 'أخرى'
    };
    return categories[category] || 'مشروع جديد';
}

function getCategoryIcon(category) {
    const icons = {
        // Software Development
        'web': 'fas fa-globe',
        'mobile': 'fas fa-mobile-alt',
        'desktop': 'fas fa-desktop',
        'ecommerce': 'fas fa-shopping-cart',
        'api': 'fas fa-server',
        'database': 'fas fa-database',
        'ai': 'fas fa-robot',
        'game': 'fas fa-gamepad',
        'blockchain': 'fas fa-link',
        'iot': 'fas fa-microchip',
        
        // Design & Creative
        'ui-design': 'fas fa-paint-brush',
        'graphic-design': 'fas fa-palette',
        'logo-design': 'fas fa-copyright',
        'web-design': 'fas fa-laptop-code',
        'print-design': 'fas fa-print',
        'illustration': 'fas fa-pencil-alt',
        'animation': 'fas fa-play-circle',
        '3d-design': 'fas fa-cube',
        
        // Content & Writing
        'content-writing': 'fas fa-pen-nib',
        'copywriting': 'fas fa-ad',
        'technical-writing': 'fas fa-file-code',
        'creative-writing': 'fas fa-feather-alt',
        'blogging': 'fas fa-blog',
        'scriptwriting': 'fas fa-film',
        'academic-writing': 'fas fa-graduation-cap',
        
        // Translation & Languages
        'translation': 'fas fa-language',
        'localization': 'fas fa-globe-americas',
        'interpretation': 'fas fa-microphone',
        'proofreading': 'fas fa-spell-check',
        'subtitling': 'fas fa-closed-captioning',
        'voice-over': 'fas fa-volume-up',
        
        // Editing & Production
        'video-editing': 'fas fa-video',
        'audio-editing': 'fas fa-music',
        'photo-editing': 'fas fa-camera',
        'content-editing': 'fas fa-edit',
        'podcast-editing': 'fas fa-podcast',
        'documentary': 'fas fa-file-video',
        
        // Marketing & Business
        'digital-marketing': 'fas fa-chart-line',
        'seo': 'fas fa-search',
        'social-media': 'fas fa-share-alt',
        'branding': 'fas fa-bullseye',
        'consulting': 'fas fa-handshake',
        'market-research': 'fas fa-chart-pie',
        
        // Education & Training
        'course-creation': 'fas fa-chalkboard-teacher',
        'tutoring': 'fas fa-user-graduate',
        'training': 'fas fa-dumbbell',
        'curriculum': 'fas fa-book-open',
        
        // Other
        'research': 'fas fa-microscope',
        'data-analysis': 'fas fa-chart-bar',
        'project-management': 'fas fa-tasks',
        'other': 'fas fa-project-diagram'
    };
    return icons[category] || 'fas fa-project-diagram';
}

// Generate automatic logo for project category
function generateCategoryLogo(category) {
    const categoryIcon = getCategoryIcon(category);
    const categoryName = getCategoryDisplayName(category);
    
    // Define color schemes for different category groups
    const colorSchemes = {
        // Software Development - Blue tones
        'web': { primary: '#007bff', secondary: '#0056b3', accent: '#e3f2fd' },
        'mobile': { primary: '#28a745', secondary: '#1e7e34', accent: '#e8f5e9' },
        'desktop': { primary: '#6f42c1', secondary: '#5a32a3', accent: '#f3e5f5' },
        'ecommerce': { primary: '#fd7e14', secondary: '#e55100', accent: '#fff3e0' },
        'api': { primary: '#20c997', secondary: '#17a2b8', accent: '#e0f7fa' },
        'database': { primary: '#6c757d', secondary: '#495057', accent: '#f8f9fa' },
        'ai': { primary: '#e83e8c', secondary: '#c2185b', accent: '#fce4ec' },
        'game': { primary: '#ff6b35', secondary: '#d84315', accent: '#fff3e0' },
        'blockchain': { primary: '#795548', secondary: '#5d4037', accent: '#efebe9' },
        'iot': { primary: '#607d8b', secondary: '#455a64', accent: '#eceff1' },
        
        // Design & Creative - Colorful tones
        'ui-design': { primary: '#ff5722', secondary: '#d84315', accent: '#fff3e0' },
        'graphic-design': { primary: '#9c27b0', secondary: '#7b1fa2', accent: '#f3e5f5' },
        'logo-design': { primary: '#ff9800', secondary: '#f57c00', accent: '#fff8e1' },
        'web-design': { primary: '#3f51b5', secondary: '#303f9f', accent: '#e8eaf6' },
        'print-design': { primary: '#795548', secondary: '#5d4037', accent: '#efebe9' },
        'illustration': { primary: '#e91e63', secondary: '#c2185b', accent: '#fce4ec' },
        'animation': { primary: '#ff5722', secondary: '#d84315', accent: '#fff3e0' },
        '3d-design': { primary: '#607d8b', secondary: '#455a64', accent: '#eceff1' },
        
        // Content & Writing - Warm tones
        'content-writing': { primary: '#ff6f00', secondary: '#e65100', accent: '#fff8e1' },
        'copywriting': { primary: '#f44336', secondary: '#d32f2f', accent: '#ffebee' },
        'technical-writing': { primary: '#2196f3', secondary: '#1976d2', accent: '#e3f2fd' },
        'creative-writing': { primary: '#9c27b0', secondary: '#7b1fa2', accent: '#f3e5f5' },
        'blogging': { primary: '#4caf50', secondary: '#388e3c', accent: '#e8f5e9' },
        'scriptwriting': { primary: '#ff9800', secondary: '#f57c00', accent: '#fff8e1' },
        'academic-writing': { primary: '#3f51b5', secondary: '#303f9f', accent: '#e8eaf6' },
        
        // Translation & Languages - Global tones
        'translation': { primary: '#00bcd4', secondary: '#0097a7', accent: '#e0f7fa' },
        'localization': { primary: '#009688', secondary: '#00695c', accent: '#e0f2f1' },
        'interpretation': { primary: '#ff5722', secondary: '#d84315', accent: '#fff3e0' },
        'proofreading': { primary: '#795548', secondary: '#5d4037', accent: '#efebe9' },
        'subtitling': { primary: '#607d8b', secondary: '#455a64', accent: '#eceff1' },
        'voice-over': { primary: '#e91e63', secondary: '#c2185b', accent: '#fce4ec' },
        
        // Editing & Production - Media tones
        'video-editing': { primary: '#f44336', secondary: '#d32f2f', accent: '#ffebee' },
        'audio-editing': { primary: '#9c27b0', secondary: '#7b1fa2', accent: '#f3e5f5' },
        'photo-editing': { primary: '#ff9800', secondary: '#f57c00', accent: '#fff8e1' },
        'content-editing': { primary: '#4caf50', secondary: '#388e3c', accent: '#e8f5e9' },
        'podcast-editing': { primary: '#673ab7', secondary: '#512da8', accent: '#ede7f6' },
        'documentary': { primary: '#795548', secondary: '#5d4037', accent: '#efebe9' },
        
        // Marketing & Business - Professional tones
        'digital-marketing': { primary: '#2196f3', secondary: '#1976d2', accent: '#e3f2fd' },
        'seo': { primary: '#4caf50', secondary: '#388e3c', accent: '#e8f5e9' },
        'social-media': { primary: '#e91e63', secondary: '#c2185b', accent: '#fce4ec' },
        'branding': { primary: '#ff5722', secondary: '#d84315', accent: '#fff3e0' },
        'consulting': { primary: '#607d8b', secondary: '#455a64', accent: '#eceff1' },
        'market-research': { primary: '#ff9800', secondary: '#f57c00', accent: '#fff8e1' },
        
        // Education & Training - Academic tones
        'course-creation': { primary: '#3f51b5', secondary: '#303f9f', accent: '#e8eaf6' },
        'tutoring': { primary: '#4caf50', secondary: '#388e3c', accent: '#e8f5e9' },
        'training': { primary: '#ff5722', secondary: '#d84315', accent: '#fff3e0' },
        'curriculum': { primary: '#795548', secondary: '#5d4037', accent: '#efebe9' },
        
        // Other - Neutral tones
        'research': { primary: '#607d8b', secondary: '#455a64', accent: '#eceff1' },
        'data-analysis': { primary: '#2196f3', secondary: '#1976d2', accent: '#e3f2fd' },
        'project-management': { primary: '#ff9800', secondary: '#f57c00', accent: '#fff8e1' },
        'other': { primary: '#6c757d', secondary: '#495057', accent: '#f8f9fa' }
    };
    
    const colors = colorSchemes[category] || colorSchemes['other'];
    
    // Create enhanced SVG logo with modern design
    const svgLogo = `
        <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Main gradient -->
                <linearGradient id="grad-${category}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
                    <stop offset="50%" style="stop-color:${colors.secondary};stop-opacity:0.9" />
                    <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:0.8" />
                </linearGradient>
                
                <!-- Background pattern gradient -->
                <radialGradient id="bg-grad-${category}" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:0.1" />
                </radialGradient>
                
                <!-- Icon background gradient -->
                <radialGradient id="icon-grad-${category}" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:white;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${colors.accent};stop-opacity:0.95" />
                </radialGradient>
                
                <!-- Enhanced shadow filter -->
                <filter id="shadow-${category}" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="${colors.secondary}" flood-opacity="0.25"/>
                    <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${colors.primary}" flood-opacity="0.15"/>
                </filter>
                
                <!-- Glow effect -->
                <filter id="glow-${category}" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                
                <!-- Pattern for texture -->
                <pattern id="pattern-${category}" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="15" cy="15" r="1.5" fill="${colors.primary}" fill-opacity="0.08"/>
                    <circle cx="5" cy="5" r="0.8" fill="${colors.secondary}" fill-opacity="0.05"/>
                    <circle cx="25" cy="25" r="0.8" fill="${colors.secondary}" fill-opacity="0.05"/>
                </pattern>
            </defs>
            
            <!-- Background with gradient and pattern -->
            <rect width="300" height="200" fill="url(#bg-grad-${category})" rx="20"/>
            <rect width="300" height="200" fill="url(#pattern-${category})" rx="20"/>
            
            <!-- Decorative background shapes -->
            <circle cx="60" cy="60" r="40" fill="${colors.primary}" fill-opacity="0.08" filter="url(#shadow-${category})"/>
            <circle cx="240" cy="140" r="35" fill="${colors.secondary}" fill-opacity="0.06"/>
            <ellipse cx="280" cy="50" rx="20" ry="30" fill="${colors.primary}" fill-opacity="0.05"/>
            
            <!-- Main icon container with enhanced styling -->
            <circle cx="150" cy="80" r="50" fill="${colors.secondary}" fill-opacity="0.15" filter="url(#shadow-${category})"/>
            <circle cx="150" cy="78" r="42" fill="url(#grad-${category})" filter="url(#shadow-${category})"/>
            <circle cx="150" cy="78" r="35" fill="url(#icon-grad-${category})"/>
            
            <!-- Icon with glow effect -->
            <text x="150" y="88" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${colors.primary}" filter="url(#glow-${category})">
                ${getFontAwesomeUnicode(categoryIcon)}
            </text>
            
            <!-- Category name with enhanced typography -->
            <text x="150" y="145" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${colors.primary}" filter="url(#shadow-${category})">
                ${categoryName}
            </text>
            
            <!-- Subtitle line -->
            <text x="150" y="160" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="${colors.secondary}" opacity="0.8">
                مشروع احترافي
            </text>
            
            <!-- Enhanced decorative elements -->
            <circle cx="90" cy="170" r="4" fill="${colors.primary}" opacity="0.4"/>
            <circle cx="210" cy="170" r="4" fill="${colors.primary}" opacity="0.4"/>
            <circle cx="110" cy="30" r="3" fill="${colors.secondary}" opacity="0.5"/>
            <circle cx="190" cy="30" r="3" fill="${colors.secondary}" opacity="0.5"/>
            
            <!-- Modern accent lines -->
            <rect x="40" y="175" width="220" height="3" fill="url(#grad-${category})" rx="2" opacity="0.6"/>
            <rect x="60" y="180" width="180" height="1" fill="${colors.primary}" rx="1" opacity="0.4"/>
            
            <!-- Corner decorative elements -->
            <path d="M 20 20 Q 20 15 25 15 L 35 15" stroke="${colors.primary}" stroke-width="2" fill="none" opacity="0.3"/>
            <path d="M 280 180 Q 280 185 275 185 L 265 185" stroke="${colors.primary}" stroke-width="2" fill="none" opacity="0.3"/>
            
            <!-- Floating particles effect -->
            <circle cx="70" cy="100" r="1.5" fill="${colors.secondary}" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="230" cy="120" r="1" fill="${colors.primary}" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="50" cy="140" r="1.2" fill="${colors.secondary}" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="5s" repeatCount="indefinite"/>
            </circle>
        </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgLogo)))}`;
}

// Get Font Awesome Unicode for SVG
function getFontAwesomeUnicode(iconClass) {
    const unicodeMap = {
        'fas fa-globe': '🌐',
        'fas fa-mobile-alt': '📱',
        'fas fa-desktop': '🖥️',
        'fas fa-shopping-cart': '🛒',
        'fas fa-server': '🖥️',
        'fas fa-database': '🗄️',
        'fas fa-robot': '🤖',
        'fas fa-gamepad': '🎮',
        'fas fa-link': '🔗',
        'fas fa-microchip': '💾',
        'fas fa-paint-brush': '🎨',
        'fas fa-palette': '🎨',
        'fas fa-copyright': '©️',
        'fas fa-laptop-code': '💻',
        'fas fa-print': '🖨️',
        'fas fa-pencil-alt': '✏️',
        'fas fa-play-circle': '▶️',
        'fas fa-cube': '📦',
        'fas fa-pen-nib': '✒️',
        'fas fa-ad': '📢',
        'fas fa-file-code': '📄',
        'fas fa-feather-alt': '🪶',
        'fas fa-blog': '📝',
        'fas fa-film': '🎬',
        'fas fa-graduation-cap': '🎓',
        'fas fa-language': '🌍',
        'fas fa-globe-americas': '🌎',
        'fas fa-microphone': '🎤',
        'fas fa-spell-check': '✅',
        'fas fa-closed-captioning': '📺',
        'fas fa-volume-up': '🔊',
        'fas fa-video': '📹',
        'fas fa-music': '🎵',
        'fas fa-camera': '📷',
        'fas fa-edit': '✏️',
        'fas fa-podcast': '🎙️',
        'fas fa-file-video': '📹',
        'fas fa-chart-line': '📈',
        'fas fa-search': '🔍',
        'fas fa-share-alt': '📤',
        'fas fa-bullseye': '🎯',
        'fas fa-handshake': '🤝',
        'fas fa-chart-pie': '📊',
        'fas fa-chalkboard-teacher': '👨‍🏫',
        'fas fa-user-graduate': '👨‍🎓',
        'fas fa-dumbbell': '🏋️',
        'fas fa-book-open': '📖',
        'fas fa-microscope': '🔬',
        'fas fa-chart-bar': '📊',
        'fas fa-tasks': '📋',
        'fas fa-project-diagram': '📋'
    };
    
    return unicodeMap[iconClass] || '📋';
}

// Create Portfolio Item
function createPortfolioItem(data, tags) {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const portfolioItems = portfolioGrid.querySelectorAll('.portfolio-item');
    const newIndex = portfolioItems.length;
    
    const newItem = document.createElement('div');
    newItem.className = 'portfolio-item fade-in loading';
    
    // Add staggered animation delay
    const animationDelay = (newIndex % 6) * 0.1;
    newItem.style.animationDelay = `${animationDelay}s`;
    
    // Get category icon
    const categoryIcon = getCategoryIcon(data.category);
    
    // Add loading shimmer effect initially
    setTimeout(() => {
        newItem.classList.remove('loading');
    }, 500);
    
    // Determine image content with category badge
    const imageContent = data.image 
        ? `<img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
           <div class="portfolio-category-badge">
               <i class="${categoryIcon}"></i>
           </div>`
        : `<img src="${generateCategoryLogo(data.category)}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
           <div class="portfolio-category-badge">
               <i class="${categoryIcon}"></i>
           </div>`;
    
    newItem.innerHTML = `
        <div class="portfolio-image" ${data.link ? `onclick="window.open('${data.link}', '_blank')" style="cursor: pointer;"` : ''}>
            ${imageContent}
            ${data.link ? '<div class="portfolio-link-overlay"><i class="fas fa-external-link-alt"></i></div>' : ''}
        </div>
        <div class="portfolio-content">
            <h4>${data.title}</h4>
            <p>${data.description}</p>
            <div class="portfolio-meta">
                <span class="portfolio-category">
                    <i class="${categoryIcon}"></i>
                    ${getCategoryDisplayName(data.category)}
                </span>
            </div>
            <div class="portfolio-tags">
                ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="portfolio-stats">
                <div class="stat-item">
                    <i class="fas fa-eye"></i>
                    <span>0 مشاهدة</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-heart"></i>
                    <span>0 إعجاب</span>
                </div>
            </div>
            <div class="portfolio-actions">
                <button class="portfolio-action-btn view" onclick="viewPortfolioItem(${newIndex})">
                    <i class="fas fa-eye"></i>
                    عرض
                </button>
                <button class="portfolio-action-btn edit" onclick="editPortfolioItem(${newIndex})">
                    <i class="fas fa-edit"></i>
                    تعديل
                </button>
                <button class="portfolio-action-btn delete" onclick="deletePortfolioItem(${newIndex})">
                    <i class="fas fa-trash"></i>
                    حذف
                </button>
            </div>
        </div>
    `;
    
    portfolioGrid.appendChild(newItem);
    
    // Add entrance animation
    setTimeout(() => {
        newItem.style.transform = 'scale(1)';
        newItem.style.opacity = '1';
    }, 100);
}

// View Portfolio Item
function viewPortfolioItem(index) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const item = portfolioItems[index];
    
    if (!item) return;
    
    const title = item.querySelector('h4').textContent;
    const description = item.querySelector('p').textContent;
    const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent);
    
    // Create modal for viewing portfolio item
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="portfolio-modal-content" style="
            background: var(--light-card);
            border-radius: 20px;
            padding: 30px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        ">
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="color: var(--light-text); margin: 0;">${title}</h3>
                <button onclick="closePortfolioModal()" style="background: none; border: none; font-size: 1.5rem; color: #666; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p style="color: var(--light-text); line-height: 1.6; margin-bottom: 20px;">${description}</p>
                <div class="portfolio-tags" style="margin-bottom: 20px;">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="portfolio-actions" style="display: flex; gap: 10px; justify-content: center;">
                    <button class="btn btn-primary" onclick="editPortfolioItem(${index}); closePortfolioModal();">
                        <i class="fas fa-edit"></i>
                        تعديل المشروع
                    </button>
                    <button class="btn btn-secondary" onclick="closePortfolioModal();">
                        <i class="fas fa-times"></i>
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.portfolio-modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePortfolioModal();
        }
    });
}

// Close Portfolio Modal
function closePortfolioModal() {
    const modal = document.querySelector('.portfolio-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.portfolio-modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Edit Portfolio Item
function editPortfolioItem(index) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const item = portfolioItems[index];
    
    if (!item) return;
    
    const title = item.querySelector('h4').textContent;
    const description = item.querySelector('p').textContent;
    const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent);
    
    // Create edit modal
    const modal = document.createElement('div');
    modal.className = 'portfolio-edit-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="portfolio-edit-content" style="
            background: var(--light-card);
            border-radius: 20px;
            padding: 30px;
            max-width: 700px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        ">
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="color: var(--light-text); margin: 0;">تعديل المشروع</h3>
                <button onclick="closeEditModal()" style="background: none; border: none; font-size: 1.5rem; color: #666; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--light-text); font-weight: 600;">عنوان المشروع</label>
                    <input type="text" id="editTitle" value="${title}" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-family: 'Cairo', sans-serif;">
                </div>
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--light-text); font-weight: 600;">وصف المشروع</label>
                    <textarea id="editDescription" rows="4" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-family: 'Cairo', sans-serif; resize: vertical;">${description}</textarea>
                </div>
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; color: var(--light-text); font-weight: 600;">التقنيات المستخدمة (مفصولة بفاصلة)</label>
                    <input type="text" id="editTags" value="${tags.join(', ')}" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-family: 'Cairo', sans-serif;">
                </div>
                <div class="portfolio-actions" style="display: flex; gap: 10px; justify-content: center;">
                    <button class="btn btn-primary" onclick="savePortfolioEdit(${index})">
                        <i class="fas fa-save"></i>
                        حفظ التغييرات
                    </button>
                    <button class="btn btn-secondary" onclick="closeEditModal()">
                        <i class="fas fa-times"></i>
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.portfolio-edit-content').style.transform = 'scale(1)';
    }, 10);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeEditModal();
        }
    });
}

// Close Edit Modal
function closeEditModal() {
    const modal = document.querySelector('.portfolio-edit-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.portfolio-edit-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Save Portfolio Edit
function savePortfolioEdit(index) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const item = portfolioItems[index];
    
    if (!item) return;
    
    const newTitle = document.getElementById('editTitle').value.trim();
    const newDescription = document.getElementById('editDescription').value.trim();
    const newTags = document.getElementById('editTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    if (!newTitle || !newDescription) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // Update the item
    item.querySelector('h4').textContent = newTitle;
    item.querySelector('p').textContent = newDescription;
    
    const tagsContainer = item.querySelector('.portfolio-tags');
    tagsContainer.innerHTML = newTags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Add update animation
    item.style.animation = 'pulse 0.6s ease';
    
    closeEditModal();
    showNotification('تم تحديث المشروع بنجاح', 'success');
}

// Delete Portfolio Item
function deletePortfolioItem(index) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const item = portfolioItems[index];
    
    if (!item) return;
    
    const title = item.querySelector('h4').textContent;
    
    // Create confirmation modal
    const modal = document.createElement('div');
    modal.className = 'portfolio-delete-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="portfolio-delete-content" style="
            background: var(--light-card);
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        ">
            <div class="delete-icon" style="margin-bottom: 20px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--danger-color);"></i>
            </div>
            <h3 style="color: var(--light-text); margin-bottom: 15px;">تأكيد الحذف</h3>
            <p style="color: var(--light-text); margin-bottom: 25px;">هل أنت متأكد من حذف المشروع "${title}"؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div class="portfolio-actions" style="display: flex; gap: 10px; justify-content: center;">
                <button class="btn btn-danger" onclick="confirmDeletePortfolio(${index})">
                    <i class="fas fa-trash"></i>
                    حذف المشروع
                </button>
                <button class="btn btn-secondary" onclick="closeDeleteModal()">
                    <i class="fas fa-times"></i>
                    إلغاء
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.portfolio-delete-content').style.transform = 'scale(1)';
    }, 10);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDeleteModal();
        }
    });
}

// Close Delete Modal
function closeDeleteModal() {
    const modal = document.querySelector('.portfolio-delete-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.portfolio-delete-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Confirm Delete Portfolio
function confirmDeletePortfolio(index) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const item = portfolioItems[index];
    
    if (!item) return;
    
    // Add exit animation
    item.style.animation = 'slideOutUp 0.5s ease';
    item.style.transform = 'scale(0.8)';
    item.style.opacity = '0';
    
    setTimeout(() => {
        item.remove();
        updatePortfolioIndices();
    }, 500);
    
    closeDeleteModal();
    showNotification('تم حذف المشروع بنجاح', 'success');
}

// Update Portfolio Indices
function updatePortfolioIndices() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        const actions = item.querySelectorAll('.portfolio-action-btn');
        actions.forEach(action => {
            const onclick = action.getAttribute('onclick');
            if (onclick) {
                const newOnclick = onclick.replace(/\(\d+\)/, `(${index})`);
                action.setAttribute('onclick', newOnclick);
            }
        });
    });
}

// Enhanced Notification System
function showNotification(message, type = 'success', duration = 5000) {
    // Remove existing notifications of the same type for real-time updates
    const existingNotifications = document.querySelectorAll('.notification');
    if (duration < 3000) { // For quick notifications, only remove similar ones
        existingNotifications.forEach(notification => {
            if (notification.classList.contains(type)) {
                notification.remove();
            }
        });
    } else {
        existingNotifications.forEach(notification => notification.remove());
    }
    
    // Create notification element with enhanced styling
    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    
    // Adjust styling for quick notifications
    const isQuick = duration < 3000;
    const padding = isQuick ? '8px 12px' : '16px 20px';
    const fontSize = isQuick ? '0.9rem' : '1rem';
    
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--light-card);
        border-radius: 12px;
        box-shadow: var(--shadow);
        padding: ${padding};
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 2000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border-left: 4px solid ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
        font-size: ${fontSize};
    `;
    
    if (document.body.classList.contains('dark-mode')) {
        notification.style.background = 'var(--dark-card)';
        notification.style.boxShadow = 'var(--dark-shadow)';
    }
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    const iconColor = type === 'success' ? 'var(--success-color)' : 'var(--danger-color)';
    
    notification.innerHTML = `
        <div class="notification-content" style="display: flex; align-items: center; gap: 12px; flex: 1;">
            <i class="notification-icon ${icon}" style="color: ${iconColor}; font-size: 1.2rem;"></i>
            <span class="notification-message" style="color: var(--light-text); font-weight: 500;">${message}</span>
        </div>
        ${!isQuick ? '<button class="notification-close" onclick="this.parentElement.remove()" style="background: none; border: none; color: #666; cursor: pointer; padding: 4px; border-radius: 4px; transition: color 0.3s ease;"><i class="fas fa-times"></i></button>' : ''}
    `;
    
    if (document.body.classList.contains('dark-mode')) {
        notification.querySelector('.notification-message').style.color = 'var(--dark-text)';
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) closeBtn.style.color = '#ccc';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after specified duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 400);
        }
    }, duration);
}

// Enhanced Mobile Navigation
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    // hamburger.classList.toggle('active'); // Handled by shared navigation
    
    // Add slide animation
    if (navMenu.classList.contains('active')) {
        navMenu.style.animation = 'slideInDown 0.3s ease';
    }
}

// Enhanced Fade-in Animations
function initializeFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.animation = 'fadeInUp 0.6s ease';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Enhanced Form Validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--danger-color)';
            input.style.animation = 'shake 0.5s ease';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--primary-color)';
            input.style.animation = '';
        }
    });
    
    return isValid;
}

// Enhanced Hover Effects
function initializeHoverEffects() {
    const cards = document.querySelectorAll('.profile-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Enhanced Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Enhanced Post Management Functions
function showCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Initialize character counter
    const postContent = document.getElementById('postContent');
    const charCount = document.getElementById('charCount');
    
    postContent.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        
        if (length > 450) {
            charCount.style.color = 'var(--warning-color)';
        } else if (length > 400) {
            charCount.style.color = 'var(--danger-color)';
        } else {
            charCount.style.color = 'var(--light-text)';
        }
    });
    
    // Initialize image upload
    const imageUpload = document.getElementById('postImageUpload');
    const imageInput = document.getElementById('postImageInput');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    
    imageUpload.addEventListener('click', () => imageInput.click());
    
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                imageUpload.style.display = 'none';
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
}

function closeCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('postContent').value = '';
    document.getElementById('charCount').textContent = '0';
    document.getElementById('postImageInput').value = '';
    document.getElementById('postImageUpload').style.display = 'block';
    document.getElementById('imagePreview').style.display = 'none';
}

function createPost() {
    const postContent = document.getElementById('postContent');
    const postImage = document.getElementById('postImageInput');
    const postPrivacy = document.getElementById('postPrivacy');
    const createBtn = document.querySelector('#createPostModal .btn-primary');
    const btnText = createBtn.querySelector('.btn-text');
    const btnLoading = createBtn.querySelector('.btn-loading');
    
    if (!postContent.value.trim()) {
        showNotification('يرجى كتابة محتوى للمنشور', 'error');
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    createBtn.disabled = true;
    
    // Simulate post creation
    setTimeout(() => {
        const postsList = document.getElementById('postsList');
        const newPost = document.createElement('div');
        newPost.className = 'post-item fade-in';
        newPost.style.animation = 'slideInUp 0.5s ease';
        
        const currentTime = new Date();
        const timeAgo = getTimeAgo(currentTime);
        
        let postHTML = `
            <div class="post-header">
                <div class="post-user-info">
                    <div class="post-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="post-details">
                        <h5>أحمد محمد سعيد</h5>
                        <span class="post-time">${timeAgo}</span>
                    </div>
                </div>
                <div class="post-privacy">
                    <i class="fas fa-${postPrivacy.value === 'public' ? 'globe' : postPrivacy.value === 'friends' ? 'users' : 'lock'}"></i>
                </div>
            </div>
            <div class="post-content">
                <p>${postContent.value}</p>
        `;
        
        // Add image if uploaded
        if (postImage.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                postHTML += `
                    <div class="post-image">
                        <img src="${e.target.result}" alt="Post Image" loading="lazy">
                    </div>
                `;
                completePostCreation(newPost, postHTML);
            };
            reader.readAsDataURL(postImage.files[0]);
        } else {
            completePostCreation(newPost, postHTML);
        }
        
        function completePostCreation(newPost, postHTML) {
            postHTML += `
                </div>
                <div class="post-actions">
                    <button class="action-btn" onclick="toggleLike(this)">
                        <i class="far fa-heart"></i>
                        <span>0</span>
                    </button>
                    <button class="action-btn" onclick="toggleComments(this)">
                        <i class="far fa-comment"></i>
                        <span>0</span>
                    </button>
                    <button class="action-btn" onclick="sharePost(this)">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
                <div class="comments-section" style="display: none;">
                    <div class="comment-input">
                        <input type="text" placeholder="اكتب تعليقك..." onkeypress="handleCommentKeypress(event, this)">
                        <button onclick="addComment(this)">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            `;
            
            newPost.innerHTML = postHTML;
            postsList.insertBefore(newPost, postsList.firstChild);
            
            // Reset form and close modal
            closeCreatePostModal();
            
            // Reset button
            btnText.style.display = 'flex';
            btnLoading.style.display = 'none';
            createBtn.disabled = false;
            
            showNotification('تم نشر المنشور بنجاح!', 'success');
        }
    }, 1500);
}

function removePostImage() {
    document.getElementById('postImageInput').value = '';
    document.getElementById('postImageUpload').style.display = 'block';
    document.getElementById('imagePreview').style.display = 'none';
}

// Enhanced Post Interaction Functions
function toggleLike(button) {
    const icon = button.querySelector('i');
    const countSpan = button.querySelector('span');
    let count = parseInt(countSpan.textContent);
    
    // Add visual feedback
    button.style.animation = 'bounce 0.3s ease';
    
    if (icon.classList.contains('far')) {
        // Like the post
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c';
        count++;
        button.classList.add('liked');
        
        // Add heart animation
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: 2rem;
            pointer-events: none;
            animation: heartFloat 1s ease-out forwards;
            z-index: 1000;
        `;
        button.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
        
        showNotification('تم الإعجاب بالمنشور!', 'success');
    } else {
        // Unlike the post
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        count--;
        button.classList.remove('liked');
        
        showNotification('تم إلغاء الإعجاب بالمنشور', 'success');
    }
    
    countSpan.textContent = count;
    
    setTimeout(() => {
        button.style.animation = '';
    }, 300);
}

function toggleComments(button) {
    const postItem = button.closest('.post-item');
    const commentsSection = postItem.querySelector('.comments-section');
    const icon = button.querySelector('i');
    
    if (commentsSection.style.display === 'none') {
        // Show comments
        commentsSection.style.display = 'block';
        commentsSection.style.animation = 'slideInDown 0.3s ease';
        button.style.color = 'var(--primary-color)';
        icon.style.color = 'var(--primary-color)';
        
        // Focus on comment input
        const commentInput = commentsSection.querySelector('.comment-input input');
        if (commentInput) {
            setTimeout(() => {
                commentInput.focus();
            }, 300);
        }
        
        // Add visual feedback
        button.style.animation = 'pulse 0.3s ease';
    } else {
        // Hide comments
        commentsSection.style.display = 'none';
        button.style.color = '';
        icon.style.color = '';
    }
    
    setTimeout(() => {
        button.style.animation = '';
    }, 300);
}

function sharePost(button) {
    const postItem = button.closest('.post-item');
    const postContent = postItem.querySelector('.post-content p').textContent;
    const postImage = postItem.querySelector('.post-image img');
    const postTime = postItem.querySelector('.post-time').textContent;
    const userName = postItem.querySelector('.post-details h5').textContent;
    
    // Add visual feedback
    button.style.animation = 'pulse 0.3s ease';
    
    // Create share data
    const shareData = {
        title: `منشور من ${userName}`,
        text: postContent,
        url: window.location.href
    };
    
    // Try native sharing first
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData).then(() => {
            showNotification('تم مشاركة المنشور بنجاح!', 'success');
        }).catch((error) => {
            console.log('Error sharing:', error);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
    
    function fallbackShare() {
        // Create share modal
        const shareModal = document.createElement('div');
        shareModal.className = 'modal show';
        shareModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const shareContent = `
            <div class="modal-content" style="max-width: 400px; width: 90%;">
                <div class="modal-header">
                    <h3><i class="fas fa-share"></i> مشاركة المنشور</h3>
                    <button class="close-modal" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="share-options">
                        <div class="share-option" onclick="shareToWhatsApp('${encodeURIComponent(postContent)}')">
                            <i class="fab fa-whatsapp"></i>
                            <span>واتساب</span>
                        </div>
                        <div class="share-option" onclick="shareToFacebook('${encodeURIComponent(window.location.href)}')">
                            <i class="fab fa-facebook"></i>
                            <span>فيسبوك</span>
                        </div>
                        <div class="share-option" onclick="shareToTwitter('${encodeURIComponent(postContent)}', '${encodeURIComponent(window.location.href)}')">
                            <i class="fab fa-twitter"></i>
                            <span>تويتر</span>
                        </div>
                        <div class="share-option" onclick="copyPostToClipboard('${postContent}')">
                            <i class="fas fa-copy"></i>
                            <span>نسخ النص</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        shareModal.innerHTML = shareContent;
        document.body.appendChild(shareModal);
        
        // Close modal when clicking outside
        shareModal.addEventListener('click', function(e) {
            if (e.target === shareModal) {
                shareModal.remove();
            }
        });
    }
    
    setTimeout(() => {
        button.style.animation = '';
    }, 300);
}

function handleCommentKeypress(event, input) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        addComment(input);
    }
}

function addComment(input) {
    const commentText = input.value.trim();
    if (!commentText) {
        showNotification('يرجى كتابة تعليق', 'error');
        return;
    }
    
    const commentsSection = input.closest('.comments-section');
    const commentsList = commentsSection.querySelector('.comments-list') || commentsSection;
    
    // Create new comment element
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item fade-in';
    commentItem.style.animation = 'slideInRight 0.3s ease';
    
    // Generate random user for demo
    const demoUsers = [
        { name: 'أحمد محمد سعيد', avatar: 'أ' },
        { name: 'سارة أحمد', avatar: 'س' },
        { name: 'محمد علي', avatar: 'م' },
        { name: 'فاطمة محمود', avatar: 'ف' },
        { name: 'علي أحمد', avatar: 'ع' }
    ];
    const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
    
    commentItem.innerHTML = `
        <div class="comment-avatar">
            <span style="font-size: 0.8rem; font-weight: 600;">${randomUser.avatar}</span>
        </div>
        <div class="comment-content">
            <h6>${randomUser.name}</h6>
            <p>${commentText}</p>
            <small style="color: #666; font-size: 0.7rem;">الآن</small>
        </div>
        <button class="comment-actions" onclick="removeComment(this)" style="background: none; border: none; color: #999; cursor: pointer; padding: 2px; border-radius: 4px; font-size: 0.8rem;">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add comment to the list
    const existingComments = commentsList.querySelectorAll('.comment-item:not(.comment-input)');
    if (existingComments.length > 0) {
        commentsList.insertBefore(commentItem, existingComments[existingComments.length - 1].nextSibling);
    } else {
        commentsList.appendChild(commentItem);
    }
    
    // Clear input
    input.value = '';
    
    // Update comment count
    const commentBtn = commentsSection.closest('.post-item').querySelector('.action-btn:nth-child(2)');
    const countSpan = commentBtn.querySelector('span');
    let count = parseInt(countSpan.textContent);
    countSpan.textContent = count + 1;
    
    // Add success animation
    commentItem.style.animation = 'bounce 0.3s ease';
    
    showNotification('تم إضافة التعليق بنجاح!', 'success');
    
    // Auto-hide comment after 3 seconds if it's the first comment
    if (existingComments.length === 0) {
        setTimeout(() => {
            commentItem.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (commentItem.parentElement) {
                    commentItem.remove();
                    // Reset count
                    countSpan.textContent = Math.max(0, count);
                }
            }, 300);
        }, 3000);
    }
}

function removeComment(button) {
    const commentItem = button.closest('.comment-item');
    const commentsSection = commentItem.closest('.comments-section');
    
    commentItem.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        commentItem.remove();
        
        // Update comment count
        const commentBtn = commentsSection.closest('.post-item').querySelector('.action-btn:nth-child(2)');
        const countSpan = commentBtn.querySelector('span');
        let count = parseInt(countSpan.textContent);
        countSpan.textContent = Math.max(0, count - 1);
        
        showNotification('تم حذف التعليق', 'success');
    }, 300);
}

// Enhanced sharing functions for posts
function shareToWhatsApp(text) {
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
    document.querySelector('.modal.show').remove();
    showNotification('تم فتح واتساب للمشاركة', 'success');
}

function shareToFacebook(url) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    document.querySelector('.modal.show').remove();
    showNotification('تم فتح فيسبوك للمشاركة', 'success');
}

function shareToTwitter(text, url) {
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    document.querySelector('.modal.show').remove();
    showNotification('تم فتح تويتر للمشاركة', 'success');
}

function copyPostToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        document.querySelector('.modal.show').remove();
        showNotification('تم نسخ النص إلى الحافظة', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        document.querySelector('.modal.show').remove();
        showNotification('تم نسخ النص إلى الحافظة', 'success');
    });
}

// Enhanced Sharing Functions for Profile
function showShareModal() {
    const modal = document.getElementById('shareProfileModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeShareModal() {
    const modal = document.getElementById('shareProfileModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function shareToWhatsAppProfile() {
    const profileUrl = window.location.href;
    const text = encodeURIComponent('تحقق من ملفي الشخصي على منصة شغلك!');
    const url = `https://wa.me/?text=${text}%20${encodeURIComponent(profileUrl)}`;
    window.open(url, '_blank');
    closeShareModal();
    showNotification('تم فتح واتساب للمشاركة', 'success');
}

function shareToFacebookProfile() {
    const profileUrl = encodeURIComponent(window.location.href);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${profileUrl}`;
    window.open(url, '_blank', 'width=600,height=400');
    closeShareModal();
    showNotification('تم فتح فيسبوك للمشاركة', 'success');
}

function shareToTwitterProfile() {
    const profileUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('تحقق من ملفي الشخصي على منصة شغلك!');
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${profileUrl}`;
    window.open(url, '_blank', 'width=600,height=400');
    closeShareModal();
    showNotification('تم فتح تويتر للمشاركة', 'success');
}

function shareToLinkedIn() {
    const profileUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('أحمد محمد سعيد - مطور ويب ومطور تطبيقات جوال');
    const summary = encodeURIComponent('تحقق من ملفي الشخصي على منصة شغلك!');
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${profileUrl}&title=${title}&summary=${summary}`;
    window.open(url, '_blank', 'width=600,height=400');
    closeShareModal();
    showNotification('تم فتح لينكد إن للمشاركة', 'success');
}

function copyProfileLink() {
    const profileUrl = window.location.href;
    navigator.clipboard.writeText(profileUrl).then(() => {
        closeShareModal();
        showNotification('تم نسخ رابط الملف الشخصي إلى الحافظة', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = profileUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        closeShareModal();
        showNotification('تم نسخ رابط الملف الشخصي إلى الحافظة', 'success');
    });
}

// Enhanced reaction system
function addReaction(button, reaction) {
    const postItem = button.closest('.post-item');
    const reactionsContainer = postItem.querySelector('.reactions-container') || createReactionsContainer(postItem);
    
    // Add reaction
    const reactionElement = document.createElement('div');
    reactionElement.className = 'reaction-item';
    reactionElement.innerHTML = `
        <span class="reaction-emoji">${reaction}</span>
        <span class="reaction-count">1</span>
    `;
    
    reactionsContainer.appendChild(reactionElement);
    
    // Add animation
    reactionElement.style.animation = 'bounce 0.3s ease';
    
    showNotification(`تم إضافة رد الفعل ${reaction}`, 'success');
    
    setTimeout(() => {
        reactionElement.style.animation = '';
    }, 300);
}

function createReactionsContainer(postItem) {
    const reactionsContainer = document.createElement('div');
    reactionsContainer.className = 'reactions-container';
    reactionsContainer.style.cssText = `
        display: flex;
        gap: 10px;
        margin-top: 10px;
        padding: 8px;
        background: var(--light-bg);
        border-radius: 20px;
        flex-wrap: wrap;
    `;
    
    if (document.body.classList.contains('dark-mode')) {
        reactionsContainer.style.background = 'var(--dark-bg)';
    }
    
    postItem.appendChild(reactionsContainer);
    return reactionsContainer;
}

// Enhanced CSS animations for reactions
const reactionStyles = `
    @keyframes heartFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        50% {
            opacity: 0.8;
            transform: translateY(-20px) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.8);
        }
    }
    
    .reaction-item {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.8rem;
    }
    
    .reaction-item:hover {
        background: rgba(102, 126, 234, 0.2);
        transform: scale(1.05);
    }
    
    .reaction-emoji {
        font-size: 1rem;
    }
    
    .reaction-count {
        font-weight: 600;
        color: var(--primary-color);
    }
    
    .comment-actions {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .comment-item:hover .comment-actions {
        opacity: 1;
    }
    
    .comment-actions:hover {
        color: var(--danger-color) !important;
        background: rgba(220, 53, 69, 0.1) !important;
    }
`;

// Add the reaction styles to the document
const reactionStyleElement = document.createElement('style');
reactionStyleElement.textContent = reactionStyles;
document.head.appendChild(reactionStyleElement);

// Utility Functions
function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
        return 'الآن';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `منذ ${minutes} دقيقة`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `منذ ${hours} ساعة`;
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `منذ ${days} يوم`;
    }
}

// Enhanced Photo Upload Functions
function uploadProfilePhoto() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('حجم الصورة يجب أن يكون أقل من 5 ميجابايت', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const profileAvatar = document.querySelector('.profile-avatar');
                profileAvatar.innerHTML = `
                    <img src="${e.target.result}" alt="Profile Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                    <div class="avatar-overlay">
                        <i class="fas fa-camera"></i>
                    </div>
                `;
                
                showNotification('تم تحديث الصورة الشخصية بنجاح!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

// Enhanced CSS for new features
const additionalStyles = `
    .share-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 15px;
        padding: 20px 0;
    }
    
    .share-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 20px;
        border-radius: 12px;
        background: var(--light-bg);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }
    
    body.dark-mode .share-option {
        background: var(--dark-bg);
    }
    
    .share-option:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow);
        background: rgba(102, 126, 234, 0.1);
    }
    
    .share-option i {
        font-size: 2rem;
        color: var(--primary-color);
    }
    
    .share-option span {
        font-weight: 600;
        color: var(--light-text);
    }
    
    body.dark-mode .share-option span {
        color: var(--dark-text);
    }
    
    .post-item {
        background: var(--light-card);
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: var(--shadow);
        transition: all 0.3s ease;
    }
    
    body.dark-mode .post-item {
        background: var(--dark-card);
        box-shadow: var(--dark-shadow);
    }
    
    .post-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
    }
    
    .post-user-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .post-avatar {
        width: 40px;
        height: 40px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1rem;
    }
    
    .post-details h5 {
        color: var(--light-text);
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 2px;
    }
    
    body.dark-mode .post-details h5 {
        color: var(--dark-text);
    }
    
    .post-time {
        color: #666;
        font-size: 0.8rem;
    }
    
    body.dark-mode .post-time {
        color: #ccc;
    }
    
    .post-privacy {
        color: #666;
        font-size: 0.9rem;
    }
    
    body.dark-mode .post-privacy {
        color: #ccc;
    }
    
    .post-content p {
        color: var(--light-text);
        line-height: 1.6;
        margin-bottom: 15px;
    }
    
    body.dark-mode .post-content p {
        color: var(--dark-text);
    }
    
    .post-image {
        margin-bottom: 15px;
        border-radius: 12px;
        overflow: hidden;
    }
    
    .post-image img {
        width: 100%;
        height: auto;
        display: block;
    }
    
    .post-actions {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
    }
    
    .action-btn {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 8px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 0.9rem;
    }
    
    body.dark-mode .action-btn {
        color: #ccc;
    }
    
    .action-btn:hover {
        background: rgba(102, 126, 234, 0.1);
        color: var(--primary-color);
        transform: translateY(-1px);
    }
    
    .comments-section {
        border-top: 1px solid var(--light-border);
        padding-top: 15px;
        margin-top: 15px;
    }
    
    body.dark-mode .comments-section {
        border-top-color: var(--dark-border);
    }
    
    .comment-item {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }
    
    .comment-avatar {
        width: 30px;
        height: 30px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.8rem;
        flex-shrink: 0;
    }
    
    .comment-content h6 {
        color: var(--light-text);
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 3px;
    }
    
    body.dark-mode .comment-content h6 {
        color: var(--dark-text);
    }
    
    .comment-content p {
        color: var(--light-text);
        font-size: 0.9rem;
        line-height: 1.4;
        margin: 0;
    }
    
    body.dark-mode .comment-content p {
        color: var(--dark-text);
    }
    
    .comment-input {
        display: flex;
        gap: 10px;
        margin-top: 15px;
    }
    
    .comment-input input {
        flex: 1;
        padding: 8px 12px;
        border: 2px solid var(--light-border);
        border-radius: 8px;
        background: var(--light-card);
        color: var(--light-text);
        font-family: 'Cairo', sans-serif;
        font-size: 0.9rem;
    }
    
    body.dark-mode .comment-input input {
        border-color: var(--dark-border);
        background: var(--dark-card);
        color: var(--dark-text);
    }
    
    .comment-input input:focus {
        outline: none;
        border-color: var(--primary-color);
    }
    
    .comment-input button {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .comment-input button:hover {
        background: var(--secondary-color);
        transform: translateY(-1px);
    }
    
    .char-counter {
        text-align: left;
        font-size: 0.8rem;
        color: #666;
        margin-top: 5px;
    }
    
    body.dark-mode .char-counter {
        color: #ccc;
    }
    
    .image-upload-area {
        border: 2px dashed var(--light-border);
        border-radius: 12px;
        padding: 30px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        background: var(--light-bg);
    }
    
    body.dark-mode .image-upload-area {
        border-color: var(--dark-border);
        background: var(--dark-bg);
    }
    
    .image-upload-area:hover {
        border-color: var(--primary-color);
        background: rgba(102, 126, 234, 0.05);
    }
    
    .image-preview {
        position: relative;
        margin-top: 15px;
    }
    
    .image-preview img {
        width: 100%;
        max-height: 200px;
        object-fit: cover;
        border-radius: 12px;
    }
    
    .remove-image-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 0, 0, 0.8);
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .remove-image-btn:hover {
        background: rgba(255, 0, 0, 1);
        transform: scale(1.1);
    }
    
    .post-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .post-form .form-group {
        margin-bottom: 0;
    }
    
    .post-form select {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid var(--light-border);
        border-radius: 12px;
        background: var(--light-card);
        color: var(--light-text);
        font-family: 'Cairo', sans-serif;
        font-size: 1rem;
        transition: all 0.3s ease;
    }
    
    body.dark-mode .post-form select {
        border-color: var(--dark-border);
        background: var(--dark-card);
        color: var(--dark-text);
    }
    
    .post-form select:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

// Add the additional styles to the document
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement);

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load saved profile data
    loadProfileData();
    
    // Initialize user type selector
    initializeUserTypeSelector();
    
    // Initialize real-time profile saving
    initializeRealTimeProfileSaving();
    
    initTheme();
    initStarRating();
    animateStats();
    initializeFadeInAnimations();
    initializeHoverEffects();
    animateSkills();
    initializePortfolioAnimations();
    
    // Edit Profile Button
    editProfileBtn.addEventListener('click', toggleEditProfile);
    
    // Verification modal
    closeVerificationModalBtn.addEventListener('click', closeVerificationModalFunc);
    prevStepBtn.addEventListener('click', prevStep);
    nextStepBtn.addEventListener('click', nextStep);
    submitVerificationBtn.addEventListener('click', submitVerification);
    
    // File uploads with enhanced drag and drop
    idUpload.addEventListener('change', (e) => handleFileUpload(e.target, 'idUploadArea'));
    photoUpload.addEventListener('change', (e) => handleFileUpload(e.target, 'photoUploadArea'));
    
    // Upload area clicks
    document.getElementById('idUploadArea').addEventListener('click', () => idUpload.click());
    document.getElementById('photoUploadArea').addEventListener('click', () => photoUpload.click());
    
    // Enhanced drag and drop
    const uploadAreas = document.querySelectorAll('.upload-area');
    uploadAreas.forEach(area => {
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('dragover');
        });
        
        area.addEventListener('dragleave', () => {
            area.classList.remove('dragover');
        });
        
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const input = area.querySelector('input[type="file"]');
                input.files = files;
                handleFileUpload(input, area.id);
            }
        });
    });
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu
    if (hamburger) {
        // hamburger.addEventListener('click', toggleMobileMenu); // Handled by shared navigation
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamburger) {
                    // hamburger.classList.remove('active'); // Handled by shared navigation
                }
            }
        });
    });
    
    // Close modal when clicking outside
    if (verificationModal) {
        verificationModal.addEventListener('click', function(e) {
            if (e.target === verificationModal) {
                closeVerificationModalFunc();
            }
        });
    }
    
    // Share profile button
    const shareProfileBtn = document.querySelector('.share-profile-btn');
    if (shareProfileBtn) {
        shareProfileBtn.addEventListener('click', showShareModal);
    }
    
    // Close share modal when clicking outside
    const shareProfileModal = document.getElementById('shareProfileModal');
    if (shareProfileModal) {
        shareProfileModal.addEventListener('click', function(e) {
            if (e.target === shareProfileModal) {
                closeShareModal();
            }
        });
    }
    
    // Profile avatar click for photo upload
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) {
        profileAvatar.addEventListener('click', uploadProfilePhoto);
    }
    
    // Enhanced form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            }
        });
    });
    
    // Add enhanced CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInDown {
            from { transform: translateY(-30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.8); }
        }
        
        .skill-input {
            width: 100%;
            padding: 8px 12px;
            border: 2px solid var(--primary-color);
            border-radius: 8px;
            background: var(--light-card);
            color: var(--light-text);
            font-family: 'Cairo', sans-serif;
            font-size: 0.9rem;
            margin-bottom: 8px;
        }
        
        body.dark-mode .skill-input {
            background: var(--dark-card);
            color: var(--dark-text);
        }
        
        .skill-level-input {
            width: 100%;
            margin-top: 5px;
        }
        
        .skill-level-display {
            font-size: 0.8rem;
            color: var(--primary-color);
            font-weight: 600;
            margin-top: 5px;
        }
        
        .profile-name-input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        body.dark-mode .profile-name-input {
            color: var(--dark-text);
        }
    `;
    document.head.appendChild(style);
});

// Export functions for global access
window.showVerificationModal = showVerificationModal;
window.closeVerificationModal = closeVerificationModalFunc;
window.showRatingModal = showRatingModal;
window.addPortfolioItem = addPortfolioItem;
window.toggleEdit = toggleEdit;
window.toggleSkillsEdit = toggleSkillsEdit;
window.toggleAboutEdit = toggleAboutEdit;
window.toggleEditProfile = toggleEditProfile;
window.removeFile = removeFile;
window.showNotification = showNotification;
window.toggleMobileMenu = toggleMobileMenu;

// Post and sharing functions
window.showCreatePostModal = showCreatePostModal;
window.closeCreatePostModal = closeCreatePostModal;
window.createPost = createPost;
window.removePostImage = removePostImage;
window.toggleLike = toggleLike;
window.toggleComments = toggleComments;
window.sharePost = sharePost;
window.handleCommentKeypress = handleCommentKeypress;
window.addComment = addComment;
window.removeComment = removeComment;
window.showShareModal = showShareModal;
window.closeShareModal = closeShareModal;
window.shareToWhatsApp = shareToWhatsApp;
window.shareToFacebook = shareToFacebook;
window.shareToTwitter = shareToTwitter;
window.shareToLinkedIn = shareToLinkedIn;
window.copyProfileLink = copyProfileLink;
window.shareToWhatsAppProfile = shareToWhatsAppProfile;
window.shareToFacebookProfile = shareToFacebookProfile;
window.shareToTwitterProfile = shareToTwitterProfile;
window.copyPostToClipboard = copyPostToClipboard;
window.addReaction = addReaction;
window.uploadProfilePhoto = uploadProfilePhoto;

// Enhanced Profile Edit Functions
function showEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Load current profile data
    loadCurrentProfileData();
}

function closeEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function loadCurrentProfileData() {
    // Load current profile information into the form
    const profileName = document.querySelector('.profile-info h2').textContent;
    const profileTitle = document.querySelector('.profile-info p').textContent;
    
    document.getElementById('profileName').value = profileName;
    document.getElementById('profileTitle').value = profileTitle;
}

function validateProfileForm() {
    const requiredFields = [
        { id: 'profileName', name: 'الاسم الكامل', minLength: 2 },
        { id: 'profileTitle', name: 'المسمى الوظيفي', minLength: 5 },
        { id: 'profileEmail', name: 'البريد الإلكتروني' },
        { id: 'profilePhone', name: 'رقم الهاتف' },
        { id: 'profileLocation', name: 'الموقع' },
        { id: 'profileExperience', name: 'سنوات الخبرة' },
        { id: 'profileBio', name: 'النبذة الشخصية', minLength: 50 },
        { id: 'profileHourlyRate', name: 'السعر بالساعة' }
    ];
    
    let isValid = true;
    let errors = [];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        const value = element.value.trim();
        
        // Remove previous error styling
        element.classList.remove('error');
        
        if (!value) {
            isValid = false;
            errors.push(`${field.name} مطلوب`);
            element.classList.add('error');
        } else if (field.minLength && value.length < field.minLength) {
            isValid = false;
            errors.push(`${field.name} يجب أن يكون ${field.minLength} أحرف على الأقل`);
            element.classList.add('error');
        }
    });
    
    // Validate email format
    const email = document.getElementById('profileEmail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        isValid = false;
        errors.push('صيغة البريد الإلكتروني غير صحيحة');
        document.getElementById('profileEmail').classList.add('error');
    }
    
    // Validate phone format
    const phone = document.getElementById('profilePhone').value;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (phone && !phoneRegex.test(phone.replace(/\s/g, ''))) {
        isValid = false;
        errors.push('صيغة رقم الهاتف غير صحيحة');
        document.getElementById('profilePhone').classList.add('error');
    }
    
    // Validate hourly rate
    const hourlyRate = parseInt(document.getElementById('profileHourlyRate').value);
    if (hourlyRate && (hourlyRate < 50 || hourlyRate > 1000)) {
        isValid = false;
        errors.push('السعر بالساعة يجب أن يكون بين 50 و 1000 ريال');
        document.getElementById('profileHourlyRate').classList.add('error');
    }
    
    if (!isValid) {
        showNotification(errors.join('<br>'), 'error');
    }
    
    return isValid;
}

function saveProfileChanges() {
    // Get all form fields
    const profileName = document.getElementById('profileName').value.trim();
    const profileTitle = document.getElementById('profileTitle')?.value.trim() || '';
    const profileBio = document.getElementById('profileBio')?.value.trim() || '';
    const profileLocation = document.getElementById('profileLocation')?.value || '';
    const profileHourlyRate = document.getElementById('profileHourlyRate')?.value || '';
    const profileWebsite = document.getElementById('profileWebsite')?.value.trim() || '';
    const profileExperience = document.getElementById('profileExperience')?.value || '';
    
    // Validate required fields
    if (!profileName) {
        showNotification('يرجى إدخال الاسم الكامل', 'error');
        return;
    }
    
    if (profileName.length < 2) {
        showNotification('يجب أن يكون الاسم أكثر من حرفين', 'error');
        return;
    }
    
    const saveBtn = document.querySelector('.modal-footer .btn-primary');
    const btnText = saveBtn.querySelector('.btn-text');
    const btnLoading = saveBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    saveBtn.disabled = true;
    
    // Update profile data object
    profileData.name = profileName;
    if (profileTitle) profileData.title = profileTitle;
    if (profileBio) profileData.bio = profileBio;
    if (profileLocation) profileData.location = profileLocation;
    if (profileHourlyRate) profileData.hourlyRate = parseInt(profileHourlyRate);
    if (profileWebsite) profileData.website = profileWebsite;
    if (profileExperience) profileData.experience = profileExperience;
    
    // Save to localStorage
    saveProfileData();
    
    // Simulate API call
    setTimeout(() => {
        // Update all profile display elements
        updateProfileDisplay();
        
        // Hide loading state
        btnText.style.display = 'inline-flex';
        btnLoading.style.display = 'none';
        saveBtn.disabled = false;
        
        // Close modal
        closeEditProfileModal();
        
        // Show success message
        showNotification('تم حفظ التغييرات بنجاح!', 'success');
        
        // Add visual feedback to profile
        const profileCard = document.querySelector('.profile-card');
        profileCard.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            profileCard.style.animation = '';
        }, 500);
        
    }, 1000);
}

function updateProfileDisplay() {
    // Update profile name and title
    const profileNameElement = document.querySelector('.profile-info h2');
    const profileTitleElement = document.querySelector('.profile-info p');
    
    if (profileNameElement && profileData.name) {
        profileNameElement.textContent = profileData.name;
    }
    
    if (profileTitleElement && profileData.title) {
        profileTitleElement.textContent = profileData.title;
    }
    
    // Update bio if exists
    const bioElement = document.querySelector('.profile-bio p');
    if (bioElement && profileData.bio) {
        bioElement.textContent = profileData.bio;
    }
    
    // Update location and rate in stats
    const locationElements = document.querySelectorAll('.stat-item');
    locationElements.forEach(element => {
        const elementText = element.textContent;
        if (elementText.includes('الموقع') || elementText.includes('الرياض') || elementText.includes('جدة') || elementText.includes('الدمام')) {
            const locationOptions = {
                'riyadh': 'الرياض',
                'jeddah': 'جدة', 
                'dammam': 'الدمام',
                'mecca': 'مكة المكرمة',
                'medina': 'المدينة المنورة'
            };
            const locationText = locationOptions[profileData.location] || 'الرياض';
            element.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${locationText}`;
        }
        if (elementText.includes('ريال') && profileData.hourlyRate) {
            element.innerHTML = `<i class="fas fa-money-bill-wave"></i> ${profileData.hourlyRate} ريال/ساعة`;
        }
    });
    
    // Update website link if exists
    const websiteElement = document.querySelector('.profile-website');
    if (websiteElement && profileData.website) {
        websiteElement.href = profileData.website;
        websiteElement.textContent = profileData.website;
    }
}

function updateProfileNameOnly() {
    // Update only the profile name
    const profileName = document.getElementById('profileName').value;
    const profileNameElement = document.querySelector('.profile-info h2');
    
    if (profileNameElement) {
        profileNameElement.textContent = profileName;
    }
}

// Skill Management Functions
function addSkill() {
    const skillInput = document.getElementById('skillsInput');
    const skillLevel = document.getElementById('skillLevel');
    const skillName = skillInput.value.trim();
    
    if (!skillName) {
        showNotification('يرجى إدخال اسم المهارة', 'error');
        skillInput.focus();
        return;
    }
    
    // Check if skill already exists
    const existingSkills = document.querySelectorAll('.skill-tag span:first-child');
    const skillExists = Array.from(existingSkills).some(skill => 
        skill.textContent.toLowerCase() === skillName.toLowerCase()
    );
    
    if (skillExists) {
        showNotification('هذه المهارة موجودة بالفعل', 'error');
        skillInput.focus();
        return;
    }
    
    const skillsContainer = document.getElementById('currentSkills');
    const skillTag = document.createElement('div');
    skillTag.className = 'skill-tag';
    skillTag.style.animation = 'slideInRight 0.3s ease';
    
    const levelText = skillLevel.options[skillLevel.selectedIndex].text;
    const levelClass = skillLevel.value;
    
    skillTag.innerHTML = `
        <span>${skillName}</span>
        <span class="skill-level-badge ${levelClass}">${levelText}</span>
        <button onclick="removeSkill(this)" title="حذف المهارة">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    skillsContainer.appendChild(skillTag);
    
    // Clear input
    skillInput.value = '';
    skillLevel.selectedIndex = 2; // Reset to advanced
    
    showNotification(`تم إضافة مهارة ${skillName}`, 'success');
    
    // Remove animation after completion
    setTimeout(() => {
        skillTag.style.animation = '';
    }, 300);
}

function removeSkill(button) {
    const skillTag = button.closest('.skill-tag');
    const skillName = skillTag.querySelector('span:first-child').textContent;
    
    skillTag.style.animation = 'slideOutRight 0.3s ease';
    
    setTimeout(() => {
        skillTag.remove();
        showNotification(`تم حذف مهارة ${skillName}`, 'info');
    }, 300);
}

// Enhanced skill input with Enter key support
function handleSkillKeypress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addSkill();
    }
}

// Enhanced Edit Profile Modal Functions (Updated) - All duplicates removed successfully

// Enhanced Contact Information Functions
function callContact(phone) {
    if (phone) {
        window.location.href = `tel:${phone}`;
    }
}

function emailContact(email) {
    if (email) {
        window.location.href = `mailto:${email}`;
    }
}

function whatsappContact(phone) {
    if (phone) {
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        window.open(`https://wa.me/${cleanPhone}`, '_blank');
    }
}

function telegramContact(username) {
    if (username) {
        const cleanUsername = username.replace('@', '');
        window.open(`https://t.me/${cleanUsername}`, '_blank');
    }
}

function linkedinContact(profile) {
    if (profile) {
        const url = profile.startsWith('http') ? profile : `https://linkedin.com/in/${profile}`;
        window.open(url, '_blank');
    }
}

function githubContact(username) {
    if (username) {
        const cleanUsername = username.replace('@', '');
        window.open(`https://github.com/${cleanUsername}`, '_blank');
    }
}

function websiteContact(url) {
    if (url) {
        const fullUrl = url.startsWith('http') ? url : `https://${url}`;
        window.open(fullUrl, '_blank');
    }
}

function discordContact(username) {
    if (username) {
        // Copy Discord username to clipboard since Discord doesn't have direct links
        copyToClipboard(username);
        showContactNotification('تم نسخ اسم المستخدم في Discord!', 'success');
    }
}

function copyContactInfo(text) {
    if (text) {
        copyToClipboard(text);
        showContactNotification('تم نسخ معلومات التواصل!', 'success');
    }
}

// Contact Action Functions
function makeCall(phoneNumber) {
    if (phoneNumber) {
        // Remove any non-digit characters except + for international numbers
        const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
        window.open(`tel:${cleanNumber}`, '_self');
        showContactNotification('جاري الاتصال...', 'info');
    }
}

function sendEmail(emailAddress) {
    if (emailAddress) {
        window.open(`mailto:${emailAddress}`, '_self');
        showContactNotification('جاري فتح تطبيق البريد...', 'info');
    }
}

function openWhatsApp(phoneNumber) {
    if (phoneNumber) {
        // Remove any non-digit characters except + for international numbers
        const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
        // Remove + and add country code if needed (assuming Saudi Arabia +966)
        let whatsappNumber = cleanNumber;
        if (cleanNumber.startsWith('0')) {
            whatsappNumber = '966' + cleanNumber.substring(1);
        } else if (cleanNumber.startsWith('+')) {
            whatsappNumber = cleanNumber.substring(1);
        }
        window.open(`https://wa.me/${whatsappNumber}`, '_blank');
        showContactNotification('جاري فتح واتساب...', 'info');
    }
}

function openLocation() {
    // For now, just copy the location text
    const locationText = 'الرياض، السعودية';
    copyToClipboard(locationText);
    showContactNotification('تم نسخ العنوان!', 'success');
}

function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showContactNotification(`تم نسخ: ${text}`, 'success');
            }).catch(() => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    } catch (error) {
        console.error('Copy failed:', error);
        showContactNotification('فشل في النسخ', 'error');
    }
}

function fallbackCopy(text) {
    try {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        textArea.remove();
        
        if (successful) {
            showContactNotification(`تم نسخ: ${text}`, 'success');
        } else {
            showContactNotification('فشل في النسخ', 'error');
        }
    } catch (error) {
        console.error('Fallback copy failed:', error);
        showContactNotification('فشل في النسخ', 'error');
    }
}

function showContactNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `contact-notification notification-${type}`;
    
    // Determine icon and color based on type
    let icon, backgroundColor;
    switch(type) {
        case 'success':
            icon = 'check-circle';
            backgroundColor = '#28a745';
            break;
        case 'error':
            icon = 'exclamation-circle';
            backgroundColor = '#dc3545';
            break;
        case 'warning':
            icon = 'exclamation-triangle';
            backgroundColor = '#ffc107';
            break;
        default:
            icon = 'info-circle';
            backgroundColor = '#007bff';
    }
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="notification-close" style="background: none; border: none; color: white; margin-left: 8px; cursor: pointer; font-size: 16px;">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Cairo', sans-serif;
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function setContactPreference(preference) {
    // Save preference to localStorage
    localStorage.setItem('contactPreference', preference);
    showContactNotification(`تم تعيين تفضيل التواصل إلى ${getPreferenceText(preference)}`, 'success');
}

function getPreferenceText(preference) {
    const preferences = {
        'phone': 'الهاتف',
        'email': 'البريد الإلكتروني',
        'whatsapp': 'واتساب',
        'telegram': 'تيليجرام'
    };
    return preferences[preference] || preference;
}

// Initialize contact preferences
function initContactPreferences() {
    const savedPreference = localStorage.getItem('contactPreference');
    if (savedPreference) {
        const radioButton = document.querySelector(`input[name="contactPreference"][value="${savedPreference}"]`);
        if (radioButton) {
            radioButton.checked = true;
        }
    }
    
    // Add event listeners to preference radio buttons
    const preferenceRadios = document.querySelectorAll('input[name="contactPreference"]');
    preferenceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                setContactPreference(this.value);
            }
        });
    });
}

// Initialize contact information enhancements
function initContactEnhancements() {
    initContactPreferences();
    
    // Add click handlers for action buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('.action-btn, .action-btn *')) {
            const button = e.target.closest('.action-btn');
            const action = button.dataset.action;
            const value = button.dataset.value;
            
            switch(action) {
                case 'call':
                    callContact(value);
                    break;
                case 'email':
                    emailContact(value);
                    break;
                case 'whatsapp':
                    whatsappContact(value);
                    break;
                case 'telegram':
                    telegramContact(value);
                    break;
                case 'linkedin':
                    linkedinContact(value);
                    break;
                case 'github':
                    githubContact(value);
                    break;
                case 'website':
                    websiteContact(value);
                    break;
                case 'discord':
                    discordContact(value);
                    break;
                case 'copy':
                    copyContactInfo(value);
                    break;
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactEnhancements();
});

// Export contact functions to global scope
window.callContact = callContact;
window.emailContact = emailContact;
window.whatsappContact = whatsappContact;
window.telegramContact = telegramContact;
window.linkedinContact = linkedinContact;
window.githubContact = githubContact;
window.websiteContact = websiteContact;
window.discordContact = discordContact;
window.copyContactInfo = copyContactInfo;
window.copyToClipboard = copyToClipboard;
window.setContactPreference = setContactPreference;



// Enhanced File Upload Functions for Verification Modal
function removeFile(areaId) {
    const area = document.getElementById(areaId);
    if (!area) return;
    
    const content = area.querySelector('.upload-content');
    const preview = area.querySelector('.file-preview');
    const input = area.querySelector('input[type="file"]');
    
    if (content) content.style.display = 'block';
    if (preview) {
        preview.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (preview.parentNode) {
                preview.remove();
            }
        }, 300);
    }
    
    area.classList.remove('has-file');
    if (input) input.value = '';
    
    showNotification('تم حذف الملف', 'info');
}

// Enhanced Notification Close Function
function closeNotification(notificationElement) {
    if (notificationElement) {
        notificationElement.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notificationElement.parentNode) {
                notificationElement.parentNode.removeChild(notificationElement);
            }
        }, 300);
    }
}

// Enhanced Modal Close Functions with Animation
function closeModalWithAnimation(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.classList.remove('show');
            modal.style.display = 'none';
            modal.style.animation = '';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Universal Close Button Handler for Dynamic Modals
function handleCloseButton(button) {
    const modal = button.closest('.modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Enhanced Event Listeners for Close Buttons
function initializeCloseButtons() {
    // Add event listeners to all close buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.close-modal')) {
            const button = e.target.closest('.close-modal');
            const modal = button.closest('.modal');
            
            if (modal) {
                const modalId = modal.id;
                
                // Handle specific modals
                switch (modalId) {
                    case 'verificationModal':
                        closeVerificationModalFunc();
                        break;
                    case 'editProfileModal':
                        closeEditProfileModal();
                        break;
                    case 'createPostModal':
                        closeCreatePostModal();
                        break;
                    case 'shareProfileModal':
                        closeShareModal();
                        break;
                    default:
                        handleCloseButton(button);
                        break;
                }
            }
        }
        
        // Handle notification close buttons
        if (e.target.closest('.notification-close')) {
            const notification = e.target.closest('.notification, .contact-notification');
            closeNotification(notification);
        }
        
        // Handle remove file buttons
        if (e.target.closest('.remove-file-btn')) {
            const button = e.target.closest('.remove-file-btn');
            const uploadArea = button.closest('[id$="UploadArea"], [id$="uploadArea"]');
            if (uploadArea) {
                removeFile(uploadArea.id);
            }
        }
    });
    
    // Handle ESC key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show, .modal[style*="display: flex"]');
            if (openModal) {
                const modalId = openModal.id;
                
                switch (modalId) {
                    case 'verificationModal':
                        closeVerificationModalFunc();
                        break;
                    case 'editProfileModal':
                        closeEditProfileModal();
                        break;
                    case 'createPostModal':
                        closeCreatePostModal();
                        break;
                    case 'shareProfileModal':
                        closeShareModal();
                        break;
                    default:
                        openModal.classList.remove('show');
                        openModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        break;
                }
            }
        }
    });
}

// Skills Edit Functions
function toggleSkillsEdit() {
    const editForm = document.getElementById('skillsEditForm');
    const skillsGrid = document.querySelector('.skills-grid');
    
    if (editForm.style.display === 'none' || editForm.style.display === '') {
        editForm.style.display = 'block';
        skillsGrid.style.display = 'none';
        loadCurrentSkills();
    } else {
        editForm.style.display = 'none';
        skillsGrid.style.display = 'grid';
    }
}

function loadCurrentSkills() {
    // Load current skills from the display into the edit form
    const categories = ['frontend', 'backend', 'mobile', 'database'];
    
    categories.forEach(category => {
        const skillsContainer = document.getElementById(`${category}-skills`);
        const displayCategory = document.querySelector(`.skill-category:nth-child(${categories.indexOf(category) + 1})`);
        
        if (displayCategory && skillsContainer) {
            const skillItems = displayCategory.querySelectorAll('.skill-item');
            skillsContainer.innerHTML = '';
            
            skillItems.forEach(item => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag-edit';
                skillTag.innerHTML = `${item.textContent} <button onclick="removeSkill(this)">×</button>`;
                skillsContainer.appendChild(skillTag);
            });
        }
    });
}

function addSkillOnEnter(event, category) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = event.target;
        const skillText = input.value.trim();
        
        if (skillText) {
            addSkillToCategory(skillText, category);
            input.value = '';
        }
    }
}

function addSkillToCategory(skillText, category) {
    const skillsContainer = document.getElementById(`${category}-skills`);
    if (!skillsContainer) return;
    
    const skillTag = document.createElement('span');
    skillTag.className = 'skill-tag-edit';
    skillTag.innerHTML = `${skillText} <button onclick="removeSkill(this)">×</button>`;
    skillsContainer.appendChild(skillTag);
    
    // Add animation
    skillTag.style.opacity = '0';
    skillTag.style.transform = 'scale(0.8)';
    setTimeout(() => {
        skillTag.style.transition = 'all 0.3s ease';
        skillTag.style.opacity = '1';
        skillTag.style.transform = 'scale(1)';
    }, 10);
}

function removeSkill(button) {
    const skillTag = button.parentElement;
    skillTag.style.transition = 'all 0.3s ease';
    skillTag.style.opacity = '0';
    skillTag.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        skillTag.remove();
    }, 300);
}

function saveSkills() {
    const categories = [
        { id: 'frontend', selector: '.skill-category:nth-child(1)' },
        { id: 'backend', selector: '.skill-category:nth-child(2)' },
        { id: 'mobile', selector: '.skill-category:nth-child(3)' },
        { id: 'database', selector: '.skill-category:nth-child(4)' }
    ];
    
    categories.forEach(category => {
        const editContainer = document.getElementById(`${category.id}-skills`);
        const displayCategory = document.querySelector(category.selector);
        const titleInput = document.getElementById(`${category.id}-title`);
        const iconSelect = document.getElementById(`${category.id}-icon`);
        
        if (displayCategory && editContainer) {
            // Update title
            const titleElement = displayCategory.querySelector('h4');
            if (titleElement && titleInput) {
                titleElement.textContent = titleInput.value;
            }
            
            // Update icon
            const iconElement = displayCategory.querySelector('.skill-category-header i');
            if (iconElement && iconSelect) {
                iconElement.className = iconSelect.value;
            }
            
            // Update skills
            const skillsContainer = displayCategory.querySelector('.skill-items');
            const editSkills = editContainer.querySelectorAll('.skill-tag-edit');
            
            if (skillsContainer) {
                skillsContainer.innerHTML = '';
                editSkills.forEach(skillTag => {
                    const skillText = skillTag.textContent.replace('×', '').trim();
                    const skillSpan = document.createElement('span');
                    skillSpan.className = 'skill-item';
                    skillSpan.textContent = skillText;
                    skillsContainer.appendChild(skillSpan);
                });
            }
        }
    });
    
    // Hide edit form and show display
    toggleSkillsEdit();
    
    // Show success notification
    showNotification('تم حفظ التخصصات بنجاح!', 'success');
    
    // Save to localStorage
    saveSkillsToStorage();
}

function saveSkillsToStorage() {
    const skillsData = {};
    const categories = ['frontend', 'backend', 'mobile', 'database'];
    
    categories.forEach((category, index) => {
        const displayCategory = document.querySelector(`.skill-category:nth-child(${index + 1})`);
        if (displayCategory) {
            const title = displayCategory.querySelector('h4').textContent;
            const icon = displayCategory.querySelector('.skill-category-header i').className;
            const skills = Array.from(displayCategory.querySelectorAll('.skill-item')).map(item => item.textContent);
            
            skillsData[category] = { title, icon, skills };
        }
    });
    
    localStorage.setItem('userSkills', JSON.stringify(skillsData));
}

function loadSkillsFromStorage() {
    const savedSkills = localStorage.getItem('userSkills');
    if (savedSkills) {
        const skillsData = JSON.parse(savedSkills);
        
        Object.keys(skillsData).forEach((category, index) => {
            const displayCategory = document.querySelector(`.skill-category:nth-child(${index + 1})`);
            if (displayCategory && skillsData[category]) {
                const { title, icon, skills } = skillsData[category];
                
                // Update title
                const titleElement = displayCategory.querySelector('h4');
                if (titleElement) titleElement.textContent = title;
                
                // Update icon
                const iconElement = displayCategory.querySelector('.skill-category-header i');
                if (iconElement) iconElement.className = icon;
                
                // Update skills
                const skillsContainer = displayCategory.querySelector('.skill-items');
                if (skillsContainer) {
                    skillsContainer.innerHTML = '';
                    skills.forEach(skill => {
                        const skillSpan = document.createElement('span');
                        skillSpan.className = 'skill-item';
                        skillSpan.textContent = skill;
                        skillsContainer.appendChild(skillSpan);
                    });
                }
            }
        });
    }
}

function cancelSkillsEdit() {
    toggleSkillsEdit();
    showNotification('تم إلغاء التحرير', 'info');
}

function addNewCategory() {
    const skillsGrid = document.querySelector('.skills-grid');
    const newCategoryId = `category-${Date.now()}`;
    
    const newCategory = document.createElement('div');
    newCategory.className = 'skill-category';
    newCategory.innerHTML = `
        <div class="skill-category-header">
            <i class="fas fa-star"></i>
            <h4>فئة جديدة</h4>
        </div>
        <div class="skill-items">
            <span class="skill-item">مهارة جديدة</span>
        </div>
    `;
    
    skillsGrid.appendChild(newCategory);
    
    // Add corresponding edit form
    const editGrid = document.querySelector('.skills-edit-grid');
    const newEditCategory = document.createElement('div');
    newEditCategory.className = 'skill-category-edit';
    newEditCategory.innerHTML = `
        <div class="category-header-edit">
            <label>أيقونة:</label>
            <select class="icon-select">
                <option value="fas fa-star">Star</option>
                <option value="fas fa-code">Code</option>
                <option value="fas fa-tools">Tools</option>
                <option value="fas fa-cog">Settings</option>
            </select>
            <label>العنوان:</label>
            <input type="text" value="فئة جديدة" class="category-title-input">
        </div>
        <div class="skills-input-container">
            <label>المهارات:</label>
            <div class="skills-input-area">
                <input type="text" class="skill-input" placeholder="أضف مهارة جديدة" onkeypress="addSkillOnEnter(event, '${newCategoryId}')">
                <div class="skills-tags-edit" id="${newCategoryId}-skills">
                    <span class="skill-tag-edit">مهارة جديدة <button onclick="removeSkill(this)">×</button></span>
                </div>
            </div>
        </div>
    `;
    
    editGrid.appendChild(newEditCategory);
    
    showNotification('تم إضافة فئة جديدة', 'success');
}

// Initialize Portfolio Animations
function initializePortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add fade-in animation to existing portfolio items
    portfolioItems.forEach((item, index) => {
        // Add fade-in class if not already present
        if (!item.classList.contains('fade-in')) {
            item.classList.add('fade-in');
        }
        
        // Add staggered animation delay
        const animationDelay = (index % 6) * 0.1;
        item.style.animationDelay = `${animationDelay}s`;
        
        // Add intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(item);
    });
    
    // Add hover sound effects (optional)
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Add subtle hover feedback
            item.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        item.addEventListener('mouseleave', () => {
            // Reset transition
            item.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
    
    // Initialize portfolio grid masonry effect
    initializePortfolioMasonry();
    
    // Add scroll-triggered animations for portfolio section
    const portfolioSection = document.querySelector('.portfolio-grid');
    if (portfolioSection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // Trigger staggered animations for children
                    const items = entry.target.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.2
        });
        
        sectionObserver.observe(portfolioSection);
    }
}

// Initialize Portfolio Masonry Layout
function initializePortfolioMasonry() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    // Add CSS Grid masonry-like behavior
    portfolioGrid.style.display = 'grid';
    portfolioGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    portfolioGrid.style.gap = '20px';
    portfolioGrid.style.alignItems = 'start';
    
    // Adjust grid on window resize
    window.addEventListener('resize', () => {
        // Recalculate grid layout
        const items = portfolioGrid.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            item.style.breakInside = 'avoid';
        });
    });
}

// Enhanced Portfolio Item Creation with Animations
function createPortfolioItemWithAnimation(data, tags) {
    const item = createPortfolioItem(data, tags);
    
    // Add entrance animation
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px) scale(0.9)';
    
    // Trigger animation after a short delay
    setTimeout(() => {
        item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
    }, 100);
    
    return item;
}

// Platform-based Contact Functions
function quickContact(type) {
    switch(type) {
        case 'call':
            initiateQuickCall();
            break;
        case 'email':
            openInternalMessage();
            break;
        default:
            console.log('Unknown contact type:', type);
    }
}

// Initiate Quick Call within platform
function initiateQuickCall() {
    // Create call modal
    const callModal = document.createElement('div');
    callModal.className = 'call-modal';
    callModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    callModal.innerHTML = `
        <div class="call-modal-content" style="
            background: var(--light-card);
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        ">
            <div class="call-header" style="margin-bottom: 20px;">
                <div class="call-avatar" style="
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: var(--gradient-primary);
                    margin: 0 auto 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: white;
                ">
                    <i class="fas fa-user"></i>
                </div>
                <h3 style="color: var(--light-text); margin: 0;">أحمد محمد</h3>
                <p style="color: #666; margin: 5px 0;">مطور ويب محترف</p>
            </div>
            
            <div class="call-status" style="margin: 20px 0;">
                <div class="calling-animation" style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    color: var(--primary-color);
                    font-weight: 600;
                ">
                    <i class="fas fa-phone" style="animation: pulse 1.5s infinite;"></i>
                    <span>جاري الاتصال...</span>
                </div>
            </div>
            
            <div class="call-actions" style="display: flex; gap: 15px; justify-content: center; margin-top: 25px;">
                <button class="call-action-btn end-call" onclick="endCall()" style="
                    background: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
                ">
                    <i class="fas fa-phone-slash"></i>
                </button>
                <button class="call-action-btn mute-call" onclick="toggleMute()" style="
                    background: var(--light-bg);
                    color: var(--light-text);
                    border: 2px solid var(--light-border);
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">
                    <i class="fas fa-microphone"></i>
                </button>
            </div>
            
            <div class="call-timer" style="
                margin-top: 15px;
                color: #666;
                font-size: 0.9rem;
            " id="callTimer">00:00</div>
        </div>
    `;
    
    document.body.appendChild(callModal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        callModal.style.opacity = '1';
        callModal.querySelector('.call-modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Start call timer
    startCallTimer();
    
    // Simulate call connection after 3 seconds
    setTimeout(() => {
        const callingText = callModal.querySelector('.calling-animation span');
        const callingIcon = callModal.querySelector('.calling-animation i');
        if (callingText && callingIcon) {
            callingText.textContent = 'متصل الآن';
            callingIcon.className = 'fas fa-phone-alt';
            callingIcon.style.color = '#28a745';
        }
    }, 3000);
    
    showNotification('تم بدء المكالمة داخل المنصة', 'success');
}

// Open Internal Message System
function openInternalMessage() {
    // Create message modal
    const messageModal = document.createElement('div');
    messageModal.className = 'message-modal';
    messageModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    messageModal.innerHTML = `
        <div class="message-modal-content" style="
            background: var(--light-card);
            border-radius: 20px;
            padding: 0;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        ">
            <div class="message-header" style="
                background: var(--gradient-primary);
                color: white;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            ">
                <div class="recipient-info" style="display: flex; align-items: center; gap: 15px;">
                    <div class="recipient-avatar" style="
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.2);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.2rem;
                    ">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <h3 style="margin: 0; font-size: 1.1rem;">أحمد محمد</h3>
                        <p style="margin: 0; opacity: 0.8; font-size: 0.9rem;">مطور ويب محترف</p>
                    </div>
                </div>
                <button onclick="closeMessageModal()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                ">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="message-body" style="padding: 20px; max-height: 400px; overflow-y: auto;">
                <div class="message-thread" id="messageThread">
                    <div class="message-item received" style="
                        margin-bottom: 15px;
                        display: flex;
                        align-items: flex-start;
                        gap: 10px;
                    ">
                        <div class="message-avatar" style="
                            width: 35px;
                            height: 35px;
                            border-radius: 50%;
                            background: var(--gradient-primary);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 0.8rem;
                        ">
                            أ
                        </div>
                        <div class="message-content" style="
                            background: var(--light-bg);
                            padding: 12px 15px;
                            border-radius: 15px 15px 15px 5px;
                            max-width: 70%;
                            color: var(--light-text);
                        ">
                            <p style="margin: 0;">مرحباً! أهلاً بك في نظام الرسائل الداخلي للمنصة.</p>
                            <span style="font-size: 0.8rem; color: #666; margin-top: 5px; display: block;">منذ دقيقتين</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="message-input-area" style="
                padding: 20px;
                border-top: 1px solid var(--light-border);
                background: var(--light-bg);
            ">
                <div class="input-container" style="
                    display: flex;
                    gap: 10px;
                    align-items: flex-end;
                ">
                    <div style="flex: 1;">
                        <textarea 
                            id="messageInput" 
                            placeholder="اكتب رسالتك هنا..."
                            style="
                                width: 100%;
                                min-height: 40px;
                                max-height: 120px;
                                border: 2px solid var(--light-border);
                                border-radius: 20px;
                                padding: 10px 15px;
                                resize: none;
                                font-family: inherit;
                                background: white;
                                color: var(--light-text);
                                outline: none;
                                transition: border-color 0.3s ease;
                            "
                            onkeypress="handleMessageKeyPress(event)"
                        ></textarea>
                    </div>
                    <button onclick="sendMessage()" style="
                        background: var(--gradient-primary);
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 45px;
                        height: 45px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
                    ">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(messageModal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        messageModal.style.opacity = '1';
        messageModal.querySelector('.message-modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Focus on input
    setTimeout(() => {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) messageInput.focus();
    }, 300);
    
    showNotification('تم فتح نظام الرسائل الداخلي', 'success');
}

// Close Message Modal
function closeMessageModal() {
    const modal = document.querySelector('.message-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.message-modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Send Message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageThread = document.getElementById('messageThread');
    
    if (!messageInput || !messageThread || !messageInput.value.trim()) return;
    
    const messageText = messageInput.value.trim();
    
    // Create sent message
    const sentMessage = document.createElement('div');
    sentMessage.className = 'message-item sent';
    sentMessage.style.cssText = `
        margin-bottom: 15px;
        display: flex;
        align-items: flex-start;
        gap: 10px;
        justify-content: flex-end;
    `;
    
    sentMessage.innerHTML = `
        <div class="message-content" style="
            background: var(--gradient-primary);
            color: white;
            padding: 12px 15px;
            border-radius: 15px 15px 5px 15px;
            max-width: 70%;
        ">
            <p style="margin: 0;">${messageText}</p>
            <span style="font-size: 0.8rem; opacity: 0.8; margin-top: 5px; display: block;">الآن</span>
        </div>
        <div class="message-avatar" style="
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: #6c757d;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 0.8rem;
        ">
            أنت
        </div>
    `;
    
    messageThread.appendChild(sentMessage);
    messageInput.value = '';
    
    // Scroll to bottom
    messageThread.scrollTop = messageThread.scrollHeight;
    
    // Auto-resize textarea
    messageInput.style.height = '40px';
    
    showNotification('تم إرسال الرسالة', 'success');
}

// Handle Message Key Press
function handleMessageKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// End Call
function endCall() {
    const modal = document.querySelector('.call-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.call-modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
    stopCallTimer();
    showNotification('تم إنهاء المكالمة', 'info');
}

// Toggle Mute
function toggleMute() {
    const muteBtn = document.querySelector('.mute-call');
    const icon = muteBtn.querySelector('i');
    
    if (icon.classList.contains('fa-microphone')) {
        icon.className = 'fas fa-microphone-slash';
        muteBtn.style.background = '#dc3545';
        muteBtn.style.color = 'white';
        showNotification('تم كتم الصوت', 'warning');
    } else {
        icon.className = 'fas fa-microphone';
        muteBtn.style.background = 'var(--light-bg)';
        muteBtn.style.color = 'var(--light-text)';
        showNotification('تم إلغاء كتم الصوت', 'success');
    }
}

// Call Timer Functions
let callTimer;
let callStartTime;

function startCallTimer() {
    callStartTime = Date.now();
    callTimer = setInterval(updateCallTimer, 1000);
}

function stopCallTimer() {
    if (callTimer) {
        clearInterval(callTimer);
        callTimer = null;
    }
}

function updateCallTimer() {
    const timerElement = document.getElementById('callTimer');
    if (!timerElement) return;
    
    const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Export new functions to global scope
window.quickContact = quickContact;
window.initiateQuickCall = initiateQuickCall;
window.openInternalMessage = openInternalMessage;
window.closeMessageModal = closeMessageModal;
window.sendMessage = sendMessage;
window.handleMessageKeyPress = handleMessageKeyPress;
window.endCall = endCall;
window.toggleMute = toggleMute;

window.removeFile = removeFile;
window.closeNotification = closeNotification;
window.closeModalWithAnimation = closeModalWithAnimation;
window.handleCloseButton = handleCloseButton;
window.initializeCloseButtons = initializeCloseButtons;
window.toggleSkillsEdit = toggleSkillsEdit;
window.addSkillOnEnter = addSkillOnEnter;
window.removeSkill = removeSkill;
window.saveSkills = saveSkills;
window.cancelSkillsEdit = cancelSkillsEdit;
window.addNewSkill = addNewSkill;
window.showPresetLevels = showPresetLevels;
window.sortSkillsByLevel = sortSkillsByLevel;
window.applyPresetToAll = applyPresetToAll;
window.applyRandomLevels = applyRandomLevels;
window.closePresetModal = closePresetModal;
window.saveSkillsToStorage = saveSkillsToStorage;
window.loadSkillsFromStorage = loadSkillsFromStorage;
window.addNewCategory = addNewCategory;
window.viewPortfolioItem = viewPortfolioItem;
window.closePortfolioModal = closePortfolioModal;
window.editPortfolioItem = editPortfolioItem;
window.closeEditModal = closeEditModal;
window.savePortfolioEdit = savePortfolioEdit;
window.deletePortfolioItem = deletePortfolioItem;
window.closeDeleteModal = closeDeleteModal;
window.confirmDeletePortfolio = confirmDeletePortfolio;
window.showAddPortfolioForm = showAddPortfolioForm;
window.closeAddPortfolioForm = closeAddPortfolioForm;
window.handleAddPortfolioSubmit = handleAddPortfolioSubmit;
window.createPortfolioItem = createPortfolioItem;
window.getCategoryDisplayName = getCategoryDisplayName;
window.getCategoryIcon = getCategoryIcon;
window.generateCategoryLogo = generateCategoryLogo;
window.getFontAwesomeUnicode = getFontAwesomeUnicode;
window.initializePortfolioAnimations = initializePortfolioAnimations;
window.initializePortfolioMasonry = initializePortfolioMasonry;
window.createPortfolioItemWithAnimation = createPortfolioItemWithAnimation;

// Profile Picture Upload Functions
function openProfilePictureModal() {
    const modal = document.getElementById('profilePictureModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    
    // Reset the upload area
    resetProfilePictureUpload();
}

function closeProfilePictureModal() {
    const modal = document.getElementById('profilePictureModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    // Reset the upload area
    resetProfilePictureUpload();
}

function resetProfilePictureUpload() {
    const uploadArea = document.getElementById('profilePictureUploadArea');
    const preview = document.getElementById('uploadPreview');
    const saveButton = document.getElementById('saveProfilePicture');
    const cropButton = document.getElementById('cropButton');
    const fileInput = document.getElementById('profilePictureUpload');
    
    // Reset file input
    fileInput.value = '';
    
    // Hide preview and buttons
    preview.style.display = 'none';
    saveButton.style.display = 'none';
    cropButton.style.display = 'none';
    
    // Reset upload area content
    uploadArea.innerHTML = `
        <input type="file" id="profilePictureUpload" accept="image/jpeg,image/jpg,image/png" style="display: none;">
        <div class="upload-content">
            <i class="fas fa-cloud-upload-alt"></i>
            <h5>اضغط لتحميل صورة شخصية جديدة</h5>
            <p>JPG, PNG - الحد الأقصى 5 ميجابايت</p>
            <div class="upload-preview" id="uploadPreview" style="display: none;">
                <img id="previewImage" src="" alt="Preview">
            </div>
        </div>
    `;
    
    // Re-attach event listeners
    attachProfilePictureUploadListeners();
}

function attachProfilePictureUploadListeners() {
    const uploadArea = document.getElementById('profilePictureUploadArea');
    const fileInput = document.getElementById('profilePictureUpload');
    
    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // File selection
    fileInput.addEventListener('change', handleProfilePictureSelect);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleProfilePictureFile(files[0]);
        }
    });
}

function handleProfilePictureSelect(event) {
    const file = event.target.files[0];
    if (file) {
        handleProfilePictureFile(file);
    }
}

function handleProfilePictureFile(file) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        showNotification('يرجى اختيار ملف صورة صالح (JPG, PNG)', 'error');
        return;
    }
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showNotification('حجم الملف يجب أن يكون أقل من 5 ميجابايت', 'error');
        return;
    }
    
    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        showProfilePicturePreview(e.target.result);
    };
    reader.readAsDataURL(file);
}

function showProfilePicturePreview(imageSrc) {
    const preview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    const saveButton = document.getElementById('saveProfilePicture');
    const cropButton = document.getElementById('cropButton');
    
    // Set preview image
    previewImage.src = imageSrc;
    preview.style.display = 'block';
    
    // Show action buttons
    saveButton.style.display = 'inline-block';
    cropButton.style.display = 'inline-block';
    
    // Add some animation
    preview.style.opacity = '0';
    setTimeout(() => {
        preview.style.opacity = '1';
    }, 100);
}

function saveProfilePicture() {
    const previewImage = document.getElementById('previewImage');
    const imageSrc = previewImage.src;
    
    // Show loading state
    const saveButton = document.getElementById('saveProfilePicture');
    const originalText = saveButton.innerHTML;
    saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
    saveButton.disabled = true;
    
    // Simulate upload process
    setTimeout(() => {
        // Update profile avatar
        const profileAvatar = document.getElementById('profileAvatar');
        profileAvatar.src = imageSrc;
        
        // Save to localStorage (in a real app, this would be uploaded to server)
        localStorage.setItem('profilePicture', imageSrc);
        
        // Show success message
        showNotification('تم تحديث الصورة الشخصية بنجاح!', 'success');
        
        // Close modal
        closeProfilePictureModal();
        
        // Reset button
        saveButton.innerHTML = originalText;
        saveButton.disabled = false;
    }, 1500);
}

// Load profile picture from localStorage on page load
function loadProfilePicture() {
    const savedPicture = localStorage.getItem('profilePicture');
    if (savedPicture) {
        const profileAvatar = document.getElementById('profileAvatar');
        profileAvatar.src = savedPicture;
    }
}

// Initialize close buttons and load skills when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCloseButtons();
    loadSkillsFromStorage();
    
    // Load saved profile picture
    loadProfilePicture();
    
    // Attach profile picture upload listeners
    attachProfilePictureUploadListeners();
    
    // Close profile picture modal when clicking outside
    const profilePictureModal = document.getElementById('profilePictureModal');
    if (profilePictureModal) {
        profilePictureModal.addEventListener('click', (e) => {
            if (e.target === profilePictureModal) {
                closeProfilePictureModal();
            }
        });
    }
    
    // Add auto-save functionality for skills
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        // Auto-save when skills are modified
        skillsSection.addEventListener('input', function(e) {
            if (e.target.matches('.skill-input, .skill-level-input, .years-input, .projects-input, .certification-input')) {
                // Debounce auto-save
                clearTimeout(window.skillsAutoSaveTimeout);
                window.skillsAutoSaveTimeout = setTimeout(() => {
                    if (document.querySelector('.skill-edit-container')) {
                        // Only auto-save if in edit mode
                        const tempSave = () => {
                            const skillItems = document.querySelectorAll('.skill-item');
                            skillItems.forEach(item => {
                                const editContainer = item.querySelector('.skill-edit-container');
                                if (editContainer) {
                                    const yearsInput = editContainer.querySelector('.years-input');
                                    const projectsInput = editContainer.querySelector('.projects-input');
                                    const certificationInput = editContainer.querySelector('.certification-input');
                                    
                                    if (yearsInput && projectsInput && certificationInput) {
                                        item.dataset.years = yearsInput.value;
                                        item.dataset.projects = projectsInput.value;
                                        item.dataset.certified = certificationInput.checked;
                                    }
                                }
                            });
                        };
                        tempSave();
                    }
                }, 1000);
            }
        });
    }
});

// Export profile picture functions to global scope
window.openProfilePictureModal = openProfilePictureModal;
window.closeProfilePictureModal = closeProfilePictureModal;
window.saveProfilePicture = saveProfilePicture;
window.loadProfilePicture = loadProfilePicture;

// Export user type functions to global scope
window.setUserType = setUserType;
window.updateUserTypeBadge = updateUserTypeBadge;
window.toggleTheme = toggleTheme;
