// Enhanced Social Page JavaScript - New Approach
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeSocialPage();
});

function initializeSocialPage() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize notifications
    initializeNotifications();
    
    // Initialize messages
    initializeMessages();
    
    // Initialize chat
    initializeChat();
    
    // Initialize post interactions
    initializePostInteractions();
    
    // Initialize volunteer requests
    initializeVolunteerRequests();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Initialize user profile features
    initializeUserProfile();
    
    // Initialize search functionality
    initializeSearch();
    
    // Add fade-in animations
    initializeFadeInAnimations();
    
    // Initialize file uploads
    initializeFileUploads();
    
    // Initialize skill selection
    initializeSkillSelection();
    
    // Handle URL anchor for navigation from messages page
    handleURLAnchor();
    
    // Initialize profile avatar click functionality
    initializeProfileAvatars();
}

// Initialize profile avatar click functionality
function initializeProfileAvatars() {
    // Make all existing avatars clickable
    makeProfileAvatarsClickable();
    
    // Update existing avatars
    updateExistingAvatars();
    
    // Add observer for dynamically added content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if new avatars were added
                        const newAvatars = node.querySelectorAll('.user-avatar, .user-avatar-img, .comment-avatar');
                        if (newAvatars.length > 0) {
                            makeProfileAvatarsClickable();
                        }
                    }
                });
            }
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('Profile avatar click functionality initialized');
}

// Handle URL anchor for navigation from messages page
function handleURLAnchor() {
    const hash = window.location.hash;
    
    if (hash === '#notifications') {
        // Open notifications panel automatically
        const notificationsPanel = document.getElementById('notificationsPanel');
        if (notificationsPanel) {
            // Add a small delay to ensure all elements are loaded
            setTimeout(() => {
                notificationsPanel.classList.add('active');
                
                // Add a subtle animation effect
                notificationsPanel.style.transform = 'translateX(100%)';
                notificationsPanel.style.opacity = '0';
                
                setTimeout(() => {
                    notificationsPanel.style.transition = 'all 0.3s ease';
                    notificationsPanel.style.transform = 'translateX(0)';
                    notificationsPanel.style.opacity = '1';
                }, 100);
            }, 300);
        }
    } else if (hash.startsWith('#post-')) {
        // Handle post-specific navigation
        const postId = hash.replace('#post-', '');
        scrollToPost(postId);
    }
}

// Scroll to specific post
function scrollToPost(postId) {
    // Find the post element
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    
    if (postElement) {
        // Scroll to the post with smooth animation
        postElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Add a highlight effect
        postElement.style.transition = 'all 0.3s ease';
        postElement.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
        postElement.style.transform = 'scale(1.02)';
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            postElement.style.boxShadow = '';
            postElement.style.transform = '';
        }, 2000);
        
        showNotification(`تم العثور على المنشور ${postId}`, 'success');
    } else {
        showNotification('لم يتم العثور على المنشور المطلوب', 'warning');
    }
}

// Initialize navigation
function initializeNavigation() {
    // const hamburger = document.getElementById('hamburger'); // Handled by shared navigation
    const navMenu = document.getElementById('nav-menu');
    
    // if (hamburger && navMenu) {
    //     hamburger.addEventListener('click', () => {
    //         navMenu.classList.toggle('active');
    //         hamburger.classList.toggle('active');
    //     });
    //
    //     // Close menu when clicking on links
    //     const navLinks = document.querySelectorAll('.nav-link');
    //     navLinks.forEach(link => {
    //         link.addEventListener('click', () => {
    //             navMenu.classList.remove('active');
    //             hamburger.classList.remove('active');
    //         });
    //     });
    // } // Handled by shared navigation
}

// Initialize notifications
function initializeNotifications() {
    const notificationsBtn = document.getElementById('notificationsBtn');
    const notificationsPanel = document.getElementById('notificationsPanel');
    const closeNotifications = document.getElementById('closeNotifications');
    
    if (notificationsBtn) {
        // Add navigation to messages page with notifications anchor
        notificationsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Navigate to messages page with notifications section
            window.location.href = '../messages/messages.html#notifications';
        });
        
        // Add hover effect for better UX
        notificationsBtn.addEventListener('mouseenter', () => {
            notificationsBtn.style.transform = 'scale(1.1)';
            notificationsBtn.style.transition = 'all 0.3s ease';
        });
        
        notificationsBtn.addEventListener('mouseleave', () => {
            notificationsBtn.style.transform = 'scale(1)';
        });
    }
    
    // Keep existing panel functionality if panel exists
    if (notificationsBtn && notificationsPanel) {
        // Add right-click for panel (alternative functionality)
        notificationsBtn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            notificationsPanel.classList.toggle('active');
            // Close other panels
            const messagesPanel = document.getElementById('messagesPanel');
            if (messagesPanel) {
                messagesPanel.classList.remove('active');
            }
        });
    }
    
    if (closeNotifications) {
        closeNotifications.addEventListener('click', () => {
            notificationsPanel.classList.remove('active');
        });
    }
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (notificationsPanel && notificationsBtn && 
            !notificationsPanel.contains(e.target) && !notificationsBtn.contains(e.target)) {
            notificationsPanel.classList.remove('active');
        }
    });
    
    // Initialize filter buttons
    initializeNotificationFilters();
    
    // Initialize mark all read button
    initializeMarkAllRead();
    
    // Initialize notification actions
    initializeNotificationActions();
}

// Initialize messages
function initializeMessages() {
    const messagesBtn = document.getElementById('messagesBtn');
    const messagesPanel = document.getElementById('messagesPanel');
    const closeMessages = document.getElementById('closeMessages');
    
    if (messagesBtn) {
        // Add navigation to messages page
        messagesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Navigate to messages page
            window.location.href = '../messages/messages.html';
        });
        
        // Add hover effect for better UX
        messagesBtn.addEventListener('mouseenter', () => {
            messagesBtn.style.transform = 'scale(1.1)';
            messagesBtn.style.transition = 'all 0.3s ease';
        });
        
        messagesBtn.addEventListener('mouseleave', () => {
            messagesBtn.style.transform = 'scale(1)';
        });
    }
    
    // Keep existing panel functionality if panel exists
    if (messagesBtn && messagesPanel) {
        // Add right-click for panel (alternative functionality)
        messagesBtn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            messagesPanel.classList.toggle('active');
            // Close other panels
            const notificationsPanel = document.getElementById('notificationsPanel');
            if (notificationsPanel) {
                notificationsPanel.classList.remove('active');
            }
        });
    }
    
    if (closeMessages) {
        closeMessages.addEventListener('click', () => {
            messagesPanel.classList.remove('active');
        });
    }
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (messagesPanel && messagesBtn && 
            !messagesPanel.contains(e.target) && !messagesBtn.contains(e.target)) {
            messagesPanel.classList.remove('active');
        }
    });
}

