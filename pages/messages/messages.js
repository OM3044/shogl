// Enhanced Messages and Notifications JavaScript
class MessagesManager {
    constructor() {
        // Dynamic baseURL property - defaults to '/' for web servers and uses location.href.replace(/[^\/]*$/, '') for local file:// paths
        this.baseURL = '/'; // Default for web servers
        if (location.protocol === 'file:') {
            this.baseURL = location.href.replace(/[^\/]*$/, '');
        }
        
        // Initialize all data properties with default values to prevent undefined errors
        this.usersData = [];
        this.messagesData = [];
        this.notificationsData = [];
        
        // Initialize filter and search properties
        this.currentFilter = 'all';
        this.currentNotificationFilter = 'all';
        this.currentUserFilter = 'all';
        this.searchTerm = '';
        this.userSearchTerm = '';
        
        // Initialize state properties
        this.isLoading = false;
        this.typingUsers = new Set();
        this.scheduledMessages = [];
        this.lastActivity = Date.now();
        this.autoRefreshInterval = null;
        this.notificationSound = null;
        
        // Initialize the manager
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.setupAutoRefresh();
        this.setupNotificationSound();
        this.renderUsers();
        this.renderMessages();
        this.renderNotifications();
        this.updateBadges();
        this.startRealTimeUpdates();
        this.createParticles();
        this.setupIntersectionObserver();
        this.checkForUpdates();
    }

