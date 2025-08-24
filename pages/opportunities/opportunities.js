// Enhanced Opportunities Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeOpportunitiesPage();
});

function initializeOpportunitiesPage() {
    // Initialize user type selector
    initializeUserTypeSelector();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize search
    initializeSearch();
    
    // Initialize modals
    initializeModals();
    
    // Initialize volunteer requests
    initializeVolunteerRequests();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Add fade-in animations
    initializeFadeInAnimations();
    
    // Load initial opportunities
    loadOpportunities();
}

// Initialize user type selector
function initializeUserTypeSelector() {
    const freelancerBtn = document.getElementById('freelancerBtn');
    const clientBtn = document.getElementById('clientBtn');
    const headerDescription = document.getElementById('headerDescription');
    const headerActions = document.getElementById('headerActions');
    
    // Set default to freelancer
    let currentUserType = 'freelancer';
    
    function switchUserType(userType) {
        currentUserType = userType;
        
        // Update button states
        freelancerBtn.classList.toggle('active', userType === 'freelancer');
        clientBtn.classList.toggle('active', userType === 'client');
        
        // Update header content
        if (userType === 'freelancer') {
            headerDescription.textContent = 'اكتشف أفضل الفرص في العمل الحر وابدأ رحلتك المهنية';
            headerActions.innerHTML = '';
        } else {
            headerDescription.textContent = 'نشر وإدارة الفرص للعثور على أفضل المواهب';
            headerActions.innerHTML = `
                <button class="post-opportunity-btn" onclick="showPostOpportunityModal()">
                    <i class="fas fa-plus"></i>
                    نشر فرصة جديدة
                </button>
                <button class="post-opportunity-btn" style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);" onclick="showMyOpportunities()">
                    <i class="fas fa-list"></i>
                    فرصي المنشورة
                </button>
            `;
        }
        
        // Reload opportunities based on user type
        loadOpportunities(userType);
    }
    
    // Add event listeners
    freelancerBtn.addEventListener('click', () => switchUserType('freelancer'));
    clientBtn.addEventListener('click', () => switchUserType('client'));
    
    // Initialize with freelancer view
    switchUserType('freelancer');
}

// Initialize navigation
function initializeNavigation() {
    // const hamburger = document.getElementById('hamburger'); // Handled by shared navigation
    const navMenu = document.querySelector('.nav-menu');
    
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

// Initialize filters
function initializeFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
}

// Apply filters
function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const experienceFilter = document.getElementById('experienceFilter').value;
    const salaryFilter = document.getElementById('salaryFilter').value;
    const durationFilter = document.getElementById('durationFilter').value;
    
    // Filter opportunities based on selected criteria
    const opportunityCards = document.querySelectorAll('.opportunity-card');
    
    opportunityCards.forEach(card => {
        let showCard = true;
        
        // Apply category filter
        if (categoryFilter && card.dataset.category !== categoryFilter) {
            showCard = false;
        }
        
        // Apply experience filter
        if (experienceFilter && card.dataset.experience !== experienceFilter) {
            showCard = false;
        }
        
        // Apply salary filter
        if (salaryFilter && !isSalaryInRange(card.dataset.salary, salaryFilter)) {
            showCard = false;
        }
        
        // Apply duration filter
        if (durationFilter && card.dataset.duration !== durationFilter) {
            showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
    
    // Update results count
    updateResultsCount();
}

// Check if salary is in range
function isSalaryInRange(salary, range) {
    const salaryNum = parseInt(salary);
    
    switch (range) {
        case '0-2000':
            return salaryNum <= 2000;
        case '2000-5000':
            return salaryNum >= 2000 && salaryNum <= 5000;
        case '5000-10000':
            return salaryNum >= 5000 && salaryNum <= 10000;
        case '10000+':
            return salaryNum >= 10000;
        default:
            return true;
    }
}

// Clear filters
function clearFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    const searchInput = document.getElementById('searchInput');
    
    filterSelects.forEach(select => {
        select.value = '';
    });
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Show all opportunities
    const opportunityCards = document.querySelectorAll('.opportunity-card');
    opportunityCards.forEach(card => {
        card.style.display = 'block';
    });
    
    updateResultsCount();
}

// Initialize search
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
    }
}