// Initialize chat
function initializeChat() {
    const chatMessageInput = document.getElementById('chatMessageInput');
    
    if (chatMessageInput) {
        // Auto-resize textarea
        chatMessageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
        
        // Send message on Enter
        chatMessageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}


// Initialize user profile features
function initializeUserProfile() {
    // User profile dropdown functionality
    const userProfileDropdown = document.getElementById('userProfileDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (userProfileDropdown && dropdownMenu) {
        userProfileDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (dropdownMenu && userProfileDropdown && 
            !userProfileDropdown.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });
}

// Initialize search functionality
function initializeSearch() {
    const messagesSearch = document.getElementById('messagesSearch');
    
    if (messagesSearch) {
        messagesSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const messageItems = document.querySelectorAll('.message-item');
            
            messageItems.forEach(item => {
                const userName = item.querySelector('.message-name').textContent.toLowerCase();
                const messagePreview = item.querySelector('.message-preview').textContent.toLowerCase();
                
                if (userName.includes(searchTerm) || messagePreview.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Initialize skill selection
function initializeSkillSelection() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}

// Send message function
function sendMessage() {
    const chatMessageInput = document.getElementById('chatMessageInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (chatMessageInput && chatMessageInput.value.trim()) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent fade-in';
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${chatMessageInput.value}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessageInput.value = '';
        chatMessageInput.style.height = 'auto';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate reply after 2 seconds
        setTimeout(() => {
            const replyDiv = document.createElement('div');
            replyDiv.className = 'message received fade-in';
            
            const replyTime = new Date();
            const replyTimeString = replyTime.toLocaleTimeString('ar-EG', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            replyDiv.innerHTML = `
                <div class="message-content">
                    <p>شكراً لك على رسالتك! سأرد عليك قريباً</p>
                    <span class="message-time">${replyTimeString}</span>
                </div>
            `;
            
            chatMessages.appendChild(replyDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 2000);
    }
}

// Open chat function
function openChat(userId) {
    const chatWindow = document.getElementById('chatWindow');
    const chatUserName = document.getElementById('chatUserName');
    const chatUserAvatar = document.getElementById('chatUserAvatar');
    const chatUserStatus = document.getElementById('chatUserStatus');
    const chatUserStatusText = document.getElementById('chatUserStatusText');
    const messagesPanel = document.getElementById('messagesPanel');
    
    // User data
    const userData = {
        'sara': {
            name: 'سارة أحمد',
            avatar: 'https://via.placeholder.com/40x40/667eea/ffffff?text=س',
            status: 'online',
            statusText: 'متصل الآن'
        },
        'mohamed': {
            name: 'محمد علي',
            avatar: 'https://via.placeholder.com/40x40/28a745/ffffff?text=م',
            status: 'offline',
            statusText: 'آخر ظهور منذ ساعة'
        },
        'fatima': {
            name: 'فاطمة محمود',
            avatar: 'https://via.placeholder.com/40x40/dc3545/ffffff?text=ف',
            status: 'online',
            statusText: 'متصل الآن'
        },
        'ali': {
            name: 'علي محمد',
            avatar: 'https://via.placeholder.com/40x40/ffc107/ffffff?text=ع',
            status: 'away',
            statusText: 'بعيد'
        }
    };
    
    if (userData[userId]) {
        const user = userData[userId];
        chatUserName.textContent = user.name;
        chatUserAvatar.src = user.avatar;
        chatUserStatus.className = `online-status ${user.status}`;
        chatUserStatusText.textContent = user.statusText;
    }
    
    chatWindow.classList.add('active');
    messagesPanel.classList.remove('active');
    
    // Update unread badges
    const messageItems = document.querySelectorAll('.message-item');
    messageItems.forEach(item => {
        if (item.getAttribute('data-user-id') === userId) {
            const unreadBadge = item.querySelector('.unread-badge');
            if (unreadBadge) {
                unreadBadge.style.display = 'none';
            }
            item.classList.remove('unread');
        }
    });
}

// Initialize post interactions
function initializePostInteractions() {
    // Initialize post creation
    const publishBtn = document.getElementById('publishPostBtn');
    const postText = document.getElementById('postText');
    
    if (publishBtn && postText) {
        publishBtn.addEventListener('click', createPost);
    }
    
    // Initialize file upload
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
}

// Create post function
function createPost() {
    const postText = document.getElementById('postText');
    const postPrivacy = document.getElementById('postPrivacy');
    const postsFeed = document.getElementById('postsFeed');
    const publishBtn = document.getElementById('publishPostBtn');
    
    if (postText && postText.value.trim()) {
        // Show loading state
        publishBtn.classList.add('loading');
        
        setTimeout(() => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card fade-in';
            postCard.setAttribute('data-post-id', Date.now());
            
            const now = new Date();
            const timeString = 'الآن';
            
            postCard.innerHTML = `
                <div class="post-header">
                    <div class="user-info" onclick="viewUserProfile('ahmed')">
                        <div class="user-avatar">
                            <img src="https://via.placeholder.com/50x50/4B0082/ffffff?text=أ" alt="أحمد" class="user-avatar-img">
                        </div>
                        <div class="user-details">
                            <span class="user-name">أحمد سعيد</span>
                            <span class="post-time">${timeString}</span>
                            <span class="post-privacy-badge">${postPrivacy.value === 'public' ? 'عام' : 'خاص'}</span>
                        </div>
                    </div>
                    <div class="post-menu">
                        <button class="menu-btn" onclick="togglePostMenu(${Date.now()})">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                        <div class="post-menu-dropdown" id="postMenu${Date.now()}">
                            <a href="#" onclick="reportPost(${Date.now()})">إبلاغ</a>
                            <a href="#" onclick="hidePost(${Date.now()})">إخفاء</a>
                            <a href="#" onclick="copyPostLink(${Date.now()})">نسخ الرابط</a>
                        </div>
                    </div>
                </div>
                
                <div class="post-content">
                    <p>${postText.value}</p>
                </div>
                
                <div class="post-actions">
                    <button class="action-btn like-btn" onclick="toggleLike(${Date.now()})" data-liked="false">
                        <i class="far fa-heart"></i>
                        <span class="like-count">0</span>
                    </button>
                    <button class="action-btn comment-btn" onclick="toggleComments(${Date.now()})">
                        <i class="far fa-comment"></i>
                        <span class="comment-count">0</span>
                    </button>
                    <button class="action-btn share-btn" onclick="sharePost(${Date.now()})">
                        <i class="fas fa-share"></i>
                    </button>
                    <button class="action-btn message-btn" onclick="openChat('ahmed')">
                        <i class="fas fa-envelope"></i>
                    </button>
                    <button class="action-btn volunteer-btn" onclick="showVolunteerModal('ahmed')">
                        <i class="fas fa-hand-holding-heart"></i>
                        طلب تطوع
                    </button>
                </div>
                
                <div class="comments-section" id="comments${Date.now()}" style="display: none;">
                    <div class="comments-list">
                    </div>
                    <div class="add-comment">
                        <img src="https://via.placeholder.com/30x30/4B0082/ffffff?text=أ" alt="أحمد" class="comment-avatar">
                        <input type="text" class="comment-input" placeholder="اكتب تعليقك..." onkeypress="handleCommentKeypress(event, ${Date.now()})">
                        <button class="btn btn-sm btn-primary" onclick="addComment(${Date.now()})">إرسال</button>
                    </div>
                </div>
            `;
            
            // Add to feed
            postsFeed.insertBefore(postCard, postsFeed.firstChild);
            
            // Clear form
            postText.value = '';
            
            // Hide loading state
            publishBtn.classList.remove('loading');
            
            // Show success notification
            showNotification('تم نشر المنشور بنجاح!', 'success');
        }, 1500);
    } else {
        showNotification('يرجى كتابة محتوى للمنشور', 'error');
    }
}

// Handle file upload
function handleFileUpload(event) {
    const files = event.target.files;
    const attachedFiles = document.getElementById('attachedFiles');
    
    if (files.length > 0) {
        attachedFiles.style.display = 'block';
        attachedFiles.innerHTML = '';
        
        Array.from(files).forEach(file => {
            const fileDiv = document.createElement('div');
            fileDiv.className = 'attached-file';
            fileDiv.innerHTML = `
                <i class="fas fa-file"></i>
                <span>${file.name}</span>
                <button onclick="removeFile(this)" class="remove-file">
                    <i class="fas fa-times"></i>
                </button>
            `;
            attachedFiles.appendChild(fileDiv);
        });
    }
}

// Remove file function
function removeFile(button) {
    const fileDiv = button.parentElement;
    fileDiv.remove();
    
    const attachedFiles = document.getElementById('attachedFiles');
    if (attachedFiles.children.length === 0) {
        attachedFiles.style.display = 'none';
    }
}

// Toggle like function
function toggleLike(postId) {
    const likeBtn = document.querySelector(`[data-post-id="${postId}"] .like-btn`);
    const likeCount = likeBtn.querySelector('.like-count');
    const likeIcon = likeBtn.querySelector('i');
    
    if (likeBtn.getAttribute('data-liked') === 'false') {
        likeBtn.setAttribute('data-liked', 'true');
        likeBtn.classList.add('liked');
        likeIcon.className = 'fas fa-heart';
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        
        // Add animation
        likeIcon.style.animation = 'heartBeat 0.3s ease';
        setTimeout(() => {
            likeIcon.style.animation = '';
        }, 300);
    } else {
        likeBtn.setAttribute('data-liked', 'false');
        likeBtn.classList.remove('liked');
        likeIcon.className = 'far fa-heart';
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
    }
}

// Toggle comments function
function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments${postId}`);
    const commentBtn = document.querySelector(`[data-post-id="${postId}"] .comment-btn`);
    
    if (commentsSection.style.display === 'none') {
        commentsSection.style.display = 'block';
        commentBtn.classList.add('active');
    } else {
        commentsSection.style.display = 'none';
        commentBtn.classList.remove('active');
    }
}

// Handle comment keypress
function handleCommentKeypress(event, postId) {
    if (event.key === 'Enter') {
        addComment(postId);
    }
}

// Add comment function
function addComment(postId) {
    const commentInput = document.querySelector(`#comments${postId} .comment-input`);
    const commentsList = document.querySelector(`#comments${postId} .comments-list`);
    
    if (commentInput && commentInput.value.trim()) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment fade-in';
        
        const now = new Date();
        const timeString = 'الآن';
        
        commentDiv.innerHTML = `
            <div class="comment-user" onclick="viewUserProfile('ahmed')">
                <img src="https://via.placeholder.com/30x30/4B0082/ffffff?text=أ" alt="أحمد" class="comment-avatar">
                <span>أحمد سعيد</span>
            </div>
            <div class="comment-content">
                <p>${commentInput.value}</p>
            </div>
            <span class="comment-time">${timeString}</span>
        `;
        
        commentsList.appendChild(commentDiv);
        commentInput.value = '';
        
        // Update comment count
        const commentCount = document.querySelector(`[data-post-id="${postId}"] .comment-count`);
        commentCount.textContent = parseInt(commentCount.textContent) + 1;
    }
}

// Initialize volunteer requests
function initializeVolunteerRequests() {
    // Add click handlers for volunteer buttons
    const volunteerBtns = document.querySelectorAll('.volunteer-btn');
    volunteerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const postCard = btn.closest('.post-card');
            const userName = postCard.querySelector('.user-name').textContent;
            showVolunteerModal(userName);
        });
    });
}

// Enhanced Volunteer Request Functions
function showVolunteerModal(postId) {
    const modal = document.getElementById('volunteerModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Reset form
        resetVolunteerForm();
    }
}

function closeVolunteerModal() {
    const modal = document.getElementById('volunteerModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetVolunteerForm();
    }
}

function sendVolunteerRequest() {
    const btn = document.getElementById('sendVolunteerBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    btn.disabled = true;
    
    // Collect form data
    const formData = {
        suggestions: document.getElementById('suggestions')?.value || '',
        requiredSkills: document.getElementById('requiredSkills')?.value || '',
        experienceLevel: document.getElementById('experienceLevel')?.value || '',
        workType: document.getElementById('workType')?.value || '',
        additionalRequirements: document.getElementById('additionalRequirements')?.value || '',
        proposedPrice: document.getElementById('proposedPrice')?.value || '',
        priceJustification: document.getElementById('priceJustification')?.value || ''
    };
    
    // Simulate API call
    setTimeout(() => {
        // Reset button state
        btnText.style.display = 'flex';
        btnLoading.style.display = 'none';
        btn.disabled = false;
        
        // Close modal
        closeVolunteerModal();
        
        // Show success message
        showNotification('تم إرسال طلب التطوع بنجاح! سيتم التواصل معك قريباً.', 'success');
    }, 2000);
}

function resetVolunteerForm() {
    const form = document.getElementById('volunteerForm');
    if (form) {
        form.reset();
    }
}

function loadVolunteerProfileData() {
    // Load user profile data from localStorage or API
    const profileData = {
        rating: parseFloat(localStorage.getItem('userRating')) || 4.2,
        completedProjects: parseInt(localStorage.getItem('completedProjects')) || 15,
        responseTime: localStorage.getItem('responseTime') || '2 ساعات',
        improvementGoals: JSON.parse(localStorage.getItem('improvementGoals')) || [
            'تطوير مهارات جديدة',
            'بناء شبكة مهنية',
            'اكتساب خبرة عملية'
        ]
    };
    
    // Update profile preview
    updateProfilePreview(profileData);
}

function updateProfilePreview(data) {
    // Update rating stars
    const ratingElement = document.querySelector('.profile-rating');
    if (ratingElement) {
        ratingElement.innerHTML = generateStarRating(data.rating);
    }
    
    // Update stats
    const statElements = {
        '.stat-projects .stat-value': data.completedProjects,
        '.stat-rating .stat-value': data.rating.toFixed(1),
        '.stat-response .stat-value': data.responseTime
    };
    
    Object.entries(statElements).forEach(([selector, value]) => {
        const element = document.querySelector(selector);
        if (element) element.textContent = value;
    });
    
    // Update improvement goals
    const goalsList = document.querySelector('.improvement-goals ul');
    if (goalsList && data.improvementGoals) {
        goalsList.innerHTML = data.improvementGoals
            .map(goal => `<li><i class="fas fa-check-circle"></i> ${goal}</li>`)
            .join('');
    }
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let html = '';
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star"></i>';
    }
    
    return html;
}

function initializeVolunteerForm() {
    // Skill input functionality
    const skillInput = document.getElementById('skillInput');
    if (skillInput) {
        skillInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill(this.value.trim());
                this.value = '';
            }
        });
    }
    
    // Suggested skills click
    document.querySelectorAll('.skill-suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            addSkill(this.textContent.trim());
        });
    });
    
    // Pricing type change
    const pricingTypes = document.querySelectorAll('input[name="pricingType"]');
    pricingTypes.forEach(radio => {
        radio.addEventListener('change', function() {
            updatePricingInput(this.value);
            updateRequestSummary();
        });
    });
    
    // Form field changes for summary update
    const formFields = document.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('input', updateRequestSummary);
        field.addEventListener('change', updateRequestSummary);
    });
    
    // Form validation
    const form = document.getElementById('volunteerForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateVolunteerForm()) {
                sendVolunteerRequest();
            }
        });
    }
    
    // Save as draft functionality
    const draftBtn = document.querySelector('.btn-outline');
    if (draftBtn) {
        draftBtn.addEventListener('click', function() {
            saveAsDraft();
        });
    }
}

