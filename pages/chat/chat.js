// Chat Page JavaScript - Compatible with Site Design

// Chat data
let currentUser = {
    id: 'current_user',
    name: 'أنت',
    avatar: 'أ'
};

let chatUser = {
    id: 1,
    name: "أحمد محمد",
    avatar: "أ",
    status: "متصل الآن",
    isOnline: true
};

let messages = [
    {
        id: 1,
        senderId: 1,
        text: "مرحباً! كيف حالك؟",
        timestamp: new Date(Date.now() - 3600000),
        status: "read",
        type: "text"
    },
    {
        id: 2,
        senderId: 'current_user',
        text: "أهلاً وسهلاً! بخير والحمد لله، وأنت كيف حالك؟",
        timestamp: new Date(Date.now() - 3500000),
        status: "read",
        type: "text"
    },
    {
        id: 3,
        senderId: 1,
        text: "الحمد لله بخير. هل يمكننا مناقشة المشروع الجديد؟",
        timestamp: new Date(Date.now() - 3000000),
        status: "read",
        type: "text"
    },
    {
        id: 4,
        senderId: 'current_user',
        text: "بالطبع! أنا متحمس لسماع التفاصيل",
        timestamp: new Date(Date.now() - 2500000),
        status: "read",
        type: "text"
    },
    {
        id: 5,
        senderId: 1,
        text: "ممتاز! سأرسل لك المتطلبات قريباً",
        timestamp: new Date(Date.now() - 300000),
        status: "delivered",
        type: "text"
    }
];

// Chat state
let chatState = {
    isTyping: false,
    lastMessageId: 5,
    isScrolling: false
};

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
    setupEventListeners();
    loadChatFromURL();
    setupKeyboardShortcuts();
    setupScrollEffects();
});

function initializeChat() {
    renderMessages();
    updateUserInfo();
    setupAutoResize();
    scrollToBottom();
    setupEmojiPicker();
    addWelcomeAnimation();
}

function addWelcomeAnimation() {
    // Add a subtle welcome animation to the chat container
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
        chatContainer.style.opacity = '0';
        chatContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            chatContainer.style.transition = 'all 0.6s ease';
            chatContainer.style.opacity = '1';
            chatContainer.style.transform = 'translateY(0)';
        }, 100);
    }
}

function setupScrollEffects() {
    const chatMessages = document.getElementById('chatMessages');
    
    chatMessages.addEventListener('scroll', () => {
        chatState.isScrolling = true;
        clearTimeout(chatState.scrollTimeout);
        
        chatState.scrollTimeout = setTimeout(() => {
            chatState.isScrolling = false;
        }, 150);
    });
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to send message
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
        
        // Escape to close dropdowns
        if (e.key === 'Escape') {
            hideAttachmentOptions();
            hideEmojiPicker();
        }
        
        // Alt + A for attachment
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            toggleAttachmentOptions();
        }
        
        // Alt + E for emoji
        if (e.altKey && e.key === 'e') {
            e.preventDefault();
            toggleEmojiPicker();
        }
    });
}

function loadChatFromURL() {
    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId') || urlParams.get('user');
    const userName = urlParams.get('userName') || urlParams.get('name');
    const isNewChat = urlParams.get('new') === 'true';
    const isGroupChat = urlParams.get('group') === 'true';
    
    // Handle different chat types
    if (isNewChat) {
        // New chat mode
        chatUser = {
            id: 'new_chat',
            name: 'محادثة جديدة',
            avatar: 'ج',
            status: 'جاهز للبدء',
            isOnline: true
        };
        messages = [];
        showToast('ابدأ محادثة جديدة', 'info');
    } else if (isGroupChat) {
        // Group chat mode
        chatUser = {
            id: 'group_chat',
            name: 'محادثة جماعية',
            avatar: 'م',
            status: 'متصل الآن',
            isOnline: true
        };
        messages = [
            {
                id: 1,
                senderId: 'system',
                text: 'تم إنشاء محادثة جماعية جديدة. يمكنك الآن إضافة أعضاء وبدء المحادثة.',
                timestamp: new Date(),
                status: 'read',
                type: 'system'
            }
        ];
        showToast('تم إنشاء محادثة جماعية', 'success');
    } else if (userId && userName) {
        // Individual chat with specific user
        chatUser.id = userId;
        chatUser.name = decodeURIComponent(userName);
        chatUser.avatar = userName.charAt(0);
        showToast(`تم فتح المحادثة مع ${chatUser.name}`, 'success');
    }
    
    updateUserInfo();
    renderMessages();
    updatePageTitle();
}

