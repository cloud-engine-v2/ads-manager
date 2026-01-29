/**
 * THE ULTIMATE "NO-TOUCH" AD ENGINE - 2026
 * Instructions: Only edit the links in the 'MY_DIRECT_LINKS' section below.
 * Do not touch anything else to avoid breaking the logic.
 */

// ==========================================
// 1. अपनी 20 डायरेक्ट लिंक यहाँ पेस्ट करें
// ==========================================
const MY_DIRECT_LINKS = [
    "ADD_URL_1",  "ADD_URL_2",  "ADD_URL_3",  "ADD_URL_4",  "ADD_URL_5",
    "ADD_URL_6",  "ADD_URL_7",  "ADD_URL_8",  "ADD_URL_9",  "ADD_URL_10",
    "ADD_URL_11", "ADD_URL_12", "ADD_URL_13", "ADD_URL_14", "ADD_URL_15",
    "ADD_URL_16", "ADD_URL_17", "ADD_URL_18", "ADD_URL_19", "ADD_URL_20"
];

// ==========================================
// 2. अपने 4 बैनर एड्स के लिंक यहाँ डालें
// ==========================================
const MY_FIXED_BANNERS = {
    header:  "HEADER_AD_URL",
    footer:  "FOOTER_AD_URL",
    sidebar: "SIDEBAR_AD_URL",
    middle:  "MID_PAGE_AD_URL"
};

// ==========================================
// यहाँ से नीचे "खतरे का इलाका" है - इसे न छुएं!
// मशीन खुद ही ऊपर के 20 लिंक्स को बास्केट में बाँट लेगी।
// ==========================================

const AdMasterEngine = {
    baskets: { high: [], normal: [], low: [] },
    memory: new Set(),

    // ऑटो-डिवीजन लॉजिक: पहले 10 हाई, अगले 6 नॉर्मल, आखिरी 4 लो
    autoDistribute: function() {
        this.baskets.high = MY_DIRECT_LINKS.slice(0, 10);
        this.baskets.normal = MY_DIRECT_LINKS.slice(10, 16);
        this.baskets.low = MY_DIRECT_LINKS.slice(16, 20);
    },

    selectBasket: function() {
        const luck = Math.random() * 100;
        if (luck < 80) return 'high';
        if (luck < 90) return 'normal';
        return 'low';
    },

    getBestLink: function() {
        this.autoDistribute(); // सुनिश्चित करें कि बास्केट अपडेटेड हैं
        const basketKey = this.selectBasket();
        let pool = this.baskets[basketKey];
        
        let freshLinks = pool.filter(l => !this.memory.has(l));
        if (freshLinks.length === 0) {
            this.memory.clear();
            freshLinks = pool;
        }

        const pick = freshLinks[Math.floor(Math.random() * freshLinks.length)];
        this.memory.add(pick);
        return pick;
    },

    spyLog: function(btnId) {
        console.log(`%c[SPY-REPORT] %cButton: ${btnId} clicked at ${new Date().toLocaleTimeString()}`, "color: yellow; font-weight: bold", "color: white");
    }
};

document.addEventListener('click', function(e) {
    const ids = [
        'tag-btn-play-main', 'tag-btn-server-shift-2', 
        'tag-btn-q-360', 'tag-btn-q-720', 'tag-btn-q-1080', 'tag-btn-q-4k',
        'tag-btn-auth-login', 'tag-btn-auth-send', 'tag-btn-theme-back-nav'
    ];

    if (ids.includes(e.target.id)) {
        const link = AdMasterEngine.getBestLink();
        AdMasterEngine.spyLog(e.target.id);
        window.open(link, '_blank');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const bannerIds = {
        'tag-fixed-header': MY_FIXED_BANNERS.header,
        'tag-fixed-footer': MY_FIXED_BANNERS.footer,
        'tag-fixed-sidebar': MY_FIXED_BANNERS.sidebar,
        'tag-fixed-mid-page': MY_FIXED_BANNERS.middle
    };

    for (let id in bannerIds) {
        let box = document.getElementById(id);
        if (box) {
            box.innerHTML = `<iframe src="${bannerIds[id]}" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>`;
        }
    }
});
