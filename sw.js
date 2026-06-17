// Uygulama telefona ilk kurulduğunda çalışır
self.addEventListener('install', (event) => {
    console.log('Çetin Klima PWA İşçisi Kuruldu.');
    self.skipWaiting();
});

// Uygulama aktif olduğunda çalışır
self.addEventListener('activate', (event) => {
    console.log('Çetin Klima PWA İşçisi Aktif.');
});

// İleride panelden bildirim fırlattığımızda burası tetiklenecek
self.addEventListener('push', (event) => {
    let bildirimMetni = 'Yeni bir servis/arıza iş emri girildi!';
    if (event.data) {
        bildirimMetni = event.data.text();
    }

    const secenekler = {
        body: bildirimMetni,
        icon: '/favicon.png',
        badge: '/favicon.png',
        vibrate: [100, 50, 100] // Telefonun titreme ritmi
    };

    event.waitUntil(
        self.registration.showNotification('Çetin Klima Merkez', secenekler)
    );
});