function updateUserInfo() {
    document.getElementById('chatUserName').textContent = chatUser.name;
    document.getElementById('chatUserInitial').textContent = chatUser.avatar;
    document.getElementById('typingUserInitial').textContent = chatUser.avatar;
    document.getElementById('typingUserName').textContent = chatUser.name;
    
    const onlineStatus = document.getElementById('onlineStatus');
    const userStatus = document.getElementById('chatUserStatus');
    
    // Handle different chat types
    if (chatUser.id === 'new_chat') {
        onlineStatus.className = 'online-indicator';
        onlineStatus.style.background = '#4ecdc4';
        userStatus.textContent = 'جاهز للبدء';
    } else if (chatUser.id === 'group_chat') {
        onlineStatus.className = 'online-indicator';
        onlineStatus.style.background = '#ffd93d';
        userStatus.textContent = 'محادثة جماعية';
    } else if (chatUser.isOnline) {
        onlineStatus.className = 'online-indicator';
        onlineStatus.style.background = '#4ecdc4';
        userStatus.textContent = 'متصل الآن';
    } else {
        onlineStatus.className = 'online-indicator';
        onlineStatus.style.background = '#a0aec0';
        userStatus.textContent = 'آخر ظهور منذ 5 دقائق';
    }
}

function updatePageTitle() {
    const title = document.querySelector('title');
    if (title) {
        title.textContent = `المحادثة مع ${chatUser.name} | شغلك`;
    }
}

