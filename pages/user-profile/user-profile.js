// DOM Elements
const ratingModal = document.getElementById('ratingModal');
const contactModal = document.getElementById('contactModal');
const shareModal = document.getElementById('shareProfileModal');
const reportModal = document.getElementById('reportModal');
// const hamburger = document.getElementById('hamburger'); // Handled by shared navigation
const navMenu = document.querySelector('.nav-menu');

// Get user ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const requestedUserId = urlParams.get('user') || 'ahmed';

// User profiles database (this would typically come from an API)
const userProfilesDatabase = {
    'ahmed': {
        id: 'ahmed',
        name: 'أحمد محمد سعيد',
        title: 'مطور ويب ومطور تطبيقات جوال',
        email: 'ahmed.saeed@techpro.com',
        phone: '01012345678',
        rating: 4.2,
        reviewCount: 47,
        isVerified: true,
        skills: [
            { name: 'React.js & React Native', level: 95 },
            { name: 'Node.js & Express', level: 90 },
            { name: 'MongoDB & MySQL', level: 88 },
            { name: 'TypeScript', level: 85 },
            { name: 'AWS & Docker', level: 80 },
            { name: 'UI/UX Design', level: 75 }
        ],
        stats: {
            completedProjects: 23,
            satisfactionRate: 96,
            experienceYears: 4,
            responseTime: 18
        },
        contactInfo: {
            phone: '01012345678',
            email: 'ahmed.saeed@techpro.com',
            whatsapp: '01012345678',
            telegram: '@ahmed_saeed_dev',
            linkedin: 'linkedin.com/in/ahmed-saeed',
            github: 'github.com/ahmed-saeed',
            website: 'ahmed-saeed.dev',
            discord: 'ahmed_dev#1234'
        }
    },
    'sara': {
        id: 'sara',
        name: 'سارة أحمد',
        title: 'مصممة جرافيك ومصممة واجهات',
        email: 'sara.ahmed@design.com',
        phone: '01098765432',
        rating: 4.7,
        reviewCount: 32,
        isVerified: true,
        skills: [
            { name: 'Photoshop & Illustrator', level: 98 },
            { name: 'Figma & Sketch', level: 95 },
            { name: 'UI/UX Design', level: 92 },
            { name: 'InDesign', level: 88 },
            { name: 'After Effects', level: 85 },
            { name: 'Web Design', level: 80 }
        ],
        stats: {
            completedProjects: 18,
            satisfactionRate: 98,
            experienceYears: 3,
            responseTime: 12
        },
        contactInfo: {
            phone: '01098765432',
            email: 'sara.ahmed@design.com',
            whatsapp: '01098765432',
            telegram: '@sara_designer',
            linkedin: 'linkedin.com/in/sara-ahmed',
            github: 'github.com/sara-ahmed',
            website: 'sara-designs.com',
            discord: 'sara_design#5678'
        }
    },
    'mohamed': {
        id: 'mohamed',
        name: 'محمد علي',
        title: 'مدير مشاريع تقنية',
        email: 'mohamed.ali@projects.com',
        phone: '01055443322',
        rating: 4.5,
        reviewCount: 28,
        isVerified: true,
        skills: [
            { name: 'Project Management', level: 95 },
            { name: 'Agile & Scrum', level: 92 },
            { name: 'Team Leadership', level: 90 },
            { name: 'Strategic Planning', level: 88 },
            { name: 'Risk Management', level: 85 },
            { name: 'Communication', level: 95 }
        ],
        stats: {
            completedProjects: 35,
            satisfactionRate: 94,
            experienceYears: 6,
            responseTime: 8
        },
        contactInfo: {
            phone: '01055443322',
            email: 'mohamed.ali@projects.com',
            whatsapp: '01055443322',
            telegram: '@mohamed_pm',
            linkedin: 'linkedin.com/in/mohamed-ali',
            github: 'github.com/mohamed-ali',
            website: 'mohamed-pm.com',
            discord: 'mohamed_pm#9012'
        }
    },
    'fatima': {
        id: 'fatima',
        name: 'فاطمة محمود',
        title: 'مطورة تطبيقات جوال',
        email: 'fatima.mahmoud@mobile.com',
        phone: '01011223344',
        rating: 4.8,
        reviewCount: 41,
        isVerified: true,
        skills: [
            { name: 'React Native', level: 96 },
            { name: 'Flutter', level: 94 },
            { name: 'iOS Development', level: 90 },
            { name: 'Android Development', level: 92 },
            { name: 'Firebase', level: 88 },
            { name: 'Mobile UI/UX', level: 85 }
        ],
        stats: {
            completedProjects: 27,
            satisfactionRate: 97,
            experienceYears: 5,
            responseTime: 14
        },
        contactInfo: {
            phone: '01011223344',
            email: 'fatima.mahmoud@mobile.com',
            whatsapp: '01011223344',
            telegram: '@fatima_mobile',
            linkedin: 'linkedin.com/in/fatima-mahmoud',
            github: 'github.com/fatima-mahmoud',
            website: 'fatima-mobile.dev',
            discord: 'fatima_mobile#3456'
        }
    }
};

