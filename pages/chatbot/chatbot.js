/**
 * Modern Responsive Chatbot Widget
 * Integrates into existing websites with intelligent Arabic navigation
 * Author: AI Assistant
 * Version: 2.0
 */

class ModernChatbot {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.conversationHistory = [];
        this.navigationMap = new Map();
        this.routeTranslations = new Map();
        this.pendingNavigation = null;
        this.isInitialized = false;
        
        // Define dynamic baseURL
        this.baseURL = '/'; // Default for web servers
        if (location.protocol === 'file:') {
            this.baseURL = location.href.replace(/[^\/]*$/, ''); // Dynamic for local file system
        }
        
        // Initialize route translations
        this.initializeRouteTranslations();
        
        // Auto-initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    /**
     * Initialize route translations mapping
     */
    initializeRouteTranslations() {
        this.routeTranslations.set('home', {
            arabic: 'الرئيسية',
            description: 'الصفحة الرئيسية للموقع - البوابة الرئيسية لجميع الخدمات.',
            url: this.baseURL + 'index.html', // Updated to use dynamic baseURL
            keywords: ['الرئيسية', 'الرئيسي', 'البيت', 'المنزل', 'home', 'main', 'start', 'بداية', 'أول']
        });
        
        this.routeTranslations.set('chat', {
            arabic: 'صفحة الدردشة',
            description: 'صفحة الدردشة تتيح لك التواصل مع الآخرين بسهولة.',
            url: this.baseURL + 'pages/chat/chat.html', // Updated to use dynamic baseURL
            keywords: ['دردشة', 'محادثة', 'تواصل', 'رسائل فورية']
        });
        
        this.routeTranslations.set('chat', {
            arabic: 'صفحة الدردشة',
            description: 'صفحة الدردشة تتيح لك التواصل مع الآخرين بسهولة.',
            url: this.baseURL + 'pages/chat/chat.html', // Updated to use dynamic baseURL
            keywords: ['دردشة', 'محادثة', 'تواصل', 'رسائل فورية']
        });
        
        this.routeTranslations.set('onboarding', {
            arabic: 'صفحة الترحيب',
            description: 'صفحة الترحيب ترشدك خلال الخطوات الأولى لاستخدام الموقع.',
            url: this.baseURL + 'pages/onboarding/onboarding.html', // Updated to use dynamic baseURL
            keywords: ['ترحيب', 'بداية', 'تعريف', 'إرشاد', 'خطوات']
        });
        
        this.routeTranslations.set('messages', {
            arabic: 'صفحة الرسائل',
            description: 'صفحة الرسائل تعرض جميع رسائلك الواردة والصادرة.',
            url: this.baseURL + 'pages/messages/messages.html', // Updated to use dynamic baseURL
            keywords: ['رسائل', 'بريد', 'إشعارات', 'تنبيهات']
        });
        
        this.routeTranslations.set('projects', {
            arabic: 'صفحة المشاريع',
            description: 'صفحة المشاريع تتيح لك إضافة مشاريعك الجديدة وعرض مشاريعك الحالية والمكتملة.',
            url: this.baseURL + 'pages/projects/project-submission.html', // Updated to use dynamic baseURL
            keywords: ['مشاريع', 'أعمال', 'مهام', 'إنجازات', 'إضافة مشروع', 'معرض الأعمال', 'بروجكت']
        });
        
        this.routeTranslations.set('reporting', {
            arabic: 'صفحة الإبلاغ',
            description: 'صفحة الإبلاغ تتيح لك إرسال البلاغات والتقارير عن المشاكل أو الاقتراحات.',
            url: this.baseURL + 'pages/reporting/reporting.html', // Updated to use dynamic baseURL
            keywords: ['إبلاغ', 'بلاغ', 'تقارير', 'شكوى', 'اقتراح', 'مشكلة', 'دعم']
        });
        
        this.routeTranslations.set('social', {
            arabic: 'صفحة التواصل الاجتماعي',
            description: 'صفحة التواصل الاجتماعي تتيح لك التفاعل مع المجتمع.',
            url: this.baseURL + 'pages/social/social.html', // Updated to use dynamic baseURL
            keywords: ['اجتماعي', 'تواصل', 'مجتمع', 'تفاعل', 'شبكة']
        });
        
        this.routeTranslations.set('user-profile', {
            arabic: 'صفحة الملف الشخصي للمستخدم',
            description: 'صفحة الملف الشخصي للمستخدم تعرض معلومات المستخدمين الآخرين.',
            url: this.baseURL + 'pages/user-profile/user-profile.html', // Updated to use dynamic baseURL
            keywords: ['مستخدم', 'ملف', 'معلومات', 'عضو']
        });
    }