function renderMessages() {
    const chatMessages = document.getElementById('chatMessages');
    const wasAtBottom = isAtBottom();
    
    chatMessages.innerHTML = '';
    
    messages.forEach((message, index) => {
        const messageElement = createMessageElement(message);
        chatMessages.appendChild(messageElement);
        
        // Add staggered animation for new messages
        if (index >= messages.length - 3) {
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                messageElement.style.transition = 'all 0.4s ease';
                messageElement.style.opacity = '1';
                messageElement.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
    
    // Scroll to bottom only if user was already at bottom
    if (wasAtBottom) {
        scrollToBottom();
    }
}

function isAtBottom() {
    const chatMessages = document.getElementById('chatMessages');
    const threshold = 50; // pixels from bottom
    return chatMessages.scrollTop + chatMessages.clientHeight >= chatMessages.scrollHeight - threshold;
}

function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    
    // Handle system messages
    if (message.senderId === 'system') {
        messageDiv.className = 'message system-message';
        messageDiv.setAttribute('data-message-id', message.id);
        
        const content = document.createElement('div');
        content.className = 'system-message-content';
        content.innerHTML = `
            <div class="system-message-text">${message.text}</div>
            <div class="system-message-time">${formatTime(message.timestamp)}</div>
        `;
        
        messageDiv.appendChild(content);
        return messageDiv;
    }
    
    messageDiv.className = `message ${message.senderId === 'current_user' ? 'sent' : 'received'}`;
    messageDiv.setAttribute('data-message-id', message.id);
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = `<span>${message.senderId === 'current_user' ? currentUser.avatar : chatUser.avatar}</span>`;
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Handle different message types
    if (message.type === 'image') {
        content.innerHTML = `
            <div class="message-image">
                <img src="${message.imageUrl}" alt="صورة" onclick="openImageModal('${message.imageUrl}')">
                <div class="image-overlay">
                    <i class="fas fa-expand"></i>
                </div>
            </div>
            <div class="message-time">${formatTime(message.timestamp)}</div>
            ${message.senderId === 'current_user' ? `<div class="message-status">${getMessageStatusIcon(message.status)}</div>` : ''}
        `;
    } else if (message.type === 'file') {
        const fileExtension = message.fileName.split('.').pop().toLowerCase();
        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);
        
        if (isImage) {
            content.innerHTML = `
                <div class="message-file image-file">
                    <div class="file-preview">
                        <img src="${message.fileUrl}" alt="File Preview" onclick="openImageModal('${message.fileUrl}')">
                    </div>
                    <div class="file-info">
                        <div class="file-name">${message.fileName}</div>
                        <div class="file-size">${formatFileSize(message.fileSize)}</div>
                    </div>
                    <button class="download-btn" onclick="downloadFile('${message.fileUrl}', '${message.fileName}')" title="تحميل الملف">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
                <div class="message-time">${formatTime(message.timestamp)}</div>
                ${message.senderId === 'current_user' ? `<div class="message-status">${getMessageStatusIcon(message.status)}</div>` : ''}
            `;
        } else {
            content.innerHTML = `
                <div class="message-file">
                    <div class="file-icon">
                        <i class="fas ${getFileIconClass(message.fileName)}"></i>
                    </div>
                    <div class="file-info">
                        <div class="file-name">${message.fileName}</div>
                        <div class="file-size">${formatFileSize(message.fileSize)}</div>
                        <div class="file-type">${fileExtension.toUpperCase()}</div>
                    </div>
                    <button class="download-btn" onclick="downloadFile('${message.fileUrl}', '${message.fileName}')" title="تحميل الملف">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
                <div class="message-time">${formatTime(message.timestamp)}</div>
                ${message.senderId === 'current_user' ? `<div class="message-status">${getMessageStatusIcon(message.status)}</div>` : ''}
            `;
        }
    } else {
        content.innerHTML = `
            <div class="message-text">${message.text}</div>
            <div class="message-time">${formatTime(message.timestamp)}</div>
            ${message.senderId === 'current_user' ? `<div class="message-status">${getMessageStatusIcon(message.status)}</div>` : ''}
        `;
    }
    
    if (message.senderId === 'current_user') {
        messageDiv.appendChild(content);
        messageDiv.appendChild(avatar);
    } else {
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
    }
    
    return messageDiv;
}

function formatTime(timestamp) {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
    
    if (diffInMinutes < 1) {
        return 'الآن';
    } else if (diffInMinutes < 60) {
        return `منذ ${diffInMinutes} دقيقة`;
    } else if (diffInMinutes < 1440) {
        const hours = Math.floor(diffInMinutes / 60);
        return `منذ ${hours} ساعة`;
    } else {
        return messageTime.toLocaleDateString('ar-SA');
    }
}

function getMessageStatusIcon(status) {
    switch (status) {
        case 'sending':
            return '<i class="fas fa-clock"></i>';
        case 'sent':
            return '<i class="fas fa-check"></i>';
        case 'delivered':
            return '<i class="fas fa-check-double"></i>';
        case 'read':
            return '<i class="fas fa-check-double" style="color: #4ecdc4;"></i>';
        case 'failed':
            return '<i class="fas fa-exclamation-triangle" style="color: #ff6b6b;"></i>';
        default:
            return '<i class="fas fa-clock"></i>';
    }
}

function setupEventListeners() {
    // Message input
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    
    messageInput.addEventListener('input', handleMessageInput);
    messageInput.addEventListener('keydown', handleKeyDown);
    messageInput.addEventListener('focus', handleInputFocus);
    messageInput.addEventListener('blur', handleInputBlur);
    sendBtn.addEventListener('click', sendMessage);
    
    // Attachment button
    const attachmentBtn = document.getElementById('attachmentBtn');
    attachmentBtn.addEventListener('click', toggleAttachmentOptions);
    
    // Emoji button
    const emojiBtn = document.getElementById('emojiBtn');
    emojiBtn.addEventListener('click', toggleEmojiPicker);
    
    // Attachment options
    document.querySelectorAll('.attachment-option').forEach(option => {
        option.addEventListener('click', handleAttachmentOption);
    });
    
    // Emoji categories
    document.querySelectorAll('.emoji-category').forEach(category => {
        category.addEventListener('click', handleEmojiCategory);
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.attachment-options') && !e.target.closest('#attachmentBtn')) {
            hideAttachmentOptions();
        }
        if (!e.target.closest('.emoji-picker') && !e.target.closest('#emojiBtn')) {
            hideEmojiPicker();
        }
    });
    
    // Add smooth scroll behavior
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.style.scrollBehavior = 'smooth';
    
    // Setup drag and drop
    setupDragAndDrop();
}

function setupDragAndDrop() {
    const chatContainer = document.querySelector('.chat-container');
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        chatContainer.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        chatContainer.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        chatContainer.addEventListener(eventName, unhighlight, false);
    });
    
    // Handle dropped files
    chatContainer.addEventListener('drop', handleDrop, false);
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight(e) {
        chatContainer.classList.add('drag-over');
    }
    
    function unhighlight(e) {
        chatContainer.classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    sendImageMessage(file);
                } else {
                    sendFileMessage(file);
                }
            });
        }
    }
}