// Enhanced function to load user profile data
function loadUserProfile(userId) {
    const userData = userProfilesDatabase[userId];
    
    if (!userData) {
        // Show error message for unknown user
        showUserNotFoundError(userId);
        return;
    }
    
    // Update page title
    document.title = `${userData.name} - الملف الشخصي | شغلك`;
    
    // Update all profile elements with user data
    updateProfileElements(userData);
    
    // Show success notification
    showNotification(`تم تحميل ملف ${userData.name} بنجاح`, 'success');
    
    console.log(`Loaded profile for user: ${userId}`);
}

// Function to show error for unknown user
function showUserNotFoundError(userId) {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="user-not-found">
                <div class="error-container">
                    <i class="fas fa-user-slash"></i>
                    <h2>المستخدم غير موجود</h2>
                    <p>عذراً، لم يتم العثور على المستخدم "${userId}"</p>
                    <button class="btn btn-primary" onclick="window.location.href='../social/social.html'">
                        <i class="fas fa-arrow-right"></i>
                        العودة للمجتمع
                    </button>
                </div>
            </div>
        `;
    }
    
    showNotification(`لم يتم العثور على المستخدم: ${userId}`, 'error');
}

// Function to update all profile elements
function updateProfileElements(userData) {
    // Update profile header
    updateProfileHeader(userData);
    
    // Update contact information
    updateContactInfo(userData);
    
    // Update skills section
    updateSkillsSection(userData);
    
    // Update statistics
    updateStatistics(userData);
    
    // Update portfolio
    updatePortfolio(userData);
    
    // Update reviews
    updateReviews(userData);
    
    // Update modal content
    updateModalContent(userData);
}

// Update profile header
function updateProfileHeader(userData) {
    // Update profile name
    const profileName = document.getElementById('profileName');
    if (profileName) {
        profileName.textContent = userData.name;
    }
    
    // Update profile title
    const profileTitle = document.getElementById('profileTitle');
    if (profileTitle) {
        profileTitle.textContent = userData.title;
    }
    
    // Update profile avatar
    const profileAvatar = document.getElementById('profileAvatar');
    if (profileAvatar) {
        const firstLetter = userData.name.charAt(0);
        const colors = ['#4B0082', '#667eea', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];
        const color = colors[userData.id.length % colors.length];
        profileAvatar.src = `https://via.placeholder.com/120x120/${color.replace('#', '')}/ffffff?text=${encodeURIComponent(firstLetter)}`;
        profileAvatar.alt = userData.name;
    }
    
    // Update rating
    const ratingStars = document.getElementById('profileStars');
    if (ratingStars) {
        updateRatingStars(ratingStars, userData.rating);
    }
    
    // Update rating text
    const ratingText = document.querySelector('.rating-text');
    if (ratingText) {
        ratingText.textContent = `${userData.rating} (${userData.reviewCount} تقييم)`;
    }
    
    // Update verification status
    const verificationBadge = document.querySelector('.verification-badge');
    if (verificationBadge) {
        if (userData.isVerified) {
            verificationBadge.innerHTML = '<i class="fas fa-check-circle"></i><span>موثق</span>';
            verificationBadge.style.display = 'flex';
        } else {
            verificationBadge.style.display = 'none';
        }
    }
}