    // Load sample data
    loadData() {
        this.usersData = [
            {
                id: 1,
                name: 'أحمد محمد',
                status: 'متصل الآن',
                location: 'الرياض، السعودية',
                avatar: 'أح',
                online: true,
                type: 'local',
                lastSeen: 'الآن',
                unreadMessages: 3,
                isVerified: true,
                userType: 'verified',
                joinDate: '2023-01-15',
                projectsCount: 25,
                rating: 4.8,
                specializations: ['تطوير الويب', 'React', 'Node.js'],
                languages: ['العربية', 'الإنجليزية'],
                timezone: 'GMT+3'
            },
            {
                id: 2,
                name: 'فاطمة علي',
                status: 'آخر ظهور منذ 15 دقيقة',
                location: 'القاهرة، مصر',
                avatar: 'فع',
                online: false,
                type: 'international',
                lastSeen: 'منذ 15 دقيقة',
                unreadMessages: 1,
                isVerified: true,
                userType: 'verified',
                joinDate: '2023-03-20',
                projectsCount: 18,
                rating: 4.6,
                specializations: ['تصميم UI/UX', 'Figma', 'Adobe XD'],
                languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
                timezone: 'GMT+2'
            },
            {
                id: 3,
                name: 'محمد حسن',
                status: 'متصل الآن',
                location: 'جدة، السعودية',
                avatar: 'مح',
                online: true,
                type: 'local',
                lastSeen: 'الآن',
                unreadMessages: 0,
                isVerified: true,
                userType: 'verified',
                joinDate: '2022-11-10',
                projectsCount: 42,
                rating: 4.9,
                specializations: ['تطوير الموبايل', 'Flutter', 'Firebase'],
                languages: ['العربية', 'الإنجليزية'],
                timezone: 'GMT+3'
            },
            {
                id: 4,
                name: 'سارة أحمد',
                status: 'آخر ظهور منذ 3 ساعات',
                location: 'دبي، الإمارات',
                avatar: 'سأ',
                online: false,
                type: 'international',
                lastSeen: 'منذ 3 ساعات',
                unreadMessages: 2,
                isVerified: false,
                userType: 'new',
                joinDate: '2024-01-05',
                projectsCount: 3,
                rating: 4.2,
                specializations: ['تطوير الويب', 'Vue.js', 'CSS'],
                languages: ['العربية', 'الإنجليزية'],
                timezone: 'GMT+4'
            },
            {
                id: 5,
                name: 'علي محمود',
                status: 'متصل الآن',
                location: 'الدمام، السعودية',
                avatar: 'عم',
                online: true,
                type: 'local',
                lastSeen: 'الآن',
                unreadMessages: 0,
                isVerified: true,
                userType: 'verified',
                joinDate: '2023-06-15',
                projectsCount: 31,
                rating: 4.7,
                specializations: ['DevOps', 'Docker', 'AWS'],
                languages: ['العربية', 'الإنجليزية'],
                timezone: 'GMT+3'
            },
            {
                id: 6,
                name: 'نور الدين',
                status: 'آخر ظهور منذ ساعة',
                location: 'المنصورة، مصر',
                avatar: 'ند',
                online: false,
                type: 'local',
                lastSeen: 'منذ ساعة',
                unreadMessages: 1,
                isVerified: false,
                userType: 'regular',
                joinDate: '2023-09-20',
                projectsCount: 12,
                rating: 4.4,
                specializations: ['تصميم الجرافيك', 'Photoshop', 'Illustrator'],
                languages: ['العربية', 'الإنجليزية'],
                timezone: 'GMT+2'
            }
        ];

        this.messagesData = [
            {
                id: 1,
                name: 'أحمد محمد',
                avatar: 'أح',
                lastMessage: 'مرحباً! هل يمكنني مساعدتك في المشروع الجديد؟',
                time: 'الآن',
                unread: 3,
                online: true,
                status: 'online',
                isVirtual: false,
                category: 'work',
                priority: 'high',
                messageType: 'text',
                isTyping: false,
                lastMessageTime: '2024-01-15T10:30:00Z',
                unreadCount: 3,
                isPinned: false,
                isBlocked: false,
                mutualConnections: 5,
                projectContext: 'تطوير تطبيق الموبايل',
                responseTime: '5 دقيقة',
                userInfo: {
                    isVerified: true,
                    userType: 'verified',
                    location: 'الرياض، السعودية',
                    specializations: ['تطوير الويب', 'React', 'Node.js'],
                    rating: 4.8,
                    projectsCount: 25
                }
            },
            {
                id: 2,
                name: 'فاطمة علي',
                avatar: 'فع',
                lastMessage: 'شكراً لك على المراجعة، سأقوم بالتعديلات المطلوبة',
                time: '5 دقيقة',
                unread: 1,
                online: false,
                status: 'offline',
                isVirtual: false,
                category: 'work',
                priority: 'medium',
                messageType: 'text',
                isTyping: false,
                lastMessageTime: '2024-01-15T10:25:00Z',
                unreadCount: 1,
                isPinned: true,
                isBlocked: false,
                mutualConnections: 3,
                projectContext: 'تصميم واجهة المستخدم',
                responseTime: '15 دقيقة',
                userInfo: {
                    isVerified: true,
                    userType: 'verified',
                    location: 'القاهرة، مصر',
                    specializations: ['تصميم UI/UX', 'Figma', 'Adobe XD'],
                    rating: 4.6,
                    projectsCount: 18
                }
            },
            {
                id: 3,
                name: 'محمد حسن',
                avatar: 'مح',
                lastMessage: 'تم إرسال الملفات المطلوبة في المرفقات',
                time: '10 دقيقة',
                unread: 0,
                online: true,
                status: 'online',
                isVirtual: false,
                category: 'work',
                priority: 'normal',
                messageType: 'file',
                isTyping: true,
                lastMessageTime: '2024-01-15T10:20:00Z',
                unreadCount: 0,
                isPinned: false,
                isBlocked: false,
                mutualConnections: 8,
                projectContext: 'تطوير قاعدة البيانات',
                responseTime: '2 دقيقة',
                userInfo: {
                    isVerified: true,
                    userType: 'verified',
                    location: 'جدة، السعودية',
                    specializations: ['تطوير الموبايل', 'Flutter', 'Firebase'],
                    rating: 4.9,
                    projectsCount: 42
                }
            },
            {
                id: 4,
                name: 'سارة أحمد',
                avatar: 'سأ',
                lastMessage: 'هل يمكننا الاجتماع غداً لمناقشة التفاصيل؟',
                time: '15 دقيقة',
                unread: 2,
                online: false,
                status: 'away',
                isVirtual: false,
                category: 'meeting',
                priority: 'high',
                messageType: 'text',
                isTyping: false,
                lastMessageTime: '2024-01-15T10:15:00Z',
                unreadCount: 2,
                isPinned: false,
                isBlocked: false,
                mutualConnections: 2,
                projectContext: 'اجتماع تخطيط المشروع',
                responseTime: '30 دقيقة',
                userInfo: {
                    isVerified: false,
                    userType: 'new',
                    location: 'دبي، الإمارات',
                    specializations: ['تطوير الويب', 'Vue.js', 'CSS'],
                    rating: 4.2,
                    projectsCount: 3
                }
            },
            {
                id: 5,
                name: 'علي محمود',
                avatar: 'عم',
                lastMessage: 'أحتاج مساعدة في حل مشكلة تقنية',
                time: 'أمس',
                unread: 0,
                online: true,
                status: 'online',
                isVirtual: false,
                category: 'support',
                priority: 'urgent',
                messageType: 'text',
                isTyping: false,
                lastMessageTime: '2024-01-14T16:45:00Z',
                unreadCount: 0,
                isPinned: true,
                isBlocked: false,
                mutualConnections: 4,
                projectContext: 'دعم تقني',
                responseTime: '1 ساعة',
                userInfo: {
                    isVerified: true,
                    userType: 'verified',
                    location: 'الدمام، السعودية',
                    specializations: ['DevOps', 'Docker', 'AWS'],
                    rating: 4.7,
                    projectsCount: 31
                }
            },
            {
                id: 6,
                name: 'نور الدين',
                avatar: 'ند',
                lastMessage: 'تم مراجعة المشروع بنجاح، ممتاز!',
                time: 'أمس',
                unread: 1,
                online: false,
                status: 'offline',
                isVirtual: false,
                category: 'feedback',
                priority: 'normal',
                messageType: 'text',
                isTyping: false,
                lastMessageTime: '2024-01-14T14:30:00Z',
                unreadCount: 1,
                isPinned: false,
                isBlocked: false,
                mutualConnections: 6,
                projectContext: 'مراجعة مشروع التصميم',
                responseTime: '3 ساعات'
            },
            {
                id: 7,
                name: 'ليلى محمود',
                avatar: 'لم',
                lastMessage: 'هل يمكنني الانضمام للمشروع؟',
                time: '2 يوم',
                unread: 0,
                online: true,
                status: 'online',
                isVirtual: false,
                category: 'collaboration',
                priority: 'medium',
                messageType: 'text',
                isTyping: false,
                lastMessageTime: '2024-01-13T11:20:00Z',
                unreadCount: 0,
                isPinned: false,
                isBlocked: false,
                mutualConnections: 7,
                projectContext: 'طلب انضمام للمشروع',
                responseTime: '1 يوم'
            },
            {
                id: 8,
                name: 'عمر خالد',
                avatar: 'عخ',
                lastMessage: 'سأرسل لك التقرير النهائي',
                time: '2 يوم',
                unread: 2,
                online: false,
                status: 'away',
                isVirtual: false,
                category: 'work',
                priority: 'normal',
                messageType: 'text',
                isTyping: false,
                lastMessageTime: '2024-01-13T09:15:00Z',
                unreadCount: 2,
                isPinned: false,
                isBlocked: false,
                mutualConnections: 3,
                projectContext: 'تقرير المشروع النهائي',
                responseTime: '2 يوم'
            },
            {
                id: 9,
                name: 'مريم سعيد',
                avatar: 'مس',
                lastMessage: 'ممتاز! العمل رائع جداً',
                time: '3 يوم',
                unread: 0,
                online: true,
                status: 'online',
                isVirtual: false,
                category: 'feedback',
                priority: 'normal',
                messageType: 'text',
                isTyping: false,
                lastMessageTime: '2024-01-12T16:40:00Z',
                unreadCount: 0,
                isPinned: false,
                isBlocked: false,
                mutualConnections: 9,
                projectContext: 'تقييم العمل المنجز',
                responseTime: '4 ساعات'
            },
            {
                id: 10,
                name: 'يوسف أحمد',
                avatar: 'يأ',
                lastMessage: 'هل يمكننا مناقشة التفاصيل؟',
                time: '3 يوم',
                unread: 1,
                online: false,
                status: 'offline',
                isVirtual: false,
                category: 'discussion',
                priority: 'medium',
                messageType: 'text',
                isTyping: false,
                lastMessageTime: '2024-01-12T14:20:00Z',
                unreadCount: 1,
                isPinned: false,
                isBlocked: false,
                mutualConnections: 5,
                projectContext: 'مناقشة تفاصيل المشروع',
                responseTime: '6 ساعات'
            },
            // Virtual Users with enhanced data
            {
                id: 21,
                name: 'أليكس تشين',
                avatar: 'أت',
                lastMessage: 'مرحباً! أنا مطور من الصين، هل يمكنني التعاون معك؟',
                time: 'الآن',
                unread: 1,
                online: true,
                status: 'online',
                isVirtual: true,
                category: 'international',
                priority: 'high',
                messageType: 'text',
                isTyping: false,
                lastMessageTime: '2024-01-15T10:35:00Z',
                unreadCount: 1,
                isPinned: false,
                isBlocked: false,
                mutualConnections: 2,
                projectContext: 'تعاون دولي',
                responseTime: '1 دقيقة',
                country: 'الصين',
                language: 'الصينية والإنجليزية',
                timezone: 'UTC+8'
            },
            {
                id: 22,
                name: 'سارة جونسون',
                avatar: 'سج',
                lastMessage: 'Hi! I\'m a designer from USA, interested in your project',
                time: '5 دقيقة',
                unread: 0,
                online: true,
                status: 'online',
                isVirtual: true,
                category: 'international',
                priority: 'medium',
                messageType: 'text',
                isTyping: false,
                lastMessageTime: '2024-01-15T10:25:00Z',
                unreadCount: 0,
                isPinned: false,
                isBlocked: false,
                mutualConnections: 1,
                projectContext: 'تصميم دولي',
                responseTime: '10 دقيقة',
                country: 'الولايات المتحدة',
                language: 'الإنجليزية',
                timezone: 'UTC-5'
            }
        ];

        this.notificationsData = [
    {
        id: 1,
                type: 'message',
                title: 'رسالة جديدة',
                message: 'أحمد محمد أرسل لك رسالة جديدة',
                time: '2 دقيقة',
        unread: true,
                actions: ['reply', 'view'],
                isVirtual: false
    },
    {
        id: 2,
                type: 'like',
                title: 'إعجاب جديد',
                message: 'فاطمة علي أعجبت بمشروعك',
        time: '15 دقيقة',
        unread: true,
                actions: ['view'],
                isVirtual: false
    },
    {
        id: 3,
                type: 'comment',
                title: 'تعليق جديد',
                message: 'محمد حسن علق على منشورك',
                time: '1 ساعة',
        unread: false,
                actions: ['reply', 'view'],
                isVirtual: false
    },
    {
        id: 4,
                type: 'follow',
                title: 'متابع جديد',
                message: 'سارة أحمد تتابعك الآن',
                time: '3 ساعات',
        unread: true,
                actions: ['follow_back', 'view'],
                isVirtual: false
    },
    {
        id: 5,
                type: 'project',
                title: 'مشروع جديد',
                message: 'تم إنشاء مشروع جديد في مجالك',
                time: 'أمس',
        unread: false,
                actions: ['view'],
                isVirtual: false
    },
    {
        id: 6,
                type: 'system',
                title: 'تحديث النظام',
                message: 'تم تحديث النظام بنجاح',
                time: '2 يوم',
                unread: false,
                actions: ['view'],
                isVirtual: false
    },
    {
        id: 7,
                type: 'like',
                title: 'إعجاب جديد',
                message: 'علي محمود أعجب بتصميمك الجديد',
        time: 'أمس',
                unread: true,
                actions: ['view'],
                isVirtual: false
    },
    {
        id: 8,
                type: 'comment',
                title: 'تعليق جديد',
                message: 'نور الدين علق على مشروعك "تطبيق الجوال"',
                time: 'أمس',
                unread: false,
                actions: ['reply', 'view'],
                isVirtual: false
            },
            {
                id: 9,
                type: 'follow',
                title: 'متابع جديد',
                message: 'ليلى محمود تتابعك الآن',
                time: '2 يوم',
                unread: true,
                actions: ['follow_back', 'view'],
                isVirtual: false
            },
            {
                id: 10,
                type: 'project',
                title: 'مشروع مقبول',
                message: 'تم قبول مشروعك "موقع الشركة" بنجاح',
                time: '2 يوم',
                unread: false,
                actions: ['view'],
                isVirtual: false
            },
            {
                id: 11,
                type: 'message',
                title: 'رسالة جديدة',
                message: 'عمر خالد أرسل لك رسالة جديدة',
                time: '3 يوم',
                unread: false,
                actions: ['reply', 'view'],
                isVirtual: false
            },
            {
                id: 12,
                type: 'post',
                title: 'اشعارات المنشورات',
                message: 'أحمد محمد نشر منشور جديد في مجالك',
                time: 'ساعة',
                unread: true,
                actions: ['view', 'like'],
                isVirtual: false,
                postId: 'post_1'
            },
            {
                id: 13,
                type: 'post',
                title: 'اشعارات المنشورات',
                message: 'فاطمة علي نشرت منشور جديد عن تطوير الويب',
                time: '3 ساعات',
                unread: true,
                actions: ['view', 'comment'],
                isVirtual: false,
                postId: 'post_2'
            },
            {
                id: 14,
                type: 'post',
                title: 'اشعارات المنشورات',
                message: 'محمد حسن نشر منشور جديد عن التصميم',
                time: 'أمس',
                unread: false,
                actions: ['view', 'share'],
                isVirtual: false,
                postId: 'post_3'
            },
            {
                id: 15,
                type: 'post',
                title: 'اشعارات المنشورات',
                message: 'سارة أحمد نشرت منشور جديد عن البرمجة',
                time: '2 يوم',
                unread: false,
                actions: ['view'],
                isVirtual: false,
                postId: 'post_4'
            },
            {
                id: 16,
                type: 'like',
                title: 'إعجاب جديد',
                message: 'مريم سعيد أعجبت بمنشورك الأخير',
                time: '3 يوم',
                unread: false,
                actions: ['view'],
                isVirtual: false
            },
            {
                id: 17,
                type: 'comment',
                title: 'تعليق جديد',
                message: 'يوسف أحمد علق على تصميمك',
                time: '4 يوم',
                unread: true,
                actions: ['reply', 'view'],
                isVirtual: false
            },
            {
                id: 18,
                type: 'follow',
                title: 'متابع جديد',
                message: 'زينب علي تتابعك الآن',
                time: '4 يوم',
                unread: false,
                actions: ['follow_back', 'view'],
                isVirtual: false
            },
            {
                id: 19,
                type: 'project',
                title: 'مشروع جديد متاح',
                message: 'مشروع "تطوير تطبيق" متاح الآن',
                time: '4 يوم',
                unread: true,
                actions: ['view'],
                isVirtual: false
            },
            {
                id: 20,
                type: 'system',
                title: 'تحديث الأمان',
                message: 'تم تحديث إعدادات الأمان لحسابك',
                time: '5 يوم',
                unread: false,
                actions: ['view'],
                isVirtual: false
            },
            {
                id: 21,
                type: 'like',
                title: 'إعجاب جديد',
                message: 'كريم محمد أعجب بمشروعك',
                time: '5 يوم',
                unread: true,
                actions: ['view'],
                isVirtual: false
            },
            {
                id: 22,
                type: 'comment',
                title: 'تعليق جديد',
                message: 'رنا حسن علق على منشورك',
                time: 'أسبوع',
                unread: false,
                actions: ['reply', 'view'],
                isVirtual: false
            },
            {
                id: 23,
                type: 'follow',
                title: 'متابع جديد',
                message: 'طارق محمود يتابعك الآن',
                time: 'أسبوع',
                unread: true,
                actions: ['follow_back', 'view'],
                isVirtual: false
            },
            {
                id: 24,
                type: 'project',
                title: 'مشروع مكتمل',
                message: 'تم إكمال مشروعك "تصميم الشعار"',
                time: 'أسبوع',
                unread: false,
                actions: ['view'],
                isVirtual: false
            },
            {
                id: 21,
                type: 'message',
                title: 'رسالة جديدة',
                message: 'هند سليمان أرسلت لك رسالة جديدة',
                time: 'أسبوع',
                unread: true,
                actions: ['reply', 'view'],
                isVirtual: false
            },
            {
                id: 22,
                type: 'like',
                title: 'إعجاب جديد',
                message: 'باسم عبدالله أعجب بتصميمك',
                time: 'أسبوعين',
                unread: false,
                actions: ['view'],
                isVirtual: false
            },
            {
                id: 23,
                type: 'comment',
                title: 'تعليق جديد',
                message: 'دينا أحمد علقت على مشروعك',
                time: 'أسبوعين',
                unread: true,
                actions: ['reply', 'view'],
                isVirtual: false
            },
            {
                id: 24,
                type: 'follow',
                title: 'متابع جديد',
                message: 'سامر محمد يتابعك الآن',
                time: 'أسبوعين',
                unread: false,
                actions: ['follow_back', 'view'],
                isVirtual: false
            },
            {
                id: 25,
                type: 'project',
                title: 'مشروع جديد',
                message: 'مشروع "تطوير موقع" متاح للعمل عليه',
                time: 'أسبوعين',
                unread: true,
                actions: ['view'],
                isVirtual: false
            },
            {
                id: 26,
                type: 'system',
                title: 'تحديث الملف الشخصي',
                message: 'تم تحديث معلومات ملفك الشخصي',
                time: 'أسبوعين',
                unread: false,
                actions: ['view'],
                isVirtual: false
            },
            {
                id: 27,
                type: 'like',
                title: 'إعجاب جديد',
                message: 'نادية علي أعجبت بمنشورك',
                time: '3 أسابيع',
                unread: false,
                actions: ['view'],
                isVirtual: false
            },
            {
                id: 28,
                type: 'comment',
                title: 'تعليق جديد',
                message: 'أيمن خالد علق على تصميمك الجديد',
                time: '3 أسابيع',
                unread: true,
                actions: ['reply', 'view'],
                isVirtual: false
            },
            {
                id: 29,
                type: 'follow',
                title: 'متابع جديد',
                message: 'أحمد محمد يتابعك الآن',
                time: '3 أسابيع',
                unread: false,
                actions: ['follow_back', 'view'],
                isVirtual: false
            },
            {
                id: 30,
                type: 'project',
                title: 'مشروع مكتمل',
                message: 'تم إكمال مشروعك "تطوير التطبيق" بنجاح',
                time: '3 أسابيع',
                unread: false,
                actions: ['view'],
                isVirtual: false
            },
            // Virtual Notifications
            {
                id: 31,
                type: 'post',
                title: 'منشور جديد في المجتمع',
                message: 'أليكس تشين نشر منشور جديد عن "تطوير الذكاء الاصطناعي"',
                time: 'الآن',
                unread: true,
                actions: ['view_community'],
                isVirtual: true,
                postId: 'ai_development_001',
                communityLink: 'social.html?post=ai_development_001'
            },
            {
                id: 32,
                type: 'post',
                title: 'منشور جديد في المجتمع',
                message: 'سارة جونسون شاركت تصميم جديد في "تصميم واجهات المستخدم"',
                time: '10 دقيقة',
                unread: true,
                actions: ['view_community'],
                isVirtual: true,
                postId: 'ui_design_002',
                communityLink: 'social.html?post=ui_design_002'
            },
            {
                id: 33,
                type: 'post',
                title: 'منشور جديد في المجتمع',
                message: 'محمد رحيم نشر مقال عن "أفضل ممارسات البرمجة"',
                time: '30 دقيقة',
                unread: false,
                actions: ['view_community'],
                isVirtual: true,
                postId: 'programming_best_practices_003',
                communityLink: 'social.html?post=programming_best_practices_003'
            },
            {
                id: 34,
                type: 'post',
                title: 'منشور جديد في المجتمع',
                message: 'إيما ويلسون شاركت تجربتها في "تطوير تطبيقات الموبايل"',
                time: '1 ساعة',
                unread: true,
                actions: ['view_community'],
                isVirtual: true,
                postId: 'mobile_development_004',
                communityLink: 'social.html?post=mobile_development_004'
            },
            {
                id: 35,
                type: 'post',
                title: 'منشور جديد في المجتمع',
                message: 'كارلوس رودريغيز نشر منشور عن "أمن المعلومات"',
                time: '2 ساعة',
                unread: false,
                actions: ['view_community'],
                isVirtual: true,
                postId: 'cybersecurity_005',
                communityLink: 'social.html?post=cybersecurity_005'
            },
            {
                id: 36,
                type: 'like',
                title: 'إعجاب من مستخدم دولي',
                message: 'أليكس تشين أعجب بمنشورك عن "تطوير الويب"',
                time: '3 ساعة',
                unread: true,
                actions: ['view_community'],
                isVirtual: true,
                postId: 'web_development_006',
                communityLink: 'social.html?post=web_development_006'
            },
            {
                id: 37,
                type: 'comment',
                title: 'تعليق من مستخدم دولي',
                message: 'سارة جونسون علقت على منشورك "تصميم الشعارات"',
                time: '4 ساعة',
                unread: false,
                actions: ['reply', 'view_community'],
                isVirtual: true,
                postId: 'logo_design_007',
                communityLink: 'social.html?post=logo_design_007'
            },
            {
                id: 38,
                type: 'follow',
                title: 'متابع دولي جديد',
                message: 'محمد رحيم يتابعك الآن من باكستان',
                time: '5 ساعة',
                unread: true,
                actions: ['follow_back', 'view'],
                isVirtual: true
            },
            {
                id: 39,
                type: 'post',
                title: 'منشور جديد في المجتمع',
                message: 'إيما ويلسون نشرت عن "تصميم تجربة المستخدم"',
                time: '6 ساعة',
                unread: true,
                actions: ['view_community'],
                isVirtual: true,
                postId: 'ux_design_008',
                communityLink: 'social.html?post=ux_design_008'
            },
            {
                id: 40,
                type: 'post',
                title: 'منشور جديد في المجتمع',
                message: 'كارلوس رودريغيز شارك مشروع "تطوير قاعدة البيانات"',
        time: 'أمس',
        unread: false,
                actions: ['view_community'],
                isVirtual: true,
                postId: 'database_development_009',
                communityLink: 'social.html?post=database_development_009'
            }
        ];
    }

