// Service Worker for Messages App
const CACHE_NAME = 'messages-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/messages.html',
    '/chat.html',
    '/styles.css',
    '/messages.css',
    '/messages.js',
    '/script.js',
    '/Images/تصميم بدون عنوان_20250805_160357_٠٠٠٠ (1).png'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Push notification handling
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'رسالة جديدة',
        icon: '/Images/تصميم بدون عنوان_20250805_160357_٠٠٠٠ (1).png',
        badge: '/Images/تصميم بدون عنوان_20250805_160357_٠٠٠٠ (1).png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'عرض الرسائل',
                icon: '/Images/تصميم بدون عنوان_20250805_160357_٠٠٠٠ (1).png'
            },
            {
                action: 'close',
                title: 'إغلاق',
                icon: '/Images/تصميم بدون عنوان_20250805_160357_٠٠٠٠ (1).png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('شغلك - رسائل جديدة', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/messages.html')
        );
    }
});