function handleInputFocus() {
    const chatInputWrapper = document.querySelector('.chat-input-wrapper');
    chatInputWrapper.style.transform = 'scale(1.02)';
}

function handleInputBlur() {
    const chatInputWrapper = document.querySelector('.chat-input-wrapper');
    chatInputWrapper.style.transform = 'scale(1)';
}

function handleMessageInput() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const charCount = document.getElementById('charCount');
    
    const text = messageInput.value.trim();
    const charCountValue = messageInput.value.length;
    
    charCount.textContent = charCountValue;
    sendBtn.disabled = !text || charCountValue > 1000;
    
    // Auto-resize textarea
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
    
    // Show typing indicator
    if (text && !chatState.isTyping) {
        showTypingIndicator();
    } else if (!text && chatState.isTyping) {
        hideTypingIndicator();
    }
    
    // Update character counter color
    if (charCountValue > 900) {
        charCount.style.color = '#ff6b6b';
    } else if (charCountValue > 800) {
        charCount.style.color = '#ffd93d';
    } else {
        charCount.style.color = '#718096';
    }
}

function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const text = messageInput.value.trim();
    
    if (!text) return;
    
    // Check if this is a new chat and add welcome message
    if (chatUser.id === 'new_chat' && messages.length === 0) {
        const welcomeMessage = {
            id: ++chatState.lastMessageId,
            senderId: 'system',
            text: 'تم بدء محادثة جديدة. اكتب رسالتك الأولى!',
            timestamp: new Date(),
            status: 'read',
            type: 'system'
        };
        messages.push(welcomeMessage);
    }
    
    const newMessage = {
        id: ++chatState.lastMessageId,
        senderId: 'current_user',
        text: text,
        timestamp: new Date(),
        status: 'sending',
        type: 'text'
    };
    
    messages.push(newMessage);
    renderMessages();
    scrollToBottom();
    
    // Add sending animation
    const messageElement = document.querySelector(`[data-message-id="${newMessage.id}"]`);
    if (messageElement) {
        messageElement.style.opacity = '0.7';
        messageElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            messageElement.style.transition = 'all 0.3s ease';
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 100);
    }
    
    messageInput.value = '';
    messageInput.style.height = 'auto';
    document.getElementById('charCount').textContent = '0';
    document.getElementById('sendBtn').disabled = true;
    
    hideTypingIndicator();
    
    // Simulate message delivery and read with realistic timing
    setTimeout(() => {
        updateMessageStatus(newMessage.id, 'sent');
    }, 500);
    
    setTimeout(() => {
        updateMessageStatus(newMessage.id, 'delivered');
    }, 1500);
    
    setTimeout(() => {
        updateMessageStatus(newMessage.id, 'read');
    }, 3000);
    
    // Simulate reply (only for individual chats, not new/group chats)
    if (chatUser.id !== 'new_chat' && chatUser.id !== 'group_chat') {
        setTimeout(() => {
            simulateReply();
        }, 3000 + Math.random() * 5000);
    }
}

function updateMessageStatus(messageId, status) {
    const message = messages.find(m => m.id === messageId);
    if (message) {
        message.status = status;
        const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
        if (messageElement) {
            const statusElement = messageElement.querySelector('.message-status');
            if (statusElement) {
                statusElement.innerHTML = getMessageStatusIcon(status);
                
                // Add status update animation
                statusElement.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    statusElement.style.transform = 'scale(1)';
                }, 200);
            }
        }
    }
}

function simulateReply() {
    const replies = [
        "ممتاز! شكراً لك",
        "أفهم تماماً",
        "هذا رائع",
        "سأقوم بمراجعته",
        "أحتاج إلى مزيد من التفاصيل",
        "متى يمكننا البدء؟",
        "هل لديك أي أسئلة أخرى؟",
        "أنا متحمس لهذا المشروع"
    ];
    
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    
    const newMessage = {
        id: ++chatState.lastMessageId,
        senderId: chatUser.id,
        text: randomReply,
        timestamp: new Date(),
        status: 'read',
        type: 'text'
    };
    
    messages.push(newMessage);
    renderMessages();
    scrollToBottom();
    
    // Show typing indicator before reply
    showTypingIndicator();
    setTimeout(() => {
        hideTypingIndicator();
    }, 1500);
}