function initializeCharacterCounters() {
    const textareas = document.querySelectorAll('textarea[data-max-length]');
    textareas.forEach(textarea => {
        const maxLength = parseInt(textarea.getAttribute('data-max-length'));
        const counter = textarea.parentElement.querySelector('.char-counter');
        
        if (counter) {
            const updateCounter = () => {
                const remaining = maxLength - textarea.value.length;
                counter.textContent = `${remaining} حرف متبقي`;
                counter.style.color = remaining < 50 ? '#dc3545' : '#6c757d';
            };
            
            textarea.addEventListener('input', updateCounter);
            updateCounter();
        }
    });
}

function resetCharacterCounters() {
    const counters = document.querySelectorAll('.char-counter');
    counters.forEach(counter => {
        const textarea = counter.parentElement.querySelector('textarea[data-max-length]');
        if (textarea) {
            const maxLength = parseInt(textarea.getAttribute('data-max-length'));
            counter.textContent = `${maxLength} حرف متبقي`;
            counter.style.color = '#6c757d';
        }
    });
}

function addSkill(skill) {
    if (!skill) return;
    
    const selectedSkills = document.querySelector('.selected-skills');
    if (!selectedSkills) return;
    
    // Remove "no skills" message
    const noSkillsMsg = selectedSkills.querySelector('.no-skills');
    if (noSkillsMsg) {
        noSkillsMsg.remove();
    }
    
    // Check if skill already exists
    const existingSkills = Array.from(selectedSkills.children).map(tag => 
        tag.textContent.replace('×', '').trim()
    );
    
    if (existingSkills.includes(skill)) return;
    
    const skillTag = document.createElement('span');
    skillTag.className = 'skill-tag-selected';
    skillTag.innerHTML = `${skill} <button type="button" class="skill-remove" onclick="removeSkill(this)">×</button>`;
    
    selectedSkills.appendChild(skillTag);
    updateRequestSummary();
}