// Perform search
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const opportunityCards = document.querySelectorAll('.opportunity-card');
    
    opportunityCards.forEach(card => {
        const title = card.querySelector('.opportunity-title').textContent.toLowerCase();
        const description = card.querySelector('.opportunity-description').textContent.toLowerCase();
        const company = card.querySelector('.opportunity-company').textContent.toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       company.includes(searchTerm);
        
        card.style.display = matches ? 'block' : 'none';
    });
    
    updateResultsCount();
}

// Debounce function
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

// Initialize modals
function initializeModals() {
    const applyModal = document.getElementById('applyModal');
    const closeModal = document.getElementById('closeModal');
    const cancelApply = document.getElementById('cancelApply');
    const submitApply = document.getElementById('submitApply');
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            applyModal.style.display = 'none';
        });
    }
    
    if (cancelApply) {
        cancelApply.addEventListener('click', () => {
            applyModal.style.display = 'none';
        });
    }
    
    if (submitApply) {
        submitApply.addEventListener('click', handleApplySubmission);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === applyModal) {
            applyModal.style.display = 'none';
        }
    });
    
    // Initialize character counter
    const proposalText = document.getElementById('proposalText');
    const proposalCharCount = document.getElementById('proposalCharCount');
    
    if (proposalText && proposalCharCount) {
        proposalText.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 1000;
            
            proposalCharCount.textContent = currentLength;
            
            // Update counter color based on length
            if (currentLength > maxLength * 0.8) {
                proposalCharCount.style.color = '#ffc107';
            } else if (currentLength > maxLength * 0.9) {
                proposalCharCount.style.color = '#dc3545';
            } else {
                proposalCharCount.style.color = '#666';
            }
            
            // Limit text if exceeds max length
            if (currentLength > maxLength) {
                this.value = this.value.substring(0, maxLength);
                proposalCharCount.textContent = maxLength;
            }
        });
    }
}

// Handle apply submission
function handleApplySubmission() {
    const submitBtn = document.getElementById('submitApply');
    const proposalText = document.getElementById('proposalText');
    const proposedPrice = document.getElementById('proposedPrice');
    const deliveryTime = document.getElementById('deliveryTime');
    
    // Validate required fields
    if (!proposalText.value.trim()) {
        showNotification('يرجى كتابة اقتراحك للمشروع', 'error');
        return;
    }
    
    if (!proposedPrice.value) {
        showNotification('يرجى إدخال السعر المقترح', 'error');
        return;
    }
    
    if (!deliveryTime.value) {
        showNotification('يرجى إدخال مدة التسليم', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Simulate submission
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        // Close modal
        document.getElementById('applyModal').style.display = 'none';
        
        // Show success notification
        showNotification('تم إرسال طلب التقديم بنجاح!', 'success');
        
        // Reset form
        document.getElementById('applyForm').reset();
        document.getElementById('proposalCharCount').textContent = '0';
        document.getElementById('proposalCharCount').style.color = '#666';
    }, 2000);
}

// Initialize volunteer requests
function initializeVolunteerRequests() {
    // Add click handlers for volunteer buttons
    const volunteerBtns = document.querySelectorAll('.volunteer-btn');
    volunteerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const opportunityCard = btn.closest('.opportunity-card');
            const opportunityTitle = opportunityCard.querySelector('.opportunity-title').textContent;
            showVolunteerModal(opportunityTitle);
        });
    });
}

// Show volunteer modal
function showVolunteerModal(opportunityTitle) {
    const modal = document.getElementById('volunteerModal');
    const volunteerUserName = document.getElementById('volunteerUserName');
    
    if (volunteerUserName) {
        volunteerUserName.textContent = opportunityTitle;
    }
    
    modal.style.display = 'block';
}