// Update contact information
function updateContactInfo(userData) {
    const contactInfo = userData.contactInfo;
    
    // Update phone display
    const phoneDisplay = document.getElementById('phoneDisplay');
    if (phoneDisplay) {
        phoneDisplay.textContent = contactInfo.phone;
    }
    
    // Update email display
    const emailDisplay = document.getElementById('emailDisplay');
    if (emailDisplay) {
        emailDisplay.textContent = contactInfo.email;
    }
    
    // Update other contact methods
    const whatsappDisplay = document.getElementById('whatsappDisplay');
    if (whatsappDisplay) {
        whatsappDisplay.textContent = contactInfo.whatsapp;
    }
    
    const telegramDisplay = document.getElementById('telegramDisplay');
    if (telegramDisplay) {
        telegramDisplay.textContent = contactInfo.telegram;
    }
    
    const linkedinDisplay = document.getElementById('linkedinDisplay');
    if (linkedinDisplay) {
        linkedinDisplay.textContent = contactInfo.linkedin;
    }
    
    const githubDisplay = document.getElementById('githubDisplay');
    if (githubDisplay) {
        githubDisplay.textContent = contactInfo.github;
    }
    
    const websiteDisplay = document.getElementById('websiteDisplay');
    if (websiteDisplay) {
        websiteDisplay.textContent = contactInfo.website;
    }
    
    const discordDisplay = document.getElementById('discordDisplay');
    if (discordDisplay) {
        discordDisplay.textContent = contactInfo.discord;
    }
}