function removeSkill(button) {
    const selectedSkills = document.querySelector('.selected-skills');
    button.parentElement.remove();
    
    // Add "no skills" message if empty
    if (selectedSkills.children.length === 0) {
        selectedSkills.innerHTML = '<span class="no-skills">لم يتم اختيار مهارات بعد</span>';
    }
    
    updateRequestSummary();
}

function updatePricingInput(pricingType) {
    const priceInput = document.querySelector('.price-input-section');
    if (!priceInput) return;
    
    if (pricingType === 'discounted' || pricingType === 'normal') {
        priceInput.style.display = 'block';
        const label = priceInput.querySelector('label');
        const input = priceInput.querySelector('input');
        
        if (label && input) {
            if (pricingType === 'discounted') {
                label.textContent = 'السعر المخفض';
                input.placeholder = 'أدخل السعر المخفض';
            } else {
                label.textContent = 'السعر العادي';
                input.placeholder = 'أدخل السعر العادي';
            }
        }
    } else {
        priceInput.style.display = 'none';
    }
}

function updateRequestSummary() {
    const summary = {
        project: document.getElementById('projectTitle')?.value || 'غير محدد',
        category: document.getElementById('projectCategory')?.value || 'غير محدد',
        complexity: document.getElementById('projectComplexity')?.value || 'غير محدد',
        pricing: getPricingText(),
        duration: document.getElementById('estimatedDuration')?.value || 'غير محدد',
        skills: getSelectedSkillsCount()
    };
    
    // Update summary display
    Object.entries(summary).forEach(([key, value]) => {
        const element = document.querySelector(`.summary-${key} .value`);
        if (element) {
            element.textContent = value;
        }
    });
}

function getPricingText() {
    const selectedPricing = document.querySelector('input[name="pricingType"]:checked');
    if (!selectedPricing) return 'غير محدد';
    
    const pricingTexts = {
        'free': 'مجاني',
        'discounted': 'مخفض',
        'normal': 'عادي'
    };
    
    let text = pricingTexts[selectedPricing.value] || 'غير محدد';
    
    if (selectedPricing.value !== 'free') {
        const priceInput = document.getElementById('projectPrice');
        if (priceInput && priceInput.value) {
            text += ` (${priceInput.value} ريال)`;
        }
    }
    
    return text;
}

function getSelectedSkillsCount() {
    const skills = document.querySelectorAll('.skill-tag-selected');
    return skills.length > 0 ? `${skills.length} مهارة` : 'لا توجد';
}

function validateVolunteerForm() {
    const requiredFields = [
        { id: 'projectTitle', name: 'عنوان المشروع' },
        { id: 'projectDescription', name: 'وصف المشروع' },
        { id: 'motivationText', name: 'الدافع للتطوع' }
    ];
    
    for (const field of requiredFields) {
        const element = document.getElementById(field.id);
        if (element && !element.value.trim()) {
            showNotification(`يرجى ملء حقل ${field.name}`, 'error');
            element.focus();
            return false;
        }
    }
    
    // Check if at least one skill is selected
    const skills = document.querySelectorAll('.skill-tag-selected');
    if (skills.length === 0) {
        showNotification('يرجى اختيار مهارة واحدة على الأقل', 'error');
        return false;
    }
    
    return true;
}

function sendVolunteerRequest() {
    const submitBtn = document.querySelector('.btn-primary');
    const loadingBtn = document.querySelector('.btn-loading');
    
    // Show loading state
    submitBtn.style.display = 'none';
    loadingBtn.style.display = 'flex';
    
    // Simulate API call
    setTimeout(() => {
        // Collect form data
        const formData = collectVolunteerFormData();
        
        // Save to localStorage (simulate sending to server)
        saveVolunteerRequest(formData);
        
        // Show success
        showVolunteerSuccessModal();
        
        // Reset button
        submitBtn.style.display = 'flex';
        loadingBtn.style.display = 'none';
        
        // Close modal
        closeVolunteerModal();
        
        // Update user stats
        updateUserStats();
        
        showNotification('تم إرسال طلب التطوع الاحترافي بنجاح!', 'success');
    }, 3000);
}

function saveAsDraft() {
    const formData = collectVolunteerFormData();
    formData.status = 'draft';
    formData.savedAt = new Date().toISOString();
    
    // Save draft to localStorage
    const drafts = JSON.parse(localStorage.getItem('volunteerDrafts')) || [];
    drafts.push(formData);
    localStorage.setItem('volunteerDrafts', JSON.stringify(drafts));
    
    showNotification('تم حفظ المسودة بنجاح', 'success');
    closeVolunteerModal();
}