// Close volunteer modal
function closeVolunteerModal() {
    const modal = document.getElementById('volunteerModal');
    modal.style.display = 'none';
    
    // Reset form
    const form = document.getElementById('volunteerForm');
    if (form) {
        form.reset();
    }
}

// Send volunteer request
function sendVolunteerRequest() {
    const modal = document.getElementById('volunteerModal');
    const message = document.getElementById('volunteerMessage');
    const price = document.getElementById('volunteerPrice');
    const duration = document.getElementById('volunteerDuration');
    
    if (message && message.value.trim()) {
        // Show loading state
        const submitBtn = document.querySelector('#volunteerModal .btn-primary');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Close modal
            closeVolunteerModal();
            
            // Show success notification
            showNotification('تم إرسال طلب التطوع بنجاح!', 'success');
        }, 2000);
    } else {
        showNotification('يرجى كتابة رسالة التطوع', 'error');
    }
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

// Show post opportunity modal
function showPostOpportunityModal() {
    const modal = document.getElementById('postOpportunityModal');
    modal.style.display = 'flex';
    
    // Initialize form validation
    initializePostOpportunityForm();
}

// Initialize post opportunity form
function initializePostOpportunityForm() {
    const modal = document.getElementById('postOpportunityModal');
    const closePostModal = document.getElementById('closePostModal');
    const cancelPost = document.getElementById('cancelPost');
    const submitPost = document.getElementById('submitPost');
    const descriptionTextarea = document.getElementById('opportunityDescription');
    const descriptionCharCount = document.getElementById('descriptionCharCount');
    
    // Close modal handlers
    closePostModal.addEventListener('click', () => {
        modal.style.display = 'none';
        resetPostForm();
    });
    
    cancelPost.addEventListener('click', () => {
        modal.style.display = 'none';
        resetPostForm();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            resetPostForm();
        }
    });
    
    // Character counter for description
    if (descriptionTextarea && descriptionCharCount) {
        descriptionTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 2000;
            
            descriptionCharCount.textContent = currentLength;
            
            // Update counter color based on length
            if (currentLength > maxLength * 0.8) {
                descriptionCharCount.style.color = '#ffc107';
            } else if (currentLength > maxLength * 0.9) {
                descriptionCharCount.style.color = '#dc3545';
            } else {
                descriptionCharCount.style.color = '#666';
            }
            
            // Limit text if exceeds max length
            if (currentLength > maxLength) {
                this.value = this.value.substring(0, maxLength);
                descriptionCharCount.textContent = maxLength;
            }
        });
    }
    
    // Submit form handler
    submitPost.addEventListener('click', handlePostOpportunitySubmission);
}

// Handle post opportunity submission
function handlePostOpportunitySubmission() {
    const form = document.getElementById('postOpportunityForm');
    const submitBtn = document.getElementById('submitPost');
    
    // Get form data
    const title = document.getElementById('opportunityTitle').value.trim();
    const category = document.getElementById('opportunityCategory').value;
    const description = document.getElementById('opportunityDescription').value.trim();
    const salary = document.getElementById('opportunitySalary').value;
    const duration = document.getElementById('opportunityDuration').value;
    const experience = document.getElementById('opportunityExperience').value;
    const deadline = document.getElementById('opportunityDeadline').value;
    const tags = document.getElementById('opportunityTags').value.trim();
    
    // Validate required fields
    if (!title) {
        showNotification('يرجى إدخال عنوان الفرصة', 'error');
        return;
    }
    
    if (!category) {
        showNotification('يرجى اختيار التخصص', 'error');
        return;
    }
    
    if (!description) {
        showNotification('يرجى كتابة وصف الفرصة', 'error');
        return;
    }
    
    if (!salary) {
        showNotification('يرجى إدخال الراتب', 'error');
        return;
    }
    
    if (!duration) {
        showNotification('يرجى اختيار مدة المشروع', 'error');
        return;
    }
    
    if (!experience) {
        showNotification('يرجى اختيار مستوى الخبرة', 'error');
        return;
    }
    
    if (!deadline) {
        showNotification('يرجى تحديد الموعد النهائي', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Simulate submission
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        // Close modal
        document.getElementById('postOpportunityModal').style.display = 'none';
        
        // Show success notification
        showNotification('تم نشر الفرصة بنجاح!', 'success');
        
        // Reset form
        resetPostForm();
        
        // Reload opportunities to show the new one
        loadOpportunities('client');
    }, 2000);
}

