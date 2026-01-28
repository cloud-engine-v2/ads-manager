/**
 * OFFICIAL AD MANAGER - 2026 EDITION
 * Logic: 4 Fixed Banners + 20 Random Direct Links (12 Adsterra / 8 Monetag)
 * Compatibility: Web & Unity WebView
 */

const adDatabase = {
    // यहाँ अपने 20 डायरेक्ट लिंक्स डालें (12 Adsterra + 8 Monetag)
    directLinks: [
        'LINK_1', 'LINK_2', 'LINK_3', 'LINK_4', 'LINK_5', 'LINK_6', 
        'LINK_7', 'LINK_8', 'LINK_9', 'LINK_10', 'LINK_11', 'LINK_12',
        'LINK_13', 'LINK_14', 'LINK_15', 'LINK_16', 'LINK_17', 'LINK_18', 
        'LINK_19', 'LINK_20'
    ],
    // यहाँ 4 फिक्स एड्स के बैनर यूआरएल डालें
    fixed: {
        header: 'FIXED_HEADER_URL',
        footer: 'FIXED_FOOTER_URL',
        sidebar: 'FIXED_SIDEBAR_URL',
        middle: 'FIXED_MIDDLE_URL'
    }
};

// रैंडम एड चुनने का फंक्शन
const getAdUrl = () => adDatabase.directLinks[Math.floor(Math.random() * adDatabase.directLinks.length)];

// फिक्स एड्स लोड करने का फंक्शन
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

// क्लिक इवेंट हैंडलर (सभी रैंडम बटन के लिए)
document.addEventListener('click', function(event) {
    const targetId = event.target.id;

    // ये वही IDs हैं जो तुमने लिस्ट में दी थीं - बिल्कुल मैचिंग हैं!
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

// पेज लोड होते ही फिक्स एड्स चलाएं
window.addEventListener('DOMContentLoaded', initFixedAds);