// Update skills section
function updateSkillsSection(userData) {
    const skillsList = document.getElementById('skillsList');
    if (skillsList) {
        skillsList.innerHTML = '';
        
        userData.skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <span class="skill-name">${skill.name}</span>
                <div class="skill-level">
                    <div class="skill-bar" style="width: ${skill.level}%"></div>
                </div>
            `;
            skillsList.appendChild(skillItem);
        });
    }
}

// Update statistics
function updateStatistics(userData) {
    const stats = userData.stats;
    
    // Update stats in sidebar
    const sidebarStats = document.querySelectorAll('.stat-item .stat-number');
    if (sidebarStats.length >= 4) {
        sidebarStats[0].textContent = stats.completedProjects;
        sidebarStats[1].textContent = `${stats.satisfactionRate}%`;
        sidebarStats[2].textContent = stats.experienceYears;
        sidebarStats[3].textContent = stats.responseTime;
    }
    
    // Update main stats section
    const mainStats = document.querySelectorAll('.stats-section .stat-number');
    if (mainStats.length >= 4) {
        mainStats[0].textContent = `${stats.experienceYears}+`;
        mainStats[1].textContent = `${stats.completedProjects}+`;
        mainStats[2].textContent = `${Math.floor(stats.completedProjects * 0.8)}+`;
        mainStats[3].textContent = `${userData.skills.length}+`;
    }
}

// Update rating stars
function updateRatingStars(container, rating) {
    container.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        if (i <= Math.floor(rating)) {
            star.className = 'fas fa-star';
        } else if (i - rating < 1) {
            star.className = 'fas fa-star-half-alt';
        } else {
            star.className = 'far fa-star';
        }
        star.setAttribute('data-rating', i);
        container.appendChild(star);
    }
}

// Update portfolio (placeholder)
function updatePortfolio(userData) {
    // This would be populated with actual portfolio data
    console.log(`Portfolio would be updated for ${userData.name}`);
}

// Update reviews (placeholder)
function updateReviews(userData) {
    // This would be populated with actual review data
    console.log(`Reviews would be updated for ${userData.name}`);
}

// Update modal content
function updateModalContent(userData) {
    // Update contact modal
    const contactModalTitle = document.querySelector('#contactModal .modal-header h3');
    if (contactModalTitle) {
        contactModalTitle.innerHTML = `<i class="fas fa-phone"></i> التواصل مع ${userData.name}`;
    }
    
    // Update rating modal
    const ratingModalUser = document.querySelector('#ratingModal .user-details h4');
    if (ratingModalUser) {
        ratingModalUser.textContent = userData.name;
    }
    
    const ratingModalTitle = document.querySelector('#ratingModal .user-details p');
    if (ratingModalTitle) {
        ratingModalTitle.textContent = userData.title;
    }
}

// Initialize page with user data
document.addEventListener('DOMContentLoaded', function() {
    console.log(`Loading profile for user: ${requestedUserId}`);
    loadUserProfile(requestedUserId);
    
    // Initialize other functionality
    initializeUserProfilePage();
});

// Initialize user profile page functionality
function initializeUserProfilePage() {
    // Initialize navigation
    // if (hamburger && navMenu) {
    //     hamburger.addEventListener('click', () => {
    //         navMenu.classList.toggle('active');
    //     });
    // } // Handled by shared navigation
    
    // Initialize modals
    initializeModals();
    
    // Initialize contact actions
    initializeContactActions();
    
    // Initialize rating functionality
    initializeRating();
    
    console.log('User profile page initialized');
}

// ========================================
// POST INTERACTION FUNCTIONS (Same as Profile Page)
// ========================================

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

// Create Post Modal Functions
function showCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        
        // Focus on textarea
        const textarea = document.getElementById('postContent');
        if (textarea) {
            setTimeout(() => {
                textarea.focus();
            }, 300);
        }
    }
}

function closeCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Clear form
        const textarea = document.getElementById('postContent');
        const imagePreview = document.getElementById('imagePreview');
        const charCount = document.getElementById('charCount');
        
        if (textarea) textarea.value = '';
        if (imagePreview) imagePreview.style.display = 'none';
        if (charCount) charCount.textContent = '0';
    }
}

// Make functions globally available
window.toggleLike = toggleLike;
window.toggleComments = toggleComments;
window.sharePost = sharePost;
window.handleCommentKeypress = handleCommentKeypress;
window.addComment = addComment;
window.removeComment = removeComment;
window.shareToWhatsApp = shareToWhatsApp;
window.shareToFacebook = shareToFacebook;
window.shareToTwitter = shareToTwitter;
window.copyPostToClipboard = copyPostToClipboard;
window.showCreatePostModal = showCreatePostModal;
window.closeCreatePostModal = closeCreatePostModal;

// ========================================
// REVIEWS AND RATINGS SYSTEM
// ========================================

// Reviews data structure
let reviewsData = [
    {
        id: 1,
        reviewerName: 'سارة أحمد محمد',
        rating: 5,
        comment: 'عمل ممتاز ومهني عالي جداً. أنجز المشروع في الوقت المحدد وبالجودة المطلوبة. التواصل كان ممتاز طوال فترة العمل. سأتعامل معه مرة أخرى بالتأكيد وأوصي به بشدة.',
        date: 'منذ 3 أيام'
    },
    {
        id: 2,
        reviewerName: 'محمد علي حسن',
        rating: 4,
        comment: 'مطور محترف ومتجاوب. ساعدني في تطوير تطبيق جوال متقدم وكان العمل سلس وممتع. الكود نظيف ومنظم وسهل الصيانة. أنصح بالتعامل معه.',
        date: 'منذ أسبوع'
    },
    {
        id: 3,
        reviewerName: 'فاطمة محمود',
        rating: 5,
        comment: 'تجربة رائعة في التعامل مع هذا المطور. عمل احترافي ومتقن. ساعدني في تطوير موقع إلكتروني متقدم وكان العمل ممتاز.',
        date: 'منذ أسبوعين'
    }
];

// Scroll to reviews section
function scrollToReviewsSection() {
    const reviewsSection = document.getElementById('reviewsSection');
    if (reviewsSection) {
        reviewsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // Show notification
        showNotification('تم الانتقال إلى قسم التقييمات', 'info');
        
        // Highlight the section briefly
        reviewsSection.style.animation = 'highlightSection 2s ease';
        setTimeout(() => {
            reviewsSection.style.animation = '';
        }, 2000);
    }
}

// Show add review form
function showAddReviewForm() {
    const addReviewForm = document.getElementById('addReviewForm');
    if (addReviewForm) {
        addReviewForm.style.display = 'block';
        addReviewForm.style.animation = 'slideInDown 0.3s ease';
        
        // Focus on reviewer name input
        const reviewerNameInput = document.getElementById('reviewerName');
        if (reviewerNameInput) {
            setTimeout(() => {
                reviewerNameInput.focus();
            }, 300);
        }
        
        // Initialize star rating
        initializeStarRating();
        
        // Initialize character counter
        initializeReviewCharCounter();
        
        showNotification('تم فتح نموذج إضافة التقييم', 'info');
    }
}

// Hide add review form
function hideAddReviewForm() {
    const addReviewForm = document.getElementById('addReviewForm');
    if (addReviewForm) {
        addReviewForm.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            addReviewForm.style.display = 'none';
            // Reset form
            resetReviewForm();
        }, 300);
        
        showNotification('تم إغلاق نموذج إضافة التقييم', 'info');
    }
}

// Initialize star rating
function initializeStarRating() {
    const starRating = document.getElementById('reviewStarRating');
    const ratingText = document.getElementById('ratingTextInput');
    
    if (starRating && ratingText) {
        const stars = starRating.querySelectorAll('i');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                updateStarDisplay(stars, rating);
                updateRatingText(rating);
            });
            
            star.addEventListener('mouseenter', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                updateStarDisplay(stars, rating);
            });
        });
        
        starRating.addEventListener('mouseleave', function() {
            const currentRating = getCurrentRating();
            updateStarDisplay(stars, currentRating);
        });
    }
}

// Update star display
function updateStarDisplay(stars, rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.className = 'fas fa-star';
            star.style.color = '#ffc107';
        } else {
            star.className = 'far fa-star';
            star.style.color = '#ccc';
        }
    });
}

// Get current rating
function getCurrentRating() {
    const starRating = document.getElementById('reviewStarRating');
    if (starRating) {
        const filledStars = starRating.querySelectorAll('.fas.fa-star');
        return filledStars.length;
    }
    return 0;
}

// Update rating text
function updateRatingText(rating) {
    const ratingText = document.getElementById('ratingTextInput');
    if (ratingText) {
        const ratingMessages = {
            1: 'سيء جداً',
            2: 'سيء',
            3: 'جيد',
            4: 'جيد جداً',
            5: 'ممتاز'
        };
        ratingText.textContent = ratingMessages[rating] || 'اختر التقييم';
    }
}

// Initialize review character counter
function initializeReviewCharCounter() {
    const reviewComment = document.getElementById('reviewComment');
    const charCount = document.getElementById('reviewCharCount');
    
    if (reviewComment && charCount) {
        reviewComment.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            // Update counter color based on length
            if (length > 450) {
                charCount.style.color = '#dc3545';
            } else if (length > 400) {
                charCount.style.color = '#ffc107';
            } else {
                charCount.style.color = '#6c757d';
            }
        });
    }
}

// Reset review form
function resetReviewForm() {
    const reviewerName = document.getElementById('reviewerName');
    const reviewComment = document.getElementById('reviewComment');
    const charCount = document.getElementById('reviewCharCount');
    const ratingText = document.getElementById('ratingTextInput');
    
    if (reviewerName) reviewerName.value = '';
    if (reviewComment) reviewComment.value = '';
    if (charCount) charCount.textContent = '0';
    if (ratingText) ratingText.textContent = 'اختر التقييم';
    
    // Reset stars
    const starRating = document.getElementById('reviewStarRating');
    if (starRating) {
        const stars = starRating.querySelectorAll('i');
        stars.forEach(star => {
            star.className = 'far fa-star';
            star.style.color = '#ccc';
        });
    }
}

// Submit direct review
function submitDirectReview() {
    const reviewerName = document.getElementById('reviewerName');
    const reviewComment = document.getElementById('reviewComment');
    const rating = getCurrentRating();
    
    // Validate inputs
    if (!reviewerName || !reviewerName.value.trim()) {
        showNotification('يرجى إدخال اسمك', 'warning');
        reviewerName?.focus();
        return;
    }
    
    if (rating === 0) {
        showNotification('يرجى اختيار تقييم', 'warning');
        return;
    }
    
    if (!reviewComment || !reviewComment.value.trim()) {
        showNotification('يرجى كتابة تعليق', 'warning');
        reviewComment?.focus();
        return;
    }
    
    // Create new review
    const newReview = {
        id: Date.now(),
        reviewerName: reviewerName.value.trim(),
        rating: rating,
        comment: reviewComment.value.trim(),
        date: 'الآن'
    };
    
    // Add to reviews data
    reviewsData.unshift(newReview);
    
    // Update reviews display
    updateReviewsDisplay();
    
    // Update overall rating
    updateOverallRating();
    
    // Hide form
    hideAddReviewForm();
    
    // Show success message
    showNotification('تم إضافة التقييم بنجاح!', 'success');
}

// Update reviews display
function updateReviewsDisplay() {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    reviewsList.innerHTML = reviewsData.map(review => `
        <div class="review-item new-review">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="reviewer-details">
                        <h5>${review.reviewerName}</h5>
                        <div class="review-stars">
                            ${generateStars(review.rating)}
                        </div>
                    </div>
                </div>
                <span class="review-date">${review.date}</span>
            </div>
            <p class="review-text">${review.comment}</p>
        </div>
    `).join('');
}

// Generate stars HTML
function generateStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    return starsHTML;
}

// Update overall rating
function updateOverallRating() {
    if (reviewsData.length === 0) return;
    
    const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviewsData.length;
    const roundedRating = Math.round(averageRating * 10) / 10;
    
    // Update profile stars
    const profileStars = document.getElementById('profileStars');
    if (profileStars) {
        const stars = profileStars.querySelectorAll('i');
        stars.forEach((star, index) => {
            if (index < Math.floor(roundedRating)) {
                star.className = 'fas fa-star';
            } else if (index === Math.floor(roundedRating) && roundedRating % 1 > 0) {
                star.className = 'fas fa-star-half-alt';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
    
    // Update rating text
    const ratingText = document.querySelector('.rating-text');
    if (ratingText) {
        ratingText.textContent = `${roundedRating} (${reviewsData.length} تقييم)`;
    }
}

// Show notification function (if not already defined)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Make functions globally available
window.scrollToReviewsSection = scrollToReviewsSection;
window.showAddReviewForm = showAddReviewForm;
window.hideAddReviewForm = hideAddReviewForm;
window.submitDirectReview = submitDirectReview;
window.showNotification = showNotification;

// ========================================
// PROFILE SHARING SYSTEM
// ========================================

// Show share modal
function showShareModal() {
    const shareModal = document.getElementById('shareProfileModal');
    if (shareModal) {
        shareModal.style.display = 'flex';
        shareModal.classList.add('show');
        
        // Add visual feedback
        showNotification('تم فتح خيارات المشاركة', 'info');
    }
}

// Close share modal
function closeShareModal() {
    const shareModal = document.getElementById('shareProfileModal');
    if (shareModal) {
        shareModal.classList.remove('show');
        setTimeout(() => {
            shareModal.style.display = 'none';
        }, 300);
    }
}

// Share profile to WhatsApp
function shareToWhatsAppProfile() {
    const profileUrl = window.location.href;
    const profileName = document.querySelector('.profile-name h2')?.textContent || 'أحمد محمد سعيد';
    const profileTitle = document.querySelector('.profile-title')?.textContent || 'مطور ويب ومطور تطبيقات جوال';
    
    const message = `تعرف على ${profileName} - ${profileTitle}\n\n${profileUrl}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    closeShareModal();
    showNotification('تم فتح واتساب للمشاركة', 'success');
}

// Share profile to Facebook
function shareToFacebookProfile() {
    const profileUrl = encodeURIComponent(window.location.href);
    const profileName = document.querySelector('.profile-name h2')?.textContent || 'أحمد محمد سعيد';
    const profileTitle = document.querySelector('.profile-title')?.textContent || 'مطور ويب ومطور تطبيقات جوال';
    
    const quote = encodeURIComponent(`تعرف على ${profileName} - ${profileTitle}`);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${profileUrl}&quote=${quote}`;
    
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    closeShareModal();
    showNotification('تم فتح فيسبوك للمشاركة', 'success');
}

// Share profile to Twitter
function shareToTwitterProfile() {
    const profileUrl = encodeURIComponent(window.location.href);
    const profileName = document.querySelector('.profile-name h2')?.textContent || 'أحمد محمد سعيد';
    const profileTitle = document.querySelector('.profile-title')?.textContent || 'مطور ويب ومطور تطبيقات جوال';
    
    const text = encodeURIComponent(`تعرف على ${profileName} - ${profileTitle}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${profileUrl}`;
    
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    closeShareModal();
    showNotification('تم فتح تويتر للمشاركة', 'success');
}

// Share profile to LinkedIn
function shareToLinkedIn() {
    const profileUrl = encodeURIComponent(window.location.href);
    const profileName = document.querySelector('.profile-name h2')?.textContent || 'أحمد محمد سعيد';
    const profileTitle = document.querySelector('.profile-title')?.textContent || 'مطور ويب ومطور تطبيقات جوال';
    
    const title = encodeURIComponent(profileName);
    const summary = encodeURIComponent(profileTitle);
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${profileUrl}&title=${title}&summary=${summary}`;
    
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
    closeShareModal();
    showNotification('تم فتح لينكد إن للمشاركة', 'success');
}

// Copy profile link to clipboard
function copyProfileLink() {
    const profileUrl = window.location.href;
    
    if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        navigator.clipboard.writeText(profileUrl).then(() => {
            closeShareModal();
            showNotification('تم نسخ رابط الملف الشخصي بنجاح', 'success');
        }).catch(() => {
            fallbackCopyProfileLink(profileUrl);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyProfileLink(profileUrl);
    }
}

// Fallback copy function
function fallbackCopyProfileLink(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        closeShareModal();
        showNotification('تم نسخ رابط الملف الشخصي بنجاح', 'success');
    } catch (err) {
        showNotification('فشل في نسخ الرابط', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Close share post modal
function closeSharePostModal() {
    const sharePostModal = document.getElementById('sharePostModal');
    if (sharePostModal) {
        sharePostModal.classList.remove('show');
        setTimeout(() => {
            sharePostModal.style.display = 'none';
        }, 300);
    }
}

// Share post to WhatsApp
function sharePostToWhatsApp() {
    const postContent = getCurrentPostContent();
    const message = encodeURIComponent(postContent);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    closeSharePostModal();
    showNotification('تم فتح واتساب للمشاركة', 'success');
}

// Share post to Facebook
function sharePostToFacebook() {
    const postContent = getCurrentPostContent();
    const url = encodeURIComponent(window.location.href);
    const quote = encodeURIComponent(postContent);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
    
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    closeSharePostModal();
    showNotification('تم فتح فيسبوك للمشاركة', 'success');
}

// Share post to Twitter
function sharePostToTwitter() {
    const postContent = getCurrentPostContent();
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(postContent);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    closeSharePostModal();
    showNotification('تم فتح تويتر للمشاركة', 'success');
}

// Copy post to clipboard
function copyPostToClipboard() {
    const postContent = getCurrentPostContent();
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(postContent).then(() => {
            closeSharePostModal();
            showNotification('تم نسخ محتوى المنشور بنجاح', 'success');
        }).catch(() => {
            fallbackCopyPostContent(postContent);
        });
    } else {
        fallbackCopyPostContent(postContent);
    }
}

// Fallback copy post content
function fallbackCopyPostContent(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        closeSharePostModal();
        showNotification('تم نسخ محتوى المنشور بنجاح', 'success');
    } catch (err) {
        showNotification('فشل في نسخ المحتوى', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Get current post content (for post sharing)
function getCurrentPostContent() {
    // This function gets the content of the currently selected post
    // For now, return a default message
    const profileName = document.querySelector('.profile-name h2')?.textContent || 'أحمد محمد سعيد';
    const profileTitle = document.querySelector('.profile-title')?.textContent || 'مطور ويب ومطور تطبيقات جوال';
    
    return `منشور من ${profileName} - ${profileTitle}`;
}

// Make sharing functions globally available
window.showShareModal = showShareModal;
window.closeShareModal = closeShareModal;
window.shareToWhatsAppProfile = shareToWhatsAppProfile;
window.shareToFacebookProfile = shareToFacebookProfile;
window.shareToTwitterProfile = shareToTwitterProfile;
window.shareToLinkedIn = shareToLinkedIn;
window.copyProfileLink = copyProfileLink;
window.closeSharePostModal = closeSharePostModal;
window.sharePostToWhatsApp = sharePostToWhatsApp;
window.sharePostToFacebook = sharePostToFacebook;
window.sharePostToTwitter = sharePostToTwitter;
window.copyPostToClipboard = copyPostToClipboard;

// ========================================
// CONTACT INFORMATION SYSTEM
// ========================================

// Scroll to contact information section
function scrollToContactInfo() {
    const contactSection = document.getElementById('contactInfoSection');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // Show notification
        showNotification('تم الانتقال إلى معلومات التواصل', 'info');
        
        // Highlight the section briefly
        contactSection.style.animation = 'highlightSection 2s ease';
        setTimeout(() => {
            contactSection.style.animation = '';
        }, 2000);
    }
}

// Make phone call
function makeCall(phoneNumber) {
    // Remove any non-digit characters except + for international numbers
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    // Create tel: link
    const telUrl = `tel:${cleanNumber}`;
    
    // Try to make the call
    try {
        window.location.href = telUrl;
        showNotification('جاري الاتصال...', 'info');
    } catch (error) {
        // Fallback: copy to clipboard
        copyToClipboard(phoneNumber);
        showNotification('تم نسخ رقم الهاتف للحافظة', 'success');
    }
}

// Send email
function sendEmail(emailAddress) {
    const subject = encodeURIComponent('استفسار عن الخدمات');
    const body = encodeURIComponent('مرحباً،\n\nأود الاستفسار عن خدماتك.\n\nشكراً لك');
    const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    
    try {
        window.location.href = mailtoUrl;
        showNotification('جاري فتح تطبيق البريد الإلكتروني', 'info');
    } catch (error) {
        // Fallback: copy to clipboard
        copyToClipboard(emailAddress);
        showNotification('تم نسخ البريد الإلكتروني للحافظة', 'success');
    }
}

// Open WhatsApp
function openWhatsApp(phoneNumber) {
    // Remove any non-digit characters except + for international numbers
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    // Remove + and add country code if needed (assuming Egypt +20)
    let whatsappNumber = cleanNumber;
    if (cleanNumber.startsWith('0')) {
        whatsappNumber = '+20' + cleanNumber.substring(1);
    } else if (!cleanNumber.startsWith('+')) {
        whatsappNumber = '+20' + cleanNumber;
    }
    
    const message = encodeURIComponent('مرحباً، أود التواصل معك بخصوص الخدمات');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    showNotification('تم فتح واتساب', 'success');
}

// Open Telegram
function openTelegram(username) {
    // Remove @ if present
    const cleanUsername = username.replace('@', '');
    const telegramUrl = `https://t.me/${cleanUsername}`;
    
    try {
        window.open(telegramUrl, '_blank');
        showNotification('تم فتح تليجرام', 'success');
    } catch (error) {
        // Fallback: copy to clipboard
        copyToClipboard(username);
        showNotification('تم نسخ اسم المستخدم للحافظة', 'success');
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        navigator.clipboard.writeText(text).then(() => {
            showNotification('تم النسخ بنجاح', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(text);
    }
}

// Fallback copy function
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('تم النسخ بنجاح', 'success');
    } catch (err) {
        showNotification('فشل في النسخ', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Make contact functions globally available
window.scrollToContactInfo = scrollToContactInfo;
window.makeCall = makeCall;
window.sendEmail = sendEmail;
window.openWhatsApp = openWhatsApp;
window.openTelegram = openTelegram;
window.copyToClipboard = copyToClipboard;