function collectVolunteerFormData() {
    const selectedSkills = Array.from(document.querySelectorAll('.skill-tag-selected'))
        .map(tag => tag.textContent.replace('×', '').trim());
    
    const selectedGoals = Array.from(document.querySelectorAll('input[name="motivationGoals"]:checked'))
        .map(checkbox => checkbox.value);
    
    const contactMethods = Array.from(document.querySelectorAll('input[name="contactMethods"]:checked'))
        .map(checkbox => checkbox.value);
    
    return {
        // Project details
        projectTitle: document.getElementById('projectTitle')?.value || '',
        projectDescription: document.getElementById('projectDescription')?.value || '',
        projectCategory: document.getElementById('projectCategory')?.value || '',
        projectComplexity: document.getElementById('projectComplexity')?.value || '',
        
        // Skills and experience
        skills: selectedSkills,
        experienceLevel: document.getElementById('experienceLevel')?.value || '',
        
        // Pricing and timeline
        pricingType: document.querySelector('input[name="pricingType"]:checked')?.value || 'free',
        projectPrice: document.getElementById('projectPrice')?.value || '',
        discountPercentage: document.getElementById('discountPercentage')?.value || '',
        estimatedDuration: document.getElementById('estimatedDuration')?.value || '',
        availability: document.getElementById('availability')?.value || '',
        
        // Motivation and goals
        motivationText: document.getElementById('motivationText')?.value || '',
        motivationGoals: selectedGoals,
        
        // Contact preferences
        contactMethods: contactMethods,
        preferredTime: document.getElementById('preferredTime')?.value || '',
        
        // Metadata
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
}

function showVolunteerSuccessModal() {
    const modal = document.getElementById('volunteerSuccessModal');
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            closeVolunteerSuccessModal();
        }, 8000);
    }
}

function closeVolunteerSuccessModal() {
    const modal = document.getElementById('volunteerSuccessModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateUserStats() {
    // Simulate updating user statistics
    const stats = {
        requestsSent: (parseInt(localStorage.getItem('requestsSent')) || 0) + 1,
        userRating: Math.min(5.0, (parseFloat(localStorage.getItem('userRating')) || 4.2) + 0.05),
        completedProjects: parseInt(localStorage.getItem('completedProjects')) || 15,
        verificationLevel: 'verified'
    };
    
    Object.keys(stats).forEach(key => {
        localStorage.setItem(key, stats[key]);
    });
}

function saveVolunteerRequest(data) {
    const requests = JSON.parse(localStorage.getItem('volunteerRequests')) || [];
    requests.push(data);
    localStorage.setItem('volunteerRequests', JSON.stringify(requests));
}

// Toggle skill selection
function toggleSkill(element) {
    element.classList.toggle('selected');
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

// Initialize file uploads
function initializeFileUploads() {
    const chatImageInput = document.getElementById('chatImageInput');
    const chatFileInput = document.getElementById('chatFileInput');
    
    if (chatImageInput) {
        chatImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const chatMessages = document.getElementById('chatMessages');
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'message sent fade-in';
                    
                    const now = new Date();
                    const timeString = now.toLocaleTimeString('ar-EG', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    });
                    
                    messageDiv.innerHTML = `
                        <div class="message-content">
                            <div class="message-image">
                                <img src="${e.target.result}" alt="Uploaded Image">
                            </div>
                            <span class="message-time">${timeString}</span>
                        </div>
                    `;
                    
                    chatMessages.appendChild(messageDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (chatFileInput) {
        chatFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const chatMessages = document.getElementById('chatMessages');
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message sent fade-in';
                
                const now = new Date();
                const timeString = now.toLocaleTimeString('ar-EG', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                
                messageDiv.innerHTML = `
                    <div class="message-content">
                        <div class="message-file">
                            <i class="fas fa-file"></i>
                            <span>${file.name}</span>
                        </div>
                        <span class="message-time">${timeString}</span>
                    </div>
                `;
                
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });
    }
}

// User Profile Functions
function viewUserProfile(userId = 'ahmed') {
    // Show loading notification
    showNotification(`جاري تحميل الملف الشخصي...`, 'info');
    
    // Navigate to user-profile page with user ID parameter
    const userProfileUrl = `../user-profile/user-profile.html?user=${userId}`;
    
    // Add a small delay for better UX
    setTimeout(() => {
        window.location.href = userProfileUrl;
    }, 500);
}

// Enhanced function to handle all profile avatar clicks
function handleProfileAvatarClick(userId, event) {
    // Prevent event bubbling if needed
    if (event) {
        event.stopPropagation();
    }
    
    // Validate user ID
    if (!userId) {
        showNotification('خطأ: معرف المستخدم غير صحيح', 'error');
        return;
    }
    
    // Navigate to user profile
    viewUserProfile(userId);
}

// Function to make all profile avatars clickable
function makeProfileAvatarsClickable() {
    // Find all user avatars in posts
    const postAvatars = document.querySelectorAll('.post-card .user-avatar, .post-card .user-avatar-img');
    postAvatars.forEach(avatar => {
        // Get the user ID from the parent element or data attribute
        const userInfo = avatar.closest('.user-info');
        if (userInfo) {
            // Extract user ID from the onclick attribute or data attribute
            const onclickAttr = userInfo.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes('viewUserProfile')) {
                // Extract user ID from the onclick attribute
                const match = onclickAttr.match(/viewUserProfile\('([^']+)'\)/);
                if (match) {
                    const userId = match[1];
                    avatar.style.cursor = 'pointer';
                    avatar.addEventListener('click', (e) => handleProfileAvatarClick(userId, e));
                }
            }
        }
    });
    
    // Find all comment avatars
    const commentAvatars = document.querySelectorAll('.comment .comment-avatar, .comment-user img');
    commentAvatars.forEach(avatar => {
        const commentUser = avatar.closest('.comment-user');
        if (commentUser) {
            const onclickAttr = commentUser.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes('viewUserProfile')) {
                const match = onclickAttr.match(/viewUserProfile\('([^']+)'\)/);
                if (match) {
                    const userId = match[1];
                    avatar.style.cursor = 'pointer';
                    avatar.addEventListener('click', (e) => handleProfileAvatarClick(userId, e));
                }
            }
        }
    });
    
    // Find all notification avatars
    const notificationAvatars = document.querySelectorAll('.notification-item .user-avatar, .notification-item img');
    notificationAvatars.forEach(avatar => {
        const notificationItem = avatar.closest('.notification-item');
        if (notificationItem) {
            // Extract user ID from notification content
            const content = notificationItem.querySelector('.notification-content p');
            if (content) {
                const text = content.textContent;
                // Look for @username patterns
                const match = text.match(/@([^\s]+)/);
                if (match) {
                    const userId = match[1];
                    avatar.style.cursor = 'pointer';
                    avatar.addEventListener('click', (e) => handleProfileAvatarClick(userId, e));
                }
            }
        }
    });
}