    /**
     * Initialize the chatbot
     */
    init() {
        if (this.isInitialized) return;
        
        this.injectCSS();
        this.createChatbotWidget();
        this.scanDOMForNavigation();
        this.bindEvents();
        this.showWelcomeMessage();
        
        this.isInitialized = true;
        console.log('Modern Chatbot initialized successfully');
    }

    /**
     * Check if external CSS is loaded, inject fallback if needed
     */
    injectCSS() {
        // Check if external CSS is already loaded
        const existingLink = document.querySelector('link[href*="chatbot.css"]');
        if (existingLink) {
            console.log('External chatbot CSS detected, skipping injection');
            return;
        }
        
        // Minimal fallback CSS if external file is not available
        const fallbackCSS = `
            .modern-chatbot-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = fallbackCSS;
        document.head.appendChild(styleElement);
        console.log('Fallback CSS injected - external CSS file not found');
    }

    /**
     * Create the chatbot widget HTML structure
     */
    createChatbotWidget() {
        const widget = document.createElement('div');
        widget.className = 'modern-chatbot-widget';
        widget.innerHTML = `
            <button class="modern-chatbot-toggle" aria-label="فتح الدردشة">
                <img class="robot-icon-default" src="https://cdn3d.iconscout.com/3d/premium/thumb/sad-robot-3d-icon-download-in-png-blend-fbx-gltf-file-formats--unhappy-brain-ai-technology-activity-pack-science-icons-7746762.png" alt="AI Assistant" style="width: 28px; height: 28px; object-fit: contain;" onerror="this.style.display='none'; this.parentElement.innerHTML='🤖';">
                <img class="robot-icon-hover" src="https://cdn3d.iconscout.com/3d/premium/thumb/angry-robot-9580030-7746766.png" alt="AI Assistant" style="width: 28px; height: 28px; object-fit: contain; display: none;" onerror="this.style.display='none';">
            </button>
            <div class="modern-chatbot-window">
                <div class="modern-chatbot-header">
                    <h3>مساعدك الذكي</h3>
                    <div class="modern-chatbot-controls">
                        <button class="minimize-btn" aria-label="تصغير">−</button>
                        <button class="close-btn" aria-label="إغلاق">×</button>
                    </div>
                </div>
                <div class="modern-chatbot-messages"></div>
                <div class="modern-chatbot-input">
                    <input type="text" placeholder="اكتب رسالتك هنا..." aria-label="رسالة">
                    <button aria-label="إرسال">إرسال</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
        
        // Store references
        this.widget = widget;
        this.toggleBtn = widget.querySelector('.modern-chatbot-toggle');
        this.window = widget.querySelector('.modern-chatbot-window');
        this.messagesContainer = widget.querySelector('.modern-chatbot-messages');
        this.input = widget.querySelector('.modern-chatbot-input input');
        this.sendBtn = widget.querySelector('.modern-chatbot-input button');
        this.minimizeBtn = widget.querySelector('.minimize-btn');
        this.closeBtn = widget.querySelector('.close-btn');
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.minimizeBtn.addEventListener('click', () => this.minimizeChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Handle clicks outside to close
        document.addEventListener('click', (e) => {
            if (!this.widget.contains(e.target) && this.isOpen) {
                this.closeChat();
            }
        });
    }

    /**
     * Scan DOM for navigation elements
     */
    scanDOMForNavigation() {
        console.log('Scanning DOM for navigation elements...');
        
        // Initialize navigation map with all route translations
        for (const [routeKey, translation] of this.routeTranslations) {
            this.navigationMap.set(routeKey, {
                url: translation.url,
                arabic: translation.arabic,
                description: translation.description,
                keywords: [...translation.keywords]
            });
        }
        
        // Scan links
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            const text = link.textContent.trim();
            
            if (href && text) {
                const normalizedUrl = this.normalizeUrl(href);
                const routeKey = this.extractRouteKey(normalizedUrl);
                
                if (routeKey && this.routeTranslations.has(routeKey)) {
                    const translation = this.routeTranslations.get(routeKey);
                    this.navigationMap.set(routeKey, {
                        url: translation.url || normalizedUrl,
                        arabic: translation.arabic,
                        description: translation.description,
                        keywords: [...translation.keywords, text.toLowerCase()]
                    });
                }
            }
        });
        