function showTypingIndicator() {
    if (!chatState.isTyping) {
        chatState.isTyping = true;
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.style.display = 'flex';
        typingIndicator.style.opacity = '0';
        typingIndicator.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            typingIndicator.style.transition = 'all 0.3s ease';
            typingIndicator.style.opacity = '1';
            typingIndicator.style.transform = 'translateY(0)';
        }, 100);
        
        scrollToBottom();
    }
}

function hideTypingIndicator() {
    chatState.isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.transition = 'all 0.3s ease';
    typingIndicator.style.opacity = '0';
    typingIndicator.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 300);
}

function scrollToBottom() {
    if (chatState.isScrolling) return; // Don't scroll if user is manually scrolling
    
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setupAutoResize() {
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
}

function toggleAttachmentOptions() {
    const attachmentOptions = document.getElementById('attachmentOptions');
    if (attachmentOptions.style.display === 'none' || !attachmentOptions.style.display) {
        attachmentOptions.style.display = 'grid';
        attachmentOptions.style.opacity = '0';
        attachmentOptions.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            attachmentOptions.style.transition = 'all 0.3s ease';
            attachmentOptions.style.opacity = '1';
            attachmentOptions.style.transform = 'translateY(0)';
        }, 100);
        
        hideEmojiPicker();
    } else {
        hideAttachmentOptions();
    }
}

function hideAttachmentOptions() {
    const attachmentOptions = document.getElementById('attachmentOptions');
    attachmentOptions.style.transition = 'all 0.3s ease';
    attachmentOptions.style.opacity = '0';
    attachmentOptions.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        attachmentOptions.style.display = 'none';
    }, 300);
}

function toggleEmojiPicker() {
    const emojiPicker = document.getElementById('emojiPicker');
    if (emojiPicker.style.display === 'none' || !emojiPicker.style.display) {
        emojiPicker.style.display = 'block';
        emojiPicker.style.opacity = '0';
        emojiPicker.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            emojiPicker.style.transition = 'all 0.3s ease';
            emojiPicker.style.opacity = '1';
            emojiPicker.style.transform = 'translateY(0)';
        }, 100);
        
        hideAttachmentOptions();
    } else {
        hideEmojiPicker();
    }
}

function hideEmojiPicker() {
    const emojiPicker = document.getElementById('emojiPicker');
    emojiPicker.style.transition = 'all 0.3s ease';
    emojiPicker.style.opacity = '0';
    emojiPicker.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        emojiPicker.style.display = 'none';
    }, 300);
}

function setupEmojiPicker() {
    renderEmojis('recent');
}

function renderEmojis(category) {
    const emojiGrid = document.getElementById('emojiGrid');
    emojiGrid.innerHTML = '';
    
    const emojis = {
        recent: ['😊', '👍', '❤️', '😂', '🔥', '👏', '🎉', '💯', '😍', '🤔', '😅', '🙏'],
        smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳'],
        people: ['👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👩', '🧓', '👴', '👵', '🙍', '🙎', '🙅', '🙆', '💁', '🙋', '🧏', '🙇', '🤦', '🤷', '👮', '🕵️', '💂', '👷', '🤴', '👸', '👳', '👲'],
        nature: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇'],
        food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔'],
        activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️'],
        travel: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '🛺', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞'],
        objects: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️'],
        symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐'],
        flags: ['🏁', '��', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️', '🇦🇫', '🇦🇽', '🇦🇱', '🇩🇿', '🇦🇸', '🇦🇩', '🇦🇴', '🇦🇮', '🇦🇶', '🇦🇬', '🇦🇷', '🇦🇲', '🇦🇼', '🇦🇺', '🇦🇹', '🇦🇿', '🇧🇸', '🇧🇭', '🇧🇩', '🇧🇧', '🇧🇾']
    };
    
    const categoryEmojis = emojis[category] || emojis.recent;
    
    categoryEmojis.forEach((emoji, index) => {
        const emojiBtn = document.createElement('button');
        emojiBtn.className = 'emoji-item';
        emojiBtn.textContent = emoji;
        emojiBtn.style.opacity = '0';
        emojiBtn.style.transform = 'scale(0.8)';
        
        emojiBtn.addEventListener('click', () => insertEmoji(emoji));
        emojiGrid.appendChild(emojiBtn);
        
        // Staggered animation for emoji items
        setTimeout(() => {
            emojiBtn.style.transition = 'all 0.3s ease';
            emojiBtn.style.opacity = '1';
            emojiBtn.style.transform = 'scale(1)';
        }, index * 20);
    });
}

function insertEmoji(emoji) {
    const messageInput = document.getElementById('messageInput');
    const cursorPos = messageInput.selectionStart;
    const textBefore = messageInput.value.substring(0, cursorPos);
    const textAfter = messageInput.value.substring(cursorPos);
    
    messageInput.value = textBefore + emoji + textAfter;
    messageInput.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
    messageInput.focus();
    
    handleMessageInput();
    
    // Add emoji insertion animation
    messageInput.style.transform = 'scale(1.05)';
    setTimeout(() => {
        messageInput.style.transform = 'scale(1)';
    }, 200);
}

function handleEmojiCategory(e) {
    const category = e.currentTarget.dataset.category;
    
    // Update active category
    document.querySelectorAll('.emoji-category').forEach(cat => cat.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    // Render emojis for selected category
    renderEmojis(category);
}

function handleAttachmentOption(e) {
    const type = e.currentTarget.dataset.type;
    
    switch (type) {
        case 'image':
            triggerFileInput('image/*');
            break;
        case 'document':
            triggerFileInput('.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx');
            break;
    }
    
    hideAttachmentOptions();
}

function triggerFileInput(accept) {
    const fileInput = document.getElementById('fileInput');
    fileInput.accept = accept;
    fileInput.click();
    
    fileInput.onchange = function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                sendImageMessage(file);
            } else {
                sendFileMessage(file);
            }
        });
        // Reset file input
        fileInput.value = '';
    };
}

