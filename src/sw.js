import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
});

self.addEventListener('message', (event) => {

    console.log('Received message in service worker:', event.data);

    const count = event.data.count;

    if (event.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification('PWA Practice', {
            body: `You've clicked the button ${count} times! ✅`,
            icon: '/android-chrome-192x192.png',
        })
    }
})