    // Setup event listeners
    setupEventListeners() {
        // Search functionality with debouncing
        const messagesSearch = document.getElementById('messagesSearch');
        const notificationsSearch = document.getElementById('notificationsSearch');
        const usersSearch = document.getElementById('usersSearch');

        if (messagesSearch) {
            messagesSearch.addEventListener('input', this.debounce((e) => {
                this.searchTerm = e.target.value;
                this.renderMessages();
            }, 300));
        }

        if (notificationsSearch) {
            notificationsSearch.addEventListener('input', this.debounce((e) => {
                this.searchTerm = e.target.value;
                this.renderNotifications();
            }, 300));
        }

        if (usersSearch) {
            usersSearch.addEventListener('input', this.debounce((e) => {
                this.userSearchTerm = e.target.value;
                this.renderUsers();
            }, 300));
        }

        // Activity tracking
        document.addEventListener('mousemove', () => this.updateLastActivity());
        document.addEventListener('keypress', () => this.updateLastActivity());
        document.addEventListener('click', () => this.updateLastActivity());

        // Visibility change handling
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoRefresh();
            } else {
                this.resumeAutoRefresh();
                this.checkForUpdates();
            }
        });

        // Window focus handling
        window.addEventListener('focus', () => {
            this.checkForUpdates();
            this.updateBadges();
        });
    }

    // Setup keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'k':
                        e.preventDefault();
                        document.getElementById('messagesSearch')?.focus();
                        break;
                    case 'n':
                        e.preventDefault();
                        document.getElementById('notificationsSearch')?.focus();
                        break;
                    case 'u':
                        e.preventDefault();
                        document.getElementById('usersSearch')?.focus();
                        break;
                }
            } else if (e.key === 'Escape') {
                this.closeAllPanels();
            }
        });
    }

    // Close all panels and modals
    closeAllPanels() {
        // Close any open modals or panels
        const modals = document.querySelectorAll('.modal, .options-menu, .options-overlay');
        modals.forEach(modal => {
            if (modal.style.display !== 'none') {
                modal.style.display = 'none';
            }
        });
        
        // Clear any active states
        document.querySelectorAll('.active').forEach(element => {
            element.classList.remove('active');
        });
        
        // Hide any dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }

    // Setup auto refresh
    setupAutoRefresh() {
        this.autoRefreshInterval = setInterval(() => {
            if (!document.hidden && Date.now() - this.lastActivity < 300000) { // 5 minutes
                this.checkForUpdates();
            }
        }, 30000); // Check every 30 seconds
    }

    // Setup notification sound
    setupNotificationSound() {
        try {
            this.notificationSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
        } catch (error) {
            console.log('Notification sound not supported');
        }
    }

    // Debounce function
    debounce(func, wait) {
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

    // Update last activity
    updateLastActivity() {
        this.lastActivity = Date.now();
    }

    // Pause auto refresh
    pauseAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
        }
    }

    // Resume auto refresh
    resumeAutoRefresh() {
        this.setupAutoRefresh();
    }



    // Setup intersection observer for scroll animations
    setupIntersectionObserver() {
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

        // Observe message and notification items
        document.querySelectorAll('.message-item, .notification-item').forEach(item => {
            observer.observe(item);
        });
    }

    // Check for updates
    checkForUpdates() {
        this.showLoading('جاري البحث عن التحديثات...', 'تحقق من وجود رسائل وإشعارات جديدة');
        
        // Simulate API call with progress
        this.simulateProgressiveLoading([
            { message: 'الاتصال بالخادم...', delay: 300 },
            { message: 'جاري تحميل الرسائل...', delay: 400 },
            { message: 'تحديث الإشعارات...', delay: 300 },
            { message: 'إنهاء التحميل...', delay: 200 }
        ]).then(() => {
            this.hideLoading();
            this.updateBadges();
        });
    }

    // Enhanced loading overlay with dynamic content
    showLoading(title = 'جاري التحميل', message = 'يرجى الانتظار بينما نقوم بتحميل المحتوى...') {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            // Update loading content
            const titleElement = overlay.querySelector('.loading-title');
            const messageElement = overlay.querySelector('.loading-message');
            
            if (titleElement) titleElement.textContent = title;
            if (messageElement) messageElement.textContent = message;
            
            overlay.classList.add('show');
            
            // Add entrance animation
            const container = overlay.querySelector('.loading-container');
            if (container) {
                container.style.animation = 'none';
                container.offsetHeight; // Trigger reflow
                container.style.animation = 'loadingContainerEntry 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }
        }
    }

    // Hide loading overlay with exit animation
    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            const container = overlay.querySelector('.loading-container');
            if (container) {
                container.style.animation = 'loadingContainerExit 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                setTimeout(() => {
                    overlay.classList.remove('show');
                }, 400);
            } else {
                overlay.classList.remove('show');
            }
        }
    }

    // Simulate progressive loading with dynamic messages
    async simulateProgressiveLoading(steps) {
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            this.updateLoadingMessage(step.message);
            await new Promise(resolve => setTimeout(resolve, step.delay));
        }
    }

    // Update loading message dynamically
    updateLoadingMessage(message) {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay && overlay.classList.contains('show')) {
            const messageElement = overlay.querySelector('.loading-message');
            if (messageElement) {
                messageElement.style.opacity = '0';
                setTimeout(() => {
                    messageElement.textContent = message;
                    messageElement.style.opacity = '1';
                }, 150);
            }
        }
    }

    // Show loading with custom spinner type
    showLoadingWithType(type = 'default', title, message) {
        this.showLoading(title, message);
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            const spinner = overlay.querySelector('.loading-spinner');
            if (spinner) {
                spinner.className = `loading-spinner ${type}`;
            }
        }
    }



    // Compose new message
    composeNewMessage() {
        this.showToast('جاري فتح نافذة الرسالة الجديدة...', 'info');
        setTimeout(() => {
            window.location.href = this.baseURL + '../chat/chat.html?new=true';
        }, 1000);
    }

    // Start group chat
    startGroupChat() {
        this.showToast('جاري إنشاء محادثة جماعية...', 'info');
        setTimeout(() => {
            window.location.href = this.baseURL + '../chat/chat.html?group=true';
        }, 1000);
    }

    // Schedule message
    scheduleMessage() {
        this.showToast('جاري فتح جدولة الرسائل...', 'info');
        // Implementation for scheduling messages
    }

    // Export messages
    exportMessages() {
        this.showLoading();
        setTimeout(() => {
            this.hideLoading();
            this.showToast('تم تصدير الرسائل بنجاح', 'success');
            // Implementation for exporting messages
        }, 2000);
    }

    // Open settings
    openSettings() {
        this.showToast('جاري فتح الإعدادات...', 'info');
        // Implementation for settings
    }



    // Open notification settings
    openNotificationSettings() {
        this.showToast('جاري فتح إعدادات الإشعارات...', 'info');
        // Implementation for notification settings
    }

    // Clear search functions
    clearUsersSearch() {
        const searchInput = document.getElementById('usersSearch');
        if (searchInput) {
            searchInput.value = '';
            this.userSearchTerm = '';
            this.renderUsers();
        }
    }

    clearMessagesSearch() {
        const searchInput = document.getElementById('messagesSearch');
        if (searchInput) {
            searchInput.value = '';
            this.searchTerm = '';
            this.renderMessages();
        }
    }

    clearNotificationsSearch() {
        const searchInput = document.getElementById('notificationsSearch');
        if (searchInput) {
            searchInput.value = '';
            this.searchTerm = '';
            this.renderNotifications();
        }
    }

    // Render messages with enhanced animations and improved information display
    renderMessages() {
        const messagesList = document.getElementById('messagesList');
        if (!messagesList) return;
        
        const filteredMessages = this.getFilteredMessages();
        
        if (filteredMessages.length === 0) {
            messagesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <h3>لا توجد رسائل</h3>
                    <p>${this.searchTerm ? 'لا توجد نتائج للبحث' : 'ابدأ محادثة جديدة'}</p>
                </div>
            `;
            return;
        }
        
        messagesList.innerHTML = filteredMessages.map((message, index) => `
            <div class="message-item ${message.isVirtual ? 'virtual-user' : ''} ${message.isPinned ? 'pinned' : ''} ${message.priority}" 
                 data-user-id="${message.id}" 
                 style="animation-delay: ${index * 0.1}s; opacity: 0; transform: translateY(20px);">
                
                <!-- Priority Indicator -->
                ${message.priority === 'urgent' ? '<div class="priority-indicator urgent" title="رسالة عاجلة"><i class="fas fa-exclamation-triangle"></i></div>' : ''}
                ${message.priority === 'high' ? '<div class="priority-indicator high" title="رسالة مهمة"><i class="fas fa-star"></i></div>' : ''}
                
                <!-- Pin Indicator -->
                ${message.isPinned ? '<div class="pin-indicator" title="رسالة مثبتة"><i class="fas fa-thumbtack"></i></div>' : ''}
                
                <div class="message-avatar ${message.userInfo?.isVerified ? 'verified' : ''}" style="background: ${this.getAvatarColor(message.name)};" onclick="messagesManager.viewUserProfile(${message.id})">
                    ${message.avatar}
                    <div class="online-indicator ${message.status}"></div>
                    ${message.isVirtual ? '<div class="virtual-badge" title="مستخدم دولي"><i class="fas fa-globe"></i></div>' : ''}
                </div>
                
                <div class="message-info">
                    <div class="message-header">
                        <div class="message-name-section">
                            <div class="user-info-container">
                                <div class="user-name-container">
                                    <span class="message-name ${message.userInfo?.isVerified ? 'verified' : ''} ${message.userInfo?.userType || ''}" onclick="messagesManager.viewUserProfile(${message.id})">
                                        ${message.name}
                                        ${message.isVirtual ? '<span class="virtual-indicator" title="مستخدم دولي">🌍</span>' : ''}
                                    </span>
                                    <div class="user-badges">
                                        ${message.userInfo?.userType === 'expert' ? '<span class="user-badge expert" title="خبير"><i class="fas fa-star"></i> خبير</span>' : ''}
                                        ${message.userInfo?.userType === 'premium' ? '<span class="user-badge premium" title="عضو مميز"><i class="fas fa-crown"></i> مميز</span>' : ''}
                                        ${message.userInfo?.userType === 'new' ? '<span class="user-badge new" title="عضو جديد"><i class="fas fa-seedling"></i> جديد</span>' : ''}
                                        ${message.isVirtual ? '<span class="user-badge international" title="مستخدم دولي"><i class="fas fa-globe"></i> دولي</span>' : ''}
                                    </div>
                                </div>
                                ${message.userInfo?.location ? `
                                    <div class="user-location">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span>${message.userInfo.location}</span>
                                    </div>
                                ` : ''}
                                <div class="user-status ${message.status}">
                                    <i class="fas fa-circle"></i>
                                    <span>${this.getStatusText(message.status)}</span>
                                </div>
                                ${message.userInfo?.joinDate ? `
                                    <div class="user-experience" title="تاريخ الانضمام">
                                        <i class="fas fa-calendar-alt"></i>
                                        <span>${this.getJoinDateText(message.userInfo.joinDate)}</span>
                                    </div>
                                ` : ''}
                            </div>
                            <div class="message-category">
                                <span class="category-badge ${message.category}">${this.getCategoryLabel(message.category)}</span>
                            </div>
                        </div>
                        <div class="message-time-section">
                            <span class="message-time">${message.time}</span>
                            ${message.messageType === 'file' ? '<i class="fas fa-paperclip" title="مرفق ملف"></i>' : ''}
                            ${message.messageType === 'image' ? '<i class="fas fa-image" title="صورة"></i>' : ''}
                        </div>
                    </div>
                    
                    <div class="message-preview" onclick="messagesManager.openChat(${message.id})">
                        ${message.lastMessage}
                        ${message.isTyping ? '<span class="typing-indicator">يكتب...</span>' : ''}
                    </div>
                    
                    <div class="message-meta">
                        <div class="meta-left">
                            ${message.unread > 0 ? `<span class="unread-badge">${message.unread}</span>` : ''}
                            ${message.online ? '<span class="online-status">متصل</span>' : ''}
                            ${message.isVirtual && message.country ? `<span class="country-badge">${message.country}</span>` : ''}
                            <span class="response-time" title="وقت الاستجابة المتوقع">${message.responseTime}</span>
                            ${message.userInfo?.rating ? `<span class="user-rating" title="التقييم"><i class="fas fa-star"></i> ${message.userInfo.rating}</span>` : ''}
                        </div>
                        <div class="meta-right">
                            <span class="mutual-connections" title="العلاقات المشتركة">
                                <i class="fas fa-users"></i> ${message.mutualConnections}
                            </span>
                            ${message.userInfo?.projectsCount ? `<span class="projects-count" title="عدد المشاريع"><i class="fas fa-briefcase"></i> ${message.userInfo.projectsCount}</span>` : ''}
                        </div>
                    </div>
                    
                    <!-- Project Context -->
                    ${message.projectContext ? `
                        <div class="project-context">
                            <i class="fas fa-project-diagram"></i>
                            <span>${message.projectContext}</span>
                        </div>
                    ` : ''}
                    
                    <!-- User Specializations -->
                    ${message.userInfo?.specializations ? `
                        <div class="user-specializations">
                            <i class="fas fa-tags"></i>
                            <div class="specialization-tags">
                                ${message.userInfo.specializations.slice(0, 3).map(spec => 
                                    `<span class="specialization-tag">${spec}</span>`
                                ).join('')}
                                ${message.userInfo.specializations.length > 3 ? 
                                    `<span class="specialization-tag more">+${message.userInfo.specializations.length - 3}</span>` : ''
                                }
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <!-- Quick Actions -->
                <div class="message-actions">
                    <button class="action-btn" onclick="messagesManager.replyToMessage(${message.id})" title="رد سريع">
                        <i class="fas fa-reply"></i>
                    </button>
                    <button class="action-btn" onclick="messagesManager.togglePinMessage(${message.id})" title="${message.isPinned ? 'إلغاء التثبيت' : 'تثبيت الرسالة'}">
                        <i class="fas fa-thumbtack"></i>
                    </button>

                    <button class="action-btn" onclick="messagesManager.showMessageOptions(${message.id})" title="المزيد">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </div>
                
                ${this.isTyping(message.id) ? this.renderTypingIndicator() : ''}
            </div>
        `).join('');

        // Add hover effects and animations
        this.addHoverEffects();
    }

    // Render notifications with enhanced animations
    renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;
    
        const filteredNotifications = this.getFilteredNotifications();
    
    if (filteredNotifications.length === 0) {
        notificationsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bell-slash"></i>
                <h3>لا توجد إشعارات</h3>
                    <p>${this.searchTerm ? 'لا توجد نتائج للبحث' : 'ستظهر الإشعارات الجديدة هنا'}</p>
            </div>
        `;
        return;
    }
    
    notificationsList.innerHTML = filteredNotifications.map((notification, index) => `
            <div class="notification-item ${notification.unread ? 'unread' : ''} ${notification.isVirtual ? 'virtual-notification' : ''}" 
             data-notification-id="${notification.id}"
                 style="animation-delay: ${index * 0.1}s; opacity: 0; transform: translateY(20px);">
            <div class="notification-icon ${notification.type}">
                    <i class="fas fa-${this.getNotificationIcon(notification.type)}"></i>
                    ${notification.isVirtual ? '<div class="virtual-badge" title="إشعار دولي"><i class="fas fa-globe"></i></div>' : ''}
            </div>
            <div class="notification-content">
                    <p ${notification.type === 'post' ? `onclick="messagesManager.viewPostNotification(${notification.id})" style="cursor: pointer;"` : ''}>
                        <strong>${notification.title}</strong> - ${notification.message}
                        ${notification.isVirtual ? '<span class="virtual-indicator" title="إشعار دولي">🌍</span>' : ''}
                        ${notification.type === 'post' ? '<i class="fas fa-external-link-alt" style="margin-right: 5px; color: #667eea;" title="انقر للانتقال إلى المنشور"></i>' : ''}
                    </p>
                <div class="notification-time">${notification.time}</div>
                <div class="notification-actions">
                        ${this.getNotificationActions(notification.actions, notification.id)}
                        <button class="notification-action-btn" onclick="messagesManager.markAsRead(${notification.id})">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="notification-action-btn" onclick="messagesManager.dismissNotification(${notification.id})">
                            <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

        // Add hover effects and animations
        this.addHoverEffects();
    }

    // Get filtered messages based on search and current filter
    getFilteredMessages() {
        let filtered = this.messagesData;

        // Apply search filter
        if (this.searchTerm) {
            filtered = filtered.filter(message => 
                message.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                message.lastMessage.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                message.projectContext?.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }

        // Apply type filter
        switch (this.currentFilter) {
            case 'unread':
                filtered = filtered.filter(message => message.unread > 0);
                break;
            case 'pinned':
                filtered = filtered.filter(message => message.isPinned);
                break;
            case 'urgent':
                filtered = filtered.filter(message => message.priority === 'urgent');
                break;
            case 'work':
                filtered = filtered.filter(message => message.category === 'work');
                break;
            case 'online':
                filtered = filtered.filter(message => message.online);
                break;
            case 'recent':
                filtered = filtered.sort((a, b) => this.getTimeValue(b.time) - this.getTimeValue(a.time));
                break;
        }

        // Sort by priority and pinned status
        filtered.sort((a, b) => {
            // Pinned messages first
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            
            // Then by priority
            const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'normal': 3 };
            const aPriority = priorityOrder[a.priority] || 3;
            const bPriority = priorityOrder[b.priority] || 3;
            
            if (aPriority !== bPriority) return aPriority - bPriority;
            
            // Then by unread count
            if (a.unread !== b.unread) return b.unread - a.unread;
            
            // Finally by time
            return this.getTimeValue(b.time) - this.getTimeValue(a.time);
        });

        return filtered;
    }

    // Get filtered notifications based on search and current filter
    getFilteredNotifications() {
        let filtered = this.notificationsData;

        // Apply search filter
        if (this.searchTerm) {
            filtered = filtered.filter(notification => 
                notification.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                notification.message.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }

        // Apply type filter
        switch (this.currentNotificationFilter) {
            case 'unread':
                filtered = filtered.filter(notification => notification.unread);
                break;
            case 'interactions':
                filtered = filtered.filter(notification => ['message', 'like', 'comment'].includes(notification.type));
                break;
            case 'messages':
                filtered = filtered.filter(notification => notification.type === 'message');
                break;
            case 'posts':
                filtered = filtered.filter(notification => notification.type === 'post');
                break;
            case 'system':
                filtered = filtered.filter(notification => notification.type === 'system');
                break;
        }

        return filtered;
    }

    // Get time value for sorting
    getTimeValue(time) {
        const timeMap = {
            'الآن': 0,
            '2 دقيقة': 2,
            '15 دقيقة': 15,
            '1 ساعة': 60,
            '3 ساعات': 180,
            'أمس': 1440,
            '2 يوم': 2880,
            '3 يوم': 4320,
            '4 يوم': 5760,
            '5 يوم': 7200,
            'أسبوع': 10080,
            'أسبوعين': 20160,
            '3 أسابيع': 30240
        };
        return timeMap[time] || 0;
    }

    // Get avatar color based on name
    getAvatarColor(name) {
        const colors = [
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #4facfe, #00f2fe)',
            'linear-gradient(135deg, #43e97b, #38f9d7)',
            'linear-gradient(135deg, #fa709a, #fee140)',
            'linear-gradient(135deg, #a8edea, #fed6e3)',
            'linear-gradient(135deg, #ff9a9e, #fecfef)',
            'linear-gradient(135deg, #ffecd2, #fcb69f)'
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    }

    // Get notification icon
    getNotificationIcon(type) {
        const icons = {
            message: 'envelope',
            like: 'heart',
            comment: 'comment',
            follow: 'user-plus',
            project: 'project-diagram',
            system: 'cog',
            post: 'newspaper'
        };
        return icons[type] || 'bell';
    }

    // Get category label
    getCategoryLabel(category) {
        const categoryMap = {
            'work': 'عمل',
            'meeting': 'اجتماع',
            'support': 'دعم',
            'feedback': 'تقييم',
            'collaboration': 'تعاون',
            'discussion': 'مناقشة',
            'international': 'دولي'
        };
        return categoryMap[category] || category;
    }

    // Get status text
    getStatusText(status) {
        const statusMap = {
            'online': 'متصل الآن',
            'away': 'غير متاح',
            'offline': 'غير متصل',
            'busy': 'مشغول',
            'dnd': 'لا تزعج'
        };
        return statusMap[status] || status;
    }

    // Get join date text
    getJoinDateText(joinDate) {
        const join = new Date(joinDate);
        const now = new Date();
        const diffTime = Math.abs(now - join);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 30) {
            return `جديد (${diffDays} يوم)`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} شهر`;
        } else {
            const years = Math.floor(diffDays / 365);
            return `${years} سنة`;
        }
    }

    // Get priority color
    getPriorityColor(priority) {
        const colorMap = {
            'urgent': '#ff6b6b',
            'high': '#ffa726',
            'medium': '#42a5f5',
            'normal': '#66bb6a'
        };
        return colorMap[priority] || '#66bb6a';
    }

    // Get notification actions
    getNotificationActions(actions, id) {
        const notification = this.notificationsData.find(n => n.id === id);
        const isVirtual = notification?.isVirtual || false;
        const communityLink = notification?.communityLink;
        
        const actionButtons = {
            reply: `<button class="notification-action-btn" onclick="messagesManager.replyToNotification(${id})">
                        <i class="fas fa-reply"></i> رد
                    </button>`,
            view: `<button class="notification-action-btn" onclick="messagesManager.viewNotification(${id})">
                        <i class="fas fa-eye"></i> عرض
                    </button>`,
            follow_back: `<button class="notification-action-btn accept" onclick="messagesManager.followBack(${id})">
                            <i class="fas fa-user-plus"></i> متابعة مرتدة
                        </button>`,
            view_community: `<button class="notification-action-btn community" onclick="messagesManager.viewCommunityPost(${id})">
                                <i class="fas fa-users"></i> عرض في المجتمع
                            </button>`,
            like: `<button class="notification-action-btn" onclick="messagesManager.likePost(${id})">
                        <i class="fas fa-heart"></i> إعجاب
                    </button>`,
            comment: `<button class="notification-action-btn" onclick="messagesManager.commentOnPost(${id})">
                        <i class="fas fa-comment"></i> تعليق
                    </button>`,
            share: `<button class="notification-action-btn" onclick="messagesManager.sharePost(${id})">
                        <i class="fas fa-share"></i> مشاركة
                    </button>`
        };

        return actions.map(action => actionButtons[action] || '').join('');
    }

    // Render typing indicator
    renderTypingIndicator() {
        return `
            <div class="typing-indicator">
                <span>يكتب...</span>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
    }

    // Check if user is typing
    isTyping(userId) {
        return this.typingUsers.has(userId);
    }

    // Add hover effects
    addHoverEffects() {
        document.querySelectorAll('.message-item, .notification-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.playHoverSound();
                item.style.transform = 'translateX(-8px) scale(1.02)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0) scale(1)';
            });
        });
    }

    // Play hover sound
    playHoverSound() {
        // Create a subtle hover sound effect
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // Open chat function
    openChat(userId) {
        this.playClickSound();
        
        const user = this.messagesData.find(u => u.id === userId);
    if (user) {
        // Mark messages as read
        user.unread = 0;
            this.renderMessages();
            this.updateBadges();
        
        // Add loading state
        const messageItem = document.querySelector(`[data-user-id="${userId}"]`);
        if (messageItem) {
            messageItem.style.opacity = '0.7';
                messageItem.innerHTML += '<div class="loading"></div>';
        }
        
            // Navigate to chat page using baseURL
        setTimeout(() => {
            window.location.href = this.baseURL + `../chat/chat.html?userId=${userId}&userName=${encodeURIComponent(user.name)}`;
        }, 500);
    }
}

    // Mark notification as read
    markAsRead(notificationId) {
        const notification = this.notificationsData.find(n => n.id === notificationId);
    if (notification) {
        notification.unread = false;
            this.renderNotifications();
            this.updateBadges();
            this.playClickSound();
            this.showToast('تم!', 'تم وضع علامة مقروء على الإشعار');
        }
    }

    // Dismiss notification
    dismissNotification(notificationId) {
        const index = this.notificationsData.findIndex(n => n.id === notificationId);
    if (index > -1) {
        const element = document.querySelector(`[data-notification-id="${notificationId}"]`);
        if (element) {
            element.style.transform = 'translateX(-100%)';
            element.style.opacity = '0';
            setTimeout(() => {
                    this.notificationsData.splice(index, 1);
                    this.renderNotifications();
                    this.updateBadges();
            }, 300);
        }
            this.playClickSound();
    }
}

// Mark all notifications as read
    markAllAsRead() {
        this.notificationsData.forEach(notification => {
        notification.unread = false;
    });
        this.renderNotifications();
        this.updateBadges();
        this.showToast('تم وضع علامة مقروء على جميع الإشعارات', 'success');
}

// Mark all messages as read
    markAllMessagesAsRead() {
        const unreadMessages = this.messagesData.filter(m => m.unread > 0);
        if (unreadMessages.length === 0) {
            this.showToast('لا توجد رسائل غير مقروءة', 'warning');
            return;
        }

        unreadMessages.forEach(message => {
            message.unread = 0;
        });
        
        this.renderMessages();
        this.updateBadges();
        this.showToast(`تم وضع علامة مقروء على ${unreadMessages.length} رسالة`, 'success');
    }

// Clear all notifications
    clearAllNotifications() {
    if (confirm('هل أنت متأكد من حذف جميع الإشعارات؟')) {
            this.notificationsData.length = 0;
            this.renderNotifications();
            this.updateBadges();
            this.showToast('تم!', 'تم حذف جميع الإشعارات');
    }
}

// Notification action functions
    replyToNotification(id) {
        this.showToast('تم فتح نافذة الرد', 'success');
    }

    viewNotification(id) {
        this.showToast('تم عرض التفاصيل', 'info');
    }

    followBack(id) {
        this.showToast('تم إرسال طلب المتابعة', 'success');
    }

    // View community post
    viewCommunityPost(id) {
        const notification = this.notificationsData.find(n => n.id === id);
        if (notification && notification.communityLink) {
            this.showToast('جاري الانتقال إلى المجتمع...', 'info');
            setTimeout(() => {
                window.location.href = notification.communityLink;
            }, 1000);
        } else {
            this.showToast('تم الانتقال إلى المجتمع', 'success');
            setTimeout(() => {
                window.location.href = 'social.html';
            }, 500);
    }
}

// Update badge counters
    updateBadges() {
        const totalMessages = this.messagesData.length;
        const unreadMessages = this.messagesData.reduce((count, message) => count + message.unread, 0);
        const pinnedMessages = this.messagesData.filter(m => m.isPinned).length;
        const urgentMessages = this.messagesData.filter(m => m.priority === 'urgent').length;
        const workMessages = this.messagesData.filter(m => m.category === 'work').length;
        const onlineMessages = this.messagesData.filter(m => m.online).length;
        const unreadNotifications = this.notificationsData.filter(n => n.unread).length;
    
        // Update page header stats
        const totalMessagesElement = document.getElementById('totalMessages');
        const unreadMessagesElement = document.getElementById('unreadMessages');
        const totalNotificationsElement = document.getElementById('totalNotifications');

        if (totalMessagesElement) totalMessagesElement.textContent = totalMessages;
        if (unreadMessagesElement) unreadMessagesElement.textContent = unreadMessages;
        if (totalNotificationsElement) totalNotificationsElement.textContent = this.notificationsData.length;
    
        // Update messages badge
        const messagesBadge = document.getElementById('messagesBadge');
        if (messagesBadge) {
            messagesBadge.textContent = unreadMessages;
            messagesBadge.style.display = unreadMessages > 0 ? 'inline-block' : 'none';
        }
        
        // Update notifications badge
        const notificationsBadge = document.getElementById('notificationsBadge');
        if (notificationsBadge) {
            notificationsBadge.textContent = unreadNotifications;
            notificationsBadge.style.display = unreadNotifications > 0 ? 'inline-block' : 'none';
        }
        
        // Update filter counts
        const allMessagesCount = document.getElementById('allMessagesCount');
        const unreadMessagesCount = document.getElementById('unreadMessagesCount');
        const pinnedMessagesCount = document.getElementById('pinnedMessagesCount');
        const urgentMessagesCount = document.getElementById('urgentMessagesCount');
        const workMessagesCount = document.getElementById('workMessagesCount');
        const onlineMessagesCount = document.getElementById('onlineMessagesCount');

        if (allMessagesCount) allMessagesCount.textContent = totalMessages;
        if (unreadMessagesCount) unreadMessagesCount.textContent = unreadMessages;
        if (pinnedMessagesCount) pinnedMessagesCount.textContent = pinnedMessages;
        if (urgentMessagesCount) urgentMessagesCount.textContent = urgentMessages;
        if (workMessagesCount) workMessagesCount.textContent = workMessages;
        if (onlineMessagesCount) onlineMessagesCount.textContent = onlineMessages;
    
        // Update page title
        const totalUnread = unreadMessages + unreadNotifications;
        document.title = totalUnread > 0 ? `(${totalUnread}) الرسائل والإشعارات | شغلك` : 'الرسائل والإشعارات | شغلك';
    }

    // Show toast notification
    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-header">
                <span class="toast-title">${type === 'success' ? 'تم بنجاح' : type === 'error' ? 'خطأ' : type === 'warning' ? 'تحذير' : 'معلومات'}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Play notification sound
        if (this.notificationSound && type !== 'info') {
            this.notificationSound.play().catch(() => {});
        }
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.transform = 'translateX(100%) scale(0.9)';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }
        }, 5000);
    }

    // Play click sound
    playClickSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // Start real-time updates simulation
    startRealTimeUpdates() {
        // Simulate new messages
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 10 seconds
                this.simulateNewMessage();
            }
        }, 10000);

        // Simulate new notifications
        setInterval(() => {
            if (Math.random() < 0.15) { // 15% chance every 15 seconds
                this.simulateNewNotification();
            }
        }, 15000);

        // Simulate typing indicators
    setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance every 5 seconds
                this.simulateTyping();
            }
        }, 5000);
    }

    // Simulate new message
    simulateNewMessage() {
        const newMessage = {
            id: Date.now(),
            name: 'مستخدم جديد',
            avatar: 'مج',
            lastMessage: 'رسالة جديدة وصلت للتو!',
            time: 'الآن',
            unread: 1,
            online: true,
            status: 'online'
        };

        this.messagesData.unshift(newMessage);
        this.renderMessages();
        this.updateBadges();
        this.showToast('رسالة جديدة - لديك رسالة جديدة من مستخدم جديد', 'info');
    }

    // Simulate new notification
    simulateNewNotification() {
        const newNotification = {
            id: Date.now(),
            type: 'message',
            title: 'إشعار جديد',
            message: 'تم إرسال إشعار جديد لك',
            time: 'الآن',
            unread: true,
            actions: ['view']
        };

        this.notificationsData.unshift(newNotification);
        this.renderNotifications();
        this.updateBadges();
        this.showToast('إشعار جديد - لديك إشعار جديد', 'info');
    }

    // Simulate typing
    simulateTyping() {
        const randomUser = this.messagesData[Math.floor(Math.random() * this.messagesData.length)];
        if (randomUser) {
            this.typingUsers.add(randomUser.id);
            this.renderMessages();
            
            setTimeout(() => {
                this.typingUsers.delete(randomUser.id);
                this.renderMessages();
            }, 3000);
        }
    }

    // Create animated particles
    createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
            particle.style.cssText = `
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
                animation-duration: ${Math.random() * 10 + 5}s;
            `;
        particlesContainer.appendChild(particle);
    }
}

    // Render users with enhanced organization
    renderUsers() {
        const usersContainer = document.getElementById('usersList');
        const usersLoading = document.getElementById('usersLoading');
        const usersEmpty = document.getElementById('usersEmpty');
        
        if (!usersContainer) return;

        // Show loading state
        if (usersLoading) usersLoading.style.display = 'flex';
        if (usersEmpty) usersEmpty.style.display = 'none';
        usersContainer.style.display = 'none';

        // Simulate loading delay for better UX
        setTimeout(() => {
            const filteredUsers = this.getFilteredUsers();
            
            // Hide loading state
            if (usersLoading) usersLoading.style.display = 'none';
            
            // Update search stats
            this.updateSearchStats(filteredUsers.length);
            
            // Update filter counts
            this.updateFilterCounts();
            
            if (filteredUsers.length === 0) {
                if (usersEmpty) usersEmpty.style.display = 'block';
                usersContainer.style.display = 'none';
                return;
            }

            // Show users list
            usersContainer.style.display = 'flex';
            if (usersEmpty) usersEmpty.style.display = 'none';

            usersContainer.innerHTML = filteredUsers.map(user => `
                <div class="user-item" data-user-id="${user.id}" data-user-type="${user.type}">
                    <div class="user-avatar" onclick="messagesManager.viewUserProfile(${user.id})" title="عرض الملف الشخصي">
                        ${user.avatar}
                        ${user.online ? '<div class="online-indicator" title="متصل الآن"></div>' : ''}
                        ${user.type === 'international' ? '<div class="virtual-badge" title="مستخدم دولي"><i class="fas fa-globe"></i></div>' : ''}
                    </div>
                    <div class="user-info">
                        <div class="user-name" onclick="messagesManager.viewUserProfile(${user.id})" title="عرض الملف الشخصي">
                            ${user.name}
                            ${user.type === 'international' ? '<span class="virtual-indicator" title="مستخدم دولي">🌍</span>' : ''}
                        </div>
                        <div class="user-status">
                            <i class="fas fa-circle ${user.online ? 'text-success' : 'text-secondary'}"></i>
                            ${user.status}
                        </div>
                        <div class="user-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${user.location}
                        </div>
                    </div>
                    <div class="user-actions">
                        <button class="user-action-btn" onclick="event.stopPropagation(); messagesManager.startChatWithUser(${user.id})" title="بدء محادثة">
                            <i class="fas fa-comment"></i>
                            محادثة
                        </button>
                        <button class="user-action-btn secondary" onclick="event.stopPropagation(); messagesManager.viewUserProfile(${user.id})" title="عرض الملف الشخصي">
                            <i class="fas fa-user"></i>
                            عرض
                        </button>
                        <button class="user-action-btn secondary" onclick="event.stopPropagation(); messagesManager.addToFavorites(${user.id})" title="إضافة للمفضلة">
                            <i class="fas fa-star"></i>
                        </button>
                    </div>
                    ${user.unreadMessages > 0 ? `<div class="unread-badge" title="${user.unreadMessages} رسالة جديدة">${user.unreadMessages}</div>` : ''}
                </div>
            `).join('');
        }, 300);
    }

    // Get filtered users
    getFilteredUsers() {
        let filtered = this.usersData;

        // Apply search filter
        if (this.userSearchTerm) {
            filtered = filtered.filter(user => 
                user.name.toLowerCase().includes(this.userSearchTerm.toLowerCase()) ||
                user.location.toLowerCase().includes(this.userSearchTerm.toLowerCase())
            );
        }

        // Apply type filter
        if (this.currentUserFilter !== 'all') {
            if (this.currentUserFilter === 'online') {
                filtered = filtered.filter(user => user.online);
            } else if (this.currentUserFilter === 'local') {
                filtered = filtered.filter(user => user.type === 'local');
            } else if (this.currentUserFilter === 'international') {
                filtered = filtered.filter(user => user.type === 'international');
            }
        }

        return filtered;
    }

    // Start chat with user
    startChatWithUser(userId) {
        const user = this.usersData.find(u => u.id === userId);
        if (!user) return;

        // Check if message already exists
        let existingMessage = this.messagesData.find(m => m.id === userId);
        
        if (!existingMessage) {
            // Create new message entry
            const newMessage = {
                id: userId,
                name: user.name,
                avatar: user.avatar,
                lastMessage: 'ابدأ محادثة جديدة...',
                time: 'الآن',
                unread: 0,
                online: user.online,
                status: user.online ? 'online' : 'offline',
                isVirtual: user.type === 'international'
            };
            
            this.messagesData.unshift(newMessage);
            this.renderMessages();
        }

        // Create notification for new chat
        const newNotification = {
            id: Date.now(),
            type: 'message',
            title: 'محادثة جديدة',
            message: `بدأت محادثة جديدة مع ${user.name}`,
            time: 'الآن',
            unread: true,
            actions: ['view']
        };

        this.notificationsData.unshift(newNotification);
        this.renderNotifications();
        this.updateBadges();
        
        this.showToast(`محادثة جديدة - تم بدء محادثة مع ${user.name}`, 'success');
        this.playClickSound();
    }

        // View user profile
    viewUserProfile(userId = 'ahmed') {
        console.log(userId);
            // Show loading notification
            this.showToast(`جاري تحميل الملف الشخصي...`, 'info');
            
            // Navigate to user-profile page with user ID parameter
            const userProfileUrl = this.baseURL + `../user-profile/user-profile.html?user=${userId}`;
            
            // Add a small delay for better UX
            setTimeout(() => {
                window.location.href = userProfileUrl;
            }, 1000);
        }

    // View post notification - navigate to social page
    viewPostNotification(notificationId) {
        const notification = this.notificationsData.find(n => n.id === notificationId);
        if (!notification || notification.type !== 'post') return;

        // Show notification before navigation
        this.showToast('جاري الانتقال إلى المنشور...', 'info');
        
        // Navigate to social page with post ID using baseURL
        setTimeout(() => {
            const socialUrl = this.baseURL + `social.html?post=${notification.postId || 'default'}`;
            window.location.href = socialUrl;
        }, 1000);
    }

    // View community post notification
    viewCommunityPost(notificationId) {
        const notification = this.notificationsData.find(n => n.id === notificationId);
        if (!notification) return;

        // Show notification before navigation
        this.showToast('جاري الانتقال إلى المجتمع...', 'info');
        
        // Navigate to social page with community link or post ID using baseURL
        setTimeout(() => {
            let socialUrl = this.baseURL + 'social.html';
            if (notification.communityLink) {
                socialUrl = notification.communityLink;
            } else if (notification.postId) {
                socialUrl = this.baseURL + `social.html?post=${notification.postId}`;
            }
            window.location.href = socialUrl;
        }, 1000);
    }

    // Message action functions
    replyToMessage(messageId) {
        const message = this.messagesData.find(m => m.id === messageId);
        if (!message) return;

        this.showToast(`جاري فتح محادثة مع ${message.name}...`, 'info');
        setTimeout(() => {
            this.openChat(messageId);
        }, 500);
    }

    togglePinMessage(messageId) {
        const message = this.messagesData.find(m => m.id === messageId);
        if (!message) return;

        message.isPinned = !message.isPinned;
        this.renderMessages();
        this.updateBadges();
        
        const action = message.isPinned ? 'تم تثبيت الرسالة' : 'تم إلغاء تثبيت الرسالة';
        this.showToast(action, 'success');
    }



    showMessageOptions(messageId) {
        const message = this.messagesData.find(m => m.id === messageId);
        if (!message) return;

        const options = [
            { label: 'عرض الملف الشخصي', action: () => this.viewUserProfile(messageId) },
            { label: 'بدء محادثة جديدة', action: () => this.openChat(messageId) },
            { label: message.isPinned ? 'إلغاء التثبيت' : 'تثبيت الرسالة', action: () => this.togglePinMessage(messageId) },
            { label: 'حظر المستخدم', action: () => this.blockUser(messageId) },
            { label: 'حذف المحادثة', action: () => this.deleteConversation(messageId) }
        ];

        this.showOptionsMenu(options, `خيارات ${message.name}`);
    }

    blockUser(messageId) {
        const message = this.messagesData.find(m => m.id === messageId);
        if (!message) return;

        if (confirm(`هل أنت متأكد من حظر ${message.name}؟`)) {
            message.isBlocked = true;
            this.messagesData = this.messagesData.filter(m => m.id !== messageId);
            this.renderMessages();
            this.updateBadges();
            this.showToast(`تم حظر ${message.name}`, 'warning');
        }
    }

    deleteConversation(messageId) {
        const message = this.messagesData.find(m => m.id === messageId);
        if (!message) return;

        if (confirm(`هل أنت متأكد من حذف محادثة ${message.name}؟`)) {
            this.messagesData = this.messagesData.filter(m => m.id !== messageId);
            this.renderMessages();
            this.updateBadges();
            this.showToast('تم حذف المحادثة', 'success');
        }
    }

    showOptionsMenu(options, title) {
        const menu = document.createElement('div');
        menu.className = 'options-menu';
        menu.innerHTML = `
            <div class="options-header">
                <h3>${title}</h3>
                <button class="close-btn" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="options-list">
                ${options.map((option, index) => `
                    <button class="option-item" onclick="this.parentElement.parentElement.remove(); (${option.action.toString()})()">
                        ${option.label}
                    </button>
                `).join('')}
            </div>
        `;

        document.body.appendChild(menu);
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'options-overlay';
        overlay.onclick = () => {
            menu.remove();
            overlay.remove();
        };
        document.body.appendChild(overlay);
    }

    // Like post notification
    likePost(notificationId) {
        const notification = this.notificationsData.find(n => n.id === notificationId);
        if (!notification || notification.type !== 'post') return;

        this.showToast('تم الإعجاب بالمنشور', 'success');
        this.playClickSound();
        
        // Mark notification as read
        this.markAsRead(notificationId);
    }

    // Comment on post notification
    commentOnPost(notificationId) {
        const notification = this.notificationsData.find(n => n.id === notificationId);
        if (!notification || notification.type !== 'post') return;

        this.showToast('سيتم فتح نافذة التعليق قريباً', 'info');
        this.playClickSound();
        
        // Mark notification as read
        this.markAsRead(notificationId);
    }

    // Share post notification
    sharePost(notificationId) {
        const notification = this.notificationsData.find(n => n.id === notificationId);
        if (!notification || notification.type !== 'post') return;

        this.showToast('تم مشاركة المنشور', 'success');
        this.playClickSound();
        
        // Mark notification as read
        this.markAsRead(notificationId);
    }

    // Filter users
    filterUsers(filter) {
        this.currentUserFilter = filter;
        
        // Update active tab
        document.querySelectorAll('.users-section .filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.users-section .filter-tab[onclick="filterUsers('${filter}')"]`)?.classList.add('active');
        
        this.renderUsers();
        this.playClickSound();
    }

    // Search users
    searchUsers(term) {
        this.userSearchTerm = term;
        this.renderUsers();
    }

    // Filter online users only
    filterOnlineUsers() {
        this.currentUserFilter = 'online';
        this.renderUsers();
        this.playClickSound();
    }

    // Refresh users list
    refreshUsersList() {
        // Simulate refreshing by updating online status
        this.usersData.forEach(user => {
            if (Math.random() < 0.3) { // 30% chance to change status
                user.online = !user.online;
                user.status = user.online ? 'متصل الآن' : `آخر ظهور منذ ${Math.floor(Math.random() * 60)} دقيقة`;
                user.lastSeen = user.online ? 'الآن' : user.status.replace('آخر ظهور ', '');
            }
        });
        
        this.renderUsers();
        this.showToast('تحديث القائمة - تم تحديث قائمة المستخدمين', 'success');
        this.playClickSound();
    }

    // Filter functions
    setMessageFilter(filter) {
        this.currentFilter = filter;
        this.renderMessages();
    }

    setNotificationFilter(filter) {
        this.currentNotificationFilter = filter;
        this.renderNotifications();
    }

    // Update search statistics
    updateSearchStats(foundCount) {
        const foundUsersCount = document.getElementById('foundUsersCount');
        const totalUsersBadge = document.getElementById('totalUsersBadge');
        
        if (foundUsersCount) {
            foundUsersCount.textContent = foundCount;
        }
        
        if (totalUsersBadge) {
            totalUsersBadge.textContent = this.usersData.length;
        }
    }

    // Update filter counts
    updateFilterCounts() {
        const allUsersCount = document.getElementById('allUsersCount');
        const onlineUsersCount = document.getElementById('onlineUsersCount');
        const localUsersCount = document.getElementById('localUsersCount');
        const internationalUsersCount = document.getElementById('internationalUsersCount');
        const onlineUsersBadge = document.getElementById('onlineUsersBadge');
        
        if (allUsersCount) {
            allUsersCount.textContent = this.usersData.length;
        }
        
        if (onlineUsersCount) {
            const onlineCount = this.usersData.filter(user => user.online).length;
            onlineUsersCount.textContent = onlineCount;
        }
        
        if (localUsersCount) {
            const localCount = this.usersData.filter(user => user.type === 'local').length;
            localUsersCount.textContent = localCount;
        }
        
        if (internationalUsersCount) {
            const internationalCount = this.usersData.filter(user => user.type === 'international').length;
            internationalUsersCount.textContent = internationalCount;
        }
        
        if (onlineUsersBadge) {
            const onlineCount = this.usersData.filter(user => user.online).length;
            onlineUsersBadge.textContent = onlineCount;
        }
    }

    // Add user to favorites
    addToFavorites(userId) {
        const user = this.usersData.find(u => u.id === userId);
        if (!user) return;

        // Check if user is already in favorites
        const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
        const isFavorite = favorites.includes(userId);
        
        if (isFavorite) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(id => id !== userId);
            localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
            this.showToast('تم إزالة المستخدم من المفضلة', 'info');
        } else {
            // Add to favorites
            favorites.push(userId);
            localStorage.setItem('userFavorites', JSON.stringify(favorites));
            this.showToast(`تم إضافة ${user.name} إلى المفضلة`, 'success');
        }
        
        this.playClickSound();
        this.renderUsers(); // Re-render to update star icon
    }

    // Get filtered users (public method for external access)
    getFilteredUsersPublic() {
        return this.getFilteredUsers();
    }
}