function sendImageMessage(file) {
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        showToast('حجم الصورة كبير جداً. الحد الأقصى 5 ميجابايت', 'error');
        return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showToast('نوع الملف غير مدعوم. يرجى اختيار صورة', 'error');
        return;
    }

    // Show upload progress
    const progressToast = showUploadProgress(file.name, 'image');

    const reader = new FileReader();
    reader.onload = function(e) {
        const newMessage = {
            id: ++chatState.lastMessageId,
            senderId: 'current_user',
            imageUrl: e.target.result,
            fileName: file.name,
            fileSize: file.size,
            timestamp: new Date(),
            status: 'sending',
            type: 'image'
        };
        
        messages.push(newMessage);
        renderMessages();
        scrollToBottom();
        
        // Update progress to complete
        updateUploadProgress(progressToast, 100);
        
        setTimeout(() => {
            hideUploadProgress(progressToast);
            showToast(`تم إرسال الصورة: ${file.name}`, 'success');
        }, 500);
        
        setTimeout(() => {
            updateMessageStatus(newMessage.id, 'sent');
        }, 800);
        
        setTimeout(() => {
            updateMessageStatus(newMessage.id, 'delivered');
        }, 2000);
        
        setTimeout(() => {
            updateMessageStatus(newMessage.id, 'read');
        }, 4000);
    };

    reader.onprogress = function(e) {
        if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100;
            updateUploadProgress(progressToast, progress);
        }
    };

    reader.readAsDataURL(file);
}

function sendFileMessage(file) {
    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        showToast('حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت', 'error');
        return;
    }

    // Validate file type
    const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/zip',
        'application/x-rar-compressed'
    ];
    
    if (!validTypes.includes(file.type)) {
        showToast('نوع الملف غير مدعوم. يرجى اختيار ملف صالح', 'error');
        return;
    }

    // Show upload progress
    const progressToast = showUploadProgress(file.name, 'file');

    const newMessage = {
        id: ++chatState.lastMessageId,
        senderId: 'current_user',
        fileName: file.name,
        fileSize: file.size,
        fileUrl: URL.createObjectURL(file),
        fileType: file.type,
        timestamp: new Date(),
        status: 'sending',
        type: 'file'
    };
    
    messages.push(newMessage);
    renderMessages();
    scrollToBottom();
    
    // Simulate upload progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            updateUploadProgress(progressToast, 100);
            setTimeout(() => {
                hideUploadProgress(progressToast);
                showToast(`تم إرسال الملف: ${file.name}`, 'success');
            }, 500);
        } else {
            updateUploadProgress(progressToast, progress);
        }
    }, 200);
    
    setTimeout(() => {
        updateMessageStatus(newMessage.id, 'sent');
    }, 1200);
    
    setTimeout(() => {
        updateMessageStatus(newMessage.id, 'delivered');
    }, 2500);
    
    setTimeout(() => {
        updateMessageStatus(newMessage.id, 'read');
    }, 4500);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.transition = 'all 0.3s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);
}