// Enhanced function to create user avatar with click functionality
function createUserAvatar(userId, userName, avatarSrc = null, size = 'medium') {
    const avatar = document.createElement('div');
    avatar.className = `user-avatar ${size}`;
    avatar.style.cursor = 'pointer';
    
    // Create avatar image
    const img = document.createElement('img');
    if (avatarSrc) {
        img.src = avatarSrc;
    } else {
        // Generate placeholder based on user name
        const firstLetter = userName.charAt(0);
        const colors = ['#4B0082', '#667eea', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];
        const color = colors[userId.length % colors.length];
        img.src = `https://via.placeholder.com/50x50/${color.replace('#', '')}/ffffff?text=${encodeURIComponent(firstLetter)}`;
    }
    img.alt = userName;
    img.className = 'user-avatar-img';
    
    avatar.appendChild(img);
    
    // Add click event
    avatar.addEventListener('click', (e) => handleProfileAvatarClick(userId, e));
    
    // Add hover effect
    avatar.addEventListener('mouseenter', () => {
        avatar.style.transform = 'scale(1.1)';
        avatar.style.transition = 'transform 0.2s ease';
    });
    
    avatar.addEventListener('mouseleave', () => {
        avatar.style.transform = 'scale(1)';
    });
    
    return avatar;
}

// Function to update all existing avatars to be clickable
function updateExistingAvatars() {
    // Update post avatars
    const posts = document.querySelectorAll('.post-card');
    posts.forEach(post => {
        const userInfo = post.querySelector('.user-info');
        if (userInfo) {
            const avatar = userInfo.querySelector('.user-avatar, .user-avatar-img');
            if (avatar) {
                // Extract user ID from onclick attribute
                const onclickAttr = userInfo.getAttribute('onclick');
                if (onclickAttr && onclickAttr.includes('viewUserProfile')) {
                    const match = onclickAttr.match(/viewUserProfile\('([^']+)'\)/);
                    if (match) {
                        const userId = match[1];
                        avatar.style.cursor = 'pointer';
                        avatar.addEventListener('click', (e) => handleProfileAvatarClick(userId, e));
                    }
                }
            }
        }
    });
    
    // Update comment avatars
    const comments = document.querySelectorAll('.comment');
    comments.forEach(comment => {
        const commentUser = comment.querySelector('.comment-user');
        if (commentUser) {
            const avatar = commentUser.querySelector('.comment-avatar, img');
            if (avatar) {
                const onclickAttr = commentUser.getAttribute('onclick');
                if (onclickAttr && onclickAttr.includes('viewUserProfile')) {
                    const match = onclickAttr.match(/viewUserProfile\('([^']+)'\)/);
                    if (match) {
                        const userId = match[1];
                        avatar.style.cursor = 'pointer';
                        avatar.addEventListener('click', (e) => handleProfileAvatarClick(userId, e));
                    }
                }
            }
        }
    });
}

// Enhanced function to add new posts with clickable avatars
function addNewPost(postData) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card fade-in';
    postCard.setAttribute('data-post-id', postData.id);
    
    // Create post header with clickable avatar
    const postHeader = document.createElement('div');
    postHeader.className = 'post-header';
    
    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    
    // Create clickable avatar
    const avatar = createUserAvatar(postData.userId, postData.userName, postData.avatarSrc);
    userInfo.appendChild(avatar);
    
    const userDetails = document.createElement('div');
    userDetails.className = 'user-details';
    userDetails.innerHTML = `
        <span class="user-name">${postData.userName}</span>
        <span class="post-time">${postData.time}</span>
        <span class="post-privacy-badge">${postData.privacy}</span>
    `;
    
    userInfo.appendChild(userDetails);
    postHeader.appendChild(userInfo);
    
    // Add the rest of the post content
    // ... (rest of post creation logic)
    
    return postCard;
}

function closeUserProfileModal() {
    const modal = document.getElementById('userProfileModal');
    modal.style.display = 'none';
}

function sendMessageFromProfile() {
    closeUserProfileModal();
    // Navigate to messages page
    showNotification('جاري الانتقال إلى صفحة الرسائل...', 'info');
    setTimeout(() => {
        window.location.href = '../messages/messages.html';
    }, 1000);
}

// Post Menu Functions
function togglePostMenu(postId) {
    const dropdown = document.getElementById(`postMenu${postId}`);
    if (dropdown) {
        dropdown.style.opacity = dropdown.style.opacity === '1' ? '0' : '1';
        dropdown.style.visibility = dropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
    }
}

function reportPost(postId) {
    showNotification('تم إرسال البلاغ بنجاح', 'success');
    togglePostMenu(postId);
}

function hidePost(postId) {
    const postCard = document.querySelector(`[data-post-id="${postId}"]`);
    if (postCard) {
        postCard.style.display = 'none';
    }
    showNotification('تم إخفاء المنشور', 'success');
    togglePostMenu(postId);
}

function copyPostLink(postId) {
    const link = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(link).then(() => {
        showNotification('تم نسخ الرابط', 'success');
    });
    togglePostMenu(postId);
}

function sharePost(postId) {
    // Try native sharing first
    if (navigator.share) {
        const postUrl = `${window.location.origin}/post/${postId}`;
        const postElement = document.querySelector(`[data-post-id="${postId}"]`);
        const postText = postElement ? postElement.querySelector('.post-content p')?.textContent || '' : '';
        
        navigator.share({
            title: 'شغلك - منشور',
            text: postText.substring(0, 100) + (postText.length > 100 ? '...' : ''),
            url: postUrl
        }).then(() => {
            showNotification('تم مشاركة المنشور بنجاح', 'success');
        }).catch(() => {
            // Fallback to custom share modal
            showSharePostModal(postId);
        });
    } else {
        // Fallback to custom share modal
        showSharePostModal(postId);
    }
}

function showSharePostModal(postId) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    const postUrl = `${window.location.origin}/post/${postId}`;
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    const postText = postElement ? postElement.querySelector('.post-content p')?.textContent || '' : '';
    
    modal.innerHTML = `
        <div class="modal-content" style="background: white; border-radius: 15px; padding: 2rem; max-width: 500px; width: 90%; animation: slideIn 0.3s ease;">
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="margin: 0; color: #333;">مشاركة المنشور</h3>
                <button onclick="closeSharePostModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">×</button>
            </div>
            <div class="share-options" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
                <button onclick="shareToWhatsAppPost('${postId}')" class="share-btn" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; border: none; border-radius: 10px; background: #25D366; color: white; cursor: pointer; transition: all 0.3s ease;">
                    <i class="fab fa-whatsapp" style="font-size: 1.5rem;"></i>
                    <span>واتساب</span>
                </button>
                <button onclick="shareToFacebookPost('${postId}')" class="share-btn" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; border: none; border-radius: 10px; background: #1877F2; color: white; cursor: pointer; transition: all 0.3s ease;">
                    <i class="fab fa-facebook-f" style="font-size: 1.5rem;"></i>
                    <span>فيسبوك</span>
                </button>
                <button onclick="shareToTwitterPost('${postId}')" class="share-btn" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; border: none; border-radius: 10px; background: #1DA1F2; color: white; cursor: pointer; transition: all 0.3s ease;">
                    <i class="fab fa-twitter" style="font-size: 1.5rem;"></i>
                    <span>تويتر</span>
                </button>
                <button onclick="shareToLinkedInPost('${postId}')" class="share-btn" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; border: none; border-radius: 10px; background: #0077B5; color: white; cursor: pointer; transition: all 0.3s ease;">
                    <i class="fab fa-linkedin-in" style="font-size: 1.5rem;"></i>
                    <span>لينكد إن</span>
                </button>
                <button onclick="shareToTelegramPost('${postId}')" class="share-btn" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; border: none; border-radius: 10px; background: #0088CC; color: white; cursor: pointer; transition: all 0.3s ease;">
                    <i class="fab fa-telegram-plane" style="font-size: 1.5rem;"></i>
                    <span>تليجرام</span>
                </button>
                <button onclick="copyPostLink('${postId}')" class="share-btn" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; border: none; border-radius: 10px; background: #6C757D; color: white; cursor: pointer; transition: all 0.3s ease;">
                    <i class="fas fa-link" style="font-size: 1.5rem;"></i>
                    <span>نسخ الرابط</span>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeSharePostModal();
        }
    });
}

function closeSharePostModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function shareToWhatsAppPost(postId) {
    const postUrl = `${window.location.origin}/post/${postId}`;
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    const postText = postElement ? postElement.querySelector('.post-content p')?.textContent || '' : '';
    const message = `شاهد هذا المنشور على شغلك:\n${postText.substring(0, 100)}${postText.length > 100 ? '...' : ''}\n${postUrl}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    closeSharePostModal();
    showNotification('تم فتح واتساب للمشاركة', 'success');
}