// Reset post form
function resetPostForm() {
    const form = document.getElementById('postOpportunityForm');
    if (form) {
        form.reset();
    }
    
    // Reset character counter
    const descriptionCharCount = document.getElementById('descriptionCharCount');
    if (descriptionCharCount) {
        descriptionCharCount.textContent = '0';
        descriptionCharCount.style.color = '#666';
    }
}

// Show my opportunities (for clients)
function showMyOpportunities() {
    // This would typically load opportunities posted by the current user
    showNotification('سيتم إضافة هذه الميزة قريباً!', 'info');
}

// Load opportunities based on user type
function loadOpportunities(userType = 'freelancer') {
    const opportunitiesGrid = document.getElementById('opportunitiesGrid');
    
    if (opportunitiesGrid) {
        // Clear existing opportunities
        opportunitiesGrid.innerHTML = '';
        
        // Sample opportunities data
        const opportunities = [
            {
                id: 1,
                title: 'مطور ويب متخصص في React',
                company: 'شركة التقنية المتقدمة',
                description: 'نحتاج مطور ويب متخصص في React لانضمامه إلى فريق العمل. المشروع يتضمن تطوير تطبيق ويب حديث مع واجهة مستخدم متقدمة.',
                salary: '8000',
                duration: '3 أشهر',
                experience: 'expert',
                category: 'programming',
                tags: ['React', 'JavaScript', 'Web Development'],
                deadline: '2024-02-15',
                postedBy: 'client'
            },
            {
                id: 2,
                title: 'مصمم جرافيك محترف',
                company: 'وكالة الإبداع',
                description: 'نبحث عن مصمم جرافيك محترف لتصميم هوية بصرية كاملة لشركة جديدة. يشمل العمل تصميم الشعار والمواد التسويقية.',
                salary: '5000',
                duration: '1 شهر',
                experience: 'intermediate',
                category: 'design',
                tags: ['Graphic Design', 'Logo Design', 'Branding'],
                deadline: '2024-01-30',
                postedBy: 'client'
            },
            {
                id: 3,
                title: 'مدير تسويق رقمي',
                company: 'شركة التسويق الذكي',
                description: 'نحتاج مدير تسويق رقمي لقيادة حملات تسويقية عبر وسائل التواصل الاجتماعي وتحسين محركات البحث.',
                salary: '12000',
                duration: '6 أشهر',
                experience: 'expert',
                category: 'marketing',
                tags: ['Digital Marketing', 'SEO', 'Social Media'],
                deadline: '2024-03-01',
                postedBy: 'client'
            },
            {
                id: 4,
                title: 'مترجم محترف',
                company: 'مركز الترجمة العالمية',
                description: 'نبحث عن مترجم محترف للترجمة من العربية إلى الإنجليزية والعكس. العمل يشمل ترجمة مستندات تجارية وقانونية.',
                salary: '3000',
                duration: '2 شهر',
                experience: 'intermediate',
                category: 'content',
                tags: ['Translation', 'Arabic', 'English'],
                deadline: '2024-02-10',
                postedBy: 'client'
            },
            {
                id: 5,
                title: 'محلل بيانات',
                company: 'شركة التحليلات المتقدمة',
                description: 'نحتاج محلل بيانات لتحليل البيانات وتقديم رؤى قيمة للشركة. يشمل العمل استخدام أدوات التحليل المختلفة.',
                salary: '10000',
                duration: '4 أشهر',
                experience: 'expert',
                category: 'data',
                tags: ['Data Analysis', 'Excel', 'SQL'],
                deadline: '2024-02-20',
                postedBy: 'client'
            },
            {
                id: 6,
                title: 'مدير مشاريع تقنية',
                company: 'شركة التطوير التقني',
                description: 'نبحث عن مدير مشاريع تقنية لقيادة فريق تطوير وإدارة المشاريع التقنية من البداية حتى النهاية.',
                salary: '15000',
                duration: '8 أشهر',
                experience: 'expert',
                category: 'project',
                tags: ['Project Management', 'Agile', 'Leadership'],
                deadline: '2024-03-15',
                postedBy: 'client'
            }
        ];
        
        // Filter opportunities based on user type
        let filteredOpportunities = opportunities;
        if (userType === 'client') {
            // For clients, show all opportunities (including their own)
            filteredOpportunities = opportunities;
        } else {
            // For freelancers, show only opportunities posted by clients
            filteredOpportunities = opportunities.filter(opp => opp.postedBy === 'client');
        }
        
        // Generate opportunity cards
        filteredOpportunities.forEach(opportunity => {
            const card = createOpportunityCard(opportunity, userType);
            opportunitiesGrid.appendChild(card);
        });
        
        updateResultsCount();
    }
}