function showUploadProgress(fileName, type) {
    const toast = document.createElement('div');
    toast.className = 'toast upload-progress';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'image' ? 'image' : 'file'}"></i>
            <div class="upload-info">
                <span class="upload-filename">${fileName}</span>
                <span class="upload-status">جاري الرفع...</span>
            </div>
        </div>
        <div class="upload-progress-bar">
            <div class="upload-progress-fill" style="width: 0%"></div>
        </div>
    `;
    
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    return toast;
}

function updateUploadProgress(toast, progress) {
    const progressFill = toast.querySelector('.upload-progress-fill');
    const status = toast.querySelector('.upload-status');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (status) {
        if (progress >= 100) {
            status.textContent = 'تم الرفع بنجاح';
        } else {
            status.textContent = `جاري الرفع... ${Math.round(progress)}%`;
        }
    }
}

function hideUploadProgress(toast) {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 300);
}

// Navigation functions
function goBackToMessages() {
    // Check if there are unsaved messages
    const messageInput = document.getElementById('messageInput');
    const hasUnsavedText = messageInput.value.trim().length > 0;
    
    if (hasUnsavedText) {
        if (confirm('لديك رسالة غير مكتملة. هل تريد المغادرة بدون حفظ؟')) {
            navigateToMessages();
        }
    } else {
        navigateToMessages();
    }
}

function navigateToMessages() {
    window.location.href = '../messages/messages.html';
}

function viewUserProfileFromChat() {
    // Only navigate to profile for individual users, not new/group chats
    if (chatUser.id === 'new_chat' || chatUser.id === 'group_chat') {
        showToast('لا يمكن عرض الملف الشخصي للمحادثات الجديدة', 'warning');
        return;
    }
    
    // Navigate to user profile page with user ID
    const userProfileUrl = `../user-profile/user-profile.html?user=${chatUser.id}&name=${encodeURIComponent(chatUser.name)}`;
    window.location.href = userProfileUrl;
}

function clearChat() {
    if (confirm('هل أنت متأكد من حذف جميع الرسائل؟')) {
        messages.length = 0;
        renderMessages();
        showToast('تم حذف جميع الرسائل', 'success');
    }
}

// Utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileIconClass(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    const iconMap = {
        'pdf': 'fa-file-pdf',
        'doc': 'fa-file-word',
        'docx': 'fa-file-word',
        'xls': 'fa-file-excel',
        'xlsx': 'fa-file-excel',
        'ppt': 'fa-file-powerpoint',
        'pptx': 'fa-file-powerpoint',
        'zip': 'fa-file-archive',
        'rar': 'fa-file-archive',
        'mp3': 'fa-file-audio',
        'wav': 'fa-file-audio',
        'mp4': 'fa-file-video',
        'avi': 'fa-file-video',
        'jpg': 'fa-file-image',
        'jpeg': 'fa-file-image',
        'png': 'fa-file-image',
        'gif': 'fa-file-image',
        'txt': 'fa-file-alt'
    };
    return iconMap[extension] || 'fa-file';
}

function openImageModal(imageUrl) {
    // Create modal for image preview
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-overlay">
            <div class="image-modal-content">
                <button class="image-modal-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
                <img src="${imageUrl}" alt="صورة" class="image-modal-image">
                <div class="image-modal-actions">
                    <button class="image-modal-btn" onclick="downloadFile('${imageUrl}', 'image.png')">
                        <i class="fas fa-download"></i> تحميل
                    </button>
                    <button class="image-modal-btn" onclick="window.open('${imageUrl}', '_blank')">
                        <i class="fas fa-external-link-alt"></i> فتح في نافذة جديدة
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function closeModal(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeModal);
        }
    });
}

function downloadFile(fileUrl, fileName) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
    
    showToast(`تم بدء تحميل: ${fileName}`, 'success');
}

// Export functions for global access
window.viewUserProfileFromChat = viewUserProfileFromChat;
window.goBackToMessages = goBackToMessages;
window.navigateToMessages = navigateToMessages;
window.clearChat = clearChat;
window.openImageModal = openImageModal;
window.downloadFile = downloadFile;