// Initialize the messages manager when DOM is loaded
let messagesManager;

document.addEventListener('DOMContentLoaded', () => {
    messagesManager = new MessagesManager();
    
    // Initialize section switching
    initializeSectionSwitching();
});

// Section switching functionality
function initializeSectionSwitching() {
    const sectionTabs = document.querySelectorAll('.section-tab');
    const contentSections = document.querySelectorAll('.content-section');
    
    sectionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSection = tab.getAttribute('data-section');
            switchSection(targetSection);
        });
    });
}

function switchSection(sectionName) {
    // Update active tab
    document.querySelectorAll('.section-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-section') === sectionName) {
            tab.classList.add('active');
        }
    });
    
    // Update active content section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
        if (section.id === `${sectionName}-section`) {
            section.classList.add('active');
        }
    });
    
    // Update URL hash for bookmarking
    window.location.hash = sectionName;
    
    // Trigger resize event for proper layout
    window.dispatchEvent(new Event('resize'));
}

// Global functions for HTML onclick handlers
function openChat(userId) {
    messagesManager?.openChat(userId);
}

function markAsRead(notificationId) {
    messagesManager?.markAsRead(notificationId);
}

function dismissNotification(notificationId) {
    messagesManager?.dismissNotification(notificationId);
}

function markAllAsRead() {
    messagesManager?.markAllAsRead();
}