// Create opportunity card with user type consideration
function createOpportunityCard(opportunity, userType = 'freelancer') {
    const card = document.createElement('div');
    card.className = 'opportunity-card fade-in';
    card.setAttribute('data-post-id', opportunity.id);
    card.setAttribute('data-category', opportunity.category);
    card.setAttribute('data-experience', opportunity.experience);
    card.setAttribute('data-salary', opportunity.salary);
    card.setAttribute('data-duration', opportunity.duration);
    
    // Different actions based on user type
    const actions = userType === 'client' ? `
        <div class="opportunity-actions">
            <button class="apply-btn" onclick="viewApplications(${opportunity.id})">
                <i class="fas fa-users"></i>
                عرض التقديمات
            </button>
            <button class="volunteer-btn" onclick="editOpportunity(${opportunity.id})">
                <i class="fas fa-edit"></i>
                تعديل
            </button>
            <button class="save-btn" onclick="deleteOpportunity(${opportunity.id})">
                <i class="fas fa-trash"></i>
                حذف
            </button>
        </div>
    ` : `
        <div class="opportunity-actions">
            <button class="apply-btn" onclick="showApplyModal(${opportunity.id})">
                <i class="fas fa-paper-plane"></i>
                تقديم الآن
            </button>
            <button class="volunteer-btn" onclick="showVolunteerModal('${opportunity.title}')">
                <i class="fas fa-hand-holding-heart"></i>
                طلب تطوع
            </button>
            <button class="save-btn" onclick="toggleSave(${opportunity.id})" data-saved="false">
                <i class="far fa-bookmark"></i>
                حفظ
            </button>
        </div>
    `;
    
    card.innerHTML = `
        <div class="opportunity-header">
            <div>
                <h3 class="opportunity-title">${opportunity.title}</h3>
                <div class="opportunity-company">
                    <i class="fas fa-building"></i>
                    ${opportunity.company}
                </div>
            </div>
            <div class="opportunity-badge">جديد</div>
        </div>
        
        <p class="opportunity-description">${opportunity.description}</p>
        
        <div class="opportunity-details">
            <div class="detail-item">
                <div class="detail-label">الراتب</div>
                <div class="detail-value">${opportunity.salary} جنيه</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">المدة</div>
                <div class="detail-value">${opportunity.duration}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">الخبرة</div>
                <div class="detail-value">${getExperienceText(opportunity.experience)}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">الموعد النهائي</div>
                <div class="detail-value">${formatDate(opportunity.deadline)}</div>
            </div>
        </div>
        
        <div class="opportunity-tags">
            ${opportunity.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        
        ${actions}
    `;
    
    return card;
}