function shareToFacebookPost(postId) {
    const postUrl = `${window.location.origin}/post/${postId}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
    closeSharePostModal();
    showNotification('تم فتح فيسبوك للمشاركة', 'success');
}

function shareToTwitterPost(postId) {
    const postUrl = `${window.location.origin}/post/${postId}`;
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    const postText = postElement ? postElement.querySelector('.post-content p')?.textContent || '' : '';
    const message = `شاهد هذا المنشور على شغلك: ${postText.substring(0, 100)}${postText.length > 100 ? '...' : ''}`;
    
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(postUrl)}`, '_blank');
    closeSharePostModal();
    showNotification('تم فتح تويتر للمشاركة', 'success');
}

function shareToLinkedInPost(postId) {
    const postUrl = `${window.location.origin}/post/${postId}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, '_blank');
    closeSharePostModal();
    showNotification('تم فتح لينكد إن للمشاركة', 'success');
}

function shareToTelegramPost(postId) {
    const postUrl = `${window.location.origin}/post/${postId}`;
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    const postText = postElement ? postElement.querySelector('.post-content p')?.textContent || '' : '';
    const message = `شاهد هذا المنشور على شغلك:\n${postText.substring(0, 100)}${postText.length > 100 ? '...' : ''}\n${postUrl}`;
    
    window.open(`https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(message)}`, '_blank');
    closeSharePostModal();
    showNotification('تم فتح تليجرام للمشاركة', 'success');
}

// Notification Functions
function handleNotificationClick(type, userId) {
    switch(type) {
        case 'mention':
            // Navigate to messages page for mention notifications
            showNotification('جاري الانتقال إلى الرسائل...', 'info');
            setTimeout(() => {
                window.location.href = '../messages/messages.html#notifications';
            }, 1000);
            break;
        case 'like':
            // Navigate to messages page for like notifications
            showNotification('جاري الانتقال إلى الرسائل...', 'info');
            setTimeout(() => {
                window.location.href = '../messages/messages.html#notifications';
            }, 1000);
            break;
        case 'comment':
            // Navigate to messages page for comment notifications
            showNotification('جاري الانتقال إلى الرسائل...', 'info');
            setTimeout(() => {
                window.location.href = '../messages/messages.html#notifications';
            }, 1000);
            break;
        case 'volunteer':
            showVolunteerModal(userId);
            break;
        case 'rating':
            // Navigate to messages page for rating notifications
            showNotification('جاري الانتقال إلى الرسائل...', 'info');
            setTimeout(() => {
                window.location.href = '../messages/messages.html#notifications';
            }, 1000);
            break;
        case 'message':
            // Navigate to messages page for message notifications
            showNotification('جاري الانتقال إلى الرسائل...', 'info');
            setTimeout(() => {
                window.location.href = '../messages/messages.html';
            }, 1000);
            break;
        case 'follow':
            // Navigate to messages page for follow notifications
            showNotification('جاري الانتقال إلى الرسائل...', 'info');
            setTimeout(() => {
                window.location.href = '../messages/messages.html#notifications';
            }, 1000);
            break;
        case 'collaboration':
            // Navigate to messages page for collaboration notifications
            showNotification('جاري الانتقال إلى الرسائل...', 'info');
            setTimeout(() => {
                window.location.href = '../messages/messages.html#notifications';
            }, 1000);
            break;
        case 'project_update':
            // Navigate to messages page for project update notifications
            showNotification('جاري الانتقال إلى الرسائل...', 'info');
            setTimeout(() => {
                window.location.href = '../messages/messages.html#notifications';
            }, 1000);
            break;
    }
}

function viewPost(postId) {
    showNotification('جاري فتح المنشور...', 'info');
}

function viewVolunteerRequest(requestId) {
    showVolunteerModal('علي محمد');
}

function viewRating(ratingId) {
    showNotification('جاري فتح التقييم...', 'info');
}

// Chat Functions
function toggleVoiceCall() {
    showNotification('جاري الاتصال الصوتي...', 'info');
}

function toggleVideoCall() {
    showNotification('جاري الاتصال المرئي...', 'info');
}

function toggleChatInfo() {
    showNotification('معلومات المحادثة', 'info');
}

function toggleEmojiPicker() {
    showNotification('قريباً: اختيار الرموز التعبيرية', 'info');
}

function toggleVoiceMessage() {
    showNotification('قريباً: الرسائل الصوتية', 'info');
}

// User Profile Functions
function viewProfile(userId) {
    viewUserProfile(userId);
}

function openSettings() {
    showNotification('جاري فتح الإعدادات...', 'info');
}

function openPrivacySettings() {
    showNotification('جاري فتح إعدادات الخصوصية...', 'info');
}

function logout() {
    showNotification('جاري تسجيل الخروج...', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Show notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        padding: 1rem;
        z-index: 2000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 
                 type === 'error' ? 'fas fa-exclamation-circle' : 
                 type === 'info' ? 'fas fa-info-circle' : 'fas fa-check-circle';
    const color = type === 'success' ? '#28a745' : 
                  type === 'error' ? '#dc3545' : 
                  type === 'info' ? '#17a2b8' : '#28a745';
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="${icon}" style="color: ${color}; font-size: 1.5rem;"></i>
            <span style="color: #333;">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    .project-card {
        background: white;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: var(--shadow);
        transition: all 0.3s ease;
    }
    
    .project-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-hover);
    }
    
    .project-card img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 0.5rem;
    }
    
    .project-card h5 {
        color: #333;
        font-size: 0.9rem;
        margin: 0;
    }
    
    .message-file {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255,255,255,0.1);
        padding: 0.5rem;
        border-radius: 8px;
        margin: 0.5rem 0;
    }
    
    .message-file i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

// Initialize notification filters
function initializeNotificationFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter notifications
            const category = this.dataset.category;
            filterNotifications(category);
        });
    });
}

// Filter notifications by category
function filterNotifications(category) {
    const notifications = document.querySelectorAll('.notification-item');
    
    notifications.forEach(notification => {
        if (category === 'all' || notification.dataset.category === category) {
            notification.style.display = 'flex';
        } else {
            notification.style.display = 'none';
        }
    });
}

// Initialize mark all read functionality
function initializeMarkAllRead() {
    const markAllReadBtn = document.querySelector('.mark-all-read');
    
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            markAllNotificationsAsRead();
        });
    }
}

// Mark all notifications as read
function markAllNotificationsAsRead() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    
    unreadNotifications.forEach(notification => {
        notification.classList.remove('unread');
    });
    
    // Update notification count
    updateNotificationCount();
    
    showNotification('تم وضع علامة مقروء على جميع الإشعارات', 'success');
}

// Initialize notification actions
function initializeNotificationActions() {
    // Accept collaboration
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('accept-collaboration')) {
            e.preventDefault();
            showNotification('تم قبول طلب التعاون', 'success');
            e.target.closest('.notification-item').style.opacity = '0.6';
        }
        
        // Decline collaboration
        if (e.target.classList.contains('decline-collaboration')) {
            e.preventDefault();
            showNotification('تم رفض طلب التعاون', 'info');
            e.target.closest('.notification-item').style.opacity = '0.6';
        }
        
        // Follow back
        if (e.target.classList.contains('follow-back')) {
            e.preventDefault();
            showNotification('تم متابعة المستخدم', 'success');
            e.target.textContent = 'تمت المتابعة';
            e.target.disabled = true;
        }
        
        // Reply to message
        if (e.target.classList.contains('reply-message')) {
            e.preventDefault();
            // Open messages panel
            const messagesPanel = document.getElementById('messagesPanel');
            if (messagesPanel) {
                messagesPanel.classList.add('active');
            }
            showNotification('تم فتح المحادثة', 'info');
        }
        
        // Mark as read
        if (e.target.closest('.notification-item')) {
            const notification = e.target.closest('.notification-item');
            if (notification.classList.contains('unread')) {
                notification.classList.remove('unread');
                updateNotificationCount();
            }
        }
    });
}

// Update notification count
function updateNotificationCount() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const countBadge = document.querySelector('.notification-count');
    
    if (countBadge) {
        if (unreadCount > 0) {
            countBadge.textContent = unreadCount;
            countBadge.style.display = 'block';
        } else {
            countBadge.style.display = 'none';
        }
    }
}

// Export functions for global access
window.openChat = openChat;
window.toggleLike = toggleLike;
window.toggleComments = toggleComments;
window.handleCommentKeypress = handleCommentKeypress;
window.addComment = addComment;
window.showVolunteerModal = showVolunteerModal;
window.closeVolunteerModal = closeVolunteerModal;
window.sendVolunteerRequest = sendVolunteerRequest;
window.removeFile = removeFile;
window.viewUserProfile = viewUserProfile;
window.closeUserProfileModal = closeUserProfileModal;
window.sendMessageFromProfile = sendMessageFromProfile;
window.togglePostMenu = togglePostMenu;
window.reportPost = reportPost;
window.hidePost = hidePost;
window.copyPostLink = copyPostLink;
window.sharePost = sharePost;
window.handleNotificationClick = handleNotificationClick;
window.viewPost = viewPost;
window.viewVolunteerRequest = viewVolunteerRequest;
window.viewRating = viewRating;
window.toggleVoiceCall = toggleVoiceCall;
window.toggleVideoCall = toggleVideoCall;
window.toggleChatInfo = toggleChatInfo;
window.toggleEmojiPicker = toggleEmojiPicker;
window.toggleVoiceMessage = toggleVoiceMessage;
window.viewProfile = viewProfile;
window.openSettings = openSettings;
window.openPrivacySettings = openPrivacySettings;
window.logout = logout;
window.toggleSkill = toggleSkill;
window.initializeNotificationFilters = initializeNotificationFilters;
window.filterNotifications = filterNotifications;
window.markAllNotificationsAsRead = markAllNotificationsAsRead;
window.updateNotificationCount = updateNotificationCount;

// Enhanced Close Button Functions
function initializeEnhancedCloseButtons() {
    // Enhanced close notifications
    const closeNotificationsBtn = document.getElementById('closeNotifications');
    if (closeNotificationsBtn) {
        closeNotificationsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeNotificationsWithAnimation();
        });
    }

    // Enhanced close messages
    const closeMessagesBtn = document.getElementById('closeMessages');
    if (closeMessagesBtn) {
        closeMessagesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMessagesWithAnimation();
        });
    }

    // Enhanced close chat
    const closeChatBtn = document.getElementById('closeChat');
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeChatWithAnimation();
        });
    }

    // Add ripple effect to all close buttons
    addRippleEffectToCloseButtons();
}

function closeNotificationsWithAnimation() {
    const panel = document.getElementById('notificationsPanel');
    if (panel) {
        // Add closing animation
        panel.style.transform = 'translateX(100%) scale(0.8)';
        panel.style.opacity = '0';
        
        setTimeout(() => {
            panel.style.display = 'none';
            panel.style.transform = '';
            panel.style.opacity = '';
        }, 300);
        
        // Show success feedback
        showCloseNotification('تم إغلاق الإشعارات');
    }
}

function closeMessagesWithAnimation() {
    const panel = document.getElementById('messagesPanel');
    if (panel) {
        // Add closing animation
        panel.style.transform = 'translateX(100%) scale(0.8)';
        panel.style.opacity = '0';
        
        setTimeout(() => {
            panel.style.display = 'none';
            panel.style.transform = '';
            panel.style.opacity = '';
        }, 300);
        
        // Show success feedback
        showCloseNotification('تم إغلاق الرسائل');
    }
}

function closeChatWithAnimation() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        // Add closing animation
        chatWindow.style.transform = 'scale(0.8)';
        chatWindow.style.opacity = '0';
        
        setTimeout(() => {
            chatWindow.style.display = 'none';
            chatWindow.style.transform = '';
            chatWindow.style.opacity = '';
        }, 300);
        
        // Show success feedback
        showCloseNotification('تم إغلاق المحادثة');
    }
}

function addRippleEffectToCloseButtons() {
    const closeButtons = document.querySelectorAll('.close-notifications, .close-messages, .close-chat, .close-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function showCloseNotification(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.className = 'close-feedback-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Enhanced decline button functionality
function initializeEnhancedDeclineButtons() {
    const declineButtons = document.querySelectorAll('.notification-action-btn.decline');
    
    declineButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Add shake animation
            this.style.animation = 'shake 0.5s ease-in-out';
            
            // Remove animation after completion
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            // Show confirmation
            showDeclineConfirmation(this);
        });
    });
}

function showDeclineConfirmation(button) {
    const confirmation = document.createElement('div');
    confirmation.className = 'decline-confirmation';
    confirmation.innerHTML = `
        <i class="fas fa-check"></i>
        <span>تم الرفض</span>
    `;
    confirmation.style.cssText = `
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: #dc3545;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 10px;
        white-space: nowrap;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.appendChild(confirmation);
    
    // Animate in
    setTimeout(() => {
        confirmation.style.opacity = '1';
        confirmation.style.top = '-35px';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        confirmation.remove();
    }, 2000);
}

// Add CSS for animations
const enhancedCloseCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
}

.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add enhanced close CSS to document
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = enhancedCloseCSS;
document.head.appendChild(enhancedStyle);

// Export enhanced functions
window.initializeEnhancedCloseButtons = initializeEnhancedCloseButtons;
window.initializeEnhancedDeclineButtons = initializeEnhancedDeclineButtons;