function clearAllNotifications() {
    messagesManager?.clearAllNotifications();
}

function replyToNotification(id) {
    messagesManager?.replyToNotification(id);
}

function viewNotification(id) {
    messagesManager?.viewNotification(id);
}

function followBack(id) {
    messagesManager?.followBack(id);
}

function filterMessages(filter) {
    messagesManager?.setMessageFilter(filter);
}

function filterNotifications(filter) {
    messagesManager?.setNotificationFilter(filter);
}

function viewCommunityPost(id) {
    messagesManager?.viewCommunityPost(id);
}

function viewPostNotification(notificationId) {
    messagesManager?.viewPostNotification(notificationId);
}

function startChatWithUser(userId) {
    messagesManager?.startChatWithUser(userId);
}

// Global function for viewUserProfile (for compatibility)
function viewUserProfile(userId) {
    messagesManager?.viewUserProfile(userId);
}

function filterUsers(filter) {
    messagesManager?.filterUsers(filter);
}

function searchUsers(term) {
    messagesManager?.searchUsers(term);
}

function filterOnlineUsers() {
    messagesManager?.filterOnlineUsers();
}

function refreshUsersList() {
    messagesManager?.refreshUsersList();
}



function composeNewMessage() {
    messagesManager?.composeNewMessage();
}

