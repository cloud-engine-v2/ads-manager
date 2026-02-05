/**
 * THE OMNI-ENGINE - MANAGER CHACHA V5.2 (FINAL TESTING)
 * FIXED: Direct New Tab Opening (No Blocking)
 * MODE: UNLIMITED CLICKS | ALL TAGS INTEGRATED
 */

const CHACHA_CONFIG = {
    DEBUG_MODE: true, 

    LINKS: [
        // High Pay Pool (80%) - Amazon & Tech Links
        "https://www.amazon.com/best-sellers-generic", "https://www.ebay.com/", "https://www.walmart.com/", 
        "https://www.apple.com/", "https://www.microsoft.com/", "https://www.tesla.com/", 
        "https://www.netflix.com/", "https://www.spotify.com/", "https://www.adobe.com/", "https://www.samsung.com/",
        
        // Normal Pay Pool (10%)
        "https://www.theverge.com/", "https://www.techcrunch.com/", "https://www.wired.com/", 
        "https://www.gsmarena.com/", "https://www.cnet.com/", "https://www.digitaltrends.com/",
        
        // Low Pay Pool (10%)
        "https://www.bbc.com/news", "https://www.cnn.com/", "https://www.nytimes.com/", "https://www.aljazeera.com/"
    ],

    APIS: {
        IP_KEY: "YOUR_IP_KEY",
        FB_URL: "YOUR_FIREBASE_URL",
        TG_TOKEN: "YOUR_BOT_TOKEN",
        TG_ID: "YOUR_CHAT_ID"
    },

    SETTINGS: {
        MAX_CLICKS: 99999, // ان لمیٹڈ کلکس
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached",
        DOMAIN: "cloudaccesshq.xyz"
    }
};

const _0xEngine = {
    _c: 0,
    _baskets: { h: [], n: [], l: [] },

    init: function() {
        console.log("%c [SYSTEM] V5.2 Debug Beast Ready! ", "background: #ff0000; color: #fff; font-size: 14px;");
        
        // لنکس کی تقسیم (80/10/10)
        this._baskets.h = CHACHA_CONFIG.LINKS.slice(0, 10);
        this._baskets.n = CHACHA_CONFIG.LINKS.slice(10, 16);
        this._baskets.l = CHACHA_CONFIG.LINKS.slice(16, 20);
    },

    _scan: async function() {
        // ٹیسٹنگ میں اسکین کو فاسٹ رکھا ہے
        return {
            b: "99%", 
            r: "8GB", 
            g: "Test-GPU", 
            v: false,
            ip: "127.0.0.1"
        };
    },

    _jump: function(_u) {
        console.log("%c [JUMP] Opening: " + _u, "color: #00ff00;");
        
        // FIX: اب یہ ڈائریکٹ نیا ٹیب کھولے گا بغیر بلاک ہوئے
        const _newTab = window.open(_u, '_blank');
        
        // اگر براؤزر پاپ اپ بلاک کر دے تو اسی ونڈو میں کھولے گا
        if (!_newTab) {
            console.warn("[WARN] Popup blocked by browser! Redirecting same tab.");
            window.location.assign(_u);
        }
    },

    _log: function(_id, _dna) {
        console.log(`[CLICKED] ID: ${_id} | Pool Selection Logic Running...`);
    }
};

// --- تمام ٹیگز کی انٹیگریشن ---
document.addEventListener('click', async (e) => {
    const _btn = e.target.closest('[id]');
    
    // آپ کے تمام ٹیگز یہاں موجود ہیں
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
        
        // 80/10/10 رول کا حساب
        const _luck = Math.random() * 100;
        let _pool;
        
        if (_luck < 80) {
            _pool = _0xEngine._baskets.h;
            console.log("[LUCK] 80% High Pool Selected");
        } else if (_luck < 90) {
            _pool = _0xEngine._baskets.n;
            console.log("[LUCK] 10% Normal Pool Selected");
        } else {
            _pool = _0xEngine._baskets.l;
            console.log("[LUCK] 10% Low Pool Selected");
        }

        const _finalLink = _pool[Math.floor(Math.random() * _pool.length)];
        const _dna = await _0xEngine._scan();
        
        _0xEngine._log(_btn.id, _dna);
        _0xEngine._c++;
        
        _0xEngine._jump(_finalLink);
    }
});

_0xEngine.init();