        // Scan headings for additional context
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            const text = heading.textContent.trim().toLowerCase();
            
            // Try to match heading text with route keywords
            for (const [routeKey, translation] of this.routeTranslations) {
                if (translation.keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
                    if (this.navigationMap.has(routeKey)) {
                        this.navigationMap.get(routeKey).keywords.push(text);
                    }
                }
            }
        });
        
        console.log('Navigation map built:', this.navigationMap);
        console.log('Available routes:', Array.from(this.navigationMap.keys()));
    }

    /**
     * Normalize URL for consistent mapping
     */
    normalizeUrl(url) {
        // Remove .html extension
        url = url.replace(/\.html$/, '');
        
        // Handle relative URLs
        if (url.startsWith('./')) {
            url = url.substring(2);
        }
        
        // Ensure leading slash
        if (!url.startsWith('/') && !url.includes('://')) {
            url = '/' + url;
        }
        
        // Remove trailing slash except for root
        if (url.length > 1 && url.endsWith('/')) {
            url = url.slice(0, -1);
        }
        
        return url;
    }

    /**
     * Extract route key from URL
     */
    extractRouteKey(url) {
        const path = url.split('/').pop() || url.split('/').slice(-2)[0];
        return path.toLowerCase();
    }

    /**
     * Show welcome message
     */
    showWelcomeMessage() {
        // Only show welcome message if no robot is present
        const robotExists = this.messagesContainer.querySelector('.conversation-robot');
        
        if (!robotExists) {
            const welcomeMessage = "مرحبًا! أنا هنا لمساعدتك في التنقل. جرب كتابة 'الرئيسية' أو 'المشاريع' أو 'الإبلاغ' أو 'الدردشة' أو أي صفحة تريد زيارتها.";
            this.addMessage(welcomeMessage, 'bot');
            
            // Add quick suggestions
            this.addSuggestions(this.getTopSuggestions());
            
            // Add context-aware suggestions based on current page
            this.addContextAwareSuggestions();
        }
    }

    /**
     * Add context-aware suggestions based on current page
     */
    addContextAwareSuggestions() {
        const currentPath = window.location.pathname;
        const suggestions = [];
        
        // Add page-specific suggestions
        if (currentPath.includes('projects')) {
            suggestions.push('إضافة مشروع جديد', 'معرض المشاريع', 'تحميل مشروع');
        } else if (currentPath.includes('reporting')) {
            suggestions.push('إرسال بلاغ', 'تقديم شكوى', 'إرسال اقتراح');
        } else if (currentPath.includes('chat') || currentPath.includes('messages')) {
            suggestions.push('الرسائل', 'المجتمع', 'الإشعارات');
        } else if (currentPath.includes('social')) {
            suggestions.push('المنشورات', 'التفاعلات', 'المجتمع');
        }
        
        // Add general suggestions
        suggestions.push('الرئيسية', 'الإبلاغ', 'المشاريع', 'الدردشة');
        
        // Show context-aware suggestions
        if (suggestions.length > 0) {
            this.addSuggestions(suggestions.slice(0, 3));
        }
    }

    /**
     * Toggle chat window
     */
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    /**
     * Open chat window
     */
    openChat() {
        this.window.classList.add('open');
        this.window.classList.remove('minimized');
        this.isOpen = true;
        this.isMinimized = false;
        this.input.focus();
        
        // Show angry robot when conversation opens
        this.showAngryRobot();
        
        // Add angry robot to conversation area
        setTimeout(() => {
            this.addAngryRobotToConversation();
        }, 50);
    }

    /**
     * Close chat window
     */
    closeChat() {
        this.window.classList.remove('open');
        this.isOpen = false;
        this.isMinimized = false;
        
        // Show sad robot when conversation closes
        this.showSadRobot();
    }

    /**
     * Minimize chat window
     */
    minimizeChat() {
        this.window.classList.add('minimized');
        this.isMinimized = true;
    }

    /**
     * Send message
     */
    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message after a short delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processMessage(message);
        }, 1000);
    }

    /**
     * Enhanced message processing with better error handling
     */
    processMessage(message) {
        const lowerMessage = message.toLowerCase().trim();
        
        // Handle navigation confirmation
        if (this.pendingNavigation) {
            if (lowerMessage.includes('نعم') || lowerMessage.includes('yes')) {
                this.executeNavigation(this.pendingNavigation);
                this.pendingNavigation = null;
                return;
            } else if (lowerMessage.includes('لا') || lowerMessage.includes('no')) {
                this.addMessage("حسنًا، إذا غيرت رأيك، أخبرني!", 'bot');
                this.pendingNavigation = null;
                return;
            }
        }
        
        // Handle help requests
        if (lowerMessage.includes('مساعدة') || lowerMessage.includes('help') || lowerMessage.includes('ماذا تستطيع')) {
            this.showHelp();
            return;
        }
        
        // Handle feedback
        if (lowerMessage.includes('تقييم') || lowerMessage.includes('feedback') || lowerMessage.includes('رأي')) {
            this.handleFeedback();
            return;
        }
        
        // Try to find navigation match
        const navigationMatch = this.findNavigationMatch(message);
        
        if (navigationMatch) {
            this.handleNavigationRequest(navigationMatch);
        } else {
            this.handleFallback(message);
        }
    }

    /**
     * Show help information
     */
    showHelp() {
        this.addMessage("يمكنني مساعدتك في:", 'bot');
        this.addMessage("• التنقل بين صفحات الموقع", 'bot');
        this.addMessage("• إرسال البلاغات والشكاوى", 'bot');
        this.addMessage("• إدارة المشاريع والأعمال", 'bot');
        this.addMessage("• التواصل مع المستخدمين الآخرين", 'bot');
        this.addMessage("• الحصول على المساعدة والدعم", 'bot');
        
        this.addSuggestions(['الرئيسية', 'المشاريع', 'الإبلاغ', 'المجتمع']);
    }

    /**
     * Handle user feedback
     */
    handleFeedback() {
        this.addMessage("شكراً لك على اهتمامك! يمكنك إرسال تقييمك أو اقتراحاتك عبر:", 'bot');
        this.addMessage("• البريد الإلكتروني: support@shoglak.com", 'bot');
        this.addMessage("• صفحة الإبلاغ في الموقع", 'bot');
        this.addMessage("• التواصل مع فريق الدعم", 'bot');
        
        this.addSuggestions(['الإبلاغ', 'الدعم', 'الرئيسية']);
    }

    /**
     * Find navigation match
     */
    findNavigationMatch(message) {
        const lowerMessage = message.toLowerCase();
        
        // Debug: Log available routes
        console.log('Available routes:', Array.from(this.navigationMap.keys()));
        console.log('Searching for:', lowerMessage);
        
        // Direct match with Arabic titles
        for (const [routeKey, data] of this.navigationMap) {
            if (data.arabic.toLowerCase().includes(lowerMessage) || 
                lowerMessage.includes(data.arabic.toLowerCase())) {
                console.log('Direct match found:', routeKey);
                return { routeKey, data, confidence: 1.0 };
            }
        }
        
        // Keyword matching
        let bestMatch = null;
        let bestScore = 0;
        
        for (const [routeKey, data] of this.navigationMap) {
            for (const keyword of data.keywords) {
                if (lowerMessage.includes(keyword.toLowerCase()) || 
                    keyword.toLowerCase().includes(lowerMessage)) {
                    const score = this.calculateSimilarity(lowerMessage, keyword.toLowerCase());
                    console.log('Keyword match:', routeKey, keyword, score);
                    if (score > bestScore && score > 0.6) {
                        bestScore = score;
                        bestMatch = { routeKey, data, confidence: score };
                    }
                }
            }
        }
        
        if (bestMatch) {
            console.log('Best match:', bestMatch.routeKey, bestMatch.confidence);
        } else {
            console.log('No match found');
        }
        
        return bestMatch;
    }

    /**
     * Calculate similarity between two strings
     */
    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    /**
     * Calculate Levenshtein distance
     */
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    /**
     * Handle navigation request
     */
    handleNavigationRequest(match) {
        const { data } = match;
        
        this.addMessage(data.description, 'bot', 'navigation');
        this.addMessage("هل تريدني أن أوجهك إلى الصفحة تلقائيًا؟", 'bot');
        
        // Add quick action buttons
        this.addQuickActions(['نعم', 'لا']);
        
        this.pendingNavigation = data;
    }

    /**
     * Enhanced error handling for navigation
     */
    executeNavigation(navigationData) {
        try {
            this.addMessage(`جاري التوجه إلى ${navigationData.arabic}...`, 'bot', 'navigation');
            
            // Add loading indicator
            this.showLoadingIndicator();
            
            setTimeout(() => {
                this.hideLoadingIndicator();
                
                // Check if the URL is valid
                if (navigationData.url && navigationData.url !== '#') {
                    window.location.href = navigationData.url;
                } else {
                    this.addMessage("عذراً، الرابط غير متاح حالياً. يرجى المحاولة لاحقاً.", 'bot');
                }
            }, 1000);
            
        } catch (error) {
            console.error('Navigation error:', error);
            this.hideLoadingIndicator();
            this.addMessage("عذرًا، حدث خطأ أثناء التوجه إلى الصفحة. يرجى المحاولة مرة أخرى.", 'bot');
        }
    }

    /**
     * Enhanced fallback handling
     */
    handleFallback(message) {
        // Try to provide more helpful responses
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('شكر') || lowerMessage.includes('thanks')) {
            this.addMessage("العفو! سعيد بمساعدتك. هل هناك شيء آخر تريد مساعدة فيه؟", 'bot');
        } else if (lowerMessage.includes('مرحبا') || lowerMessage.includes('hello')) {
            this.addMessage("مرحباً! كيف يمكنني مساعدتك اليوم؟", 'bot');
        } else if (lowerMessage.includes('السلام عليكم')) {
            this.addMessage("وعليكم السلام ورحمة الله وبركاته! كيف يمكنني مساعدتك؟", 'bot');
        } else {
            this.addMessage("عذرًا، لم أفهم طلبك. يمكنني مساعدتك في:", 'bot');
            this.addMessage("• التنقل بين صفحات الموقع", 'bot');
            this.addMessage("• إرسال البلاغات والشكاوى", 'bot');
            this.addMessage("• إدارة المشاريع والأعمال", 'bot');
            
            const suggestions = this.getTopSuggestions();
            if (suggestions.length > 0) {
                this.addMessage(`جرب إحدى هذه الصفحات: ${suggestions.join('، ')}`, 'bot');
                this.addSuggestions(suggestions);
            }
        }
    }

    /**
     * Get top navigation suggestions
     */
    getTopSuggestions() {
        const suggestions = [];
        let count = 0;
        
        for (const [routeKey, data] of this.navigationMap) {
            if (count < 3) {
                suggestions.push(data.arabic);
                count++;
            }
        }
        
        return suggestions;
    }

    /**
     * Add message to chat
     */
    addMessage(text, sender, type = '') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `modern-chatbot-message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = `modern-message-content ${type}`;
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        
        // Store in history
        this.conversationHistory.push({ text, sender, timestamp: Date.now() });
    }

    /**
     * Add quick action buttons
     */
    addQuickActions(actions) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'modern-chatbot-suggestions';
        
        actions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action;
            button.addEventListener('click', () => {
                this.input.value = action;
                this.sendMessage();
            });
            actionsDiv.appendChild(button);
        });
        
        this.messagesContainer.appendChild(actionsDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    /**
     * Add suggestion buttons
     */
    addSuggestions(suggestions) {
        if (suggestions.length === 0) return;
        
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'modern-chatbot-suggestions';
        
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.textContent = suggestion;
            button.addEventListener('click', () => {
                this.input.value = suggestion;
                this.sendMessage();
            });
            suggestionsDiv.appendChild(button);
        });
        
        this.messagesContainer.appendChild(suggestionsDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'modern-chatbot-typing';
        typingDiv.innerHTML = `
            <div class="modern-typing-dot"></div>
            <div class="modern-typing-dot"></div>
            <div class="modern-typing-dot"></div>
        `;
        
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        const typingIndicator = this.messagesContainer.querySelector('.modern-chatbot-typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    /**
     * Show loading indicator
     */
    showLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'modern-chatbot-loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <span>جاري التحميل...</span>
        `;
        
        this.messagesContainer.appendChild(loadingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    /**
     * Hide loading indicator
     */
    hideLoadingIndicator() {
        const loadingIndicator = this.messagesContainer.querySelector('.modern-chatbot-loading');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }

    /**
     * Show angry robot in toggle button
     */
    showAngryRobot() {
        const defaultIcon = this.toggleBtn.querySelector('.robot-icon-default');
        const hoverIcon = this.toggleBtn.querySelector('.robot-icon-hover');
        
        if (defaultIcon && hoverIcon) {
            defaultIcon.style.display = 'none';
            hoverIcon.style.display = 'block';
        }
    }

    /**
     * Show sad robot in toggle button
     */
    showSadRobot() {
        const defaultIcon = this.toggleBtn.querySelector('.robot-icon-default');
        const hoverIcon = this.toggleBtn.querySelector('.robot-icon-hover');
        
        if (defaultIcon && hoverIcon) {
            defaultIcon.style.display = 'block';
            hoverIcon.style.display = 'none';
        }
    }

    /**
     * Add angry robot to conversation area
     */
    addAngryRobotToConversation() {
        // Clear existing content
        this.messagesContainer.innerHTML = '';
        
        // Create robot container
        const robotContainer = document.createElement('div');
        robotContainer.className = 'conversation-robot';
        
        // Create robot image
        const robotImg = document.createElement('img');
        robotImg.src = 'https://cdn3d.iconscout.com/3d/premium/thumb/angry-robot-9580030-7746766.png';
        robotImg.alt = 'AI Assistant';
        robotImg.className = 'conversation-robot-img';
        
        // Create welcome message
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'conversation-robot-welcome';
        welcomeDiv.innerHTML = `
            <div class="robot-welcome-text">
                <h4>مرحباً! أنا مساعدك الذكي 🤖</h4>
                <p>كيف يمكنني مساعدتك اليوم؟</p>
            </div>
        `;
        
        // Add elements to container
        robotContainer.appendChild(robotImg);
        robotContainer.appendChild(welcomeDiv);
        
        // Add robot to conversation
        this.messagesContainer.appendChild(robotContainer);
        
        // Add entrance animation
        setTimeout(() => {
            robotContainer.classList.add('robot-visible');
            
            // Add suggestions after robot appears
            setTimeout(() => {
                this.addSuggestions(this.getTopSuggestions());
                this.addContextAwareSuggestions();
            }, 800);
        }, 100);
    }
}

// Initialize the chatbot
window.ModernChatbot = ModernChatbot;

// Auto-initialize if not in module environment
if (typeof module === 'undefined') {
    window.chatbotInstance = new ModernChatbot();
}