function startGroupChat() {
    messagesManager?.startGroupChat();
}

function scheduleMessage() {
    messagesManager?.scheduleMessage();
}

function exportMessages() {
    messagesManager?.exportMessages();
}

function openSettings() {
    messagesManager?.openSettings();
}



function openNotificationSettings() {
    messagesManager?.openNotificationSettings();
}

function clearUsersSearch() {
    messagesManager?.clearUsersSearch();
}

function clearMessagesSearch() {
    messagesManager?.clearMessagesSearch();
}

function clearNotificationsSearch() {
    messagesManager?.clearNotificationsSearch();
}

function markAllMessagesAsRead() {
    messagesManager?.markAllMessagesAsRead();
}

// Post notification functions
function viewPostNotification(notificationId) {
    messagesManager?.viewPostNotification(notificationId);
}

function likePost(notificationId) {
    messagesManager?.likePost(notificationId);
}

function commentOnPost(notificationId) {
    messagesManager?.commentOnPost(notificationId);
}

function sharePost(notificationId) {
    messagesManager?.sharePost(notificationId);
}

// Enhanced filter functions with icons
function filterUsers(filter) {
    messagesManager?.filterUsers(filter);
    
    // Update active tab with animation
    document.querySelectorAll('.users-section .filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.querySelector(`.users-section .filter-tab[onclick*="${filter}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.style.transform = 'scale(1.05)';
        setTimeout(() => {
            activeTab.style.transform = '';
        }, 200);
    }
}

