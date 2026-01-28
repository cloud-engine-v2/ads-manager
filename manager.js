/**
 * OFFICIAL AD MANAGER - 2026 EDITION
 * Logic: 4 Fixed Banners + 20 Random Direct Links (12 Adsterra / 8 Monetag)
 * Compatibility: Web & Unity WebView
 */

const adDatabase = {
    // یہاں اپنے 20 ڈائریکٹ لنکس ڈالیں (12 Adsterra + 8 Monetag)
    directLinks: [
        'LINK_1', 'LINK_2', 'LINK_3', 'LINK_4', 'LINK_5', 'LINK_6', 
        'LINK_7', 'LINK_8', 'LINK_9', 'LINK_10', 'LINK_11', 'LINK_12',
        'LINK_13', 'LINK_14', 'LINK_15', 'LINK_16', 'LINK_17', 'LINK_18', 
        'LINK_19', 'LINK_20'
    ],
    // یہاں 4 فکس ایڈز کے بینر یو آر ایل ڈالیں
    fixed: {
        header: 'FIXED_HEADER_URL',
        footer: 'FIXED_FOOTER_URL',
        sidebar: 'FIXED_SIDEBAR_URL',
        middle: 'FIXED_MIDDLE_URL'
    }
};

// رینڈم ایڈ منتخب کرنے کا فنکشن
const getAdUrl = () => adDatabase.directLinks[Math.floor(Math.random() * adDatabase.directLinks.length)];

// فکس ایڈز لوڈ کرنے کا فنکشن
function initFixedAds() {
    const placements = [
        { id: 'tag-fixed-header', url: adDatabase.fixed.header },
        { id: 'tag-fixed-footer', url: adDatabase.fixed.footer },
        { id: 'tag-fixed-sidebar', url: adDatabase.fixed.sidebar },
        { id: 'tag-fixed-mid-page', url: adDatabase.fixed.middle }
    ];

    placements.forEach(item => {
        const container = document.getElementById(item.id);
        if (container) {
            container.innerHTML = `<iframe src="${item.url}" width="100%" height="100%" frameborder="0" scrolling="no" style="border:none; overflow:hidden;"></iframe>`;
        }
    });
}

// کلک ایونٹ ہینڈلر (تمام رینڈم بٹن کے لیے)
document.addEventListener('click', function(event) {
    const targetId = event.target.id;

    // یہ وہی IDs ہیں جو آپ نے لسٹ میں دی تھیں - بالکل میچنگ ہیں!
    const triggerIds = [
        'tag-btn-play-main',      // Play Button
        'tag-btn-server-shift-2', // Server 2
        'tag-btn-q-360',          // 360p
        'tag-btn-q-720',          // 720p
        'tag-btn-q-1080',         // 1080p
        'tag-btn-q-4k',           // 4K
        'tag-btn-auth-login',     // Login
        'tag-btn-auth-send',      // Send
        'tag-btn-theme-back-nav'  // Theme Back
    ];

    if (triggerIds.includes(targetId)) {
        window.open(getAdUrl(), '_blank');
    }
});

// پیج لوڈ ہوتے ہی فکس ایڈز چلائیں
window.addEventListener('DOMContentLoaded', initFixedAds);
