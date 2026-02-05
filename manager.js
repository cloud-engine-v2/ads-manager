/**
 * THE OMNI-ENGINE - MANAGER CHACHA V5.0 (DEBUG & TESTING VERSION)
 * Mode: UNLIMITED CLICKS | ALL TAGS INTEGRATED | BYPASS ACTIVE
 */

const CHACHA_CONFIG = {
    DEBUG_MODE: true, // ٹیسٹنگ کے لیے اسے TRUE رکھا ہے
    
    LINKS: [
        "https://www.blackbox.ai/", "https://chat.deepseek.com/", "https://chatgpt.com/", 
        "https://www.theverge.com/tech", "https://tech.com.pk/", "https://techcrunch.com/", 
        "https://www.techmeme.com/", "https://rocketpay.co.in/", "https://www.api.org/", "https://www.ibm.com/",
        "URL_11", "URL_12", "URL_13", "URL_14", "URL_15",
        "URL_16", "URL_17", "URL_18", "URL_19", "URL_20"
    ],

    APIS: {
        IP_KEY: "YOUR_IP_KEY",
        FB_URL: "YOUR_FIREBASE_URL",
        TG_TOKEN: "YOUR_BOT_TOKEN",
        TG_ID: "YOUR_CHAT_ID"
    },

    SETTINGS: {
        MAX_CLICKS: 99999, // بائی پاس: اب آپ ان لمیٹڈ کلکس کر سکتے ہیں
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached",
        DOMAIN: "cloudaccesshq.xyz"
    }
};

const _0xEngine = {
    _c: 0, // ٹیسٹنگ کے لیے کاؤنٹر کو زیرو سے سٹارٹ کرے گا
    _baskets: { h: [], n: [], l: [] },

    init: function() {
        console.log("%c [SYSTEM] Manager Chacha Debug Mode Active ", "background: #222; color: #bada55; font-size: 15px;");
        
        // لنکس کی تقسیم
        this._baskets.h = CHACHA_CONFIG.LINKS.slice(0, 10);
        this._baskets.n = CHACHA_CONFIG.LINKS.slice(10, 16);
        this._baskets.l = CHACHA_CONFIG.LINKS.slice(16, 20);
        
        // ٹیسٹنگ کے دوران رائٹ کلک اور انسپیکٹ ایلیمنٹ کو کھلا رکھا ہے
        if (!CHACHA_CONFIG.DEBUG_MODE) this._lock();
    },

    _scan: async function() {
        console.log("[DEBUG] Scanning Hardware & Network...");
        try {
            const _bat = await navigator.getBattery().catch(() => ({ level: 1 }));
            const _ipData = await fetch('https://ipapi.co/json/').then(r => r.json()).catch(() => ({}));
            
            return {
                b: Math.round(_bat.level * 100) + "%",
                r: navigator.deviceMemory || "N/A",
                g: this._gpu(),
                v: _ipData.proxy || _ipData.vpn || false,
                ip: _ipData.ip || "0.0.0.0"
            };
        } catch(e) { return { v: false }; }
    },

    _gpu: function() {
        const gl = document.createElement('canvas').getContext('webgl');
        const dbg = gl?.getExtension('WEBGL_debug_renderer_info');
        return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "Std";
    },

    _jump: function(_u) {
        console.log("%c [REDIRECT] Destination: " + _u, "color: orange; font-weight: bold;");
        
        // گھوسٹ برج لاجک (Referrer Masking)
        const _w = window.open('', '_blank');
        if(_w) {
            _w.opener = null;
            _w.document.write(`<html><head><meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=${_u}"></head><body>Redirecting Stealthily...</body></html>`);
            _w.document.close();
        } else {
            console.warn("[WARN] Popup Blocked! Opening in same tab.");
            window.location.assign(_u);
        }
    },

    _log: function(_id, _dna) {
        console.log("[LOGGING] Button ID: " + _id);
        console.table(_dna);
    }
};

// --- تمام ٹیگز کی انٹیگریشن (Click Event) ---
document.addEventListener('click', async (e) => {
    const _btn = e.target.closest('[id]');
    
    // آپ کے تمام ٹیگز یہاں شامل ہیں
    const _validIds = [
        'tag-btn-play-main', 
        'tag-input-message-field', 
        'tag-btn-back-button', // بیک بٹن ٹیسٹنگ کے لیے شامل ہے
        'tag-btn-server-shift-2', 
        'tag-btn-q-360', 
        'tag-btn-q-720', 
        'tag-btn-q-1080', 
        'tag-btn-q-4k', 
        'tag-btn-auth-login', 
        'tag-btn-auth-send', 
        'tag-link-community-rules', 
        'tag-btn-community-showmore'
    ];

    if (_btn && _validIds.includes(_btn.id)) {
        
        console.log("[CLICK DETECTED] Element ID: " + _btn.id);

        // 80/10/10 رول کی ٹیسٹنگ
        const _dna = await _0xEngine._scan();
        if (_dna.v) console.warn("[SECURITY] VPN Detected (In Debug Mode: Bypassed)");

        _0xEngine._log(_btn.id, _dna);

        const _luck = Math.random() * 100;
        let _pool = _luck < 80 ? _0xEngine._baskets.h : (_luck < 90 ? _0xEngine._baskets.n : _0xEngine._baskets.l);
        const _finalLink = _pool[Math.floor(Math.random() * _pool.length)];

        _0xEngine._c++;
        console.log(`[COUNTER] Click: ${_0xEngine._c} / ${CHACHA_CONFIG.SETTINGS.MAX_CLICKS}`);
        
        _0xEngine._jump(_finalLink);
    }
});

_0xEngine.init();