function filterMessages(filter) {
    messagesManager?.setMessageFilter(filter);
    
    // Update active tab with animation
    document.querySelectorAll('.messages-section .filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.querySelector(`.messages-section .filter-tab[onclick*="${filter}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.style.transform = 'scale(1.05)';
        setTimeout(() => {
            activeTab.style.transform = '';
        }, 200);
    }
}

function filterNotifications(filter) {
    messagesManager?.setNotificationFilter(filter);
    
    // Update active tab with animation
    document.querySelectorAll('.notifications-section .filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.querySelector(`.notifications-section .filter-tab[onclick*="${filter}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.style.transform = 'scale(1.05)';
        setTimeout(() => {
            activeTab.style.transform = '';
        }, 200);
    }
}

// Enhanced user interaction functions for organized users section
function toggleOnlineFilter() {
    const btn = document.getElementById('onlineFilterBtn');
    if (btn) {
        btn.classList.toggle('active');
        const isActive = btn.classList.contains('active');
        btn.setAttribute('aria-pressed', isActive);
        btn.style.background = isActive ? 'var(--success-color)' : '';
        btn.style.color = isActive ? 'white' : '';
        
        if (isActive) {
            messagesManager?.filterUsers('online');
        } else {
            messagesManager?.filterUsers('all');
        }
    }
}

