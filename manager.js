/**
 * MANAGER CHACHA V7.2 - THE SUPERNOVA [GOD MODE - ACTIVATED]
 * ---------------------------------------------------------
 * STATUS: REDIRECTS ENABLED | LIMITS REMOVED | DEBUGGING ACTIVE
 */

const CHACHA_CONFIG = {
    DOMAIN: "cloudaccesshq.xyz",
    
    LINKS: {
        HIGH: [
            "https://www.amazon.com/gp/goldbox", 
            "https://www.netflix.com/browse", 
            "https://www.disneyplus.com/home", 
            "https://www.apple.com/store", 
            "https://www.microsoft.com/store", 
            "https://www.playstation.com/en-us/deals/", 
            "https://www.xbox.com/en-US/games/all-games", 
            "https://www.tesla.com/inventory/new/m3", 
            "https://www.spacex.com/rideshare/", 
            "https://www.samsung.com/us/shop/all-deals/"
        ],
        MID: [
            "https://www.spotify.com/premium/", 
            "https://www.hulu.com/welcome", 
            "https://www.twitch.tv/directory", 
            "https://www.reddit.com/r/popular/", 
            "https://www.ebay.com/globaldeals", 
            "https://www.walmart.com/deals"
        ],
        LOW: [
            "https://www.daraz.pk/flash-sale/", 
            "https://www.alibaba.com/showroom/hot-products.html", 
            "https://www.booking.com/dealspage.html", 
            "https://www.airbnb.com/rooms"
        ]
    },

    SETTINGS: {
        MAX_CLICKS: 999999,
        RESET_HOURS: 0, 
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached"
    }
};

const _0xEngine = {
    _getStore: function() {
        const data = localStorage.getItem('_mc_v7_debug_');
        return data ? JSON.parse(data) : { c: 0, ts: null, used: [] };
    },

    _setStore: function(obj) {
        localStorage.setItem('_mc_v7_debug_', JSON.stringify(obj));
    },

    _scan: async function() {
        try {
            const gl = document.createElement('canvas').getContext('webgl');
            const dbg = gl?.getExtension('WEBGL_debug_renderer_info');
            const gpu = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "Standard-V7-Engine";
            
            return {
                gpu: gpu,
                mem: navigator.deviceMemory || "N/A",
                ip: "DEBUG-PK-IP",
                ts: new Date().toLocaleTimeString()
            };
        } catch(e) { return { gpu: "Error", mem: "Error" }; }
    },

    _pickLink: function(session) {
        const luck = Math.random() * 100;
        let pool = (luck < 80) ? CHACHA_CONFIG.LINKS.HIGH : (luck < 90 ? CHACHA_CONFIG.LINKS.MID : CHACHA_CONFIG.LINKS.LOW);
        
        let available = pool.filter(l => !session.used.includes(l));
        if (available.length === 0) {
            session.used = []; // ری سیٹ کریں اگر سب استعمال ہو چکے ہوں
            available = pool;
        }

        const selected = available[Math.floor(Math.random() * available.length)];
        session.used.push(selected);
        return selected;
    },

    _jump: function(url) {
        console.log(`🚀 JUMPING TO: ${url}`);
        
        // یہ ہے وہ اصلی کمانڈ جو لنک کھولے گی
        const w = window.open('', '_blank');
        if (w) {
            w.opener = null;
            w.document.write(`
                <html>
                <head>
                    <meta name="referrer" content="no-referrer">
                    <title>Loading...</title>
                </head>
                <body style="background:#000; color:#fff; display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif;">
                    <div>
                        <h2>Supernova Engine Redirecting...</h2>
                        <script>window.location.replace("${url}");</script>
                    </div>
                </body>
                </html>
            `);
            w.document.close();
        } else {
            // اگر پاپ اپ بلاکر آن ہے تو اسی ونڈو میں کھولے گا
            window.location.assign(url);
        }
    }
};

// ایونٹ لسنر کو زیادہ پاورفل بنا دیا گیا ہے
document.addEventListener('click', async (e) => {
    // کسی بھی ایسے ایلیمنٹ کو ڈھونڈو جس کی ID میں 'tag-' آتا ہو یا وہ بٹن ہو
    const btn = e.target.closest('[id]');
    
    if (btn) {
        console.log(`🎯 Detected Click on ID: ${btn.id}`);
        
        // یہاں ہم چیک کریں گے کہ کیا یہ ہمارے منظور شدہ بٹنز میں سے ہے
        const validIDs = ['tag-btn-play-main', 'tag-btn-q-4k', 'tag-btn-auth-login']; 
        
        if (validIDs.includes(btn.id) || btn.id.startsWith('tag-')) {
            e.preventDefault(); // ویب سائٹ کے اصلی فنکشن کو روکو
            e.stopPropagation(); // ایونٹ کو پھیلنے سے روکو

            const dna = await _0xEngine._scan();
            const session = _0xEngine._getStore();
            const target = _0xEngine._pickLink(session);

            session.c++;
            _0xEngine._setStore(session);

            console.log(`✅ Attack #${session.c} Confirmed.`);
            _0xEngine._jump(target);
        }
    }
}, true); // 'true' کا مطلب ہے کہ یہ سب سے پہلے چلے گا