// Get experience text
function getExperienceText(experience) {
    switch (experience) {
        case 'beginner':
            return 'مبتدئ';
        case 'intermediate':
            return 'متوسط';
        case 'expert':
            return 'خبير';
        default:
            return 'غير محدد';
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG');
}

// Show apply modal
function showApplyModal(opportunityId) {
    const modal = document.getElementById('applyModal');
    const modalOpportunitySummary = document.getElementById('modalOpportunitySummary');
    
    // Find opportunity data
    const opportunityCard = document.querySelector(`[data-post-id="${opportunityId}"]`);
    if (opportunityCard) {
        const title = opportunityCard.querySelector('.opportunity-title').textContent;
        const company = opportunityCard.querySelector('.opportunity-company').textContent;
        const salary = opportunityCard.querySelector('.detail-value').textContent;
        
        modalOpportunitySummary.innerHTML = `
            <h4>${title}</h4>
            <p><strong>الشركة:</strong> ${company}</p>
            <p><strong>الراتب:</strong> ${salary}</p>
        `;
    }
    
    modal.style.display = 'block';
}

// Toggle save
function toggleSave(opportunityId) {
    const saveBtn = document.querySelector(`[data-post-id="${opportunityId}"] .save-btn`);
    const icon = saveBtn.querySelector('i');
    const isSaved = saveBtn.getAttribute('data-saved') === 'true';
    
    if (isSaved) {
        saveBtn.setAttribute('data-saved', 'false');
        saveBtn.classList.remove('saved');
        icon.className = 'far fa-bookmark';
        showNotification('تم إزالة الفرصة من المحفوظات', 'success');
    } else {
        saveBtn.setAttribute('data-saved', 'true');
        saveBtn.classList.add('saved');
        icon.className = 'fas fa-bookmark';
        showNotification('تم حفظ الفرصة في المحفوظات', 'success');
    }
}

// Update results count
function updateResultsCount() {
    const visibleCards = document.querySelectorAll('.opportunity-card[style*="block"], .opportunity-card:not([style*="none"])');
    const resultsCount = document.getElementById('resultsCount');
    
    if (resultsCount) {
        resultsCount.textContent = visibleCards.length;
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

// Load more opportunities
function loadMoreOpportunities() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        // Show loading state
        loadMoreBtn.classList.add('loading');
        
        // Simulate loading more opportunities
        setTimeout(() => {
            loadMoreBtn.classList.remove('loading');
            showNotification('تم تحميل المزيد من الفرص', 'success');
        }, 2000);
    }
}

// Initialize load more button
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreOpportunities);
    }
});

// Export functions for global access
window.showApplyModal = showApplyModal;
window.showVolunteerModal = showVolunteerModal;
window.closeVolunteerModal = closeVolunteerModal;
window.sendVolunteerRequest = sendVolunteerRequest;
window.toggleSave = toggleSave;
window.hideNotification = hideNotification;
window.showPostOpportunityModal = showPostOpportunityModal;
window.showMyOpportunities = showMyOpportunities;
window.viewApplications = viewApplications;
window.editOpportunity = editOpportunity;
window.deleteOpportunity = deleteOpportunity; 

// Client-specific functions
function viewApplications(opportunityId) {
    showNotification('سيتم إضافة صفحة عرض التقديمات قريباً!', 'info');
}

function editOpportunity(opportunityId) {
    showNotification('سيتم إضافة ميزة تعديل الفرص قريباً!', 'info');
}

function deleteOpportunity(opportunityId) {
    if (confirm('هل أنت متأكد من حذف هذه الفرصة؟')) {
        showNotification('تم حذف الفرصة بنجاح!', 'success');
        // Remove the card from DOM
        const card = document.querySelector(`[data-post-id="${opportunityId}"]`);
        if (card) {
            card.remove();
            updateResultsCount();
        }
    }
}