function refreshUsers() {
    messagesManager?.refreshUsersList();
    
    // Add refresh animation
    const refreshBtn = document.querySelector('.action-btn[onclick="refreshUsers()"]');
    if (refreshBtn) {
        refreshBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            refreshBtn.style.transform = '';
        }, 1000);
    }
}

// New functions for organized users section
function toggleUsersView() {
    const btn = document.querySelector('.action-btn[onclick="toggleUsersView()"]');
    if (btn) {
        const icon = btn.querySelector('i');
        if (icon.classList.contains('fa-th-large')) {
            icon.classList.remove('fa-th-large');
            icon.classList.add('fa-list');
            btn.title = 'عرض قائمة';
        } else {
            icon.classList.remove('fa-list');
            icon.classList.add('fa-th-large');
            btn.title = 'عرض شبكة';
        }
        
        // Add toggle animation
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    }
}

function exportUsersList() {
    const users = messagesManager?.getFilteredUsersPublic() || [];
    if (users.length === 0) {
        messagesManager?.showToast('لا توجد مستخدمين للتصدير', 'warning');
        return;
    }
    
    const csvContent = [
        ['الاسم', 'الحالة', 'الموقع', 'النوع', 'آخر ظهور'],
        ...users.map(user => [
            user.name,
            user.status,
            user.location,
            user.type === 'local' ? 'محلي' : 'دولي',
            user.lastSeen
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `users-list-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    messagesManager?.showToast(`تم تصدير ${users.length} مستخدم بنجاح`, 'success');
}

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// PWA installation prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button or prompt
    setTimeout(() => {
        if (confirm('هل تريد تثبيت تطبيق شغلك على جهازك؟')) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            });
        }
    }, 5000);
});